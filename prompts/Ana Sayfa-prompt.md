# Next.js Implementation Prompt - Eğitim Platformu (Okul Tercih Sistemi)

## Genel Tasarım Analizi

```
Tasarım Dili: Modern, kurumsal eğitim platformu
Ana Renk Paleti:
- Primary Green (Koyu): #1B5E20 veya #2E7D32
- Primary Green (Orta): #388E3C
- Accent Green (Açık): #4CAF50
- Hero Background: #1A472A (koyu yeşil gradient)
- Section Background Alternating: #F1F8E9 (açık yeşil-beyaz) / #FFFFFF
- Dark Section BG: #1B5E20
- Text Primary: #212121
- Text Secondary: #616161
- Text Light: #FFFFFF
- Border Color: #E0E0E0
- Card Background: #FFFFFF
- Accent Orange/Yellow: #F57C00 / #FF9800 (badge/tag için)
- Success Green (tag): #43A047
```

---

## Cursor AI Implementation Prompt

```
Aşağıdaki Next.js 14 App Router projesini Tailwind CSS kullanarak implement et.
Türkiye'deki bir eğitim/okul tercih danışmanlık platformu için tam sayfa tasarımı oluştur.
```

---

## Proje Yapısı

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
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
│   │   ├── YKSSuccessSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTAFooterSection.tsx
│   └── ui/
│       ├── SchoolCard.tsx
│       ├── StatBadge.tsx
│       ├── FeatureCard.tsx
│       ├── TableRow.tsx
│       └── TestimonialCard.tsx
```

---

## Tailwind Config Özelleştirmesi

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F1F8E9',
          100: '#DCEDC8',
          200: '#C5E1A5',
          300: '#AED581',
          400: '#9CCC65',
          500: '#8BC34A',
          600: '#7CB342',
          700: '#558B2F',
          800: '#33691E',
          900: '#1B5E20',
          dark: '#1A3A1A',
        },
        accent: {
          orange: '#F57C00',
          yellow: '#FFB300',
          gold:   '#FFC107',
        },
        neutral: {
          bg: '#F8FAF5',
          card: '#FFFFFF',
          border: '#E8EDE3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': ['3.5rem', { lineHeight: '1.15', fontWeight: '800' }],
        'hero-lg': ['2.75rem', { lineHeight: '1.2', fontWeight: '700' }],
        'section-title': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        'card-title': ['1rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        'card': '12px',
        'badge': '6px',
        'pill': '50px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.14)',
        'section': '0 4px 20px rgba(27,94,32,0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1A3A1A 0%, #2E7D32 50%, #388E3C 100%)',
        'dark-section': 'linear-gradient(180deg, #1B5E20 0%, #2E7D32 100%)',
        'light-section': 'linear-gradient(180deg, #F1F8E9 0%, #FFFFFF 100%)',
      }
    },
  },
  plugins: [],
}
export default config
```

---

## Component Implementasyonları

### 1. Navbar

```tsx
// components/layout/Navbar.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Okullar', href: '/okullar' },
  { label: 'Tercih Robotu', href: '/tercih' },
  { label: 'LGS', href: '/lgs' },
  { label: 'YKS', href: '/yks' },
  { label: 'Haberler', href: '/haberler' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
              {/* Logo icon - mountain/school icon */}
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762z"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs text-primary-700 font-semibold tracking-wide uppercase">
                Rehber
              </span>
              <span className="text-sm font-bold text-gray-900">Okul Tercih</span>
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-primary-700 border border-primary-700 
                               rounded-pill hover:bg-primary-50 transition-all duration-200">
              Giriş Yap
            </button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-700 
                               rounded-pill hover:bg-primary-800 transition-all duration-200
                               shadow-md hover:shadow-lg">
              Üye Ol
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-primary-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
```

---

### 2. Hero Section

