import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectTiltCard } from "@/components/public/project-tilt-card";
import type { ProjectWithRelations } from "@/types/database";

export function ProjectCard({ project }: { project: ProjectWithRelations }) {
  return (
    <ProjectTiltCard>
      <article className="interactive-card group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-glass backdrop-blur-xl transition duration-500 hover:border-cyan-300/40 hover:shadow-neon">
        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] transition-transform duration-700 group-hover:translate-x-[280%]" />
        </div>
        <Link href={`/projects/${project.slug}`} className="block" data-cursor-label="View">
          <div className="aspect-[16/10] overflow-hidden bg-slate-900">
            {project.thumbnail_url ? (
              <img src={project.thumbnail_url} alt={project.title} className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]" />
            ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(124,58,237,0.22))] font-mono text-sm text-cyan-100 transition duration-700 ease-out group-hover:scale-[1.025]">
                /{project.slug}
              </div>
            )}
          </div>
        </Link>
        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <Badge className={project.is_featured ? "border-purple-300/40 bg-purple-400/15 text-purple-100" : ""}>
              {project.is_featured ? "Featured" : project.category || "Project"}
            </Badge>
            <div className="flex gap-2 text-slate-400">
              {project.github_url ? <Link href={project.github_url} className="rounded-md p-1 transition hover:bg-white/10 hover:text-cyan-100" data-cursor="hover"><Github className="h-4 w-4" /></Link> : null}
              {project.demo_url ? <Link href={project.demo_url} className="rounded-md p-1 transition hover:bg-white/10 hover:text-cyan-100" data-cursor="hover"><ExternalLink className="h-4 w-4" /></Link> : null}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{project.short_description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.project_tech_stacks?.slice(0, 5).map((tech) => (
              <span key={tech.id} className="interactive-pill rounded-full border border-white/10 bg-slate-950/50 px-2.5 py-1 text-xs text-slate-300">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </ProjectTiltCard>
  );
}
