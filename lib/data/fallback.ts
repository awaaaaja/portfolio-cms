import { defaultRoles } from "@/lib/utils";
import type { Blog, Certification, Education, Experience, Profile, ProjectWithRelations, Publication, SiteSettings, Skill, Testimonial } from "@/types/database";

const now = new Date().toISOString();

export const fallbackProfile: Profile = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Haikal Fatwa Rachmansyah",
  role: "Fullstack Developer",
  headline: "I build modern web apps and interactive dashboards.",
  bio: "Saya membangun aplikasi web modern, admin dashboard, sistem informasi, dan visualisasi data dengan UI yang interaktif, performa yang baik, serta struktur kode yang rapi.",
  about_bio: "Saya adalah mahasiswa Sistem Informasi yang berfokus pada pengembangan aplikasi, analisis data, dan perancangan pengalaman digital. Saya menikmati proses menerjemahkan kebutuhan nyata menjadi sistem yang terstruktur, mudah digunakan, dan memiliki dampak.",
  avatar_url: null,
  hero_photo_url: null,
  about_photo_urls: [],
  hero_roles: defaultRoles,
  email: "hello@example.com",
  phone: "+62 812 0000 0000",
  location: "Indonesia",
  cv_url: "#",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  instagram_url: "https://instagram.com",
  created_at: now,
  updated_at: now
};

export const fallbackSettings: SiteSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  site_title: "Haikal Fatwa Rachmansyah",
  site_description: "Modern portfolio for fullstack apps, dashboards, and data products.",
  logo_text: "HFR",
  accent_color: "#22D3EE",
  hero_title: "Hi, I am Haikal.",
  hero_subtitle: "I build digital products with modern code.",
  maintenance_mode: false,
  created_at: now,
  updated_at: now
};

export const fallbackSkills: Skill[] = [
  { id: "s1", name: "Next.js", category: "Frontend", level: 92, icon_key: "nextjs", is_marquee: true, sort_order: 1, created_at: now, updated_at: now },
  { id: "s2", name: "TypeScript", category: "Frontend", level: 90, icon_key: "typescript", is_marquee: true, sort_order: 2, created_at: now, updated_at: now },
  { id: "s3", name: "Supabase", category: "Backend", level: 86, icon_key: "supabase", is_marquee: true, sort_order: 3, created_at: now, updated_at: now },
  { id: "s4", name: "PostgreSQL", category: "Database", level: 84, icon_key: "postgresql", is_marquee: true, sort_order: 4, created_at: now, updated_at: now },
  { id: "s5", name: "Tailwind CSS", category: "Design", level: 94, icon_key: "tailwind", is_marquee: true, sort_order: 5, created_at: now, updated_at: now },
  { id: "s6", name: "React", category: "Frontend", level: 92, icon_key: "react", is_marquee: true, sort_order: 6, created_at: now, updated_at: now }
];

export const fallbackExperiences: Experience[] = [
  {
    id: "e1",
    position: "Fullstack Developer",
    company: "Independent Projects",
    start_date: "2023-01-01",
    end_date: null,
    is_current: true,
    description: "Building portfolio systems, admin dashboards, data tools, and responsive web apps.",
    sort_order: 1,
    created_at: now,
    updated_at: now
  }
];

export const fallbackEducations: Education[] = [
  {
    id: "ed1",
    institution: "Information Systems Program",
    major: "Information Systems",
    start_year: 2020,
    end_year: 2024,
    description: "Focused on software engineering, databases, analytics, and system design.",
    sort_order: 1,
    created_at: now,
    updated_at: now
  }
];

export const fallbackProjects: ProjectWithRelations[] = [
  {
    id: "p1",
    title: "Analytics Admin Dashboard",
    slug: "analytics-admin-dashboard",
    short_description: "A realtime dashboard for business metrics, CRUD workflows, and role-based admin operations.",
    description: "A complete analytics dashboard with clean data cards, charts-ready structure, project modules, and Supabase-backed content management.",
    thumbnail_url: null,
    demo_url: "#",
    github_url: "#",
    category: "Dashboard",
    status: "published",
    is_featured: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
    project_images: [],
    project_tech_stacks: [
      { id: "pt1", project_id: "p1", name: "Next.js", icon_key: "nextjs", sort_order: 1 },
      { id: "pt2", project_id: "p1", name: "Supabase", icon_key: "supabase", sort_order: 2 }
    ]
  },
  {
    id: "p2",
    title: "Portfolio CMS",
    slug: "portfolio-cms",
    short_description: "Animated developer portfolio with admin CRUD and Supabase Storage uploads.",
    description: "A premium dark portfolio system with public animated pages and a lightweight admin panel.",
    thumbnail_url: null,
    demo_url: "#",
    github_url: "#",
    category: "Web App",
    status: "published",
    is_featured: true,
    sort_order: 2,
    created_at: now,
    updated_at: now,
    project_images: [],
    project_tech_stacks: [
      { id: "pt3", project_id: "p2", name: "TypeScript", icon_key: "typescript", sort_order: 1 },
      { id: "pt4", project_id: "p2", name: "Tailwind", icon_key: "tailwind", sort_order: 2 }
    ]
  }
];

export const fallbackBlogs: Blog[] = [
  {
    id: "b1",
    title: "Building a Portfolio That Works Like a Product",
    slug: "building-a-portfolio-that-works-like-a-product",
    excerpt: "Notes on combining motion, CMS data, and clean admin workflows.",
    content: "## Product-minded portfolio\n\nA strong developer portfolio is more than a gallery. It should communicate craft, technical depth, and the ability to maintain real systems.\n\n- Keep public pages fast and expressive\n- Keep admin pages focused and predictable\n- Make content editable without redeploying",
    cover_url: null,
    category: "Engineering",
    status: "published",
    seo_title: "Building a Portfolio That Works Like a Product",
    seo_description: "Portfolio CMS notes.",
    created_at: now,
    updated_at: now
  }
];

export const fallbackCertifications: Certification[] = [
  {
    id: "c1",
    title: "Web Development Fundamentals",
    issuer: "Professional Learning Platform",
    issued_at: "2025-01-15",
    credential_url: "#",
    image_url: null,
    description: "Foundational certification covering modern web development practices.",
    sort_order: 1,
    created_at: now,
    updated_at: now
  }
];

export const fallbackPublications: Publication[] = [
  {
    id: "pub1",
    title: "Designing Useful Information Systems",
    publisher: "Academic Project",
    published_at: "2025-06-01",
    publication_url: "#",
    doi: null,
    cover_url: null,
    description: "A practical publication about translating organizational needs into usable information systems.",
    sort_order: 1,
    created_at: now,
    updated_at: now
  }
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Project Collaborator",
    affiliation: "University Organization",
    role: "Team Member",
    photo_url: null,
    quote: "Haikal bekerja dengan terstruktur, komunikatif, dan selalu memperhatikan kualitas detail dari hasil akhir.",
    status: "published",
    sort_order: 1,
    created_at: now,
    updated_at: now
  }
];
