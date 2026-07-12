"use client";

import { useMemo, useState } from "react";

const filters = ["Tümü", "Almanca", "İngilizce", "Fransızca", "Hazırlık"];

const tagToneClass = {
  orange: "bg-[#fff4e8] text-[#c76a1a]",
  green: "bg-[#e8eef8] text-[#042352]",
  teal: "bg-[#e8eef8] text-[#2B6FD6]",
};

function parseYuzdelik(value) {
  if (value == null) return Number.POSITIVE_INFINITY;
  const num = Number(String(value).replace("%", "").replace(",", "."));
  return Number.isFinite(num) ? num : Number.POSITIVE_INFINITY;
}

export default function QualifiedSchoolsSection({ schools = [], onSchoolClick }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tümü");
  const [sort, setSort] = useState("asc");

  const filteredSchools = useMemo(() => {
    let list = [...schools];

    if (query.trim()) {
      const q = query.trim().toLocaleLowerCase("tr");
      list = list.filter(
        (s) =>
          (s.name || "").toLocaleLowerCase("tr").includes(q) ||
          (s.district || "").toLocaleLowerCase("tr").includes(q)
      );
    }

    if (filter === "Almanca") {
      list = list.filter((s) => (s.language || "").includes("Almanca"));
    } else if (filter === "İngilizce") {
      list = list.filter((s) => (s.language || "").includes("İngilizce"));
    } else if (filter === "Fransızca") {
      list = list.filter((s) => (s.language || "").includes("Fransızca"));
    } else if (filter === "Hazırlık") {
      list = list.filter((s) => (s.education || "").includes("Hzr"));
    }

    list.sort((a, b) => {
      const av = parseYuzdelik(a.yuzdelik);
      const bv = parseYuzdelik(b.yuzdelik);
      return sort === "asc" ? av - bv : bv - av;
    });

    return list;
  }, [schools, query, filter, sort]);

  return (
    <section id="okullar" className="bg-[#F2F4F9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            Çalıştığımız Okullar
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            Nitelikli Liseler
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
            Kurum olarak çalışma yürüttüğümüz nitelikli liselere ait genel
            bilgiler ve detaylı analizler.
          </p>
        </div>

        {/* Arama + filtre + sıralama */}
        <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#8aa094]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Okul veya ilçe ara..."
              className="w-full rounded-xl border border-[#D6DFEC] bg-white py-2.5 pr-4 pl-10 text-sm text-[#042352] outline-none placeholder:text-[#727F94] focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  filter === item
                    ? "bg-[#2B6FD6] text-white shadow-sm"
                    : "border border-[#D6DFEC] bg-white text-[#465367] hover:bg-[#e8eef8]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-[#D6DFEC] bg-white px-4 py-2.5 text-[13px] font-medium text-[#465367] outline-none focus:border-[#2B6FD6]"
          >
            <option value="asc">Yüzdelik (Düşük → Yüksek)</option>
            <option value="desc">Yüzdelik (Yüksek → Düşük)</option>
          </select>
        </div>

        {/* Tablo */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#D6DFEC] bg-white shadow-[0_4px_20px_rgba(4,35,82,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="bg-[#2B6FD6] text-left text-[11px] font-bold tracking-wide text-white uppercase">
                  <th className="px-4 py-3.5">S.N</th>
                  <th className="px-4 py-3.5">Okul Adı</th>
                  <th className="px-4 py-3.5">Tür</th>
                  <th className="px-4 py-3.5">İlçe</th>
                  <th className="px-4 py-3.5">Eğitim</th>
                  <th className="px-4 py-3.5">Dil</th>
                  <th className="px-4 py-3.5">Yüzdelik</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school, index) => (
                  <tr
                    key={school.id}
                    onClick={() => onSchoolClick(school.id)}
                    className={`cursor-pointer border-t border-[#e8eef8] transition-colors hover:bg-[#e8eef8] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f8fcfa]"
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#e8eef8] text-xs font-bold text-[#042352]">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold text-[#042352]">
                      {school.name}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-[#727F94]">{school.type}</td>
                    <td className="px-4 py-3.5 text-sm text-[#727F94]">{school.district}</td>
                    <td className="px-4 py-3.5 text-sm text-[#727F94]">{school.education}</td>
                    <td className="px-4 py-3.5 text-sm text-[#727F94]">{school.language}</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex rounded-full bg-[#f2994a] px-3 py-1 text-xs font-bold text-white">
                        {school.yuzdelik}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kartlar */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchools.map((school) => (
            <article
              key={school.id}
              className="overflow-hidden rounded-2xl border border-[#D6DFEC] bg-white shadow-[0_4px_20px_rgba(4,35,82,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(4,35,82,0.1)]"
            >
              <div className="relative h-44">
                <div
                  className="h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${school.imageSrc}')` }}
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#f2994a] px-3 py-1 text-[11px] font-bold text-white shadow-md">
                    {school.rankLabel}
                  </span>
                </div>
              </div>

              <div className="px-5 pt-5 pb-4">
                <h3 className="text-[16px] font-bold text-[#042352]">{school.name}</h3>
                <p className="mt-1.5 flex items-center gap-1 text-[13px] text-[#727F94]">
                  <span>📍</span>
                  {school.district} / {school.city}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {school.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tagToneClass[tag.tone]}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 border-t border-[#e8eef8] pt-4 text-center">
                  <div>
                    <p className="text-[16px] font-extrabold text-[#042352]">{school.yuzdelik}</p>
                    <p className="mt-0.5 text-[11px] text-[#8aa094]">Yüzdelik</p>
                  </div>
                  <div>
                    <p className="text-[16px] font-extrabold text-[#042352]">{school.kontenjan}</p>
                    <p className="mt-0.5 text-[11px] text-[#8aa094]">Kontenjan</p>
                  </div>
                  <div>
                    <p className="text-[16px] font-extrabold text-[#042352]">{school.education}</p>
                    <p className="mt-0.5 text-[11px] text-[#8aa094]">Süre</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSchoolClick(school.id)}
                  className="mt-4 w-full py-2 text-center text-[14px] font-bold text-[#f2994a] transition-colors hover:text-[#d97706]"
                >
                  Detayları Gör →
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <p className="mt-10 text-center text-sm text-[#727F94]">
            Arama kriterlerinize uygun okul bulunamadı.
          </p>
        )}
      </div>
    </section>
  );
}
