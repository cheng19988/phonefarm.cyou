import Image from "next/image";
import Link from "next/link";
import { SERVICES, SITE, CONTROL_SOFTWARE_OPTIONS, CONTROL_SOFTWARE_DISCLAIMER } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { ContactBar } from "@/components/ContactBar";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Setup Services",
  description:
    "One-stop setup, remote control, group control, deployment, enterprise bulk, samples, and overseas support from Cyou Phone Farm Guangzhou.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Setup Services</h1>
      <p className="mt-2 max-w-3xl text-slate-400">
        {SITE.name} delivers full phone farm projects in {SITE.location}—beyond hardware sales.
      </p>
      <div className="mt-4 flex gap-4">
        <ContactBar />
      </div>
      <Link href="/services/packages" className="mt-4 inline-block text-amber-400 hover:underline">
        View service packages →
      </Link>
      <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-xl border border-slate-800">
        <Image src={IMAGES.controlScene} alt="Control setup" fill className="object-cover" />
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {SERVICES.map((s) => (
          <article key={s.slug} id={s.slug} className="rounded-xl border border-slate-800 p-6 scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">{s.title}</h2>
            <p className="mt-3 text-slate-400">{s.desc}</p>
            <Link href="/contact" className="mt-4 inline-block text-sm text-cyan-400 hover:underline">
              Request service →
            </Link>
          </article>
        ))}
      </div>
      <section className="mt-16">
        <p className="mt-4 text-sm text-slate-500">{CONTROL_SOFTWARE_DISCLAIMER}</p>
        <h2 className="mt-8 text-xl font-bold text-white">Control stack options we configure</h2>
        <ul className="mt-4 space-y-3 text-slate-400">
          {CONTROL_SOFTWARE_OPTIONS.map((o) => (
            <li key={o.slug}>
              <strong className="text-white">{o.name}</strong> — {o.desc}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
        <h2 className="text-xl font-bold text-white">Discuss your project</h2>
        <div className="mt-6 max-w-xl">
          <ContactForm source="services" />
        </div>
      </section>
    </div>
  );
}
