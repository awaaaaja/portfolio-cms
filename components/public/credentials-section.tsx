import { Award, BookOpenText, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/animation/reveal";
import { ContinuousCardMarquee } from "@/components/public/continuous-card-marquee";
import { formatDate } from "@/lib/utils";
import type { Certification, Publication } from "@/types/database";

export function CredentialsSection({ certifications, publications }: { certifications: Certification[]; publications: Publication[] }) {
  return (
    <section className="py-14 sm:py-20">
      <Reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 font-mono text-sm text-cyan-200">credentials.verify()</p>
          <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">Certifications and publications</h2>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-14">
        <CredentialGroup title="Certifications" icon={<Award className="h-5 w-5" />} speed={22}>
          {certifications.map((item) => (
            <CredentialCard key={item.id} title={item.title} meta={`${item.issuer} / ${formatDate(item.issued_at)}`} description={item.description} href={item.credential_url} image={item.image_url} />
          ))}
        </CredentialGroup>
        <CredentialGroup title="Publications" icon={<BookOpenText className="h-5 w-5" />} direction="right" speed={18}>
          {publications.map((item) => (
            <CredentialCard key={item.id} title={item.title} meta={`${item.publisher || "Publication"} / ${formatDate(item.published_at)}`} description={item.description} href={item.publication_url || item.doi} image={item.cover_url} label={item.doi ? "Open DOI" : "View publication"} />
          ))}
        </CredentialGroup>
      </div>
    </section>
  );
}

function CredentialGroup({ title, icon, children, direction = "left", speed }: { title: string; icon: React.ReactNode; children: React.ReactNode; direction?: "left" | "right"; speed: number }) {
  return (
    <div className="min-w-0 border-y border-white/[0.07] bg-white/[0.015] py-7">
      <div className="mx-auto mb-6 flex max-w-7xl items-center gap-3 px-4 text-white sm:px-6 lg:px-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">{icon}</span>
        <div>
          <p className="font-mono text-xs text-cyan-200">{title.toLowerCase()}.list()</p>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
      <div className="mx-auto max-w-[100rem]">
        <ContinuousCardMarquee ariaLabel={`${title} cards`} direction={direction} speed={speed} itemClassName="w-[min(88vw,31rem)]">
          {children}
        </ContinuousCardMarquee>
      </div>
    </div>
  );
}

function CredentialCard({ title, meta, description, href, image, label = "View credential" }: { title: string; meta: string; description?: string | null; href?: string | null; image?: string | null; label?: string }) {
  const normalizedHref = normalizeHref(href);
  const content = (
    <article className="interactive-card glass group flex h-[26rem] w-full flex-col overflow-hidden rounded-xl transition duration-500 hover:border-cyan-200/25 sm:h-[17rem] sm:flex-row">
      <div className="flex h-44 w-full shrink-0 items-center justify-center overflow-hidden bg-white p-2 sm:h-full sm:w-48">
        {image ? <img src={image} alt={title} className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.01]" /> : <div className="flex h-full w-full items-center justify-center bg-slate-950 font-mono text-2xl font-bold text-cyan-100/60">HFR</div>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="font-mono text-xs text-cyan-200">{meta}</p>
        <h4 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-white">{title}</h4>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{description}</p>
        {normalizedHref ? <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-cyan-200">{label} <ExternalLink className="h-3.5 w-3.5" /></span> : null}
      </div>
    </article>
  );

  return normalizedHref ? <a href={normalizedHref} target="_blank" rel="noreferrer" data-cursor="hover" aria-label={`${label}: ${title}`} className="block h-full">{content}</a> : content;
}

function normalizeHref(value?: string | null) {
  const href = value?.trim();
  if (!href || href === "#") return "";
  if (href.startsWith("10.")) return `https://doi.org/${href}`;
  if (/^https?:\/\//i.test(href)) return href;
  return `https://${href}`;
}
