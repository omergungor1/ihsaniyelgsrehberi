"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { mapTileLayers, haversineKm, directionsUrl } from "@/lib/data/map";

const SchoolsOsmMap = dynamic(() => import("@/components/map/SchoolsOsmMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-[#e8eef8] text-sm text-[#727F94]">
      Harita yükleniyor...
    </div>
  ),
});

const defaultMap = {
  badge: "Konum",
  title: "Yurdumuz ve Çalıştığımız Okullar Haritası",
  description:
    "İhsaniye Öğrenci Yurdu merkezde yer alır; çalıştığımız okullar harita üzerinde işaretlenmiştir.",
  dormShortName: "Yurdumuz (Merkez)",
  lat: 40.21728017147235,
  lng: 28.989501275287505,
  googleMapsUrl: "https://maps.app.goo.gl/7cuQVRh8iCR86N51A",
  googleEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.6305619716522!2d28.989501275287505!3d40.21728017147235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca1431c0e8298b%3A0xcdbbce491af070c3!2zxLBIU0FOxLBZRSBZw5xLU0VLw5bEnlJFVMSwTSBFUktFSyDDlsSeUkVOQ8SwIFlVUkRV!5e0!3m2!1str!2str!4v1783767737564!5m2!1str!2str",
};

export default function SchoolsMapSection({
  schools = [],
  mapSettings = {},
  onSchoolClick,
}) {
  const dorm = { ...defaultMap, ...mapSettings };
  const [mapStyle, setMapStyle] = useState("standart");
  const [activeId, setActiveId] = useState(null);
  const [focusPosition, setFocusPosition] = useState(null);

  const mapSchools = useMemo(() => {
    return schools
      .filter((s) => s.coordinates?.lat != null && s.coordinates?.lng != null)
      .map((school) => {
        const lat = school.coordinates.lat;
        const lng = school.coordinates.lng;
        const distanceKm =
          school.distanceKm != null
            ? Number(school.distanceKm).toFixed(1)
            : haversineKm(dorm.lat, dorm.lng, lat, lng).toFixed(1);
        return {
          ...school,
          mapLat: lat,
          mapLng: lng,
          distanceKm,
        };
      });
  }, [schools, dorm.lat, dorm.lng]);

  const handleSelectSchool = (id) => {
    const school = mapSchools.find((s) => s.id === id);
    if (!school) return;
    setActiveId(id);
    setFocusPosition([school.mapLat, school.mapLng]);
  };

  return (
    <section id="harita" className="bg-[#F2F4F9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            {dorm.badge || "Konum"}
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            {dorm.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
            {dorm.description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Object.entries(mapTileLayers).map(([key, layer]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMapStyle(key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                mapStyle === key
                  ? "bg-[#042352] text-white shadow-sm"
                  : "border border-[#D6DFEC] bg-white text-[#465367] hover:bg-[#e8eef8]"
              }`}
            >
              <span>{layer.icon}</span>
              {layer.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex h-full max-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#D6DFEC] bg-white shadow-[0_4px_20px_rgba(4,35,82,0.06)]">
              <div className="space-y-2 border-b border-[#e8eef8] px-4 py-3">
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#465367]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f2994a]" />
                  {dorm.dormShortName || "Yurdumuz (Merkez)"}
                </div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#465367]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2B6FD6]" />
                  Çalıştığımız Okullar
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {mapSchools.map((school) => (
                  <div
                    key={school.id}
                    className={`flex w-full items-center justify-between gap-3 border-b border-[#e8eef8] px-4 py-3.5 transition-colors ${
                      activeId === school.id ? "bg-[#e8eef8]" : "bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectSchool(school.id)}
                      className="min-w-0 flex-1 text-left hover:opacity-80"
                    >
                      <p className="truncate text-[14px] font-bold text-[#042352]">
                        {school.name}
                      </p>
                      <p className="mt-0.5 text-[12px] text-[#727F94]">
                        {school.district} · {school.distanceKm} km · %
                        {school.yuzdelik}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSchoolClick?.(school.id)}
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#fff4e8] text-[#f2994a] transition-colors hover:bg-[#ffe8cc]"
                      aria-label={`${school.name} detay`}
                    >
                      →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-8">
            <div className="h-[420px] overflow-hidden rounded-2xl border border-[#D6DFEC] shadow-[0_4px_20px_rgba(4,35,82,0.06)] lg:h-[520px]">
              <SchoolsOsmMap
                schools={mapSchools}
                dormitory={{
                  lat: Number(dorm.lat),
                  lng: Number(dorm.lng),
                  shortName: dorm.dormShortName,
                }}
                mapStyle={mapStyle}
                focusPosition={focusPosition}
                onMarkerClick={handleSelectSchool}
              />
            </div>

            <a
              href={directionsUrl("driving", dorm.lat, dorm.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 z-[1000] inline-flex items-center gap-2 rounded-full bg-[#2B6FD6] px-4 py-2.5 text-[13px] font-bold text-white shadow-lg transition-colors hover:bg-[#042352]"
            >
              Yurda Yol Tarifi Al →
            </a>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-[0_4px_20px_rgba(4,35,82,0.06)] sm:p-6">
          <h3 className="mb-4 text-[17px] font-bold text-[#042352]">
            📍 Yurdumuzun Konumu ve Yol Tarifi
          </h3>

          <div className="overflow-hidden rounded-xl border border-[#D6DFEC]">
            <iframe
              title="İhsaniye Öğrenci Yurdu Konumu"
              src={dorm.googleEmbedUrl}
              className="h-[360px] w-full sm:h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="mt-3 text-center">
            <a
              href={dorm.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-[#2B6FD6] underline hover:text-[#042352]"
            >
              Google Maps&apos;te Aç →
            </a>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={directionsUrl("transit", dorm.lat, dorm.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2B6FD6] px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#042352]"
            >
              🚌 Toplu Taşıma ile Yol Tarifi
            </a>
            <a
              href={directionsUrl("driving", dorm.lat, dorm.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D6DFEC] bg-white px-4 py-3 text-[14px] font-bold text-[#042352] transition-colors hover:bg-[#F2F4F9]"
            >
              🚗 Araçla Yol Tarifi
            </a>
            <a
              href={directionsUrl("walking", dorm.lat, dorm.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D6DFEC] bg-white px-4 py-3 text-[14px] font-bold text-[#042352] transition-colors hover:bg-[#F2F4F9]"
            >
              🚶 Yürüyerek Yol Tarifi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
