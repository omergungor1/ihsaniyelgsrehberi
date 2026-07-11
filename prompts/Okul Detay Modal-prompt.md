# Cağaloğlu Anadolu Lisesi - Okul Detay Sayfası Next.js Implementation Prompt

## Cursor AI için Next.js Implementasyon Promptu

```
Aşağıdaki tasarımı Next.js App Router ve Tailwind CSS kullanarak implement et.
Bu bir okul detay modal/sayfasıdır. Türkçe içerik kullanılacak.
```

---

## 1. Tasarım Analizi

### Renk Paleti
```
Ana Yeşil (Header BG Gradient): #1a7a4a → #2d9e5f (from-[#1a7a4a] to-[#2d9e5f])
Koyu Yeşil (Header solid): #1b6e3f
Açık Yeşil (Badge/Tag BG): #e8f5ee
Yeşil (Grafik bar/line): #2e9e5b / #3cb371
Turuncu (Bar grafik): #f5a623 / #f59e0b
Sarı (Rozet ikon): #f5c518
Kırmızı (Rozet ikon): #e53e3e
Beyaz Kart BG: #ffffff
Sayfa BG: #f3f4f6
Kenarlık Rengi: #e5e7eb
Metin Ana: #1a1a1a / #111827
Metin İkincil: #6b7280
Metin Açıklama: #374151
PASCH Kutu Sol Kenarlık: #2e9e5b
Yeşil Buton (Toplu Taşıma): #2e9e5b
Turuncu Buton (WhatsApp): #f59e0b
```

### Tipografi
```
Font Ailesi: Inter, sans-serif (Google Fonts)
Başlık (Okul Adı): font-bold, text-2xl (24px), leading-tight, text-white
Alt başlık (Konum): text-sm (14px), text-white/80, font-normal
Section Başlıkları: text-base (16px), font-semibold, text-gray-800
Info Label: text-sm (13px), text-gray-500, font-normal
Info Value: text-sm (13px), text-gray-800, font-semibold
Açıklama metin: text-sm (14px), text-gray-600, leading-relaxed (1.6)
Grafik başlık: text-xs (12px), font-medium, text-gray-700, text-center
```

### Spacing Sistemi
```
Container padding: px-4 py-4 (16px)
Header padding: px-5 pt-5 pb-4
Kart padding: p-4 (16px)
Section gap: gap-y-6 (24px)
Badge gap: gap-2 (8px)
Info row padding: py-3 (12px)
Grid gap (info): gap-x-8 gap-y-0
İkon-metin gap: gap-1.5 (6px)
```

### Border & Shadow
```
Kart border radius: rounded-2xl (16px)
Badge border radius: rounded-full
Buton border radius: rounded-xl (12px)
Modal border radius: rounded-3xl (24px)
Grafik kutu: rounded-xl
Gölge: shadow-md (0 4px 6px -1px rgba(0,0,0,0.1))
Görsel gölge: shadow-lg
Kart border: border border-gray-100
```

---

## 2. Component Yapısı

### Dosya Yapısı
```
app/
  schools/
    [id]/
      page.tsx
components/
  school/
    SchoolDetailModal.tsx       # Ana wrapper
    SchoolHeader.tsx            # Yeşil gradient header
    SchoolBadges.tsx            # Tag/badge listesi
    SchoolMediaSection.tsx      # Fotoğraf + Harita
    SchoolInfoGrid.tsx          # Eğitim bilgileri grid
    SchoolCharts.tsx            # Grafik bölümü
    SchoolTransport.tsx         # Ulaşım bölümü
    SchoolAbout.tsx             # Okul hakkında
    SchoolProgram.tsx           # PASCH/Program bilgisi
    SchoolAchievements.tsx      # Okul Başarıları
    SchoolContactBar.tsx        # Alt iletişim butonu çubuğu
    charts/
      LineChart.tsx             # Yüzdelik dilim çizgi grafiği
      BarChart.tsx              # Kontenjan bar grafiği
      OrangeBarChart.tsx        # Yurt gönderilen öğrenci grafiği
```

---

## 3. Ana Component Implementasyonu

