"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireUser(supabase) {
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    throw new Error("Yetkisiz erişim.");
  }
  return data.user;
}

async function upsertSetting(key, value) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, data: value }, { onConflict: "key" });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath(`/admin/${key}`);
}

function str(formData, key) {
  const v = formData.get(key);
  if (v == null) return "";
  return String(v).trim();
}

function json(formData, key, fallback) {
  const v = formData.get(key);
  if (v == null || v === "") return fallback;
  try {
    return JSON.parse(String(v));
  } catch {
    return fallback;
  }
}

export async function saveHeroSettings(formData) {
  const stats = json(formData, "stats_json", []).filter((s) => s && (s.value || s.label));
  const value = {
    badge: str(formData, "badge"),
    title: str(formData, "title"),
    subtitle: str(formData, "subtitle"),
    description: str(formData, "description"),
    image_url: str(formData, "image_url"),
    stats,
  };
  await upsertSetting("hero", value);
}

export async function saveMapSettings(formData) {
  const lat = str(formData, "lat");
  const lng = str(formData, "lng");
  const value = {
    badge: str(formData, "badge"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    dormShortName: str(formData, "dormShortName"),
    lat: lat === "" ? null : Number(lat),
    lng: lng === "" ? null : Number(lng),
    googleMapsUrl: str(formData, "googleMapsUrl"),
    googleEmbedUrl: str(formData, "googleEmbedUrl"),
  };
  await upsertSetting("map", value);
}

export async function saveContactSettings(formData) {
  const value = {
    brand: str(formData, "brand"),
    brandSub: str(formData, "brandSub"),
    tagline: str(formData, "tagline"),
    whatsapp: str(formData, "whatsapp"),
    whatsappDisplay: str(formData, "whatsappDisplay"),
    phone: str(formData, "phone"),
    phoneDisplay: str(formData, "phoneDisplay"),
    phone2: str(formData, "phone2"),
    phone2Display: str(formData, "phone2Display"),
    email: str(formData, "email"),
    address: str(formData, "address"),
    addressDetail: str(formData, "addressDetail"),
  };
  await upsertSetting("contact", value);
}
