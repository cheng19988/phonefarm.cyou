import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms of service for B2B sales and setup services from ${SITE.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-farm">
      <h1>Terms of Service</h1>
      <p className="text-slate-400">Last updated: June 2026 · {SITE.name}</p>

      <h2>1. Scope</h2>
      <p>
        These terms apply to business-to-business purchases of hardware, accessories, and professional setup services
        from {SITE.name}. By submitting an inquiry or placing an order you agree to these terms unless a signed
        purchase order states otherwise.
      </p>

      <h2>2. Quotes and pricing</h2>
      <p>
        List prices on phonefarm.cyou are reference values in USD. Final pricing, MOQ, lead time, and shipping cost are
        confirmed in writing by sales before payment. We are not bound by website display errors or stock indicators.
      </p>

      <h2>3. Orders and payment</h2>
      <p>
        Orders are confirmed after sales acceptance and receipt of payment per the proforma invoice. We accept methods
        stated on the proforma invoice (bank transfer or other agreed B2B channels). Title passes upon full payment unless
        credit terms are signed separately.
      </p>

      <h2>4. Shipping and import</h2>
      <p>
        We ship from Guangzhou, China via express carriers. Buyer is responsible for import duties, taxes, and customs
        clearance unless DDP is explicitly quoted. Risk of loss transfers to buyer when the carrier accepts the
        shipment unless otherwise agreed.
      </p>

      <h2>5. Inspection and warranty</h2>
      <p>
        Report visible shipping damage within 7 days of delivery with photos. Hardware carries a 90-day defect warranty
        from delivery date covering manufacturing faults under normal use. Warranty excludes misuse, unauthorized ROM
        flashes, hub overload, or environmental damage.
      </p>

      <h2>6. Setup services</h2>
      <p>
        Remote configuration services are delivered via screenshare and messaging channels. Customer must provide control
        PC access, network details, and timely responses. We configure customer-selected software; we do not resell
        third-party licenses unless explicitly listed on the invoice.
      </p>

      <h2>7. Acceptable use</h2>
      <p>
        Customer agrees to use hardware and services for lawful B2B purposes including app QA testing, mobile device
        labs, compatibility testing, enterprise device fleet management, and remote device management. We do not provide
        fraud services, inauthentic engagement manipulation, ad-click manipulation, platform bypass tools, or social-media manipulation
        programs. We may refuse or cancel orders that violate export control, applicable law, or these use boundaries.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, our liability is limited to the amount paid for the specific order
        giving rise to the claim. We are not liable for indirect, consequential, or lost-profit damages.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the People&apos;s Republic of China unless mandatory local consumer
        law applies to your jurisdiction. Disputes shall first be resolved through good-faith negotiation.
      </p>

      <h2>10. Contact</h2>
      <p>
        {CONTACT.email} · {CONTACT.phoneDisplay} · {CONTACT.telegram}
      </p>
    </div>
  );
}
