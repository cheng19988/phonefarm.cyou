import { ALL_HARDWARE_CATALOG } from "./hardware-catalog";
import { prisma } from "./prisma";

const SERVICE_PREFILL: Record<string, string> = {
  "mirror-setup-basic-renewal": "Control Software Onboarding",
  "mirror-setup-cloud-bridge": "Remote Mirror Workspace Setup",
  "mirror-setup-annual-pro": "Annual Maintenance Support",
  "group-control-onboarding": "Group Control Onboarding",
  "package-starter-setup": "Starter Setup Package",
  "package-studio-pro": "Studio Pro Package",
  "package-enterprise-deploy": "Enterprise Deployment (Quote)",
  "motherboard-box-20-slot": "20-Slot Motherboard Box",
  "industrial-usb-hub-20-port": "Industrial 20-Port USB Hub",
  "adaptive-power-supply-550w": "550W Adaptive Power Supply",
  "quad-fan-cooling-kit": "Quad-Fan Cooling Kit",
  "gigabit-farm-network-kit": "Gigabit Farm Network Kit",
};

export function resolveProductPrefillSync(slugOrLabel: string | undefined) {
  if (!slugOrLabel?.trim()) {
    return { slug: "", displayName: "" };
  }
  const trimmed = slugOrLabel.trim();
  const bySlug = ALL_HARDWARE_CATALOG.find((p) => p.slug === trimmed);
  if (bySlug) {
    return { slug: bySlug.slug, displayName: bySlug.name };
  }
  const serviceName = SERVICE_PREFILL[trimmed];
  if (serviceName) {
    return { slug: trimmed, displayName: serviceName };
  }
  const byName = ALL_HARDWARE_CATALOG.find((p) => p.name.toLowerCase() === trimmed.toLowerCase());
  if (byName) {
    return { slug: byName.slug, displayName: byName.name };
  }
  return { slug: trimmed, displayName: trimmed };
}

export async function resolveProductPrefill(slugOrLabel: string | undefined) {
  const sync = resolveProductPrefillSync(slugOrLabel);
  if (!slugOrLabel?.trim()) return sync;

  const trimmed = slugOrLabel.trim();
  if (sync.displayName !== trimmed && SERVICE_PREFILL[trimmed]) return sync;
  if (ALL_HARDWARE_CATALOG.some((p) => p.slug === trimmed)) return sync;

  const product = await prisma.product.findUnique({
    where: { slug: trimmed },
    select: { slug: true, name: true },
  });
  if (product) {
    return { slug: product.slug, displayName: product.name };
  }
  return sync;
}