```tsx
// components/school/SchoolDetailModal.tsx
'use client';

import SchoolHeader from './SchoolHeader';
import SchoolBadges from './SchoolBadges';
import SchoolMediaSection from './SchoolMediaSection';
import SchoolInfoGrid from './SchoolInfoGrid';
import SchoolCharts from './SchoolCharts';
import SchoolTransport from './SchoolTransport';
import SchoolAbout from './SchoolAbout';
import SchoolProgram from './SchoolProgram';
import SchoolAchievements from './SchoolAchievements';
import SchoolContactBar from './SchoolContactBar';

interface SchoolDetailModalProps {
  school: SchoolData;
  onClose: () => void;
}

export default function SchoolDetailModal({ school, onClose }: SchoolDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-[#f3f4f6] rounded-3xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col">
        
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
        >
          <span className="text-white text-lg font-bold leading-none">×</span>
        </button>

        {/* Scroll edilebilir içerik */}
        <div className="overflow-y-auto flex-1 pb-24 scroll-smooth">
          
          {/* Yeşil Header */}
          <div className="bg-gradient-to-br from-[#1a7a4a] to-[#2a9d5c] px-5 pt-5 pb-5">
            <SchoolHeader school={school} />
            <SchoolBadges badges={school.badges} />
          </div>

          {/* İçerik Alanı */}
          <div className="px-4 py-4 space-y-4">
            <SchoolMediaSection
              imageSrc={school.imageSrc}
              imageAlt={school.name}
              address={school.address}
              distance={school.distance}
              coordinates={school.coordinates}
            />
            <SchoolInfoGrid info={school.info} />
            <SchoolCharts data={school.chartData} />
            <SchoolTransport transport={school.transport} />
            <SchoolAbout description={school.description} />
            <SchoolProgram program={school.program} />
            <SchoolAchievements achievements={school.achievements} />
          </div>
        </div>

        {/* Sabit Alt Bar */}
        <SchoolContactBar
          whatsappNumber={school.whatsappNumber}
          phoneNumber={school.phoneNumber}
        />
      </div>
    </div>
  );
}
```

---

## 4. Header Component

```tsx
// components/school/SchoolHeader.tsx
export default function SchoolHeader({ school }: { school: SchoolData }) {
  return (
    <div className="mb-3">
      <h1 className="text-2xl font-bold text-white leading-tight mb-1">
        {school.name}
      </h1>
      <p className="text-sm text-white/80 font-normal flex items-center gap-1">
        <span>📍</span>
        <span>{school.district} · {school.city} · {school.type}</span>
      </p>
    </div>
  );
}
```

---

## 5. Badges Component

```tsx
// components/school/SchoolBadges.tsx
interface Badge {
  label: string;
  icon?: string;
  variant?: 'default' | 'trophy' | 'language' | 'program';
}

export default function SchoolBadges({ badges }: { badges: Badge[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {badges.map((badge, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                     bg-white/15 text-white border border-white/25 backdrop-blur-sm
                     hover:bg-white/25 transition-colors cursor-default"
        >
          {badge.icon && <span>{badge.icon}</span>}
          {badge.label}
        </span>
      ))}
    </div>
  );
}

// Örnek kullanım:
// badges = [
//   { label: 'Türkiye 6.', icon: '🏆' },
//   { label: 'Almanca' },
//   { label: 'Hazırlık + 4 Yıl', icon: '●' },
//   { label: 'DSD Okulu' },
//   { label: 'PASCH' },
//   { label: 'MUN' },
// ]
```

---

## 6. Media Section (Fotoğraf + Harita)

```tsx
// components/school/SchoolMediaSection.tsx
'use client';
import Image from 'next/image';

export default function SchoolMediaSection({
  imageSrc, imageAlt, address, distance, coordinates
}: MediaSectionProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
      {/* Görsel ve Harita yan yana */}
      <div className="grid grid-cols-2 gap-0">
        {/* Sol: Fotoğraf */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
            <p className="text-white text-xs font-medium">{imageAlt}</p>
          </div>
        </div>

        {/* Sağ: Harita */}
        <div className="relative h-44 bg-gray-100">
          {/* Google Maps iframe veya statik harita */}
          <div className="w-full h-full bg-[#e8f0e8] flex items-center justify-center relative">
            {/* Zoom butonları */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <button className="w-6 h-6 bg-white rounded shadow text-xs font-bold flex items-center justify-center hover:bg-gray-50">+</button>
              <button className="w-6 h-6 bg-white rounded shadow text-xs font-bold flex items-center justify-center hover:bg-gray-50">−</button>
            </div>
            {/* Harita placeholder / gerçek harita embed */}
            <span className="text-gray-400 text-xs">Harita Yükleniyor...</span>
          </div>
        </div>
      </div>

      {/* Adres ve Yol Tarifi */}
      <div className="p-3 border-t border-gray-100">
        <p className="text-xs text-gray-600 flex items-start gap-1 mb-2">
          <span className="text-[#e53e3e] mt-0.5">📍</span>
          <span>{address}</span>
        </p>
        <p className="text-xs text-gray-500 mb-2">
          Yurttan yaklaşık <span className="font-semibold text-gray-700">{distance}</span> ·{' '}
          <a href="#" className="text-[#2e9e5b] underline">Yol Tarifi Al →</a>
        </p>

        {/* Ulaşım Mod Butonları */}
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#2e9e5b] text-white rounded-lg text-xs font-medium hover:bg-[#267a4a] transition-colors">
            <span>🚌</span> Toplu Taşıma
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
            <span>🚗</span> Araçla
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
            <span>🚶</span> Yürüyerek
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Info Grid Component

```tsx
// components/school/SchoolInfoGrid.tsx
interface InfoItem {
  label: string;
  value: string;
}

