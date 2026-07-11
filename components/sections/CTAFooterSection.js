export default function CTAFooterSection() {
  return (
    <section className="bg-hero-gradient py-20">
      <div className="section-container text-center">
        <span className="mb-4 inline-block rounded-pill border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-white/90 uppercase">
          Hemen Başlayın
        </span>
        <h2 className="font-heading mb-4 text-3xl font-bold text-white md:text-4xl">
          Doğru Okulu Bulmak İçin
          <span className="block text-accent-yellow">Bir Adım Uzaktasınız</span>
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/70">
          LGS puanınızı girin, size en uygun okulları keşfedin. Ücretsiz
          tercih danışmanlığı ile yanınızdayız.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="rounded-pill bg-accent-yellow px-8 py-3.5 font-bold text-gray-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-xl"
          >
            Ücretsiz Başla →
          </button>
          <button
            type="button"
            className="rounded-pill border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
          >
            Bize Ulaşın
          </button>
        </div>
      </div>
    </section>
  );
}
