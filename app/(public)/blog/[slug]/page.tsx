import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { getBlogBySlug } from "@/lib/data/public";
import { formatDate } from "@/lib/utils";
import { env } from "@/lib/env";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return {};
  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description || blog.excerpt,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.seo_description || blog.excerpt || undefined,
      url: `/blog/${blog.slug}`,
      images: blog.cover_url ? [{ url: blog.cover_url }] : undefined,
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at || undefined
    }
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    image: blog.cover_url || undefined,
    url: `${env.siteUrl}/blog/${blog.slug}`,
    mainEntityOfPage: `${env.siteUrl}/blog/${blog.slug}`
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Badge>{blog.category || "Notes"}</Badge>
      <h1 className="mt-5 text-4xl font-black text-white sm:text-6xl">{blog.title}</h1>
      <p className="mt-4 font-mono text-sm text-slate-500">{formatDate(blog.created_at)}</p>
      {blog.cover_url ? <img src={blog.cover_url} alt={blog.title} className="mt-8 rounded-2xl border border-white/10" /> : null}
      <div className="prose prose-invert prose-cyan mt-10 max-w-none break-words prose-headings:scroll-mt-24 prose-headings:font-black prose-headings:text-white prose-a:text-cyan-200 prose-a:no-underline hover:prose-a:text-cyan-100 prose-blockquote:border-cyan-300 prose-blockquote:text-slate-300 prose-code:break-words prose-code:text-cyan-100 prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-950 prose-img:mx-auto prose-img:max-h-[36rem] prose-img:rounded-xl prose-img:object-contain prose-hr:border-white/10 prose-strong:text-white prose-table:min-w-[560px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ children, ...props }) => <a {...props} target="_blank" rel="noreferrer">{children}</a>,
            table: ({ children }) => <div className="max-w-full overflow-x-auto"><table>{children}</table></div>
          }}
        >
          {blog.content || ""}
        </ReactMarkdown>
      </div>
    </article>
  );
}
