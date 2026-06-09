import Link from "next/link";
import { ContactBar } from "./ContactBar";
import { SiteBar } from "./SiteBar";
import { MobileNav } from "./MobileNav";
import { CartLink } from "./CartLink";
import { HeaderAccountMenu } from "./HeaderAccountMenu";
import { SITE, SHOP_BRANDS, CONTACT } from "@/lib/constants";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Setup Services" },
  { href: "/deployment", label: "Deployment" },
  { href: "/help", label: "Help" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="relative sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="hidden lg:block border-b border-slate-800/80 bg-slate-900/80 px-4 py-2">
        <div className="mx-auto max-w-7xl">
          <ContactBar compact />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-w-0 flex-col">
          <span className="text-lg font-bold tracking-tight text-white">{SITE.name}</span>
          <span className="hidden truncate text-xs text-slate-400 sm:block">{SITE.tagline}</span>
        </Link>
        <nav className="hidden xl:flex flex-wrap items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm sm:gap-3">
          <SiteBar />
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <CartLink />
            <HeaderAccountMenu />
          </div>
          <Link href="/services/packages" className="hidden md:inline text-amber-400 hover:text-amber-300">
            Packages
          </Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-emerald-400 hover:text-emerald-300"
          >
            WhatsApp
          </a>
          <Link href="/contact" className="hidden sm:inline rounded-lg bg-cyan-600 px-3 py-2 font-medium text-white hover:bg-cyan-500">
            Get Quote
          </Link>
          <MobileNav />
        </div>
      </div>
      <div className="hidden lg:block border-t border-slate-800/60 bg-slate-900/50">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 text-xs">
          {SHOP_BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/shop?category=${b.slug}`}
              className="shrink-0 rounded-full border border-slate-700 px-3 py-1 text-slate-300 hover:border-cyan-500 hover:text-white"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
