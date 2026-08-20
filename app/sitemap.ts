import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getBlogs, getProjects } from "@/lib/data/public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);
  const staticRoutes = ["", "/about", "/skills", "/projects", "/blog", "/contact"].map((path) => ({
    url: `${env.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${env.siteUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${env.siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updated_at || project.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}