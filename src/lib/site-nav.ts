/** Shared main navigation — keep concise for B2B clarity. */
export const MAIN_NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/deployment", label: "Deployment" },
  { href: "/help", label: "Help" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Secondary links surfaced in mobile menu and footer. */
export const SECONDARY_NAV = [
  { href: "/phone-farm", label: "What is a phone farm" },
  { href: "/faq", label: "FAQ" },
  { href: "/services/packages", label: "Packages" },
] as const;
