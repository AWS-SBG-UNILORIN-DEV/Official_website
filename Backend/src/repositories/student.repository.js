import { inTransaction, pool, supabase } from '../db.js';

const PROFILE_FIELDS = 'id, full_name, email, department, matric_number, level, course_of_study, is_verified, created_at, updated_at, last_login_at';

function throwSupabaseError(error) {
  if (error) throw error;
}

export async function createStudent(student) {
  if (supabase) {
    const { data, error } = await supabase
      .from('students')
      .insert({
        full_name: student.fullName,
        email: student.email,
        password_hash: student.passwordHash,
        department: student.department,
        matric_number: student.matricNumber,
        level: student.level,
        course_of_study: student.courseOfStudy,
        verification_token: student.verificationTokenHash,
        verification_token_expires_at: student.verificationTokenExpiresAt.toISOString(),
      })
      .select(PROFILE_FIELDS)
      .single();
    throwSupabaseError(error);
    return data;
  }

  const result = await pool.query(
    `INSERT INTO public.students
     (full_name, email, password_hash, department, matric_number, level, course_of_study,
      verification_token, verification_token_expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING ${PROFILE_FIELDS}`,
    [
      student.fullName,
      student.email,
      student.passwordHash,
      student.department,
      student.matricNumber,
      student.level,
      student.courseOfStudy,
      student.verificationTokenHash,
      student.verificationTokenExpiresAt,
    ],
  );
  return result.rows[0];
}

export async function findStudentByEmail(email) {
  if (supabase) {
    const { data, error } = await supabase
      .from('students')
      .select(`${PROFILE_FIELDS}, password_hash`)
      .eq('email', email)
      .maybeSingle();
    throwSupabaseError(error);
    return data;
  }

  const result = await pool.query(
    `SELECT ${PROFILE_FIELDS}, password_hash
     FROM public.students WHERE lower(email) = $1`,
    [email],
  );
  return result.rows[0] ?? null;
}

export async function findStudentProfile(studentId) {
  if (supabase) {
    const { data, error } = await supabase
      .from('students')
      .select(PROFILE_FIELDS)
      .eq('id', studentId)
      .maybeSingle();
    throwSupabaseError(error);
    return data;
  }

  const result = await pool.query(
    `SELECT ${PROFILE_FIELDS} FROM public.students WHERE id = $1`,
    [studentId],
  );
  return result.rows[0] ?? null;
}

export async function updateLastLogin(studentId) {
  if (supabase) {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('students')
      .update({ last_login_at: now, updated_at: now })
      .eq('id', studentId)
      .select(PROFILE_FIELDS)
      .maybeSingle();
    throwSupabaseError(error);
    return data;
  }

  const result = await pool.query(
    `UPDATE public.students SET last_login_at = now(), updated_at = now()
     WHERE id = $1 RETURNING ${PROFILE_FIELDS}`,
    [studentId],
  );
  return result.rows[0] ?? null;
}

export async function setVerificationToken(email, tokenHash, expiresAt) {
  if (supabase) {
    const { data, error } = await supabase
      .from('students')
      .update({
        verification_token: tokenHash,
        verification_token_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('email', email)
      .eq('is_verified', false)
      .select('email')
      .maybeSingle();
    throwSupabaseError(error);
    return data;
  }

  const result = await pool.query(
    `UPDATE public.students SET verification_token = $1,
     verification_token_expires_at = $2, updated_at = now()
     WHERE lower(email) = $3 AND is_verified = false RETURNING email`,
    [tokenHash, expiresAt, email],
  );
  return result.rows[0] ?? null;
}

export async function findStudentIdByEmail(email) {
  if (supabase) {
    const { data, error } = await supabase
      .from('students')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    throwSupabaseError(error);
    return data?.id ?? null;
  }

  const result = await pool.query(
    'SELECT id FROM public.students WHERE lower(email) = $1',
    [email],
  );
  return result.rows[0]?.id ?? null;
}

export async function setResetToken(studentId, tokenHash, expiresAt) {
  if (supabase) {
    const { error } = await supabase
      .from('students')
      .update({
        reset_token: tokenHash,
        reset_token_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', studentId);
    throwSupabaseError(error);
    return;
  }

  await pool.query(
    `UPDATE public.students SET reset_token = $1,
     reset_token_expires_at = $2, updated_at = now() WHERE id = $3`,
    [tokenHash, expiresAt, studentId],
  );
}

export async function resetPasswordWithToken(tokenHash, passwordHash) {
  if (supabase) {
    const { data, error } = await supabase.rpc('reset_student_password', {
      p_reset_token_hash: tokenHash,
      p_password_hash: passwordHash,
    });
    throwSupabaseError(error);
    return data === true;
  }

  return inTransaction(async (client) => {
    const result = await client.query(
      `SELECT id FROM public.students
       WHERE reset_token = $1 AND reset_token_expires_at > now()
       FOR UPDATE`,
      [tokenHash],
    );
    const student = result.rows[0];
    if (!student) return false;

    await client.query(
      `UPDATE public.students SET password_hash = $1, reset_token = NULL,
       reset_token_expires_at = NULL, updated_at = now() WHERE id = $2`,
      [passwordHash, student.id],
    );
    await client.query(
      'UPDATE public.refresh_tokens SET revoked = true WHERE student_id = $1 AND revoked = false',
      [student.id],
    );
    return true;
  });
}

export async function consumeVerificationToken(tokenHash) {
  if (supabase) {
    const { data, error } = await supabase.rpc('verify_student_email', {
      p_verification_token_hash: tokenHash,
    });
    throwSupabaseError(error);
    return data === true;
  }

  const result = await pool.query(
    `UPDATE public.students SET is_verified = true, verification_token = NULL,
     verification_token_expires_at = NULL, updated_at = now()
     WHERE verification_token = $1 AND verification_token_expires_at > now()
     RETURNING id`,
    [tokenHash],
  );
  return result.rowCount > 0;
}
