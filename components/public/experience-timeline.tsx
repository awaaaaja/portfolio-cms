import { Reveal } from "@/components/animation/reveal";
import { ContinuousCardMarquee } from "@/components/public/continuous-card-marquee";
import { formatDate } from "@/lib/utils";
import type { Education, Experience } from "@/types/database";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

export function ExperienceTimeline({ experiences, educations }: { experiences: Experience[]; educations?: Education[] }) {
  return (
    <section className="py-14 sm:py-20">
      <Reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 font-mono text-sm text-cyan-200">timeline.map()</p>
          <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">Experience and education</h2>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-14">
        <div className="min-w-0 border-y border-white/[0.07] bg-white/[0.015] py-7">
          <div className="mx-auto mb-6 flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"><BriefcaseBusiness className="h-5 w-5" /></span>
            <div>
              <p className="font-mono text-xs text-cyan-200">work.history()</p>
              <h3 className="text-xl font-bold text-white">Experience</h3>
            </div>
          </div>
          <div className="mx-auto max-w-[100rem]">
            <ContinuousCardMarquee ariaLabel="Experience cards" speed={24} itemClassName="w-[min(84vw,23rem)]">
              {experiences.map((item) => (
                <article key={item.id} className="interactive-card glass flex h-[18rem] w-full flex-col rounded-xl border-t-2 border-t-cyan-300/30 p-5">
                  <p className="font-mono text-xs text-cyan-200">{formatDate(item.start_date)} - {item.is_current ? "Present" : formatDate(item.end_date)}</p>
                  <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-tight text-white">{item.position}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-300">{item.company}</p>
                  <p className="mt-4 line-clamp-6 text-sm leading-7 text-slate-400">{item.description}</p>
                </article>
              ))}
            </ContinuousCardMarquee>
          </div>
        </div>
        <div className="min-w-0 border-y border-white/[0.07] bg-white/[0.015] py-7">
          <div className="mx-auto mb-6 flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200"><GraduationCap className="h-5 w-5" /></span>
            <div>
              <p className="font-mono text-xs text-slate-400">study.path()</p>
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>
          </div>
          <div className="mx-auto max-w-[100rem]">
            <ContinuousCardMarquee ariaLabel="Education cards" direction="right" speed={20} itemClassName="w-[min(84vw,23rem)]">
              {educations?.map((item) => (
                <article key={item.id} className="interactive-card glass flex h-[18rem] w-full flex-col rounded-xl border-t-2 border-t-white/10 p-5">
                  <p className="font-mono text-xs text-cyan-200">{item.start_year} - {item.end_year || "Present"}</p>
                  <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-tight text-white">{item.institution}</h3>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-300">{item.major}</p>
                  <p className="mt-4 line-clamp-6 text-sm leading-7 text-slate-400">{item.description}</p>
                </article>
              ))}
            </ContinuousCardMarquee>
          </div>
        </div>
      </div>
    </section>
  );
}
