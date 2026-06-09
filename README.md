# phonefarm.cyou — Cyou Phone Farm

**Brand:** Cyou Phone Farm · **Location:** Guangzhou, China  
**Positioning:** B2B phone farm supplier — inquiry-first with optional direct checkout for standard SKUs.

## Local setup

```bash
npm run assets:sync
cp .env.example .env   # set DATABASE_URL + DIRECT_URL (Neon or local Postgres)
npm run db:migrate
npm run db:seed
npm run dev
```

## Database (Neon Postgres)

Production uses **Neon PostgreSQL** via Vercel environment variables:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon **pooled** connection string (app runtime) |
| `DIRECT_URL` | Neon **direct** connection string (`prisma migrate deploy`) |

The build runs `prisma migrate deploy` then `prisma db seed` (products + admin upsert only — never deletes orders or inquiries).

## Vercel environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Neon pooled URL |
| `DIRECT_URL` | Yes | Neon direct URL |
| `JWT_SECRET` | Yes | Long random string |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Yes | Admin login |
| `SITE_URL` | Yes | `https://www.phonefarm.cyou` |
| `USDT_TRC20_ADDRESS` | Yes | TRC20 receive address for orders |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_NOTIFY_CHAT_ID` | Recommended | Inquiry + order alerts (optional; submissions still succeed) |
| `CONTACT_WEBHOOK_URL` | Optional | Webhook backup for inquiries/orders |
| `GOOGLE_SITE_VERIFICATION` | Optional | Search Console HTML tag |
| `TRON_API_KEY` | Optional | Future on-chain verification |
| `CRON_SECRET` | Optional | Order expiry cron |

## Google Search Console

1. Add property `https://www.phonefarm.cyou`
2. Verify via HTML tag or DNS → set env if using meta tag → redeploy
3. Submit sitemap `https://www.phonefarm.cyou/sitemap.xml`

## GitHub

https://github.com/cheng19988/phonefarm.cyou

## Admin

`/admin/login` — credentials from Vercel `ADMIN_EMAIL` / `ADMIN_PASSWORD`
