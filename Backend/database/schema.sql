CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  department text NOT NULL,
  matric_number text NOT NULL UNIQUE,
  level text NOT NULL CHECK (level = ANY (ARRAY['100'::text, '200'::text, '300'::text, '400'::text, '500'::text])),
  course_of_study text NOT NULL,
  is_verified boolean NOT NULL DEFAULT false,
  verification_token text,
  verification_token_expires_at timestamptz,
  reset_token text,
  reset_token_expires_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.refresh_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  revoked boolean NOT NULL DEFAULT false,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS students_email_lower_unique_idx
  ON public.students (lower(email));
CREATE INDEX IF NOT EXISTS refresh_tokens_student_id_idx
  ON public.refresh_tokens (student_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_expiration_idx
  ON public.refresh_tokens (expires_at)
  WHERE revoked = false;

-- Supabase Data API needs these RPCs to keep token rotation and password reset atomic.
CREATE OR REPLACE FUNCTION public.rotate_refresh_token(
  p_old_token_hash text,
  p_new_token_hash text,
  p_expires_at timestamptz
)
RETURNS uuid
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE
  old_token public.refresh_tokens%ROWTYPE;
BEGIN
  SELECT * INTO old_token
  FROM public.refresh_tokens
  WHERE token_hash = p_old_token_hash
    AND revoked = false
    AND expires_at > now()
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  UPDATE public.refresh_tokens SET revoked = true WHERE id = old_token.id;
  INSERT INTO public.refresh_tokens (student_id, token_hash, expires_at)
  VALUES (old_token.student_id, p_new_token_hash, p_expires_at);

  RETURN old_token.student_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.reset_student_password(
  p_reset_token_hash text,
  p_password_hash text
)
RETURNS boolean
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE
  student_id_to_reset uuid;
BEGIN
  SELECT id INTO student_id_to_reset
  FROM public.students
  WHERE reset_token = p_reset_token_hash
    AND reset_token_expires_at > now()
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  UPDATE public.students
  SET password_hash = p_password_hash,
      reset_token = NULL,
      reset_token_expires_at = NULL,
      updated_at = now()
  WHERE id = student_id_to_reset;

  UPDATE public.refresh_tokens
  SET revoked = true
  WHERE student_id = student_id_to_reset AND revoked = false;

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.verify_student_email(p_verification_token_hash text)
RETURNS boolean
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.students
  SET is_verified = true,
      verification_token = NULL,
      verification_token_expires_at = NULL,
      updated_at = now()
  WHERE verification_token = p_verification_token_hash
    AND verification_token_expires_at > now();

  RETURN FOUND;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.rotate_refresh_token(text, text, timestamptz) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.reset_student_password(text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.verify_student_email(text) FROM PUBLIC;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.rotate_refresh_token(text, text, timestamptz) TO service_role';
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.reset_student_password(text, text) TO service_role';
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.verify_student_email(text) TO service_role';
  END IF;
END;
$$;
