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

  constructor(message: string, code: string, status: number, details: Array<{ field?: string; message: string }> = []) {
    super(message);
    this.name = 'AuthApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

const baseUrl = (import.meta.env.VITE_AUTH_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '')).replace(/\/$/, '');
let accessToken: string | null = null;

async function request<T>(path: string, init: RequestInit = {}): Promise<ApiEnvelope<T>> {
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      credentials: 'include',
      headers: { ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), ...init.headers },
    });
  } catch {
    throw new AuthApiError('Could not reach the authentication server. Check your connection and try again.', 'NETWORK_ERROR', 0);
  }

  const result = await response.json().catch(() => null) as ApiEnvelope<T> | null;
  if (!response.ok || !result) {
    throw new AuthApiError(
      result?.error?.message || 'The request could not be completed. Please try again.',
      result?.error?.code || 'REQUEST_FAILED',
      response.status,
      result?.error?.details || [],
    );
  }
  return result;
}

export async function signIn(email: string, password: string) {
  const result = await request<{ user: Student; accessToken: string }>('/api/auth/signin', { method: 'POST', body: JSON.stringify({ email, password }) });
  if (!result.data?.accessToken || !result.data.user) throw new AuthApiError('The server returned an incomplete sign-in response.', 'INVALID_RESPONSE', 502);
  accessToken = result.data.accessToken;
  return result.data.user;
}

export async function signUp(input: { fullName: string; email: string; password: string; department: string; matricNumber: string; level: string; courseOfStudy: string }) {
  const result = await request<{ user: Student }>('/api/auth/signup', { method: 'POST', body: JSON.stringify(input) });
  return result.data?.user;
}

export async function resendVerification(email: string) {
  const result = await request('/api/auth/resend-verification', { method: 'POST', body: JSON.stringify({ email }) });
  return result.message;
}

export async function requestPasswordReset(email: string) {
  const result = await request('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
  return result.message;
}

export async function resetPassword(token: string, newPassword: string) {
  const result = await request('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) });
  accessToken = null;
  return result.message;
}

export async function verifyEmail(token: string) {
  const result = await request(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
  return result.message;
}

export async function getCurrentUser() {
  const result = await request<{ user: Student }>('/api/auth/me');
  return result.data?.user ?? null;
}

export async function refreshSession() {
  const result = await request<{ accessToken: string }>('/api/auth/refresh', { method: 'POST' });
  accessToken = result.data?.accessToken ?? null;
  if (!accessToken) throw new AuthApiError('Your session has expired. Please sign in again.', 'INVALID_TOKEN', 401);
  return getCurrentUser();
}

export async function signOut() {
  try {
    await request('/api/auth/signout', { method: 'POST' });
  } finally {
    accessToken = null;
  }
}

export function clearAccessToken() {
  accessToken = null;
}
