import { ApiError } from '../utils/api-error.js';
import { verifyAccessToken } from '../utils/tokens.js';

export function authenticate(req, _res, next) {
  const match = /^Bearer\s+([^\s]+)$/i.exec(req.get('authorization') ?? '');
  if (!match) return next(new ApiError(401, 'UNAUTHORIZED', 'Authentication required.'));

  try {
    const claims = verifyAccessToken(match[1]);
    req.auth = { studentId: claims.sub };
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'TOKEN_EXPIRED', 'Session expired. Please refresh or sign in again.'));
    }
    return next(new ApiError(401, 'UNAUTHORIZED', 'Authentication required.'));
  }
}
