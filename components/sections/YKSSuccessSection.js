const stats = [
  { icon: "🏆", value: "1", label: "TG 137.si" },
  { icon: "⭐", value: "3", label: "İlk 5.000" },
  { icon: "👥", value: "7", label: "İlk 50.000" },
  { icon: "📈", value: "10", label: "İlk 100.000" },
];

const graduates = [
  {
    id: 1,
    name: "Abdussamet Güngör",
    university: "İstanbul Üniversitesi Cerrahpaşa",
    department: "Tıp (İng.)",
  },
  {
    id: 2,
    name: "Mehmet Ali Yıldız",
    university: "Boğaziçi Üniversitesi",
    department: "Bilgisayar Mühendisliği",
  },
  {
    id: 3,
    name: "Yusuf Emre Kara",
    university: "İstanbul Teknik Üniversitesi",
    department: "Elektrik-Elektronik Müh.",
  },
  {
    id: 4,
    name: "Ahmet Can Demir",
    university: "Hacettepe Üniversitesi",
    department: "Tıp",
  },
  {
    id: 5,
    name: "Mustafa Eren Şahin",
    university: "Orta Doğu Teknik Üniversitesi",
    department: "Makine Mühendisliği",
  },
  {
    id: 6,
    name: "Ömer Faruk Aydın",
    university: "Ankara Üniversitesi",
    department: "Hukuk",
  },
  {
    id: 7,
    name: "Hasan Burak Çelik",
    university: "Marmara Üniversitesi",
    department: "İşletme (İng.)",
  },
  {
    id: 8,
    name: "Enes Berkay Koç",
    university: "Yıldız Teknik Üniversitesi",
    department: "Endüstri Mühendisliği",
  },
  {
    id: 9,
    name: "İbrahim Halil Arslan",
    university: "Gazi Üniversitesi",
    department: "Diş Hekimliği",
  },
  {
    id: 10,
    name: "Furkan Yiğit Özkan",
    university: "Ege Üniversitesi",
    department: "Eczacılık",
  },
];

const highlights = [
  { track: "SAY", result: "TG 137.si" },
  { track: "EA", result: "2192.si" },
];

export default function YKSSuccessSection() {
  return (
    <section id="yks" className="bg-[#f8faf9] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#e8f5ee] px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#1b6e3f] uppercase">
            2025 YKS
          </span>
          <h2 className="font-heading text-[28px] leading-tight font-bold text-[#1a2e22] sm:text-[34px]">
            YKS Başarılarımız
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#6b7c72]">
            2025 YKS yerleştirme sonuçlarında öne çıkan mezunlarımız ve genel
            başarı görünümümüz.
          </p>
        </div>

        {/* İstatistik kartları */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e8efe9] bg-white px-4 py-6 text-center shadow-[0_4px_16px_rgba(26,46,34,0.05)]"
            >
              <div className="mb-2 text-[26px] leading-none">{stat.icon}</div>
              <p className="text-[32px] leading-none font-extrabold text-[#1a2e22]">
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] font-medium text-[#7a8a80]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mezun listesi */}
        <h3 className="mt-14 mb-6 text-center text-[17px] font-bold text-[#135d44]">
          🎓 Mezunlarımızın Yerleştikleri Üniversite ve Bölümler
        </h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {graduates.map((graduate) => (
            <div
              key={graduate.id}
              className="flex items-center gap-4 rounded-2xl border border-[#e8efe9] bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(26,46,34,0.04)]"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#135d44] text-sm font-bold text-white">
                {graduate.id}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold text-[#1a2e22]">
                  {graduate.name}
                </p>
                <p className="mt-0.5 truncate text-[12px] text-[#7a8a80]">
                  {graduate.university}
                </p>
                <p className="mt-0.5 truncate text-[13px] font-semibold text-[#d4a017]">
                  {graduate.department}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Alt özet butonları */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.track}
              className="rounded-2xl bg-[#135d44] px-6 py-5 text-center shadow-md"
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
      </div>
    </section>
  );
}
