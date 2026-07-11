# İhsaniye LGS Rehberi - Kapsamlı Next.js Tasarım Sistemi Promptu

## Proje Tanımı

```
İhsaniye LGS Rehberi: Türkiye'deki LGS öğrencileri için okul tercih danışmanlık platformu.
Next.js 14 App Router + Tailwind CSS + TypeScript kullanılarak implement edilecek.
Mobil öncelikli (mobile-first) tasarım yaklaşımı.
Türkçe içerik.
```

---

## 1. Birleştirilmiş Renk Sistemi

```
TEMEL YEŞİL PALETTE:
├── primary-50:  #F1F8E9   (açık arka plan, section bg)
├── primary-100: #E8F5EE   (badge bg, hover bg)
├── primary-200: #C5E1A5
├── primary-300: #AED581
├── primary-400: #3CB371   (grafik çizgi/bar)
├── primary-500: #2E9E5B   (ana buton, ikon, kenarlık)
├── primary-600: #267A4A   (hover state)
├── primary-700: #1B6E3F   (solid header, buton)
├── primary-800: #1A7A4A   (gradient başlangıç)
├── primary-900: #1B5E20   (dark section bg)
├── primary-dark: #1A3A1A  (hero gradient koyu)
├── header-gradient: from-[#1a7a4a] → to-[#2d9e5f]
└── dark-section: from-[#1B5E20] → to-[#2E7D32]

TURUNCU / SARIYA PALETTE:
├── accent-orange: #F57C00  (YKS badge)
├── accent-gold:   #FFC107
├── accent-yellow: #FFB300  (hero CTA buton)
├── bar-orange:    #F59E0B  (grafik bar, WhatsApp butonu)
└── bar-orange-dk: #D97706  (hover state)

NÖTR PALETTE:
├── page-bg:    #F3F4F6   (genel sayfa arka planı)
├── neutral-bg: #F8FAF5   (section arka planı)
├── card-bg:    #FFFFFF
├── border:     #E5E7EB
├── border-lt:  #F3F4F6
├── text-primary:   #111827
├── text-secondary: #374151
├── text-muted:     #6B7280
└── text-light:     #9CA3AF

ÖZEL:
├── rozet-sarı:  #F5C518  (altın rozet)
├── rozet-kırmızı: #E53E3E
├── başarı:      #43A047
└── hata:        #DC2626
```

---

## 2. Birleştirilmiş Tipografi Sistemi

```
FONT AİLELERİ:
├── body:    Inter, system-ui, sans-serif      (genel metin)
└── heading: Montserrat, Inter, sans-serif     (başlıklar)

BOYUT SCALE:
├── text-hero:    3.5rem / 56px  – font-extrabold  (hero h1)
├── text-display: 2.75rem / 44px – font-bold       (section h1 lg)
├── text-section: 2rem / 32px    – font-bold       (section başlık)
├── text-card:    1rem / 16px    – font-semibold   (kart başlık)
├── text-2xl:     1.5rem / 24px  – font-bold       (modal okul adı)
├── text-base:    1rem / 16px    – font-semibold   (section alt başlık)
├── text-sm:      0.875rem / 14px                  (genel metin)
├── text-xs:      0.75rem / 12px                   (etiket, grafik)
└── leading-relaxed: 1.6                           (açıklama metni)

AĞIRLIK:
├── font-extrabold: 800 (hero)
├── font-bold:      700 (başlık)
├── font-semibold:  600 (kart başlık, section alt)
├── font-medium:    500 (nav link, badge)
└── font-normal:    400 (açıklama, ikincil)
```

---

## 3. Birleştirilmiş Spacing & Layout Sistemi

```
CONTAINER:
├── max-w-7xl + mx-auto + px-4 sm:px-6 lg:px-8  (ana sayfa)
└── max-w-md + mx-auto                           (modal)

SECTION PADDING:
├── py-20   (büyük section)
├── py-16   (orta section)
└── py-12   (küçük section)

KART PADDING:
├── p-6   (büyük kart)
├── p-4   (standart kart / modal kart)
└── p-3   (kompakt kart)

STACK/GAP:
├── space-y-4  / gap-4   (kart içi elemanlar)
├── space-y-6  / gap-6   (section içi bloklar)
├── gap-3                (kompakt grid)
├── gap-2                (badge/tag grubu)
└── gap-1.5              (ikon + metin)

BORDER RADIUS:
├── rounded-3xl  (24px) – modal wrapper
├── rounded-2xl  (16px) – kart
├── rounded-xl   (12px) – buton, grafik kutu
├── rounded-lg   (8px)  – küçük eleman
├── rounded-pill (50px) – CTA buton (ana sayfa)
└── rounded-full        – badge, avatar

GÖLGE:
├── shadow-2xl             (modal)
├── shadow-lg              (hero float badge, görsel)
├── shadow-md              (standart kart)
├── shadow-card:      0 2px 12px rgba(0,0,0,0.08)
├── shadow-card-hover: 0 8px 24px rgba(0,0,0,0.14)
└── shadow-contact-bar: 0 -4px 20px rgba(0,0,0,0.08)
```

