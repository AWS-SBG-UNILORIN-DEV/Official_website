import { ApiError } from '../utils/api-error.js';
import { toPublicUser } from '../utils/users.js';
import { findStudentProfile } from '../repositories/student.repository.js';

export async function getProfile(studentId) {
  const student = await findStudentProfile(studentId);
  if (!student) throw new ApiError(404, 'USER_NOT_FOUND', 'Student profile not found.');
  return toPublicUser(student);
}
