export const PACKAGE_DETAILS = [
  {
    slug: "starter-setup",
    deliverables: [
      "1× 20-node box BOM review",
      "USB mirror baseline on one control PC",
      "Device labeling template",
      "7-day WhatsApp/Telegram support",
    ],
    timeline: "3–5 business days remote setup after hardware delivery",
    supportPeriod: "7 days chat support",
    notIncluded: ["On-site visit", "Custom VLAN design", "Bulk APK policy beyond baseline"],
    bestFor: "First-time buyers validating a single chassis for QA or pilot fleet",
  },
  {
    slug: "studio-pro",
    deliverables: [
      "Multi-box layout diagram",
      "Group control groups and sync rules",
      "Bulk APK test-on-one-node workflow",
      "30-day support window",
    ],
    timeline: "1–2 weeks including hardware coordination",
    supportPeriod: "30 days",
    notIncluded: ["Enterprise SLA", "Dedicated rack networking on-site"],
    bestFor: "Studios running 40–80 nodes with test-group labeling and batch APK policies",
  },
  {
    slug: "enterprise-deploy",
    deliverables: [
      "Custom cabinet or rack BOM",
      "Network VLAN review",
      "Commissioning runbook",
      "Optional SLA and spare-parts kit",
    ],
    timeline: "Quoted per program (typically 3–8 weeks)",
    supportPeriod: "SLA-based",
    notIncluded: ["Unless agreed: local customs brokerage", "Third-party software licenses"],
    bestFor: "Enterprise device labs and 100+ node programs",
  },
] as const;
