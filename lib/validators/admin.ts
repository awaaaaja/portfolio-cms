import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2),
  role: z.string().optional(),
  headline: z.string().optional(),
  bio: z.string().optional(),
  about_bio: z.string().optional(),
  avatar_url: z.string().optional(),
  hero_photo_url: z.string().optional(),
  hero_roles: z.array(z.string()).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  cv_url: z.string().optional(),
  github_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  instagram_url: z.string().optional()
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  short_description: z.string().optional(),
  description: z.string().optional(),
  thumbnail_url: z.string().optional(),
  demo_url: z.string().optional(),
  github_url: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  is_featured: z.boolean().default(false),
  sort_order: z.coerce.number().default(0),
  tech_stacks: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional()
});

export const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional(),
  level: z.coerce.number().min(0).max(100),
  icon_key: z.string().optional(),
  is_marquee: z.boolean().default(true),
  sort_order: z.coerce.number().default(0)
});

export const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  cover_url: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  seo_title: z.string().optional(),
  seo_description: z.string().optional()
});
