"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { CONTACT, SHOP_BRANDS, SITE } from "@/lib/constants";
import { CONTACT_URLS } from "@/lib/contact-urls";
import { getCommonMessages } from "@/lib/i18n/messages";
import { localePath } from "@/lib/i18n/paths";
import { useLocale } from "./LocaleProvider";

const ZH_INTRO =
  "广州手机农场（phone farm）机箱制造商，自 2017 年工厂组装真实 Android 主板农场、远程群控配置与全球 B2B 出口。";

export function Footer() {
  const { locale } = useLocale();
  const t = getCommonMessages(locale);
  const intro = locale === "zh" ? ZH_INTRO : SITE.intro;

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="site-container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo compact />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{intro}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="link-accent">
                Telegram
              </a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-600">
                WhatsApp
              </a>
              <a href={CONTACT_URLS.gmailCompose} target="_blank" rel="noopener noreferrer" className="link-accent">
                {CONTACT.email}
              </a>
            </div>
            <Link href={localePath(locale, "/contact")} className="btn-primary mt-6 inline-flex text-sm !py-2 !px-4">
              {t.getQuote}
            </Link>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.footerShop}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SHOP_BRANDS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`${localePath(locale, "/shop")}?category=${c.slug}`}
                    className="text-slate-600 hover:text-sky-700 transition"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.footerServices}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={localePath(locale, "/phone-farm")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "什么是手机农场" : "What is a phone farm"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/solutions/phone-farming")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "企业解决方案" : "Enterprise solution"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/services")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "配置服务" : "Setup Services"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/deployment")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "部署流程" : "Deployment"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/services/packages")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "套餐方案" : "Packages"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/help")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "帮助中心" : "Help Center"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/faq")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "常见问题" : "FAQ"}
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.footerCompany}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href={localePath(locale, "/about")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "关于我们" : "About"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/contact")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "联系销售" : "Contact"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/blog")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "资讯" : "Insights"}
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "AI 引用指南" : "AI citation guide"}
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "网站地图" : "Sitemap"}
                </a>
              </li>
              <li>
                <Link href={localePath(locale, "/privacy")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "隐私政策" : "Privacy"}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, "/terms")} className="text-slate-600 hover:text-sky-700 transition">
                  {locale === "zh" ? "服务条款" : "Terms"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.name}. {SITE.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
