import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 p-10 text-center", className)}>
      <Inbox className="mb-3 h-9 w-9 text-slate-500" />
      <h3 className="text-base font-semibold text-white">{title}</h3>
      {description ? <p className="mt-1 max-w-md text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}
