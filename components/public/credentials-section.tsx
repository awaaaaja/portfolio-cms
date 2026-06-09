import { Award, BookOpenText, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/animation/reveal";
import { formatDate } from "@/lib/utils";
import type { Certification, Publication } from "@/types/database";

export function CredentialsSection({ certifications, publications }: { certifications: Certification[]; publications: Publication[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <Reveal>
        <p className="mb-3 font-mono text-sm uppercase text-cyan-200">credentials.verify()</p>
        <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-5xl">Certifications and publications</h2>
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <CredentialGroup title="Certifications" icon={<Award className="h-5 w-5" />}>
          {certifications.map((item) => (
            <CredentialCard key={item.id} title={item.title} meta={`${item.issuer} / ${formatDate(item.issued_at)}`} description={item.description} href={item.credential_url} image={item.image_url} />
          ))}
        </CredentialGroup>
        <CredentialGroup title="Publications" icon={<BookOpenText className="h-5 w-5" />}>
          {publications.map((item) => (
            <CredentialCard key={item.id} title={item.title} meta={`${item.publisher || "Publication"} / ${formatDate(item.published_at)}`} description={item.description} href={item.publication_url || item.doi} image={item.cover_url} label={item.doi ? "Open DOI" : "View publication"} />
          ))}
        </CredentialGroup>
      </div>
    </section>
  );
}

function CredentialGroup({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-100">{icon}</span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function CredentialCard({ title, meta, description, href, image, label = "View credential" }: { title: string; meta: string; description?: string | null; href?: string | null; image?: string | null; label?: string }) {
  const normalizedHref = normalizeHref(href);
  const content = (
    <article className="interactive-card glass group flex min-h-40 flex-col overflow-hidden rounded-xl transition duration-500 hover:border-cyan-200/25 min-[420px]:flex-row">
      <div className="aspect-[16/7] w-full shrink-0 bg-white/[0.04] min-[420px]:aspect-auto min-[420px]:w-28 sm:w-36">
        {image ? <img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" /> : <div className="flex h-full items-center justify-center font-mono text-2xl font-bold text-cyan-100/60">HFR</div>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="font-mono text-xs text-cyan-200">{meta}</p>
        <h4 className="mt-2 text-lg font-bold text-white">{title}</h4>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{description}</p>
        {normalizedHref ? <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-cyan-200">{label} <ExternalLink className="h-3.5 w-3.5" /></span> : null}
      </div>
    </article>
  );

  return (
    <Reveal>
      {normalizedHref ? <a href={normalizedHref} target="_blank" rel="noreferrer" data-cursor="hover" aria-label={`${label}: ${title}`}>{content}</a> : content}
    </Reveal>
  );
}

function normalizeHref(value?: string | null) {
  const href = value?.trim();
  if (!href || href === "#") return "";
  if (href.startsWith("10.")) return `https://doi.org/${href}`;
  if (/^https?:\/\//i.test(href)) return href;
  return `https://${href}`;
}
