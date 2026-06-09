import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { DeploymentTimeline } from "@/components/DeploymentTimeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Deployment Workflow",
  description:
    "From requirement confirmation to remote handover — delivery SOP for real-device phone farm hardware from Cyou Phone Farm Guangzhou.",
  path: "/deployment",
});

export default function DeploymentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pb-24 lg:pb-12">
      <h1 className="page-title">Deployment Workflow</h1>
      <p className="page-lead">
        How {SITE.name} delivers hardware, testing, packing, and remote support from {SITE.location}.
      </p>

      <div className="mt-12">
        <DeliverySopSection />
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-slate-900">Six-stage project timeline</h2>
        <p className="mt-2 text-slate-600">
          Used for full-service quotes that include control software configuration.
        </p>
        <DeploymentTimeline />
      </section>

      <div className="mt-12 flex flex-wrap gap-4 text-sm">
        <Link href="/services" className="link-accent">All services</Link>
        <Link href="/services/packages" className="link-accent">Service packages →</Link>
        <Link href="/about" className="link-accent">About our supplier →</Link>
      </div>

      <section className="mt-16 max-w-xl">
        <h2 className="page-section-title">Start your deployment inquiry</h2>
        <p className="mt-1 text-sm text-slate-500">Full form with use case and control method fields.</p>
        <div className="mt-4 card-premium p-6">
          <ContactForm source="deployment" variant="full" />
        </div>
      </section>
    </div>
  );
}
