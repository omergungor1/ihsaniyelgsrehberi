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

export async function saveCalendarItem(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = str(formData, "id");
  const payload = {
    icon: str(formData, "icon") || "📋",
    title: str(formData, "title"),
    date_label: str(formData, "date_label"),
    description: str(formData, "description"),
    sort_order: parseInt(str(formData, "sort_order") || "0", 10),
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.title || !payload.date_label) {
    throw new Error("Başlık ve tarih zorunludur.");
  }

  if (id) {
    const { error } = await supabase.from("calendar_items").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("calendar_items").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/calendar");
  revalidatePath("/");
}

export async function deleteCalendarItem(id) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase.from("calendar_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/calendar");
  revalidatePath("/");
}
