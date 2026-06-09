-- Run this after schema.sql, rls.sql, seed.sql, and migration_content_sections.sql.
-- Existing Auth users are promoted once so the current owner is not locked out.
-- Future Auth users will not receive admin access automatically.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

insert into public.admin_users (user_id, email)
select id, email from auth.users
on conflict (user_id) do update set email = excluded.email;

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Admins can read own membership" on public.admin_users;
create policy "Admins can read own membership" on public.admin_users
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Authenticated admin CRUD profiles" on public.profiles;
drop policy if exists "Authenticated admin CRUD projects" on public.projects;
drop policy if exists "Authenticated admin CRUD project images" on public.project_images;
drop policy if exists "Authenticated admin CRUD project tech" on public.project_tech_stacks;
drop policy if exists "Authenticated admin CRUD skills" on public.skills;
drop policy if exists "Authenticated admin CRUD experiences" on public.experiences;
drop policy if exists "Authenticated admin CRUD educations" on public.educations;
drop policy if exists "Authenticated admin CRUD certifications" on public.certifications;
drop policy if exists "Authenticated admin CRUD publications" on public.publications;
drop policy if exists "Authenticated admin CRUD testimonials" on public.testimonials;
drop policy if exists "Authenticated admin CRUD blogs" on public.blogs;
drop policy if exists "Authenticated admin CRUD messages" on public.contact_messages;
drop policy if exists "Authenticated admin CRUD settings" on public.site_settings;

create policy "Authenticated admin CRUD profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD project images" on public.project_images for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD project tech" on public.project_tech_stacks for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD skills" on public.skills for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD experiences" on public.experiences for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD educations" on public.educations for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD certifications" on public.certifications for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD publications" on public.publications for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD testimonials" on public.testimonials for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD blogs" on public.blogs for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD messages" on public.contact_messages for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Authenticated admin CRUD settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authenticated upload portfolio storage" on storage.objects;
drop policy if exists "Authenticated update portfolio storage" on storage.objects;
drop policy if exists "Authenticated delete portfolio storage" on storage.objects;
drop policy if exists "Public upload testimonial photos" on storage.objects;

create policy "Authenticated upload portfolio storage" on storage.objects
for insert to authenticated with check (bucket_id = 'portfolio' and public.is_admin());
create policy "Authenticated update portfolio storage" on storage.objects
for update to authenticated using (bucket_id = 'portfolio' and public.is_admin())
with check (bucket_id = 'portfolio' and public.is_admin());
create policy "Authenticated delete portfolio storage" on storage.objects
for delete to authenticated using (bucket_id = 'portfolio' and public.is_admin());
create policy "Public upload testimonial photos" on storage.objects
for insert with check (
  bucket_id = 'portfolio'
  and (storage.foldername(name))[1] = 'testimonials'
  and lower(storage.extension(name)) = any (array['jpg', 'jpeg', 'png', 'webp'])
  and coalesce((metadata ->> 'size')::bigint, 0) <= 5242880
);

alter table public.testimonials
  drop constraint if exists testimonials_name_length,
  drop constraint if exists testimonials_affiliation_length,
  drop constraint if exists testimonials_role_length,
  drop constraint if exists testimonials_quote_length;

alter table public.testimonials
  add constraint testimonials_name_length check (char_length(name) between 2 and 100),
  add constraint testimonials_affiliation_length check (char_length(coalesce(affiliation, '')) <= 160),
  add constraint testimonials_role_length check (char_length(coalesce(role, '')) <= 120),
  add constraint testimonials_quote_length check (char_length(quote) between 10 and 1000);
