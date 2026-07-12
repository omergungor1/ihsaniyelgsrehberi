import Link from "next/link";
import { getDashboardCounts } from "@/lib/admin/queries";

const cards = [
  { key: "totalSchools", label: "Toplam Okul", href: "/admin/schools", icon: "🏫" },
  { key: "activeSchools", label: "Aktif Okul", href: "/admin/schools", icon: "✅" },
  { key: "calendarItems", label: "Takvim Maddesi", href: "/admin/calendar", icon: "📅" },
  { key: "reviews", label: "Yorum", href: "/admin/reviews", icon: "💬" },
  { key: "graduates", label: "YKS Mezunu", href: "/admin/yks", icon: "🎓" },
];

const quickLinks = [
  { href: "/admin/schools/new", label: "Yeni Okul Ekle", icon: "➕" },
  { href: "/admin/hero", label: "Hero Bölümünü Düzenle", icon: "🖼️" },
  { href: "/admin/map", label: "Harita Ayarlarını Düzenle", icon: "🗺️" },
  { href: "/admin/contact", label: "İletişim Bilgilerini Düzenle", icon: "☎️" },
  { href: "/admin/calendar", label: "Takvim Maddelerini Yönet", icon: "📅" },
  { href: "/admin/yks", label: "YKS Başarılarını Yönet", icon: "🎓" },
  { href: "/admin/reviews", label: "Yorumları Yönet", icon: "💬" },
];

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-bold text-[#042352]">Dashboard</h1>
        <p className="mt-1 text-[14px] text-[#727F94]">
          Site içeriğini buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-2xl border border-[#D6DFEC] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8eef8] text-lg">
              {card.icon}
            </div>
            <p className="text-[26px] font-extrabold text-[#042352]">
              {counts[card.key] ?? 0}
            </p>
            <p className="mt-1 text-[13px] font-medium text-[#727F94]">{card.label}</p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-[16px] font-bold text-[#042352]">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl border border-[#D6DFEC] bg-white px-4 py-3.5 text-[14px] font-semibold text-[#042352] shadow-sm transition-colors hover:bg-[#e8eef8]"
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
