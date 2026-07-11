"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { schools } from "@/lib/data/schools";
import {
  dormitory,
  mapTileLayers,
  getSchoolMapPosition,
  haversineKm,
  directionsUrl,
} from "@/lib/data/map";

const SchoolsOsmMap = dynamic(() => import("@/components/map/SchoolsOsmMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-[#eef5f1] text-sm text-[#6b7c72]">
      Harita yükleniyor...
    </div>
  ),
});

export default function SchoolsMapSection({ onSchoolClick }) {
  const [mapStyle, setMapStyle] = useState("standart");
  const [activeId, setActiveId] = useState(null);
  const [focusPosition, setFocusPosition] = useState(null);

  const mapSchools = useMemo(() => {
    return schools.map((school) => {
      const pos = getSchoolMapPosition(school.id);
      const distanceKm = haversineKm(
        dormitory.lat,
        dormitory.lng,
        pos.lat,
        pos.lng
      ).toFixed(1);
      return {
        ...school,
        mapLat: pos.lat,
        mapLng: pos.lng,
        distanceKm,
      };
    });
  }, []);

  const handleSelectSchool = (id) => {
    const school = mapSchools.find((s) => s.id === id);
    if (!school) return;
    setActiveId(id);
    setFocusPosition([school.mapLat, school.mapLng]);
  };

  return (
    <section id="harita" className="bg-[#f7f9f6] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8f5ee] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#1b6e3f] uppercase">
            Konum
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#1a2e22] sm:text-[34px]">
            Yurdumuz ve Çalıştığımız Okullar Haritası
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7c72]">
            İhsaniye Öğrenci Yurdu merkezde yer alır; çalıştığımız okullar
            harita üzerinde işaretlenmiştir. Okul seçerek konumu
            inceleyebilirsiniz.
          </p>
        </div>

        {/* Harita stil butonları */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Object.entries(mapTileLayers).map(([key, layer]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMapStyle(key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                mapStyle === key
                  ? "bg-[#1b6e3f] text-white shadow-sm"
                  : "border border-[#e2ebe5] bg-white text-[#4a5c52] hover:bg-[#f0f7f3]"
              }`}
            >
              <span>{layer.icon}</span>
              {layer.label}
            </button>
          ))}
        </div>

        {/* Liste + OSM */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex h-full max-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#e2ebe5] bg-white shadow-[0_4px_20px_rgba(26,46,34,0.06)]">
              <div className="space-y-2 border-b border-[#eef3f0] px-4 py-3">
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#4a5c52]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f2994a]" />
                  Yurdumuz (Merkez)
                </div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#4a5c52]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#0f766e]" />
                  Çalıştığımız Okullar
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {mapSchools.map((school) => (
                  <div
                    key={school.id}
                    className={`flex w-full items-center justify-between gap-3 border-b border-[#eef3f0] px-4 py-3.5 transition-colors ${
                      activeId === school.id ? "bg-[#f0faf5]" : "bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectSchool(school.id)}
                      className="min-w-0 flex-1 text-left hover:opacity-80"
                    >
                      <p className="truncate text-[14px] font-bold text-[#1a2e22]">
                        {school.name}
                      </p>
                      <p className="mt-0.5 text-[12px] text-[#7a8a80]">
                        {school.district} · {school.distanceKm} km · %{school.yuzdelik}
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
            <div className="h-[420px] overflow-hidden rounded-2xl border border-[#e2ebe5] shadow-[0_4px_20px_rgba(26,46,34,0.06)] lg:h-[520px]">
              <SchoolsOsmMap
                schools={mapSchools}
                mapStyle={mapStyle}
                focusPosition={focusPosition}
                onMarkerClick={handleSelectSchool}
              />
            </div>

            <a
              href={directionsUrl("driving")}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 z-[1000] inline-flex items-center gap-2 rounded-full bg-[#2d8e6c] px-4 py-2.5 text-[13px] font-bold text-white shadow-lg transition-colors hover:bg-[#1b6e3f]"
            >
              Yurda Yol Tarifi Al →
            </a>
          </div>
        </div>

        {/* Google Maps + yön butonları */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#e2ebe5] bg-white p-5 shadow-[0_4px_20px_rgba(26,46,34,0.06)] sm:p-6">
          <h3 className="mb-4 text-[17px] font-bold text-[#1a2e22]">
            📍 Yurdumuzun Konumu ve Yol Tarifi
          </h3>

          <div className="overflow-hidden rounded-xl border border-[#e8efe9]">
            <iframe
              title="İhsaniye Öğrenci Yurdu Konumu"
              src={dormitory.googleEmbedUrl}
              className="h-[360px] w-full sm:h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="mt-3 text-center">
            <a
              href={dormitory.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-[#2d8e6c] underline hover:text-[#1b6e3f]"
            >
              Google Maps&apos;te Aç →
            </a>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={directionsUrl("transit")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2d8e6c] px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1b6e3f]"
            >
              🚌 Toplu Taşıma ile Yol Tarifi
            </a>
            <a
              href={directionsUrl("driving")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e2ebe5] bg-white px-4 py-3 text-[14px] font-bold text-[#1a2e22] transition-colors hover:bg-[#f7f9f6]"
            >
              🚗 Araçla Yol Tarifi
            </a>
            <a
              href={directionsUrl("walking")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e2ebe5] bg-white px-4 py-3 text-[14px] font-bold text-[#1a2e22] transition-colors hover:bg-[#f7f9f6]"
            >
              🚶 Yürüyerek Yol Tarifi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
