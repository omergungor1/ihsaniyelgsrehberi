-- İhsaniye LGS Rehberi — Supabase şema
-- Public SELECT (aktif kayıtlar), authenticated INSERT/UPDATE/DELETE

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Site ayarları (singleton satırlar: hero, contact, map)
-- ---------------------------------------------------------------------------
create table public.site_settings (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Okullar
-- ---------------------------------------------------------------------------
create table public.schools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  district text,
  city text default 'İstanbul',
  school_type text default 'Anadolu',
  rank int,
  rank_label text,
  language text,
  education text,
  education_full text,
  kontenjan int,
  yuzdelik numeric(10, 4),
  address text,
  distance_km numeric(8, 2),
  distance_label text,
  lat double precision,
  lng double precision,
  map_link text,
  image_url text,
  description text,
  program_title text,
  program_description text,
  kontenjan_turu text,
  pasch_okul_turu text,
  transport_duration int,
  transport_frequency int,
  transport_walk text,
  transport_tram text,
  transport_bus text,
  transport_car text,
  transport_description text,
  whatsapp_number text,
  phone_number text,
  tags jsonb not null default '[]'::jsonb,
  badges jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index schools_active_sort_idx on public.schools (is_active, sort_order, yuzdelik);

create trigger schools_updated_at
  before update on public.schools
  for each row execute function public.set_updated_at();

-- Yıllık yüzdelik / kontenjan
create table public.school_yearly_stats (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  year int not null,
  percentile numeric(10, 4),
  quota int,
  unique (school_id, year)
);

create index school_yearly_stats_school_idx on public.school_yearly_stats (school_id, year);

-- Okul başarıları
create table public.school_achievements (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  icon text default '🏆',
  text text not null,
  sort_order int not null default 0
);

create index school_achievements_school_idx on public.school_achievements (school_id, sort_order);

-- ---------------------------------------------------------------------------
-- Tercih takvimi
-- ---------------------------------------------------------------------------
create table public.calendar_items (
  id uuid primary key default gen_random_uuid(),
  icon text default '📋',
  title text not null,
  date_label text not null,
  description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger calendar_items_updated_at
  before update on public.calendar_items
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- YKS başarıları
-- ---------------------------------------------------------------------------
create table public.yks_section (
  id int primary key default 1 check (id = 1),
  badge text default '2025 YKS',
  title text default 'YKS Başarılarımız',
  subtitle text,
  updated_at timestamptz not null default now()
);

create trigger yks_section_updated_at
  before update on public.yks_section
  for each row execute function public.set_updated_at();

create table public.yks_stats (
  id uuid primary key default gen_random_uuid(),
  icon text default '🏆',
  value text not null,
  label text not null,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.yks_graduates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  university text not null,
  department text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table public.yks_highlights (
  id uuid primary key default gen_random_uuid(),
  track text not null,
  result text not null,
  sort_order int not null default 0,
  is_active boolean not null default true
);

-- ---------------------------------------------------------------------------
-- Yorumlar (ad/soyad ilk harf)
-- ---------------------------------------------------------------------------
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  first_initial text not null,
  last_initial text not null,
  review_type text not null check (review_type in ('ogrenci', 'mezun')),
  comment text not null,
  school_name text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.schools enable row level security;
alter table public.school_yearly_stats enable row level security;
alter table public.school_achievements enable row level security;
alter table public.calendar_items enable row level security;
alter table public.yks_section enable row level security;
alter table public.yks_stats enable row level security;
alter table public.yks_graduates enable row level security;
alter table public.yks_highlights enable row level security;
alter table public.reviews enable row level security;

-- Public read
create policy "Public read site_settings"
  on public.site_settings for select to anon, authenticated
  using (true);

create policy "Public read active schools"
  on public.schools for select to anon, authenticated
  using (is_active = true or auth.uid() is not null);

create policy "Public read school_yearly_stats"
  on public.school_yearly_stats for select to anon, authenticated
  using (
    exists (
      select 1 from public.schools s
      where s.id = school_id and (s.is_active = true or auth.uid() is not null)
    )
  );

create policy "Public read school_achievements"
  on public.school_achievements for select to anon, authenticated
  using (
    exists (
      select 1 from public.schools s
      where s.id = school_id and (s.is_active = true or auth.uid() is not null)
    )
  );

create policy "Public read active calendar"
  on public.calendar_items for select to anon, authenticated
  using (is_active = true or auth.uid() is not null);

create policy "Public read yks_section"
  on public.yks_section for select to anon, authenticated
  using (true);

create policy "Public read active yks_stats"
  on public.yks_stats for select to anon, authenticated
  using (is_active = true or auth.uid() is not null);

create policy "Public read active yks_graduates"
  on public.yks_graduates for select to anon, authenticated
  using (is_active = true or auth.uid() is not null);

create policy "Public read active yks_highlights"
  on public.yks_highlights for select to anon, authenticated
  using (is_active = true or auth.uid() is not null);

create policy "Public read active reviews"
  on public.reviews for select to anon, authenticated
  using (is_active = true or auth.uid() is not null);

-- Authenticated write (admin)
create policy "Auth manage site_settings"
  on public.site_settings for all to authenticated
  using (true) with check (true);

create policy "Auth manage schools"
  on public.schools for all to authenticated
  using (true) with check (true);

create policy "Auth manage school_yearly_stats"
  on public.school_yearly_stats for all to authenticated
  using (true) with check (true);

create policy "Auth manage school_achievements"
  on public.school_achievements for all to authenticated
  using (true) with check (true);

create policy "Auth manage calendar_items"
  on public.calendar_items for all to authenticated
  using (true) with check (true);

create policy "Auth manage yks_section"
  on public.yks_section for all to authenticated
  using (true) with check (true);

create policy "Auth manage yks_stats"
  on public.yks_stats for all to authenticated
  using (true) with check (true);

create policy "Auth manage yks_graduates"
  on public.yks_graduates for all to authenticated
  using (true) with check (true);

create policy "Auth manage yks_highlights"
  on public.yks_highlights for all to authenticated
  using (true) with check (true);

create policy "Auth manage reviews"
  on public.reviews for all to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage: media bucket (max 3MB)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  3145728,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public read media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

create policy "Auth upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and coalesce((metadata->>'size')::bigint, 0) <= 3145728);

create policy "Auth update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

create policy "Auth delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');

-- ---------------------------------------------------------------------------
-- Grants (Data API)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
