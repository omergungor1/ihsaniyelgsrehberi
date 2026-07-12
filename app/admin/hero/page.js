import { getSiteSetting } from "@/lib/admin/queries";
import HeroForm from "@/components/admin/HeroForm";

export default async function AdminHeroPage() {
  const hero = await getSiteSetting("hero");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">Hero Bölümü</h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          Ana sayfanın en üstündeki karşılama bölümünü düzenleyin.
        </p>
      </div>

      <HeroForm hero={hero} />
    </div>
  );
}
