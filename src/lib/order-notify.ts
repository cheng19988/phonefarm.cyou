import { SITE } from "./constants";

type OrderLine = {
  name: string;
  quantity: number;
  lineTotalUsd: number;
};

type OrderNotifyPayload = {
  kind: "order_created" | "tx_submitted";
  orderNumber: string;
  customerName?: string | null;
  customerEmail?: string | null;
  contactMessaging?: string | null;
  country?: string | null;
  shippingAddress?: string | null;
  orderNotes?: string | null;
  expectedAmount: number;
  paymentStatus?: string;
  txHash?: string | null;
  items: OrderLine[];
};

function formatOrderText(data: OrderNotifyPayload): string {
  const header =
    data.kind === "order_created"
      ? `New order from ${SITE.domain}`
      : `Payment hash submitted from ${SITE.domain}`;

  const lines = [
    header,
    `Website: ${SITE.url}`,
    `Order: ${data.orderNumber}`,
    data.customerName ? `Name: ${data.customerName}` : null,
    data.customerEmail ? `Email: ${data.customerEmail}` : null,
    data.contactMessaging ? `WhatsApp/Telegram: ${data.contactMessaging}` : null,
    data.country ? `Country: ${data.country}` : null,
    data.shippingAddress ? `Address: ${data.shippingAddress}` : null,
    `Amount: $${data.expectedAmount} USD`,
    data.paymentStatus ? `Payment status: ${data.paymentStatus}` : null,
    data.txHash ? `TX hash: ${data.txHash}` : null,
    data.orderNotes ? `\nNotes:\n${data.orderNotes}` : null,
    "\nProducts:",
    ...data.items.map((i) => `· ${i.name} × ${i.quantity} — $${i.lineTotalUsd}`),
  ].filter(Boolean);

  return lines.join("\n");
}

async function sendTelegram(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;
  if (!botToken || !chatId) {
    console.warn("[notify] TELEGRAM_BOT_TOKEN or TELEGRAM_NOTIFY_CHAT_ID not configured — alert skipped");
    return false;
  }
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  }).catch(() => null);
  if (!res?.ok) {
    console.warn("[notify] Telegram send failed");
    return false;
  }
  return true;
}

/** Optional outbound alerts — does not block the API response on failure. */
export async function notifyOrderEvent(data: OrderNotifyPayload): Promise<void> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: data.kind, site: SITE.url, siteHost: SITE.domain, ...data }),
    }).catch(() => undefined);
  }
  await sendTelegram(formatOrderText(data));
}
