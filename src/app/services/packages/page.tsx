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
      <h1 className="page-title">Service packages</h1>
      <p className="page-lead">
        Implementation scope for {SITE.name} — distinct from the hardware catalog. All packages are quoted in USD and
        confirmed by sales before work begins.
      </p>

      <div className="mt-12 space-y-10">
        {SERVICE_PACKAGES.map((pkg) => {
          const detail = PACKAGE_DETAILS.find((d) => d.slug === pkg.slug);
          return (
            <article key={pkg.slug} className="card-premium p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{pkg.name}</h2>
                  <p className="mt-2 text-2xl font-bold text-sky-700">
                    {pkg.priceFrom > 0 ? `From $${pkg.priceFrom} reference` : "Custom quote"}
                  </p>
                </div>
                <Link
                  href={`/contact?product=${encodeURIComponent(pkg.name)}`}
                  className="btn-primary text-sm !py-2 !px-5"
                >
                  Get package quote
                </Link>
              </div>
              {detail && (
                <div className="mt-8 grid gap-6 text-sm md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Deliverables</h3>
                    <ul className="mt-2 space-y-1 text-slate-600">
                      {detail.deliverables.map((d) => (
                        <li key={d}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Timeline</h3>
                    <p className="mt-2 text-slate-600">{detail.timeline}</p>
                    <h3 className="mt-4 font-semibold text-slate-900">Support period</h3>
                    <p className="mt-2 text-slate-600">{detail.supportPeriod}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Best for</h3>
                    <p className="mt-2 text-slate-600">{detail.bestFor}</p>
                    <h3 className="mt-4 font-semibold text-slate-900">Not included</h3>
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
      <div className="mt-8 max-w-xl card-premium p-6">
        <ContactForm source="packages" variant="full" />
      </div>
    </div>
  );
}
