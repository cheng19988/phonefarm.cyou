"use client";

import { useState } from "react";

export function ContactForm({
  defaultProduct = "",
  source = "contact",
}: {
  defaultProduct?: string;
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, source }),
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-slate-300">Name *</span>
          <input name="name" required className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Country</span>
          <input name="country" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">WhatsApp / Telegram</span>
          <input name="messaging" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Phone</span>
          <input name="phone" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-slate-300">Email *</span>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Device Quantity</span>
          <input name="deviceQuantity" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Product Interest</span>
          <input name="productInterest" defaultValue={defaultProduct} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-slate-300">Budget</span>
          <input name="budget" className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-slate-300">Message</span>
          <textarea name="message" rows={4} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-cyan-600 py-3 font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send to Sales"}
      </button>
      {status === "ok" && <p className="text-sm text-emerald-400">Submitted. We will reply within 24 hours.</p>}
      {status === "error" && <p className="text-sm text-red-400">Failed to send. Please use WhatsApp or email directly.</p>}
    </form>
  );
}
