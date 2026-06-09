-- Run once on an existing installation to enable the About photo slideshow
-- and DOI support for publications.

alter table public.profiles
  add column if not exists about_photo_urls text[] default array[]::text[];

alter table public.publications
  add column if not exists doi text;

update public.profiles
set about_photo_urls = array_remove(array_remove(array[avatar_url, hero_photo_url], null), '')
where coalesce(array_length(about_photo_urls, 1), 0) = 0
  and (nullif(avatar_url, '') is not null or nullif(hero_photo_url, '') is not null);
