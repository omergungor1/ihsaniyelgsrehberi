# Tamamlanan güncellemeler (todo.md)

## Yapıldı
- [x] Mavi renk paleti site geneline uygulandı
- [x] Supabase şema + RLS + Storage (`media`, 3MB) + mock data
- [x] Hero görseli dinamik (`site_settings.hero`)
- [x] Okul listesi dinamik (pasif okullar listede yok)
- [x] Harita bölümü dinamik
- [x] Tercih robotu dinamik + %7 hızlı filtre
- [x] Takvim dinamik
- [x] YKS dinamik (boşsa gizlenir)
- [x] Yorumlar dinamik (pasife alma destekli)
- [x] İletişim dinamik
- [x] Okul başarıları / program / açıklama yoksa gizlenir
- [x] Öğrenci adedi grafiği kaldırıldı
- [x] Admin panel (login-only): `/admin`

## Admin erişimi
1. Supabase Dashboard → Authentication → Users → Create user
2. `/admin/login` ile giriş yap
3. Okul, hero, harita, iletişim, takvim, YKS, yorumları yönet

## Not
Kayıt (signup) yok; kullanıcılar yalnızca Supabase Auth’tan oluşturulur.
