insert into public.profiles (id, name, role, headline, bio, about_bio, avatar_url, hero_photo_url, about_photo_urls, hero_roles, email, phone, location, cv_url, github_url, linkedin_url, instagram_url)
values (
  '11111111-1111-1111-1111-111111111111',
  'Haikal Fatwa Rachmansyah',
  'Fullstack Developer',
  'I build modern web apps and interactive dashboards.',
  'Saya membangun aplikasi web modern, admin dashboard, sistem informasi, dan visualisasi data dengan UI yang interaktif, performa yang baik, serta struktur kode yang rapi.',
  'Saya adalah mahasiswa Sistem Informasi yang berfokus pada pengembangan aplikasi, analisis data, dan perancangan pengalaman digital. Saya menikmati proses menerjemahkan kebutuhan nyata menjadi sistem yang terstruktur, mudah digunakan, dan memiliki dampak.',
  '',
  '',
  array[]::text[],
  array['Fullstack Developer','Data Analyst','Web Developer','UI Engineer','Mobile Developer','Admin Dashboard Builder','Information System Developer'],
  'hello@example.com',
  '+62 812 0000 0000',
  'Indonesia',
  '',
  'https://github.com',
  'https://linkedin.com',
  'https://instagram.com'
) on conflict (id) do update set name = excluded.name;

insert into public.site_settings (id, site_title, site_description, logo_text, accent_color, hero_title, hero_subtitle, maintenance_mode)
values (
  '22222222-2222-2222-2222-222222222222',
  'Haikal Fatwa Rachmansyah',
  'Modern developer portfolio powered by Supabase.',
  'HFR.DEV',
  '#22D3EE',
  'Hi, I am Haikal.',
  'I build digital products with modern code.',
  false
) on conflict (id) do update set site_title = excluded.site_title;

insert into public.skills (id, name, category, level, icon_key, is_marquee, sort_order) values
('30000000-0000-0000-0000-000000000001','JavaScript','Frontend',90,'javascript',true,1),
('30000000-0000-0000-0000-000000000002','TypeScript','Frontend',88,'typescript',true,2),
('30000000-0000-0000-0000-000000000003','React','Frontend',92,'react',true,3),
('30000000-0000-0000-0000-000000000004','Next.js','Frontend',91,'nextjs',true,4),
('30000000-0000-0000-0000-000000000005','Tailwind CSS','Design',94,'tailwind',true,5),
('30000000-0000-0000-0000-000000000006','Node.js','Backend',85,'nodejs',true,6),
('30000000-0000-0000-0000-000000000007','Supabase','Backend',86,'supabase',true,7),
('30000000-0000-0000-0000-000000000008','PostgreSQL','Database',84,'postgresql',true,8),
('30000000-0000-0000-0000-000000000009','Figma','Design',80,'figma',true,9),
('30000000-0000-0000-0000-000000000010','Docker','Tools',72,'docker',true,10)
on conflict (id) do update set name = excluded.name;

insert into public.projects (id, title, slug, short_description, description, thumbnail_url, demo_url, github_url, category, status, is_featured, sort_order) values
('40000000-0000-0000-0000-000000000001','Analytics Admin Dashboard','analytics-admin-dashboard','Realtime metrics dashboard for operational teams.','A production-minded admin dashboard with clean CRUD workflows, KPI cards, project modules, and Supabase-backed data access.','','https://example.com','https://github.com','Dashboard','published',true,1),
('40000000-0000-0000-0000-000000000002','Portfolio CMS','portfolio-cms','Animated portfolio website with a lightweight admin CMS.','A dark futuristic developer portfolio featuring smooth scroll, custom cursor, animated sections, Supabase CRUD, Storage uploads, and Vercel-ready deployment.','','https://example.com','https://github.com','Web App','published',true,2),
('40000000-0000-0000-0000-000000000003','Data Insight Portal','data-insight-portal','Data analysis portal for reports and visualization workflows.','An information system interface for exploring datasets, saving reports, and presenting analysis to stakeholders.','','https://example.com','https://github.com','Data','published',false,3)
on conflict (id) do update set title = excluded.title;

insert into public.project_tech_stacks (project_id, name, icon_key, sort_order) values
('40000000-0000-0000-0000-000000000001','Next.js','nextjs',1),
('40000000-0000-0000-0000-000000000001','Supabase','supabase',2),
('40000000-0000-0000-0000-000000000001','PostgreSQL','postgresql',3),
('40000000-0000-0000-0000-000000000002','TypeScript','typescript',1),
('40000000-0000-0000-0000-000000000002','Tailwind CSS','tailwind',2),
('40000000-0000-0000-0000-000000000002','React','react',3),
('40000000-0000-0000-0000-000000000003','React','react',1),
('40000000-0000-0000-0000-000000000003','Node.js','nodejs',2);

insert into public.experiences (id, position, company, start_date, end_date, is_current, description, sort_order) values
('50000000-0000-0000-0000-000000000001','Fullstack Developer','Independent Projects','2023-01-01',null,true,'Building web apps, admin dashboards, data tools, and production-ready UI systems.',1),
('50000000-0000-0000-0000-000000000002','Data Analyst Intern','Data Lab','2022-03-01','2022-12-31',false,'Prepared dashboards, cleaned datasets, and translated analysis into visual reports.',2)
on conflict (id) do update set position = excluded.position;

insert into public.educations (id, institution, major, start_year, end_year, description, sort_order) values
('60000000-0000-0000-0000-000000000001','Information Systems Program','Information Systems',2020,2024,'Focused on databases, software engineering, business processes, and data analytics.',1)
on conflict (id) do update set institution = excluded.institution;

insert into public.blogs (id, title, slug, excerpt, content, cover_url, category, status, seo_title, seo_description) values
('70000000-0000-0000-0000-000000000001','Building a Portfolio That Works Like a Product','building-a-portfolio-that-works-like-a-product','How to combine animations, CMS data, and admin workflows without losing maintainability.','## Product-minded portfolio

A strong developer portfolio is more than a gallery. It should communicate craft, technical depth, and the ability to maintain real systems.

- Keep public pages fast and expressive
- Keep admin pages focused and predictable
- Make content editable without redeploying','','Engineering','published','Building a Portfolio That Works Like a Product','Portfolio CMS notes.')
on conflict (id) do update set title = excluded.title;

insert into public.contact_messages (name, email, subject, message, status) values
('Demo Client','client@example.com','Dashboard collaboration','I would like to discuss an admin dashboard for my business workflow.','unread');

insert into public.certifications (title, issuer, issued_at, credential_url, description, sort_order) values
('Web Development Fundamentals','Professional Learning Platform','2025-01-15','#','Foundational certification covering modern web development practices.',1);

insert into public.publications (title, publisher, published_at, publication_url, description, sort_order) values
('Designing Useful Information Systems','Academic Project','2025-06-01','#','A practical publication about translating organizational needs into usable information systems.',1);

insert into public.testimonials (name, affiliation, role, quote, status, sort_order) values
('Project Collaborator','University Organization','Team Member','Haikal bekerja dengan terstruktur, komunikatif, dan selalu memperhatikan kualitas detail dari hasil akhir.','published',1);
