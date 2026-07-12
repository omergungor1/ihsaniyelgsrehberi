"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveContactSettings } from "@/lib/admin/actions/siteSettings";

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

export default function ContactForm({ contact }) {
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
        await saveContactSettings(formData);
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
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Marka</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Marka Adı">
            <input name="brand" defaultValue={contact?.brand || ""} className={inputClass} />
          </Field>
          <Field label="Alt Marka Metni">
            <input
              name="brandSub"
              defaultValue={contact?.brandSub || ""}
              className={inputClass}
            />
          </Field>
          <Field label="Slogan">
            <input name="tagline" defaultValue={contact?.tagline || ""} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">İletişim Bilgileri</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="WhatsApp Numarası">
            <input name="whatsapp" defaultValue={contact?.whatsapp || ""} className={inputClass} />
          </Field>
          <Field label="WhatsApp Görünen Metin">
            <input
              name="whatsappDisplay"
              defaultValue={contact?.whatsappDisplay || ""}
              className={inputClass}
            />
          </Field>
          <Field label="Telefon">
            <input name="phone" defaultValue={contact?.phone || ""} className={inputClass} />
          </Field>
          <Field label="Telefon Görünen Metin">
            <input
              name="phoneDisplay"
              defaultValue={contact?.phoneDisplay || ""}
              className={inputClass}
            />
          </Field>
          <Field label="Telefon 2">
            <input name="phone2" defaultValue={contact?.phone2 || ""} className={inputClass} />
          </Field>
          <Field label="Telefon 2 Görünen Metin">
            <input
              name="phone2Display"
              defaultValue={contact?.phone2Display || ""}
              className={inputClass}
            />
          </Field>
          <Field label="E-posta">
            <input
              type="email"
              name="email"
              defaultValue={contact?.email || ""}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">Adres</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Adres">
            <input name="address" defaultValue={contact?.address || ""} className={inputClass} />
          </Field>
          <Field label="Adres Detayı">
            <input
              name="addressDetail"
              defaultValue={contact?.addressDetail || ""}
              className={inputClass}
            />
          </Field>
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
