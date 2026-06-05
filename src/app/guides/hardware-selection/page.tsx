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
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Hardware & Selection</h1>
      <p className="mt-2 text-slate-400">Models, specs, and buying guides—aligned with professional phone farming workflows.</p>
      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block rounded-xl border border-slate-800 p-6 hover:border-cyan-600/40">
            <h2 className="text-xl font-semibold text-white">{post.title}</h2>
            <p className="mt-2 text-slate-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>
      <Link href="/shop" className="mt-8 inline-block rounded-lg bg-cyan-600 px-5 py-2 text-white">
        View product catalog
      </Link>
    </div>
  );
}
