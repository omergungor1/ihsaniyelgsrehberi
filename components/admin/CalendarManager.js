"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveCalendarItem, deleteCalendarItem } from "@/lib/admin/actions/calendar";
import DeleteButton from "@/components/admin/DeleteButton";

const inputClass =
  "w-full rounded-lg border border-[#D6DFEC] px-3 py-2 text-[13px] text-[#042352] outline-none focus:border-[#2B6FD6] focus:ring-2 focus:ring-[#2B6FD6]/20";

const emptyItem = {
  id: "",
  icon: "📋",
  title: "",
  date_label: "",
  description: "",
  sort_order: 0,
  is_active: true,
};

export default function CalendarManager({ items }) {
  const router = useRouter();
  const [editing, setEditing] = useState(emptyItem);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function startEdit(item) {
    setEditing({ ...item });
    setError("");
  }

  function resetForm() {
    setEditing(emptyItem);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await saveCalendarItem(formData);
        resetForm();
        router.refresh();
      } catch (err) {
        setError(err?.message || "Kaydetme işlemi başarısız oldu.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm"
      >
        <h2 className="mb-4 text-[15px] font-bold text-[#042352]">
          {editing.id ? "Maddeyi Düzenle" : "Yeni Madde Ekle"}
        </h2>
        <input type="hidden" name="id" value={editing.id} readOnly />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              İkon
            </label>
            <input
              name="icon"
              value={editing.icon}
              onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Sıralama
            </label>
            <input
              type="number"
              name="sort_order"
              value={editing.sort_order}
              onChange={(e) => setEditing({ ...editing, sort_order: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Başlık *
            </label>
            <input
              name="title"
              required
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Tarih Etiketi *
            </label>
            <input
              name="date_label"
              required
              value={editing.date_label}
              onChange={(e) => setEditing({ ...editing, date_label: e.target.value })}
              placeholder="Örn. Haziran 2026"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-semibold text-[#042352]">
              Açıklama
            </label>
            <textarea
              name="description"
              value={editing.description || ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className={`${inputClass} min-h-[70px]`}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                name="is_active"
                checked={editing.is_active}
                onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                className="h-4 w-4 rounded border-[#D6DFEC] text-[#2B6FD6]"
              />
              <span className="text-[13px] font-medium text-[#465367]">Aktif</span>
            </label>
          </div>
        </div>

        {error ? (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] font-medium text-red-600">
            {error}
          </p>
        ) : null}

        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-[#042352] px-5 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#124DA6] disabled:opacity-60"
          >
            {isPending ? "Kaydediliyor..." : editing.id ? "Güncelle" : "Ekle"}
          </button>
          {editing.id ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-[#D6DFEC] px-5 py-2 text-[13px] font-semibold text-[#465367] hover:bg-[#F2F4F9]"
            >
              Vazgeç
            </button>
          ) : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-[#D6DFEC] bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="table-head">
            <tr>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3">İkon</th>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Tarih</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="table-row-alt border-t border-[#e8eef8]">
                <td className="px-4 py-3 text-[13px] text-[#727F94]">{item.sort_order}</td>
                <td className="px-4 py-3 text-lg">{item.icon}</td>
                <td className="px-4 py-3 text-[14px] font-semibold text-[#042352]">
                  {item.title}
                </td>
                <td className="px-4 py-3 text-[13px] text-[#465367]">{item.date_label}</td>
                <td className="px-4 py-3 text-[13px] font-semibold">
                  {item.is_active ? (
                    <span className="text-[#2B6FD6]">Aktif</span>
                  ) : (
                    <span className="text-[#727F94]">Pasif</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-[#D6DFEC] px-3 py-1.5 text-[13px] font-semibold text-[#042352] hover:bg-[#e8eef8]"
                    >
                      Düzenle
                    </button>
                    <DeleteButton
                      id={item.id}
                      action={deleteCalendarItem}
                      confirmText={`"${item.title}" maddesini silmek istediğinize emin misiniz?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[13px] text-[#727F94]">
                  Henüz takvim maddesi eklenmedi.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
