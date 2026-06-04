import Link from "next/link";
import { ContactBar } from "./ContactBar";
import { SITE, SHOP_BRANDS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-white">{SITE.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{SITE.intro}</p>
            <div className="mt-4">
              <ContactBar compact />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white">Shop by brand</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {SHOP_BRANDS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className="hover:text-cyan-400">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Services & Help</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-cyan-400">Setup Services</Link></li>
              <li><Link href="/deployment" className="hover:text-cyan-400">Deployment</Link></li>
              <li><Link href="/services/packages" className="hover:text-cyan-400">Packages</Link></li>
              <li><Link href="/help" className="hover:text-cyan-400">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-cyan-400">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Account & Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-cyan-400">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400">Terms</Link></li>
              <li><Link href="/login" className="hover:text-cyan-400">Login</Link></li>
              <li><Link href="/account/orders" className="hover:text-cyan-400">Orders</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {SITE.name} · {SITE.location}
        </p>
      </div>
    </footer>
  );
}
