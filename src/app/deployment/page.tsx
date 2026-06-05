import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";
import { DeploymentTimeline } from "@/components/DeploymentTimeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Deployment Workflow",
  description:
    "Six-stage deployment from device selection to after-sales—Cyou Phone Farm Guangzhou full-service process.",
  path: "/deployment",
});

export default function DeploymentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Deployment Workflow</h1>
      <p className="mt-2 max-w-3xl text-slate-400">
        How {SITE.name} delivers full-service phone farm projects from {SITE.location}.
      </p>
      <DeploymentTimeline />
      <div className="mt-12 flex gap-4">
        <Link href="/services" className="text-cyan-400 hover:underline">All services</Link>
        <Link href="/services/packages" className="text-cyan-400 hover:underline">Service packages →</Link>
      </div>
      <section className="mt-16 max-w-xl">
        <h2 className="text-lg font-semibold text-white">Start your deployment</h2>
        <ContactForm source="deployment" />
      </section>
    </div>
  );
}
