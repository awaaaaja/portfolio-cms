"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function ImageUploader({ name, defaultValue, label }: { name: string; defaultValue?: string | null; label: string }) {
  const [url, setUrl] = useState(defaultValue || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("File harus berupa gambar atau PDF.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file maksimal 10 MB.");
      return;
    }

    setBusy(true);
    setError("");
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${name}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
      setUrl(data.publicUrl);
    } else {
      setError("Upload gagal. Periksa akses storage atau coba lagi.");
    }
    setBusy(false);
  }

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {url ? <img src={url} alt="" className="h-28 w-full rounded-lg border border-white/10 object-cover" /> : null}
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Input name={name} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://..." />
        <Button type="button" variant="secondary" className="w-full sm:w-auto" disabled={busy} onClick={() => document.getElementById(`${name}-file`)?.click()}>
          <Upload className="h-4 w-4" /> {busy ? "..." : "Upload"}
        </Button>
      </div>
      <input id={`${name}-file`} type="file" accept="image/*,.pdf" className="hidden" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} />
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
