import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-sm text-cyan-200">status: 404</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-7xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-slate-300">The page you are looking for was moved, renamed, or never existed.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}