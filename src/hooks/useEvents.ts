import { useQuery } from '@tanstack/react-query';
import { getClientSupabase } from '@/lib/supabase/client';

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  full_description: string | null;
  image_url: string | null;
  date: string;
  time: string;
  duration: string | null;
  venue: string;
  location: string;
  parking: string | null;
  type: string;
  badge: string | null;
  has_tickets: boolean;
  is_active: boolean;
}

export interface TicketCategory {
  id: string;
  event_id: string;
  name: string;
  price: number;
  total_seats: number;
  available_seats: number;
  description: string | null;
  sort_order: number;
}

export interface EventGallery {
  id: string;
  event_id: string;
  image_url: string;
  sort_order: number;
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const supabase = getClientSupabase();
      if (!supabase) return [] as Event[];
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    },
  });
}

export function useEvent(slugOrId: string) {
  return useQuery({
    queryKey: ['event', slugOrId],
    queryFn: async () => {
      const supabase = getClientSupabase();
      if (!supabase) return null;
      
      // First try to find by slug
      let { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slugOrId)
        .eq('is_active', true)
        .single();
      
      // If not found by slug, try by ID
      if (error || !data) {
        const result = await supabase
          .from('events')
          .select('*')
          .eq('id', slugOrId)
          .eq('is_active', true)
          .single();
        data = result.data;
        error = result.error;
      }
      
      if (error) throw error;
      return data as Event;
    },
    enabled: !!slugOrId,
  });
}

export function useTicketCategories(eventId: string) {
  return useQuery({
    queryKey: ['ticket-categories', eventId],
    queryFn: async () => {
      const supabase = getClientSupabase();
      if (!supabase) return [] as TicketCategory[];
      const { data, error } = await supabase
        .from('ticket_categories')
        .select('*')
        .eq('event_id', eventId)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as TicketCategory[];
    },
    enabled: !!eventId,
  });
}

export function useEventGallery(eventId: string) {
  return useQuery({
    queryKey: ['event-gallery', eventId],
    queryFn: async () => {
      const supabase = getClientSupabase();
      if (!supabase) return [] as EventGallery[];
      const { data, error } = await supabase
        .from('event_gallery')
        .select('*')
        .eq('event_id', eventId)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as EventGallery[];
    },
    enabled: !!eventId,
  });
}
