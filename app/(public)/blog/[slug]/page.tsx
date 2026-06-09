import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getBlogBySlug } from "@/lib/data/public";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  return { title: blog?.seo_title || blog?.title || "Blog", description: blog?.seo_description || blog?.excerpt || undefined };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) notFound();
  const blocks = (blog.content || "").split(/\n{2,}/);

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Badge>{blog.category || "Notes"}</Badge>
      <h1 className="mt-5 text-4xl font-black text-white sm:text-6xl">{blog.title}</h1>
      <p className="mt-4 font-mono text-sm text-slate-500">{formatDate(blog.created_at)}</p>
      {blog.cover_url ? <img src={blog.cover_url} alt={blog.title} className="mt-8 rounded-2xl border border-white/10" /> : null}
      <div className="prose-lite mt-10">
        {blocks.map((block) => {
          if (block.startsWith("## ")) return <h2 key={block}>{block.replace("## ", "")}</h2>;
          if (block.startsWith("- ")) {
            return (
              <ul key={block}>
                {block.split("\n").map((item) => <li key={item}>{item.replace("- ", "")}</li>)}
              </ul>
            );
          }
          return <p key={block}>{block}</p>;
        })}
      </div>
    </article>
  );
}
