import { createClient as supabaseCreateClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Admin Client factory (Server-side only)
 * Create the client at runtime inside request handlers to avoid
 * blowing up during Next.js build-time when secrets are not injected.
 * Using untyped client (any) to avoid strict type inference issues.
 */

let _supabaseAdmin: SupabaseClient<any> | null = null;

export function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY - required for server operations');
  }

  _supabaseAdmin = supabaseCreateClient<any>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _supabaseAdmin;
}

// Backwards-compatible alias expected by new conventions
export function getServerSupabase() {
  return getSupabaseAdmin();
}

// Export as async function for API routes
export async function createClient() {
  return getSupabaseAdmin();
}

export default getServerSupabase;
