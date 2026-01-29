import { useQuery } from '@tanstack/react-query';
import { getClientSupabase } from '@/lib/supabase/client';

export interface News {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  youtube_url: string | null;
  published_at: string;
  is_active: boolean;
}

export interface NewsGallery {
  id: string;
  news_id: string;
  image_url: string;
  sort_order: number;
}

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const supabase = getClientSupabase();
      if (!supabase) return [] as News[];
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_active', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as News[];
    },
  });
}

export function useNewsItem(slug: string) {
  return useQuery({
    queryKey: ['news', slug],
    queryFn: async () => {
      const supabase = getClientSupabase();
      if (!supabase) return null as unknown as News;
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data as News;
    },
    enabled: !!slug,
  });
}

export function useNewsGallery(newsId: string) {
  return useQuery({
    queryKey: ['news-gallery', newsId],
    queryFn: async () => {
      const supabase = getClientSupabase();
      if (!supabase) return [] as NewsGallery[];
      const { data, error } = await supabase
        .from('news_gallery')
        .select('*')
        .eq('news_id', newsId)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as NewsGallery[];
    },
    enabled: !!newsId,
  });
}
