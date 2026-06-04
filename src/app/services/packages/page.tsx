import Link from "next/link";
import { SERVICE_PACKAGES, SITE, CONTACT } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service Packages & Quotes",
  description: "Starter, Studio Pro, and Enterprise phone farm setup packages from Cyou Phone Farm.",
  path: "/services/packages",
});

export default function ServicePackagesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Service Packages</h1>
      <p className="mt-2 text-slate-400">
        Hardware + software + support bundles from {SITE.name}. Enterprise tiers are quoted.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {SERVICE_PACKAGES.map((pkg) => (
          <div key={pkg.slug} className="rounded-xl border border-slate-800 p-6">
            <h2 className="text-xl font-semibold text-white">{pkg.name}</h2>
            <p className="mt-2 text-2xl font-bold text-cyan-400">
              {pkg.priceFrom > 0 ? `From $${pkg.priceFrom}` : "Custom quote"}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {pkg.includes.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
            <Link
              href={`/contact?product=${encodeURIComponent(pkg.name)}`}
              className="mt-6 inline-block rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-500"
            >
              Get Quote
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-slate-500">
        Or message us: {CONTACT.telegram} · {CONTACT.whatsapp}
      </p>
      <div className="mt-8 max-w-xl">
        <ContactForm source="packages" />
      </div>
    </div>
  );
}
