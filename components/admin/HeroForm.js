"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveHeroSettings } from "@/lib/admin/actions/siteSettings";
import ImageUploadField from "@/components/admin/ImageUploadField";

const inputClass =
  "w-full rounded-lg border border-[#D6DFEC] px-3 py-2 text-[13px] text-[#042352] outline-none focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20";

let rowIdCounter = 0;
function nextRowId() {
  rowIdCounter += 1;
  return `stat-${rowIdCounter}-${Date.now()}`;
}

export default function HeroForm({ hero }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [stats, setStats] = useState(
    () =>
      (hero?.stats || []).map((s) => ({
        rowId: nextRowId(),
        value: s.value || "",
        label: s.label || "",
      })) || []
  );

  function addStat() {
    setStats((prev) => [...prev, { rowId: nextRowId(), value: "", label: "" }]);
  }

  function updateStat(rowId, field, value) {
    setStats((prev) =>
      prev.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row))
    );
  }

  function removeStat(rowId) {
    setStats((prev) => prev.filter((row) => row.rowId !== rowId));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    formData.set("stats_json", JSON.stringify(stats));

    startTransition(async () => {
      try {
        await saveHeroSettings(formData);
        setSuccess(true);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Kaydetme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Metin İçeriği</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Rozet Metni
            </label>
            <input
              name="badge"
              defaultValue={hero?.badge || ""}
              placeholder="LGS Tercih Rehberi 2026"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Başlık
            </label>
            <input name="title" defaultValue={hero?.title || ""} className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Alt Başlık
            </label>
            <input name="subtitle" defaultValue={hero?.subtitle || ""} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Açıklama
            </label>
            <textarea
              name="description"
              defaultValue={hero?.description || ""}
              className={`${inputClass} min-h-[90px]`}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Görsel</h2>
        <ImageUploadField
          name="image_url"
          label="Hero Görseli"
          initialUrl={hero?.image_url || ""}
          folder="hero"
        />
      </div>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#042352]">İstatistikler</h2>
          <button
            type="button"
            onClick={addStat}
            className="rounded-lg bg-[#e8eef8] px-3 py-1.5 text-[12px] font-semibold text-[#042352] hover:bg-[#D6DFEC]"
          >
            + Satır Ekle
          </button>
        </div>

        {stats.length === 0 ? (
          <p className="text-[13px] text-[#727F94]">Henüz istatistik eklenmedi.</p>
        ) : (
          <div className="space-y-2">
            {stats.map((row) => (
              <div key={row.rowId} className="grid grid-cols-12 gap-2">
                <input
                  type="text"
                  placeholder="Değer (örn. 11)"
                  value={row.value}
                  onChange={(e) => updateStat(row.rowId, "value", e.target.value)}
                  className={`${inputClass} col-span-4`}
                />
                <input
                  type="text"
                  placeholder="Etiket (örn. Nitelikli Lise)"
                  value={row.label}
                  onChange={(e) => updateStat(row.rowId, "label", e.target.value)}
                  className={`${inputClass} col-span-7`}
                />
                <button
                  type="button"
                  onClick={() => removeStat(row.rowId)}
                  className="col-span-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  aria-label="Satırı sil"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-[13px] font-medium text-green-700">
          Kaydedildi.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-[#042352] px-6 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#124DA6] disabled:opacity-60"
      >
        {isPending ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