```tsx
// components/sections/HeroSection.tsx
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-[580px] bg-hero-gradient overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-l from-green-400/30 to-transparent"/>
        </div>
        {/* Geometric shapes */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-800/30 rounded-full -translate-x-32 translate-y-32"/>
        <div className="absolute top-8 right-1/4 w-4 h-4 bg-accent-yellow rounded-full opacity-60"/>
        <div className="absolute top-1/3 right-8 w-6 h-6 bg-primary-400/40 rounded-full"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white">
            {/* Subtitle badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                            border border-white/20 rounded-pill px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse"/>
              <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                2024 Tercih Rehberi
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4">
              Çalıştığımız
              <span className="block text-accent-yellow">Okullar</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base lg:text-lg text-white/80 font-medium mb-3 leading-relaxed">
              Başarıya Giden Yolu Birlikte Bulalım
            </p>
            <p className="text-sm text-white/60 leading-relaxed max-w-md mb-8">
              Türkiye genelinde 500+ okul ile iş birliği yapıyor, öğrencilere en uygun 
              okulu bulmalarında rehberlik ediyoruz.
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-6 mb-8">
              {[
                { value: '500+', label: 'Okul' },
                { value: '50K+', label: 'Öğrenci' },
                { value: '%94', label: 'Memnuniyet' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-accent-yellow text-gray-900 font-bold rounded-pill
                                 hover:bg-yellow-400 transition-all duration-200 
                                 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Okul Bul →
              </button>
              <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-pill
                                 border border-white/30 backdrop-blur-sm
                                 hover:bg-white/20 transition-all duration-200">
                Nasıl Çalışır?
              </button>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-card overflow-hidden h-48 bg-primary-800/50">
                <Image
                  src="/images/school-hero-main.jpg"
                  alt="Okul görüntüsü"
                  width={600}
                  height={300}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              {[1, 2].map((i) => (
                <div key={i} className="rounded-card overflow-hidden h-32 bg-primary-800/50">
                  <Image
                    src={`/images/school-${i}.jpg`}
                    alt={`Okul ${i}`}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
              ))}
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-card p-3 shadow-card">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">4.9/5.0</div>
                  <div className="text-xs text-gray-500">Ortalama Puan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### 3. School Selection Section (Yüzdelik Dilim)

```tsx
// components/sections/SchoolSelectionSection.tsx
const features = [
  {
    icon: '🎯',
    title: 'Yüzdelik Diliminize Göre',
    description: 'LGS ve YKS puanınıza göre size uygun okulları filtreleyin',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: '📍',
    title: 'Konum Bazlı Arama',
    description: 'İl, ilçe veya mahallenize yakın okulları keşfedin',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: '🏆',
    title: 'Başarı Sıralaması',
    description: 'Okul başarı sıralamalarını ve YKS yerleşme oranlarını inceleyin',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: '💡',
    title: 'Akıllı Öneri',
    description: 'Yapay zeka destekli tercih robotu ile en iyi okulu bulun',
    color: 'bg-purple-50 text-purple-600',
  },
]

