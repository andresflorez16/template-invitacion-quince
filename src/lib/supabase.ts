import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function getSupabase(): SupabaseClient {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  }

  return createClient(url, key);
}
