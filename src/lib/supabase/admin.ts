/**
 * Admin Supabase Client
 * Uses service role key for admin operations
 * 
 * Note: Using untyped client to avoid Supabase type inference issues
 * with insert/update operations. The Database types are correct but
 * the Supabase client version has strict type checking that causes
 * 'never' errors during build.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _adminClient: SupabaseClient<any> | null = null;

/**
 * Get Supabase admin client with service role key
 * This bypasses RLS for admin operations
 * Returns untyped client to avoid TypeScript issues with Supabase generics
 */
export function getAdminSupabase(): SupabaseClient<any> {
  return createAdminClient();
}

/**
 * Alias for getAdminSupabase - for compatibility
 */
export function getUntypedAdminSupabase(): SupabaseClient<any> {
  return getAdminSupabase();
}

/**
 * Create admin client (same as getAdminSupabase)
 * Kept for backwards compatibility with API routes
 */
export function createAdminClient(): SupabaseClient<any> {
  if (_adminClient) return _adminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY - required for admin operations');
  }

  _adminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _adminClient;
}

/**
 * Check if user has a specific permission
 * Super admin bypasses all permission checks (full access)
 */
export async function checkPermission(
  userId: string,
  permissionNeeded: string
): Promise<boolean> {
  const adminClient = getAdminSupabase();
  
  // First, check if user is super_admin (bypasses all permission checks)
  const { data: staffData } = await adminClient.rpc('check_user_role', {
    staff_user_id: userId
  });
  
  // The RPC returns an array of staff rows, get the first one's role
  const role = Array.isArray(staffData) && staffData.length > 0 
    ? staffData[0]?.role 
    : staffData?.role;
  
  // Super admin has ALL permissions
  if (role === 'super_admin') {
    return true;
  }
  
  // For other roles, check the permission table
  const { data: hasPermission } = await adminClient.rpc('has_permission', {
    check_user_id: userId,
    permission_needed: permissionNeeded
  });
  
  return !!hasPermission;
}

/**
 * Verify user is an active admin staff member
 */
export async function verifyAdminAccess(userId: string): Promise<boolean> {
  const adminClient = getAdminSupabase();
  
  const { data } = await adminClient.rpc('verify_admin_access', {
    staff_user_id: userId
  });
  
  return !!data;
}

export default getAdminSupabase;
