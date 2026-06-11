import { Reveal } from "@/components/animation/reveal";
import { AboutPhotoSlider } from "@/components/public/about-photo-slider";
import { TechMarquee } from "@/components/public/tech-marquee";
import type { Profile, Skill } from "@/types/database";

export function AboutSection({ profile, marqueeSkills }: { profile: Profile; marqueeSkills: Skill[] }) {
  const photos = [...(profile.about_photo_urls || []), profile.avatar_url, profile.hero_photo_url].filter(
    (photo, index, items): photo is string => Boolean(photo) && items.indexOf(photo) === index
  );

  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div className="glass group mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl p-3 sm:max-w-sm lg:max-w-none">
            {photos.length ? (
              <AboutPhotoSlider images={photos} name={profile.name} />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-xl bg-white/[0.06] font-mono text-6xl font-bold text-white">
                {profile.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="mb-3 font-mono text-sm uppercase text-cyan-200">about.me()</p>
            <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-5xl">Developer for systems that feel sharp and usable.</h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">{profile.about_bio || profile.bio}</p>
            <div className="mt-5 min-w-0 sm:mt-7">
              <TechMarquee skills={marqueeSkills} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
