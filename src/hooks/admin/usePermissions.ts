'use client';

import { useAdminContext } from '@/contexts/AdminContext';
import { checkPermission, hasAnyPermission, hasAllPermissions } from '@/lib/permissions';

/**
 * Hook to check permissions in components
 */
export function usePermissions() {
  const { permissions, isSuperAdmin, isStaff } = useAdminContext();

  const can = (permission: string): boolean => {
    if (!isStaff) return false;
    if (isSuperAdmin) return true;
    return checkPermission(permissions, permission);
  };

  const canAny = (requiredPermissions: string[]): boolean => {
    if (!isStaff) return false;
    if (isSuperAdmin) return true;
    return hasAnyPermission(permissions, requiredPermissions);
  };

  const canAll = (requiredPermissions: string[]): boolean => {
    if (!isStaff) return false;
    if (isSuperAdmin) return true;
    return hasAllPermissions(permissions, requiredPermissions);
  };

  return {
    can,
    canAny,
    canAll,
    permissions,
    isSuperAdmin,
    isStaff,
  };
}

export default usePermissions;