export default function SchoolInfoGrid({ info }: { info: InfoItem[] }) {
  // İkili grid yapısı - her satırda 2 bilgi
  const rows = [];
  for (let i = 0; i < info.length; i += 2) {
    rows.push(info.slice(i, i + 2));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-cols-2 divide-x divide-gray-100 
                      ${rowIndex !== 0 ? 'border-t border-gray-100' : ''}`}
        >
          {row.map((item, colIndex) => (
            <div key={colIndex} className="px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
              <p className="text-sm font-semibold text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Kullanım örneği:
// info = [
//   { label: 'Eğitim Süresi', value: 'Hazırlık + 4 Yıl' },
//   { label: 'Eğitim Dili', value: 'Almanca' },
//   { label: 'Kontenjan Türü', value: 'Kız / Erkek' },
//   { label: 'PASCH Okul Türü', value: 'DSD Okulu' },
//   { label: '2025 Yüzdelik Dilim', value: '0.20' },
//   { label: 'Güncel Kontenjan', value: '120' },
//   { label: 'Adres', value: 'Alemdar Mah. Babıâli Yokuşu Cad. No:13...' },
// ]
```

---

## 8. Charts Component

```tsx
// components/school/SchoolCharts.tsx
'use client';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

export default function SchoolCharts({ data }: { data: ChartData }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>📊</span> Yıllara Göre Grafikler
      </h2>

      {/* Üst iki grafik yan yana */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        
        {/* Yüzdelik Dilim Çizgi Grafiği */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-medium text-gray-700 text-center mb-2">
            Yüzdelik Dilim (2020-2025)
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={data.percentile}>
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2e9e5b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2e9e5b" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip
                contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2e9e5b"
                strokeWidth={2}
                fill="url(#greenGradient)"
                dot={{ fill: '#2e9e5b', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Kontenjan Bar Grafiği */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-medium text-gray-700 text-center mb-2">
            Kontenjan (2020-2025)
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data.quota}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip
                contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#2e9e5b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alt tam genişlik turuncu grafik */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs font-medium text-gray-700 text-center mb-2">
          Yurttan Gönderdiğimiz Öğrenci Adedi
        </p>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data.students}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 9 }} />
            <YAxis tick={{ fontSize: 9 }} />
            <Tooltip
              contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
            />
            <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

---

## 9. Transport Component

```tsx
// components/school/SchoolTransport.tsx
export default function SchoolTransport({ transport }: { transport: TransportData }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span>🚌</span> Ulaşım
      </h2>
      
      {/* Ulaşım bilgi kartı */}
      <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-xl">
        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm">
          🚊
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-800">{transport.duration} dk.</span>
          <span className="text-xs text-gray-500 ml-2">· her {transport.frequency} dakikada bir</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed">
        {transport.description}
      </p>
    </div>
  );
}
```

---

## 10. About Component

```tsx
// components/school/SchoolAbout.tsx
export default function SchoolAbout({ description }: { description: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span>🏛️</span> Okul ile Alakalı Diğer Bilgiler
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
```

---

## 11. Program Component

```tsx
// components/school/SchoolProgram.tsx
export default function SchoolProgram({ program }: { program: ProgramData }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span>🌍</span> PASCH / Program Bilgisi
      </h2>
      
      {/* Sol kenarlıklı bilgi kutusu */}
      <div className="border-l-4 border-[#2e9e5b] pl-4 py-1 bg-green-50/50 rounded-r-lg">
        <p className="text-sm text-gray-600 leading-relaxed">
          {program.description}
        </p>
      </div>
    </div>
  );
}
```

---

## 12. Achievements Component

```tsx
// components/school/SchoolAchievements.tsx
interface Achievement {
  id: number;
  text: string;
  icon?: string;
}

export default function SchoolAchievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span>🏆</span> Okul Başarıları
      </h2>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-start gap-3">
            {/* Rozet ikonu */}
            <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5">
              <span className="text-xl">{achievement.icon || '🏆'}</span>
            </div>
            
            {/* Başarı metni */}
            <p className="text-sm text-gray-600 leading-relaxed flex-1">
              {achievement.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 13. Contact Bar Component

```tsx
// components/school/SchoolContactBar.tsx
'use client';

interface ContactBarProps {
  whatsappNumber: string;
  phoneNumber: string;
}

export default function SchoolContactBar({ whatsappNumber, phoneNumber }: ContactBarProps) {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 
                    px-4 py-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      {/* WhatsApp Butonu */}
      <button
        onClick={handleWhatsApp}
        className="flex-1 flex items-center justify-center gap-2 
                   bg-[#f59e0b] hover:bg-[#d97706] active:bg-[#b45309]
                   text-white font-semibold text-sm py-3 rounded-xl
                   transition-colors duration-150 shadow-sm"
      >
        <span className="text-base">💬</span>
        <span>WhatsApp'tan Sor</span>
      </button>

      {/* Ara Butonu */}
      <button
        onClick={handleCall}
        className="flex-1 flex items-center justify-center gap-2
                   bg-white hover:bg-gray-50 active:bg-gray-100
                   text-gray-800 font-semibold text-sm py-3 rounded-xl
                   border-2 border-gray-200 hover:border-gray-300
                   transition-colors duration-150"
      >
        <span className="text-base">📞</span>
        <span>Hemen Ara</span>
      </button>
    </div>
  );
}
```

---

## 14. TypeScript Interface Tanımları

```tsx
// types/school.ts
export interface SchoolData {
  id: string;
  name: string;
  district: string;
  city: string;
  type: string;
  imageSrc: string;
  badges: Badge[];
  address: string;
  distance: string;
  coordinates: { lat: number; lng: number };
  info: InfoItem[];
  chartData: {
    percentile: { year: string; value: number }[];
    quota: { year: string; value: number }[];
    students: { year: string; value: number }[];
  };
  transport: {
    duration: number;
    frequency: number;
    description: string;
  };
  description: string;
  program: { title: string; description: string };
  achievements: Achievement[];
  whatsappNumber: string;
  phoneNumber: string;
}

export interface Badge {
  label: string;
  icon?: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface Achievement {
  id: number;
  text: string;
  icon?: string;
}
```

---

## 15. Tailwind Config Genişletme

```js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'school-green': {
          50: '#e8f5ee',
          100: '#c3e6d0',
          400: '#3cb371',
          500: '#2e9e5b',
          600: '#267a4a',
          700: '#1b6e3f',
          800: '#1a7a4a',
        },
        'school-orange': {
          400: '#f5a623',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      backgroundImage: {
        'school-header': 'linear-gradient(135deg, #1a7a4a 0%, #2a9d5c 100%)',
      },
      boxShadow: {
        'contact-bar': '0 -4px 20px rgba(0, 0, 0, 0.08)',
      }
    }
  },
  plugins: [],
};
```

---

## 16. Gerekli Paketler

```bash
# Recharts - grafik kütüphanesi
npm install recharts

# Leaflet veya Google Maps (harita için)
npm install leaflet react-leaflet
# veya
npm install @vis.gl/react-google-maps

# Framer Motion (modal animasyonu için)
npm install framer-motion

# Lucide Icons
npm install lucide-react
```

---

## 17. Responsive Notlar

```
- Modal: max-w-md (448px) - mobil öncelikli tasarım
- Fotoğraf + Harita: grid-cols-2 → mobilde aynı kalır (küçük ekranlar için h-36)
- Grafik grid: grid-cols-2 → sm altında grid-cols-1
- Badge'ler: flex-wrap ile otomatik sarma
- İletişim çubuğu: her zaman absolute bottom-0, flex gap-3
- Scroll: overflow-y-auto ile modal içi scroll, dışarı overflow hidden
- Font boyutları: xs(12px), sm(14px), base(16px), 2xl(24px)
```