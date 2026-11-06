import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/api-error.js';

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.auth.studentId);
  res.json({ status: 'success', data: { user } });
});
