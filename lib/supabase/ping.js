import { createClient } from "@/lib/supabase/server";

/**
 * Bağlantı duman testi — Server Component / Route Handler'da kullanılabilir.
 * Tablolar henüz yokken auth.getSession ile URL + key doğrulanır.
 */
export async function pingSupabase() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  return {
    ok: !error,
    hasSession: Boolean(data?.session),
    error: error?.message ?? null,
  };
}
