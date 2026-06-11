"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { CONTACT } from "@/lib/constants";
import { CONTACT_URLS } from "@/lib/contact-urls";
import { PUBLIC_CHECKOUT_ENABLED } from "@/lib/features";

type Props = {
  title: string;
  children?: ReactNode;
  checkoutLabel?: string;
};

export function B2BQuotationGate({
  title,
  children,
  checkoutLabel = "Continue with standard online order tools",
}: Props) {
  const [showTools, setShowTools] = useState(false);

  if (showTools && children) {
    return (
      <div>
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="site-container py-3 text-sm text-slate-600">
            Bulk quotes, custom configurations, and export questions should go through sales first.
            <button type="button" onClick={() => setShowTools(false)} className="link-accent ml-2 font-medium">
              Back to quotation overview
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="site-container py-12 lg:py-16">
      <div className="mx-auto max-w-2xl card-premium p-8 lg:p-10">
        <h1 className="page-title">{title}</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          This website is configured for B2B quotation. Please contact our sales team for pricing, availability, MOQ,
          lead time, and payment instructions before bulk orders.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Request Quote</Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-emerald"
          >
            WhatsApp Sales
          </a>
          <a
            href={CONTACT.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Telegram
          </a>
          <a
            href={CONTACT_URLS.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Email sales
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Reference USD prices on the shop are starting points. Sales confirms configuration and proforma invoice before
          payment.
        </p>
        {PUBLIC_CHECKOUT_ENABLED && children && (
          <button
            type="button"
            onClick={() => setShowTools(true)}
            className="mt-6 text-sm font-medium text-sky-700 hover:text-sky-600"
          >
            {checkoutLabel}
          </button>
        )}
      </div>
    </div>
  );
}
