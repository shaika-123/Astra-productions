'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { StaffActivity } from '@/types/admin';
import { formatDistanceToNow } from 'date-fns';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  LogIn,
  Settings,
} from 'lucide-react';

interface ActivityFeedProps {
  activities: StaffActivity[];
}

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  create: Plus,
  update: Pencil,
  delete: Trash2,
  view: Eye,
  approve: CheckCircle,
  reject: XCircle,
  login: LogIn,
  settings: Settings,
};

const actionColors: Record<string, string> = {
  create: 'bg-green-500/10 text-green-500',
  update: 'bg-blue-500/10 text-blue-500',
  delete: 'bg-red-500/10 text-red-500',
  view: 'bg-gray-500/10 text-gray-500',
  approve: 'bg-green-500/10 text-green-500',
  reject: 'bg-red-500/10 text-red-500',
  login: 'bg-purple-500/10 text-purple-500',
  settings: 'bg-orange-500/10 text-orange-500',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getActionIcon = (actionType: string | undefined) => {
    if (!actionType) return Eye;
    const baseAction = actionType.split('.')[0] || actionType;
    return actionIcons[baseAction] || Eye;
  };

  const getActionColor = (actionType: string | undefined) => {
    if (!actionType) return 'bg-gray-500/10 text-gray-500';
    const baseAction = actionType.split('.')[0] || actionType;
    return actionColors[baseAction] || 'bg-gray-500/10 text-gray-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Activity</CardTitle>
        <CardDescription>Recent actions by team members</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              // Handle both action_type (from type definition) and action (from database)
              const actionValue = (activity as unknown as { action?: string }).action || activity.action_type;
              const ActionIcon = getActionIcon(actionValue);
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(activity.staff?.user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm truncate">
                        {activity.staff?.user?.full_name || 'Unknown Staff'}
                      </span>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {activity.staff?.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.changes_summary || `${actionValue || 'action'} on ${activity.entity_type}`}
                    </p>
                    {activity.entity_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Target: {activity.entity_name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className={`p-1.5 rounded-md ${getActionColor(actionValue)}`}>
                      <ActionIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;
