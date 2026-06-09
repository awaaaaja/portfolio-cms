alter table public.admin_users enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.project_tech_stacks enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.educations enable row level security;
alter table public.certifications enable row level security;
alter table public.publications enable row level security;
alter table public.testimonials enable row level security;
alter table public.blogs enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

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

create policy "Admins can read own membership" on public.admin_users
for select to authenticated using (auth.uid() = user_id);

create policy "Public can read profiles" on public.profiles for select using (true);
create policy "Public can read skills" on public.skills for select using (true);
create policy "Public can read experiences" on public.experiences for select using (true);
create policy "Public can read educations" on public.educations for select using (true);
create policy "Public can read certifications" on public.certifications for select using (true);
create policy "Public can read publications" on public.publications for select using (true);
create policy "Public can read published testimonials" on public.testimonials for select using (status = 'published');
create policy "Public can submit testimonials" on public.testimonials for insert with check (status = 'pending');
create policy "Public can read site settings" on public.site_settings for select using (true);

create policy "Public can read published projects" on public.projects for select using (status = 'published');
create policy "Public can read published project images" on public.project_images for select using (
  exists (select 1 from public.projects p where p.id = project_id and p.status = 'published')
);
create policy "Public can read published project tech" on public.project_tech_stacks for select using (
  exists (select 1 from public.projects p where p.id = project_id and p.status = 'published')
);
create policy "Public can read published blogs" on public.blogs for select using (status = 'published');
create policy "Public can insert contact messages" on public.contact_messages for insert with check (true);

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

create policy "Public read portfolio storage" on storage.objects for select using (bucket_id = 'portfolio');
create policy "Authenticated upload portfolio storage" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio' and public.is_admin());
create policy "Authenticated update portfolio storage" on storage.objects for update to authenticated using (bucket_id = 'portfolio' and public.is_admin()) with check (bucket_id = 'portfolio' and public.is_admin());
create policy "Authenticated delete portfolio storage" on storage.objects for delete to authenticated using (bucket_id = 'portfolio' and public.is_admin());
create policy "Public upload testimonial photos" on storage.objects for insert with check (
  bucket_id = 'portfolio'
  and (storage.foldername(name))[1] = 'testimonials'
  and lower(storage.extension(name)) = any (array['jpg', 'jpeg', 'png', 'webp'])
  and coalesce((metadata ->> 'size')::bigint, 0) <= 5242880
);
