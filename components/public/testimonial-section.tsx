"use client";

import Marquee from "react-fast-marquee";
import { useState, useTransition } from "react";
import { MessageSquareQuote, Send, Upload } from "lucide-react";
import { Reveal } from "@/components/animation/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { submitTestimonial } from "@/lib/actions/testimonial";
import type { Testimonial } from "@/types/database";

const TESTIMONIAL_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const TESTIMONIAL_IMAGE_MAX_SIZE = 5 * 1024 * 1024;

export function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="overflow-hidden border-t border-white/10 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-sm text-cyan-200">people.say()</p>
          <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">What people say about me</h2>
        </Reveal>
      </div>
      <div className="mask-fade-x mt-10">
        <Marquee autoFill pauseOnHover speed={22} gradient={false}>
          {testimonials.map((item) => <TestimonialCard key={item.id} item={item} />)}
        </Marquee>
      </div>
      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <TestimonialForm />
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="glass mx-2 w-[min(84vw,320px)] rounded-xl p-4 sm:mx-3 sm:w-[390px] sm:p-5">
      <MessageSquareQuote className="h-6 w-6 text-cyan-200" />
      <p className="mt-4 min-h-24 text-sm leading-7 text-slate-300">&ldquo;{item.quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        {item.photo_url ? <img src={item.photo_url} alt={item.name} className="h-11 w-11 rounded-full object-cover" /> : <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300/10 font-mono font-bold text-cyan-100">{item.name.slice(0, 2).toUpperCase()}</span>}
        <div>
          <p className="font-semibold text-white">{item.name}</p>
          <p className="text-xs text-slate-400">{[item.role, item.affiliation].filter(Boolean).join(" / ")}</p>
        </div>
      </div>
    </article>
  );
}

function TestimonialForm() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();

  async function upload(file: File) {
    if (!TESTIMONIAL_IMAGE_TYPES.includes(file.type)) {
      setFeedback("Foto harus berformat JPG, PNG, atau WebP.");
      return;
    }
    if (file.size > TESTIMONIAL_IMAGE_MAX_SIZE) {
      setFeedback("Ukuran foto maksimal 5 MB.");
      return;
    }

    setUploading(true);
    setFeedback("");
    const supabase = createClient();
    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = `testimonials/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file, { contentType: file.type });
    if (error) {
      setFeedback("Foto belum bisa diunggah. Coba lagi sebentar.");
    } else {
      setPhotoUrl(supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl);
      setFeedback("Foto berhasil diunggah.");
    }
    setUploading(false);
  }

  return (
    <Reveal>
      <form
        className="glass grid gap-4 rounded-xl p-4 sm:p-5"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          data.set("photo_url", photoUrl);
          startTransition(async () => {
            const result = await submitTestimonial(data);
            setFeedback(result.message);
            if (result.ok) {
              form.reset();
              setPhotoUrl("");
            }
          });
        }}
      >
        <div>
          <h3 className="text-lg font-bold text-white">Share your experience</h3>
          <p className="mt-1 text-sm text-slate-400">Testimoni akan diperiksa sebelum ditampilkan.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label="Nama" />
          <Field name="affiliation" label="Kampus / organisasi" />
          <Field name="role" label="Peran / hubungan" />
          <div className="grid gap-2">
            <Label>Foto</Label>
            <Button type="button" variant="secondary" disabled={uploading} onClick={() => document.getElementById("testimonial-photo")?.click()}><Upload className="h-4 w-4" /> {uploading ? "Mengunggah..." : photoUrl ? "Foto terunggah" : "Upload foto"}</Button>
            <input id="testimonial-photo" className="hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} />
          </div>
        </div>
        <div className="grid gap-2"><Label>Tanggapan tentang Haikal</Label><Textarea name="quote" required /></div>
        <Button disabled={pending}><Send className="h-4 w-4" /> {pending ? "Mengirim..." : "Kirim testimoni"}</Button>
        {feedback ? <p className="text-sm text-cyan-100">{feedback}</p> : null}
      </form>
    </Reveal>
  );
}

function Field({ name, label }: { name: string; label: string }) {
  return <div className="grid gap-2"><Label>{label}</Label><Input name={name} required={name === "name"} /></div>;
}
