import { ApiError } from '../utils/api-error.js';

function requireObjectBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid input data.');
  }
  return body;
}

function validEmail(value) {
  return typeof value === 'string' && value.trim().length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validPassword(value) {
  return (
    typeof value === 'string' &&
    Buffer.byteLength(value, 'utf8') >= 8 &&
    Buffer.byteLength(value, 'utf8') <= 72 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  );
}

function invalid(details) {
  throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid input data.', details);
}

export function parseSignup(body) {
  requireObjectBody(body);
  const details = [];
  const requiredFields = ['fullName', 'email', 'password', 'department', 'matricNumber', 'level', 'courseOfStudy'];
  for (const field of requiredFields) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      details.push({ field, message: `${field} is required.` });
    }
  }
  if (typeof body.fullName === 'string' && (body.fullName.trim().length < 2 || body.fullName.trim().length > 100)) {
    details.push({ field: 'fullName', message: 'Full name must be 2 to 100 characters.' });
  }
  if (body.email !== undefined && !validEmail(body.email)) {
    details.push({ field: 'email', message: 'Enter a valid email address.' });
  }
  if (body.password !== undefined && !validPassword(body.password)) {
    details.push({ field: 'password', message: 'Password must be 8–72 UTF-8 bytes and include uppercase, lowercase, number, and special character.' });
  }
  for (const field of ['department', 'courseOfStudy']) {
    if (typeof body[field] === 'string' && body[field].trim().length > 100) {
      details.push({ field, message: `${field} must be at most 100 characters.` });
    }
  }
  if (typeof body.matricNumber === 'string' && !/^[A-Za-z0-9/-]{5,20}$/.test(body.matricNumber.trim())) {
    details.push({ field: 'matricNumber', message: 'Matric number must be 5–20 letters, digits, slashes, or hyphens.' });
  }
  if (body.level !== undefined && !['100', '200', '300', '400', '500'].includes(body.level)) {
    details.push({ field: 'level', message: 'Level must be one of 100, 200, 300, 400, or 500.' });
  }
  if (details.length) invalid(details);

  return {
    fullName: body.fullName.trim(),
    email: body.email.trim().toLowerCase(),
    password: body.password,
    department: body.department.trim(),
    matricNumber: body.matricNumber.trim().toUpperCase(),
    level: body.level,
    courseOfStudy: body.courseOfStudy.trim(),
  };
}

export function parseEmailBody(body) {
  requireObjectBody(body);
  if (!validEmail(body.email)) {
    invalid([{ field: 'email', message: 'Enter a valid email address.' }]);
  }
  return { email: body.email.trim().toLowerCase() };
}

export function parseSignin(body) {
  requireObjectBody(body);
  const details = [];
  if (!validEmail(body.email)) details.push({ field: 'email', message: 'Enter a valid email address.' });
  if (typeof body.password !== 'string' || Buffer.byteLength(body.password, 'utf8') === 0 || Buffer.byteLength(body.password, 'utf8') > 72) {
    details.push({ field: 'password', message: 'Password must be between 1 and 72 UTF-8 bytes.' });
  }
  if (details.length) invalid(details);
  return { email: body.email.trim().toLowerCase(), password: body.password };
}

export function parsePasswordReset(body) {
  requireObjectBody(body);
  const details = [];
  if (typeof body.token !== 'string' || body.token.length < 20 || body.token.length > 200) {
    details.push({ field: 'token', message: 'A valid reset token is required.' });
  }
  if (!validPassword(body.newPassword)) {
    details.push({ field: 'newPassword', message: 'Password must be 8–72 UTF-8 bytes and include uppercase, lowercase, number, and special character.' });
  }
  if (details.length) invalid(details);
  return { token: body.token, newPassword: body.newPassword };
}

export function parseVerificationToken(query) {
  if (typeof query.token !== 'string' || query.token.length < 20 || query.token.length > 200) {
    throw new ApiError(400, 'INVALID_TOKEN', 'Invalid or expired verification token.');
  }
  return query.token;
}

export function validateRequest(parser) {
  return (req, _res, next) => {
    try {
      req.validated = parser(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}
