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

function revalidateAll() {
  revalidatePath("/admin/yks");
  revalidatePath("/");
}

export async function saveYksSection(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const payload = {
    id: 1,
    badge: str(formData, "badge") || "2025 YKS",
    title: str(formData, "title") || "YKS Başarılarımız",
    subtitle: str(formData, "subtitle"),
  };

  const { error } = await supabase.from("yks_section").upsert(payload, { onConflict: "id" });
  if (error) throw new Error(error.message);

  revalidateAll();
}

export async function saveYksStat(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = str(formData, "id");
  const payload = {
    icon: str(formData, "icon") || "🏆",
    value: str(formData, "value"),
    label: str(formData, "label"),
    sort_order: parseInt(str(formData, "sort_order") || "0", 10),
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.value || !payload.label) {
    throw new Error("Değer ve etiket zorunludur.");
  }

  if (id) {
    const { error } = await supabase.from("yks_stats").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("yks_stats").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidateAll();
}

export async function deleteYksStat(id) {
  const supabase = await createClient();
  await requireUser(supabase);
  const { error } = await supabase.from("yks_stats").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function saveYksGraduate(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = str(formData, "id");
  const payload = {
    name: str(formData, "name"),
    university: str(formData, "university"),
    department: str(formData, "department"),
    sort_order: parseInt(str(formData, "sort_order") || "0", 10),
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.name || !payload.university) {
    throw new Error("Ad ve üniversite zorunludur.");
  }

  if (id) {
    const { error } = await supabase.from("yks_graduates").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("yks_graduates").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidateAll();
}

export async function deleteYksGraduate(id) {
  const supabase = await createClient();
  await requireUser(supabase);
  const { error } = await supabase.from("yks_graduates").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function saveYksHighlight(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = str(formData, "id");
  const payload = {
    track: str(formData, "track"),
    result: str(formData, "result"),
    sort_order: parseInt(str(formData, "sort_order") || "0", 10),
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.track || !payload.result) {
    throw new Error("Alan ve sonuç zorunludur.");
  }

  if (id) {
    const { error } = await supabase.from("yks_highlights").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("yks_highlights").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidateAll();
}

export async function deleteYksHighlight(id) {
  const supabase = await createClient();
  await requireUser(supabase);
  const { error } = await supabase.from("yks_highlights").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
