"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/schools", label: "Okullar", icon: "🏫" },
  { href: "/admin/hero", label: "Hero", icon: "🖼️" },
  { href: "/admin/map", label: "Harita", icon: "🗺️" },
  { href: "/admin/contact", label: "İletişim", icon: "☎️" },
  { href: "/admin/calendar", label: "Takvim", icon: "📅" },
  { href: "/admin/yks", label: "YKS", icon: "🎓" },
  { href: "/admin/reviews", label: "Yorumlar", icon: "💬" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col bg-[#042352] text-white">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2B6FD6] text-sm font-bold">
          İ
        </span>
        <div className="leading-tight">
          <p className="text-[14px] font-bold">İhsaniye Admin</p>
          <p className="text-[11px] text-white/50">Yönetim Paneli</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
                isActive
                  ? "bg-[#124DA6] text-white shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="text-base">🔗</span>
          Siteye Dön
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
