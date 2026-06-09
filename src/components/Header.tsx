import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { CartLink } from "./CartLink";
import { HeaderAccountMenu } from "./HeaderAccountMenu";
import { SHOP_BRANDS, CONTACT } from "@/lib/constants";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/help", label: "Help Center" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header-top hidden lg:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <span className="text-slate-400">Guangzhou factory · Real-device phone farm · Worldwide export</span>
          <div className="flex flex-wrap items-center gap-4">
            <a href={`tel:${CONTACT.phone}`} className="hover:text-white">{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Telegram {CONTACT.telegram}
            </a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              WhatsApp {CONTACT.whatsapp}
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav className="hidden xl:flex items-center gap-0.5 text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
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
            className="hidden md:inline rounded-md px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50"
          >
            Packages
          </Link>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex text-sm !py-2 !px-4">
            Get Quote
          </Link>
          <MobileNav />
        </div>
      </div>
      <div className="hidden lg:block border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2">
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
