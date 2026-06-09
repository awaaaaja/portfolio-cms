create extension if not exists "uuid-ossp";

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  headline text,
  bio text,
  about_bio text,
  avatar_url text,
  hero_photo_url text,
  hero_roles text[] default array[]::text[],
  email text,
  phone text,
  location text,
  cv_url text,
  github_url text,
  linkedin_url text,
  instagram_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  thumbnail_url text,
  demo_url text,
  github_url text,
  category text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.project_tech_stacks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  icon_key text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text,
  level int not null default 80 check (level between 0 and 100),
  icon_key text,
  is_marquee boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default uuid_generate_v4(),
  position text not null,
  company text not null,
  start_date date not null,
  end_date date,
  is_current boolean not null default false,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.educations (
  id uuid primary key default uuid_generate_v4(),
  institution text not null,
  major text,
  start_year int,
  end_year int,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create table if not exists public.blogs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_url text,
  category text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read', 'replied')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  site_title text not null default 'Developer Portfolio',
  site_description text,
  logo_text text,
  accent_color text default '#22D3EE',
  hero_title text,
  hero_subtitle text,
  maintenance_mode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_status_sort_idx on public.projects(status, sort_order);
create index if not exists blogs_status_created_idx on public.blogs(status, created_at desc);
create index if not exists skills_marquee_sort_idx on public.skills(is_marquee, sort_order);
create index if not exists messages_status_created_idx on public.contact_messages(status, created_at desc);

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;
