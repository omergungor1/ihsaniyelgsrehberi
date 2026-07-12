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

export async function saveReview(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = str(formData, "id");
  const payload = {
    first_initial: str(formData, "first_initial"),
    last_initial: str(formData, "last_initial"),
    review_type: str(formData, "review_type") || "ogrenci",
    comment: str(formData, "comment"),
    school_name: str(formData, "school_name"),
    sort_order: parseInt(str(formData, "sort_order") || "0", 10),
    is_active: formData.get("is_active") === "on",
  };

  if (!payload.first_initial || !payload.last_initial || !payload.comment) {
    throw new Error("Ad, soyad baş harfi ve yorum zorunludur.");
  }

  if (id) {
    const { error } = await supabase.from("reviews").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("reviews").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/");
}

export async function deleteReview(id) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/reviews");
  revalidatePath("/");
}
