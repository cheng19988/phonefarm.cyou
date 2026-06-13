import Link from "next/link";
import { Logo } from "./Logo";
import { CONTACT, SHOP_BRANDS, SITE } from "@/lib/constants";
import { CONTACT_URLS } from "@/lib/contact-urls";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="site-container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo compact />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{SITE.intro}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="link-accent">
                Telegram
              </a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-600">
                WhatsApp
              </a>
              <a href={CONTACT_URLS.gmailCompose} target="_blank" rel="noopener noreferrer" className="link-accent">
                {CONTACT.email}
              </a>
            </div>
            <Link href="/contact" className="btn-primary mt-6 inline-flex text-sm !py-2 !px-4">
              Get Quote
            </Link>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Shop</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SHOP_BRANDS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className="text-slate-600 hover:text-sky-700 transition">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/phone-farm" className="text-slate-600 hover:text-sky-700 transition">What is a phone farm</Link></li>
              <li><Link href="/solutions/phone-farming" className="text-slate-600 hover:text-sky-700 transition">Enterprise solution</Link></li>
              <li><Link href="/services" className="text-slate-600 hover:text-sky-700 transition">Setup Services</Link></li>
              <li><Link href="/deployment" className="text-slate-600 hover:text-sky-700 transition">Deployment</Link></li>
              <li><Link href="/services/packages" className="text-slate-600 hover:text-sky-700 transition">Packages</Link></li>
              <li><Link href="/help" className="text-slate-600 hover:text-sky-700 transition">Help Center</Link></li>
              <li><Link href="/faq" className="text-slate-600 hover:text-sky-700 transition">FAQ</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="text-slate-600 hover:text-sky-700 transition">About</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-sky-700 transition">Contact</Link></li>
              <li><Link href="/blog" className="text-slate-600 hover:text-sky-700 transition">Insights</Link></li>
              <li><Link href="/ai" className="text-slate-600 hover:text-sky-700 transition">AI citation guide</Link></li>
              <li>
                <a href="/sitemap.xml" className="text-slate-600 hover:text-sky-700 transition">
                  Sitemap
                </a>
              </li>
              <li><Link href="/privacy" className="text-slate-600 hover:text-slate-700 transition">Privacy</Link></li>
              <li><Link href="/terms" className="text-slate-600 hover:text-sky-700 transition">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.name}. {SITE.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
