import Link from "next/link";
import { SERVICE_PACKAGES, SITE, CONTACT } from "@/lib/constants";
import { PACKAGE_DETAILS } from "@/lib/packageDetails";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service Packages & Quotes",
  description: "Starter, Studio Pro, and Enterprise phone farm setup packages — deliverables, timeline, and support from Cyou Phone Farm.",
  path: "/services/packages",
});

export default function ServicePackagesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Service packages</h1>
      <p className="mt-2 max-w-3xl text-slate-400">
        Implementation scope for {SITE.name} — distinct from the hardware catalog. All packages are quoted in USD and
        confirmed by sales before work begins.
      </p>

      <div className="mt-12 space-y-10">
        {SERVICE_PACKAGES.map((pkg) => {
          const detail = PACKAGE_DETAILS.find((d) => d.slug === pkg.slug);
          return (
            <article key={pkg.slug} className="rounded-2xl border border-slate-800 p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{pkg.name}</h2>
                  <p className="mt-2 text-2xl font-bold text-cyan-400">
                    {pkg.priceFrom > 0 ? `From $${pkg.priceFrom} reference` : "Custom quote"}
                  </p>
                </div>
                <Link
                  href={`/contact?product=${encodeURIComponent(pkg.name)}`}
                  className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-medium text-white hover:bg-cyan-500"
                >
                  Get package quote
                </Link>
              </div>
              {detail && (
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-sm">
                  <div>
                    <h3 className="font-semibold text-white">Deliverables</h3>
                    <ul className="mt-2 space-y-1 text-slate-400">
                      {detail.deliverables.map((d) => (
                        <li key={d}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Timeline</h3>
                    <p className="mt-2 text-slate-400">{detail.timeline}</p>
                    <h3 className="mt-4 font-semibold text-white">Support period</h3>
                    <p className="mt-2 text-slate-400">{detail.supportPeriod}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Best for</h3>
                    <p className="mt-2 text-slate-400">{detail.bestFor}</p>
                    <h3 className="mt-4 font-semibold text-white">Not included</h3>
                    <ul className="mt-2 space-y-1 text-slate-500">
                      {detail.notIncluded.map((n) => (
                        <li key={n}>• {n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-slate-500">
        Direct line: {CONTACT.telegram} · {CONTACT.whatsapp} · {CONTACT.email}
      </p>
      <div className="mt-8 max-w-xl">
        <ContactForm source="packages" variant="full" />
      </div>
    </div>
  );
}
