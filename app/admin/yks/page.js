import { getAdminYksData } from "@/lib/admin/queries";
import YksManager from "@/components/admin/YksManager";

export default async function AdminYksPage() {
  const data = await getAdminYksData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">YKS Başarılarımız</h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          YKS bölümünün metinlerini, istatistiklerini, mezunlarını ve öne çıkan sonuçlarını yönetin.
        </p>
      </div>

      <YksManager data={data} />
    </div>
  );
}
