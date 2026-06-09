import { cn } from "@/lib/utils";

export function DataTable({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]", className)}>{children}</div>;
}

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border-collapse text-left text-sm">{children}</table>;
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-white/10 px-4 py-3 font-medium text-slate-400">{children}</th>;
}

export function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-white/5 px-4 py-3 text-slate-300">{children}</td>;
}
