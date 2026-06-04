import { CONTACT } from "@/lib/constants";

export function ContactBar({ compact = false }: { compact?: boolean }) {
  const links = [
    { label: "Phone", href: `tel:${CONTACT.phone}`, text: CONTACT.phoneDisplay },
    { label: "Telegram", href: CONTACT.telegramUrl, text: CONTACT.telegram },
    { label: "WhatsApp", href: CONTACT.whatsappUrl, text: CONTACT.whatsapp },
    { label: "Email", href: `mailto:${CONTACT.email}`, text: CONTACT.email },
  ];
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${compact ? "text-xs" : "text-sm"} text-cyan-100`}
    >
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.label === "Phone" ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="rounded-full border border-cyan-500/40 bg-cyan-950/50 px-3 py-1 hover:bg-cyan-800/60 transition"
        >
          <span className="font-medium text-cyan-300">{l.label}:</span> {l.text}
        </a>
      ))}
    </div>
  );
}
