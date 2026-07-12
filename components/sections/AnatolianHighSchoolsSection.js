"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const tableHeaders = [
  "Sıra",
  "Okul Adı",
  "Şehir",
  "Tür",
  "Yüzdelik",
  "Taban Puan",
  "YKS Başarı",
];

const filters = ["Tümü", "Anadolu", "Fen", "Özel"];

export default function AnatolianHighSchoolsSection({ schools, onSchoolClick }) {
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const filteredSchools =
    activeFilter === "Tümü"
      ? schools
      : schools.filter((s) => s.type === activeFilter);

  return (
    <section className="bg-white py-20">
      <div className="section-container">
        <SectionHeader
          tag="Sıralama"
          title="Anadolu Liseleri"
          highlight="Başarı Tablosu"
          description="Yüzdelik dilim, taban puan ve YKS başarı oranlarına göre okul sıralaması"
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-pill px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-primary-700 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-border shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-primary-700 text-left text-xs font-semibold tracking-wider text-white uppercase">
                  {tableHeaders.map((header) => (
                    <th key={header} className="px-4 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school, index) => (
                  <tr
                    key={school.id}
                    onClick={() => onSchoolClick(school.id)}
                    className={`cursor-pointer border-t border-neutral-border transition-colors hover:bg-primary-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-sm font-bold text-primary-700">
                        {school.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {school.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {school.city}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-badge bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                        {school.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-primary-700">
                      {school.yuzdelik}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                      {school.taban}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-badge bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
                        {school.yks}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
