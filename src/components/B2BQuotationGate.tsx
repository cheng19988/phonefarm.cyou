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
  checkoutLabel = "Sales already confirmed configuration? Continue to standard online order",
}: Props) {
  const [showTools, setShowTools] = useState(false);

  if (showTools && children) {
    return (
      <div>
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="site-container py-3 text-sm text-slate-600">
            Standard online checkout for published SKUs. Bulk or custom orders should use{" "}
            <Link href="/contact" className="link-accent font-medium">request quotation</Link> first.
            <button type="button" onClick={() => setShowTools(false)} className="link-accent ml-2 font-medium">
              Back
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
          Cyou Phone Farm ships brand-line motherboard farms from our Guangzhou factory — Samsung, Oppo, Xiaomi,
          OnePlus, and Pixel reference SKUs. Most buyers start with an RFQ: written BOM, burn-in QC scope, export
          packing, and proforma invoice before any payment. Shop prices are reference only.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Request quotation</Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-emerald"
          >
            WhatsApp sales
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
        <p className="mt-6 text-sm text-slate-500 leading-relaxed">
          Reference price · final quote confirmed before payment. Online checkout is not for unconfirmed configurations.
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
