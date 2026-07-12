export const dormitory = {
  name: "İhsaniye Öğrenci Yurdu",
  shortName: "Yurdumuz (Merkez)",
  address: "İhsaniye, Bursa",
  lat: 40.21728017147235,
  lng: 28.989501275287505,
  googleMapsUrl: "https://maps.app.goo.gl/7cuQVRh8iCR86N51A",
  googleEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.6305619716522!2d28.989501275287505!3d40.21728017147235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca1431c0e8298b%3A0xcdbbce491af070c3!2zxLBIU0FOxLBZRSBZw5xLU0VLw5bEnlJFVMSwTSBFUktFSyDDlsSeUkVOQ8SwIFlVUkRV!5e0!3m2!1str!2str!4v1783767737564!5m2!1str!2str",
};

/** Okulları yurt etrafında haritada göstermek için göreli konumlar */
export const schoolMapOffsets = [
  { id: "istanbul-erkek-lisesi", dLat: 0.012, dLng: 0.008 },
  { id: "cagaloglu-anadolu", dLat: 0.006, dLng: -0.014 },
  { id: "samiha-ayverdi", dLat: -0.01, dLng: 0.012 },
  { id: "kabatas-erkek", dLat: 0.015, dLng: -0.006 },
  { id: "kadikoy-anadolu", dLat: -0.008, dLng: -0.01 },
  { id: "galatasaray-lisesi", dLat: 0.004, dLng: 0.016 },
];

export const mapTileLayers = {
  standart: {
    label: "Standart",
    icon: "🗺️",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  cadde: {
    label: "Cadde",
    icon: "🛣️",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
  },
  karanlik: {
    label: "Karanlık",
    icon: "🌙",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
  },
  uydu: {
    label: "Uydu",
    icon: "🛰️",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
};

export function haversineKm(lat1, lng1, lat2, lng2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getSchoolMapPosition(schoolId) {
  const offset = schoolMapOffsets.find((o) => o.id === schoolId);
  if (!offset) {
    return { lat: dormitory.lat + 0.01, lng: dormitory.lng + 0.01 };
  }
  return {
    lat: dormitory.lat + offset.dLat,
    lng: dormitory.lng + offset.dLng,
  };
}

export function directionsUrl(mode, lat = dormitory.lat, lng = dormitory.lng) {
  const travelMode =
    mode === "transit" ? "transit" : mode === "walking" ? "walking" : "driving";
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${travelMode}`;
}
