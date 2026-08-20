import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/public/project-card";
import { SkillIcon } from "@/lib/icon-map";
import { getProjectBySlug, getProjects } from "@/lib/data/public";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short_description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "website",
      title: project.title,
      description: project.short_description,
      url: `/projects/${project.slug}`,
      images: project.thumbnail_url ? [{ url: project.thumbnail_url }] : undefined
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [project, related] = await Promise.all([getProjectBySlug(params.slug), getProjects({ limit: 3 })]);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge>{project.category}</Badge>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{project.short_description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.demo_url ? <Button asChild><Link href={project.demo_url}><ExternalLink className="h-4 w-4" /> Demo</Link></Button> : null}
          {project.github_url ? <Button asChild variant="secondary"><Link href={project.github_url}><Github className="h-4 w-4" /> GitHub</Link></Button> : null}
        </div>
      </div>
      <div className="glass overflow-hidden rounded-2xl">
        {project.thumbnail_url ? <img src={project.thumbnail_url} alt={project.title} className="aspect-[16/8] w-full object-cover" /> : <div className="aspect-[16/8] bg-white/[0.05]" />}
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="prose-lite max-w-none">
          {(project.description || "").split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.project_images?.map((image) => (
              <img key={image.id} src={image.image_url} alt={image.alt_text || project.title} className="rounded-xl border border-white/10" />
            ))}
          </div>
        </div>
        <aside className="glass h-fit rounded-2xl p-5">
          <h2 className="font-bold text-white">Tech stack</h2>
          <div className="mt-4 grid gap-2">
            {project.project_tech_stacks?.map((tech) => (
              <div key={tech.id} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-200">
                <SkillIcon iconKey={tech.icon_key} className="h-4 w-4 text-cyan-200" />
                {tech.name}
              </div>
            ))}
          </div>
        </aside>
      </div>
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold text-white">Related projects</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {related.filter((item) => item.slug !== project.slug).slice(0, 3).map((item) => <ProjectCard key={item.id} project={item} />)}
        </div>
      </section>
    </article>
  );
}
