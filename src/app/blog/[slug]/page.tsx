import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, BLOG_POSTS } from "@/lib/blog";
import { BLOG_BODIES } from "@/lib/blog-bodies";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ContactBar } from "@/components/ContactBar";
import { ProseMarkdown } from "@/components/ProseMarkdown";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}` });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const body = BLOG_BODIES[slug];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Insights", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />
      <p className="text-sm text-cyan-500">{post.category} · {post.date}</p>
      <h1 className="mt-2 text-3xl font-bold text-white">{post.title}</h1>
      {body ? (
        <ProseMarkdown content={body} />
      ) : (
        <div className="prose-farm mt-8">
          <p>{post.excerpt}</p>
          <p className="text-slate-500">Full article coming soon.</p>
        </div>
      )}
      <p className="mt-8 text-slate-400">
        <Link href="/contact" className="text-cyan-400 hover:underline">Request a quote</Link>
        {" · "}
        <Link href="/shop" className="text-cyan-400 hover:underline">Browse devices</Link>
      </p>
      <div className="mt-8">
        <ContactBar />
      </div>
    </article>
  );
}
