/**
 * Database Types for Supabase
 * 
 * Note: These are manually defined types.
 * For auto-generated types, run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
 */

type Json = any;

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          full_name: string | null;
          avatar_url: string | null;
          phone_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          full_description?: string | null;
          image_url?: string | null;
          date: string;
          time: string;
          duration?: string | null;
          venue: string;
          location: string;
          parking?: string | null;
          type: string;
          badge?: string | null;
          has_tickets?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          full_description?: string | null;
          image_url?: string | null;
          date?: string;
          time?: string;
          duration?: string | null;
          venue?: string;
          location?: string;
          parking?: string | null;
          type?: string;
          badge?: string | null;
          has_tickets?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      ticket_categories: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          price: number;
          total_seats: number;
          available_seats: number;
          description: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          name: string;
          price: number;
          total_seats: number;
          available_seats: number;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          name?: string;
          price?: number;
          total_seats?: number;
          available_seats?: number;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          category_id: string;
          ticket_number: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          status: string;
          qr_code_url: string;
          purchase_time: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          category_id: string;
          ticket_number: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          status?: string;
          qr_code_url?: string;
          purchase_time?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          category_id?: string;
          ticket_number?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          status?: string;
          qr_code_url?: string;
          purchase_time?: string;
          created_at?: string;
        };
      };
      movies: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          synopsis: string | null;
          image_url: string | null;
          status: string;
          release_date: string | null;
          director: string | null;
          cast_members: string[] | null;
          genre: string | null;
          duration: string | null;
          youtube_url: string | null;
          bookmyshow_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          synopsis?: string | null;
          image_url?: string | null;
          status?: string;
          release_date?: string | null;
          director?: string | null;
          cast_members?: string[] | null;
          genre?: string | null;
          duration?: string | null;
          youtube_url?: string | null;
          bookmyshow_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          synopsis?: string | null;
          image_url?: string | null;
          status?: string;
          release_date?: string | null;
          director?: string | null;
          cast_members?: string[] | null;
          genre?: string | null;
          duration?: string | null;
          youtube_url?: string | null;
          bookmyshow_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          content: string | null;
          image_url: string | null;
          youtube_url: string | null;
          published_at: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          content?: string | null;
          image_url?: string | null;
          youtube_url?: string | null;
          published_at?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          content?: string | null;
          image_url?: string | null;
          youtube_url?: string | null;
          published_at?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      awards: {
        Row: {
          id: string;
          year: number;
          title: string;
          description: string | null;
          hero_image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          year: number;
          title: string;
          description?: string | null;
          hero_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          year?: number;
          title?: string;
          description?: string | null;
          hero_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
      // Admin tables
      admin_staff: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_staff_activity: {
        Row: {
          id: string;
          staff_id: string;
          action: string;
          entity_type: string;
          entity_id: string | null;
          changes: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          staff_id: string;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          changes?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          staff_id?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          changes?: Json | null;
          created_at?: string;
        };
      };
      admin_permissions: {
        Row: {
          id: string;
          staff_id: string;
          permission: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          staff_id: string;
          permission: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          staff_id?: string;
          permission?: string;
          created_at?: string;
        };
      };
      // Award tables
      award_categories: {
        Row: {
          id: string;
          award_id: string;
          name: string;
          icon: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          award_id: string;
          name: string;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          award_id?: string;
          name?: string;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      award_gallery: {
        Row: {
          id: string;
          award_id: string;
          image_url: string;
          type: string;
          title: string | null;
          youtube_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          award_id: string;
          image_url: string;
          type?: string;
          title?: string | null;
          youtube_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          award_id?: string;
          image_url?: string;
          type?: string;
          title?: string | null;
          youtube_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      award_hosts: {
        Row: {
          id: string;
          award_id: string;
          name: string;
          image_url: string | null;
          role: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          award_id: string;
          name: string;
          image_url?: string | null;
          role?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          award_id?: string;
          name?: string;
          image_url?: string | null;
          role?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      award_nominees: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          is_winner: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          is_winner?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          is_winner?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      // Event gallery
      event_gallery: {
        Row: {
          id: string;
          event_id: string;
          image_url: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          image_url: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          image_url?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      // Orders and payments
      orders: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          razorpay_order_id: string;
          amount: number;
          currency: string;
          status: string;
          payment_method: string | null;
          notes: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          razorpay_order_id: string;
          amount: number;
          currency?: string;
          status?: string;
          payment_method?: string | null;
          notes?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          razorpay_order_id?: string;
          amount?: number;
          currency?: string;
          status?: string;
          payment_method?: string | null;
          notes?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      refunds: {
        Row: {
          id: string;
          order_id: string;
          payment_id: string;
          razorpay_refund_id: string | null;
          reason: string;
          amount: number;
          status: string;
          requested_by: string;
          processed_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          payment_id: string;
          razorpay_refund_id?: string | null;
          reason: string;
          amount: number;
          status?: string;
          requested_by: string;
          processed_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          payment_id?: string;
          razorpay_refund_id?: string | null;
          reason?: string;
          amount?: number;
          status?: string;
          requested_by?: string;
          processed_at?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Jury members
      jury_members: {
        Row: {
          id: string;
          award_id: string;
          name: string;
          designation: string | null;
          bio: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          award_id: string;
          name: string;
          designation?: string | null;
          bio?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          award_id?: string;
          name?: string;
          designation?: string | null;
          bio?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Movie submissions
      movie_submissions: {
        Row: {
          id: string;
          title: string;
          director: string;
          producer: string | null;
          synopsis: string | null;
          genre: string | null;
          duration: string | null;
          language: string | null;
          release_date: string | null;
          poster_url: string | null;
          trailer_url: string | null;
          status: string;
          submitted_by: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          director: string;
          producer?: string | null;
          synopsis?: string | null;
          genre?: string | null;
          duration?: string | null;
          language?: string | null;
          release_date?: string | null;
          poster_url?: string | null;
          trailer_url?: string | null;
          status?: string;
          submitted_by: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          director?: string;
          producer?: string | null;
          synopsis?: string | null;
          genre?: string | null;
          duration?: string | null;
          language?: string | null;
          release_date?: string | null;
          poster_url?: string | null;
          trailer_url?: string | null;
          status?: string;
          submitted_by?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Settings
      settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      purchase_ticket: {
        Args: {
          p_user_id: string;
          p_event_id: string;
          p_category_id: string;
          p_quantity: number;
        };
        Returns: {
          ticket_id: string;
          ticket_number: string;
          new_available_seats: number;
        }[];
      };
      has_permission: {
        Args: {
          check_user_id: string;
          permission_needed: string;
        };
        Returns: boolean;
      };
      check_user_role: {
        Args: {
          staff_user_id: string;
        };
        Returns: Json;
      };
      verify_admin_access: {
        Args: {
          staff_user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
}
