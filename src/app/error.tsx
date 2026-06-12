"use client";

import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { CONTACT_URLS } from "@/lib/contact-urls";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="site-container py-16 max-w-lg">
      <h1 className="page-title">Something went wrong</h1>
      <p className="mt-3 text-slate-600 leading-relaxed">
        The page could not load. If you opened <strong>phonefarm.cyou</strong> without{" "}
        <strong>www</strong>, use{" "}
        <a href="https://www.phonefarm.cyou" className="link-accent">www.phonefarm.cyou</a> instead.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-secondary">Home</Link>
        <Link href="/contact" className="btn-secondary">Contact sales</Link>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        WhatsApp {CONTACT.whatsapp} · Telegram {CONTACT.telegram} ·{" "}
        <a href={CONTACT_URLS.gmailCompose} className="link-accent">{CONTACT.email}</a>
      </p>
    </div>
  );
}
