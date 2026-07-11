import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Veli — Kadıköy",
    avatar: "AY",
    rating: 5,
    text: "İhsaniye LGS Rehberi sayesinde oğlumun yüzdelik dilimine en uygun okulu bulduk. Tercih robotu gerçekten çok işe yaradı!",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    role: "Öğrenci — Fatih",
    avatar: "MK",
    rating: 5,
    text: "Cağaloğlu Anadolu Lisesi'ni bu platform sayesinde keşfettim. Detaylı bilgiler ve grafikler karar vermemi çok kolaylaştırdı.",
  },
  {
    id: 3,
    name: "Zeynep Demir",
    role: "Veli — Beşiktaş",
    avatar: "ZD",
    rating: 4,
    text: "Okul karşılaştırma özelliği harika. Birden fazla okulu yan yana inceleyerek en doğru tercihi yaptık.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-neutral-bg py-20">
      <div className="section-container">
        <SectionHeader
          tag="Yorumlar"
          title="Veli ve Öğrencilerimiz"
          highlight="Ne Diyor?"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-card border border-neutral-border bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i} className="text-accent-gold text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
