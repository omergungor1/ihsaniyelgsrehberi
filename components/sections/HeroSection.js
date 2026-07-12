import Image from "next/image";

const defaultStats = [
  { value: "11", label: "Nitelikli Lise" },
  { value: "%0.01", label: "En Düşük Dilim" },
  { value: "1976", label: "Köklü Tecrübe" },
];

export default function HeroSection({ hero = {} }) {
  const stats = Array.isArray(hero.stats) && hero.stats.length ? hero.stats : defaultStats;
  const imageSrc = hero.image_url || "/img1.jpeg";

  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[12%] right-[8%] h-28 w-28 rotate-12 rounded-2xl border border-white/10 bg-white/5" />
        <div className="absolute top-[35%] right-[18%] h-20 w-20 -rotate-6 rounded-xl border border-white/8 bg-white/4" />
        <div className="absolute top-[55%] right-[5%] h-36 w-36 rotate-[25deg] rounded-3xl border border-white/10 bg-white/5" />
        <div className="absolute top-[20%] right-[30%] h-16 w-16 rotate-45 rounded-lg border border-white/6 bg-white/3" />
      </div>

      <div className="section-container relative py-10 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-pill border border-blue-400/30 bg-badge-blue px-4 py-1.5 shadow-sm">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[11px] font-bold tracking-wide uppercase">
                {hero.badge || "LGS Tercih Rehberi 2026"}
              </span>
            </div>

            <h1 className="font-heading mb-3 text-[36px] leading-[1.1] font-extrabold tracking-tight uppercase sm:text-[42px] lg:text-[46px]">
              {hero.title || "ÇALIŞTIĞIMIZ OKULLAR"}
            </h1>

            <p className="mb-4 text-xl font-bold text-accent-yellow sm:text-2xl">
              {hero.subtitle || "Akademik Liselere Yol Haritası"}
            </p>

            <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/85 sm:text-[15px]">
              {hero.description ||
                "Nitelikli liselere ait yüzdelik dilimler, başarılar ve tercih rehberliğiyle öğrencilerimizin ve velilerimizin yanındayız."}
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-orange to-[#f5a623] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-105"
              >
                Başvuru Formu
              </a>
              <a
                href="#okullar"
                className="rounded-xl border border-accent-gold/50 bg-primary-800/60 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,193,7,0.15)] transition-all hover:bg-primary-800/80"
              >
                Okulları İncele
              </a>
            </div>

            <div className="mb-8 flex gap-8 sm:gap-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl leading-none font-extrabold sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-xs text-white/70 sm:text-[13px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className="overflow-hidden rounded-2xl shadow-hero-glow"
              style={{ boxShadow: "var(--shadow-hero-glow)" }}
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
                <Image
                  src={imageSrc}
                  alt="İhsaniye Öğrenci Yurdu"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="absolute right-3 bottom-3 left-3 flex items-center gap-3 rounded-xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 shadow-md">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V16a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h2a1 1 0 001-1v-5.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm leading-tight font-bold text-white">
                      İhsaniye Öğrenci Yurdu
                    </p>
                    <p className="text-[11px] text-white/65">
                      &apos;Eğitimin Merkezi&apos; — YKS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
