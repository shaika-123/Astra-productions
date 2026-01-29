import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { devLog } from '@/lib/logger';

let _client: SupabaseClient<any> | null = null;

export function getClientSupabase(): SupabaseClient<any> | null {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    devLog.warn('Client Supabase not configured: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing');
    return null;
  }

  _client = createClient(url, anonKey, {
    global: {
      headers: {
        Accept: 'application/json',
      },
    },
  });

  return _client;
}

export default getClientSupabase;
