const features = [
  {
    icon: "⚖️",
    title: "Dengeli Liste",
    description:
      "Güvenli, hedef ve hayal okullarını dengeli bir tercih listesinde bir araya getiriyoruz.",
  },
  {
    icon: "⭐",
    title: "Gerçekçi Hedef",
    description:
      "Yüzdelik diliminize uygun, ulaşılabilir ve sürdürülebilir okul hedefleri belirliyoruz.",
  },
  {
    icon: "📘",
    title: "Okul Profili",
    description:
      "Akademik başarı, dil programı ve okul kültürünü birlikte değerlendiriyoruz.",
  },
  {
    icon: "🧭",
    title: "Yol Haritası",
    description:
      "Tercih sürecinde adım adım ilerleyebileceğiniz net bir rehber sunuyoruz.",
  },
];

export default function SchoolSelectionSection() {
  return (
    <section id="okul-secimi" className="bg-[#F2F4F9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8eef8] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#042352] uppercase">
            Doğru Tercih
          </span>

          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#042352] sm:text-[34px]">
            Yüzdelik Dilim ve Doğru Okul Seçimi
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-[#727F94]">
            LGS sonuçlarıyla birlikte başlayan tercih süreci, puan kadar strateji
            de gerektirir.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-[14px] leading-[1.75] text-[#727F94]">
          <p>
            Yüzdelik dilim, bir öğrencinin ülke genelindeki yaklaşık sıralamasını
            gösterir. Ancak doğru okul seçimi yalnızca bu sayıya bakılarak
            yapılamaz. Okulun akademik yapısı, ulaşım imkanları, dil programı ve
            öğrenci profili de kararın kritik parçalarıdır.
          </p>
          <p>
            <strong className="font-semibold text-[#042352]">
              %0-5 başarı dilimi içerisinde yer alan öğrenciler için tercih
              süreci, yalnızca &quot;hangi okulun yüzdelik dilimi daha düşük?&quot;
              sorusundan ibaret değildir.
            </strong>{" "}
            Asıl mesele, öğrencinin potansiyelini en iyi geliştireceği ortamı
            seçmektir. Bu yüzden tercih listesini dengeli, gerçekçi ve bilinçli
            kurmak gerekir.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white px-5 py-7 text-center shadow-[0_4px_20px_rgba(4,35,82,0.06)] transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(4,35,82,0.1)]"
            >
              <div className="mb-4 text-[28px] leading-none">{feature.icon}</div>
              <h3 className="mb-2 text-[15px] font-bold text-[#042352]">
                {feature.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[#727F94]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
