'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClientSupabase } from '@/lib/supabase/client';
import type { AdminStaff, PaginatedResponse, StaffFilters, StaffFormData } from '@/types/admin';
import { toast } from 'sonner';

async function fetchStaff(filters: StaffFilters): Promise<PaginatedResponse<AdminStaff>> {
  const supabase = getClientSupabase();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.search) params.set('search', filters.search);
  if (filters.role) params.set('role', filters.role);
  if (filters.status) params.set('status', filters.status);

  const response = await fetch(`/api/admin/staff?${params}`, {
    headers: { 'Authorization': `Bearer ${session.access_token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch staff');
  }

  return response.json();
}

async function fetchStaffMember(id: string): Promise<AdminStaff> {
  const supabase = getClientSupabase();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(`/api/admin/staff/${id}`, {
    headers: { 'Authorization': `Bearer ${session.access_token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch staff member');
  }

  const { data } = await response.json();
  return data;
}

async function addStaff(staffData: StaffFormData): Promise<AdminStaff> {
  const supabase = getClientSupabase();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch('/api/admin/staff', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(staffData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add staff member');
  }

  const { data } = await response.json();
  return data;
}

async function updateStaff({ id, ...staffData }: Partial<AdminStaff> & { id: string }): Promise<AdminStaff> {
  const supabase = getClientSupabase();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(`/api/admin/staff/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(staffData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update staff member');
  }

  const { data } = await response.json();
  return data;
}

async function removeStaff({ id, reason }: { id: string; reason?: string }): Promise<void> {
  const supabase = getClientSupabase();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(`/api/admin/staff/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to remove staff member');
  }
}

// Search users for adding as staff - uses dedicated staff search API
async function searchUsers(query: string): Promise<Array<{ id: string; email: string; full_name: string | null }>> {
  const supabase = getClientSupabase();
  if (!supabase) throw new Error('Supabase client not available');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  // Use dedicated staff search endpoint which requires staff.create permission
  const response = await fetch(`/api/admin/staff/search-users?q=${encodeURIComponent(query)}&limit=10`, {
    headers: { 'Authorization': `Bearer ${session.access_token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to search users');
  }

  const result = await response.json();
  return result.data || [];
}

// Hooks
export function useAdminStaff(filters: StaffFilters = { page: 1, limit: 10, status: 'active' }) {
  return useQuery({
    queryKey: ['admin', 'staff', filters],
    queryFn: () => fetchStaff(filters),
  });
}

export function useAdminStaffMember(id: string | null) {
  return useQuery({
    queryKey: ['admin', 'staff', id],
    queryFn: () => fetchStaffMember(id!),
    enabled: !!id,
  });
}

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ['admin', 'search-users', query],
    queryFn: () => searchUsers(query),
    enabled: query.length >= 3,
  });
}

export function useAddStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success('Staff member added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaff,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff', data.id] });
      toast.success('Staff member updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useRemoveStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success('Staff member removed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
