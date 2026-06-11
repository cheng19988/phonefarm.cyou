import Image from "next/image";
import Link from "next/link";
import { SERVICES, SITE, CONTROL_SOFTWARE_OPTIONS, CONTROL_SOFTWARE_DISCLAIMER, CONTROL_SETUP_SERVICES } from "@/lib/constants";
import { PAGE_IMAGES } from "@/lib/images";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Setup Services - Remote Control & Group Control",
  description:
    "One-stop phone farm setup, remote control configuration, group control onboarding, deployment, enterprise bulk, samples, and overseas support from Guangzhou.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title="Setup Services"
            subtitle={`${SITE.name} delivers full phone farm projects in ${SITE.location} - hardware, control software configuration, and handover.`}
          />
          <div className="mt-6">
            <Link href="/services/packages" className="text-sm font-medium text-amber-700 hover:text-amber-600">
              View service packages
            </Link>
          </div>
        </div>
      </section>

      <div className="site-container py-12">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white aspect-[16/7] max-h-[22rem]">
          <Image
            src={PAGE_IMAGES.servicesBanner}
            alt="Phone farm honeycomb chassis with motherboard trays"
            fill
            className="object-contain p-4"
            sizes="(max-width:1280px) 100vw, 1200px"
          />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.slug} id={s.slug} className="card-premium p-6 scroll-mt-24">
              <h2 className="font-display text-lg font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-sky-700 hover:text-sky-600">
                Request service
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-16">
          <SectionHeading title="Control setup packages" subtitle="Reference-style onboarding - we configure, you license." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONTROL_SETUP_SERVICES.map((s) => (
              <div key={s.slug} className="card-premium p-5">
                <h3 className="font-semibold text-slate-900">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                <p className="mt-3 font-display text-lg font-bold text-sky-700">
                  {s.priceFrom > 0 ? `From $${s.priceFrom}` : "Custom quote"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm text-slate-500">{CONTROL_SOFTWARE_DISCLAIMER}</p>
          <h2 className="mt-6 font-display text-xl font-bold text-slate-900">Control stacks we configure</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CONTROL_SOFTWARE_OPTIONS.map((o) => (
              <div key={o.slug} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-slate-900">{o.name}</p>
                <p className="mt-1 text-sm text-slate-600">{o.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link href="/help/control-software-types" className="text-sky-700 hover:underline">
              Control software types guide
            </Link>
            <span className="mx-2 text-slate-400">|</span>
            <Link href="/help" className="text-sky-700 hover:underline">
              Help Center
            </Link>
          </p>
        </section>

        <section className="mt-16 rounded-xl border border-sky-200 bg-sky-50 p-8">
          <h2 className="text-xl font-bold text-slate-900">Discuss your project</h2>
          <p className="mt-2 text-slate-600">Share node count, destination, apps, and control method for a scoped quote.</p>
          <div className="mt-6 max-w-xl">
            <ContactForm source="services" variant="full" />
          </div>
        </section>
      </div>
    </div>
  );
}
