import { CONTACT } from "@/lib/constants";

export function ContactBar({ compact = false }: { compact?: boolean }) {
  const links = [
    { label: "Phone", href: `tel:${CONTACT.phone}`, text: CONTACT.phoneDisplay, external: false },
    { label: "Telegram", href: CONTACT.telegramUrl, text: CONTACT.telegram, external: true },
    { label: "WhatsApp", href: CONTACT.whatsappUrl, text: CONTACT.whatsapp, external: true },
    { label: "Email", href: `mailto:${CONTACT.email}`, text: CONTACT.email, external: true },
  ];
  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.external ? "_blank" : undefined}
          rel={l.external ? "noopener noreferrer" : undefined}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 transition hover:border-cyan-500/30 hover:bg-cyan-950/30 hover:text-white"
        >
          <span className="font-medium text-cyan-400/90">{l.label}</span>
          <span className="text-slate-400"> · </span>
          <span>{l.text}</span>
        </a>
      ))}
    </div>
  );
}
