import Link from "next/link";
import { SITE, CONTACT } from "@/lib/constants";
import { FACILITY_GALLERY } from "@/lib/images";
import { FacilityPhoto } from "@/components/FacilityPhoto";
import { ContactBar } from "@/components/ContactBar";
import { DeliverySopSection } from "@/components/DeliverySopSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Cyou Phone Farm — Guangzhou Hardware Supplier",
  description:
    "Guangzhou-based supplier of real-device phone farm hardware, motherboard boxes, control accessories, and deployment support for QA labs and enterprise device fleets.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pb-24 lg:pb-12">
      <h1 className="text-3xl font-bold text-white">About {SITE.name}</h1>
      <ContactBar />

      <div className="prose-farm mt-10 max-w-3xl">
        <h2>Who we are</h2>
        <p>
          {SITE.name} is a Guangzhou-based supplier focused on real-device phone farm hardware, motherboard boxes,
          control accessories, and deployment support. Since {SITE.since}, we have assembled and shipped chassis for
          overseas QA teams, mobile device labs, and hardware distributors who need documented configurations—not
          anonymous mystery boxes.
        </p>

        <h2>What we supply</h2>
        <ul>
          <li>Samsung, Xiaomi, OPPO, OnePlus, and Pixel motherboard farm boxes</li>
          <li>20-slot chassis trays, adaptive PSU units, and quad-fan cooling kits</li>
          <li>Industrial USB hubs, gigabit network kits, and LAN OTG accessories</li>
          <li>Control workstation setup guidance and remote onboarding services</li>
          <li>Export packing, burn-in serial sheets, and spare parts from Guangzhou stock</li>
        </ul>

        <h2>How we work</h2>
        <p>
          Every project follows a practical sequence: requirement confirmation, hardware preparation, connectivity and
          thermal checks, export packing, and remote handover with a troubleshooting checklist. We confirm scope in
          writing before you pay a proforma invoice—reference prices on the website are starting points, not checkout
          totals.
        </p>
      </div>

      <div className="mt-16">
        <DeliverySopSection />
      </div>

      <div className="prose-farm mt-16 max-w-3xl">
        <h2>What we do not do</h2>
        <p>We supply hardware and lawful setup guidance for professional device management and testing. We do not:</p>
        <ul>
          <li>Provide fraud services or fake engagement programs</li>
          <li>Sell fake traffic, ad-click, or app-install manipulation tools</li>
          <li>Provide platform bypass, ban-avoidance, or risk-control evasion services</li>
          <li>Market passive-income, rewards-app, or social-media manipulation schemes</li>
        </ul>
        <p>
          If your use case cannot be described as app QA testing, compatibility testing, enterprise device fleet
          management, or similar lawful B2B work, we will decline the inquiry.
        </p>

        <h2>Contact channels</h2>
        <ul>
          <li>
            WhatsApp:{" "}
            <a href={CONTACT.whatsappUrl} className="text-cyan-400">
              {CONTACT.whatsapp}
            </a>
          </li>
          <li>
            Telegram:{" "}
            <a href={CONTACT.telegramUrl} className="text-cyan-400">
              {CONTACT.telegram}
            </a>
          </li>
          <li>
            Email:{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-cyan-400">
              {CONTACT.email}
            </a>
          </li>
          <li>Phone: {CONTACT.phoneDisplay}</li>
        </ul>
        <p>
          <Link href="/contact" className="text-cyan-400 hover:underline">
            Send a structured inquiry →
          </Link>
        </p>
      </div>

      <h2 className="mt-16 text-2xl font-bold text-white">Guangzhou facilities</h2>
      <p className="mt-2 text-sm text-slate-500">
        Assembly, burn-in, and export packing are coordinated from our Guangzhou operation.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FACILITY_GALLERY.map((photo) => (
          <FacilityPhoto key={photo.key} src={photo.src} alt={photo.alt} label={photo.label} />
        ))}
      </div>
    </div>
  );
}
