export default function YKSSuccessSection({ yks }) {
  if (!yks) return null;

  const { section, stats = [], graduates = [], highlights = [] } = yks;

  return (
    <section id="yks" className="bg-[#F2F4F9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            {section?.badge || "2025 YKS"}
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            {section?.title || "YKS Başarılarımız"}
          </h2>
          {section?.subtitle ? (
            <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
              {section.subtitle}
            </p>
          ) : null}
        </div>

        {stats.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id || stat.label}
                className="rounded-2xl border border-[#D6DFEC] bg-white px-4 py-6 text-center shadow-[0_4px_16px_rgba(4,35,82,0.05)]"
              >
                <div className="mb-2 text-[26px] leading-none">{stat.icon}</div>
                <p className="text-[32px] leading-none font-extrabold text-[#042352]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] font-medium text-[#727F94]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {graduates.length > 0 && (
          <>
            <h3 className="mt-14 mb-6 text-center text-[17px] font-bold text-[#042352]">
              🎓 Mezunlarımızın Yerleştikleri Üniversite ve Bölümler
            </h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {graduates.map((graduate, index) => (
                <div
                  key={graduate.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#D6DFEC] bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(4,35,82,0.04)]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#042352] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-bold text-[#042352]">
                      {graduate.name}
                    </p>
                    <p className="mt-0.5 truncate text-[12px] text-[#727F94]">
                      {graduate.university}
                    </p>
                    {graduate.department ? (
                      <p className="mt-0.5 truncate text-[13px] font-semibold text-[#d4a017]">
                        {graduate.department}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {highlights.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.id || item.track}
                className="rounded-2xl bg-[#042352] px-6 py-5 text-center shadow-md"
              >
                <p className="text-[12px] font-bold tracking-[0.16em] text-white/80 uppercase">
                  {item.track}
                </p>
                <p className="mt-1 text-[28px] font-extrabold text-[#f5c518] sm:text-[30px]">
                  {item.result}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
