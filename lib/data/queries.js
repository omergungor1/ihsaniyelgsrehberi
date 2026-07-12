import { createClient } from "@/lib/supabase/server";
import { mapCalendarItem, mapReview, mapSchool } from "./mappers";

const SCHOOL_SELECT = `
  *,
  school_yearly_stats ( id, year, percentile, quota ),
  school_achievements ( id, icon, text, sort_order )
`;

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("key, data");
  if (error) {
    console.error("site_settings:", error.message);
    return {};
  }
  const map = {};
  for (const row of data || []) {
    map[row.key] = row.data || {};
  }
  return map;
}

export async function getActiveSchools() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("schools")
    .select(SCHOOL_SELECT)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("schools:", error.message);
    return [];
  }
  return (data || []).map(mapSchool);
}

export async function getAllSchoolsAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("schools")
    .select(SCHOOL_SELECT)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("schools admin:", error.message);
    return [];
  }
  return data || [];
}

export async function getCalendarItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("calendar_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("calendar:", error.message);
    return [];
  }
  return (data || []).map(mapCalendarItem);
}

export async function getYksData() {
  const supabase = await createClient();
  const [sectionRes, statsRes, gradsRes, highlightsRes] = await Promise.all([
    supabase.from("yks_section").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("yks_stats")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("yks_graduates")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("yks_highlights")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const stats = statsRes.data || [];
  const graduates = gradsRes.data || [];
  const highlights = highlightsRes.data || [];
  const hasContent = stats.length > 0 || graduates.length > 0 || highlights.length > 0;

  if (!hasContent) return null;

  return {
    section: sectionRes.data || {
      badge: "2025 YKS",
      title: "YKS Başarılarımız",
      subtitle: "",
    },
    stats,
    graduates,
    highlights,
  };
}

export async function getReviews() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("reviews:", error.message);
    return { students: [], graduates: [] };
  }

  const mapped = (data || []).map(mapReview);
  return {
    students: mapped.filter((r) => r.type === "ogrenci"),
    graduates: mapped.filter((r) => r.type === "mezun"),
  };
}

export async function getHomePageData() {
  const [settings, schools, calendar, yks, reviews] = await Promise.all([
    getSiteSettings(),
    getActiveSchools(),
    getCalendarItems(),
    getYksData(),
    getReviews(),
  ]);

  return {
    hero: settings.hero || {},
    contact: settings.contact || {},
    map: settings.map || {},
    schools,
    calendar,
    yks,
    reviews,
  };
}
