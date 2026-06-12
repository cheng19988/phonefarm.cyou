/** Buyer-facing labels for internal order/payment status strings. */
export function formatPaymentStatus(status: string): string {
  const key = status.toLowerCase().trim();
  const labels: Record<string, string> = {
    unpaid: "Awaiting payment",
    submitted: "Payment submitted — verifying",
    paid: "Paid",
    expired: "Payment window expired",
    quote: "Quote request",
  };
  return labels[key] ?? status.replace(/_/g, " ");
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
