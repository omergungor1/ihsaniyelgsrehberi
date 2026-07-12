import { createClient } from "@/lib/supabase/server";

const SCHOOL_SELECT = `
  *,
  school_yearly_stats ( id, year, percentile, quota ),
  school_achievements ( id, icon, text, sort_order )
`;

export async function getAdminSchools() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("schools")
    .select("id, slug, name, district, city, school_type, yuzdelik, is_active, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("admin schools:", error.message);
    return [];
  }
  return data || [];
}

export async function getAdminSchoolById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("schools")
    .select(SCHOOL_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("admin school:", error.message);
    return null;
  }

  if (data) {
    data.school_yearly_stats = (data.school_yearly_stats || []).sort(
      (a, b) => a.year - b.year
    );
    data.school_achievements = (data.school_achievements || []).sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );
  }

  return data;
}

export async function getSiteSetting(key) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, data")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    console.error(`site_settings(${key}):`, error.message);
    return {};
  }
  return data?.data || {};
}

export async function getAdminCalendarItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("calendar_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("admin calendar:", error.message);
    return [];
  }
  return data || [];
}

export async function getAdminYksData() {
  const supabase = await createClient();
  const [sectionRes, statsRes, gradsRes, highlightsRes] = await Promise.all([
    supabase.from("yks_section").select("*").eq("id", 1).maybeSingle(),
    supabase.from("yks_stats").select("*").order("sort_order", { ascending: true }),
    supabase.from("yks_graduates").select("*").order("sort_order", { ascending: true }),
    supabase.from("yks_highlights").select("*").order("sort_order", { ascending: true }),
  ]);

  return {
    section: sectionRes.data || { id: 1, badge: "2025 YKS", title: "YKS Başarılarımız", subtitle: "" },
    stats: statsRes.data || [],
    graduates: gradsRes.data || [],
    highlights: highlightsRes.data || [],
  };
}

export async function getAdminReviews() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("admin reviews:", error.message);
    return [];
  }
  return data || [];
}

export async function getDashboardCounts() {
  const supabase = await createClient();
  const [schools, activeSchools, calendar, reviews, graduates] = await Promise.all([
    supabase.from("schools").select("id", { count: "exact", head: true }),
    supabase.from("schools").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("calendar_items").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
    supabase.from("yks_graduates").select("id", { count: "exact", head: true }),
  ]);

  return {
    totalSchools: schools.count ?? 0,
    activeSchools: activeSchools.count ?? 0,
    calendarItems: calendar.count ?? 0,
    reviews: reviews.count ?? 0,
    graduates: graduates.count ?? 0,
  };
}
