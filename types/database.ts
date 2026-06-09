export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Profile = {
  id: string;
  name: string;
  role: string | null;
  headline: string | null;
  bio: string | null;
  about_bio: string | null;
  avatar_url: string | null;
  hero_photo_url: string | null;
  hero_roles: string[] | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  cv_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectStatus = "draft" | "published" | "archived";
export type BlogStatus = ProjectStatus;

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  thumbnail_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  category: string | null;
  status: ProjectStatus;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
};

export type ProjectTechStack = {
  id: string;
  project_id: string;
  name: string;
  icon_key: string | null;
  sort_order: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string | null;
  level: number;
  icon_key: string | null;
  is_marquee: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Experience = {
  id: string;
  position: string;
  company: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Education = {
  id: string;
  institution: string;
  major: string | null;
  start_year: number | null;
  end_year: number | null;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued_at: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Publication = {
  id: string;
  title: string;
  publisher: string | null;
  published_at: string | null;
  publication_url: string | null;
  cover_url: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  affiliation: string | null;
  role: string | null;
  photo_url: string | null;
  quote: string;
  status: "pending" | "published" | "archived";
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category: string | null;
  status: BlogStatus;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
};

export type SiteSettings = {
  id: string;
  site_title: string;
  site_description: string | null;
  logo_text: string | null;
  accent_color: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  maintenance_mode: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectWithRelations = Project & {
  project_images?: ProjectImage[];
  project_tech_stacks?: ProjectTechStack[];
};
