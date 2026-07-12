"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  saveYksSection,
  saveYksStat,
  deleteYksStat,
  saveYksGraduate,
  deleteYksGraduate,
  saveYksHighlight,
  deleteYksHighlight,
} from "@/lib/admin/actions/yks";
import DeleteButton from "@/components/admin/DeleteButton";

const inputClass =
  "w-full rounded-lg border border-[#D6DFEC] px-3 py-2 text-[13px] text-[#042352] outline-none focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20";

function Field({ label, hint, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[12px] font-bold text-[#042352]">
        {label}
      </label>
      {hint ? (
        <p className="mb-1.5 text-[11px] leading-snug text-[#727F94]">{hint}</p>
      ) : null}
      {children}
    </div>
  );
}

function SectionCard({ title, description, children, actions }) {
  return (
    <div className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-[#042352]">{title}</h2>
          {description ? (
            <p className="mt-1 text-[12px] text-[#727F94]">{description}</p>
          ) : null}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function YksSectionForm({ section }) {
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
        await saveYksSection(formData);
        setSuccess(true);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Kaydetme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <SectionCard title="Bölüm Metinleri">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Rozet Metni
            </label>
            <input name="badge" defaultValue={section?.badge || ""} className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Başlık
            </label>
            <input name="title" defaultValue={section?.title || ""} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Alt Başlık
            </label>
            <textarea
              name="subtitle"
              defaultValue={section?.subtitle || ""}
              className={`${inputClass} min-h-[70px]`}
            />
          </div>
        </div>
        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-600">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-[13px] font-medium text-green-700">
            Kaydedildi.
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#042352] px-5 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#124DA6] disabled:opacity-60"
        >
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>
    </SectionCard>
  );
}

function StatsManager({ stats }) {
  const router = useRouter();
  const empty = { id: "", icon: "🏆", value: "", label: "", sort_order: 0, is_active: true };
  const [editing, setEditing] = useState(empty);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await saveYksStat(formData);
        setEditing(empty);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Kaydetme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <SectionCard
      title="İstatistik Kartları"
      description="Sitede üstte görünen sayısal başarı kutucukları (ör. 1 · TG 137.si)."
    >
      <form onSubmit={handleSubmit} className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-12">
        <input type="hidden" name="id" value={editing.id} readOnly />
        <Field
          label="İkon"
          hint="Emoji (🏆, ⭐, 📈)"
          className="sm:col-span-2"
        >
          <input
            name="icon"
            value={editing.icon}
            onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
            className={inputClass}
            placeholder="🏆"
          />
        </Field>
        <Field
          label="Sayı / Değer"
          hint="Kartta büyük yazılan sayı"
          className="sm:col-span-3"
        >
          <input
            name="value"
            required
            value={editing.value}
            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
            className={inputClass}
            placeholder="Örn: 1"
          />
        </Field>
        <Field
          label="Açıklama"
          hint="Sayının altında görünen metin"
          className="sm:col-span-4"
        >
          <input
            name="label"
            required
            value={editing.label}
            onChange={(e) => setEditing({ ...editing, label: e.target.value })}
            className={inputClass}
            placeholder="Örn: TG 137.si"
          />
        </Field>
        <Field
          label="Sıra"
          hint="Soldan sağa sıralama"
          className="sm:col-span-2"
        >
          <input
            type="number"
            name="sort_order"
            value={editing.sort_order}
            onChange={(e) => setEditing({ ...editing, sort_order: e.target.value })}
            className={inputClass}
            placeholder="0"
          />
        </Field>
        <Field label="Yayında" hint="Sitede göster" className="sm:col-span-1">
          <label className="flex h-[38px] items-center gap-2 rounded-lg border border-[#D6DFEC] px-3">
            <input
              type="checkbox"
              name="is_active"
              checked={editing.is_active}
              onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
              className="h-4 w-4 rounded border-[#D6DFEC] text-[#2B6FD6]"
            />
            <span className="text-[12px] font-semibold text-[#465367]">Aktif</span>
          </label>
        </Field>
        <div className="flex gap-2 sm:col-span-12">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-[#042352] px-4 py-2 text-[13px] font-bold text-white hover:bg-[#124DA6] disabled:opacity-60"
          >
            {editing.id ? "Güncelle" : "Ekle"}
          </button>
          {editing.id ? (
            <button
              type="button"
              onClick={() => setEditing(empty)}
              className="rounded-lg border border-[#D6DFEC] px-4 py-2 text-[13px] font-semibold text-[#465367] hover:bg-[#F2F4F9]"
            >
              Vazgeç
            </button>
          ) : null}
        </div>
      </form>

      {error ? (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-600">
          {error}
        </p>
      ) : null}

      <div className="space-y-2">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-[#e8eef8] px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{stat.icon}</span>
              <div>
                <p className="text-[14px] font-bold text-[#042352]">{stat.value}</p>
                <p className="text-[12px] text-[#727F94]">{stat.label}</p>
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  stat.is_active ? "text-[#2B6FD6]" : "text-[#727F94]"
                }`}
              >
                {stat.is_active ? "Aktif" : "Pasif"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditing({ ...stat })}
                className="rounded-lg border border-[#D6DFEC] px-3 py-1 text-[12px] font-semibold text-[#042352] hover:bg-[#e8eef8]"
              >
                Düzenle
              </button>
              <DeleteButton id={stat.id} action={deleteYksStat} confirmText="Bu istatistiği silmek istediğinize emin misiniz?" />
            </div>
          </div>
        ))}
        {!stats.length ? (
          <p className="text-[13px] text-[#727F94]">Henüz istatistik eklenmedi.</p>
        ) : null}
      </div>
    </SectionCard>
  );
}

function GraduatesManager({ graduates }) {
  const router = useRouter();
  const empty = { id: "", name: "", university: "", department: "", sort_order: 0, is_active: true };
  const [editing, setEditing] = useState(empty);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await saveYksGraduate(formData);
        setEditing(empty);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Kaydetme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <SectionCard
      title="Mezunlar"
      description="YKS sonrası yerleşen mezunların listesi. Sitede ad, üniversite ve bölüm olarak görünür."
    >
      <form onSubmit={handleSubmit} className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-12">
        <input type="hidden" name="id" value={editing.id} readOnly />
        <Field
          label="Öğrenci Adı Soyadı"
          hint="Sitede görünecek tam ad"
          className="sm:col-span-4"
        >
          <input
            name="name"
            required
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            className={inputClass}
            placeholder="Örn: Abdussamet Güngör"
          />
        </Field>
        <Field
          label="Yerleştiği Üniversite"
          hint="Üniversite adı"
          className="sm:col-span-4"
        >
          <input
            name="university"
            required
            value={editing.university}
            onChange={(e) => setEditing({ ...editing, university: e.target.value })}
            className={inputClass}
            placeholder="Örn: Boğaziçi Üniversitesi"
          />
        </Field>
        <Field
          label="Bölüm"
          hint="Fakülte / bölüm adı"
          className="sm:col-span-4"
        >
          <input
            name="department"
            value={editing.department || ""}
            onChange={(e) => setEditing({ ...editing, department: e.target.value })}
            className={inputClass}
            placeholder="Örn: Tıp (İng.)"
          />
        </Field>
        <Field
          label="Liste Sırası"
          hint="Küçük sayı üstte görünür"
          className="sm:col-span-3"
        >
          <input
            type="number"
            name="sort_order"
            value={editing.sort_order}
            onChange={(e) => setEditing({ ...editing, sort_order: e.target.value })}
            className={inputClass}
            placeholder="1"
          />
        </Field>
        <Field
          label="Yayın Durumu"
          hint="Pasif kayıt sitede gizlenir"
          className="sm:col-span-3"
        >
          <label className="flex h-[38px] items-center gap-2 rounded-lg border border-[#D6DFEC] px-3">
            <input
              type="checkbox"
              name="is_active"
              checked={editing.is_active}
              onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
              className="h-4 w-4 rounded border-[#D6DFEC] text-[#2B6FD6]"
            />
            <span className="text-[12px] font-semibold text-[#465367]">Aktif (sitede göster)</span>
          </label>
        </Field>
        <div className="flex items-end gap-2 sm:col-span-6">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-[#042352] px-4 py-2 text-[13px] font-bold text-white hover:bg-[#124DA6] disabled:opacity-60"
          >
            {editing.id ? "Güncelle" : "Mezun Ekle"}
          </button>
          {editing.id ? (
            <button
              type="button"
              onClick={() => setEditing(empty)}
              className="rounded-lg border border-[#D6DFEC] px-4 py-2 text-[13px] font-semibold text-[#465367] hover:bg-[#F2F4F9]"
            >
              Vazgeç
            </button>
          ) : null}
        </div>
      </form>

      {error ? (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-600">
          {error}
        </p>
      ) : null}

      <div className="space-y-2">
        {graduates.map((grad) => (
          <div
            key={grad.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-[#e8eef8] px-3 py-2"
          >
            <div>
              <p className="text-[14px] font-bold text-[#042352]">{grad.name}</p>
              <p className="text-[12px] text-[#727F94]">
                {grad.university}
                {grad.department ? ` · ${grad.department}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-semibold ${
                  grad.is_active ? "text-[#2B6FD6]" : "text-[#727F94]"
                }`}
              >
                {grad.is_active ? "Aktif" : "Pasif"}
              </span>
              <button
                type="button"
                onClick={() => setEditing({ ...grad })}
                className="rounded-lg border border-[#D6DFEC] px-3 py-1 text-[12px] font-semibold text-[#042352] hover:bg-[#e8eef8]"
              >
                Düzenle
              </button>
              <DeleteButton id={grad.id} action={deleteYksGraduate} confirmText="Bu mezunu silmek istediğinize emin misiniz?" />
            </div>
          </div>
        ))}
        {!graduates.length ? (
          <p className="text-[13px] text-[#727F94]">Henüz mezun eklenmedi.</p>
        ) : null}
      </div>
    </SectionCard>
  );
}

function HighlightsManager({ highlights }) {
  const router = useRouter();
  const empty = { id: "", track: "", result: "", sort_order: 0, is_active: true };
  const [editing, setEditing] = useState(empty);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await saveYksHighlight(formData);
        setEditing(empty);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Kaydetme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <SectionCard
      title="Öne Çıkan Sonuçlar"
      description="Altta koyu kutularda görünen alan başarıları (ör. SAY · TG 137.si)."
    >
      <form onSubmit={handleSubmit} className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-12">
        <input type="hidden" name="id" value={editing.id} readOnly />
        <Field
          label="Alan / Puan Türü"
          hint="Örn: SAY, EA, SÖZ, DİL"
          className="sm:col-span-4"
        >
          <input
            name="track"
            required
            value={editing.track}
            onChange={(e) => setEditing({ ...editing, track: e.target.value })}
            className={inputClass}
            placeholder="Örn: SAY"
          />
        </Field>
        <Field
          label="Başarı Sonucu"
          hint="Sitede büyük yazılan sonuç"
          className="sm:col-span-5"
        >
          <input
            name="result"
            required
            value={editing.result}
            onChange={(e) => setEditing({ ...editing, result: e.target.value })}
            className={inputClass}
            placeholder="Örn: TG 137.si"
          />
        </Field>
        <Field label="Sıra" hint="Soldan sağa" className="sm:col-span-2">
          <input
            type="number"
            name="sort_order"
            value={editing.sort_order}
            onChange={(e) => setEditing({ ...editing, sort_order: e.target.value })}
            className={inputClass}
            placeholder="1"
          />
        </Field>
        <Field label="Yayında" hint="Sitede göster" className="sm:col-span-1">
          <label className="flex h-[38px] items-center gap-2 rounded-lg border border-[#D6DFEC] px-3">
            <input
              type="checkbox"
              name="is_active"
              checked={editing.is_active}
              onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
              className="h-4 w-4 rounded border-[#D6DFEC] text-[#2B6FD6]"
            />
            <span className="text-[12px] font-semibold text-[#465367]">Aktif</span>
          </label>
        </Field>
        <div className="flex gap-2 sm:col-span-12">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-[#042352] px-4 py-2 text-[13px] font-bold text-white hover:bg-[#124DA6] disabled:opacity-60"
          >
            {editing.id ? "Güncelle" : "Ekle"}
          </button>
          {editing.id ? (
            <button
              type="button"
              onClick={() => setEditing(empty)}
              className="rounded-lg border border-[#D6DFEC] px-4 py-2 text-[13px] font-semibold text-[#465367] hover:bg-[#F2F4F9]"
            >
              Vazgeç
            </button>
          ) : null}
        </div>
      </form>

      {error ? (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-600">
          {error}
        </p>
      ) : null}

      <div className="space-y-2">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-[#e8eef8] px-3 py-2"
          >
            <div>
              <p className="text-[14px] font-bold text-[#042352]">{item.track}</p>
              <p className="text-[12px] text-[#727F94]">{item.result}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-semibold ${
                  item.is_active ? "text-[#2B6FD6]" : "text-[#727F94]"
                }`}
              >
                {item.is_active ? "Aktif" : "Pasif"}
              </span>
              <button
                type="button"
                onClick={() => setEditing({ ...item })}
                className="rounded-lg border border-[#D6DFEC] px-3 py-1 text-[12px] font-semibold text-[#042352] hover:bg-[#e8eef8]"
              >
                Düzenle
              </button>
              <DeleteButton id={item.id} action={deleteYksHighlight} confirmText="Bu sonucu silmek istediğinize emin misiniz?" />
            </div>
          </div>
        ))}
        {!highlights.length ? (
          <p className="text-[13px] text-[#727F94]">Henüz sonuç eklenmedi.</p>
        ) : null}
      </div>
    </SectionCard>
  );
}

export default function YksManager({ data }) {
  const { section, stats, graduates, highlights } = data;

  return (
    <div className="space-y-6">
      <YksSectionForm section={section} />
      <StatsManager stats={stats} />
      <GraduatesManager graduates={graduates} />
      <HighlightsManager highlights={highlights} />
    </div>
  );
}
