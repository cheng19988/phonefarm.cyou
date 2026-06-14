import type { Locale } from "./config";

export type NavItem = { href: string; label: string };

const EN_MAIN_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/deployment", label: "Deployment" },
  { href: "/help", label: "Help" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ZH_MAIN_NAV: NavItem[] = [
  { href: "/", label: "首页" },
  { href: "/shop", label: "产品商城" },
  { href: "/services", label: "服务" },
  { href: "/deployment", label: "部署" },
  { href: "/help", label: "帮助中心" },
  { href: "/blog", label: "资讯" },
  { href: "/about", label: "关于我们" },
  { href: "/contact", label: "联系销售" },
];

const EN_SECONDARY_NAV: NavItem[] = [
  { href: "/phone-farm", label: "What is a phone farm" },
  { href: "/faq", label: "FAQ" },
  { href: "/services/packages", label: "Packages" },
];

const ZH_SECONDARY_NAV: NavItem[] = [
  { href: "/phone-farm", label: "什么是手机农场" },
  { href: "/faq", label: "常见问题" },
  { href: "/services/packages", label: "套餐方案" },
];

export function getMainNav(locale: Locale): NavItem[] {
  return locale === "zh" ? ZH_MAIN_NAV : EN_MAIN_NAV;
}

export function getSecondaryNav(locale: Locale): NavItem[] {
  return locale === "zh" ? ZH_SECONDARY_NAV : EN_SECONDARY_NAV;
}

type CommonMessages = {
  getQuote: string;
  packages: string;
  brands: string;
  shop: string;
  services: string;
  company: string;
  language: string;
  switchToEn: string;
  switchToZh: string;
  requestQuote: string;
  browseShop: string;
  account: string;
  menu: string;
  closeMenu: string;
  openMenu: string;
  footerShop: string;
  footerServices: string;
  footerCompany: string;
  referencePrice: string;
  finalQuoteNote: string;
};

const EN_COMMON: CommonMessages = {
  getQuote: "Get Quote",
  packages: "Packages",
  brands: "Brands",
  shop: "Shop",
  services: "Services",
  company: "Company",
  language: "Language",
  switchToEn: "English",
  switchToZh: "中文",
  requestQuote: "Request a Quote",
  browseShop: "Browse Shop",
  account: "Account",
  menu: "Menu",
  closeMenu: "Close",
  openMenu: "Open menu",
  footerShop: "Shop",
  footerServices: "Services",
  footerCompany: "Company",
  referencePrice: "Reference price",
  finalQuoteNote: "Final quote confirmed before payment",
};

const ZH_COMMON: CommonMessages = {
  getQuote: "获取报价",
  packages: "套餐",
  brands: "品牌",
  shop: "商城",
  services: "服务",
  company: "公司",
  language: "语言",
  switchToEn: "English",
  switchToZh: "中文",
  requestQuote: "索取报价",
  browseShop: "浏览商城",
  account: "账户",
  menu: "菜单",
  closeMenu: "关闭",
  openMenu: "打开菜单",
  footerShop: "产品商城",
  footerServices: "服务",
  footerCompany: "公司",
  referencePrice: "参考价",
  finalQuoteNote: "付款前确认最终报价",
};

export function getCommonMessages(locale: Locale): CommonMessages {
  return locale === "zh" ? ZH_COMMON : EN_COMMON;
}
