# Student profile API with Supabase Auth

Supabase Auth owns student passwords, email confirmation, password recovery, and login sessions. The frontend uses the Supabase JavaScript SDK for those flows. This Express API verifies Supabase access tokens and returns the corresponding `public.students` profile.

## Supabase setup

1. In Supabase, enable **Email** and keep **Confirm email** enabled. Configure custom SMTP in **Authentication → SMTP Settings** for real email delivery; the built-in mailer is limited and intended for development.
2. Set the Auth **Site URL** to the frontend URL. Add these URLs to the redirect allow list:
   - `http://localhost:5173/verify-email`
   - `http://localhost:5173/reset-password`
   - The equivalent production URLs.
3. For a new database, run [`database/schema.sql`](database/schema.sql) in the Supabase SQL Editor. For a database that has the previous custom-auth schema, back up the project and run [`database/migrations/20261103_supabase_auth.sql`](database/migrations/20261103_supabase_auth.sql) instead.
4. Configure the frontend `.env.local` with `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_AUTH_API_URL` (see the root project `.env.example`). Configure the backend `.env` from this folder's `.env.example`.
5. Install dependencies and start the API with `npm install` and `npm run dev`.

The browser anon/publishable key is public and is protected by Row Level Security. `SUPABASE_SECRET_KEY` (or legacy `SUPABASE_SERVICE_ROLE_KEY`) is server-only and is used only by the backend when `DATABASE_PROVIDER=supabase`. Never put that secret in the frontend or commit it.

For `DATABASE_PROVIDER=postgres`, `DATABASE_URL` must connect directly to the same Supabase project database so `auth.users` and the student profile trigger are in the same database. `DATABASE_PROVIDER=supabase` uses the Supabase Data API.

## API routes

- `GET /health` checks database connectivity.
- `GET /api/auth/me` requires `Authorization: Bearer <Supabase access token>` and returns the signed-in student's profile.

Signup, sign-in, sign-out, email confirmation/resend, and password recovery are performed by Supabase Auth from the frontend, not by custom Express endpoints.

## Student profile lifecycle

The `public.students` table stores student profile data only. A trigger on `auth.users` creates or synchronizes the profile, including `is_verified` and `last_login_at`. Row Level Security lets an authenticated user read only their own profile. The API checks the Supabase token with Auth before looking up the profile.

The old custom-auth migration invalidates old backend refresh tokens and email/reset links and clears stored custom password hashes. Existing profiles are retained; a student must create and confirm a Supabase Auth account using the same email to link that profile. They will choose a new password.

## Structure

- `routes/` maps the profile endpoint.
- `controllers/` handles HTTP requests and responses.
- `services/` contains profile behavior.
- `repositories/` contains profile reads for the selected database provider.
- `middleware/` verifies Supabase access tokens.
- `db/providers/` contains PostgreSQL, Supabase Data API, and Supabase Auth clients.
