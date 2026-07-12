import { getSiteSetting } from "@/lib/admin/queries";
import MapForm from "@/components/admin/MapForm";

export default async function AdminMapPage() {
  const map = await getSiteSetting("map");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">Harita</h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          Yurdumuz ve çalıştığımız okullar haritası bölümünü düzenleyin.
        </p>
      </div>

      <MapForm map={map} />
    </div>
  );
}
