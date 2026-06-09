import { Terminal } from "lucide-react";

export function FloatingCodeCard() {
  return (
    <div className="glass min-w-0 w-full overflow-hidden rounded-2xl p-3 font-mono text-[10px] text-slate-300 sm:p-4 sm:text-xs">
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-auto flex items-center gap-1 text-slate-500"><Terminal className="h-3.5 w-3.5" /> portfolio.ts</span>
      </div>
      <pre className="max-h-56 overflow-hidden whitespace-pre-wrap break-words leading-6 sm:max-h-none sm:leading-7">
        <code>
{`const developer = {
  focus: ["web apps", "dashboards", "data"],
  stack: ["Next.js", "Supabase", "TypeScript"],
  ships: "clean, animated, production-ready UI"
};

await developer.buildPortfolio();`}
        </code>
      </pre>
    </div>
  );
}
