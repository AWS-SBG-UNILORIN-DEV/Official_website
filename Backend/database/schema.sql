-- Supabase Auth owns passwords, confirmation tokens, recovery tokens, and sessions.
-- This table contains only the student-facing profile linked to auth.users.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.students (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  email text NOT NULL UNIQUE,
  department text NOT NULL CHECK (char_length(department) <= 100),
  matric_number text NOT NULL UNIQUE CHECK (matric_number ~ '^[A-Za-z0-9/-]{5,20}$'),
  level text NOT NULL CHECK (level = ANY (ARRAY['100'::text, '200'::text, '300'::text, '400'::text, '500'::text])),
  course_of_study text NOT NULL CHECK (char_length(course_of_study) <= 100),
  is_verified boolean NOT NULL DEFAULT false,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS students_email_lower_unique_idx
  ON public.students (lower(email));

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.students FROM anon, authenticated;
GRANT SELECT ON TABLE public.students TO authenticated;
DROP POLICY IF EXISTS students_select_own_profile ON public.students;
CREATE POLICY students_select_own_profile
  ON public.students FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE OR REPLACE FUNCTION public.sync_student_from_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  full_name_value text := btrim(coalesce(NEW.raw_user_meta_data ->> 'fullName', NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''));
  department_value text := btrim(coalesce(NEW.raw_user_meta_data ->> 'department', ''));
  matric_number_value text := upper(btrim(coalesce(NEW.raw_user_meta_data ->> 'matricNumber', '')));
  level_value text := coalesce(NEW.raw_user_meta_data ->> 'level', '');
  course_value text := btrim(coalesce(NEW.raw_user_meta_data ->> 'courseOfStudy', ''));
BEGIN
  IF NEW.email IS NULL THEN
    RAISE EXCEPTION 'An email address is required for a student account.'
      USING ERRCODE = '23514';
  END IF;

  -- OAuth identities start without university profile fields. They can sign in,
  -- but cannot access student profile features until the completion form is saved.
  IF full_name_value = '' OR department_value = '' OR matric_number_value = ''
    OR level_value = '' OR course_value = '' THEN
    RETURN NEW;
  END IF;

  IF full_name_value !~ '^.{2,100}$'
    OR char_length(department_value) > 100
    OR matric_number_value !~ '^[A-Z0-9/-]{5,20}$'
    OR level_value NOT IN ('100', '200', '300', '400', '500')
    OR char_length(course_value) > 100 THEN
    RAISE EXCEPTION 'Student profile metadata is invalid.'
      USING ERRCODE = '23514';
  END IF;

  IF EXISTS (SELECT 1 FROM public.students WHERE id = NEW.id) THEN
    UPDATE public.students
    SET full_name = full_name_value,
        email = lower(NEW.email),
        department = department_value,
        matric_number = matric_number_value,
        level = level_value,
        course_of_study = course_value,
        is_verified = NEW.email_confirmed_at IS NOT NULL,
        last_login_at = NEW.last_sign_in_at,
        updated_at = now()
    WHERE id = NEW.id;
  ELSE
    IF NEW.email_confirmed_at IS NULL THEN
      INSERT INTO public.students (
        id, full_name, email, department, matric_number, level,
        course_of_study, is_verified, last_login_at, created_at, updated_at
      ) VALUES (
        NEW.id, full_name_value, lower(NEW.email), department_value, matric_number_value,
        level_value, course_value, false, NEW.last_sign_in_at,
        coalesce(NEW.created_at, now()), now()
      )
      ON CONFLICT (email) DO NOTHING;
    ELSE
      INSERT INTO public.students (
        id, full_name, email, department, matric_number, level,
        course_of_study, is_verified, last_login_at, created_at, updated_at
      ) VALUES (
        NEW.id, full_name_value, lower(NEW.email), department_value, matric_number_value,
        level_value, course_value, true, NEW.last_sign_in_at,
        coalesce(NEW.created_at, now()), now()
      )
      ON CONFLICT (email) DO UPDATE SET
        id = EXCLUDED.id,
        full_name = EXCLUDED.full_name,
        department = EXCLUDED.department,
        matric_number = EXCLUDED.matric_number,
        level = EXCLUDED.level,
        course_of_study = EXCLUDED.course_of_study,
        is_verified = true,
        last_login_at = NEW.last_sign_in_at,
        updated_at = now();
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_student_from_auth_user() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS on_auth_user_profile_sync ON auth.users;
CREATE TRIGGER on_auth_user_profile_sync
  AFTER INSERT OR UPDATE OF email, email_confirmed_at, last_sign_in_at, raw_user_meta_data
  ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_student_from_auth_user();
