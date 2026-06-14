import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { PAGE_IMAGES } from "@/lib/images";
import { ZH_PHONE_FARM_COMPARE } from "@/lib/i18n/zh-content";
import { localePath } from "@/lib/i18n/paths";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  locale: "zh",
  title: "什么是手机农场？Phone Farm 安卓设备农场硬件",
  description:
    "什么是手机农场（phone farm）？广州工厂生产的 2U 主板机箱，约 20 台 Android 节点，USB/LAN 群控，适合应用 QA 实验室与企业级部署。自 2017 年制造出口。",
  path: "/phone-farm",
  keywords: [
    "手机农场",
    "什么是手机农场",
    "phone farm",
    "phone farm box",
    "安卓设备农场",
    "手机农场机箱",
  ],
});

const ZH_USE_CASES = [
  "应用 QA 与兼容性测试",
  "多设备自动化与回归测试",
  "企业设备实验室",
  "长期老化与稳定性测试",
  "远程设备管理与批量部署",
  "合法 B2B 设备农场项目",
];

export default function ZhPhoneFarmPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-sky-50">
        <div className="site-container py-12 lg:py-16">
          <SectionHeading
            as="h1"
            title="什么是手机农场（Phone Farm）？"
            subtitle="工厂生产的真实 Android 主板机箱 — 非桌上散放的手机。面向专业 QA、设备实验室与企业级机群。"
          />
        </div>
      </section>

      <div className="site-container py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="prose-farm max-w-none">
            <p>
              {SITE.name} 的手机农场是金属机箱，可容纳多达二十块无屏无电池的 Android 主板。电源、散热与 USB 或
              LAN 控制集中管理，团队可在自有网络策略下投屏、分组与批量部署 APK。
            </p>
            <p>
              自 {SITE.since} 年起我们在广州组装这些机箱，进行老化测试并附序列记录，为海外买家加固出口包装，并在交付时配置远程控制。
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={PAGE_IMAGES.phoneFarmAside}
              alt="手机农场机箱生产线组装"
              fill
              className="object-contain p-3"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <section className="mt-16">
          <SectionHeading title="典型配置" subtitle="标准 20 节点机箱 — 可通过配件与网络套件扩展。" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "机箱", body: "2U 结构，四风扇散热，自适应电源" },
              { title: "节点", body: "20 主板位 — 三星、小米、OPPO、Pixel 等档位" },
              { title: "控制", body: "USB 投屏或 LAN OTG，连接专用控制电脑" },
              { title: "运维", body: "老化测试单、出口包装、远程配置支持" },
            ].map((item) => (
              <div key={item.title} className="card-premium p-5">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading title="真实设备 vs 模拟器 vs 云手机" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">维度</th>
                  <th className="px-4 py-3 font-semibold text-sky-800">手机农场</th>
                  <th className="px-4 py-3 font-semibold">模拟器</th>
                  <th className="px-4 py-3 font-semibold">云手机</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ZH_PHONE_FARM_COMPARE.map((row) => (
                  <tr key={row.aspect} className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.aspect}</td>
                    <td className="px-4 py-3 text-slate-700">{row.farm}</td>
                    <td className="px-4 py-3 text-slate-600">{row.emulator}</td>
                    <td className="px-4 py-3 text-slate-600">{row.cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading title="合法 B2B 应用场景" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ZH_USE_CASES.map((use) => (
              <li key={use} className="card-premium px-4 py-3 text-sm text-slate-700">
                {use}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <Link href={localePath("zh", "/shop")} className="card-premium p-6 hover:border-sky-300">
            <h3 className="font-semibold text-slate-900">浏览硬件商城</h3>
            <p className="mt-2 text-sm text-slate-600">32+ SKU — 机箱、集线器、电源、网络套件。</p>
            <span className="link-accent mt-4 inline-block text-sm">进入商城</span>
          </Link>
          <Link href={localePath("zh", "/services")} className="card-premium p-6 hover:border-sky-300">
            <h3 className="font-semibold text-slate-900">配置服务</h3>
            <p className="mt-2 text-sm text-slate-600">远程控制、群控系统、部署 commissioning。</p>
            <span className="link-accent mt-4 inline-block text-sm">查看服务</span>
          </Link>
          <Link href="/help/after-purchase-guide" className="card-premium p-6 hover:border-sky-300">
            <h3 className="font-semibold text-slate-900">收货后指南</h3>
            <p className="mt-2 text-sm text-slate-600">连接、老化与首周运维清单（英文详细版）。</p>
            <span className="link-accent mt-4 inline-block text-sm">阅读指南</span>
          </Link>
        </section>

        <section className="mt-16 max-w-xl">
          <h2 className="page-section-title">讨论您的实验室需求</h2>
          <p className="mt-2 text-sm text-slate-600">提供节点数、目的国与控制方式，获取书面报价。</p>
          <div className="card-premium mt-6 p-6">
            <ContactForm source="zh-phone-farm" variant="full" />
          </div>
        </section>
      </div>
    </div>
  );
}
