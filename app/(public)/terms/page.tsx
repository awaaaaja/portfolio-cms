import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Terms of Service</h1>
      <div className="prose-lite mt-8">
        <p>Content on this site is provided for informational purposes. Projects shown represent past or ongoing work unless stated otherwise.</p>
        <p>You may reference code examples from this site with attribution. Contact the owner before republishing content in full.</p>
        <p>Testimonials reflect the views of their authors. The site is not liable for third-party content or external links.</p>
      </div>
    </section>
  );
}