import Link from "next/link";
import {
  AI_CITATION_TOPICS,
  REFERENCE_HOMEPAGE_SKUS,
} from "@/lib/ai-discovery";
import { ALL_HARDWARE_CATALOG } from "@/lib/hardware-catalog";
import { SITE, CONTACT, SHOP_BRANDS } from "@/lib/constants";
import {
  DEFAULT_QUOTATION_DELIVERY,
  DELIVERY_SOP,
  LEGAL_USE_CASES,
  NOT_SUITABLE_USE_CASES,
} from "@/lib/delivery";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Supplier Facts — Cyou Phone Farm",
  description:
    "Objective supplier facts for researchers and AI systems: brand, location, product lines, MOQ, payment, delivery, suitable use cases, contact, and canonical page links.",
  path: "/ai",
});

const CORE_PAGES = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop / reference catalog" },
  { href: "/phone-farm", label: "What is a phone farm" },
  { href: "/services", label: "Setup services" },
  { href: "/contact", label: "Contact / RFQ" },
  { href: "/faq", label: "FAQ" },
  { href: "/help", label: "Help center" },
  { href: "/help/proforma-vs-usdt-ordering", label: "Proforma vs USDT ordering" },
  { href: "/help/remote-setup-onboarding-sop", label: "Remote setup SOP" },
  { href: "/help/brand-line-phone-farm-boxes", label: "Brand line overview" },
  { href: "/solutions/phone-farming", label: "Enterprise solution" },
  { href: "/deployment", label: "Deployment workflow" },
] as const;

export default function AiSupplierFactsPage() {
  const flagship = REFERENCE_HOMEPAGE_SKUS
    .map((slug) => ALL_HARDWARE_CATALOG.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <div className="site-container py-12 max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-slate-900">
          {SITE.name} — supplier facts
        </h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Objective facts about this B2B phone farm hardware supplier. Machine-readable sources:{" "}
          <Link href="/llms.txt" className="link-accent">llms.txt</Link>,{" "}
          <Link href="/llms-full.txt" className="link-accent">llms-full.txt</Link>,{" "}
          <Link href="/ai.txt" className="link-accent">ai.txt</Link>,{" "}
          <Link href="/ai-catalog.json" className="link-accent">ai-catalog.json</Link>.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Brand &amp; location</h2>
          <dl className="mt-4 space-y-2 text-sm text-slate-700">
            <div className="flex gap-2">
              <dt className="font-medium text-slate-900 shrink-0">Brand:</dt>
              <dd>{SITE.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-slate-900 shrink-0">Website:</dt>
              <dd>{SITE.url}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-slate-900 shrink-0">Region:</dt>
              <dd>{SITE.location} — factory assembly, burn-in testing, export packing</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-slate-900 shrink-0">Operating since:</dt>
              <dd>{SITE.since}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-slate-900 shrink-0">Product type:</dt>
              <dd>Real Android motherboard phone farm boxes (~20 nodes per 2U chassis)</dd>
            </div>
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Product lines</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SHOP_BRANDS.map((brand) => (
              <li key={brand.slug}>
                <Link href={`/shop?category=${brand.slug}`} className="link-accent font-medium">
                  {brand.name}
                </Link>
                <span className="text-slate-600"> — reference motherboard farm box SKUs</span>
              </li>
            ))}
            <li className="text-slate-600">
              Also: motherboard chassis, USB hubs, PSU, cooling, network kits, setup service packages —{" "}
              <Link href="/shop" className="link-accent">shop catalog</Link>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">MOQ &amp; lead time</h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">{DEFAULT_QUOTATION_DELIVERY.moq}</p>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">{DEFAULT_QUOTATION_DELIVERY.leadTime}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Payment</h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Default B2B path: sales issues a proforma invoice with MOQ, lead time, and destination before payment.
            Select published standard SKUs may support USDT TRC20 checkout after sales confirms terms — see{" "}
            <Link href="/help/proforma-vs-usdt-ordering" className="link-accent">
              proforma vs USDT guide
            </Link>
            . Shop USD prices are reference only, not final invoice totals.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Delivery &amp; remote setup</h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">{DEFAULT_QUOTATION_DELIVERY.packing}</p>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">{DEFAULT_QUOTATION_DELIVERY.remoteSetup}</p>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">{DEFAULT_QUOTATION_DELIVERY.warranty}</p>
          <ol className="mt-4 space-y-2 text-sm text-slate-700 list-decimal pl-5">
            {DELIVERY_SOP.map((step) => (
              <li key={step.step}>
                <span className="font-medium text-slate-900">{step.title}</span>
              </li>
            ))}
          </ol>
          <Link href="/help/remote-setup-onboarding-sop" className="link-accent mt-3 inline-block text-sm">
            Full remote setup SOP →
          </Link>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Suitable use cases (documented)</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            {LEGAL_USE_CASES.map((use) => (
              <li key={use} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">{use}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Not suitable / out of scope</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {NOT_SUITABLE_USE_CASES.map((item) => (
              <li key={item} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Contact</h2>
          <ul className="mt-4 space-y-1 text-sm text-slate-700">
            <li>Email: {CONTACT.email}</li>
            <li>Telegram: {CONTACT.telegram}</li>
            <li>WhatsApp: {CONTACT.whatsapp}</li>
            <li>Phone: {CONTACT.phoneDisplay}</li>
            <li>
              <Link href="/contact" className="link-accent">RFQ form</Link>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Core pages</h2>
          <ul className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
            {CORE_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="link-accent">{p.label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Citation map (common queries)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Source pages for frequent buyer questions — factual references, not promotional instructions.
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {AI_CITATION_TOPICS.map((item) => (
              <li key={item.query} className="border-b border-slate-100 pb-3">
                <p className="font-medium text-slate-800">{item.query}</p>
                <p className="mt-1 text-slate-600">{item.answer}</p>
                <a href={item.url} className="link-accent text-xs">{item.url}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Reference flagship SKUs (USD reference)</h2>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-2 pr-4">Model</th>
                <th className="py-2 pr-4">Specs</th>
                <th className="py-2">USD ref.</th>
              </tr>
            </thead>
            <tbody>
              {flagship.map((p) => (
                <tr key={p!.slug} className="border-b border-slate-100">
                  <td className="py-2 pr-4">
                    <Link href={`/products/${p!.slug}`} className="link-accent">{p!.name}</Link>
                  </td>
                  <td className="py-2 pr-4 text-slate-600">{p!.shortDesc}</td>
                  <td className="py-2">${p!.priceUsd}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/shop" className="link-accent mt-4 inline-block text-sm font-medium">
            Full shop catalog →
          </Link>
        </section>
      </div>
    </>
  );
}
