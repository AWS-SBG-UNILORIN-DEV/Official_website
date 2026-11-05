import { supabaseAuth } from '../db.js';
import { ApiError } from '../utils/api-error.js';

export async function authenticate(req, _res, next) {
  const match = /^Bearer\s+([^\s]+)$/i.exec(req.get('authorization') ?? '');
  if (!match) return next(new ApiError(401, 'UNAUTHORIZED', 'Authentication required.'));

  try {
    const { data, error } = await supabaseAuth.auth.getUser(match[1]);
    if (error || !data.user) {
      return next(new ApiError(401, 'UNAUTHORIZED', 'Authentication required.'));
    }
    req.auth = { studentId: data.user.id };
    return next();
  } catch (error) {
    return next(error);
  }
}
