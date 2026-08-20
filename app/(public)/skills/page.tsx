import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SkillsSection } from "@/components/public/skills-section";
import { getSkills } from "@/lib/data/public";

export const metadata = { title: "Skills", description: "Technical skills, tools, and technologies.", alternates: { canonical: "/skills" } };

export default async function SkillsPage({ searchParams }: { searchParams: { category?: string } }) {
  const skills = await getSkills();
  const categories = ["all", ...Array.from(new Set(skills.map((skill) => skill.category).filter(Boolean)))];
  const active = searchParams.category || "all";
  const filtered = active === "all" ? skills : skills.filter((skill) => skill.category === active);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-white sm:text-6xl">Skills</h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category} href={category === "all" ? "/skills" : `/skills?category=${category}`} data-cursor="hover">
              <Badge className={active === category ? "bg-cyan-300 text-slate-950" : ""}>{category}</Badge>
            </Link>
          ))}
        </div>
      </section>
      <SkillsSection skills={filtered} title={active === "all" ? "All capabilities" : `${active} skills`} />
    </>
  );
}
