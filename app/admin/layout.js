import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export const metadata = {
  title: "İhsaniye Admin Panel",
};

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  // /admin/login sayfasına proxy tarafından yalnızca oturumsuz kullanıcılar
  // erişebilir; bu yüzden shell'i sadece oturumlu kullanıcılar için gösteriyoruz.
  if (!user) {
    return children;
  }

  return (
    <div className="flex min-h-screen bg-[#F2F4F9]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar email={user.email} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
