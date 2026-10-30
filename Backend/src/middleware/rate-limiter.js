import { rateLimit } from 'express-rate-limit';
import { config } from '../config.js';

function createRateLimiter(limit) {
  return rateLimit({
    windowMs: config.rateLimitWindowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_req, res) => res.status(429).json({
      status: 'error',
      error: { code: 'TOO_MANY_REQUESTS', message: 'Too many attempts. Please try again later.' },
    }),
  });
}

export const signupRateLimit = createRateLimiter(config.rateLimits.signup);
export const signinRateLimit = createRateLimiter(config.rateLimits.signin);
export const recoveryRateLimit = createRateLimiter(config.rateLimits.recovery);
