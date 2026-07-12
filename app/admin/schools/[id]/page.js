import { notFound } from "next/navigation";
import { getAdminSchoolById } from "@/lib/admin/queries";
import SchoolForm from "@/components/admin/SchoolForm";

export default async function AdminSchoolEditPage({ params }) {
  const { id } = await params;
  const isNew = id === "new";

  const school = isNew ? null : await getAdminSchoolById(id);

  if (!isNew && !school) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">
          {isNew ? "Yeni Okul Ekle" : `Okulu Düzenle: ${school.name}`}
        </h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          Okul bilgilerini, yıllık istatistikleri ve başarılarını buradan yönetin.
        </p>
      </div>

      <SchoolForm school={school} />
    </div>
  );
}
