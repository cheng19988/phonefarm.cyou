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
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
          <Link href="/help/buyer-specifications-logistics" className="link-accent">
            Buyer specifications & logistics →
          </Link>
          <Link href="/help/rackmount-2u-phone-farm-buyer-guide" className="link-accent">
            Rackmount & 2U buyer guide →
          </Link>
          <Link href="/help/how-to-choose-phone-farm-supplier" className="link-accent">
            How to choose a supplier →
          </Link>
          <Link href="/help/android-device-farm-hardware-explained" className="link-accent">
            Android device farm hardware →
          </Link>
          <Link href="/help/motherboard-box-vs-loose-phones" className="link-accent">
            Motherboard box vs loose phones →
          </Link>
        </div>
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
