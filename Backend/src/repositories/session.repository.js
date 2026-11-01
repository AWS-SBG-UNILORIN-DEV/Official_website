import { ApiError } from '../utils/api-error.js';
import { inTransaction, pool, supabase } from '../db.js';

function throwSupabaseError(error) {
  if (error) throw error;
}

export async function createRefreshToken(studentId, tokenHash, expiresAt) {
  if (supabase) {
    const { error } = await supabase.from('refresh_tokens').insert({
      student_id: studentId,
      token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
    });
    throwSupabaseError(error);
    return;
  }

  await pool.query(
    `INSERT INTO public.refresh_tokens (student_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [studentId, tokenHash, expiresAt],
  );
}

export async function rotateRefreshToken(oldTokenHash, newTokenHash, expiresAt) {
  if (supabase) {
    const { data, error } = await supabase.rpc('rotate_refresh_token', {
      p_old_token_hash: oldTokenHash,
      p_new_token_hash: newTokenHash,
      p_expires_at: expiresAt.toISOString(),
    });
    throwSupabaseError(error);
    if (!data) throw new ApiError(401, 'INVALID_TOKEN', 'Invalid or expired refresh token.');
    return data;
  }

  return inTransaction(async (client) => {
    const result = await client.query(
      `SELECT id, student_id FROM public.refresh_tokens
       WHERE token_hash = $1 AND revoked = false AND expires_at > now()
       FOR UPDATE`,
      [oldTokenHash],
    );
    const record = result.rows[0];
    if (!record) throw new ApiError(401, 'INVALID_TOKEN', 'Invalid or expired refresh token.');

    await client.query('UPDATE public.refresh_tokens SET revoked = true WHERE id = $1', [record.id]);
    await client.query(
      `INSERT INTO public.refresh_tokens (student_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [record.student_id, newTokenHash, expiresAt],
    );
    return record.student_id;
  });
}

export async function revokeRefreshToken(tokenHash) {
  if (supabase) {
    const { data, error } = await supabase
      .from('refresh_tokens')
      .update({ revoked: true })
      .eq('token_hash', tokenHash)
      .eq('revoked', false)
      .select('id')
      .maybeSingle();
    throwSupabaseError(error);
    return Boolean(data);
  }

  const result = await pool.query(
    `UPDATE public.refresh_tokens SET revoked = true
     WHERE token_hash = $1 AND revoked = false RETURNING id`,
    [tokenHash],
  );
  return result.rowCount > 0;
}
