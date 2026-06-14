import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { localePath } from "@/lib/i18n/paths";

type StubProps = {
  metadata: {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
  };
  heading: string;
  subtitle: string;
  body: string;
  enPath: string;
  enLabel: string;
};

export function zhStubMetadata(meta: StubProps["metadata"]) {
  return buildMetadata({
    locale: "zh",
    title: meta.title,
    description: meta.description,
    path: meta.path,
    keywords: meta.keywords,
  });
}

export function ZhContentStub({ heading, subtitle, body, enPath, enLabel }: Omit<StubProps, "metadata">) {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading as="h1" title={heading} subtitle={subtitle} />
          <p className="mt-4 max-w-2xl text-sm text-slate-600 leading-relaxed">{body}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href={localePath("zh", "/contact")} className="btn-primary !py-2 !px-4 text-sm">
              联系销售询价
            </Link>
            <Link href={enPath} className="link-accent">{enLabel}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
