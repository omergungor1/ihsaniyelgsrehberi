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

function str(formData, key) {
  const v = formData.get(key);
  if (v == null) return null;
  const trimmed = String(v).trim();
  return trimmed === "" ? null : trimmed;
}

function int(formData, key) {
  const v = str(formData, key);
  if (v == null) return null;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}

function num(formData, key) {
  const v = str(formData, key);
  if (v == null) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
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

function buildSchoolPayload(formData) {
  return {
    slug: str(formData, "slug"),
    name: str(formData, "name"),
    district: str(formData, "district"),
    city: str(formData, "city"),
    school_type: str(formData, "school_type"),
    rank: int(formData, "rank"),
    rank_label: str(formData, "rank_label"),
    language: str(formData, "language"),
    education: str(formData, "education"),
    education_full: str(formData, "education_full"),
    kontenjan: int(formData, "kontenjan"),
    yuzdelik: num(formData, "yuzdelik"),
    address: str(formData, "address"),
    distance_km: num(formData, "distance_km"),
    distance_label: str(formData, "distance_label"),
    lat: num(formData, "lat"),
    lng: num(formData, "lng"),
    map_link: str(formData, "map_link"),
    image_url: str(formData, "image_url"),
    description: str(formData, "description"),
    program_title: str(formData, "program_title"),
    program_description: str(formData, "program_description"),
    kontenjan_turu: str(formData, "kontenjan_turu"),
    pasch_okul_turu: str(formData, "pasch_okul_turu"),
    transport_duration: int(formData, "transport_duration"),
    transport_frequency: int(formData, "transport_frequency"),
    transport_walk: str(formData, "transport_walk"),
    transport_tram: str(formData, "transport_tram"),
    transport_bus: str(formData, "transport_bus"),
    transport_car: str(formData, "transport_car"),
    transport_description: str(formData, "transport_description"),
    whatsapp_number: str(formData, "whatsapp_number"),
    phone_number: str(formData, "phone_number"),
    tags: json(formData, "tags_json", []),
    badges: json(formData, "badges_json", []),
    is_active: formData.get("is_active") === "on",
    sort_order: int(formData, "sort_order") ?? 0,
  };
}

export async function saveSchool(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = str(formData, "id");
  const payload = buildSchoolPayload(formData);

  if (!payload.slug || !payload.name) {
    throw new Error("Slug ve okul adı zorunludur.");
  }

  let schoolId = id;

  if (schoolId) {
    const { error } = await supabase.from("schools").update(payload).eq("id", schoolId);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase
      .from("schools")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    schoolId = data.id;
  }

  const yearlyStats = json(formData, "yearly_stats_json", []).filter(
    (row) => row && row.year
  );
  const achievements = json(formData, "achievements_json", []).filter(
    (row) => row && row.text
  );

  await supabase.from("school_yearly_stats").delete().eq("school_id", schoolId);
  if (yearlyStats.length) {
    const rows = yearlyStats.map((row) => ({
      school_id: schoolId,
      year: parseInt(row.year, 10),
      percentile: row.percentile === "" || row.percentile == null ? null : Number(row.percentile),
      quota: row.quota === "" || row.quota == null ? null : parseInt(row.quota, 10),
    }));
    const { error } = await supabase.from("school_yearly_stats").insert(rows);
    if (error) throw new Error(error.message);
  }

  await supabase.from("school_achievements").delete().eq("school_id", schoolId);
  if (achievements.length) {
    const rows = achievements.map((row, index) => ({
      school_id: schoolId,
      icon: row.icon || "🏆",
      text: row.text,
      sort_order: index,
    }));
    const { error } = await supabase.from("school_achievements").insert(rows);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/schools");
  revalidatePath(`/admin/schools/${schoolId}`);
  revalidatePath("/");
  return { id: schoolId };
}

export async function deleteSchool(id) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase.from("schools").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/schools");
  revalidatePath("/");
}

export async function toggleSchoolActive(id, isActive) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase
    .from("schools")
    .update({ is_active: isActive })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/schools");
  revalidatePath("/");
}
