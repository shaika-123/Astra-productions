'use client';

import { useEffect, useState } from 'react';
import { getClientSupabase } from '@/lib/supabase/client';
import type { AdminStaff, StaffRole } from '@/types/admin';

interface AdminAuthState {
  staff: AdminStaff | null;
  permissions: string[];
  isLoading: boolean;
  isStaff: boolean;
  isSuperAdmin: boolean;
  role: StaffRole | null;
  userId: string | null;
  error: string | null;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    staff: null,
    permissions: [],
    isLoading: true,
    isStaff: false,
    isSuperAdmin: false,
    role: null,
    userId: null,
    error: null,
  });

  useEffect(() => {
    const fetchAuthData = async () => {
      const supabase = getClientSupabase();
      if (!supabase) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Supabase client not available',
        }));
        return;
      }

      try {
        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: authError?.message || 'Not authenticated',
          }));
          return;
        }

        // Check if user is staff using RPC
        const staffResult = await (supabase as any)
          .rpc('check_user_role', { staff_user_id: user.id });
        const staffData = staffResult.data;

        if (!staffData || staffData.length === 0) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            userId: user.id,
            error: 'User is not a staff member',
          }));
          return;
        }

        const staffRecord = staffData[0];

        // Get user role permissions
        const permsResult = await (supabase as any)
          .rpc('get_role_permissions', { user_role: staffRecord.role });
        const permsData = permsResult.data;

        const permissions = permsData?.map((p: { permission: string }) => p.permission) || [];

        setState({
          staff: {
            id: staffRecord.staff_id,
            user_id: staffRecord.user_id,
            name: staffRecord.name,
            email: staffRecord.email,
            role: staffRecord.role as StaffRole,
            status: staffRecord.status,
            created_at: staffRecord.created_at,
            updated_at: staffRecord.created_at,
          } as unknown as AdminStaff,
          permissions,
          isLoading: false,
          isStaff: true,
          isSuperAdmin: staffRecord.role === 'super_admin',
          role: staffRecord.role as StaffRole,
          userId: user.id,
          error: null,
        });

      } catch (error) {
        console.error('Admin auth error:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to verify admin access',
        }));
      }
    };

    fetchAuthData();
  }, []);

  const hasPermission = (permission: string): boolean => {
    if (!state.staff) return false;
    if (state.isSuperAdmin) return true;
    return state.permissions.includes(permission);
  };

  return {
    ...state,
    hasPermission,
  };
}

export default useAdminAuth;
