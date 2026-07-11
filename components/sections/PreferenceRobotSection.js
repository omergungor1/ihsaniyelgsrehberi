"use client";

import { useMemo, useState } from "react";
import { schools } from "@/lib/data/schools";

const quickValues = ["0.5", "1", "2", "3", "5"];

function getChance(userValue, schoolValue) {
  // Düşük yüzdelik = daha seçici okul
  if (userValue <= schoolValue) {
    return {
      key: "easy",
      label: "Girme İhtimali Yüksek",
      icon: "✓",
      border: "border-[#86efac]",
      badge: "bg-[#dcfce7] text-[#166534]",
      bar: "bg-[#22c55e]",
      progress: 92,
    };
  }

  const diffRatio = ((userValue - schoolValue) / Math.max(schoolValue, 0.01)) * 100;

  if (diffRatio < 20) {
    return {
      key: "easy",
      label: "Girme İhtimali Yüksek",
      icon: "✓",
      border: "border-[#86efac]",
      badge: "bg-[#dcfce7] text-[#166534]",
      bar: "bg-[#22c55e]",
      progress: 80,
    };
  }

  if (diffRatio < 50) {
    return {
      key: "mid",
      label: "Sınırda",
      icon: "!",
      border: "border-[#fcd34d]",
      badge: "bg-[#fef3c7] text-[#92400e]",
      bar: "bg-[#f59e0b]",
      progress: 55,
    };
  }

  return {
    key: "hard",
    label: "Zor",
    icon: "●",
    border: "border-[#fca5a5]",
    badge: "bg-[#fee2e2] text-[#991b1b]",
    bar: "bg-[#ef4444]",
    progress: Math.max(12, 40 - Math.min(diffRatio / 5, 28)),
  };
}

export default function PreferenceRobotSection({ onSchoolClick }) {
  const [input, setInput] = useState("5");
  const [submitted, setSubmitted] = useState(5);

  const results = useMemo(() => {
    return schools
      .map((school) => {
        const taban = Number(school.yuzdelikNum ?? school.yuzdelik);
        const chance = getChance(submitted, taban);
        return { school, taban, chance };
      })
      .sort((a, b) => a.taban - b.taban);
  }, [submitted]);

  const handleCalculate = () => {
    const raw = String(input).replace(",", ".");
    const num = Number(raw);
    if (!Number.isFinite(num) || num < 0) return;
    setSubmitted(num);
  };

  const handleQuick = (value) => {
    setInput(value);
    setSubmitted(Number(value));
  };

  return (
    <section id="tercih-robotu" className="bg-[#f8faf9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8f5ee] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#1b6e3f] uppercase">
            Şansım Ne?
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#1a2e22] sm:text-[34px]">
            <span className="mr-2">🤖</span>Tercih Robotu
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7c72]">
            LGS yüzdelik diliminizi girin, hangi okullara girebileceğinizi anında
            görün!
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Sol: giriş kartı */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-[#e2ebe5] bg-white p-5 shadow-[0_4px_20px_rgba(26,46,34,0.06)] sm:p-6">
              <p className="mb-3 text-[11px] font-bold tracking-[0.12em] text-[#7a8a80] uppercase">
                Yüzdelik Diliminiz
              </p>

              <div className="flex overflow-hidden rounded-xl border-2 border-[#2d8e6c]">
                <span className="flex items-center bg-[#f3faf6] px-3 text-sm font-bold text-[#1b6e3f]">
                  %
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  className="min-w-0 flex-1 px-3 py-2.5 text-sm font-semibold text-[#1a2e22] outline-none"
                  placeholder="5"
                  aria-label="Yüzdelik dilim"
                />
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="bg-[#1b6e3f] px-4 py-2.5 text-[13px] font-bold whitespace-nowrap text-white transition-colors hover:bg-[#14532d]"
                >
                  Hesapla →
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {quickValues.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleQuick(value)}
                    className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      String(submitted) === value
                        ? "bg-[#1b6e3f] text-white"
                        : "bg-[#f1f5f3] text-[#4a5c52] hover:bg-[#e5eee9]"
                    }`}
                  >
                    %{value}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 rounded-xl bg-[#dcfce7] px-3 py-2.5 text-[12px] font-semibold text-[#166534]">
                  <span>✓</span>
                  Giriş İhtimali Yüksek (&lt;%20 fark)
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-[#fef3c7] px-3 py-2.5 text-[12px] font-semibold text-[#92400e]">
                  <span>⚠</span>
                  Sınırda (%20-50 fark)
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-[#fee2e2] px-3 py-2.5 text-[12px] font-semibold text-[#991b1b]">
                  <span>●</span>
                  Zor (%50+ fark)
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: sonuçlar */}
          <div className="lg:col-span-8">
            <p className="mb-4 text-[14px] text-[#5a6b5e]">
              <span className="font-bold text-[#1a2e22]">
                %{submitted.toFixed(2)}
              </span>{" "}
              yüzdelik dilim için{" "}
              <span className="font-bold text-[#1a2e22]">{results.length}</span>{" "}
              okul analiz edildi:
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {results.map(({ school, taban, chance }) => (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => onSchoolClick?.(school.id)}
                  className={`overflow-hidden rounded-2xl border-2 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md ${chance.border}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[14px] leading-snug font-bold text-[#1a2e22]">
                      {school.name}
                    </h3>
                    <span
                      className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${chance.badge}`}
                    >
                      <span>{chance.icon}</span>
                      {chance.label}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[12px] text-[#6b7c72]">
                    <span>
                      Okul Taban:{" "}
                      <strong className="text-[#1a2e22]">%{taban.toFixed(2)}</strong>
                    </span>
                    <span>
                      Sizin:{" "}
                      <strong className="text-[#1a2e22]">
                        %{submitted.toFixed(2)}
                      </strong>
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eef3f0]">
                    <div
                      className={`h-full rounded-full ${chance.bar}`}
                      style={{ width: `${chance.progress}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
