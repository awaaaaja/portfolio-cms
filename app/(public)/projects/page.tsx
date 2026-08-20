import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/public/project-card";
import { getProjects } from "@/lib/data/public";

export const metadata = { title: "Projects", description: "Selected web apps, dashboards, and data products.", alternates: { canonical: "/projects" } };

export default async function ProjectsPage({ searchParams }: { searchParams: { category?: string; q?: string } }) {
  const allProjects = await getProjects();
  const categories = ["all", ...Array.from(new Set(allProjects.map((project) => project.category).filter(Boolean)))];
  const projects = await getProjects({ category: searchParams.category, search: searchParams.q });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 font-mono text-sm text-cyan-200">projects.where(status=published)</p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">Projects</h1>
        </div>
        <form className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input name="q" defaultValue={searchParams.q} placeholder="Search projects..." className="pl-9" />
        </form>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link key={category} href={category === "all" ? "/projects" : `/projects?category=${category}`} data-cursor="hover">
            <Badge className={(searchParams.category || "all") === category ? "bg-cyan-300 text-slate-950" : ""}>{category}</Badge>
          </Link>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}
