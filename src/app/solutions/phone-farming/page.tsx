import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactBar } from "@/components/ContactBar";
import { IMAGES } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farming Solution for Professional Teams",
  description:
    "Factory-built phone farm boxes—20 nodes per chassis, OTG/USB control, 24/7 Samsung motherboard clusters for QA and automation teams.",
  path: "/solutions/phone-farming",
});

export default async function PhoneFarmingSolutionPage() {
  const products = await prisma.product.findMany({
    where: { published: true, category: { in: ["phone-farm-box", "android-phone-farm", "motherboard-box"] } },
    take: 12,
  });

  return (
    <div>
      <section className="relative border-b border-slate-800 py-20">
        <div className="absolute inset-0">
          <Image src={IMAGES.heroAlt} alt="Phone farming solution" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-white">Phone Farming Solution</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Run and manage many real Android devices for testing, content workflows, and legitimate multi-device
            operations—not messy hobby rigs.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/shop" className="rounded-lg bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-500">
              Build Your Setup
            </Link>
            <Link href="/contact" className="rounded-lg border border-slate-600 px-5 py-2 text-white">
              Custom Plan
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">1 Phone Farm Box = 20 Mobile Devices</h2>
        <p className="mt-4 text-slate-400">
          Battery-free boards in an industrial chassis with centralized power, quad-fan cooling, and USB/OTG paths.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { t: "OTG / USB Mode", d: "One-click grouped control from your PC." },
            { t: "Motherboard Box 24/7", d: "Samsung-class nodes without screens or batteries." },
            { t: "Enterprise Scaling", d: "Modular boxes stack into audit-ready racks." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border border-slate-800 p-5">
              <h3 className="font-semibold text-cyan-400">{x.t}</h3>
              <p className="mt-2 text-sm text-slate-400">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Choose Your Phone Farm Box</h2>
          <ContactBar />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">Why Professionals Choose Cyou Phone Farm</h2>
        <ul className="mt-6 space-y-3 text-slate-400">
          <li>Safe 24/7 operations with centralized power and cooling</li>
          <li>Batch control and Appium-ready device farms</li>
          <li>Compliant scaling with standardized chassis documentation</li>
        </ul>
        <div className="mt-10 max-w-xl">
          <h3 className="text-lg font-semibold text-white">Get Deployment Kit</h3>
          <ContactForm source="phone-farming" />
        </div>
      </section>
    </div>
  );
}
