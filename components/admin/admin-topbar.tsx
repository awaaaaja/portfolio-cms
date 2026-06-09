import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/admin";

export function AdminTopbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase text-cyan-200">admin.console</p>
          <h1 className="text-xl font-bold text-white">{title || "Dashboard"}</h1>
        </div>
        <form action={signOut}>
          <Button variant="secondary" size="sm">Sign out</Button>
        </form>
      </div>
    </header>
  );
}
