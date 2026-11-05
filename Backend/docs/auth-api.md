# Authentication and Student Profile API

Supabase Auth is the source of truth for identity and authentication. The React frontend calls Supabase Auth directly through `@supabase/supabase-js`; Express does not accept passwords or create its own tokens.

## Supabase Auth flows

Configure Email authentication and keep **Confirm email** enabled in Supabase. Set the Auth Site URL and allow-list the frontend callback URLs `/verify-email`, `/reset-password`, and `/auth/callback`.

| Flow | Supabase client operation | Result |
| --- | --- | --- |
| Sign up | `auth.signUp({ email, password, options: { emailRedirectTo, data } })` | Supabase creates an unconfirmed auth user and sends its confirmation email. The auth trigger creates/synchronizes a student profile. |
| Sign in | `auth.signInWithPassword({ email, password })` | Supabase issues the session and SDK refreshes it. |
| Google sign in/sign up | `auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })` | Supabase handles Google OAuth; the browser returns to `/auth/callback`. A new identity without student metadata is prompted to complete the profile before accessing student features. |
| Resend confirmation | `auth.resend({ type: 'signup', email, options })` | Supabase sends a new confirmation link. |
| Verify email | Supabase confirmation redirect, or `auth.verifyOtp({ token_hash, type: 'email' })` when using a token-hash template | Supabase consumes and validates its one-time confirmation token and updates `auth.users.email_confirmed_at`. |
| Forgot password | `auth.resetPasswordForEmail(email, { redirectTo })` | Supabase sends a password recovery link without revealing whether the email exists. |
| Set new password | `auth.updateUser({ password })` | Supabase validates the recovery session and updates the password. |
| Sign out | `auth.signOut()` | Supabase revokes the current session. |

The raw confirmation/recovery tokens are generated, stored, expired, and consumed by Supabase Auth. The application does not generate or store these tokens. The browser SDK handles the redirect/session callback and stores the Supabase session using its configured PKCE flow.

## Public profile schema

`public.students` contains profile fields only; credentials and authentication tokens remain in Supabase's `auth` schema.

| API field | Database column | Type | Rules |
| --- | --- | --- | --- |
| `id` | `id` | UUID | Matches `auth.users.id`; primary key and cascade delete. |
| `fullName` | `full_name` | string | Required, 2–100 characters. |
| `email` | `email` | string | Required, synchronized from Auth, unique case-insensitively. |
| `department` | `department` | string | Required, at most 100 characters. |
| `matricNumber` | `matric_number` | string | Required, unique, 5–20 letters/digits/slashes/hyphens. |
| `level` | `level` | string | One of `100`, `200`, `300`, `400`, `500`. |
| `courseOfStudy` | `course_of_study` | string | Required, at most 100 characters. |
| `isVerified` | `is_verified` | boolean | Mirrors `auth.users.email_confirmed_at`. |
| `lastLoginAt` | `last_login_at` | timestamp or `null` | Mirrors the last successful Auth sign-in. |
| `createdAt` | `created_at` | timestamp | Profile creation time. |
| `updatedAt` | `updated_at` | timestamp | Last profile synchronization time. |

The Auth trigger validates complete profile metadata and writes the profile. OAuth identities may exist without a `public.students` row until the user submits the profile completion form; the form updates Auth metadata, which causes the trigger to create the row. Until then, `GET /api/auth/me` returns `404 USER_NOT_FOUND`. RLS permits an authenticated user to select only the profile whose `id` matches `auth.uid()`. The backend uses its server-only database key for profile retrieval after verifying the request's user token.

## Express endpoint: current profile

`GET /api/auth/me`

Header: `Authorization: Bearer <Supabase access token>`.

Success (`200`):

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullName": "John Doe",
      "email": "johndoe@example.com",
      "department": "Computer Science",
      "matricNumber": "CS/2021/001",
      "level": "300",
      "courseOfStudy": "Computer Science",
      "isVerified": true,
      "createdAt": "2026-10-19T10:30:00.000Z",
      "updatedAt": "2026-10-19T10:30:00.000Z",
      "lastLoginAt": "2026-10-19T10:35:00.000Z"
    }
  }
}
```

Errors: `401 UNAUTHORIZED` for a missing/invalid/expired Supabase access token; `404 USER_NOT_FOUND` if the authenticated user has no student profile; `500 SERVER_ERROR` for an unexpected backend or database error.

## Environment and email delivery

The frontend needs the Supabase project URL and anon/publishable key. The backend needs the same URL and public key to validate Supabase users; when using the Supabase Data API for profile reads it additionally needs the server-only secret/service-role key. Configure SMTP under Supabase **Authentication → SMTP Settings**. Supabase's built-in sender is restricted and intended for development; use a custom SMTP provider and verified sender domain for production.

For the existing custom-auth database, apply the migration in `database/migrations/20261103_supabase_auth.sql`. It clears old custom password hashes/tokens and drops custom refresh sessions. Existing profile rows remain and link to Auth when their owner signs up with the same email and confirms it. Those users must choose a new password.
