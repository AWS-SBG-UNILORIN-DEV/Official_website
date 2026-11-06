import { createClient } from '@supabase/supabase-js';

export function createSupabaseClient(config) {
  return createClient(config.supabaseUrl, config.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
