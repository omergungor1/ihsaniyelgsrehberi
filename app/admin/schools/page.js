import Link from "next/link";
import { getAdminSchools } from "@/lib/admin/queries";
import { deleteSchool, toggleSchoolActive } from "@/lib/admin/actions/schools";
import ActiveToggle from "@/components/admin/ActiveToggle";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminSchoolsPage() {
  const schools = await getAdminSchools();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#042352]">Okullar</h1>
          <p className="mt-1 text-[14px] text-[#727F94]">
            Toplam {schools.length} okul kaydı bulunuyor.
          </p>
        </div>
        <Link
          href="/admin/schools/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#042352] px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#124DA6]"
        >
          + Yeni Okul
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#D6DFEC] bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="table-head">
            <tr>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3">Okul Adı</th>
              <th className="px-4 py-3">İlçe / Şehir</th>
              <th className="px-4 py-3">Tür</th>
              <th className="px-4 py-3">Yüzdelik</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id} className="table-row-alt border-t border-[#e8eef8]">
                <td className="px-4 py-3 text-[13px] text-[#727F94]">{school.sort_order}</td>
                <td className="px-4 py-3">
                  <p className="text-[14px] font-semibold text-[#042352]">{school.name}</p>
                  <p className="text-[12px] text-[#727F94]">{school.slug}</p>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#465367]">
                  {school.district || "—"} / {school.city || "—"}
                </td>
                <td className="px-4 py-3 text-[13px] text-[#465367]">
                  {school.school_type || "—"}
                </td>
                <td className="px-4 py-3 text-[13px] text-[#465367]">
                  {school.yuzdelik != null ? `%${school.yuzdelik}` : "—"}
                </td>
                <td className="px-4 py-3">
                  <ActiveToggle
                    id={school.id}
                    initialActive={school.is_active}
                    action={toggleSchoolActive}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/schools/${school.id}`}
                      className="rounded-lg border border-[#D6DFEC] px-3 py-1.5 text-[13px] font-semibold text-[#042352] transition-colors hover:bg-[#e8eef8]"
                    >
                      Düzenle
                    </Link>
                    <DeleteButton
                      id={school.id}
                      action={deleteSchool}
                      confirmText={`"${school.name}" okulunu silmek istediğinize emin misiniz?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!schools.length ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[13px] text-[#727F94]">
                  Henüz okul eklenmedi.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
