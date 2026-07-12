"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveSchool } from "@/lib/admin/actions/schools";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ChipInput from "@/components/admin/ChipInput";

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1 text-[11px] text-[#727F94]">{hint}</p> : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#D6DFEC] px-3 py-2 text-[13px] text-[#042352] outline-none focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20";

function TextInput(props) {
  return <input {...props} className={inputClass} />;
}

function TextArea(props) {
  return <textarea {...props} className={`${inputClass} min-h-[90px]`} />;
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-[15px] font-bold text-[#042352]">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

let rowIdCounter = 0;
function nextRowId() {
  rowIdCounter += 1;
  return `row-${rowIdCounter}-${Date.now()}`;
}

export default function SchoolForm({ school }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [yearlyStats, setYearlyStats] = useState(
    () =>
      (school?.school_yearly_stats || []).map((row) => ({
        rowId: nextRowId(),
        year: row.year ?? "",
        percentile: row.percentile ?? "",
        quota: row.quota ?? "",
      })) || []
  );

  const [achievements, setAchievements] = useState(
    () =>
      (school?.school_achievements || []).map((row) => ({
        rowId: nextRowId(),
        icon: row.icon || "🏆",
        text: row.text || "",
      })) || []
  );

  function addYearlyStat() {
    setYearlyStats((prev) => [
      ...prev,
      { rowId: nextRowId(), year: "", percentile: "", quota: "" },
    ]);
  }

  function updateYearlyStat(rowId, field, value) {
    setYearlyStats((prev) =>
      prev.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row))
    );
  }

  function removeYearlyStat(rowId) {
    setYearlyStats((prev) => prev.filter((row) => row.rowId !== rowId));
  }

  function addAchievement() {
    setAchievements((prev) => [...prev, { rowId: nextRowId(), icon: "🏆", text: "" }]);
  }

  function updateAchievement(rowId, field, value) {
    setAchievements((prev) =>
      prev.map((row) => (row.rowId === rowId ? { ...row, [field]: value } : row))
    );
  }

  function removeAchievement(rowId) {
    setAchievements((prev) => prev.filter((row) => row.rowId !== rowId));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("yearly_stats_json", JSON.stringify(yearlyStats));
    formData.set("achievements_json", JSON.stringify(achievements));

    startTransition(async () => {
      try {
        await saveSchool(formData);
        router.push("/admin/schools");
        router.refresh();
      } catch (err) {
        setError(err?.message || "Kaydetme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {school?.id ? <input type="hidden" name="id" defaultValue={school.id} /> : null}

      <Section title="Genel Bilgiler">
        <Field label="Slug (benzersiz) *">
          <TextInput
            name="slug"
            required
            defaultValue={school?.slug || ""}
            placeholder="orn-lisesi-adi"
          />
        </Field>
        <Field label="Okul Adı *">
          <TextInput name="name" required defaultValue={school?.name || ""} />
        </Field>
        <Field label="İlçe">
          <TextInput name="district" defaultValue={school?.district || ""} />
        </Field>
        <Field label="Şehir">
          <TextInput name="city" defaultValue={school?.city || "İstanbul"} />
        </Field>
        <Field label="Okul Türü">
          <TextInput
            name="school_type"
            defaultValue={school?.school_type || "Anadolu"}
            placeholder="Anadolu, Fen, Sosyal Bilimler..."
          />
        </Field>
        <Field label="Sıralama (rank)">
          <TextInput type="number" name="rank" defaultValue={school?.rank ?? ""} />
        </Field>
        <Field label="Sıralama Etiketi">
          <TextInput name="rank_label" defaultValue={school?.rank_label || ""} />
        </Field>
        <Field label="Eğitim Dili">
          <TextInput name="language" defaultValue={school?.language || ""} />
        </Field>
        <Field label="Eğitim Süresi (kısa)">
          <TextInput name="education" defaultValue={school?.education || ""} />
        </Field>
        <Field label="Eğitim Süresi (detaylı)">
          <TextInput name="education_full" defaultValue={school?.education_full || ""} />
        </Field>
        <Field label="Güncel Kontenjan">
          <TextInput type="number" name="kontenjan" defaultValue={school?.kontenjan ?? ""} />
        </Field>
        <Field label="Güncel Yüzdelik Dilim" hint="Örn. 0.05">
          <TextInput
            type="number"
            step="0.0001"
            name="yuzdelik"
            defaultValue={school?.yuzdelik ?? ""}
          />
        </Field>
        <Field label="Sıralama Değeri (liste sırası)">
          <TextInput type="number" name="sort_order" defaultValue={school?.sort_order ?? 0} />
        </Field>
        <Field label="Durum">
          <label className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={school ? school.is_active : true}
              className="h-4 w-4 rounded border-[#D6DFEC] text-[#2B6FD6]"
            />
            <span className="text-[13px] font-medium text-[#465367]">Aktif (sitede görünür)</span>
          </label>
        </Field>
      </Section>

      <Section title="Konum & Ulaşım">
        <Field label="Adres">
          <TextInput name="address" defaultValue={school?.address || ""} />
        </Field>
        <Field label="Harita Linki">
          <TextInput name="map_link" defaultValue={school?.map_link || ""} />
        </Field>
        <Field label="Enlem (lat)">
          <TextInput type="number" step="any" name="lat" defaultValue={school?.lat ?? ""} />
        </Field>
        <Field label="Boylam (lng)">
          <TextInput type="number" step="any" name="lng" defaultValue={school?.lng ?? ""} />
        </Field>
        <Field label="Yurttan Mesafe (km)">
          <TextInput
            type="number"
            step="0.01"
            name="distance_km"
            defaultValue={school?.distance_km ?? ""}
          />
        </Field>
        <Field label="Mesafe Etiketi" hint="Örn. Yurttan yaklaşık 3 km">
          <TextInput name="distance_label" defaultValue={school?.distance_label || ""} />
        </Field>
        <Field label="Yürüyerek">
          <TextInput name="transport_walk" defaultValue={school?.transport_walk || ""} />
        </Field>
        <Field label="Tramvay / Raylı Sistem">
          <TextInput name="transport_tram" defaultValue={school?.transport_tram || ""} />
        </Field>
        <Field label="Otobüs">
          <TextInput name="transport_bus" defaultValue={school?.transport_bus || ""} />
        </Field>
        <Field label="Araçla">
          <TextInput name="transport_car" defaultValue={school?.transport_car || ""} />
        </Field>
        <Field label="Yol Süresi (dk)">
          <TextInput
            type="number"
            name="transport_duration"
            defaultValue={school?.transport_duration ?? ""}
          />
        </Field>
        <Field label="Sefer Sıklığı (dk)">
          <TextInput
            type="number"
            name="transport_frequency"
            defaultValue={school?.transport_frequency ?? ""}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Ulaşım Açıklaması">
            <TextArea
              name="transport_description"
              defaultValue={school?.transport_description || ""}
            />
          </Field>
        </div>
      </Section>

      <Section title="Program & Açıklama">
        <div className="sm:col-span-2">
          <Field label="Okul Açıklaması">
            <TextArea name="description" defaultValue={school?.description || ""} />
          </Field>
        </div>
        <Field label="Program Başlığı">
          <TextInput name="program_title" defaultValue={school?.program_title || ""} />
        </Field>
        <Field label="Kontenjan Türü">
          <TextInput name="kontenjan_turu" defaultValue={school?.kontenjan_turu || ""} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Program Açıklaması">
            <TextArea
              name="program_description"
              defaultValue={school?.program_description || ""}
            />
          </Field>
        </div>
        <Field label="PASCH Okul Türü">
          <TextInput name="pasch_okul_turu" defaultValue={school?.pasch_okul_turu || ""} />
        </Field>
      </Section>

      <Section title="İletişim">
        <Field label="WhatsApp Numarası">
          <TextInput name="whatsapp_number" defaultValue={school?.whatsapp_number || ""} />
        </Field>
        <Field label="Telefon Numarası">
          <TextInput name="phone_number" defaultValue={school?.phone_number || ""} />
        </Field>
      </Section>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Görsel</h2>
        <ImageUploadField
          name="image_url"
          label="Okul Görseli"
          initialUrl={school?.image_url || ""}
          folder="schools"
        />
      </div>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Etiketler & Rozetler</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ChipInput name="tags_json" label="Etiketler" initialValues={school?.tags || []} />
          <ChipInput name="badges_json" label="Rozetler" initialValues={school?.badges || []} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#042352]">
            Yıllara Göre Yüzdelik / Kontenjan
          </h2>
          <button
            type="button"
            onClick={addYearlyStat}
            className="rounded-lg bg-[#e8eef8] px-3 py-1.5 text-[12px] font-semibold text-[#042352] hover:bg-[#D6DFEC]"
          >
            + Satır Ekle
          </button>
        </div>

        {yearlyStats.length === 0 ? (
          <p className="text-[13px] text-[#727F94]">Henüz kayıt eklenmedi.</p>
        ) : (
          <div className="space-y-2">
            {yearlyStats.map((row) => (
              <div key={row.rowId} className="grid grid-cols-12 gap-2">
                <input
                  type="number"
                  placeholder="Yıl"
                  value={row.year}
                  onChange={(e) => updateYearlyStat(row.rowId, "year", e.target.value)}
                  className={`${inputClass} col-span-3`}
                />
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Yüzdelik"
                  value={row.percentile}
                  onChange={(e) => updateYearlyStat(row.rowId, "percentile", e.target.value)}
                  className={`${inputClass} col-span-4`}
                />
                <input
                  type="number"
                  placeholder="Kontenjan"
                  value={row.quota}
                  onChange={(e) => updateYearlyStat(row.rowId, "quota", e.target.value)}
                  className={`${inputClass} col-span-4`}
                />
                <button
                  type="button"
                  onClick={() => removeYearlyStat(row.rowId)}
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

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#042352]">Okul Başarıları</h2>
          <button
            type="button"
            onClick={addAchievement}
            className="rounded-lg bg-[#e8eef8] px-3 py-1.5 text-[12px] font-semibold text-[#042352] hover:bg-[#D6DFEC]"
          >
            + Satır Ekle
          </button>
        </div>

        {achievements.length === 0 ? (
          <p className="text-[13px] text-[#727F94]">
            Henüz başarı eklenmedi. Boş bırakılırsa sitede bu bölüm gösterilmez.
          </p>
        ) : (
          <div className="space-y-2">
            {achievements.map((row) => (
              <div key={row.rowId} className="grid grid-cols-12 gap-2">
                <input
                  type="text"
                  placeholder="🏆"
                  value={row.icon}
                  onChange={(e) => updateAchievement(row.rowId, "icon", e.target.value)}
                  className={`${inputClass} col-span-2`}
                />
                <input
                  type="text"
                  placeholder="Başarı açıklaması"
                  value={row.text}
                  onChange={(e) => updateAchievement(row.rowId, "text", e.target.value)}
                  className={`${inputClass} col-span-9`}
                />
                <button
                  type="button"
                  onClick={() => removeAchievement(row.rowId)}
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

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#042352] px-6 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#124DA6] disabled:opacity-60"
        >
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
