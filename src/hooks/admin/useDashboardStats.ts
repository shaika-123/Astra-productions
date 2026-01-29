'use client';

import { useQuery } from '@tanstack/react-query';
import { getClientSupabase } from '@/lib/supabase/client';
import type { DashboardStats } from '@/types/admin';

async function fetchDashboardStats(): Promise<DashboardStats> {
  const supabase = getClientSupabase();
  if (!supabase) {
    throw new Error('Supabase client not available');
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Not authenticated');
  }

  const response = await fetch('/api/admin/stats', {
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch dashboard stats');
  }

  return response.json();
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
}

export default useDashboardStats;
