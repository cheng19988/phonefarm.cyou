"use client";

import Link from "next/link";
import { ContactBar } from "@/components/ContactBar";
import { PUBLIC_CHECKOUT_ENABLED } from "@/lib/features";

export default function CartPage() {
  if (!PUBLIC_CHECKOUT_ENABLED) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Request a quote instead</h1>
        <p className="mt-4 text-slate-400">
          Cyou Phone Farm processes hardware orders through sales — not automated checkout. Share your model list,
          quantity, and country so we can confirm pricing, lead time, and shipping.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="rounded-lg bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-500">
            Request a Quote
          </Link>
          <Link href="/shop" className="rounded-lg border border-slate-600 px-6 py-3 text-slate-200">
            Browse catalog
          </Link>
        </div>
        <div className="mt-8">
          <ContactBar />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-400">
      Cart checkout is disabled. <Link href="/contact" className="text-cyan-400">Contact sales</Link>.
    </div>
  );
}
