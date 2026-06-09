"use client";

import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import { SkillIcon } from "@/lib/icon-map";
import type { Skill } from "@/types/database";

export function TechMarquee({ skills }: { skills: Skill[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!skills.length) return null;

  const items = skills.map((skill) => (
    <div
      key={skill.id}
      className="interactive-pill mx-2 flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 backdrop-blur-xl transition duration-300 hover:border-cyan-300/40 hover:text-cyan-100 hover:shadow-neon"
      data-cursor="hover"
    >
      <SkillIcon iconKey={skill.icon_key} className="h-5 w-5 shrink-0 text-cyan-200" />
      <span className="whitespace-nowrap">{skill.name}</span>
    </div>
  ));

  return (
    <div className="mask-fade-x relative w-full min-w-0 overflow-hidden py-5">
      {mounted ? (
        <Marquee className="min-w-0 overflow-hidden" autoFill pauseOnHover speed={28} gradient={false}>
          {items}
        </Marquee>
      ) : (
        <div className="flex min-w-0 overflow-hidden">{items}</div>
      )}
    </div>
  );
}
