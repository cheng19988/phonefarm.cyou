import { CONTACT } from "@/lib/constants";

const CHANNELS = [
  {
    key: "telegram",
    label: "Telegram",
    value: CONTACT.telegram,
    href: CONTACT.telegramUrl,
    external: true,
    accent: "text-sky-700",
    hover: "hover:bg-sky-50",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappUrl,
    external: true,
    accent: "text-emerald-700",
    hover: "hover:bg-emerald-50",
  },
  {
    key: "email",
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
    accent: "text-slate-700",
    hover: "hover:bg-slate-50",
  },
] as const;

export function MobileContactFab() {
  return (
    <aside className="floating-contact" aria-label="Contact sales">
      <div className="floating-contact-panel">
        <p className="floating-contact-title">Contact sales</p>
        <ul className="floating-contact-list">
          {CHANNELS.map((ch) => (
            <li key={ch.key}>
              <a
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                className={`floating-contact-link ${ch.hover}`}
              >
                <span className={`text-xs font-semibold uppercase tracking-wide ${ch.accent}`}>{ch.label}</span>
                <span className="mt-0.5 block text-sm font-medium text-slate-800">{ch.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
