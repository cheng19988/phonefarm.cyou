import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Guide 2026",
  description: "Build, automate, and scale a real-device phone farm with Guangzhou factory hardware and support.",
  path: "/guides/phone-farm-guide",
});

export default function PhoneFarmGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-farm">
      <h1>Phone Farm Guide 2026</h1>
      <p>
        A practical path from loose phones on a desk to a factory-built 20-node chassis with centralized power,
        cooling, and control—written for operators who need stability over shortcuts.
      </p>
      <h2>How Phone Farms Work</h2>
      <p>
        Real boards run inside a metal box. Your PC connects via USB/OTG hubs. Operators mirror, group, and batch
        actions across the fleet.
      </p>
      <h2>Hardware Checklist</h2>
      <ul>
        <li>Choose SoC tier (Snapdragon 835+ for heavy workloads)</li>
        <li>Verify 4-fan cooling and PSU headroom</li>
        <li>Plan rack or desktop mounting</li>
        <li>Order sample box before bulk PO</li>
      </ul>
      <h2>Software & Control</h2>
      <p>We configure remote control and group policies during deployment—contact us for your stack.</p>
      <Link href="/shop" className="btn-primary inline-block no-underline">
        Shop hardware
      </Link>
    </div>
  );
}
