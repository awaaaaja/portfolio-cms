import { SkillIcon } from "@/lib/icon-map";
import type { Skill } from "@/types/database";
import { ContinuousCardMarquee } from "@/components/public/continuous-card-marquee";

export function TechMarquee({ skills }: { skills: Skill[] }) {
  if (!skills.length) return null;

  const items = skills.map((skill) => (
    <div
      key={skill.id}
      className="interactive-pill flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-200 transition duration-300 hover:border-cyan-300/40 hover:text-cyan-100 hover:shadow-neon"
      data-cursor="hover"
    >
      <SkillIcon iconKey={skill.icon_key} className="h-5 w-5 shrink-0 text-cyan-200" />
      <span className="whitespace-nowrap">{skill.name}</span>
    </div>
  ));

  return <ContinuousCardMarquee ariaLabel="Tech stack" speed={28}>{items}</ContinuousCardMarquee>;
}