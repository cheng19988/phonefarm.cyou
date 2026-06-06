type ContactPayload = {
  name: string;
  email: string;
  country?: string | null;
  messaging?: string | null;
  phone?: string | null;
  deviceQuantity?: string | null;
  productInterest?: string | null;
  message?: string | null;
  source?: string | null;
};

function formatContactText(data: ContactPayload): string {
  const lines = [
    "New inquiry — phonefarm.cyou",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.country ? `Country: ${data.country}` : null,
    data.messaging ? `Messaging: ${data.messaging}` : null,
    data.phone ? `Phone: ${data.phone}` : null,
    data.deviceQuantity ? `Quantity: ${data.deviceQuantity}` : null,
    data.productInterest ? `Product: ${data.productInterest}` : null,
    data.source ? `Source: ${data.source}` : null,
    data.message ? `\n${data.message}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

/** Optional outbound alerts — does not block the API response on failure. */
export async function notifyContactSubmission(data: ContactPayload): Promise<void> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact_submission", ...data }),
    }).catch(() => undefined);
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;
  if (botToken && chatId) {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatContactText(data),
        disable_web_page_preview: true,
      }),
    }).catch(() => undefined);
  }
}
