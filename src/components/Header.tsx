import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { CartLink } from "./CartLink";
import { HeaderAccountMenu } from "./HeaderAccountMenu";
import { SHOP_BRANDS } from "@/lib/constants";

const nav = [
  { href: "/", label: "Home" },
  { href: "/phone-farm", label: "Phone Farm" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/help", label: "Help" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-container flex items-center justify-between gap-4 py-3 lg:gap-6">
        <Logo />

        <nav className="header-nav hidden lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <CartLink />
            <HeaderAccountMenu />
          </div>
          <Link
            href="/services/packages"
            className="hidden md:inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-[13px] font-semibold text-amber-800 transition hover:border-amber-300 hover:bg-amber-100"
          >
            Packages
          </Link>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex text-sm !py-2 !px-4 shadow-md">
            Get Quote
          </Link>
          <MobileNav />
        </div>
      </div>

      <div className="hidden lg:block border-t border-slate-100 bg-slate-50/60">
        <div className="site-container flex items-center gap-3 overflow-x-auto py-2.5">
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Brands
          </span>
          {SHOP_BRANDS.map((b) => (
            <Link key={b.slug} href={`/shop?category=${b.slug}`} className="brand-pill shrink-0 shadow-sm">
              <span className="brand-pill-icon">{b.icon}</span>
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
