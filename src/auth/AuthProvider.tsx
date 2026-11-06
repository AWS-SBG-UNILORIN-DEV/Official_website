import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AuthApiError,
  authIdentityFromUser,
  completeStudentProfile,
  getStudentProfile,
  signIn as apiSignIn,
  signOut as apiSignOut,
  type AuthIdentity,
  type Student,
} from './authApi';
import { getSupabase } from './supabase';

interface ProfileInput {
  fullName: string;
  department: string;
  matricNumber: string;
  level: string;
  courseOfStudy: string;
}

interface AuthContextValue {
  user: Student | null;
  identity: AuthIdentity | null;
  loading: boolean;
  needsProfileCompletion: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  completeProfile: (input: ProfileInput) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isMissingProfile(error: unknown) {
  return error instanceof AuthApiError && error.code === 'USER_NOT_FOUND';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [identity, setIdentity] = useState<AuthIdentity | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);

  useEffect(() => {
    let active = true;
    let client;
    try { client = getSupabase(); } catch { setLoading(false); return; }

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        setIdentity(null);
        setNeedsProfileCompletion(false);
        setLoading(false);
        return;
      }

      setIdentity(authIdentityFromUser(session.user));
      setLoading(true);
      window.setTimeout(() => {
        void getStudentProfile(session.access_token)
          .then(profile => {
            if (!active) return;
            setUser(profile);
            setNeedsProfileCompletion(false);
          })
          .catch(error => {
            if (!active) return;
            setUser(null);
            setNeedsProfileCompletion(isMissingProfile(error));
          })
          .finally(() => { if (active) setLoading(false); });
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const profile = await apiSignIn(email, password);
      setUser(profile);
      setNeedsProfileCompletion(false);
      return true;
    } catch (error) {
      if (!isMissingProfile(error)) throw error;
      const { data, error: identityError } = await getSupabase().auth.getUser();
      if (identityError || !data.user) throw error;
      setIdentity(authIdentityFromUser(data.user));
      setUser(null);
      setNeedsProfileCompletion(true);
      return false;
    }
  }, []);

  const completeProfile = useCallback(async (input: ProfileInput) => {
    const profile = await completeStudentProfile(input);
    setUser(profile);
    setNeedsProfileCompletion(false);
    const { data } = await getSupabase().auth.getUser();
    if (data.user) setIdentity(authIdentityFromUser(data.user));
  }, []);

  const signOut = useCallback(async () => {
    try { await apiSignOut(); } finally {
      setUser(null);
      setIdentity(null);
      setNeedsProfileCompletion(false);
    }
  }, []);

  const value = useMemo(() => ({
    user, identity, loading, needsProfileCompletion, signIn, completeProfile, signOut,
  }), [user, identity, loading, needsProfileCompletion, signIn, completeProfile, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}
