"use server";

import { contactSchema } from "@/lib/validators/contact";
import { createClient } from "@/lib/supabase/server";

export async function createContactMessage(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.errors[0]?.message || "Please check the form." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert({ ...parsed.data, status: "unread" });
  if (error) return { ok: false, message: "Could not send your message. Check Supabase setup and try again." };
  return { ok: true, message: "Message sent. I will get back to you soon." };
}
