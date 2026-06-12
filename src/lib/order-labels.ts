import { normalizePaymentStatus, PAYMENT_STATUS } from "./payment-status";

/** Buyer-facing labels for internal order/payment status strings. */
export function formatPaymentStatus(status: string): string {
  const key = normalizePaymentStatus(status);
  const labels: Record<string, string> = {
    [PAYMENT_STATUS.PENDING]: "Pending — awaiting USDT",
    [PAYMENT_STATUS.MANUAL_REVIEW]: "Manual confirmation in progress",
    [PAYMENT_STATUS.PAID]: "Paid",
    [PAYMENT_STATUS.UNDERPAID]: "Underpaid — manual review",
    [PAYMENT_STATUS.OVERPAID]: "Overpaid — manual review",
    [PAYMENT_STATUS.EXPIRED]: "Expired",
    [PAYMENT_STATUS.QUOTE]: "Quote request",
    [PAYMENT_STATUS.CANCELLED]: "Cancelled",
    unpaid: "Pending — awaiting USDT",
    submitted: "Manual confirmation in progress",
    verifying: "Manual confirmation in progress",
  };
  return labels[key] ?? String(key).replace(/_/g, " ");
}

export function formatOrderStatus(status: string): string {
  const key = status.toLowerCase().trim();
  const labels: Record<string, string> = {
    "pending payment": "Awaiting USDT payment",
    pending: "Pending review",
    expired: "Expired",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    "waiting for payment": "Awaiting payment",
    paid: "Paid",
  };
  return labels[key] ?? status.replace(/_/g, " ");
}
