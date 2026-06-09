# Animated Developer Portfolio CMS

Modern animated developer portfolio and Supabase-backed admin panel built with Next.js App Router, TypeScript, Tailwind CSS, Motion, Lenis, and shadcn-style UI primitives.

## Features

- Animated responsive public portfolio with hero photo, typing roles, smooth scroll, custom desktop cursor, reveal animations, project tilt cards, and tech marquee.
- Public pages fetch real data from Supabase.
- Protected `/admin` panel using Supabase Auth plus an explicit `admin_users` allowlist.
- Admin CRUD for profile, projects, skills, experiences, educations, certifications, publications, testimonials, blogs, messages, and settings.
- Supabase Storage uploads with admin-only management and restricted public testimonial photo uploads.
- SQL schema, RLS policies, migrations, realistic seed data, and Vercel configuration included.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Only public Supabase values are used. Never add `SUPABASE_SERVICE_ROLE_KEY` to this app or expose it in a `NEXT_PUBLIC_` variable.

## New Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`, `supabase/rls.sql`, then `supabase/seed.sql` in the SQL editor.
3. Create your owner account from Authentication > Users > Add user.
4. Run `supabase/production_hardening.sql` after the owner account exists.
5. Disable public user signups from Authentication > Providers > Email.

The schema creates the public `portfolio` bucket. Public reads are allowed, management is admin-only, and testimonial photo uploads accept only JPG/PNG/WebP files up to 5 MB.

## Existing Installation Upgrade

Run these files in order:

```text
supabase/migration_content_sections.sql
supabase/production_hardening.sql
supabase/migration_about_gallery_credentials.sql
```

`production_hardening.sql` adds existing Auth users to `admin_users` once. Accounts created afterward do not automatically become admins.

`migration_about_gallery_credentials.sql` enables the multi-photo About slideshow and publication DOI field.

## Admin Panel

- Login directly at `/admin/login`; no admin link is shown publicly.
- Update the hero/profile photo at `/admin/profile`.
- Manage the rotating About photos at `/admin/profile`.
- Certification and publication items may contain an uploaded photo, an external link/DOI, or only a photo.
- Skills with `is_marquee = true` power the About tech marquee.
- Public testimonial submissions enter as `pending` and require approval at `/admin/testimonials`.

## Database Tables

`admin_users`, `profiles`, `projects`, `project_images`, `project_tech_stacks`, `skills`, `experiences`, `educations`, `certifications`, `publications`, `testimonials`, `blogs`, `contact_messages`, and `site_settings`.

## Deploy To Vercel

1. Push this project to GitHub and import it into Vercel.
2. Add the three public environment variables above.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production URL.
4. Deploy using `npm run build`.
5. In Supabase Authentication > URL Configuration, set Site URL and Redirect URLs to the final Vercel/custom-domain URL.

## Verification

```bash
npm run build
```

Next.js may show non-blocking lint warnings for plain `<img>` tags used for Supabase/user-uploaded images.
