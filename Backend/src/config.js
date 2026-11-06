import 'dotenv/config';

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function integer(name, fallback, { min = 1, max = Number.MAX_SAFE_INTEGER } = {}) {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isSafeInteger(value) || value < min || value > max) {
    throw new Error(`${name} must be an integer between ${min} and ${max}.`);
  }
  return value;
}

function boolean(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined) return fallback;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  throw new Error(`${name} must be either true or false.`);
}

const nodeEnv = process.env.NODE_ENV ?? 'development';
const databaseProvider = (process.env.DATABASE_PROVIDER ?? 'supabase').toLowerCase();
if (!['postgres', 'supabase'].includes(databaseProvider)) {
  throw new Error('DATABASE_PROVIDER must be postgres or supabase.');
}

const supabaseUrl = required('SUPABASE_URL');
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY?.trim()
  || process.env.SUPABASE_PUBLISHABLE_KEY?.trim()
  || '';
if (!supabaseAnonKey) {
  throw new Error('Set SUPABASE_ANON_KEY or SUPABASE_PUBLISHABLE_KEY for Supabase Auth.');
}
const parsedSupabaseUrl = new URL(supabaseUrl);
if (!['http:', 'https:'].includes(parsedSupabaseUrl.protocol)) {
  throw new Error('SUPABASE_URL must use HTTP or HTTPS.');
}
if (nodeEnv === 'production' && parsedSupabaseUrl.protocol !== 'https:') {
  throw new Error('SUPABASE_URL must use HTTPS in production.');
}

const supabaseSecretKey = databaseProvider === 'supabase'
  ? (process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim())
  : undefined;
if (databaseProvider === 'supabase' && !supabaseSecretKey) {
  throw new Error('Set SUPABASE_SECRET_KEY (preferred) or SUPABASE_SERVICE_ROLE_KEY for the Supabase Data API database provider.');
}

const databaseUrl = databaseProvider === 'postgres'
  ? (process.env.SUPABASE_DATABASE_URL?.trim() || required('DATABASE_URL'))
  : undefined;
const databaseSsl = boolean('DATABASE_SSL', nodeEnv === 'production');
if (nodeEnv === 'production' && databaseProvider === 'postgres' && !databaseSsl) {
  throw new Error('DATABASE_SSL must be true in production.');
}

const publicAppUrl = new URL(required('PUBLIC_APP_URL'));
if (!['http:', 'https:'].includes(publicAppUrl.protocol)) {
  throw new Error('PUBLIC_APP_URL must use HTTP or HTTPS.');
}
const corsOrigins = (process.env.CORS_ORIGINS ?? publicAppUrl.origin)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map((origin) => new URL(origin).origin);

if (nodeEnv === 'production' && publicAppUrl.protocol !== 'https:') {
  throw new Error('PUBLIC_APP_URL must use HTTPS in production.');
}
if (nodeEnv === 'production' && corsOrigins.some((origin) => new URL(origin).protocol !== 'https:')) {
  throw new Error('Every CORS_ORIGINS entry must use HTTPS in production.');
}

export const config = Object.freeze({
  nodeEnv,
  port: integer('PORT', 4000, { max: 65535 }),
  trustProxyHops: integer('TRUST_PROXY_HOPS', 0, { min: 0, max: 10 }),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT ?? '20kb',
  databaseProvider,
  databaseUrl,
  databaseSsl,
  databasePool: Object.freeze({
    max: integer('DATABASE_POOL_MAX', 10, { max: 100 }),
    idleTimeoutMs: integer('DATABASE_IDLE_TIMEOUT_MS', 30_000, { max: 600_000 }),
    connectionTimeoutMs: integer('DATABASE_CONNECTION_TIMEOUT_MS', 5_000, { max: 120_000 }),
  }),
  supabaseUrl,
  supabaseAnonKey,
  supabaseSecretKey,
  publicAppUrl: publicAppUrl.origin,
  corsOrigins: Object.freeze([...new Set(corsOrigins)]),
});
