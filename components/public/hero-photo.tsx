import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/types/database";

export function HeroPhoto({ profile }: { profile: Profile }) {
  const src = profile.hero_photo_url || profile.avatar_url;
  return (
    <div className="relative mx-auto w-[calc(100%-1.5rem)] max-w-[280px] animate-float-y sm:max-w-sm">
      <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_120deg,rgba(34,211,238,0.4),rgba(14,116,144,0.32),rgba(34,211,238,0.4))] blur-xl opacity-60" />
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/30 bg-white/8 p-3 shadow-neon backdrop-blur-xl">
        <div className="aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950">
          {src ? (
            <img src={src} alt={profile.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,rgba(34,211,238,0.14),rgba(8,47,73,0.4))]">
              <span className="font-mono text-7xl font-bold text-white/85">{profile.name.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>
      <Badge className="absolute left-2 top-5 bg-emerald-400/10 text-[10px] text-emerald-100 sm:-left-3 sm:top-8 sm:text-xs">Available for Project</Badge>
      <Badge className="absolute bottom-5 right-2 text-[10px] sm:-right-3 sm:bottom-10 sm:text-xs">Open to Collaboration</Badge>
    </div>
  );
}
