import { useMutation } from '@tanstack/react-query';
import { getClientSupabase } from '@/lib/supabase/client';
import type { Database } from '@/types/database.types';

interface SendMessageParams {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

export function useSendContactMessage() {
  return useMutation({
    mutationFn: async (params: SendMessageParams) => {
      const supabase = getClientSupabase();
      if (!supabase) return Promise.reject(new Error('Supabase client not available'));

      const payload: Database['public']['Tables']['contact_messages']['Insert'] = {
        name: params.name,
        email: params.email,
        phone: params.phone ?? null,
        subject: params.subject ?? null,
        message: params.message,
      };

      const { data, error } = await supabase
        .from(
          'contact_messages' as keyof Database['public']['Tables']
        )
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      return data as Database['public']['Tables']['contact_messages']['Row'];
    },
  });
}
