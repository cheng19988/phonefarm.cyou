import { CONTACT } from "@/lib/constants";

const links = [
  { href: CONTACT.telegramUrl, label: "Telegram", value: CONTACT.telegram },
  { href: CONTACT.whatsappUrl, label: "WhatsApp", value: CONTACT.whatsapp },
  { href: `mailto:${CONTACT.email}`, label: "Email", value: CONTACT.email },
];

export function ContactBar() {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
        >
          <span className="font-medium text-sky-700">{l.label}</span>
          <span className="mx-1 text-slate-400">·</span>
          <span>{l.value}</span>
        </a>
      ))}
    </div>
  );
}
