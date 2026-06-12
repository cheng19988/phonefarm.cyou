import Link from "next/link";
import { SITE } from "@/lib/constants";
import { LEGAL_USE_CASES, RFQ_PLATFORM_OPTIONS } from "@/lib/delivery";
import { submitContactForm } from "@/app/actions/contact";

const CONNECTION_MODES = [
  { value: "usb", label: "USB screen projection" },
  { value: "lan-otg", label: "LAN OTG (TCP 5555)" },
  { value: "unsure", label: "Not sure — advise me" },
] as const;

export function ContactForm({
  defaultProduct = "",
  productSlug = "",
  intent = "",
  source = "contact",
  variant = "full",
  showIntro = true,
  returnPath = "/contact",
}: {
  defaultProduct?: string;
  productSlug?: string;
  intent?: "sample" | "quote" | "";
  source?: string;
  variant?: "full" | "compact";
  showIntro?: boolean;
  returnPath?: string;
}) {
  const defaultMessage =
    intent === "sample"
      ? "I would like to evaluate one sample box before a bulk order. Please advise MOQ for samples, lead time, and export packing to my country."
      : "";

  const isCompact = variant === "compact";

  return (
    <div>
      {showIntro && (
        <div className="mb-6 border-b border-slate-100 pb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            {intent === "sample" ? "Request a sample evaluation" : "Request a quotation (RFQ)"}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Guangzhou factory-direct brand-line motherboard farms — Samsung, Oppo, Xiaomi, OnePlus, and Pixel reference
            SKUs. We reply with a written BOM, MOQ, burn-in QC scope, export packing, and proforma invoice before any
            payment.
          </p>
        </div>
      )}

      <form action={submitContactForm} className="space-y-6">
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="returnPath" value={returnPath} />
        {productSlug && <input type="hidden" name="productSlug" value={productSlug} />}

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-slate-800">Your details</legend>
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
              <input
                name="messaging"
                className="form-input"
                placeholder="Phone number or @username — fastest follow-up"
                autoComplete="tel"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Shipping country *</span>
              <input name="country" required className="form-input" autoComplete="country-name" />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-slate-800">Hardware &amp; setup</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={`form-field ${isCompact ? "sm:col-span-2" : ""}`}>
              <span className="form-label">Product interest</span>
              <input
                name="productInterest"
                defaultValue={defaultProduct}
                className="form-input"
                placeholder="e.g. Samsung S10 Farm 8+128 · 20 nodes"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Quantity / node count</span>
              <input name="deviceQuantity" className="form-input" placeholder="e.g. 2 boxes (40 nodes)" />
            </label>
            <label className="form-field">
              <span className="form-label">Platform</span>
              <select name="platform" className="form-input" defaultValue="">
                <option value="">Select brand line or scope…</option>
                {RFQ_PLATFORM_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Connection mode</span>
              <select name="controlMethod" className="form-input" defaultValue="">
                <option value="">Select connection path…</option>
                {CONNECTION_MODES.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Budget (optional)</span>
              <input name="budget" className="form-input" placeholder="e.g. USD 8,000 hardware budget" />
            </label>
            {!isCompact && (
              <label className="form-field sm:col-span-2">
                <span className="form-label">Primary use case</span>
                <select name="useCase" className="form-input" defaultValue="">
                  <option value="">Select use case…</option>
                  {LEGAL_USE_CASES.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
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
                defaultValue={defaultMessage}
                placeholder="Apps under test, Android versions, accessories, timeline, warranty needs…"
              />
            </label>
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            name="privacyConsent"
            value="on"
            required
            className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-600"
          />
          <span>
            I agree that {SITE.name} may use my details to respond to this inquiry. See our{" "}
            <Link href="/privacy" className="link-accent font-medium">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <button type="submit" className="btn-primary w-full py-3">
          Request quotation
        </button>

        <p className="text-xs text-slate-500 leading-relaxed">
          Shop and checkout show USD reference prices only. Sales confirms configuration, MOQ, export packing, and
          proforma totals before payment.
        </p>
      </form>
    </div>
  );
}
