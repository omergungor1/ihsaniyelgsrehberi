"use client";

import { useState } from "react";

const transportModes = [
  { id: "transit", label: "Toplu Taşıma", icon: "🚌" },
  { id: "car", label: "Araçla", icon: "🚗" },
  { id: "walk", label: "Yürüyerek", icon: "🚶" },
];

export default function SchoolMediaSection({
  imageSrc,
  imageAlt,
  address,
  distance,
}) {
  const [mode, setMode] = useState("transit");

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="relative h-52 sm:h-56">
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${imageSrc || "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"}')`,
            }}
          />
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
            <p className="text-xs font-medium text-white">{imageAlt}</p>
          </div>
        </div>

        <div className="relative h-52 border-t border-gray-100 sm:h-56 sm:border-t-0 sm:border-l">
          <div className="flex h-full items-center justify-center bg-[#e8f0e8]">
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow hover:bg-gray-50">+</button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold shadow hover:bg-gray-50">−</button>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#2d8e6c] text-white shadow-md">
                📍
              </div>
              <span className="text-xs text-gray-400">Harita Görünümü</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 py-3">
        <p className="mb-2 flex items-start gap-1.5 text-xs text-gray-600">
          <span className="text-red-500">📍</span>
          <span>{address}</span>
        </p>
        <p className="mb-3 text-xs text-gray-500">
          Yurttan yaklaşık{" "}
          <span className="font-semibold text-gray-800">{distance}</span>
          {" · "}
          <a href="#" className="font-medium text-[#2d8e6c] underline">
            Yol Tarifi Al →
          </a>
        </p>

        <p className="mb-2 text-[11px] font-medium text-gray-500">Yurttan yol tarifi:</p>
        <div className="flex flex-wrap gap-2">
          {transportModes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                mode === m.id
                  ? "bg-[#2d8e6c] text-white"
                  : "border border-[#d7e6dc] bg-white text-[#1b6e3f] hover:bg-[#f3faf6]"
              }`}
            >
              <span>{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
