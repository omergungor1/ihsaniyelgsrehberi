import Image from "next/image";
import Link from "next/link";

export default function Footer({ contact = {} }) {
  const brand = contact.brand || "İHSANİYE";
  const whatsapp = contact.whatsapp || "";
  const phone = contact.phone || "";

  return (
    <footer className="bg-[#042352] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <Image
              src="/lgoo.png"
              alt="İhsaniye Öğrenci Yurdu"
              width={44}
              height={44}
              className="h-11 w-auto object-contain"
            />
            <div>
              <p className="text-[16px] font-extrabold tracking-wide">{brand}</p>
              {contact.brandSub ? (
                <p className="mt-0.5 text-[12px] text-white/65">{contact.brandSub}</p>
              ) : null}
              {contact.tagline ? (
                <p className="mt-1 text-[12px] text-[#f5c518]">{contact.tagline}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2.5 text-[13px] text-white/75">
            {contact.address ? (
              <p className="flex items-start gap-2">
                <span className="text-red-400">📍</span>
                <span>{contact.address}</span>
              </p>
            ) : null}
            {(contact.phoneDisplay || contact.phone2Display) && (
              <p className="flex items-start gap-2">
                <span>📞</span>
                <span>
                  {[contact.phoneDisplay, contact.phone2Display]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </p>
            )}
            {contact.email ? (
              <p className="flex items-start gap-2">
                <span>✉️</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2994a] text-[11px] font-bold">
              İ
            </span>
            <p className="text-[11px] text-white/45">
              © 2026 İhsaniye LGS Tercih Rehberi — Tüm hakları saklıdır.
            </p>
          </div>
          <div className="flex gap-4 text-[12px] text-white/50">
            <Link href="#okullar" className="hover:text-white">
              Okullar
            </Link>
            <Link href="#tercih-robotu" className="hover:text-white">
              Tercih Robotu
            </Link>
            <Link href="#iletisim" className="hover:text-white">
              İletişim
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2">
        {whatsapp ? (
          <a
            href={`https://wa.me/90${String(whatsapp).replace(/^0/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-xl text-white shadow-lg transition-transform hover:scale-105"
            aria-label="WhatsApp"
          >
            💬
          </a>
        ) : null}
        {phone ? (
          <a
            href={`tel:${phone}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#042352] text-xl text-white shadow-lg transition-transform hover:scale-105"
            aria-label="Ara"
          >
            📞
          </a>
        ) : null}
      </div>
    </footer>
  );
}
