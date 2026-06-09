"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { upsertSkill } from "@/lib/actions/admin";
import { SkillIcon, supportedIconKeys } from "@/lib/icon-map";
import type { Skill } from "@/types/database";
import { useState } from "react";

export function SkillForm({ skill }: { skill?: Skill }) {
  const [icon, setIcon] = useState(skill?.icon_key || "nextjs");
  return (
    <form action={upsertSkill} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <input type="hidden" name="id" value={skill?.id || ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Name" value={skill?.name} />
        <Field name="category" label="Category" value={skill?.category} />
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_120px]">
        <div className="grid gap-2">
          <Label>Icon key</Label>
          <Select name="icon_key" defaultValue={icon} onChange={(event) => setIcon(event.target.value)}>
            {supportedIconKeys.map((key) => <option key={key} value={key}>{key}</option>)}
          </Select>
        </div>
        <div className="flex items-end">
          <div className="flex h-10 w-full items-center justify-center rounded-lg border border-white/10 bg-slate-950 text-cyan-200">
            <SkillIcon iconKey={icon} className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="level" label="Level" value={skill?.level ?? 80} type="number" />
        <Field name="sort_order" label="Sort order" value={skill?.sort_order ?? 0} type="number" />
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <Switch name="is_marquee" defaultChecked={skill?.is_marquee ?? true} /> Show in marquee
      </label>
      <Button>Save skill</Button>
    </form>
  );
}

function Field({ name, label, value, type = "text" }: { name: string; label: string; value?: string | number | null; type?: string }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input name={name} type={type} defaultValue={value ?? ""} />
    </div>
  );
}
