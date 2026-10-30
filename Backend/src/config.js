import 'dotenv/config';

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function integer(name, fallback, { min = 1, max = Number.MAX_SAFE_INTEGER } = {}) {
  const raw = process.env[name] ?? String(fallback);
  const value = Number(raw);
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
const databaseProvider = (process.env.DATABASE_PROVIDER ?? 'postgres').toLowerCase();
if (!['postgres', 'supabase'].includes(databaseProvider)) {
  throw new Error('DATABASE_PROVIDER must be postgres or supabase.');
}
const supabaseDatabaseUrl = process.env.SUPABASE_DATABASE_URL?.trim();
const databaseUrl = databaseProvider === 'postgres'
  ? (supabaseDatabaseUrl || required('DATABASE_URL'))
  : undefined;
const supabaseUrl = databaseProvider === 'supabase' ? required('SUPABASE_URL') : undefined;
const supabaseSecretKey = databaseProvider === 'supabase'
  ? (process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim())
  : undefined;
if (databaseProvider === 'supabase' && !supabaseSecretKey) {
  throw new Error('Set SUPABASE_SECRET_KEY (preferred) or SUPABASE_SERVICE_ROLE_KEY for the Supabase provider.');
}
if (databaseProvider === 'supabase') {
  const parsedSupabaseUrl = new URL(supabaseUrl);
  if (!['http:', 'https:'].includes(parsedSupabaseUrl.protocol)) {
    throw new Error('SUPABASE_URL must use HTTP or HTTPS.');
  }
  if (nodeEnv === 'production' && parsedSupabaseUrl.protocol !== 'https:') {
    throw new Error('SUPABASE_URL must use HTTPS in production.');
  }
}
const publicAppUrl = new URL(required('PUBLIC_APP_URL'));
if (!['http:', 'https:'].includes(publicAppUrl.protocol)) {
  throw new Error('PUBLIC_APP_URL must use HTTP or HTTPS.');
}
const accessTokenSecret = required('ACCESS_TOKEN_SECRET');
const accessTokenSecretBytes = Buffer.byteLength(accessTokenSecret, 'utf8');
if (accessTokenSecretBytes < 32) {
  throw new Error('ACCESS_TOKEN_SECRET must contain at least 32 bytes.');
}

const corsOrigins = (process.env.CORS_ORIGINS ?? publicAppUrl.origin)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map((origin) => new URL(origin).origin)
  .filter(Boolean);
const cookieSecure = boolean('AUTH_COOKIE_SECURE', nodeEnv === 'production');
const databaseSsl = boolean('DATABASE_SSL', nodeEnv === 'production');
const cookieSameSite = (process.env.AUTH_COOKIE_SAME_SITE ?? 'strict').toLowerCase();
const cookieName = required('AUTH_COOKIE_NAME');
if (!/^[A-Za-z0-9_-]+$/.test(cookieName)) {
  throw new Error('AUTH_COOKIE_NAME may contain only letters, digits, underscores, and hyphens.');
}
if (!['strict', 'lax', 'none'].includes(cookieSameSite)) {
  throw new Error('AUTH_COOKIE_SAME_SITE must be strict, lax, or none.');
}
if (cookieSameSite === 'none' && !cookieSecure) {
  throw new Error('AUTH_COOKIE_SECURE must be true when AUTH_COOKIE_SAME_SITE is none.');
}
if (nodeEnv === 'production' && !cookieSecure) {
  throw new Error('AUTH_COOKIE_SECURE must be true in production.');
}
if (nodeEnv === 'production' && databaseProvider === 'postgres' && !databaseSsl) {
  throw new Error('DATABASE_SSL must be true in production.');
}

const smtpPort = integer('SMTP_PORT', 587, { max: 65535 });
const smtpUser = process.env.SMTP_USER?.trim() ?? '';
const smtpPassword = process.env.SMTP_PASSWORD ?? '';
if (Boolean(smtpUser) !== Boolean(smtpPassword)) {
  throw new Error('SMTP_USER and SMTP_PASSWORD must either both be set or both be empty.');
}

export const config = Object.freeze({
  nodeEnv,
  port: integer('PORT', 4000, { max: 65535 }),
  trustProxyHops: integer('TRUST_PROXY_HOPS', 0, { min: 0, max: 10 }),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT ?? '20kb',
  databaseProvider,
  databaseUrl,
  supabaseUrl,
  supabaseSecretKey,
  databaseSsl,
  databasePool: Object.freeze({
    max: integer('DATABASE_POOL_MAX', 10, { max: 100 }),
    idleTimeoutMs: integer('DATABASE_IDLE_TIMEOUT_MS', 30_000, { max: 600_000 }),
    connectionTimeoutMs: integer('DATABASE_CONNECTION_TIMEOUT_MS', 5_000, { max: 120_000 }),
  }),
  accessTokenSecret,
  accessTokenIssuer: required('ACCESS_TOKEN_ISSUER'),
  accessTokenAudience: required('ACCESS_TOKEN_AUDIENCE'),
  accessTokenTtlSeconds: integer('AUTH_ACCESS_TOKEN_TTL_SECONDS', 900, { min: 60, max: 3600 }),
  refreshTokenTtlMs: integer('AUTH_REFRESH_TOKEN_TTL_DAYS', 7, { min: 1, max: 90 }) * 24 * 60 * 60 * 1000,
  verificationTokenTtlMs: integer('AUTH_VERIFICATION_TOKEN_TTL_HOURS', 24, { min: 1, max: 168 }) * 60 * 60 * 1000,
  resetTokenTtlMs: integer('AUTH_RESET_TOKEN_TTL_MINUTES', 60, { min: 5, max: 1440 }) * 60 * 1000,
  bcryptSaltRounds: integer('BCRYPT_SALT_ROUNDS', 12, { min: 10, max: 15 }),
  cookieName,
  cookieSameSite,
  cookieSecure,
  rateLimitWindowMs: integer('AUTH_RATE_LIMIT_WINDOW_MS', 900_000, { min: 1_000, max: 86_400_000 }),
  rateLimits: Object.freeze({
    signup: integer('AUTH_SIGNUP_RATE_LIMIT', 10, { max: 10_000 }),
    signin: integer('AUTH_SIGNIN_RATE_LIMIT', 5, { max: 10_000 }),
    recovery: integer('AUTH_RECOVERY_RATE_LIMIT', 5, { max: 10_000 }),
  }),
  publicAppUrl: publicAppUrl.origin,
  corsOrigins: Object.freeze([...new Set(corsOrigins)]),
  smtp: Object.freeze({
    host: required('SMTP_HOST'),
    port: smtpPort,
    secure: boolean('SMTP_SECURE', smtpPort === 465),
    requireTls: boolean('SMTP_REQUIRE_TLS', nodeEnv === 'production'),
    connectionTimeoutMs: integer('SMTP_CONNECTION_TIMEOUT_MS', 10_000, { max: 120_000 }),
    greetingTimeoutMs: integer('SMTP_GREETING_TIMEOUT_MS', 10_000, { max: 120_000 }),
    socketTimeoutMs: integer('SMTP_SOCKET_TIMEOUT_MS', 20_000, { max: 600_000 }),
    user: smtpUser,
    password: smtpPassword,
    from: required('EMAIL_FROM'),
  }),
});

if (nodeEnv === 'production' && publicAppUrl.protocol !== 'https:') {
  throw new Error('PUBLIC_APP_URL must use HTTPS in production.');
}
if (nodeEnv === 'production' && corsOrigins.some((origin) => new URL(origin).protocol !== 'https:')) {
  throw new Error('Every CORS_ORIGINS entry must use HTTPS in production.');
}
