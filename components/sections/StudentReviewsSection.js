"use client";

import { useState } from "react";

const avatarColors = [
  "bg-[#1b6e3f]",
  "bg-[#0f766e]",
  "bg-[#2563eb]",
  "bg-[#7c3aed]",
  "bg-[#c2410c]",
  "bg-[#0369a1]",
];

const currentStudents = [
  {
    id: 1,
    name: "A**** R****",
    initial: "A",
    school: "İstanbul Erkek",
    text: "Yurt sayesinde okula ulaşım çok kolay oldu. Ders çalışma ortamı sessiz ve düzenli; arkadaşlarla birlikte motive oluyoruz.",
  },
  {
    id: 2,
    name: "M**** Y****",
    initial: "M",
    school: "Cağaloğlu Anadolu",
    text: "Rehberlik desteği ve okul tercih sürecindeki yönlendirme gerçekten fark yarattı. Kendimi güvende hissediyorum.",
  },
  {
    id: 3,
    name: "Y**** K****",
    initial: "Y",
    school: "Kabataş Erkek",
    text: "Etüt saatleri ve çalışma salonları çok verimli. Okul yoğunluğunda yurdun düzeni büyük avantaj.",
  },
  {
    id: 4,
    name: "E**** D****",
    initial: "E",
    school: "Kadıköy Anadolu",
    text: "İlk haftadan itibaren ısındım. Hem sosyal hem akademik olarak destekleyici bir ortam var.",
  },
  {
    id: 5,
    name: "H**** Ş****",
    initial: "H",
    school: "Galatasaray Lisesi",
    text: "Yurt yönetimi her konuda yardımcı oluyor. Okul-yurt dengesi çok iyi kurulmuş.",
  },
  {
    id: 6,
    name: "B**** A****",
    initial: "B",
    school: "Samiha Ayverdi",
    text: "Tercih döneminde aldığım bilgiler sayesinde doğru okulu seçtim. Şimdi de buradaki düzenle devam ediyorum.",
  },
  {
    id: 7,
    name: "C**** T****",
    initial: "C",
    school: "İstanbul Erkek",
    text: "Odalar temiz, yemekler düzenli. En önemlisi ders çalışmaya uygun bir atmosfer var.",
  },
  {
    id: 8,
    name: "K**** Ö****",
    initial: "K",
    school: "Cağaloğlu Anadolu",
    text: "Aynı okuldan arkadaşlarla birlikte kalmak moralimi yükseltti. Tempo tutturmak daha kolay.",
  },
  {
    id: 9,
    name: "S**** Ç****",
    initial: "S",
    school: "Kabataş Erkek",
    text: "Ulaşım planı ve okul saatlerine göre yurt düzeni çok düşünülmüş. Zaman kaybı yaşamıyorum.",
  },
];

const graduates = [
  {
    id: 101,
    name: "A**** G****",
    initial: "A",
    school: "İstanbul Erkek",
    text: "Yurt yıllarımda kazandığım disiplin, üniversiteye geçişte en büyük avantajım oldu. Hâlâ tavsiye ediyorum.",
  },
  {
    id: 102,
    name: "M**** Y****",
    initial: "M",
    school: "Cağaloğlu Anadolu",
    text: "Tercih rehberliği ve yurt desteği sayesinde hedeflediğim bölüme yerleştim. Teşekkürler İhsaniye.",
  },
  {
    id: 103,
    name: "Y**** D****",
    initial: "Y",
    school: "Kabataş Erkek",
    text: "Hem okul başarısı hem kişisel gelişim açısından çok şey kattı. Mezun olduktan sonra da bağlarımız sürüyor.",
  },
  {
    id: 104,
    name: "F**** Ö****",
    initial: "F",
    school: "Kadıköy Anadolu",
    text: "Sınav dönemlerinde sağlanan çalışma ortamı ve moral desteği unutulmaz. Doğru yerdeydim.",
  },
  {
    id: 105,
    name: "O**** K****",
    initial: "O",
    school: "Galatasaray Lisesi",
    text: "Yurt arkadaşlığı ve akademik disiplin birlikte yürüdü. Üniversite hayatına hazır hissettim.",
  },
  {
    id: 106,
    name: "E**** A****",
    initial: "E",
    school: "Samiha Ayverdi",
    text: "Aileden uzakta olsam da kendimi yalnız hissetmedim. Bu süreçteki destek çok değerliydi.",
  },
];

export default function StudentReviewsSection() {
  const [tab, setTab] = useState("current");
  const items = tab === "current" ? currentStudents : graduates;

  return (
    <section id="yorumlar" className="bg-[#f8faf9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8f5ee] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#1b6e3f] uppercase">
            İzlenimler
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#1a2e22] sm:text-[34px]">
            Öğrencilerimizden Okul İzlenimleri
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7c72]">
            Mevcut öğrencilerimizin ve mezunlarımızın yurt ile okul sürecine dair
            samimi değerlendirmeleri.
          </p>
        </div>

        {/* Tab switch */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[#e2ebe5] bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setTab("current")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                tab === "current"
                  ? "bg-[#1d5c55] text-white"
                  : "text-[#3d4f42] hover:bg-[#f3faf6]"
              }`}
            >
              <span>🏆</span>
              Mevcut Öğrenciler
            </button>
            <button
              type="button"
              onClick={() => setTab("graduates")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
                tab === "graduates"
                  ? "bg-[#1d5c55] text-white"
                  : "text-[#3d4f42] hover:bg-[#f3faf6]"
              }`}
            >
              <span>🎓</span>
              Mezunlarımız
            </button>
          </div>
        </div>

        {/* Kartlar */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="relative rounded-2xl border border-[#e8efe9] bg-white p-5 shadow-[0_4px_16px_rgba(26,46,34,0.05)]"
            >
              <span className="absolute top-4 right-5 text-3xl leading-none text-[#e5ebe7]">
                ”
              </span>

              <div className="mb-4 flex items-center gap-3 pr-6">
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                    avatarColors[index % avatarColors.length]
                  }`}
                >
                  {item.initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold text-[#1a2e22]">
                    {item.name}
                  </p>
                  <p className="truncate text-[13px] font-semibold text-[#f2994a]">
                    {item.school}
                  </p>
                </div>
              </div>

              <p className="text-[13px] leading-relaxed text-[#5a6b5e]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
