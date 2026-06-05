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
        <h2>What we do</h2>
        <p>
          {SITE.name} builds and ships phone farm hardware from {SITE.locationZh}. Most clients come to us for a
          full rollout—box selection, burn-in, control PC sizing, group policies, and export packing—not a single
          SKU off a shelf.
        </p>
        <h2>How we work with overseas buyers</h2>
        <ul>
          <li>Share workload, app list, and target node count — we return a BOM and setup scope.</li>
          <li>Factory burn-in with serial sheet before DHL/FedEx/UPS dispatch.</li>
          <li>Remote screenshare for first connection; Telegram/WhatsApp for day-two issues.</li>
          <li>Bulk programs (40–200+ nodes) get dedicated network and rack planning.</li>
        </ul>
        <h2>Product lines</h2>
        <ul>
          <li>Samsung, Oppo, Xiaomi, OnePlus, and Pixel real-device farm boxes</li>
          <li>USB hubs, PSU, cooling, and network kits matched to node count</li>
          <li>Mirror workspace and group-control onboarding by our engineers</li>
        </ul>
      </div>
      <h2 className="mt-16 text-2xl font-bold text-white">Guangzhou facilities</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {(
          [
            ["office", "Office"],
            ["front", "Reception"],
            ["meeting", "Project review room"],
            ["production", "Assembly floor"],
            ["warehouse", "Warehouse"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800">
            <Image src={IMAGES.company[key]} alt={`${SITE.name} ${label}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
