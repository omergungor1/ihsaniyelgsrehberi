export default function PreferenceCalendarSection({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="takvim" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            Önemli Tarihler
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            LGS 2026 Tercih Takvimi
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
            Tercih sürecinin önemli tarih ve aşamalarını takip edin.
          </p>
        </div>

        <div className="relative mt-14 hidden lg:block">
          <div className="absolute top-[28px] right-8 left-8 h-[3px] rounded-full bg-[#d97706]/70" />

          <div
            className="relative grid gap-3"
            style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 6)}, minmax(0, 1fr))` }}
          >
            {items.map((item) => (
              <div key={item.id} className="flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#d97706] bg-white text-xl shadow-sm">
                  {item.icon}
                </div>
                <div className="w-full rounded-2xl border border-[#eee6d9] bg-[#fffaf3] px-3 py-4 shadow-[0_2px_12px_rgba(217,119,6,0.08)]">
                  <p className="text-[11px] font-bold tracking-wide text-[#d97706] uppercase">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[15px] font-extrabold text-[#042352]">
                    {item.date}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-[#727F94]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 space-y-4 lg:hidden">
          <div className="absolute top-0 bottom-0 left-[27px] w-[3px] rounded-full bg-[#d97706]/60" />
          {items.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 pl-1">
              <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-[3px] border-[#d97706] bg-white text-xl shadow-sm">
                {item.icon}
              </div>
              <div className="flex-1 rounded-2xl border border-[#eee6d9] bg-[#fffaf3] px-4 py-3.5 shadow-sm">
                <p className="text-[11px] font-bold tracking-wide text-[#d97706] uppercase">
                  {item.title}
                </p>
                <p className="mt-1 text-[15px] font-extrabold text-[#042352]">
                  {item.date}
                </p>
                <p className="mt-1 text-[13px] text-[#727F94]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
