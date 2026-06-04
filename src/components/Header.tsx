import Link from "next/link";
import { ContactBar } from "./ContactBar";
import { CartLink } from "./CartLink";
import { SiteBar } from "./SiteBar";
import { SITE, SHOP_BRANDS } from "@/lib/constants";
import { getSession } from "@/lib/auth";

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

export async function Header() {
  const session = await getSession();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="hidden lg:block border-b border-slate-800/80 bg-slate-900/80 px-4 py-2">
        <div className="mx-auto max-w-7xl">
          <ContactBar compact />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white">{SITE.name}</span>
          <span className="text-xs text-slate-400">{SITE.tagline}</span>
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
        <div className="flex items-center gap-3 text-sm">
          <SiteBar />
          <Link href="/services/packages" className="hidden sm:inline text-amber-400 hover:text-amber-300">
            Packages
          </Link>
          <CartLink />
          <Link href="/shop" className="rounded-lg bg-cyan-600 px-3 py-2 font-medium text-white hover:bg-cyan-500">
            Shop
          </Link>
          {session ? (
            <Link href="/account/orders" className="text-slate-300 hover:text-white">
              Orders
            </Link>
          ) : (
            <Link href="/login" className="text-slate-300 hover:text-white">
              Login
            </Link>
          )}
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
