"use client";

import { useState } from "react";

const avatarColors = [
  "bg-[#042352]",
  "bg-[#124DA6]",
  "bg-[#2B6FD6]",
  "bg-[#465367]",
  "bg-[#0369a1]",
  "bg-[#1e40af]",
];

export default function StudentReviewsSection({
  reviews = { students: [], graduates: [] },
}) {
  const [tab, setTab] = useState("current");
  const students = reviews.students || [];
  const graduates = reviews.graduates || [];
  const items = tab === "current" ? students : graduates;

  if (!students.length && !graduates.length) return null;

  return (
    <section id="yorumlar" className="bg-[#F2F4F9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            İzlenimler
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            Öğrencilerimizden Okul İzlenimleri
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
            Mevcut öğrencilerimizin ve mezunlarımızın yurt ile okul sürecine dair
            samimi değerlendirmeleri.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[#D6DFEC] bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setTab("current")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                tab === "current"
                  ? "bg-[#042352] text-white"
                  : "text-[#465367] hover:bg-[#e8eef8]"
              }`}
            >
              Mevcut Öğrenciler
            </button>
            <button
              type="button"
              onClick={() => setTab("graduates")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                tab === "graduates"
                  ? "bg-[#042352] text-white"
                  : "text-[#465367] hover:bg-[#e8eef8]"
              }`}
            >
              Mezunlarımız
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="relative rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-[0_4px_16px_rgba(4,35,82,0.05)]"
            >
              <span className="absolute top-4 right-5 text-3xl leading-none text-[#D6DFEC]">
                ”
              </span>

              <div className="mb-4 flex items-center gap-3 pr-6">
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                    avatarColors[index % avatarColors.length]
                  }`}
                >
                  {item.initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold text-[#042352]">
                    {item.name}
                  </p>
                  {item.school ? (
                    <p className="truncate text-[13px] font-semibold text-[#f2994a]">
                      {item.school}
                    </p>
                  ) : null}
                </div>
              </div>

              <p className="text-[13px] leading-relaxed text-[#727F94]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {!items.length ? (
          <p className="mt-8 text-center text-sm text-[#727F94]">
            Bu sekmede henüz yorum yok.
          </p>
        ) : null}
      </div>
    </section>
  );
}
