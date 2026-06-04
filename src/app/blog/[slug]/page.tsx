import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, BLOG_POSTS } from "@/lib/blog";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ContactBar } from "@/components/ContactBar";

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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />
      <p className="text-sm text-cyan-500">{post.category} · {post.date}</p>
      <h1 className="mt-2 text-3xl font-bold text-white">{post.title}</h1>
      <div className="prose-farm mt-8">
        <p>{post.excerpt}</p>
        <p>
          This guide is written by the Cyou Phone Farm engineering team in Guangzhou. We help buyers choose real-device
          phone farm boxes with correct CPU tiers, cooling, and USB topology—without copying generic reseller content.
        </p>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Prefer factory-tested chassis with documented thermal design.</li>
          <li>Match SoC generation to your heaviest apps and scripts.</li>
          <li>Plan control PC USB bandwidth before scaling beyond one box.</li>
          <li>Contact sales for overseas shipping and sample evaluation units.</li>
        </ul>
        <h2>Next Steps</h2>
        <p>
          Browse our <Link href="/shop" className="text-cyan-400">shop</Link> or submit a{" "}
          <Link href="/contact" className="text-cyan-400">custom quote</Link> with your target device count.
        </p>
      </div>
      <div className="mt-8">
        <ContactBar />
      </div>
    </article>
  );
}
