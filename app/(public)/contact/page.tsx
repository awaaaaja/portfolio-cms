import Link from "next/link";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/public/contact-form";
import { getProfile } from "@/lib/data/public";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
      <div>
        <p className="mb-3 font-mono text-sm text-cyan-200">contact.send()</p>
        <h1 className="text-balance text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">Let&apos;s build something useful.</h1>
        <div className="mt-8 grid gap-4 text-slate-300">
          {profile.email ? <p className="flex min-w-0 items-center gap-3 break-all"><Mail className="h-5 w-5 shrink-0 text-cyan-200" /> {profile.email}</p> : null}
          {profile.phone ? <p className="flex items-center gap-3"><Phone className="h-5 w-5 shrink-0 text-cyan-200" /> {profile.phone}</p> : null}
          {profile.location ? <p className="flex items-center gap-3"><MapPin className="h-5 w-5 shrink-0 text-cyan-200" /> {profile.location}</p> : null}
        </div>
        <div className="mt-8 flex gap-4">
          {profile.github_url ? <Link href={profile.github_url}><Github /></Link> : null}
          {profile.linkedin_url ? <Link href={profile.linkedin_url}><Linkedin /></Link> : null}
          {profile.instagram_url ? <Link href={profile.instagram_url}><Instagram /></Link> : null}
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
