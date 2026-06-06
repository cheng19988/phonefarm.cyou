# phonefarm.cyou — Cyou Phone Farm

**Brand:** Cyou Phone Farm · **Location:** Guangzhou, China  
**Reference structure:** https://www.niaozun.shop/ (see `reference-audit.md`)  
**Positioning:** Full-service phone farm setup—hardware shop + remote control + group control + deployment + support.

## Material library

```
D:\网站搭建素材库
└── FINAL_phonefarm_6sites_package_CN\02_六个网站分类素材\03_phonefarm.cyou_full_service_site  (preferred)
    — or fallback: 02_six_website_ready\phonefarm.cyou_full_service_site
```

```bash
npm run assets:sync
npm run db:seed
npm run dev
```

## Vercel deploy

The build runs `prisma migrate deploy` and `prisma db seed` so the catalog exists on deploy (SQLite file `prisma/vercel.db`, created at build time; `DATABASE_URL` is `file:./vercel.db` relative to the Prisma schema folder).

In the Vercel project **Environment Variables**, set at minimum:

| Variable | Notes |
|----------|--------|
| `JWT_SECRET` | Long random string (override the placeholder in `vercel.json`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin login |
| `SITE_URL` | `https://www.phonefarm.cyou` (canonical; apex redirects to www) |
| `GOOGLE_SITE_VERIFICATION` | HTML tag token from Search Console |
| `CONTACT_WEBHOOK_URL` | Optional Zapier/Make webhook for inquiry backup |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_NOTIFY_CHAT_ID` | Optional Telegram alert on new inquiry |

`DATABASE_URL` defaults via `vercel.json` to `file:./vercel.db`. **Contact submissions are not durable on Vercel SQLite** (DB resets on deploy). Use webhook/Telegram alerts or migrate to **Vercel Postgres** / Turso for persistent leads.

## Google Search Console

1. Add property `https://www.phonefarm.cyou`
2. Verify via HTML tag → set `GOOGLE_SITE_VERIFICATION` in Vercel → redeploy
3. Submit sitemap `https://www.phonefarm.cyou/sitemap.xml`
4. Request indexing for `/`, `/shop`, `/blog`, and top product pages

## GitHub

https://github.com/cheng19988/phonefarm.cyou

## Admin

http://localhost:3000/admin/login — credentials in `.env`
