import Link from "next/link";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { DeploymentTimeline } from "@/components/DeploymentTimeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Deployment Workflow",
  description:
    "From requirement confirmation to remote handover —delivery SOP for real-device phone farm hardware from Cyou Phone Farm Guangzhou.",
  path: "/deployment",
});

export default function DeploymentPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title="Deployment Workflow"
            subtitle={`How ${SITE.name} delivers hardware, testing, packing, and remote support from ${SITE.location}.`}
          />
        </div>
      </section>

      <div className="site-container py-12 pb-24 lg:pb-12">
        <DeliverySopSection />

        <section className="mt-16">
          <SectionHeading title="Six-stage project timeline" subtitle="Used for full-service quotes that include control software configuration." />
          <DeploymentTimeline />
        </section>

        <div className="mt-12 flex flex-wrap gap-4 text-sm">
          <Link href="/services" className="link-accent">All services</Link>
          <Link href="/services/packages" className="link-accent">Service packages →</Link>
          <Link href="/phone-farm" className="link-accent">What is a phone farm →</Link>
          <Link href="/about" className="link-accent">About our supplier →</Link>
        </div>

        <section className="mt-16 max-w-xl">
          <h2 className="page-section-title">Start your deployment inquiry</h2>
          <p className="mt-1 text-sm text-slate-500">
            Share rack count, apps under test, and control software — we reply with a deployment plan from Guangzhou.
          </p>
          <div className="card-premium mt-4 p-6">
            <ContactForm source="deployment" variant="full" />
          </div>
        </section>
      </div>
    </div>
  );
}
