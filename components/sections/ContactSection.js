import { contactInfo } from "@/lib/data/contact";
import { dormitory } from "@/lib/data/map";

const cards = [
  {
    key: "whatsapp",
    icon: "💬",
    iconBg: "bg-[#dcfce7]",
    label: "WhatsApp",
    value: contactInfo.whatsappDisplay,
    href: `https://wa.me/90${contactInfo.whatsapp.replace(/^0/, "")}`,
  },
  {
    key: "phone",
    icon: "📞",
    iconBg: "bg-[#dcfce7]",
    label: "Telefon",
    value: contactInfo.phoneDisplay,
    href: `tel:${contactInfo.phone}`,
  },
  {
    key: "phone2",
    icon: "📱",
    iconBg: "bg-[#f3f4f6]",
    label: "Telefon 2",
    value: contactInfo.phone2Display,
    href: `tel:${contactInfo.phone2}`,
  },
  {
    key: "email",
    icon: "✉️",
    iconBg: "bg-[#dbeafe]",
    label: "E-posta",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
];

export default function ContactSection() {
  return (
    <section id="iletisim" className="bg-[#f8faf9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8f5ee] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#1b6e3f] uppercase">
            Bize Ulaşın
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#1a2e22] sm:text-[34px]">
            İletişim
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7c72]">
            Tercih danışmanlığı ve sorularınız için bizimle iletişime
            geçebilirsiniz.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cards.map((card) => (
                <a
                  key={card.key}
                  href={card.href}
                  target={card.key === "whatsapp" ? "_blank" : undefined}
                  rel={card.key === "whatsapp" ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 rounded-2xl border border-[#e8efe9] bg-white p-4 shadow-[0_2px_12px_rgba(26,46,34,0.04)] transition-shadow hover:shadow-md"
                >
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg ${card.iconBg}`}
                  >
                    {card.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#7a8a80]">
                      {card.label}
                    </p>
                    <p className="mt-0.5 truncate text-[14px] font-bold text-[#1a2e22]">
                      {card.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[#e8efe9] bg-white p-4 shadow-[0_2px_12px_rgba(26,46,34,0.04)]">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-lg">
                📍
              </span>
              <div>
                <p className="text-[12px] font-medium text-[#7a8a80]">Adres</p>
                <p className="mt-0.5 text-[14px] font-bold text-[#1a2e22]">
                  {contactInfo.address}
                </p>
                <a
                  href={dormitory.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[12px] font-semibold text-[#2d8e6c] underline"
                >
                  Google Maps&apos;te Gör →
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#e8efe9] bg-white shadow-[0_4px_16px_rgba(26,46,34,0.05)]">
            <iframe
              title="İhsaniye Öğrenci Yurdu Konumu"
              src={dormitory.googleEmbedUrl}
              className="h-[320px] w-full lg:h-full lg:min-h-[320px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
