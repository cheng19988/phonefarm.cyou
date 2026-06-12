import { PAYMENT } from "./constants";

/** Canonical USDT payment statuses (stored in Order.paymentStatus). */
export const PAYMENT_STATUS = {
  PENDING: "pending",
  MANUAL_REVIEW: "manual_review",
  PAID: "paid",
  UNDERPAID: "underpaid",
  OVERPAID: "overpaid",
  EXPIRED: "expired",
  QUOTE: "quote",
  CANCELLED: "cancelled",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const ADMIN_PAYMENT_STATUSES: readonly PaymentStatus[] = [
  PAYMENT_STATUS.PENDING,
  PAYMENT_STATUS.MANUAL_REVIEW,
  PAYMENT_STATUS.PAID,
  PAYMENT_STATUS.UNDERPAID,
  PAYMENT_STATUS.OVERPAID,
  PAYMENT_STATUS.EXPIRED,
  PAYMENT_STATUS.QUOTE,
  PAYMENT_STATUS.CANCELLED,
];

/** USDT charge equals USD catalog reference (1:1); enforce checkout minimum. */
export function computeUsdtChargeAmount(catalogSubtotalUsd: number): number {
  return Math.max(PAYMENT.minAmount, catalogSubtotalUsd);
}

export function formatUsdtAmount(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Map legacy DB values to canonical status for display. */
export function normalizePaymentStatus(status: string): PaymentStatus | string {
  const key = status.toLowerCase().trim();
  if (key === "unpaid" || key === "waiting") return PAYMENT_STATUS.PENDING;
  if (key === "submitted" || key === "verifying") return PAYMENT_STATUS.MANUAL_REVIEW;
  return key;
}

export function isPaidStatus(status: string): boolean {
  const n = normalizePaymentStatus(status);
  return n === PAYMENT_STATUS.PAID || n === PAYMENT_STATUS.OVERPAID;
}
