"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Anasayfa", href: "#" },
  { label: "Okul Seçimi", href: "#okul-secimi" },
  { label: "Programlar", href: "#programlar" },
  { label: "Okullar", href: "#okullar" },
  { label: "Harita", href: "#harita" },
  { label: "YKS 2025", href: "#yks" },
  { label: "Yorumlar", href: "#yorumlar" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#D6DFEC] bg-[#F2F4F9]">
      <div className="section-container">
        <div className="flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="flex flex-shrink-0 items-center gap-3">
            <Image
              src="/logo.png"
              alt="İhsaniye Öğrenci Yurdu"
              width={48}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-extrabold tracking-wide text-[#042352] uppercase">
                İhsaniye
              </span>
              <span className="text-[11px] font-medium text-[#727F94]">
                Öğrenci Yurdu
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-[14px] font-medium text-[#465367] transition-colors hover:text-[#042352]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="#iletisim"
            className="hidden items-center justify-center rounded-lg bg-[#042352] px-7 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#124DA6] lg:inline-flex"
          >
            İletişim
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-[#042352] lg:hidden"
            aria-label="Menü"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-1 border-t border-[#D6DFEC] bg-[#F2F4F9] px-4 py-3 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#465367] hover:bg-white/70"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#iletisim"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-center rounded-lg bg-[#042352] px-7 py-2.5 text-[14px] font-semibold text-white"
          >
            İletişim
          </Link>
        </div>
      )}
    </nav>
  );
}
