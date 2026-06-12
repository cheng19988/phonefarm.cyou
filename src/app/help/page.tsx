import Link from "next/link";
import { HELP_ARTICLES, HELP_CATEGORIES } from "@/lib/help";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = buildMetadata({
  title: "Help Center & Document Center",
    description:
    "Cyou Phone Farm document center: buyer specs (dimensions, power, warranty), USB/LAN setup, batch APK, router, ROM flash, and troubleshooting.",
  path: "/help",
});

export default function HelpPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title="Help Center"
            subtitle="Document center for connection, control, network, firmware, and post-delivery operations—aligned with professional phone farm workflows."
          />
          <p className="mt-4 text-sm text-slate-600">
            {HELP_ARTICLES.length} articles · USB · LAN OTG · group control · router · ROM · troubleshooting
          </p>
        </div>
      </section>
      <div className="site-container py-12">
        {HELP_CATEGORIES.map((cat) => {
          const articles = HELP_ARTICLES.filter((a) => a.category === cat.id);
          if (!articles.length) return null;
          return (
            <section key={cat.id} className="mb-12">
              <h2 className="font-display text-xl font-bold text-slate-900">{cat.name}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/help/${a.slug}`}
                    className="card-premium block p-5 transition hover:border-sky-300"
                  >
                    <span className="font-semibold text-slate-900 leading-snug">{a.title}</span>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{a.excerpt}</p>
                    <span className="mt-3 text-sm font-medium text-sky-700">Read guide →</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
