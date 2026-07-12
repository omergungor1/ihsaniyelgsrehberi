const steps = [
  {
    num: "01",
    title: "Yüzdelik Dilim Analizi",
    description:
      "Öğrencinin başarı dilimi ve tercih edilebilecek okul aralıkları birlikte değerlendirilir.",
  },
  {
    num: "02",
    title: "Okul Uygunluğu Değerlendirmesi",
    description:
      "Okulun eğitim dili, akademik yapısı, sosyal ortamı ve öğrenci profili dikkate alınır.",
  },
  {
    num: "03",
    title: "Hedefe Göre Tercih Planı",
    description:
      "Yurt dışı, tıp, mühendislik, hukuk veya sosyal alan hedeflerine göre okul seçenekleri değerlendirilir.",
  },
  {
    num: "04",
    title: "Dengeli Tercih Listesi",
    description:
      "Riskli, dengeli ve güvenli tercihler birlikte planlanarak gerçekçi bir liste oluşturulur.",
  },
  {
    num: "05",
    title: "Veli ve Öğrenci Görüşmesi",
    description:
      "Tercih süreci, öğrenci ve veli ile birlikte ele alınarak en uygun liste son hâline getirilir.",
  },
];

export default function ProcessSupportSection() {
  return (
    <section className="bg-[#042352] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white/90 uppercase">
            Yanınızdayız
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-white sm:text-[34px]">
            LGS Tercih Sürecinde Yanınızdayız
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            Doğru tercih; öğrencinin başarısını, hedefini ve okulun niteliğini
            birlikte değerlendirebilmektir.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-white/15 bg-white/8 px-4 py-6 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f2994a] text-sm font-extrabold text-white shadow-md">
                {step.num}
              </div>
              <h3 className="mb-2 text-[14px] leading-snug font-bold text-white">
                {step.title}
              </h3>
              <p className="text-[12px] leading-relaxed text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
