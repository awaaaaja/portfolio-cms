import Link from "next/link";
import { Code2, Menu } from "lucide-react";

const links = [
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Projects", "/projects"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function SiteHeader({ logo = "UJ" }: { logo?: string | null }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm font-bold text-white" data-cursor="hover">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 transition duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-neon">
            <Code2 className="h-4 w-4" />
          </span>
          {logo || "PORTFOLIO"}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="relative rounded-lg px-3 py-2 text-sm text-slate-300 transition duration-300 after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-cyan-200 after:transition-transform after:duration-300 hover:bg-white/8 hover:text-white hover:after:scale-x-100" data-cursor="hover">
              {label}
            </Link>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="list-none rounded-lg border border-white/10 bg-white/[0.04] p-2 transition active:scale-95">
            <Menu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-glass backdrop-blur-xl">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="block rounded-lg px-3 py-3 text-sm text-slate-300 transition active:bg-white/10">
                {label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
