import { config } from './config.js';
import { createPostgresPool } from './db/providers/postgres.provider.js';
import { createSupabaseClient } from './db/providers/supabase.provider.js';

export const pool = config.databaseProvider === 'postgres'
  ? createPostgresPool(config)
  : null;
export const supabase = config.databaseProvider === 'supabase'
  ? createSupabaseClient(config)
  : null;

pool?.on('error', (error) => {
  console.error('Unexpected idle PostgreSQL client error:', error.message);
});

export async function checkDatabaseConnection() {
  if (pool) {
    await pool.query('SELECT 1');
    return;
  }
  const { error } = await supabase.from('students').select('id').limit(1);
  if (error) throw error;
}

export async function closeDatabase() {
  if (pool) await pool.end();
}

export async function inTransaction(callback) {
  if (!pool) throw new Error('PostgreSQL transactions are unavailable with the Supabase Data API provider.');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
