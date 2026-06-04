import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Blog & Guides",
  description: "Hardware selection, setup tutorials, and application guides for phone farm operators.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Blog & Guides</h1>
      <p className="mt-2 text-slate-400">Practical guides for studios, agencies, and QA teams.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="rounded-xl border border-slate-800 p-6">
            <p className="text-xs text-cyan-500">{post.category} · {post.date}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              <Link href={`/blog/${post.slug}`} className="hover:text-cyan-400">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm text-slate-400">{post.excerpt}</p>
          </article>
        ))}
      </div>
      <Link href="/guides/hardware-selection" className="mt-8 inline-block text-cyan-400 hover:underline">
        Hardware selection hub →
      </Link>
    </div>
  );
}