---

## 4. Proje Dosya Yapısı

```
ihsaniye-lgs-rehberi/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── schools/
│       └── [id]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── SchoolSelectionSection.tsx
│   │   ├── PopularChoicesSection.tsx
│   │   ├── InternationalProgramsSection.tsx
│   │   ├── AnatolianHighSchoolsSection.tsx
│   │   ├── SchoolMapSection.tsx
│   │   ├── PreferenceGuideSection.tsx
│   │   ├── LGSTimelineSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTAFooterSection.tsx
│   ├── school/
│   │   ├── SchoolDetailModal.tsx
│   │   ├── SchoolHeader.tsx
│   │   ├── SchoolBadges.tsx
│   │   ├── SchoolMediaSection.tsx
│   │   ├── SchoolInfoGrid.tsx
│   │   ├── SchoolCharts.tsx
│   │   ├── SchoolTransport.tsx
│   │   ├── SchoolAbout.tsx
│   │   ├── SchoolProgram.tsx
│   │   ├── SchoolAchievements.tsx
│   │   ├── SchoolContactBar.tsx
│   │   └── charts/
│   │       ├── PercentileLineChart.tsx
│   │       ├── QuotaBarChart.tsx
│   │       └── StudentBarChart.tsx
│   └── ui/
│       ├── SchoolCard.tsx
│       ├── StatBadge.tsx
│       ├── FeatureCard.tsx
│       ├── SectionHeader.tsx
│       └── TestimonialCard.tsx
├── types/
│   └── school.ts
├── lib/
│   └── data/
│       └── schools.ts
├── public/
│   └── images/
└── tailwind.config.ts
```

---

## 5. TypeScript Tip Tanımları

```typescript
// types/school.ts
export interface SchoolData {
  id: string;
  name: string;
  district: string;
  city: string;
  type: 'Anadolu Lisesi' | 'Fen Lisesi' | 'Sosyal Bilimler Lisesi' | 'Özel Lise';
  rank?: number;
  imageSrc: string;
  badges: Badge[];
  address: string;
  distance: string;
  coordinates: { lat: number; lng: number };
  info: InfoItem[];
  chartData: {
    percentile: ChartPoint[];
    quota:      ChartPoint[];
    students:   ChartPoint[];
  };
  transport: TransportData;
  description: string;
  program: ProgramData;
  achievements: Achievement[];
  whatsappNumber: string;
  phoneNumber: string;
  // Ana sayfa liste alanları
  yuzdelik?: string;
  yksRate?:  string;
  taban?:    string;
  badge?:    string;
  badgeColor?: string;
}

export interface Badge      { label: string; icon?: string; }
export interface InfoItem   { label: string; value: string; }
export interface ChartPoint { year: string; value: number; }
export interface Achievement { id: number; text: string; icon?: string; }

export interface TransportData {
  duration:    number;
  frequency:   number;
  description: string;
}

export interface ProgramData {
  title:       string;
  description: string;
}
```

---

