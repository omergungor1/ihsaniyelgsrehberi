import SectionHeader from "@/components/ui/SectionHeader";

const timelineSteps = [
  {
    date: "Haziran 2025",
    title: "LGS Sınavı",
    description: "Liselere Geçiş Sistemi sınavı gerçekleştirilir.",
    status: "done",
  },
  {
    date: "Temmuz 2025",
    title: "Sonuçların Açıklanması",
    description: "LGS sonuçları e-Okul üzerinden açıklanır.",
    status: "done",
  },
  {
    date: "Temmuz 2025",
    title: "Tercih Dönemi Başlangıcı",
    description: "e-Okul üzerinden okul tercihleri yapılmaya başlanır.",
    status: "active",
  },
  {
    date: "Ağustos 2025",
    title: "Yerleştirme Sonuçları",
    description: "İlk yerleştirme sonuçları açıklanır.",
    status: "upcoming",
  },
  {
    date: "Ağustos 2025",
    title: "Ek Yerleştirme",
    description: "Boş kontenjanlara ek yerleştirme yapılır.",
    status: "upcoming",
  },
  {
    date: "Eylül 2025",
    title: "Kayıt Dönemi",
    description: "Yerleşen öğrenciler okullarına kayıt yaptırır.",
    status: "upcoming",
  },
];

export default function LGSTimelineSection() {
  return (
    <section id="lgs" className="bg-light-section py-20">
      <div className="section-container">
        <SectionHeader
          tag="LGS Takvimi"
          title="2025 LGS Tercih"
          highlight="Zaman Çizelgesi"
          description="Tercih döneminde takip etmeniz gereken önemli tarihler"
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-primary-200 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {timelineSteps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden flex-1 md:block" />

                <div
                  className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-white shadow-md ${
                    step.status === "done"
                      ? "bg-primary-700 text-white"
                      : step.status === "active"
                        ? "bg-accent-yellow text-gray-900"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.status === "done" ? (
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>

                <div
                  className={`flex-1 rounded-card border border-neutral-border bg-white p-5 shadow-[var(--shadow-card)] ${
                    step.status === "active" ? "ring-2 ring-accent-yellow" : ""
                  }`}
                >
                  <span className="text-xs font-bold tracking-wider text-primary-600 uppercase">
                    {step.date}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
