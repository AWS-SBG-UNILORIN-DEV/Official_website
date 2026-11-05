import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const publicKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const supabase = url && publicKey
  ? createClient(url, publicKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        persistSession: true,
      },
    })
  : null;

export function getSupabase() {
  if (!supabase) {
    throw new Error('Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the frontend .env.local file, then restart Vite.');
  }
  return supabase;
}
