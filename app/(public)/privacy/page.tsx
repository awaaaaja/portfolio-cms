import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Privacy Policy</h1>
      <div className="prose-lite mt-8">
        <p>This site collects only the information you choose to submit through the contact form: your name, email, and message. It is used solely to respond to your inquiry and is never sold or shared.</p>
        <p>Pages load no advertising trackers. Analytics, if enabled, are aggregated and do not identify you personally.</p>
        <p>To request deletion of your data, email the address shown on the contact page.</p>
      </div>
    </section>
  );
}