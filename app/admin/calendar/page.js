import { getAdminCalendarItems } from "@/lib/admin/queries";
import CalendarManager from "@/components/admin/CalendarManager";

export default async function AdminCalendarPage() {
  const items = await getAdminCalendarItems();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">Tercih Takvimi</h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          LGS tercih sürecine dair önemli tarihleri yönetin.
        </p>
      </div>

      <CalendarManager items={items} />
    </div>
  );
}
