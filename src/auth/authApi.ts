import type { User } from '@supabase/supabase-js';
import { getSupabase } from './supabase';

export interface AuthIdentity { id: string; email: string; fullName: string }

export function authIdentityFromUser(user: User): AuthIdentity {
  const metadata = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? '',
    fullName: metadata.fullName ?? metadata.full_name ?? metadata.name ?? '',
  };
}

export interface Student {
  id: string;
  fullName: string;
  email: string;
  department: string;
  matricNumber: string;
  level: string;
  courseOfStudy: string;
  isVerified: boolean;
  createdAt?: string;
  lastLoginAt?: string | null;
}

interface ApiEnvelope<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  error?: { code: string; message: string; details?: Array<{ field?: string; message: string }> };
}

export class AuthApiError extends Error {
  code: string;
  status: number;
  details: Array<{ field?: string; message: string }>;

  constructor(message: string, code = 'AUTH_ERROR', status = 400, details: Array<{ field?: string; message: string }> = []) {
    super(message);
    this.name = 'AuthApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

function normalizeAuthError(error: { message: string; code?: string; status?: number }) {
  const message = error.message || 'Authentication could not be completed.';
  const code = /email not confirmed/i.test(message) ? 'EMAIL_NOT_VERIFIED' : error.code || 'SUPABASE_AUTH_ERROR';
  return new AuthApiError(message, code, error.status || 400);
}

const apiBase = (import.meta.env.VITE_AUTH_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '')).replace(/\/$/, '');
const emailRedirect = () => `${window.location.origin}/verify-email`;

export async function signInWithGoogle() {
  const { error } = await getSupabase().auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  if (error) throw normalizeAuthError(error);
}

export async function completeStudentProfile(input: { fullName: string; department: string; matricNumber: string; level: string; courseOfStudy: string }) {
  const { error } = await getSupabase().auth.updateUser({
    data: {
      fullName: input.fullName.trim(),
      department: input.department.trim(),
      matricNumber: input.matricNumber.trim().toUpperCase(),
      level: input.level,
      courseOfStudy: input.courseOfStudy.trim(),
    },
  });
  if (error) throw normalizeAuthError(error);
  const profile = await getStudentProfile();
  if (!profile) throw new AuthApiError('Your student profile was not created. Please try again.', 'PROFILE_CREATE_FAILED', 500);
  return profile;
}

export async function signUp(input: { fullName: string; email: string; password: string; department: string; matricNumber: string; level: string; courseOfStudy: string }) {
  const { data, error } = await getSupabase().auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options: {
      emailRedirectTo: emailRedirect(),
      data: {
        fullName: input.fullName.trim(),
        department: input.department.trim(),
        matricNumber: input.matricNumber.trim().toUpperCase(),
        level: input.level,
        courseOfStudy: input.courseOfStudy.trim(),
      },
    },
  });
  if (error) throw normalizeAuthError(error);
  return data.user;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await getSupabase().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  if (error) throw normalizeAuthError(error);
  if (!data.session) throw new AuthApiError('No active session was returned. Verify your email, then try again.', 'EMAIL_NOT_VERIFIED', 401);
  return getStudentProfile(data.session.access_token);
}

export async function signOut() {
  const { error } = await getSupabase().auth.signOut();
  if (error) throw normalizeAuthError(error);
}

export async function resendVerification(email: string) {
  const { error } = await getSupabase().auth.resend({
    type: 'signup',
    email: email.trim().toLowerCase(),
    options: { emailRedirectTo: emailRedirect() },
  });
  if (error) throw normalizeAuthError(error);
  return 'If an unverified account exists for that email, a new verification link has been sent.';
}

export async function requestPasswordReset(email: string) {
  const { error } = await getSupabase().auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw normalizeAuthError(error);
  return 'If an account with that email exists, a password reset link has been sent.';
}

export async function hasPasswordRecoverySession() {
  const { data, error } = await getSupabase().auth.getSession();
  if (error) throw normalizeAuthError(error);
  return Boolean(data.session);
}

export async function resetPassword(newPassword: string) {
  const { error } = await getSupabase().auth.updateUser({ password: newPassword });
  if (error) throw normalizeAuthError(error);
  return 'Password updated successfully. You can now sign in with your new password.';
}

export async function verifyEmail(tokenHash = '', type = 'email') {
  const client = getSupabase();
  if (tokenHash) {
    const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type: type as 'email' });
    if (error) throw normalizeAuthError(error);
  } else {
    const { data, error } = await client.auth.getSession();
    if (error) throw normalizeAuthError(error);
    if (!data.session) {
      throw new AuthApiError('This verification link is invalid or expired. Request a new link and try again.', 'INVALID_TOKEN', 400);
    }
  }

  const { data, error } = await client.auth.getUser();
  if (error) throw normalizeAuthError(error);
  if (!data.user?.email_confirmed_at) {
    throw new AuthApiError('This verification link is invalid or expired. Request a new link and try again.', 'INVALID_TOKEN', 400);
  }
  return 'Email verified successfully. You can now sign in.';
}

export async function getStudentProfile(accessToken?: string): Promise<Student | null> {
  const client = getSupabase();
  let token = accessToken;
  if (!token) {
    const { data, error } = await client.auth.getSession();
    if (error) throw normalizeAuthError(error);
    token = data.session?.access_token;
  }
  if (!token) return null;

  let response: Response;
  try {
    response = await fetch(`${apiBase}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new AuthApiError('Could not reach the profile API. Check the backend URL and try again.', 'NETWORK_ERROR', 0);
  }

  const result = await response.json().catch(() => null) as ApiEnvelope<{ user: Student }> | null;
  if (!response.ok || !result?.data?.user) {
    throw new AuthApiError(
      result?.error?.message || 'Your student profile could not be loaded.',
      result?.error?.code || 'PROFILE_LOAD_FAILED',
      response.status,
      result?.error?.details || [],
    );
  }
  return result.data.user;
}

export async function getCurrentUser() {
  return getStudentProfile();
}
