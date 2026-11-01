export function toPublicUser(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    department: row.department,
    matricNumber: row.matric_number,
    level: row.level,
    courseOfStudy: row.course_of_study,
    isVerified: row.is_verified,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at).toISOString() : null,
  };
}
