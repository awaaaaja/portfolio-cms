import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DashboardCard({ label, value, icon: Icon }: { label: string; value: number | string; icon: LucideIcon }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-black text-white">{value}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-100">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Card>
  );
}
