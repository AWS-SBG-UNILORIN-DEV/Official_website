# Authentication API

Express API for student authentication, backed by PostgreSQL. The contract is documented in [`docs/auth-api.md`](docs/auth-api.md), and the database schema is in [`database/schema.sql`](database/schema.sql).

## Database providers

Choose one provider in `.env`:

- `DATABASE_PROVIDER=postgres` uses a direct PostgreSQL connection from `DATABASE_URL`. Use this for PostgreSQL-compatible hosts such as Supabase PostgreSQL, Neon, Railway, and Render. `SUPABASE_DATABASE_URL` is accepted as the connection string when `DATABASE_URL` is blank.
- `DATABASE_PROVIDER=supabase` uses the Supabase Data API. Set `SUPABASE_URL` and the server-only `SUPABASE_SECRET_KEY`. The legacy `SUPABASE_SERVICE_ROLE_KEY` is also accepted. The anon/publishable key is not sufficient for this privileged server provider.

The Supabase Data API provider uses RPC functions in [`database/schema.sql`](database/schema.sql) to keep refresh-token rotation and password resets atomic. Apply the full schema file before using it. Supabase secret keys bypass Row Level Security, so keep the key out of frontend code and source control. [Supabase's API key guide](https://supabase.com/docs/guides/getting-started/api-keys) explains the server-side key types.

## Run locally

1. Use Node.js 20 or newer and PostgreSQL.
2. Create a database, then apply the full `database/schema.sql` file. For Supabase, run it in the Supabase SQL Editor.
3. Copy `.env.example` to `.env` and set `DATABASE_URL`, a random `ACCESS_TOKEN_SECRET`, the allowed frontend origin, and working SMTP credentials. All secrets and security-sensitive settings are read from environment variables.
4. Install dependencies with `npm install`.
5. Start the API with `npm run dev` (watch mode) or `npm start`.

The API listens on the `PORT` environment setting (default `4000`). The frontend origin must be listed in `CORS_ORIGINS`. For production testing, use the untracked `.env` file, select a provider, fill its matching connection settings and credentials, and deploy behind HTTPS. The production config rejects non-HTTPS app URLs and defaults cookies and database connections to secure settings.

## Routes

- `POST /api/auth/signup`
- `POST /api/auth/resend-verification`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/verify-email`

The refresh token is an opaque random value stored only as a SHA-256 hash in the database and sent to the browser in an HTTP-only cookie. Access tokens are short-lived JWTs.

Rate limits use an in-memory store by default. Configure a shared store before running multiple API instances.

## Structure

- `routes/` maps endpoints to middleware and controllers.
- `controllers/` handles HTTP request and response details.
- `services/` contains authentication workflows.
- `repositories/` contains PostgreSQL queries.
- `middleware/` handles authentication and rate limiting.
- `validation/` parses and validates API inputs.
- `utils/` contains token, password, user projection, and error helpers.
