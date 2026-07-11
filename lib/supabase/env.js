/**
 * Supabase public key çözümü.
 * Yeni projelerde PUBLISHABLE_KEY, klasik JWT için ANON_KEY kullanılır.
 */
export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL tanımlı değil (.env.local)");
  }
  return url;
}

export function getSupabaseAnonKey() {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_ANON_KEY;

  if (!key) {
    throw new Error(
      "Supabase anon/publishable key tanımlı değil (.env.local)"
    );
  }

  return key;
}
