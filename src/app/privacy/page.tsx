import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-farm">
      <h1>Privacy Policy</h1>
      <p>Last updated: June 2026</p>
      <p>
        {SITE.name} collects information you submit via forms, orders, and account registration (name, email, contact
        details, device requirements). We use this data to fulfill orders, provide support, and improve our services.
      </p>
      <p>We do not sell personal data. Payment verification uses blockchain transaction references you provide.</p>
      <p>Contact: qiuxui646@gmail.com for data requests.</p>
    </div>
  );
}
