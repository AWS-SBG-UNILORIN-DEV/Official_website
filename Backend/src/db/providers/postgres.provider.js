import pg from 'pg';

const { Pool } = pg;

export function createPostgresPool(config) {
  return new Pool({
    connectionString: config.databaseUrl,
    ssl: config.databaseSsl ? { rejectUnauthorized: true } : undefined,
    max: config.databasePool.max,
    idleTimeoutMillis: config.databasePool.idleTimeoutMs,
    connectionTimeoutMillis: config.databasePool.connectionTimeoutMs,
  });
}
