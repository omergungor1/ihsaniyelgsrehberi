const mistakes = [
  {
    num: "01",
    icon: "📍",
    title: "Sadece yüzdelik dilime bakmak",
    description:
      "Okulu yalnızca geçen yılın yüzdelik dilimine göre seçmek, okul kültürü ve akademik yapıyı göz ardı etmeye yol açar.",
  },
  {
    num: "02",
    icon: "🏫",
    title: "Okulu yerinde görmemek",
    description:
      "Kampüs, sınıf ortamı ve ulaşım koşullarını görmeden karar vermek sonradan pişmanlık doğurabilir.",
  },
  {
    num: "03",
    icon: "📈",
    title: "Tek tip tercih listesi hazırlamak",
    description:
      "Tüm tercihleri aynı risk seviyesinde tutmak, yerleşmeme ihtimalini artırır.",
  },
  {
    num: "04",
    icon: "🎒",
    title: "Ulaşımı hesaba katmamak",
    description:
      "Günlük yol süresi ve ulaşım yorgunluğu, akademik başarıyı doğrudan etkiler.",
  },
  {
    num: "05",
    icon: "👨‍👩‍👧",
    title: "Öğrenci isteklerini yok saymak",
    description:
      "Sadece aile beklentisine göre seçim yapmak, öğrencinin motivasyonunu düşürebilir.",
  },
  {
    num: "06",
    icon: "📚",
    title: "Program farklarını araştırmamak",
    description:
      "Dil ağırlığı, hazırlık sınıfı ve proje programları okula göre büyük farklılık gösterir.",
  },
  {
    num: "07",
    icon: "⚠️",
    title: "Yedek tercih bırakmamak",
    description:
      "Listeyi dar tutmak, beklenmeyen yüzdelik değişimlerinde yerleşmeyi riske atar.",
  },
  {
    num: "08",
    icon: "⏰",
    title: "Tercihi son güne bırakmak",
    description:
      "Acele verilen kararlar, eksik araştırma ve hatalı sıralama riskini yükseltir.",
  },
];

export default function PreferenceMistakesSection() {
  return (
    <section id="hatalar" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            Dikkat
          </span>

          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            Tercih Döneminde En Çok Yapılan Hatalar
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
            Doğru tercihi yapmak kadar, yaygın hatalardan uzak durmak da kritiktir.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {mistakes.map((item) => (
            <div
              key={item.num}
              className="flex overflow-hidden rounded-2xl bg-[#F2F4F9] shadow-[0_2px_12px_rgba(4,35,82,0.04)]"
            >
              {/* Mavi + altın iki tonlu sol kenarlık */}
              <div className="w-[5px] flex-shrink-0 bg-gradient-to-b from-[#042352] via-[#2B6FD6] to-[#d4a017]" />

              <div className="flex flex-1 items-start gap-4 px-5 py-5">
                <span className="font-heading text-[22px] leading-none font-extrabold text-[#042352]">
                  {item.num}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="mb-1.5 text-[15px] font-bold text-[#042352]">
                    <span className="mr-1.5">{item.icon}</span>
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#727F94]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
