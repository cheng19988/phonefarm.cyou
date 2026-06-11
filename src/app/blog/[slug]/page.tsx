import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, BLOG_POSTS, hasFullBlogBody } from "@/lib/blog";
import { BLOG_BODIES } from "@/lib/blog-bodies";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ProseMarkdown } from "@/components/ProseMarkdown";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    noIndex: !hasFullBlogBody(slug),
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const body = BLOG_BODIES[slug];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 pb-24 lg:pb-12">
      <JsonLd
        data={[
          ...(body
            ? [
                articleJsonLd({
                  title: post.title,
                  description: post.excerpt,
                  path: `/blog/${slug}`,
                  datePublished: post.date,
                  type: "BlogPosting",
                }),
              ]
            : []),
          breadcrumbJsonLd([
            { name: "Insights", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <Link href="/blog" className="text-sm font-medium text-sky-700 hover:text-sky-600">← Insights</Link>
      <p className="mt-4 text-sm text-sky-600 font-medium">{post.category} · {post.date}</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">{post.title}</h1>
      {body ? (
        <ProseMarkdown content={body} />
      ) : (
        <div className="prose-farm mt-8">
          <p>{post.excerpt}</p>
          <p className="text-slate-500">
            This draft is not published for indexing.{" "}
            <Link href="/contact" className="text-sky-700 hover:underline">Contact sales</Link> for deployment guidance.
          </p>
        </div>
      )}
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/contact" className="text-sky-700 hover:underline">Request a quote</Link>
        <Link href="/shop" className="text-sky-700 hover:underline">Browse devices</Link>
        <Link href="/help" className="text-sky-700 hover:underline">Help Center</Link>
      </div>
      <div className="mt-8">
      </div>
    </article>
  );
}
