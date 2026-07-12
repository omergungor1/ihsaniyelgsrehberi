Benim için bir Single Page Application bir site yazmama yardım et. 

colors: {
  primary: "#042352",
  "primary-hover": "#124DA6",
  secondary: "#465367",
  accent: "#2B6FD6",
  background: "#F2F4F9",
  surface: "#FFFFFF",
  border: "#D6DFEC",
  muted: "#727F94",
}

Tüm projede bu renk paletini güncelle, bu renk paletini uygulayalım.



Ayrıca statik kısımları dinamik çevirelim. Veri tabanı bilgisini .env.local içine ekledim. Eklediğim değişkenler şunlar:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_ANON_KEY

@db.sql Şimdi veri tabanını planlayalım. Gerekli kısımları dinamik yapmamız gerekiyor. @lib/data/schools.js:10 @lib/data/schools.js:1 okulları ve tüm görselleri dosya yükleme ile dinamik yapacağız. Supabase psql tablo, admin panel için supa auth ve görseller için (okul görseli, yurt görseli vs) supabase storage kullanacağız. Eklediğimiz tablolara sadece login olan kullanıcılar değişiklik yapabilir, silebilir vs. tablolara RLS açalım ve ilgili kuralları ekleyelim. Auth olan kullanıcı görsel yükleyebilir, görsel max limit 3mb olmalıdır. 

Bir de admin panel ekleyelim. Yeni kayıt olamyacak sadece login. Login olan kullanıcı tüm dinamik kısımları, görseleri, okul listesini vs güncelleyebilmelidir. 

Oluşturduğun tablolara mock data ekle, site boş durmasın. Sana Supabae MCP bağlantını yaptım. npx skills add supabase/agent-skills -> bununla supabase skills lerini ekledim. Sen doğruca supabase de komut çalıştırabilirsin. 


Bazı kısımlar statik kalabilir. Onları koddan güncelleriz. Her yerin dinamik olmasına gerek yok. 

Dinamik çevirmemiz gereken kısımlar: 
@components/sections/HeroSection.js:97-104 -> görsel admin panelden değiştirilebilmelidir. 
Nitelikli Liseler kısmı: @components/sections/QualifiedSchoolsSection.js:131-133  -> tüm okul listesi gündellenebilir olmalıdır.  @lib/data/schools.js:9-10  -> okul için gerekli olan tüm bilgileri tabloda tutalım, admin panelden güncellenebilir olsun. Okul pasife alınabilir olsun. Pasif ise gelmesi listeye.

Bir okul için şu bilgileri girebilirim, aklıma gelmeyen tüm alanları sen oluştur ben panelden eklerim: Harita görünümü için link, Yurttan yaklaşık xxx km, Yol tarifi: toplu taşıma, Araçla, Yürüyerek vs. Eğitim süresi, Eğitim dili vsç Yıllara göre grafikler için eski yıllara göre kayıt ekleme: yüzdelik dilim: 2020, 2021, 2023, 2024, 2025 gibi vs... Kontenjan yıllara göre vs.  Okul detay kartında şöyle bir alan var: Yurttan Gönderdiğimiz Öğrenci Adedi *-> @components/school/SchoolCharts.js:67-68  bu alanı silelim gerek yok gönderilen öğrenci adedine. Okul ile ilgili bilgiler, program bilgisi, Okul başarıları vs. Eğer o kısım için daat yoksa kullanıcı girmediyse mesela: Okul başarısı hiç girilmedi: okul başarıları kısmı hiç gözükmesin. Bilgi varsa gözüksün. 

@components/sections/SchoolsMapSection.js:55-68  -> bu kısım tamamen dinamik ve admin panelden güncellenebilir olsun. 


@components/sections/PreferenceRobotSection.js:88-99  -> tercih robot kısmına filtre kısmıne ek %7 dilimini de ekleyelim. Oradaki hesaplama tamamen dinamik olmalı ve ilgili okul için dorğu hesap yapmalıdır. 

@components/sections/PreferenceCalendarSection.js:54-56  -> maddeler dinamik olsun, admin panelden güncellenebilsin. 

@components/sections/YKSSuccessSection.js:81-86  -> yks başarılarımız kısmı tamamen dinamik olmalıdır ve eğer hiç data girilmemişse bu alana sitede bu kısım gözükmesin.


@components/sections/StudentReviewsSection.js:133-138  -> yorumlar kısmı tamamen dinamik olmalıdır. Sadece yorum yazan ad ve soyad ilk harf girilecek, türü:mezun, öğrenci ve yorum girilecektir. Tamamen dinamik olsun. Yorumu pasife alma da ekleyelim. 



İletişim kısmı @components/sections/ContactSection.js:45-53  dinamik olsun. 
@lib/data/contact.js:1-15  -> bu data da tamamen dinamik olsun. 


Gerekn tüm alanları dinamik yap ve kod yazmadan güncellenebilsin site admın panelden. Gerekli  güncellemeleri yapalım.