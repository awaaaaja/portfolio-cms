alter table public.profiles add column if not exists about_bio text;

create table if not exists public.certifications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  issuer text not null,
  issued_at date,
  credential_url text,
  image_url text,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.publications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  publisher text,
  published_at date,
  publication_url text,
  cover_url text,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  affiliation text,
  role text,
  photo_url text,
  quote text not null,
  status text not null default 'pending' check (status in ('pending', 'published', 'archived')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.certifications enable row level security;
alter table public.publications enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "Public can read certifications" on public.certifications;
create policy "Public can read certifications" on public.certifications for select using (true);
drop policy if exists "Public can read publications" on public.publications;
create policy "Public can read publications" on public.publications for select using (true);
drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials" on public.testimonials for select using (status = 'published');
drop policy if exists "Public can submit testimonials" on public.testimonials;
create policy "Public can submit testimonials" on public.testimonials for insert with check (status = 'pending');

drop policy if exists "Authenticated admin CRUD certifications" on public.certifications;
create policy "Authenticated admin CRUD certifications" on public.certifications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated admin CRUD publications" on public.publications;
create policy "Authenticated admin CRUD publications" on public.publications for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Authenticated admin CRUD testimonials" on public.testimonials;
create policy "Authenticated admin CRUD testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "Public upload testimonial photos" on storage.objects;
create policy "Public upload testimonial photos" on storage.objects for insert with check (
  bucket_id = 'portfolio' and (storage.foldername(name))[1] = 'testimonials'
);

update public.profiles
set
  name = 'Haikal Fatwa Rachmansyah',
  about_bio = coalesce(about_bio, 'Saya adalah mahasiswa Sistem Informasi yang berfokus pada pengembangan aplikasi, analisis data, dan perancangan pengalaman digital. Saya menikmati proses menerjemahkan kebutuhan nyata menjadi sistem yang terstruktur, mudah digunakan, dan memiliki dampak.')
where id = (select id from public.profiles order by created_at asc limit 1);

update public.site_settings
set
  site_title = 'Haikal Fatwa Rachmansyah',
  logo_text = 'HFR',
  hero_title = 'Hi, I am Haikal.'
where id = (select id from public.site_settings order by created_at asc limit 1);

insert into public.certifications (title, issuer, issued_at, description, sort_order)
select 'Web Development Fundamentals', 'Professional Learning Platform', '2025-01-15', 'Foundational certification covering modern web development practices.', 1
where not exists (select 1 from public.certifications);

insert into public.publications (title, publisher, published_at, description, sort_order)
select 'Designing Useful Information Systems', 'Academic Project', '2025-06-01', 'A practical publication about translating organizational needs into usable information systems.', 1
where not exists (select 1 from public.publications);

insert into public.testimonials (name, affiliation, role, quote, status, sort_order)
select 'Project Collaborator', 'University Organization', 'Team Member', 'Haikal bekerja dengan terstruktur, komunikatif, dan selalu memperhatikan kualitas detail dari hasil akhir.', 'published', 1
where not exists (select 1 from public.testimonials);
