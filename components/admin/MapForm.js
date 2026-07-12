"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveMapSettings } from "@/lib/admin/actions/siteSettings";

const inputClass =
  "w-full rounded-lg border border-[#D6DFEC] px-3 py-2 text-[13px] text-[#042352] outline-none focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">{label}</label>
      {children}
    </div>
  );
}

export default function MapForm({ map }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await saveMapSettings(formData);
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
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Bölüm Metinleri</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Rozet Metni">
            <input name="badge" defaultValue={map?.badge || ""} className={inputClass} />
          </Field>
          <Field label="Başlık">
            <input name="title" defaultValue={map?.title || ""} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Açıklama">
              <textarea
                name="description"
                defaultValue={map?.description || ""}
                className={`${inputClass} min-h-[80px]`}
              />
            </Field>
          </div>
          <Field label="Yurt Kısa Adı">
            <input
              name="dormShortName"
              defaultValue={map?.dormShortName || ""}
              placeholder="Yurdumuz (Merkez)"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Konum Bilgileri</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Enlem (lat)">
            <input
              type="number"
              step="any"
              name="lat"
              defaultValue={map?.lat ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Boylam (lng)">
            <input
              type="number"
              step="any"
              name="lng"
              defaultValue={map?.lng ?? ""}
              className={inputClass}
            />
          </Field>
          <Field label="Google Maps Linki">
            <input
              name="googleMapsUrl"
              defaultValue={map?.googleMapsUrl || ""}
              className={inputClass}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Google Maps Embed Linki" hint="">
              <textarea
                name="googleEmbedUrl"
                defaultValue={map?.googleEmbedUrl || ""}
                className={`${inputClass} min-h-[80px]`}
              />
            </Field>
          </div>
        </div>
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
