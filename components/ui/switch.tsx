"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export function Switch({ checked, defaultChecked, name, onCheckedChange, className }: SwitchProps) {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internal;

  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={() => {
        const next = !value;
        if (!isControlled) setInternal(next);
        onCheckedChange?.(next);
      }}
      className={cn(
        "relative h-6 w-11 rounded-full border border-white/10 transition",
        value ? "bg-cyan-300" : "bg-slate-700",
        className
      )}
    >
      <input type="hidden" name={name} value={value ? "true" : "false"} />
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
          value ? "left-5" : "left-0.5"
        )}
      />
    </button>
  );
}
