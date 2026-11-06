import { pool, supabase } from '../db.js';

const PROFILE_FIELDS = 'id, full_name, email, department, matric_number, level, course_of_study, is_verified, created_at, updated_at, last_login_at';

export async function findStudentProfile(studentId) {
  if (supabase) {
    const { data, error } = await supabase
      .from('students')
      .select(PROFILE_FIELDS)
      .eq('id', studentId)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  const result = await pool.query(
    `SELECT ${PROFILE_FIELDS} FROM public.students WHERE id = $1`,
    [studentId],
  );
  return result.rows[0] ?? null;
}
