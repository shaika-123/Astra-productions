import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

export type Movie = Database["public"]["Tables"]["movies"]["Row"];

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    if ((error as { code?: string }).code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data;
}