## 6. Tailwind Konfigürasyonu

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:   '#F1F8E9',
          100:  '#E8F5EE',
          200:  '#C5E1A5',
          300:  '#AED581',
          400:  '#3CB371',
          500:  '#2E9E5B',
          600:  '#267A4A',
          700:  '#1B6E3F',
          800:  '#1A7A4A',
          900:  '#1B5E20',
          dark: '#1A3A1A',
        },
        accent: {
          orange: '#F57C00',
          yellow: '#FFB300',
          gold:   '#FFC107',
          bar:    '#F59E0B',
          barDk:  '#D97706',
        },
        neutral: {
          bg:     '#F8FAF5',
          pageBg: '#F3F4F6',
          card:   '#FFFFFF',
          border: '#E5E7EB',
          borderLt: '#F3F4F6',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        card:   '12px',
        badge:  '6px',
        pill:   '50px',
        modal:  '24px',
        chart:  '12px',
      },
      boxShadow: {
        card:         '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.14)',
        section:      '0 4px 20px rgba(27,94,32,0.12)',
        'contact-bar':'0 -4px 20px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(135deg, #1A3A1A 0%, #2E7D32 50%, #388E3C 100%)',
        'school-header':   'linear-gradient(135deg, #1a7a4a 0%, #2d9e5f 100%)',
        'dark-section':    'linear-gradient(180deg, #1B5E20 0%, #2E7D32 100%)',
        'light-section':   'linear-gradient(180deg, #F1F8E9 0%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
```

---

## 7. Global CSS & Font Yükleme

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { @apply scroll-smooth; }
  body { @apply font-sans text-neutral-900 bg-neutral-pageBg antialiased; }
  h1, h2, h3 { @apply font-heading; }
}

@layer components {
  .section-container { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
  .section-header    { @apply text-center mb-12; }
  .section-tag       {
    @apply inline-block text-xs font-bold text-primary-700 uppercase tracking-widest
           bg-primary-50 px-4 py-1.5 rounded-pill mb-4;
  }
  .card-base {
    @apply bg-white rounded-card border border-neutral-border
           shadow-card hover:shadow-card-hover transition-all duration-200;
  }
  .btn-primary {
    @apply px-6 py-3 bg-primary-500 text-white font-semibold rounded-pill
           hover:bg-primary-600 transition-all duration-200
           shadow-md hover:shadow-lg hover:-translate-y-0.5;
  }
  .btn-outline {
    @apply px-6 py-3 border-2 border-primary-500 text-primary-600 font-semibold
           rounded-pill hover:bg-primary-50 transition-all duration-200;
  }
}
```

---

## 8. App Layout

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'İhsaniye LGS Rehberi | Okul Tercih Platformu',
  description: 'LGS puanınıza göre en uygun okulu bulun. 500+ okul, gelişmiş filtreleme.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 9. Ana Sayfa

```tsx
// app/page.tsx
import HeroSection              from '@/components/sections/HeroSection';
import SchoolSelectionSection   from '@/components/sections/SchoolSelectionSection';
import PopularChoicesSection    from '@/components/sections/PopularChoicesSection';
import InternationalProgramsSection from '@/components/sections/InternationalProgramsSection';
import AnatolianHighSchoolsSection  from '@/components/sections/AnatolianHighSchoolsSection';
import LGSTimelineSection       from '@/components/sections/LGSTimelineSection';
import TestimonialsSection      from '@/components/sections/TestimonialsSection';
import CTAFooterSection         from '@/components/sections/CTAFooterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SchoolSelectionSection />
      <PopularChoicesSection />
      <InternationalProgramsSection />
      <AnatolianHighSchoolsSection />
      <LGSTimelineSection />
      <TestimonialsSection />
      <CTAFooterSection />
    </>
  );
}
```

---

## 10. Navbar

```tsx
// components/layout/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Okullar',        href: '/okullar'    },
  { label: 'Tercih Robotu',  href: '/tercih'     },
  { label: 'LGS',            href: '/lgs'        },
  { label: 'Haberler',       href: '/haberler'   },
  { label: 'Hakkımızda',     href: '/hakkimizda' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm
                    border-b border-neutral-border shadow-sm">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-800 rounded-xl flex items-center
                            justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 
                         1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 
                         11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 
                         1 0 000-1.838l-7-3z"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] text-primary-600 font-bold tracking-widest uppercase">
                LGS Rehberi
              </span>
              <span className="text-sm font-bold text-gray-900">İhsaniye</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 rounded-lg
                           hover:text-primary-700 hover:bg-primary-50
                           transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="btn-outline py-2 text-sm">Giriş Yap</button>
            <button className="btn-primary py-2 text-sm">Üye Ol</button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Menüyü aç/kapat"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-border px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-gray-700
                         rounded-lg hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t border-neutral-border mt-2">
            <button className="flex-1 btn-outline py-2 text-sm">Giriş Yap</button>
            <button className="flex-1 btn-primary py-2 text-sm">Üye Ol</button>
          </div>
        </div>
      )}
    </nav>
  );
}
```

---

## 11. Hero Section

```tsx
// components/sections/HeroSection.tsx
export default function HeroSection() {
  const stats = [
    { value: '500+', label: 'Okul'        },
    { value: '50K+', label: 'Öğrenci'     },
    { value: '%94',  label: 'Memnuniyet'  },
  ];

  return (
    <section className="relative min-h-[580px] bg-hero-gradient overflow-hidden">

      {/* Arka Plan Dekorasyonları */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full
                        bg-gradient-to-l from-green-400/20 to-transparent"/>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-900/30
                        rounded-full -translate-x-32 translate-y-32"/>
        <div className="absolute top-8 right-1/4 w-3 h-3 bg-accent-yellow
                        rounded-full opacity-70 animate-pulse"/>
        <div className="absolute top-1/3 right-12 w-5 h-5 bg-primary-400/40 rounded-full"/>
      </div>

      <div className="relative section-container pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Sol İçerik */}
          <div className="text-white">
            {/* Üst Etiket */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                            border border-white/20 rounded-pill px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse"/>
              <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                2025 LGS Tercih Rehberi
              </span>
            </div>

            {/* Ana Başlık */}
            <h1 className="font-heading text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4">
              Doğru Okulu
              <span className="block text-accent-yellow">Birlikte Bulalım</span>
            </h1>

            {/* Alt Başlık */}
            <p className="text-base lg:text-lg text-white/80 font-medium mb-2 leading-relaxed">
              LGS Puanınıza Göre En İyi Okul Eşleşmesi
            </p>
            <p className="text-sm text-white/60 leading-relaxed max-w-md mb-8">
              İhsaniye genelinde 500+ okul ile iş birliği yapıyor, 
              öğrencilere en uygun okulu bulmalarında rehberlik ediyoruz.
            </p>

            {/* İstatistikler */}
            <div className="flex items-center gap-8 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{s.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Butonları */}
            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-3.5 bg-accent-yellow text-gray-900 font-bold
                                 rounded-pill shadow-lg hover:bg-yellow-300
                                 hover:shadow-xl hover:-translate-y-0.5
                                 transition-all duration-200">
                Okul Bul →
              </button>
              <button className="px-7 py-3.5 bg-white/10 text-white font-semibold
                                 rounded-pill border border-white/30 backdrop-blur-sm
                                 hover:bg-white/20 transition-all duration-200">
                Nasıl Çalışır?
              </button>
            </div>
          </div>

          {/* Sağ: Görsel (lg+) */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-2xl overflow-hidden h-48
                              bg-primary-800/50 border border-white/10">
                <div className="w-full h-full bg-gradient-to-br
                                from-primary-700/80 to-primary-500/60
                                flex items-center justify-center">
                  <span className="text-white/40 text-sm">Okul Görseli</span>
                </div>
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-32
                                        bg-primary-800/50 border border-white/10">
                  <div className="w-full h-full bg-gradient-to-br
                                  from-primary-600/60 to-primary-400/40
                                  flex items-center justify-center">
                    <span className="text-white/30 text-xs">Görsel {i}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Float Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-card p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center
                                justify-center text-base">⭐</div>
                <div>
                  <div className="text-xs font-bold text-gray-900">4.9 / 5.0</div>
                  <div className="text-[11px] text-gray-500">Ortalama Puan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 12. Yeniden Kullanılabilir Section Header UI

```tsx
// components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  tag?:         string;
  title:        string;
  highlight?:   string;
  description?: string;
  dark?:        boolean;
}

