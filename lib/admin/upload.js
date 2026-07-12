import { createClient } from "@/lib/supabase/client";

export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024; // 3MB
const BUCKET = "media";

function slugifyFileName(fileName) {
  const dotIndex = fileName.lastIndexOf(".");
  const ext = dotIndex >= 0 ? fileName.slice(dotIndex + 1).toLowerCase() : "";
  const base = dotIndex >= 0 ? fileName.slice(0, dotIndex) : fileName;
  const cleanBase = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return ext ? `${cleanBase || "dosya"}.${ext}` : cleanBase || "dosya";
}

/**
 * `media` bucket'ına dosya yükler, public URL döner.
 * @param {File} file
 * @param {string} folder - örn. "hero", "schools"
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export async function uploadMedia(file, folder = "misc") {
  if (!file) {
    return { url: null, error: "Dosya seçilmedi." };
  }

  if (!file.type?.startsWith("image/")) {
    return { url: null, error: "Sadece görsel dosyaları yükleyebilirsiniz." };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return { url: null, error: "Dosya boyutu 3MB'ı aşamaz." };
  }

  const supabase = createClient();
  const path = `${folder}/${Date.now()}-${slugifyFileName(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data?.publicUrl || null, error: null };
}
