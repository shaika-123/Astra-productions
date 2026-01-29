'use client';

import { usePermissions } from '@/hooks/admin/usePermissions';

interface PermissionGateProps {
  children: React.ReactNode;
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Conditionally render children based on user permissions
 */
export function PermissionGate({
  children,
  permission,
  permissions,
  requireAll = false,
  fallback = null,
}: PermissionGateProps) {
  const { can, canAny, canAll } = usePermissions();

  // Single permission check
  if (permission) {
    if (!can(permission)) return <>{fallback}</>;
    return <>{children}</>;
  }

  // Multiple permissions check
  if (permissions && permissions.length > 0) {
    const hasAccess = requireAll 
      ? canAll(permissions) 
      : canAny(permissions);
    
    if (!hasAccess) return <>{fallback}</>;
    return <>{children}</>;
  }

  // No permission specified, render children
  return <>{children}</>;
}

export default PermissionGate;
