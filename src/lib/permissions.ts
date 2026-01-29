/**
 * Permission utilities for admin panel
 */
import type { NavSection, NavItem } from '@/types/admin';

/**
 * Check if user has a specific permission
 */
export function checkPermission(
  permissions: string[],
  requiredPermission: string
): boolean {
  if (!permissions || permissions.length === 0) return false;
  return permissions.includes(requiredPermission);
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(
  permissions: string[],
  requiredPermissions: string[]
): boolean {
  if (!permissions || permissions.length === 0) return false;
  return requiredPermissions.some(p => permissions.includes(p));
}

/**
 * Check if user has all of the specified permissions
 */
export function hasAllPermissions(
  permissions: string[],
  requiredPermissions: string[]
): boolean {
  if (!permissions || permissions.length === 0) return false;
  return requiredPermissions.every(p => permissions.includes(p));
}

/**
 * Filter navigation items based on user permissions
 * Super admin bypasses all permission checks
 */
export function filterNavByPermissions(
  navSections: NavSection[],
  permissions: string[],
  role?: string | null
): NavSection[] {
  // Super admin gets all navigation items
  if (role === 'super_admin') {
    return navSections;
  }
  
  return navSections
    .map(section => ({
      ...section,
      items: section.items.filter(item => 
        !item.permission || checkPermission(permissions, item.permission)
      )
    }))
    .filter(section => section.items.length > 0);
}

/**
 * Get permission category from permission code
 */
export function getPermissionCategory(permissionCode: string): string {
  const parts = permissionCode.split('.');
  return parts[0] || 'unknown';
}

/**
 * Group permissions by category
 */
export function groupPermissionsByCategory(
  permissions: Array<{ permission_code: string; permission_name: string; category: string }>
): Record<string, Array<{ code: string; name: string }>> {
  return permissions.reduce((acc, perm) => {
    const category = perm.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      code: perm.permission_code,
      name: perm.permission_name,
    });
    return acc;
  }, {} as Record<string, Array<{ code: string; name: string }>>);
}

/**
 * Permission code constants for type safety
 */
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard.view',
  
  // Staff
  STAFF_VIEW: 'staff.read',
  STAFF_CREATE: 'staff.create',
  STAFF_UPDATE: 'staff.update',
  STAFF_REMOVE: 'staff.delete',
  STAFF_MANAGE_PERMISSIONS: 'staff.manage_permissions',
  
  // Movies
  MOVIES_VIEW: 'movies.read',
  MOVIES_CREATE: 'movies.create',
  MOVIES_UPDATE: 'movies.update',
  MOVIES_DELETE: 'movies.delete',
  
  // Events
  EVENTS_VIEW: 'events.read',
  EVENTS_CREATE: 'events.create',
  EVENTS_UPDATE: 'events.update',
  EVENTS_DELETE: 'events.delete',
  EVENTS_MANAGE_TICKETS: 'events.manage_tickets',
  
  // News
  NEWS_VIEW: 'news.read',
  NEWS_CREATE: 'news.create',
  NEWS_UPDATE: 'news.update',
  NEWS_DELETE: 'news.delete',
  
  // Awards
  AWARDS_VIEW: 'awards.read',
  AWARDS_CREATE: 'awards.create',
  AWARDS_UPDATE: 'awards.update',
  AWARDS_DELETE: 'awards.delete',
  
  // Gallery
  GALLERY_VIEW: 'gallery.read',
  GALLERY_UPLOAD: 'gallery.upload',
  GALLERY_DELETE: 'gallery.delete',
  
  // Tickets
  TICKETS_VIEW: 'tickets.read',
  TICKETS_EXPORT: 'tickets.export',
  TICKETS_CANCEL: 'tickets.cancel',
  TICKETS_VERIFY: 'tickets.verify',
  
  // Orders
  ORDERS_VIEW: 'orders.read',
  ORDERS_EXPORT: 'orders.export',
  
  // Refunds
  REFUNDS_VIEW: 'refunds.read',
  REFUNDS_PROCESS: 'refunds.process',
  REFUNDS_REJECT: 'refunds.reject',
  
  // Reports
  REPORTS_VIEW: 'reports.read',
  REPORTS_EXPORT: 'reports.export',
  
  // Users
  USERS_VIEW: 'users.read',
  USERS_UPDATE: 'users.update',
  USERS_BAN: 'users.ban',
  
  // Messages
  MESSAGES_VIEW: 'messages.read',
  MESSAGES_REPLY: 'messages.reply',
  MESSAGES_DELETE: 'messages.delete',
  
  // Submissions
  SUBMISSIONS_VIEW: 'submissions.read',
  SUBMISSIONS_REVIEW: 'submissions.review',
  SUBMISSIONS_EXPORT: 'submissions.export',
  
  // Jury
  JURY_VIEW: 'jury.read',
  JURY_VOTE: 'jury.vote',
  JURY_VIEW_RESULTS: 'jury.read_results',
  
  // Settings
  SETTINGS_VIEW: 'settings.read',
  SETTINGS_UPDATE: 'settings.update',
  
  // Activity
  ACTIVITY_VIEW_OWN: 'activity.read_own',
  ACTIVITY_VIEW_ALL: 'activity.read_all',
} as const;

export type PermissionCode = typeof PERMISSIONS[keyof typeof PERMISSIONS];
