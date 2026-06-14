import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { ZH_FAQ_ITEMS } from "@/lib/i18n/zh-content";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = buildMetadata({
  locale: "zh",
  title: "手机农场 FAQ — 硬件、配置、物流、付款",
  description:
    `${ZH_FAQ_ITEMS.length}+ 个关于手机农场机箱、主板机箱、USB/LAN 控制、MOQ、样品、出口物流、USDT/形式发票付款与广州工厂支持的常见问题。`,
  path: "/faq",
  keywords: ["手机农场 FAQ", "手机农场 MOQ", "手机农场物流", "手机农场付款"],
});

export default function ZhFaqPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <JsonLd data={faqPageJsonLd(ZH_FAQ_ITEMS)} />
          <SectionHeading
            as="h1"
            title="手机农场常见问题"
            subtitle="面向采购商、集成商与企业采购的手机农场硬件 FAQ。"
          />
          <p className="mt-4 text-sm text-slate-600">{ZH_FAQ_ITEMS.length} 个问题</p>
        </div>
      </section>
      <div className="site-container py-12">
        <div className="max-w-3xl">
          <FaqAccordion items={ZH_FAQ_ITEMS} />
        </div>
        <section className="mt-16 max-w-3xl rounded-xl border border-sky-200 bg-sky-50 p-8">
          <h2 className="text-xl font-bold text-slate-900">还有问题？</h2>
          <p className="mt-2 text-slate-600">提交表单或通过 WhatsApp / Telegram 联系我们。</p>
          <div className="mt-6 max-w-xl">
            <ContactForm source="zh-faq-cta" />
          </div>
          <p className="mt-6 text-sm text-slate-500">
            <Link href="/zh/help" className="link-accent">帮助中心</Link>
            {" · "}
            <Link href="/faq" className="link-accent">English FAQ</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
