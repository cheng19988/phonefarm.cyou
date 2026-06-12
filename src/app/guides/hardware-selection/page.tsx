import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hardware & Selection Guide",
  description: "Compare phone farm box models, SoC tiers, cooling, and scalability for 2026 deployments.",
  path: "/guides/hardware-selection",
});

export default function HardwareSelectionPage() {
  const posts = BLOG_POSTS.filter((p) => p.category === "Hardware & Selection");
  return (
    <div className="site-container py-12">
      <h1 className="page-title">Hardware & Selection</h1>
      <p className="page-lead">
        Models, specs, and buying guides—aligned with professional phone farming workflows.
      </p>
      <div className="mt-6 card-premium p-6">
        <h2 className="text-lg font-semibold text-slate-900">Physical specs & logistics</h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Dimensions (~480×400×88 mm), weight, 110–220 V power, control PC scale (boxes per workstation), lead time,
          export packing, 90-day warranty, RMA, pre-shipment photos, and remote setup — consolidated for buyers.
        </p>
        <Link href="/help/buyer-specifications-logistics" className="link-accent mt-3 inline-block text-sm font-medium">
          Read buyer specifications & logistics →
        </Link>
      </div>
      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-premium block p-6 hover:border-sky-300"
          >
            <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-2 text-slate-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
      <Link href="/shop" className="btn-primary mt-8 inline-block">
        View product catalog
      </Link>
    </div>
  );
}
