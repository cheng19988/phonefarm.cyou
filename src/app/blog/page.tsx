import Link from "next/link";
import { PUBLISHED_BLOG_POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = buildMetadata({
  title: "Phone Farm Insights —Guides & Tutorials",
  description:
    "Phone farm hardware selection, cooling, USB stability, bulk APK, ADB shortcuts, budget builds, and 2026 deployment guides for enterprise device labs.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            title="Insights"
            subtitle="Deployment guides for hardware selection, cooling, network planning, stability testing, and group control operations."
          />
          <p className="mt-4 text-sm text-slate-600">{PUBLISHED_BLOG_POSTS.length} published articles</p>
        </div>
      </section>
      <div className="site-container py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PUBLISHED_BLOG_POSTS.map((post) => (
            <article key={post.slug} className="card-premium p-6">
              <p className="text-xs font-medium text-sky-600">{post.category} · {post.date}</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-sky-700">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-sky-700">
                Read article —              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href="/guides/hardware-selection" className="text-sky-700 hover:underline">Hardware selection hub →</Link>
          <Link href="/help" className="text-sky-700 hover:underline">Help Center</Link>
          <Link href="/faq" className="text-sky-700 hover:underline">FAQ</Link>
        </div>
      </div>
    </div>
  );
}
