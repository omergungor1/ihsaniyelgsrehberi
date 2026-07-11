const timeline = [
  {
    id: 1,
    icon: "📋",
    title: "Sınav Zamanı",
    date: "13 Haziran",
    description: "LGS sınavı yapılacak",
  },
  {
    id: 2,
    icon: "📊",
    title: "Sonuçlar",
    date: "10 Temmuz",
    description: "Sınav sonuçları açıklanacak",
  },
  {
    id: 3,
    icon: "✅",
    title: "Tercih Süreci",
    date: "13-24 Temmuz",
    description: "Okul tercihlerinizi yapın",
  },
  {
    id: 4,
    icon: "🎓",
    title: "Yerleştirme",
    date: "5 Ağustos",
    description: "Yerleştirme sonuçları açıklanacak",
  },
  {
    id: 5,
    icon: "🔄",
    title: "1. Nakil",
    date: "5-7 Ağustos",
    description: "1. nakil tercihleri yapılacak",
  },
  {
    id: 6,
    icon: "🔁",
    title: "2. Nakil",
    date: "10-12 Ağustos",
    description: "2. nakil tercihleri yapılacak",
  },
];

export default function PreferenceCalendarSection() {
  return (
    <section id="takvim" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8f5ee] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#1b6e3f] uppercase">
            Önemli Tarihler
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#1a2e22] sm:text-[34px]">
            LGS 2026 Tercih Takvimi
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7c72]">
            Tercih sürecinin önemli tarih ve aşamalarını takip edin.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute top-[28px] right-8 left-8 h-[3px] rounded-full bg-[#d97706]/70" />

          <div className="relative grid grid-cols-6 gap-3">
            {timeline.map((item) => (
              <div key={item.id} className="flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#d97706] bg-white text-xl shadow-sm">
                  {item.icon}
                </div>
                <div className="w-full rounded-2xl border border-[#eee6d9] bg-[#fffaf3] px-3 py-4 shadow-[0_2px_12px_rgba(217,119,6,0.08)]">
                  <p className="text-[11px] font-bold tracking-wide text-[#d97706] uppercase">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[15px] font-extrabold text-[#1a2e22]">
                    {item.date}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-[#6b7c72]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet stacked */}
        <div className="relative mt-10 space-y-4 lg:hidden">
          <div className="absolute top-0 bottom-0 left-[27px] w-[3px] rounded-full bg-[#d97706]/60" />
          {timeline.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 pl-1">
              <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-[3px] border-[#d97706] bg-white text-xl shadow-sm">
                {item.icon}
              </div>
              <div className="flex-1 rounded-2xl border border-[#eee6d9] bg-[#fffaf3] px-4 py-3.5 shadow-sm">
                <p className="text-[11px] font-bold tracking-wide text-[#d97706] uppercase">
                  {item.title}
                </p>
                <p className="mt-1 text-[15px] font-extrabold text-[#1a2e22]">
                  {item.date}
                </p>
                <p className="mt-1 text-[13px] text-[#6b7c72]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
