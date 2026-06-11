import { buildMetadata } from "@/lib/seo";
import { SITE, CONTACT } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name} — how we handle inquiry and order data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 prose-farm">
      <h1>Privacy Policy</h1>
      <p className="text-slate-400">Last updated: June 2026 · {SITE.name} · {SITE.url}</p>

      <h2>1. Who we are</h2>
      <p>
        {SITE.name} ({SITE.location}) operates phonefarm.cyou as a B2B supplier of real-device phone farm hardware and
        setup services. This policy explains how we collect and use information when you browse our site, submit
        inquiries, or create an account for order tracking.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li>Contact details you provide: name, email, phone, country, messaging handles (WhatsApp/Telegram).</li>
        <li>Project details: device quantity, product interest, control method, use case, and free-text messages.</li>
        <li>Account data if you register: email and hashed password.</li>
        <li>Order references: product SKUs, quantities, and payment transaction hashes you voluntarily submit.</li>
        <li>Technical logs: IP address, browser type, and pages visited (standard server logs).</li>
      </ul>

      <h2>3. How we use information</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Respond to quotes and technical questions.</li>
        <li>Prepare commercial invoices, shipping documents, and export paperwork.</li>
        <li>Provide remote setup support and after-sales service.</li>
        <li>Improve our catalog and documentation.</li>
        <li>Comply with lawful requests from authorities when required.</li>
      </ul>

      <h2>4. Sharing</h2>
      <p>
        We do not sell personal data. We share information only with logistics carriers (name, address, phone for
        delivery), payment processors or banks when you pay an invoice, and professional advisers under confidentiality
        when necessary.
      </p>

      <h2>5. Retention</h2>
      <p>
        Inquiry records are kept for up to 36 months unless a contract requires longer retention. Order and invoice
        records are kept for the period required by tax and export regulations.
      </p>

      <h2>6. Security</h2>
      <p>
        Passwords are stored hashed. We use HTTPS in production. No method of transmission over the Internet is 100%
        secure; please use strong passwords and protect your messaging accounts.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You may request access, correction, or deletion of your personal data by emailing {CONTACT.email}. We will
        respond within 30 days where applicable law requires.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use essential cookies for session authentication when you log in. We do not use third-party advertising
        trackers on this site.
      </p>

      <h2>9. Contact</h2>
      <p>
        Data protection inquiries: {CONTACT.email} · {CONTACT.telegram} · {CONTACT.whatsapp}
      </p>
    </div>
  );
}
