# AWS STUDENT BUILDERS GROUP

This repository contains the codebase that powers the official Unilorin AWS STUDENT BUILDERS GROUP website.

## Prerequisites

- Node.js 20 or later
- npm

## Setup

```sh
git clone https://github.com/AWS-SBG-UNILORIN-DEV/Official_website.git
cd Official_website
npm ci
```

## Supabase Auth setup

1. Copy `.env.example` to `.env.local`. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Supabase project. Set `VITE_AUTH_API_URL=http://localhost:4000` for local development.
2. In Supabase Authentication settings, enable Email and Confirm email. Set the Site URL to `http://localhost:5173` and allow `http://localhost:5173/verify-email`, `http://localhost:5173/reset-password`, and `http://localhost:5173/auth/callback` as redirect URLs. Add the production versions too.
3. Apply the backend SQL schema or migration described in [`Backend/README.md`](./Backend/README.md), and configure SMTP in Supabase Authentication settings to deliver confirmation and recovery email.

4. To enable the optional Google sign-in button, enable Google under **Authentication → Sign In / Providers** in Supabase. Create a Google OAuth web client in Google Cloud, add the local and production website origins as authorized JavaScript origins, and set the authorized redirect URI to the Supabase callback URL shown in the provider settings (usually `https://<project-ref>.supabase.co/auth/v1/callback`). Enter the Google client ID and client secret in Supabase provider settings; they do not belong in the frontend env file. In Supabase **Authentication → URL Configuration**, allow the local and production `/auth/callback` URLs. After Google returns, users without a student profile are sent to the required profile completion form.
5. Start the backend from `Backend/` in one terminal and run `npm run dev` here in another.

The frontend anon/publishable key is public; never place the Supabase secret/service-role key in this project’s `.env.local`.

## Authentication API contract

Authentication is handled by Supabase Auth through the frontend SDK. Signup, sign-in, Google OAuth, sign-out, email verification/resend, and password recovery/reset are Supabase Auth operations; they are not custom Express endpoints. Supabase owns passwords, confirmation and recovery tokens, and sessions. The Express API verifies Supabase access tokens and serves the student profile.

The current Express authentication route is:

| Method | Path | Purpose | Responses |
| --- | --- | --- | --- |
| `GET` | `/api/auth/me` | Return the signed-in student's public profile. Requires `Authorization: Bearer <Supabase access token>`. | `200` profile; `401 UNAUTHORIZED` missing, invalid, or expired token; `404 USER_NOT_FOUND` when no profile exists; `500 SERVER_ERROR` unexpected failure. |

The route returns `{ "status": "success", "data": { "user": { ... } } }`. Errors use `{ "status": "error", "error": { "code": "...", "message": "..." } }`, with optional validation details. Authentication SDK errors are surfaced by the frontend and follow Supabase's Auth behavior; they do not have the Express endpoint status-code contract above.

The `public.students` table stores profile fields only. Passwords and authentication tokens are managed by Supabase Auth and are never included in profile responses. The complete field schema, validation rules, lifecycle, and request/response examples are documented in [`Backend/docs/auth-api.md`](./Backend/docs/auth-api.md); database setup is in [`Backend/README.md`](./Backend/README.md).

## Available Scripts

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run format:check
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.
