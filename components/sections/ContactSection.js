export default function ContactSection({ contact = {}, mapSettings = {} }) {
  const cards = [
    contact.whatsapp
      ? {
          key: "whatsapp",
          icon: "💬",
          iconBg: "bg-[#e8eef8]",
          label: "WhatsApp",
          value: contact.whatsappDisplay || contact.whatsapp,
          href: `https://wa.me/90${String(contact.whatsapp).replace(/^0/, "")}`,
        }
      : null,
    contact.phone
      ? {
          key: "phone",
          icon: "📞",
          iconBg: "bg-[#e8eef8]",
          label: "Telefon",
          value: contact.phoneDisplay || contact.phone,
          href: `tel:${contact.phone}`,
        }
      : null,
    contact.phone2
      ? {
          key: "phone2",
          icon: "📱",
          iconBg: "bg-[#f3f4f6]",
          label: "Telefon 2",
          value: contact.phone2Display || contact.phone2,
          href: `tel:${contact.phone2}`,
        }
      : null,
    contact.email
      ? {
          key: "email",
          icon: "✉️",
          iconBg: "bg-[#dbeafe]",
          label: "E-posta",
          value: contact.email,
          href: `mailto:${contact.email}`,
        }
      : null,
  ].filter(Boolean);

  const mapsUrl = mapSettings.googleMapsUrl || contact.mapUrl;
  const embedUrl = mapSettings.googleEmbedUrl || contact.mapEmbedUrl;

  return (
    <section id="iletisim" className="bg-[#F2F4F9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            Bize Ulaşın
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            İletişim
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
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
                  className="flex items-start gap-3 rounded-2xl border border-[#D6DFEC] bg-white p-4 shadow-[0_2px_12px_rgba(4,35,82,0.04)] transition-shadow hover:shadow-md"
                >
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg ${card.iconBg}`}
                  >
                    {card.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#727F94]">
                      {card.label}
                    </p>
                    <p className="mt-0.5 truncate text-[14px] font-bold text-[#042352]">
                      {card.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {(contact.address || mapsUrl) && (
              <div className="flex items-start gap-3 rounded-2xl border border-[#D6DFEC] bg-white p-4 shadow-[0_2px_12px_rgba(4,35,82,0.04)]">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#fee2e2] text-lg">
                  📍
                </span>
                <div>
                  <p className="text-[12px] font-medium text-[#727F94]">Adres</p>
                  <p className="mt-0.5 text-[14px] font-bold text-[#042352]">
                    {contact.address || "İhsaniye Öğrenci Yurdu"}
                  </p>
                  {mapsUrl ? (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-[12px] font-semibold text-[#2B6FD6] underline"
                    >
                      Google Maps&apos;te Gör →
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {embedUrl ? (
            <div className="overflow-hidden rounded-2xl border border-[#D6DFEC] bg-white shadow-[0_4px_16px_rgba(4,35,82,0.05)]">
              <iframe
                title="İhsaniye Öğrenci Yurdu Konumu"
                src={embedUrl}
                className="h-[320px] w-full lg:h-full lg:min-h-[320px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
