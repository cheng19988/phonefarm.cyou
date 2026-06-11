import Link from "next/link";
import { getProductHelpLinks } from "@/lib/product-help-links";

export function ProductRelatedHelp({ category }: { category: string }) {
  const links = getProductHelpLinks(category);
  if (links.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-xl font-bold text-slate-900">Connection & setup guides</h2>
      <p className="mt-2 text-sm text-slate-600">
        Step-by-step Help Center articles for USB projection, LAN OTG, batch APK, and control software configuration.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.slug}>
            <Link href={`/help/${link.slug}`} className="text-sm font-medium text-sky-700 hover:text-sky-600">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/help" className="mt-4 inline-block text-sm font-medium text-sky-700 hover:text-sky-600">
        Full document center
      </Link>
    </section>
  );
}
