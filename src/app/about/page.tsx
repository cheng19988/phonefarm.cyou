import Link from "next/link";
import { SITE, CONTACT, TRUST_POINTS, DEPLOYMENT_STEPS } from "@/lib/constants";
import { FACILITY_GALLERY } from "@/lib/images";
import { FacilityPhoto } from "@/components/FacilityPhoto";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_URLS } from "@/lib/contact-urls";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata({
  title: "About Cyou Phone Farm - Guangzhou Factory Since 2017",
  description:
    "Guangzhou manufacturer of real-device phone farm boxes since 2017. Factory assembly, burn-in QC, export packing, Samsung–Pixel brand lines, remote control setup, and worldwide B2B shipping.",
  path: "/about",
  keywords: [
    "phone farm manufacturer",
    "phone farm factory China",
    "Guangzhou phone farm",
    "motherboard box supplier",
  ],
});

export default function AboutPage() {
  return (
    <div className="bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title={`About ${SITE.name}`}
            subtitle={`Guangzhou factory | Real-device phone farms since ${SITE.since} | Assembly, burn-in, export, and remote setup support.`}
          />
        </div>
      </section>

      <div className="site-container py-12">
        <div className="prose-farm max-w-3xl">
          <h2>Who we are</h2>
          <p>
            {SITE.name} manufactures and ships real-device phone farm hardware from Guangzhou. Since {SITE.since}, we have
            assembled motherboard chassis for overseas QA teams, mobile device labs, hardware distributors, and enterprise
            fleets who need documented configurations - not anonymous mystery boxes.
          </p>
          <h2>What we supply</h2>
          <ul>
            <li>Samsung, Xiaomi, OPPO, OnePlus, and Pixel motherboard farm boxes (20 nodes per standard chassis)</li>
            <li>Change / Super Change generations where listed on shop</li>
            <li>20-slot chassis trays, adaptive PSU, quad-fan cooling, industrial USB hubs, gigabit network kits</li>
            <li>Remote control configuration (USB, LAN OTG, WiFi handoff) on customer-licensed software</li>
            <li>Group control onboarding, batch APK policy, and enterprise deployment commissioning</li>
            <li>Export packing, burn-in serial sheets, commercial invoice support, spare parts from Guangzhou stock</li>
          </ul>
          <h2>How we work</h2>
          <p>
            Every project follows a written sequence: requirement confirmation, hardware selection, assembly validation,
            control software baseline, burn-in, export packing, and remote handover. Reference USD prices on the website are
            starting points; sales confirms MOQ, lead time, and proforma invoice before payment.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.slice(0, 8).map((t) => (
            <div key={t.title} className="card-premium p-5">
              <h3 className="font-semibold text-slate-900">{t.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading title="Six-step deployment" subtitle="From discovery to after-sales support." actionHref="/deployment" actionLabel="Full workflow" />
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DEPLOYMENT_STEPS.map((s) => (
              <li key={s.step} className="card-premium p-5">
                <span className="text-xs font-bold uppercase tracking-wide text-sky-600">Step {s.step}</span>
                <h3 className="mt-1 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <DeliverySopSection />
        </div>

        <div className="prose-farm mt-16 max-w-3xl">
          <h2>Lawful B2B use cases</h2>
          <p>
            We support app QA testing, device compatibility labs, enterprise device fleet management, and authorized client
            testing on owned hardware. We decline fraud, platform manipulation, and ban-evasion inquiries.
          </p>
          <h2>Contact</h2>
          <ul>
            <li>WhatsApp: <a href={CONTACT.whatsappUrl}>{CONTACT.whatsapp}</a></li>
            <li>Telegram: <a href={CONTACT.telegramUrl}>{CONTACT.telegram}</a></li>
            <li>
              Email:{" "}
              <a href={CONTACT_URLS.gmailCompose} target="_blank" rel="noopener noreferrer">
                {CONTACT.email}
              </a>
            </li>
          </ul>
          <p><Link href="/contact">Send a structured inquiry</Link></p>
        </div>

        <div className="mt-16">
          <SectionHeading title="Guangzhou facilities" subtitle="Assembly, burn-in testing, and export packing." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITY_GALLERY.map((photo) => (
              <FacilityPhoto key={photo.key} src={photo.src} alt={photo.alt} label={photo.label} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
