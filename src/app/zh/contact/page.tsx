import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormFeedback } from "@/components/ContactFormFeedback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, SITE } from "@/lib/constants";
import { CONTACT_URLS } from "@/lib/contact-urls";
import { resolveProductPrefill } from "@/lib/product-prefill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, contactPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "zh",
  title: "联系销售 — 手机农场 RFQ 询价",
  description:
    "向 Cyou Phone Farm 广州工厂索取手机农场报价。提供品牌线、节点数、目的国与连接方式 — 书面 BOM、MOQ、形式发票，付款前确认最终报价。",
  path: "/contact",
  keywords: [
    "手机农场报价",
    "手机农场询价",
    "phone farm RFQ",
    "手机农场厂家联系",
    "广州手机农场",
  ],
});

export default async function ZhContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; intent?: string; contact?: string }>;
}) {
  const { product, intent, contact } = await searchParams;
  const prefill = await resolveProductPrefill(product);
  const formIntent = intent === "sample" ? "sample" : "quote";

  return (
    <div className="bg-white">
      <JsonLd data={contactPageJsonLd()} />
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            as="h1"
            title="联系销售"
            subtitle={`${SITE.name} · ${SITE.location} · 自 ${SITE.since} 年工厂组装与出口`}
          />
          <p className="mt-4 max-w-2xl text-sm text-slate-600 leading-relaxed">
            B2B RFQ 流程：广州工厂品牌线主板农场。提交表单获取书面 BOM、老化 QC 范围、出口包装与形式发票 — 付款前确认最终报价。
            部分标准 SKU 可在销售确认后使用 USDT 结账。商城显示价格均为参考价。
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-medium hover:text-emerald-600"
            >
              WhatsApp
            </a>
            <a
              href={CONTACT.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent font-medium"
            >
              Telegram
            </a>
            <a
              href={CONTACT_URLS.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent font-medium"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>

      <div className="site-container py-12">
        <ContactFormFeedback contact={contact} />
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm
              source="zh-contact"
              variant="full"
              prefill={prefill}
              intent={formIntent}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="card-premium p-6">
              <h2 className="font-semibold text-slate-900">询价时请提供</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>品牌线与目标 Android 版本</li>
                <li>节点数量与机箱数量</li>
                <li>目的国与物流偏好</li>
                <li>USB 投屏 / LAN OTG / WiFi 控制方式</li>
                <li>是否需要远程配置服务</li>
              </ul>
              <Link href="/zh/shop" className="link-accent mt-6 inline-block text-sm">
                浏览商城参考 SKU →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
