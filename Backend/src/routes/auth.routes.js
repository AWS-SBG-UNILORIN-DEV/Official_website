import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { recoveryRateLimit, signinRateLimit, signupRateLimit } from '../middleware/rate-limiter.js';
import {
  parseEmailBody,
  parsePasswordReset,
  parseSignin,
  parseSignup,
  parseVerificationToken,
  validateRequest,
} from '../validation/auth.validation.js';

export const authRouter = Router();

authRouter.post('/signup', signupRateLimit, validateRequest(parseSignup), authController.signup);
authRouter.post('/resend-verification', recoveryRateLimit, validateRequest(parseEmailBody), authController.resendVerification);
authRouter.post('/signin', signinRateLimit, validateRequest(parseSignin), authController.signin);
authRouter.post('/signout', authController.signout);
authRouter.post('/refresh', authController.refresh);
authRouter.get('/me', authenticate, authController.me);
authRouter.post('/forgot-password', recoveryRateLimit, validateRequest(parseEmailBody), authController.forgotPassword);
authRouter.post('/reset-password', recoveryRateLimit, validateRequest(parsePasswordReset), authController.resetPassword);
authRouter.get('/verify-email', (req, _res, next) => {
  try {
    req.validated = { token: parseVerificationToken(req.query) };
    next();
  } catch (error) {
    next(error);
  }
}, authController.verifyEmail);
