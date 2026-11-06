import { createClient } from '@supabase/supabase-js';

export function createSupabaseAuthClient(config) {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
