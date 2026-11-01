import { ApiError } from '../utils/api-error.js';
import { hashPassword, verifyPassword } from '../utils/passwords.js';
import { createAccessToken, createOpaqueToken, hashOpaqueToken } from '../utils/tokens.js';
import { toPublicUser } from '../utils/users.js';
import { config } from '../config.js';
import {
  createStudent,
  consumeVerificationToken,
  findStudentByEmail,
  findStudentIdByEmail,
  findStudentProfile,
  resetPasswordWithToken,
  setResetToken,
  setVerificationToken,
  updateLastLogin,
} from '../repositories/student.repository.js';
import {
  createRefreshToken,
  revokeRefreshToken,
  rotateRefreshToken,
} from '../repositories/session.repository.js';
import { sendPasswordResetEmail, sendVerificationEmail } from '../mailer.js';

function expiresIn(milliseconds) {
  return new Date(Date.now() + milliseconds);
}

export async function signup(input) {
  const passwordHash = await hashPassword(input.password);
  const verificationToken = createOpaqueToken();
  let student;

  try {
    student = await createStudent({
      ...input,
      passwordHash,
      verificationTokenHash: hashOpaqueToken(verificationToken),
      verificationTokenExpiresAt: expiresIn(config.verificationTokenTtlMs),
    });
  } catch (error) {
    const duplicateDetails = `${error.constraint ?? ''} ${error.message ?? ''} ${error.details ?? ''}`;
    if (error.code === '23505' && duplicateDetails.includes('email')) {
      throw new ApiError(409, 'EMAIL_EXISTS', 'An account with this email already exists.');
    }
    if (error.code === '23505' && duplicateDetails.includes('matric_number')) {
      throw new ApiError(409, 'MATRIC_EXISTS', 'An account with this matric number already exists.');
    }
    throw error;
  }

  try {
    await sendVerificationEmail(input.email, verificationToken);
  } catch (error) {
    console.error('Verification email delivery failed:', error.message);
    throw new ApiError(503, 'EMAIL_DELIVERY_FAILED', 'Account was created, but the verification email could not be sent. Please request another link.');
  }

  return toPublicUser(student);
}

export async function resendVerification(email) {
  const token = createOpaqueToken();
  const student = await setVerificationToken(
    email,
    hashOpaqueToken(token),
    expiresIn(config.verificationTokenTtlMs),
  );
  if (student) {
    try {
      await sendVerificationEmail(email, token);
    } catch (error) {
      console.error('Verification email delivery failed:', error.message);
    }
  }
}

export async function signin({ email, password }) {
  const student = await findStudentByEmail(email);
  const passwordMatches = await verifyPassword(password, student?.password_hash);
  if (!student || !passwordMatches) {
    throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.');
  }
  if (!student.is_verified) {
    throw new ApiError(403, 'EMAIL_NOT_VERIFIED', 'Please verify your email before signing in.');
  }

  const updatedStudent = await updateLastLogin(student.id);
  if (!updatedStudent) throw new ApiError(404, 'USER_NOT_FOUND', 'User not found.');
  const refreshToken = createOpaqueToken();
  await createRefreshToken(
    student.id,
    hashOpaqueToken(refreshToken),
    expiresIn(config.refreshTokenTtlMs),
  );

  return {
    user: toPublicUser(updatedStudent),
    accessToken: createAccessToken(student.id),
    refreshToken,
  };
}

export async function signout(refreshToken) {
  if (!refreshToken || !(await revokeRefreshToken(hashOpaqueToken(refreshToken)))) {
    throw new ApiError(401, 'INVALID_TOKEN', 'Invalid or expired refresh token.');
  }
}

export async function refresh(refreshToken) {
  if (!refreshToken) throw new ApiError(401, 'INVALID_TOKEN', 'Invalid or expired refresh token.');
  const nextRefreshToken = createOpaqueToken();
  const studentId = await rotateRefreshToken(
    hashOpaqueToken(refreshToken),
    hashOpaqueToken(nextRefreshToken),
    expiresIn(config.refreshTokenTtlMs),
  );
  return {
    refreshToken: nextRefreshToken,
    accessToken: createAccessToken(studentId),
  };
}

export async function getProfile(studentId) {
  const student = await findStudentProfile(studentId);
  if (!student) throw new ApiError(404, 'USER_NOT_FOUND', 'User not found.');
  return toPublicUser(student);
}

export async function forgotPassword(email) {
  const studentId = await findStudentIdByEmail(email);
  if (!studentId) return;

  const token = createOpaqueToken();
  await setResetToken(studentId, hashOpaqueToken(token), expiresIn(config.resetTokenTtlMs));
  try {
    await sendPasswordResetEmail(email, token);
  } catch (error) {
    console.error('Password reset email delivery failed:', error.message);
  }
}

export async function resetPassword({ token, newPassword }) {
  const passwordHash = await hashPassword(newPassword);
  const succeeded = await resetPasswordWithToken(hashOpaqueToken(token), passwordHash);
  if (!succeeded) throw new ApiError(400, 'INVALID_TOKEN', 'Invalid or expired reset token.');
}

export async function verifyEmail(token) {
  const succeeded = await consumeVerificationToken(hashOpaqueToken(token));
  if (!succeeded) throw new ApiError(400, 'INVALID_TOKEN', 'Invalid or expired verification token.');
}
