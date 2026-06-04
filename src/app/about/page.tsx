import Image from "next/image";
import { SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { ContactBar } from "@/components/ContactBar";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Cyou Phone Farm",
  description: SITE.intro,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">About {SITE.name}</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-300">{SITE.intro}</p>
      <ContactBar />
      <div className="prose-farm mt-10 max-w-3xl">
        <h2>Full-Service Setup Provider</h2>
        <p>
          We are not only a shop—we engineer complete phone farm projects: device selection, box configuration,
          remote control, group control, overseas delivery, and long-term support from {SITE.locationZh}.
        </p>
        <h2>Hardware + Software + Support</h2>
        <ul>
          <li>Real-device Samsung, Oppo, Xiaomi, OnePlus, and Pixel farm boxes</li>
          <li>Motherboard chassis, USB hubs, PSU, cooling, and network kits</li>
          <li>Mirror workspace and group-control onboarding performed by our team</li>
          <li>Enterprise bulk deployment and sample evaluation programs</li>
        </ul>
      </div>
      <h2 className="mt-16 text-2xl font-bold text-white">Facilities</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {Object.entries(IMAGES.company).map(([k, src]) => (
          <div key={k} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800">
            <Image src={src} alt={k} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
