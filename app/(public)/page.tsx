import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { AboutSection } from "@/components/public/about-section";
import { ExperienceTimeline } from "@/components/public/experience-timeline";
import { HeroSection } from "@/components/public/hero-section";
import { ProjectCard } from "@/components/public/project-card";
import { SkillsSection } from "@/components/public/skills-section";
import { getEducations, getExperiences, getProfile, getProjects, getSettings, getSkills } from "@/lib/data/public";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata() {
  const profile = await getProfile();
  const description = `Portfolio of ${profile.name}, ${profile.role}. Projects, skills, experience, and articles.`;
  return {
    title: "Home",
    description,
    alternates: { canonical: "/" },
    openGraph: { title: `${profile.name} — ${profile.role}`, description, url: "/" }
  };
}

export default async function HomePage() {
  const [profile, settings, featuredProjects, marqueeSkills, skills, experiences, educations] = await Promise.all([
    getProfile(),
    getSettings(),
    getProjects({ featured: true, limit: 3 }),
    getSkills({ marquee: true }),
    getSkills({ limit: 6 }),
    getExperiences(3),
    getEducations()
  ]);

  return (
    <>
      <JsonLd profile={profile} />
      <HeroSection profile={profile} settings={settings} />
      <AboutSection profile={profile} marqueeSkills={marqueeSkills} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div className="mb-8 flex flex-col items-start gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-sm text-cyan-200">projects.featured()</p>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Featured projects</h2>
            </div>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/projects">All Projects <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>
      <SkillsSection skills={skills} title="Stack preview" />
      <ExperienceTimeline experiences={experiences} educations={educations} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div className="glass rounded-2xl p-5 text-center sm:p-8 md:p-12">
            <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">Have a system idea to ship?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">Let’s turn the interface, dashboard, or data workflow into something polished and production-ready.</p>
            <Button asChild className="mt-7 w-full sm:w-auto" size="lg">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
