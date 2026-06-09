import { Reveal } from "@/components/animation/reveal";
import { formatDate } from "@/lib/utils";
import type { Education, Experience } from "@/types/database";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

export function ExperienceTimeline({ experiences, educations }: { experiences: Experience[]; educations?: Education[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm uppercase text-cyan-200">timeline.map()</p>
        <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-5xl">Experience and education</h2>
      </Reveal>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"><BriefcaseBusiness className="h-5 w-5" /></span>
            <h3 className="text-xl font-bold text-white">Experience</h3>
          </div>
          <div className="relative space-y-4 border-l border-cyan-300/20 pl-4 sm:space-y-5 sm:pl-6">
          {experiences.map((item) => (
            <Reveal key={item.id}>
              <div className="interactive-card glass relative rounded-xl p-4 sm:p-5">
                <span className="absolute -left-[23px] top-6 h-3 w-3 rounded-full border-2 border-slate-950 bg-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.8)] sm:-left-[31px]" />
                <p className="font-mono text-xs text-cyan-200">{formatDate(item.start_date)} - {item.is_current ? "Present" : formatDate(item.end_date)}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{item.position}</h3>
                <p className="text-sm text-purple-200">{item.company}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </div>
            </Reveal>
          ))}
          </div>
        </div>
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-300/20 bg-purple-300/10 text-purple-100"><GraduationCap className="h-5 w-5" /></span>
            <h3 className="text-xl font-bold text-white">Education</h3>
          </div>
          <div className="relative space-y-4 border-l border-purple-300/20 pl-4 sm:space-y-5 sm:pl-6">
          {educations?.map((item) => (
            <Reveal key={item.id}>
              <div className="interactive-card glass relative rounded-xl p-4 sm:p-5">
                <span className="absolute -left-[23px] top-6 h-3 w-3 rounded-full border-2 border-slate-950 bg-purple-300 shadow-[0_0_16px_rgba(168,85,247,0.75)] sm:-left-[31px]" />
                <p className="font-mono text-xs text-cyan-200">{item.start_year} - {item.end_year || "Present"}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{item.institution}</h3>
                <p className="text-sm text-purple-200">{item.major}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </div>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
