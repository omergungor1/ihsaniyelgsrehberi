/** DB okul satırını UI formatına çevirir */
export function mapSchool(row) {
  if (!row) return null;

  const yuzdelikNum = row.yuzdelik != null ? Number(row.yuzdelik) : null;
  const yearly = Array.isArray(row.school_yearly_stats)
    ? [...row.school_yearly_stats].sort((a, b) => a.year - b.year)
    : [];
  const achievements = Array.isArray(row.school_achievements)
    ? [...row.school_achievements].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      )
    : [];

  const latestYear = yearly.length ? yearly[yearly.length - 1].year : 2025;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    district: row.district || "",
    city: row.city || "",
    type: row.school_type || "Anadolu",
    rank: row.rank,
    rankLabel: row.rank_label,
    language: row.language || "",
    education: row.education || "",
    educationFull: row.education_full || row.education || "",
    kontenjan: row.kontenjan,
    yuzdelik: yuzdelikNum != null ? String(yuzdelikNum) : "",
    yuzdelikNum: yuzdelikNum ?? Number.POSITIVE_INFINITY,
    tags: row.tags || [],
    imageSrc: row.image_url || "/img2.jpeg",
    badges: row.badges || [],
    address: row.address || "",
    distance: row.distance_label || (row.distance_km != null ? `${row.distance_km} km` : ""),
    distanceKm: row.distance_km != null ? Number(row.distance_km) : null,
    coordinates:
      row.lat != null && row.lng != null
        ? { lat: Number(row.lat), lng: Number(row.lng) }
        : null,
    mapLink: row.map_link || null,
    info: [
      row.education_full || row.education
        ? { label: "Eğitim Süresi", value: row.education_full || row.education }
        : null,
      row.language ? { label: "Eğitim Dili", value: row.language } : null,
      row.kontenjan_turu
        ? { label: "Kontenjan Türü", value: row.kontenjan_turu }
        : null,
      row.pasch_okul_turu
        ? { label: "PASCH Okul Türü", value: row.pasch_okul_turu }
        : null,
      yuzdelikNum != null
        ? { label: `${latestYear} Yüzdelik Dilim`, value: String(yuzdelikNum) }
        : null,
      row.kontenjan != null
        ? { label: "Güncel Kontenjan", value: String(row.kontenjan) }
        : null,
      row.address ? { label: "Adres", value: row.address } : null,
    ].filter(Boolean),
    chartData: {
      percentile: yearly
        .filter((y) => y.percentile != null)
        .map((y) => ({ year: String(y.year), value: Number(y.percentile) })),
      quota: yearly
        .filter((y) => y.quota != null)
        .map((y) => ({ year: String(y.year), value: Number(y.quota) })),
    },
    transport: {
      duration: row.transport_duration,
      frequency: row.transport_frequency,
      walk: row.transport_walk,
      tram: row.transport_tram,
      bus: row.transport_bus,
      car: row.transport_car,
      description: row.transport_description,
    },
    description: row.description || "",
    program:
      row.program_title || row.program_description
        ? {
            title: row.program_title || "Program Bilgisi",
            description: row.program_description || "",
          }
        : null,
    achievements: achievements.map((a) => ({
      id: a.id,
      icon: a.icon,
      text: a.text,
    })),
    whatsappNumber: row.whatsapp_number,
    phoneNumber: row.phone_number,
    isActive: row.is_active,
    sortOrder: row.sort_order,
  };
}

export function mapReview(row) {
  const first = (row.first_initial || "").toUpperCase().slice(0, 1);
  const last = (row.last_initial || "").toUpperCase().slice(0, 1);
  return {
    id: row.id,
    name: `${first}**** ${last}****`,
    initial: first || "?",
    school: row.school_name || "",
    text: row.comment,
    type: row.review_type,
  };
}

export function mapCalendarItem(row) {
  return {
    id: row.id,
    icon: row.icon || "📋",
    title: row.title,
    date: row.date_label,
    description: row.description || "",
  };
}
