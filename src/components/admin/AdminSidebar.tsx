'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAdminContext } from '@/contexts/AdminContext';
import { filterNavByPermissions } from '@/lib/permissions';
import { ADMIN_NAV, ROLE_CONFIG } from '@/types/admin';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Film,
  Calendar,
  Newspaper,
  Trophy,
  Images,
  Ticket,
  ShoppingCart,
  RefreshCcw,
  BarChart3,
  FileVideo,
  Star,
  Users,
  Mail,
  UserCog,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Film,
  Calendar,
  Newspaper,
  Trophy,
  Images,
  Ticket,
  ShoppingCart,
  RefreshCcw,
  BarChart3,
  FileVideo,
  Star,
  Users,
  Mail,
  UserCog,
  History,
  Settings,
  BookOpen,
  Sparkles,
};

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const { permissions, staff, role } = useAdminContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredNav = filterNavByPermissions(ADMIN_NAV, permissions, role);
  const roleConfig = role ? ROLE_CONFIG[role] : null;

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-border bg-card transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        {!isCollapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-display font-bold text-lg">Admin</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
        )}
      </div>

      {/* User Role Badge */}
      {!isCollapsed && roleConfig && (
        <div className="px-4 py-3 border-b border-border">
          <Badge 
            variant="outline" 
            className={cn(
              'w-full justify-center py-1',
              roleConfig.color === 'red' && 'border-red-500/50 text-red-500',
              roleConfig.color === 'orange' && 'border-orange-500/50 text-orange-500',
              roleConfig.color === 'yellow' && 'border-yellow-500/50 text-yellow-500',
              roleConfig.color === 'green' && 'border-green-500/50 text-green-500',
              roleConfig.color === 'blue' && 'border-blue-500/50 text-blue-500',
              roleConfig.color === 'purple' && 'border-purple-500/50 text-purple-500',
            )}
          >
            {roleConfig.label}
          </Badge>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-6 px-2">
          {filteredNav.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard;
                  const isActive = pathname === item.href || 
                    (item.href !== '/admin' && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                        isCollapsed && 'justify-center px-2'
                      )}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && item.badge > 0 && (
                            <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
                              {item.badge > 99 ? '99+' : item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Collapse Button */}
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn('w-full', isCollapsed && 'px-2')}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