export default function SectionHeader({
  tag, title, highlight, description, dark = false
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      {tag && (
        <span className={`section-tag ${dark
          ? 'text-primary-300 bg-primary-900/50 border border-primary-700'
          : 'text-primary-700 bg-primary-50'}`}>
          {tag}
        </span>
      )}
      <h2 className={`font-heading text-section font-bold mb-4
                      ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title}
        {highlight && (
          <span className={`block ${dark ? 'text-primary-300' : 'text-primary-600'}`}>
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className={`max-w-2xl mx-auto text-base leading-relaxed
                       ${dark ? 'text-white/60' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
```

---

## 13. Popular Choices Section

```tsx
// components/sections/PopularChoicesSection.tsx
import SectionHeader from '@/components/ui/SectionHeader';

const popularSchools = [
  {
    id: '1', rank: 1, name: 'Kadıköy Anadolu Lisesi',
    type: 'Anadolu Lisesi', city: 'İstanbul', district: 'Kadıköy',
    yuzdelik: '%0.1', yksRate: '%89',
    badge: 'En Çok Tercih', badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: '2', rank: 2, name: 'Kabataş Erkek Lisesi',
    type: 'Anadolu Lisesi', city: 'İstanbul', district: 'Beyoğlu',
    yuzdelik: '%0.08', yksRate: '%98',
    badge: 'Top 10', badgeColor: 'bg-green-100 text-green-700',
  },
];

export default function PopularChoicesSection() {
  return (
    <section className="py-20 bg-neutral-bg">
      <div className="section-container">
        <SectionHeader
          tag="Popüler Seç