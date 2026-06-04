import Link from "next/link";
import { HELP_ARTICLES, HELP_CATEGORIES } from "@/lib/help";
import { buildMetadata } from "@/lib/seo";
import { ContactBar } from "@/components/ContactBar";

export const metadata = buildMetadata({
  title: "Help Center & Document Center",
  description:
    "Cyou Phone Farm setup guides: USB projection, LAN OTG, batch APK, ADB shortcuts, and troubleshooting.",
  path: "/help",
});

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Help Center</h1>
      <p className="mt-2 text-slate-400">Document center for connection, control, and post-delivery operations.</p>
      <div className="mt-4">
        <ContactBar />
      </div>
      {HELP_CATEGORIES.map((cat) => (
        <section key={cat.id} className="mt-10">
          <h2 className="text-xl font-semibold text-white">{cat.name}</h2>
          <ul className="mt-4 space-y-3">
            {HELP_ARTICLES.filter((a) => a.category === cat.id).map((a) => (
              <li key={a.slug}>
                <Link href={`/help/${a.slug}`} className="block rounded-lg border border-slate-800 p-4 hover:border-cyan-600/50">
                  <span className="font-medium text-white">{a.title}</span>
                  <p className="mt-1 text-sm text-slate-400">{a.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
