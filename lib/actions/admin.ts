"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { splitLines, slugify } from "@/lib/utils";

async function requireAdmin() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/admin/login");
  const { data: adminMembership } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (!adminMembership) redirect("/admin/login?error=unauthorized");
  return supabase;
}

function bool(value: FormDataEntryValue | null) {
  return value === "true" || value === "on";
}

function int(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function upsertProfile(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  await supabase.from("profiles").upsert({
    id,
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    headline: String(formData.get("headline") || ""),
    bio: String(formData.get("bio") || ""),
    about_bio: String(formData.get("about_bio") || ""),
    avatar_url: String(formData.get("avatar_url") || ""),
    hero_photo_url: String(formData.get("hero_photo_url") || ""),
    about_photo_urls: splitLines(formData.get("about_photo_urls")),
    hero_roles: splitLines(formData.get("hero_roles")),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    location: String(formData.get("location") || ""),
    cv_url: String(formData.get("cv_url") || ""),
    github_url: String(formData.get("github_url") || ""),
    linkedin_url: String(formData.get("linkedin_url") || ""),
    instagram_url: String(formData.get("instagram_url") || ""),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/profile");
}

export async function upsertSettings(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  await supabase.from("site_settings").upsert({
    id,
    site_title: String(formData.get("site_title") || ""),
    site_description: String(formData.get("site_description") || ""),
    logo_text: String(formData.get("logo_text") || ""),
    accent_color: String(formData.get("accent_color") || "#22D3EE"),
    hero_title: String(formData.get("hero_title") || ""),
    hero_subtitle: String(formData.get("hero_subtitle") || ""),
    maintenance_mode: bool(formData.get("maintenance_mode")),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function upsertProject(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || slugify(title));
  await supabase.from("projects").upsert({
    id,
    title,
    slug,
    short_description: String(formData.get("short_description") || ""),
    description: String(formData.get("description") || ""),
    thumbnail_url: String(formData.get("thumbnail_url") || ""),
    demo_url: String(formData.get("demo_url") || ""),
    github_url: String(formData.get("github_url") || ""),
    category: String(formData.get("category") || ""),
    status: String(formData.get("status") || "draft"),
    is_featured: bool(formData.get("is_featured")),
    sort_order: int(formData.get("sort_order")),
    updated_at: new Date().toISOString()
  });

  await supabase.from("project_tech_stacks").delete().eq("project_id", id);
  const tech = splitLines(formData.get("tech_stacks")).map((name, index) => ({ project_id: id, name, icon_key: slugify(name), sort_order: index }));
  if (tech.length) await supabase.from("project_tech_stacks").insert(tech);

  await supabase.from("project_images").delete().eq("project_id", id);
  const gallery = splitLines(formData.get("gallery")).map((image_url, index) => ({ project_id: id, image_url, alt_text: `${title} gallery ${index + 1}`, sort_order: index }));
  if (gallery.length) await supabase.from("project_images").insert(gallery);

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("projects").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function upsertSkill(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  await supabase.from("skills").upsert({
    id,
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || ""),
    level: int(formData.get("level"), 80),
    icon_key: String(formData.get("icon_key") || ""),
    is_marquee: bool(formData.get("is_marquee")),
    sort_order: int(formData.get("sort_order")),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/skills");
  revalidatePath("/about");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("skills").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
}

export async function upsertExperience(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  await supabase.from("experiences").upsert({
    id,
    position: String(formData.get("position") || ""),
    company: String(formData.get("company") || ""),
    start_date: String(formData.get("start_date") || ""),
    end_date: String(formData.get("end_date") || "") || null,
    is_current: bool(formData.get("is_current")),
    description: String(formData.get("description") || ""),
    sort_order: int(formData.get("sort_order")),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/about");
  revalidatePath("/admin/experiences");
}

export async function deleteExperience(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("experiences").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/experiences");
}

export async function upsertEducation(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  await supabase.from("educations").upsert({
    id,
    institution: String(formData.get("institution") || ""),
    major: String(formData.get("major") || ""),
    start_year: int(formData.get("start_year")),
    end_year: int(formData.get("end_year")),
    description: String(formData.get("description") || ""),
    sort_order: int(formData.get("sort_order")),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/about");
  revalidatePath("/admin/educations");
}

export async function deleteEducation(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("educations").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/educations");
}

export async function upsertCertification(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  await supabase.from("certifications").upsert({
    id,
    title: String(formData.get("title") || ""),
    issuer: String(formData.get("issuer") || ""),
    issued_at: String(formData.get("issued_at") || "") || null,
    credential_url: String(formData.get("credential_url") || ""),
    image_url: String(formData.get("image_url") || ""),
    description: String(formData.get("description") || ""),
    sort_order: int(formData.get("sort_order")),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/about");
  revalidatePath("/admin/certifications");
}

export async function deleteCertification(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("certifications").delete().eq("id", String(formData.get("id")));
  revalidatePath("/about");
  revalidatePath("/admin/certifications");
}

export async function upsertPublication(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  await supabase.from("publications").upsert({
    id,
    title: String(formData.get("title") || ""),
    publisher: String(formData.get("publisher") || ""),
    published_at: String(formData.get("published_at") || "") || null,
    publication_url: String(formData.get("publication_url") || ""),
    doi: String(formData.get("doi") || ""),
    cover_url: String(formData.get("cover_url") || ""),
    description: String(formData.get("description") || ""),
    sort_order: int(formData.get("sort_order")),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/about");
  revalidatePath("/admin/publications");
}

export async function deletePublication(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("publications").delete().eq("id", String(formData.get("id")));
  revalidatePath("/about");
  revalidatePath("/admin/publications");
}

export async function updateTestimonialStatus(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("testimonials").update({
    status: String(formData.get("status")),
    sort_order: int(formData.get("sort_order")),
    updated_at: new Date().toISOString()
  }).eq("id", String(formData.get("id")));
  revalidatePath("/about");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("testimonials").delete().eq("id", String(formData.get("id")));
  revalidatePath("/about");
  revalidatePath("/admin/testimonials");
}

export async function upsertBlog(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") || crypto.randomUUID());
  const title = String(formData.get("title") || "");
  await supabase.from("blogs").upsert({
    id,
    title,
    slug: String(formData.get("slug") || slugify(title)),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    cover_url: String(formData.get("cover_url") || ""),
    category: String(formData.get("category") || ""),
    status: String(formData.get("status") || "draft"),
    seo_title: String(formData.get("seo_title") || ""),
    seo_description: String(formData.get("seo_description") || ""),
    updated_at: new Date().toISOString()
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}

export async function deleteBlog(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("blogs").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/blogs");
}

export async function updateMessageStatus(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("contact_messages").update({ status: String(formData.get("status")) }).eq("id", String(formData.get("id")));
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("contact_messages").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/messages");
}
