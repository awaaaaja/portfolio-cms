import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        status === "published" || status === "read" || status === "replied"
          ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
          : status === "archived"
            ? "border-slate-400/30 bg-slate-400/10 text-slate-200"
            : "border-amber-300/30 bg-amber-400/10 text-amber-100"
      )}
    >
      {status}
    </Badge>
  );
}