export default function SchoolSelectionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-primary-700 uppercase tracking-widest 
                           bg-primary-50 px-4 py-1.5 rounded-pill mb-4">
            Nasıl Çalışır?
          </span>
          <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
            Yüzdelik Dilim ve Doğru Okul Seçimi
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Binlerce okul arasından size en uygun olanı bulmak için gelişmiş 
            filtreleme ve yapay zeka teknolojimizi kullanıyoruz.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-neutral-border rounded-card p-6
                         hover:shadow-card-hover hover:-translate-y-1
                         transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center 
                              justify-center text-2xl mb-4 
                              group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="bg-primary-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '2.847', label: 'Toplam Okul', suffix: '+' },
              { value: '81', label: 'İl', suffix: '' },
              { value: '150K', label: 'Kayıtlı Öğrenci', suffix: '+' },
              { value: '98', label: 'Memnuniyet Oranı', suffix: '%' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-3xl font-extrabold text-primary-700 mb-1">
                  {stat.value}<span className="text-accent-orange">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### 4. Popular Choices Section

```tsx
// components/sections/PopularChoicesSection.tsx
const popularSchools = [
  {
    id: 1,
    rank: 1,
    name: 'Kadıköy Anadolu Lisesi',
    type: 'Anadolu Lisesi',
    city: 'İstanbul',
    district: 'Kadıköy',
    yuzdelik: '%0.1',
    yksRate: '%89',
    badge: 'En Çok Tercih',
    badgeColor: 'bg-orange-100 text-orange-700',
    image: '/images/school-1.jpg',
  },
  // ... more schools
]

export default function PopularChoicesSection() {
  return (
    <section className="py-20 bg-neutral-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary-700 uppercase tracking-widest
                           bg-primary-50 px-4 py-1.5 rounded-pill inline-block mb-4">
            Popüler Seçimler
          </span>
          <h2 className="font-heading text-4xl font-bold text-gray-900 mb-3">
            Tercih Döneminde En Çok Yapılan
            <span className="text-primary-700"> Tercihler</span>
          </h2>
        </div>

        {/* Two-column school list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {popularSchools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-card p-4 border border-neutral-border
                         hover:shadow-card-hover hover:border-primary-200
                         transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Rank number */}
                <div className="w-10 h-10 bg-primary-700 text-white rounded-xl 
                                flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {school.rank}
                </div>

                {/* School Image */}
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400"/>
                </div>

                {/* School Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-primary-700">
                      {school.name}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-badge font-medium flex-shrink-0 
                                     ${school.badgeColor}`}>
                      {school.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{school.type}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{school.city} / {school.district}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="text-xs font-semibold text-primary-700">
                      Yüzdelik: {school.yuzdelik}
                    </span>
                    <span className="text-xs font-semibold text-accent-orange">
                      YKS: {school.yksRate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-primary-700 text-white font-semibold rounded-pill
                             hover:bg-primary-800 transition-all duration-200
                             shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Tüm Okulları Gör →
          </button>
        </div>
      </div>
    </section>
  )
}
```

---

### 5. International Programs Section (Dark Green)

```tsx
// components/sections/InternationalProgramsSection.tsx
const programs = [
  { name: 'IB (Uluslararası Bakalorya)', count: '45 Okul', icon: '🌍' },
  { name: 'Cambridge A-Level', count: '28 Okul', icon: '🎓' },
  { name: 'AP (Advanced Placement)', count: '19 Okul', icon: '📚' },
  { name: 'Fransız Lisansiyeri', count: '12 Okul', icon: '🏛️' },
]

export default function InternationalProgramsSection() {
  return (
    <section className="py-20 bg-dark-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary-300 uppercase tracking-widest
                           bg-primary-900/50 border border-primary-700 px-4 py-1.5 rounded-pill inline-block mb-4">
            Uluslararası
          </span>
          <h2 className="font-heading text-4xl font-bold text-white mb-4">
            Okul Programları ve Uluslararası
            <span className="block text-primary-300">İmkânlar</span>
          </h2>
          <p className="text-primary-200/70 max-w-xl mx-auto text-sm leading-relaxed">
            Uluslararası geçerliliği olan programlar sunan okulleri keşfedin
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-card p-6
                         hover:bg-white/15 hover:border-white/25
                         transition-all duration-300 cursor-pointer group text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {program.icon}
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{program.name}</h3>
              <span className="inline-block bg-primary-400/30 text-primary-200 
                               text-xs font-bold px-3 py-1 rounded-pill">
                {program.count}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="px-8 py-3.5 bg-white text-primary-800 font-bold rounded-pill
                             hover:bg-primary-50 transition-all duration-200
                             shadow-lg hover:shadow-xl">
            Uluslararası Okulları İncele
          </button>
        </div>
      </div>
    </section>
  )
}
```

---

### 6. Anadolu Liseleri Table Section

```tsx
// components/sections/AnatolianHighSchoolsSection.tsx
'use client'
import { useState } from 'react'

const schools = [
  {
    rank: 1,
    name: 'Kabataş Erkek Lisesi',
    city: 'İstanbul',
    type: 'Anadolu',
    yuzdelik: '0.08',
    taban: '495.80',
    yks: '98%',
    status: 'success',
  },
  // ... more data
]

const tableHeaders = ['Sıra', 'Okul Adı', 'Şehir', 'Tür', 'Yüzdelik', 'Taban Puan', 'YKS Başarı']

export default function