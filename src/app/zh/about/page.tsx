import Link from "next/link";
import { SITE, CONTACT, DEPLOYMENT_STEPS } from "@/lib/constants";
import { FACILITY_GALLERY } from "@/lib/images";
import { FacilityPhoto } from "@/components/FacilityPhoto";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_URLS } from "@/lib/contact-urls";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { localePath } from "@/lib/i18n/paths";

export const metadata = buildMetadata({
  locale: "zh",
  title: "关于 Cyou Phone Farm — 广州手机农场工厂",
  description:
    "自 2017 年广州手机农场（phone farm）机箱制造商。工厂组装、老化 QC、出口包装、三星至 Pixel 品牌线、远程群控配置与全球 B2B 发货。",
  path: "/about",
  keywords: [
    "手机农场厂家",
    "手机农场工厂",
    "广州手机农场",
    "phone farm manufacturer",
    "主板机箱供应商",
  ],
});

const ZH_TRUST = [
  "广州工厂自 2017 年组装真实设备农场",
  "老化测试与序列记录随货",
  "出口加固包装与全球物流",
  "远程投屏与群控交付配置",
];

export default function ZhAboutPage() {
  return (
    <div className="bg-white">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首页", path: "/zh" },
          { name: "关于", path: "/zh/about" },
        ])}
      />
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            as="h1"
            title={`关于 ${SITE.name}`}
            subtitle={`广州工厂 · 自 ${SITE.since} 年真实设备手机农场 · 组装、老化、出口与远程配置支持。`}
          />
        </div>
      </section>

      <div className="site-container py-12 space-y-16">
        <section className="prose-farm max-w-3xl">
          <p>
            {SITE.name} 是广州的手机农场机箱制造商，为海外 B2B 买家生产真实 Android 主板农场。我们提供从机箱组装、老化
            QC、出口包装到远程群控配置的一站式交付，品牌线覆盖三星、OPPO、小米、一加与 Google Pixel 参考档位。
          </p>
          <p className="mt-4">
            网站价格为 USD 参考价。批量与出口订单通过 RFQ 获取形式发票；销售确认 MOQ、交期与付款方式后再付款。
          </p>
        </section>

        <section>
          <SectionHeading title="买家信任要点" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ZH_TRUST.map((point) => (
              <li key={point} className="card-premium px-5 py-4 text-sm text-slate-700">{point}</li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading title="部署流程概览" />
          <ol className="mt-8 space-y-4">
            {DEPLOYMENT_STEPS.map((step, i) => (
              <li key={step.title} className="card-premium flex gap-4 p-5">
                <span className="font-display text-lg font-bold text-sky-600">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href={localePath("zh", "/deployment")} className="link-accent mt-6 inline-block text-sm">
            完整部署页面 →
          </Link>
        </section>

        <section>
          <SectionHeading title="广州工厂" subtitle="组装、老化测试与出口包装。" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {FACILITY_GALLERY.slice(0, 8).map((photo) => (
              <FacilityPhoto key={photo.key} src={photo.src} alt={photo.alt} label={photo.label} />
            ))}
          </div>
        </section>

        <section className="card-premium p-8">
          <h2 className="text-xl font-bold text-slate-900">联系销售</h2>
          <p className="mt-2 text-sm text-slate-600">索取手机农场报价或预约工厂沟通。</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-medium">
              WhatsApp
            </a>
            <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="link-accent font-medium">
              Telegram
            </a>
            <a href={CONTACT_URLS.gmailCompose} target="_blank" rel="noopener noreferrer" className="link-accent font-medium">
              {CONTACT.email}
            </a>
          </div>
          <Link href={localePath("zh", "/contact")} className="btn-primary mt-6 inline-flex text-sm">
            索取报价
          </Link>
        </section>
      </div>
    </div>
  );
}
