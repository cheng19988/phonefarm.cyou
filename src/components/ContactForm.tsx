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
        <label className="form-field">
          <span className="form-label">Name *</span>
          <input name="name" required className="form-input" autoComplete="name" />
        </label>
        <label className="form-field">
          <span className="form-label">Email *</span>
          <input name="email" type="email" required className="form-input" autoComplete="email" />
        </label>
        <label className="form-field">
          <span className="form-label">WhatsApp / Telegram</span>
          <input name="messaging" className="form-input" placeholder="@handle or number" />
        </label>
        <label className="form-field">
          <span className="form-label">Country / Region</span>
          <input name="country" className="form-input" autoComplete="country-name" />
        </label>
        <label className={`form-field ${isCompact ? "sm:col-span-2" : ""}`}>
          <span className="form-label">Product or model of interest</span>
          <input
            name="productInterest"
            defaultValue={defaultProduct}
            className="form-input"
            placeholder="e.g. Samsung S10 Farm 8+128"
          />
        </label>
        <label className="form-field">
          <span className="form-label">Quantity</span>
          <input name="deviceQuantity" className="form-input" placeholder="e.g. 2 boxes / 40 nodes" />
        </label>
        <label className={`form-field ${isCompact ? "sm:col-span-2" : ""}`}>
          <span className="form-label">Preferred control method</span>
          <select name="controlMethod" className="form-input" defaultValue="">
            <option value="">Select…</option>
            {CONTROL_METHODS.map((m) => (
              <option key={m.value} value={m.label}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        {!isCompact && (
          <label className="form-field sm:col-span-2">
            <span className="form-label">Use case</span>
            <select name="useCase" className="form-input" defaultValue="">
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
        {isCompact && <input type="hidden" name="useCase" value="Product inquiry" />}
        <label className="form-field sm:col-span-2">
          <span className="form-label">Message</span>
          <textarea
            name="message"
            rows={isCompact ? 3 : 4}
            className="form-input"
            placeholder={
              isCompact
                ? "Destination, timeline, or setup questions (optional)"
                : "Apps under test, Android version needs, accessory questions…"
            }
          />
        </label>
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-3 disabled:opacity-50">
        {status === "loading" ? "Sending…" : "Send Inquiry"}
      </button>
      {status === "ok" && <p className="form-success leading-relaxed">{SUCCESS_MESSAGE}</p>}
      {status === "error" && (
        <p className="form-error">Failed to send. Please use WhatsApp or email directly.</p>
      )}
    </form>
  );
}
