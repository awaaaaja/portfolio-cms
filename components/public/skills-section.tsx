import { Reveal } from "@/components/animation/reveal";
import { SkillIcon } from "@/lib/icon-map";
import type { Skill } from "@/types/database";

export function SkillsSection({ skills, title = "Skill matrix" }: { skills: Skill[]; title?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-mono text-sm uppercase text-cyan-200">skills.filter(category)</p>
            <h2 className="text-3xl font-black text-white sm:text-5xl">{title}</h2>
          </div>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <Reveal key={skill.id} delay={index * 0.03}>
            <div className="interactive-card group glass rounded-xl p-4 transition duration-500 hover:border-cyan-300/30 hover:shadow-neon sm:p-5" data-cursor="hover">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-100 transition duration-500 ease-out group-hover:rotate-1 group-hover:scale-105 group-hover:bg-cyan-300/20">
                    <SkillIcon iconKey={skill.icon_key} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{skill.name}</h3>
                    <p className="text-xs text-slate-400">{skill.category}</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-cyan-200">{skill.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-purple-400 transition-all duration-700 group-hover:brightness-125" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
