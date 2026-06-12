import { LEGAL_USE_CASES } from "@/lib/delivery";
import { submitContactForm } from "@/app/actions/contact";

const CONTROL_METHODS = [
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
            {intent === "sample" ? "Request a sample evaluation" : "Request a quotation"}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Tell us node count, destination country, and how you plan to connect devices (USB or LAN). We reply from
            Guangzhou within one business day.
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
              <span className="form-label">Full name *</span>
              <input name="name" required className="form-input" autoComplete="name" />
            </label>
            <label className="form-field">
              <span className="form-label">Work email *</span>
              <input name="email" type="email" required className="form-input" autoComplete="email" />
            </label>
            <label className="form-field">
              <span className="form-label">WhatsApp or Telegram</span>
              <input
                name="messaging"
                className="form-input"
                placeholder="Preferred for fast follow-up"
                autoComplete="tel"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Ship-to country *</span>
              <input name="country" required className="form-input" autoComplete="country-name" />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-slate-800">Hardware &amp; setup</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={`form-field ${isCompact ? "sm:col-span-2" : ""}`}>
              <span className="form-label">Phone farm model</span>
              <input
                name="productInterest"
                defaultValue={defaultProduct}
                className="form-input"
                placeholder="e.g. Samsung S10 Farm 8+128"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Quantity</span>
              <input name="deviceQuantity" className="form-input" placeholder="e.g. 2 boxes (40 nodes)" />
            </label>
            <label className={`form-field ${isCompact ? "sm:col-span-2" : ""}`}>
              <span className="form-label">Control method</span>
              <select name="controlMethod" className="form-input" defaultValue="">
                <option value="">Select control path…</option>
                {CONTROL_METHODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
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
              <span className="form-label">Project notes</span>
              <textarea
                name="message"
                rows={isCompact ? 3 : 4}
                className="form-input"
                defaultValue={defaultMessage}
                placeholder="Apps under test, Android versions needed, accessories, timeline…"
              />
            </label>
          </div>
        </fieldset>

        <button type="submit" className="btn-primary w-full py-3">
          Request quotation
        </button>

        <p className="text-xs text-slate-500 leading-relaxed">
          We use your details only to respond to this inquiry. Bulk orders receive a proforma invoice before payment.
        </p>
      </form>
    </div>
  );
}
