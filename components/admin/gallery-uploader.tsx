"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

export function GalleryUploader({ name, label, defaultValue = [] }: { name: string; label: string; defaultValue?: string[] | null }) {
  const [urls, setUrls] = useState((defaultValue || []).filter(Boolean));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList) {
    const selected = Array.from(files);
    if (selected.some((file) => !file.type.startsWith("image/"))) {
      setError("Semua file harus berupa gambar.");
      return;
    }
    if (selected.some((file) => file.size > 10 * 1024 * 1024)) {
      setError("Ukuran setiap gambar maksimal 10 MB.");
      return;
    }

    setBusy(true);
    setError("");
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of selected) {
      const extension = file.name.split(".").pop() || "jpg";
      const path = `${name}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from("portfolio").upload(path, file, { contentType: file.type });
      if (uploadError) {
        setError("Sebagian gambar gagal diunggah. Periksa akses storage.");
        continue;
      }
      uploaded.push(supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl);
    }

    setUrls((current) => [...current, ...uploaded]);
    setBusy(false);
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Label>{label}</Label>
          <p className="mt-1 text-xs text-slate-400">Upload beberapa foto atau masukkan satu URL per baris. Urutan foto menentukan urutan slideshow.</p>
        </div>
        <Button type="button" variant="secondary" disabled={busy} onClick={() => document.getElementById(`${name}-files`)?.click()}>
          <Upload className="h-4 w-4" /> {busy ? "Mengunggah..." : "Upload photos"}
        </Button>
      </div>
      {urls.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {urls.map((url, index) => (
            <div key={`${url}-${index}`} className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              <img src={url} alt="" className="aspect-[4/5] w-full object-cover" />
              <Button type="button" size="icon" variant="destructive" className="absolute right-2 top-2 h-7 w-7" onClick={() => setUrls((current) => current.filter((_, itemIndex) => itemIndex !== index))}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
      <Textarea name={name} value={urls.join("\n")} onChange={(event) => setUrls(event.target.value.split(/\r?\n/).map((url) => url.trim()).filter(Boolean))} placeholder="https://..." />
      <input id={`${name}-files`} type="file" accept="image/*" multiple className="hidden" onChange={(event) => event.target.files && upload(event.target.files)} />
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
