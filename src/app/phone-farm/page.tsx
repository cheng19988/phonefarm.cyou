import Image from "next/image";
import Link from "next/link";
import { ContactBar } from "@/components/ContactBar";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { LEGAL_USE_CASES } from "@/lib/delivery";
import { PAGE_IMAGES } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "What Is a Phone Farm? —Real-Device Android Labs",
  description:
    "Learn how factory-built phone farms work: motherboard chassis, USB/LAN control, QA testing, and enterprise device labs from Guangzhou since 2017.",
  path: "/phone-farm",
});

const COMPARE_ROWS = [
  {
    aspect: "Hardware",
    farm: "20-node metal chassis, shared PSU & cooling",
    emulator: "Virtual devices on one PC",
    cloud: "Rented remote seats",
  },
  {
    aspect: "Fidelity",
    farm: "Real SoC, storage, sensors",
    emulator: "Approximated behavior",
    cloud: "Shared infra, variable latency",
  },
  {
    aspect: "Cost model",
    farm: "One-time hardware + your network",
    emulator: "Low entry, limited scale",
    cloud: "Recurring subscription",
  },
  {
    aspect: "Best for",
    farm: "QA labs, compatibility, long burn-in",
    emulator: "Early UI checks",
    cloud: "Quick experiments",
  },
];

export default function PhoneFarmPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title="What is a phone farm?"
            subtitle="A factory-built chassis of real Android motherboards —not consumer phones on a desk. Designed for professional QA, device labs, and enterprise fleets."
          />
          <div className="mt-6">
            <ContactBar />
          </div>
        </div>
      </section>

      <div className="site-container py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="prose-farm max-w-none">
            <p>
              A phone farm from {SITE.name} is a metal chassis holding up to twenty Android motherboard nodes without
              screens or batteries. Power, cooling, and USB or LAN control are centralized so your team can mirror,
              group, and batch-deploy APKs on real hardware under your own network policy.
            </p>
            <p>
              Since {SITE.since}, we assemble these boxes in Guangzhou, run burn-in with serial sheets, export-pack for
              overseas buyers, and configure remote control during handover.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={PAGE_IMAGES.phoneFarmAside}
              alt="Phone farm chassis assembly on the production line"
              fill
              className="object-contain p-3"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <section className="mt-16">
          <SectionHeading title="Typical configuration" subtitle="Standard 20-node box —scales with accessories and network kits." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Chassis", body: "2U-style frame, quad-fan cooling, adaptive PSU" },
              { title: "Nodes", body: "20 motherboard slots —Samsung, Xiaomi, OPPO, Pixel tiers" },
              { title: "Control", body: "USB mirroring or LAN OTG on a dedicated workstation PC" },
              { title: "Ops", body: "Burn-in sheet, export packing, remote setup support" },
            ].map((item) => (
              <div key={item.title} className="card-premium p-5">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading title="Real devices vs emulators vs cloud" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Aspect</th>
                  <th className="px-4 py-3 font-semibold text-sky-800">Phone farm</th>
                  <th className="px-4 py-3 font-semibold">Emulator</th>
                  <th className="px-4 py-3 font-semibold">Cloud phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.aspect} className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.aspect}</td>
                    <td className="px-4 py-3 text-slate-700">{row.farm}</td>
                    <td className="px-4 py-3 text-slate-600">{row.emulator}</td>
                    <td className="px-4 py-3 text-slate-600">{row.cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading title="Lawful B2B use cases" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LEGAL_USE_CASES.map((use) => (
              <li key={use} className="card-premium px-4 py-3 text-sm text-slate-700">
                {use}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <Link href="/shop" className="card-premium p-6 hover:border-sky-300">
            <h3 className="font-semibold text-slate-900">Browse hardware</h3>
            <p className="mt-2 text-sm text-slate-600">32+ SKUs — boxes, hubs, PSU, network kits.</p>
            <span className="link-accent mt-4 inline-block text-sm">Shop catalog ?</span>
          </Link>
          <Link href="/services" className="card-premium p-6 hover:border-sky-300">
            <h3 className="font-semibold text-slate-900">Setup services</h3>
            <p className="mt-2 text-sm text-slate-600">Remote control, group control, deployment commissioning.</p>
            <span className="link-accent mt-4 inline-block text-sm">View services ?</span>
          </Link>
          <Link href="/help/after-purchase-guide" className="card-premium p-6 hover:border-sky-300">
            <h3 className="font-semibold text-slate-900">After delivery</h3>
            <p className="mt-2 text-sm text-slate-600">Connection, burn-in, and first-week operations checklist.</p>
            <span className="link-accent mt-4 inline-block text-sm">Read guide ?</span>
          </Link>
        </section>

        <section className="mt-16 max-w-xl">
          <h2 className="page-section-title">Discuss your lab requirements</h2>
          <p className="mt-2 text-sm text-slate-600">Share node count, destination, and control method for a written quote.</p>
          <div className="card-premium mt-6 p-6">
            <ContactForm source="phone-farm" variant="full" />
          </div>
        </section>
      </div>
    </div>
  );
}
