"use client";

import { useState } from "react";
import { LEGAL_USE_CASES } from "@/lib/delivery";

const CONTROL_METHODS = [
  { value: "usb", label: "USB control" },
  { value: "lan-otg", label: "LAN OTG control" },
  { value: "unsure", label: "Not sure yet" },
] as const;

const SUCCESS_MESSAGE =
  "Thank you. Our team will review your device quantity, destination, and setup requirements before replying with a quotation.";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white text-base";

export function ContactForm({
  defaultProduct = "",
  source = "contact",
  variant = "full",
}: {
  defaultProduct?: string;
  source?: string;
  variant?: "full" | "compact";
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

  const isCompact = variant === "compact";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-slate-300">Name *</span>
          <input name="name" required className={inputClass} autoComplete="name" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Email *</span>
          <input name="email" type="email" required className={inputClass} autoComplete="email" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">WhatsApp / Telegram</span>
          <input name="messaging" className={inputClass} placeholder="@handle or number" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Country / Region</span>
          <input name="country" className={inputClass} autoComplete="country-name" />
        </label>
        <label className={`block text-sm ${isCompact ? "sm:col-span-2" : ""}`}>
          <span className="text-slate-300">Product or model of interest</span>
          <input
            name="productInterest"
            defaultValue={defaultProduct}
            className={inputClass}
            placeholder="e.g. Samsung S10 Farm 8+128"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Quantity</span>
          <input name="deviceQuantity" className={inputClass} placeholder="e.g. 2 boxes / 40 nodes" />
        </label>
        <label className={`block text-sm ${isCompact ? "sm:col-span-2" : ""}`}>
          <span className="text-slate-300">Preferred control method</span>
          <select name="controlMethod" className={inputClass} defaultValue="">
            <option value="">Select…</option>
            {CONTROL_METHODS.map((m) => (
              <option key={m.value} value={m.label}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        {!isCompact && (
          <label className="block text-sm sm:col-span-2">
            <span className="text-slate-300">Use case</span>
            <select name="useCase" className={inputClass} defaultValue="">
              <option value="">Select…</option>
              {LEGAL_USE_CASES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
              <option value="Other legal B2B use">Other legal B2B use</option>
            </select>
          </label>
        )}
        {isCompact && (
          <input type="hidden" name="useCase" value="Product inquiry" />
        )}
        <label className={`block text-sm ${isCompact ? "sm:col-span-2" : "sm:col-span-2"}`}>
          <span className="text-slate-300">Message</span>
          <textarea
            name="message"
            rows={isCompact ? 3 : 4}
            className={inputClass}
            placeholder={
              isCompact
                ? "Destination, timeline, or setup questions (optional)"
                : "Apps under test, Android version needs, accessory questions…"
            }
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-cyan-600 py-3 font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send Inquiry"}
      </button>
      {status === "ok" && <p className="text-sm leading-relaxed text-emerald-400">{SUCCESS_MESSAGE}</p>}
      {status === "error" && (
        <p className="text-sm text-red-400">Failed to send. Please use WhatsApp or email directly.</p>
      )}
    </form>
  );
}
