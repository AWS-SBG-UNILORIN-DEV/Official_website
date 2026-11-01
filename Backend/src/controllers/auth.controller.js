import { config } from '../config.js';
import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/api-error.js';

const refreshCookieOptions = {
  httpOnly: true,
  secure: config.cookieSecure,
  sameSite: config.cookieSameSite,
  path: '/api/auth',
};

function setRefreshCookie(res, token) {
  res.cookie(config.cookieName, token, {
    ...refreshCookieOptions,
    maxAge: config.refreshTokenTtlMs,
  });
}

function clearRefreshCookie(res) {
  res.clearCookie(config.cookieName, refreshCookieOptions);
}

export const signup = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.validated);
  res.status(201).json({
    status: 'success',
    message: 'Account created successfully. Please verify your email.',
    data: { user },
  });
});

export const resendVerification = asyncHandler(async (req, res) => {
  await authService.resendVerification(req.validated.email);
  res.json({
    status: 'success',
    message: 'If an unverified account with that email exists, a verification link has been sent.',
  });
});

export const signin = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.signin(req.validated);
  setRefreshCookie(res, refreshToken);
  res.json({
    status: 'success',
    message: 'Signed in successfully.',
    data: { user, accessToken },
  });
});

export const signout = asyncHandler(async (req, res) => {
  try {
    await authService.signout(req.cookies?.[config.cookieName]);
  } finally {
    clearRefreshCookie(res);
  }
  res.json({ status: 'success', message: 'Signed out successfully.' });
});

export const refresh = asyncHandler(async (req, res) => {
  try {
    const result = await authService.refresh(req.cookies?.[config.cookieName]);
    setRefreshCookie(res, result.refreshToken);
    res.json({ status: 'success', data: { accessToken: result.accessToken } });
  } catch (error) {
    if (error.code === 'INVALID_TOKEN') clearRefreshCookie(res);
    throw error;
  }
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.auth.studentId);
  res.json({ status: 'success', data: { user } });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.validated.email);
  res.json({
    status: 'success',
    message: 'If an account with that email exists, a password reset link has been sent.',
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.validated);
  clearRefreshCookie(res);
  res.json({
    status: 'success',
    message: 'Password reset successfully. You can now sign in with your new password.',
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  await authService.verifyEmail(req.validated.token);
  res.json({ status: 'success', message: 'Email verified successfully. You can now sign in.' });
});
