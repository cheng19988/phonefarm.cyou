import { CONTACT, SITE } from "./constants";

const DEFAULT_SUBJECT = `${SITE.name} inquiry`;

/** mailto: — may open Google search if no desktop mail client is configured */
export function mailtoUrl(email = CONTACT.email, subject = DEFAULT_SUBJECT) {
  const params = new URLSearchParams({ subject });
  return `mailto:${email}?${params.toString()}`;
}

/** Gmail web compose — reliable in browser when mailto handler is missing */
export function gmailComposeUrl(email = CONTACT.email, subject = DEFAULT_SUBJECT) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email,
    su: subject,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function outlookComposeUrl(email = CONTACT.email, subject = DEFAULT_SUBJECT) {
  const params = new URLSearchParams({ to: email, subject });
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

export const CONTACT_URLS = {
  telegram: CONTACT.telegramUrl,
  whatsapp: CONTACT.whatsappUrl,
  mailto: mailtoUrl(),
  gmailCompose: gmailComposeUrl(),
  outlookCompose: outlookComposeUrl(),
} as const;
