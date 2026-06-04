import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ContactBar } from "@/components/ContactBar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { FAQ_ITEMS } from "@/lib/faq";
import {
  SITE,
  SHOP_BRANDS,
  CONTROL_SOFTWARE_OPTIONS,
  DEPLOYMENT_STEPS,
  SERVICE_PACKAGES,
  GLOBAL_STATS,
  SERVICES,
} from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Complete Phone Farm Setup Service with Real Devices",
  description: SITE.intro,
  path: "/",
});

async function productsByBrand(category: string, take = 4) {
  return prisma.product.findMany({
    where: { published: true, category },
    take,
    orderBy: { priceUsd: "asc" },
  });
}

export default async function HomePage() {
  const brandSections = await Promise.all(
    SHOP_BRANDS.map(async (b) => ({
      brand: b,
      products: await productsByBrand(b.slug),
    }))
  );

  return (
    <>
      <JsonLd data={faqPageJsonLd(FAQ_ITEMS.slice(0, 6))} />
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <Image src={IMAGES.hero} alt="Phone farm setup service" fill className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            {SITE.location} · {SITE.locationZh} · Since {SITE.since}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white lg:text-5xl">{SITE.tagline}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{SITE.intro}</p>
          <div className="mt-6">
            <ContactBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services" className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500">
              One-stop Setup
            </Link>
            <Link href="/shop" className="rounded-lg border border-slate-600 px-6 py-3 text-white hover:border-cyan-500">
              Shop Devices
            </Link>
            <Link href="/deployment" className="rounded-lg border border-slate-600 px-6 py-3 text-white hover:border-cyan-500">
              Deployment Workflow
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-white">Product Information</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-cyan-400">What is a Phone Farm?</h3>
            <p className="mt-3 text-slate-400">
              A phone farm is hardware that optimizes traditional group control—real motherboards in a chassis with
              shared power, cooling, and centralized USB/LAN control instead of loose phones on a desk.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 p-6">
            <h3 className="text-lg font-semibold text-cyan-400">Single Device Single IP</h3>
            <p className="mt-3 text-slate-400">
              Per-node IP and proxy policies for isolation at scale—we document routing during setup.
            </p>
            <Link href="/help/single-device-single-ip" className="mt-2 inline-block text-sm text-cyan-400 hover:underline">
              Read guide →
            </Link>
          </div>
        </div>
        <p className="mt-6 text-slate-400">
          Choose <strong className="text-white">{SITE.name}</strong> for full-service deployment from Guangzhou—hardware
          selection, remote control, group control, delivery, and after-sales since {SITE.since}.
        </p>
        <Link href="/help/device-connection-video-guide" className="mt-2 inline-block text-cyan-400 hover:underline">
          Device connection video guide (Help Center) →
        </Link>
        <span className="mx-2 text-slate-600">·</span>
        <Link href="/help/after-purchase-guide" className="text-cyan-400 hover:underline">
          After-purchase instructions →
        </Link>
      </section>

      <section className="border-t border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Mirror Software VIP Setup</h2>
          <p className="mt-2 text-slate-400">
            Control-stack onboarding services (we configure your environment—we do not resell third-party CDKEYs).
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(await prisma.product.findMany({ where: { category: "mirror-vip", published: true } })).map(
              (p) => (
                <ProductCard key={p.id} product={p} />
              )
            )}
          </div>
          <Link href="/shop?category=mirror-vip" className="mt-4 inline-block text-cyan-400 hover:underline">
            View mirror VIP services →
          </Link>
        </div>
      </section>

      {brandSections.map(({ brand, products }) => (
        <section key={brand.slug} className="border-t border-slate-800 bg-slate-900/20 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{brand.name}</h2>
              <Link href={`/shop?category=${brand.slug}`} className="text-sm text-cyan-400 hover:underline">
                View all →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">Control Software Setup</h2>
        <p className="mt-2 text-slate-400">
          We configure mirror and group-control stacks on your PCs—we do not resell third-party CDKEY brands.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CONTROL_SOFTWARE_OPTIONS.map((s) => (
            <div key={s.slug} className="rounded-xl border border-slate-800 p-6">
              <h3 className="font-semibold text-white">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
              <Link href="/shop?category=control-software" className="mt-3 inline-block text-sm text-cyan-400">
                Related setup SKUs →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Deployment Workflow</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DEPLOYMENT_STEPS.map((s) => (
              <li key={s.step} className="rounded-lg border border-slate-800 p-4 text-sm">
                <span className="font-bold text-cyan-400">Step {s.step}</span>
                <p className="mt-1 font-medium text-white">{s.title}</p>
                <p className="mt-1 text-slate-400">{s.desc}</p>
              </li>
            ))}
          </ol>
          <Link href="/deployment" className="mt-6 inline-block text-cyan-400 hover:underline">
            Full workflow →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">Service Packages</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SERVICE_PACKAGES.map((pkg) => (
            <div key={pkg.slug} className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-6">
              <h3 className="font-semibold text-white">{pkg.name}</h3>
              <p className="mt-2 text-xl font-bold text-amber-400">
                {pkg.priceFrom > 0 ? `From $${pkg.priceFrom}` : "Custom quote"}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-400">
                {pkg.includes.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href="/services/packages" className="mt-6 inline-block rounded-lg bg-amber-600 px-5 py-2 text-white hover:bg-amber-500">
          Compare packages
        </Link>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Setup Services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="rounded-xl border border-slate-800 p-5 hover:border-cyan-600/50">
                <h3 className="font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">Global Deployment Activity</h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-4 py-3">Country / Region</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {GLOBAL_STATS.map((row) => (
                <tr key={row.country} className="border-t border-slate-800">
                  <td className="px-4 py-3 text-white">{row.country}</td>
                  <td className="px-4 py-3">{row.orders.toLocaleString()}</td>
                  <td className="px-4 py-3 text-emerald-400">{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-white">Guangzhou Facilities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(IMAGES.company).map(([key, src]) => (
            <div key={key} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800">
              <Image src={src} alt={`Facility ${key}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">FAQ</h2>
          <div className="mt-6 max-w-3xl">
            <FaqAccordion items={FAQ_ITEMS.slice(0, 6)} />
          </div>
          <Link href="/faq" className="mt-4 inline-block text-cyan-400 hover:underline">
            Full FAQ →
          </Link>
        </div>
      </section>

      <section className="bg-cyan-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-white">Request Setup Quote</h2>
          <div className="mt-8 max-w-xl">
            <ContactForm source="home-cta" />
          </div>
        </div>
      </section>
    </>
  );
}
