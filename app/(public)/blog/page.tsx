import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getBlogs } from "@/lib/data/public";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-3 font-mono text-sm uppercase text-cyan-200">blog.published()</p>
      <h1 className="text-4xl font-black text-white sm:text-6xl">Blog</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`} className="glass overflow-hidden rounded-2xl transition hover:border-cyan-300/40 hover:shadow-neon" data-cursor="hover">
            <div className="aspect-[16/10] bg-white/[0.05]">
              {blog.cover_url ? <img src={blog.cover_url} alt={blog.title} className="h-full w-full object-cover" /> : null}
            </div>
            <div className="p-5">
              <Badge>{blog.category || "Notes"}</Badge>
              <h2 className="mt-4 text-xl font-bold text-white">{blog.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{blog.excerpt}</p>
              <p className="mt-4 font-mono text-xs text-slate-500">{formatDate(blog.created_at)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
