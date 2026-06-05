import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactBar } from "@/components/ContactBar";
import { DeploymentTimeline } from "@/components/DeploymentTimeline";
import { IMAGES } from "@/lib/images";
import { SITE, TRUST_POINTS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Enterprise Phone Farm Solution",
  description:
    "Real-device phone farm solution from Guangzhou: hardware, control software configuration, burn-in, export, and remote support for QA and enterprise device labs.",
  path: "/solutions/phone-farming",
});

const SOLUTION_CATEGORIES = [
  "samsung-box",
  "xiaomi-box",
  "oppo-box",
  "oneplus-box",
  "pixel-box",
  "motherboard-box",
  "usb-hub",
  "network-equipment",
  "control-software",
  "service-package",
] as const;

export default async function PhoneFarmingSolutionPage() {
  const products = await prisma.product.findMany({
    where: { published: true, category: { in: [...SOLUTION_CATEGORIES] } },
    orderBy: [{ category: "asc" }, { priceUsd: "asc" }],
    take: 12,
  });

  return (
    <div>
      <section className="relative border-b border-slate-800 py-20">
        <div className="absolute inset-0">
          <Image src={IMAGES.controlScene} alt="Phone farm control workspace" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-slate-950/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-white">Enterprise phone farm solution</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            {SITE.name} supplies real Android motherboard farms from Guangzhou for QA device labs, multi-device operations,
            remote device management, and enterprise deployment programs—not cloud-only shortcuts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-lg bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-500">
              Request solution quote
            </Link>
            <Link href="/shop" className="rounded-lg border border-slate-600 px-5 py-2 text-white">
              Browse hardware
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold text-white">What we deliver</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 text-slate-400">
          <li className="rounded-xl border border-slate-800 p-5">Factory-assembled 20-node chassis with burn-in serial sheet</li>
          <li className="rounded-xl border border-slate-800 p-5">USB mirroring and LAN OTG control configuration</li>
          <li className="rounded-xl border border-slate-800 p-5">Group control policies, batch APK workflows, operator handover</li>
          <li className="rounded-xl border border-slate-800 p-5">Export packing, express freight, and WhatsApp/Telegram support</li>
        </ul>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/20 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Recommended hardware</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold text-white">Rollout timeline</h2>
        <DeploymentTimeline />
      </section>

      <section className="border-t border-slate-800 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Trust &amp; support</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.slice(0, 4).map((t) => (
              <div key={t.title} className="rounded-xl border border-slate-800 p-4 text-sm">
                <h3 className="font-semibold text-white">{t.title}</h3>
                <p className="mt-2 text-slate-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <ContactBar />
        <div className="mt-8 max-w-xl">
          <h2 className="text-xl font-bold text-white">Discuss your deployment</h2>
          <ContactForm source="solution-phone-farming" />
        </div>
      </section>
    </div>
  );
}
