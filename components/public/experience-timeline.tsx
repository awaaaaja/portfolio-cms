import { Reveal } from "@/components/animation/reveal";
import { HorizontalAutoSlider } from "@/components/public/horizontal-auto-slider";
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
        <div className="min-w-0">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"><BriefcaseBusiness className="h-5 w-5" /></span>
            <h3 className="text-xl font-bold text-white">Experience</h3>
          </div>
          <HorizontalAutoSlider ariaLabel="Experience carousel" itemClassName="w-[min(84vw,38rem)] lg:w-[min(40vw,38rem)]">
          {experiences.map((item) => (
              <div key={item.id} className="interactive-card glass h-full rounded-xl border-t-2 border-t-cyan-300/30 p-4 sm:p-5">
                <p className="font-mono text-xs text-cyan-200">{formatDate(item.start_date)} - {item.is_current ? "Present" : formatDate(item.end_date)}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{item.position}</h3>
                <p className="text-sm text-purple-200">{item.company}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </div>
          ))}
          </HorizontalAutoSlider>
        </div>
        <div className="min-w-0">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-300/20 bg-purple-300/10 text-purple-100"><GraduationCap className="h-5 w-5" /></span>
            <h3 className="text-xl font-bold text-white">Education</h3>
          </div>
          <HorizontalAutoSlider ariaLabel="Education carousel" itemClassName="w-[min(84vw,38rem)] lg:w-[min(40vw,38rem)]">
          {educations?.map((item) => (
              <div key={item.id} className="interactive-card glass h-full rounded-xl border-t-2 border-t-purple-300/30 p-4 sm:p-5">
                <p className="font-mono text-xs text-cyan-200">{item.start_year} - {item.end_year || "Present"}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{item.institution}</h3>
                <p className="text-sm text-purple-200">{item.major}</p>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </div>
          ))}
          </HorizontalAutoSlider>
        </div>
      </div>
    </section>
  );
}
