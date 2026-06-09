import Link from "next/link";
import { Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminNavItems } from "@/components/admin/admin-sidebar";
import { signOut } from "@/lib/actions/admin";

export function AdminTopbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase text-cyan-200">admin.console</p>
          <h1 className="truncate text-lg font-bold text-white sm:text-xl">{title || "Dashboard"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <details className="relative lg:hidden">
            <summary className="flex h-9 w-9 list-none items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white">
              <Menu className="h-4 w-4" />
            </summary>
            <nav className="absolute right-0 mt-3 grid max-h-[calc(100svh-5rem)] w-[min(19rem,calc(100vw-2rem))] gap-1 overflow-y-auto rounded-xl border border-white/10 bg-slate-950/98 p-2 shadow-glass backdrop-blur-xl">
              <Link href="/" className="flex items-center gap-3 rounded-lg border-b border-white/10 px-3 py-3 text-sm text-cyan-100"><Home className="h-4 w-4" /> Public portfolio</Link>
              {adminNavItems.map(([label, href, Icon]) => <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 active:bg-white/10"><Icon className="h-4 w-4 shrink-0" /> {label}</Link>)}
            </nav>
          </details>
          <form action={signOut}>
            <Button variant="secondary" size="sm"><span className="hidden sm:inline">Sign out</span><span className="sm:hidden">Exit</span></Button>
          </form>
        </div>
      </div>
    </header>
  );
}
