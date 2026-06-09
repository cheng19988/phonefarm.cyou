import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { CartLink } from "./CartLink";
import { HeaderAccountMenu } from "./HeaderAccountMenu";
import { SHOP_BRANDS, CONTACT } from "@/lib/constants";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/deployment", label: "Deployment" },
  { href: "/help", label: "Help" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 header-glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav className="hidden xl:flex items-center gap-0.5 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <CartLink />
            <HeaderAccountMenu />
          </div>
          <Link
            href="/services/packages"
            className="hidden md:inline rounded-lg px-3 py-2 text-sm font-medium text-amber-400/90 hover:bg-amber-950/30"
          >
            Packages
          </Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline text-sm text-emerald-400 hover:text-emerald-300"
          >
            WhatsApp
          </a>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex text-sm !py-2 !px-4">
            Get Quote
          </Link>
          <MobileNav />
        </div>
      </div>
      <div className="hidden lg:block border-t border-white/5">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5">
          {SHOP_BRANDS.map((b) => (
            <Link key={b.slug} href={`/shop?category=${b.slug}`} className="brand-pill shrink-0">
              <span className="brand-pill-icon">{b.icon}</span>
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
