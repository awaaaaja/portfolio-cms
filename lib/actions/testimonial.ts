"use server";

import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export async function submitTestimonial(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const affiliation = String(formData.get("affiliation") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const quote = String(formData.get("quote") || "").trim();
  const submittedPhotoUrl = String(formData.get("photo_url") || "").trim();
  const allowedPhotoPrefix = `${env.supabaseUrl}/storage/v1/object/public/portfolio/testimonials/`;
  const photoUrl = submittedPhotoUrl.startsWith(allowedPhotoPrefix) ? submittedPhotoUrl : "";

  if (name.length < 2 || name.length > 100 || quote.length < 10 || quote.length > 1000) {
    return { ok: false, message: "Nama harus 2-100 karakter dan tanggapan 10-1000 karakter." };
  }
  if (affiliation.length > 160 || role.length > 120) {
    return { ok: false, message: "Kampus/organisasi atau peran terlalu panjang." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("testimonials").insert({
    name,
    affiliation,
    role,
    photo_url: photoUrl,
    quote,
    status: "pending",
    sort_order: 0
  });
  if (error) return { ok: false, message: "Belum bisa mengirim testimoni. Pastikan migrasi Supabase sudah dijalankan." };
  return { ok: true, message: "Terima kasih. Testimoni akan tampil setelah disetujui." };
}
