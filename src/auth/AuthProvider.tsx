import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { refreshSession, signIn as apiSignIn, signOut as apiSignOut, type Student } from './authApi';

interface AuthContextValue {
  user: Student | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: Student | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
let bootstrap: Promise<Student | null> | null = null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bootstrap) bootstrap = refreshSession().catch(() => null);
    bootstrap.then(setUser).finally(() => setLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setUser(await apiSignIn(email, password));
  }, []);
  const signOut = useCallback(async () => {
    try { await apiSignOut(); } finally { setUser(null); }
  }, []);
  const value = useMemo(() => ({ user, loading, signIn, signOut, setUser }), [user, loading, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}

