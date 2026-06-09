import type { IconType } from "react-icons";
import {
  SiDart,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from "react-icons/si";
import { Code2 } from "lucide-react";

export const iconMap: Record<string, IconType> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  express: SiExpress,
  laravel: SiLaravel,
  php: SiPhp,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  supabase: SiSupabase,
  firebase: SiFirebase,
  flutter: SiFlutter,
  dart: SiDart,
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  docker: SiDocker,
  vercel: SiVercel,
  prisma: SiPrisma
};

export const supportedIconKeys = Object.keys(iconMap);

export function SkillIcon({ iconKey, className }: { iconKey?: string | null; className?: string }) {
  const Icon = iconKey ? iconMap[iconKey] : undefined;
  if (!Icon) return <Code2 className={className} />;
  return <Icon className={className} />;
}
