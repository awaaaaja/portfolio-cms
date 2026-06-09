import { createClient } from "@/lib/supabase/server";
import {
  fallbackBlogs,
  fallbackCertifications,
  fallbackEducations,
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackPublications,
  fallbackSettings,
  fallbackSkills,
  fallbackTestimonials
} from "@/lib/data/fallback";
import { env } from "@/lib/env";
import type { Blog, Certification, Education, Experience, Profile, ProjectWithRelations, Publication, SiteSettings, Skill, Testimonial } from "@/types/database";

async function safe<T>(query: PromiseLike<{ data: T | null; error: unknown }>, fallback: T): Promise<T> {
  try {
    const { data, error } = await query;
    if (error || !data || (Array.isArray(data) && data.length === 0)) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export async function getProfile(): Promise<Profile> {
  if (!env.isSupabaseConfigured) return fallbackProfile;
  const supabase = createClient();
  return safe(
    supabase.from("profiles").select("*").order("created_at", { ascending: true }).limit(1).single(),
    fallbackProfile
  );
}

export async function getSettings(): Promise<SiteSettings> {
  if (!env.isSupabaseConfigured) return fallbackSettings;
  const supabase = createClient();
  return safe(
    supabase.from("site_settings").select("*").order("created_at", { ascending: true }).limit(1).single(),
    fallbackSettings
  );
}

export async function getSkills(options?: { marquee?: boolean; limit?: number }): Promise<Skill[]> {
  if (!env.isSupabaseConfigured) {
    const data = options?.marquee ? fallbackSkills.filter((skill) => skill.is_marquee) : fallbackSkills;
    return options?.limit ? data.slice(0, options.limit) : data;
  }
  const supabase = createClient();
  let query = supabase.from("skills").select("*").order("sort_order", { ascending: true });
  if (options?.marquee) query = query.eq("is_marquee", true);
  if (options?.limit) query = query.limit(options.limit);
  return safe(query, options?.limit ? fallbackSkills.slice(0, options.limit) : fallbackSkills);
}

export async function getExperiences(limit?: number): Promise<Experience[]> {
  if (!env.isSupabaseConfigured) return limit ? fallbackExperiences.slice(0, limit) : fallbackExperiences;
  const supabase = createClient();
  let query = supabase.from("experiences").select("*").order("sort_order", { ascending: true });
  if (limit) query = query.limit(limit);
  return safe(query, limit ? fallbackExperiences.slice(0, limit) : fallbackExperiences);
}

export async function getEducations(): Promise<Education[]> {
  if (!env.isSupabaseConfigured) return fallbackEducations;
  const supabase = createClient();
  return safe(supabase.from("educations").select("*").order("sort_order", { ascending: true }), fallbackEducations);
}

export async function getCertifications(): Promise<Certification[]> {
  if (!env.isSupabaseConfigured) return fallbackCertifications;
  const supabase = createClient();
  return safe(supabase.from("certifications").select("*").order("sort_order", { ascending: true }), fallbackCertifications);
}

export async function getPublications(): Promise<Publication[]> {
  if (!env.isSupabaseConfigured) return fallbackPublications;
  const supabase = createClient();
  return safe(supabase.from("publications").select("*").order("sort_order", { ascending: true }), fallbackPublications);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!env.isSupabaseConfigured) return fallbackTestimonials;
  const supabase = createClient();
  return safe(
    supabase.from("testimonials").select("*").eq("status", "published").order("sort_order", { ascending: true }),
    fallbackTestimonials
  );
}

export async function getProjects(options?: { featured?: boolean; limit?: number; category?: string; search?: string }): Promise<ProjectWithRelations[]> {
  if (!env.isSupabaseConfigured) {
    let data = fallbackProjects;
    if (options?.featured) data = data.filter((project) => project.is_featured);
    if (options?.category && options.category !== "all") data = data.filter((project) => project.category === options.category);
    if (options?.search) data = data.filter((project) => project.title.toLowerCase().includes(options.search!.toLowerCase()));
    return options?.limit ? data.slice(0, options.limit) : data;
  }
  const supabase = createClient();
  let query = supabase
    .from("projects")
    .select("*, project_images(*), project_tech_stacks(*)")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  if (options?.featured) query = query.eq("is_featured", true);
  if (options?.category && options.category !== "all") query = query.eq("category", options.category);
  if (options?.search) query = query.ilike("title", `%${options.search}%`);
  if (options?.limit) query = query.limit(options.limit);
  const fallback = options?.limit ? fallbackProjects.slice(0, options.limit) : fallbackProjects;
  return safe(query, fallback);
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithRelations | null> {
  if (!env.isSupabaseConfigured) return fallbackProjects.find((project) => project.slug === slug) ?? null;
  const supabase = createClient();
  const data = await safe(
    supabase
      .from("projects")
      .select("*, project_images(*), project_tech_stacks(*)")
      .eq("status", "published")
      .eq("slug", slug)
      .single(),
    fallbackProjects.find((project) => project.slug === slug) ?? null
  );
  return data;
}

export async function getBlogs(options?: { limit?: number }): Promise<Blog[]> {
  if (!env.isSupabaseConfigured) return options?.limit ? fallbackBlogs.slice(0, options.limit) : fallbackBlogs;
  const supabase = createClient();
  let query = supabase.from("blogs").select("*").eq("status", "published").order("created_at", { ascending: false });
  if (options?.limit) query = query.limit(options.limit);
  return safe(query, options?.limit ? fallbackBlogs.slice(0, options.limit) : fallbackBlogs);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!env.isSupabaseConfigured) return fallbackBlogs.find((blog) => blog.slug === slug) ?? null;
  const supabase = createClient();
  return safe(
    supabase.from("blogs").select("*").eq("status", "published").eq("slug", slug).single(),
    fallbackBlogs.find((blog) => blog.slug === slug) ?? null
  );
}
