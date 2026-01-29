export { getClientSupabase } from './supabase/client';
export { getSupabaseAdmin, getServerSupabase } from './supabase/server';

/**
 * Backwards-compatible shim for existing imports.
 * `getSupabase()` returns the client-safe helper (may return null in browsers)
 * so client-side code does not throw when envs are missing.
 */
import { getClientSupabase } from './supabase/client';

export function getSupabase() {
  return getClientSupabase();
}

export default getSupabase;
