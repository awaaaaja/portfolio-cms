import Link from "next/link";
import { Download, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animation/reveal";
import { MagneticButton } from "@/components/animation/magnetic-button";
import { FloatingCodeCard } from "@/components/public/floating-code-card";
import { HeroPhoto } from "@/components/public/hero-photo";
import { TypingRoles } from "@/components/public/typing-roles";
import type { Profile, SiteSettings } from "@/types/database";

export function HeroSection({ profile, settings }: { profile: Profile; settings: SiteSettings }) {
  return (
    <section className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8">
      <Reveal>
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100 sm:text-sm">
            <Rocket className="h-4 w-4" />
            Futuristic developer workspace
          </div>
          <h1 className="text-balance text-[2.45rem] font-black leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{settings.hero_title || `Hi, I am ${profile.name}.`}</span>
            <br />
            {settings.hero_subtitle || profile.headline}
          </h1>
          <div className="mt-5 min-h-7 text-base sm:mt-6 sm:text-xl">
            <TypingRoles roles={profile.hero_roles} />
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">{profile.bio}</p>
          <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-row">
            <MagneticButton>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/projects"><Rocket className="h-4 w-4" /> View Projects</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/contact"><Mail className="h-4 w-4" /> Contact Me</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href={profile.cv_url || "#"}><Download className="h-4 w-4" /> Download CV</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="grid gap-5">
          <HeroPhoto profile={profile} />
          <FloatingCodeCard />
        </div>
      </Reveal>
    </section>
  );
}
