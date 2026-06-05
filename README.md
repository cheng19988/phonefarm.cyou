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
| `SITE_URL` | e.g. `https://phonefarm.cyou` |

`DATABASE_URL` defaults via `vercel.json` to `file:./vercel.db`. For real orders and multi-instance hosting, switch to **Vercel Postgres** and update `prisma/schema.prisma` provider to `postgresql`.

## GitHub

https://github.com/cheng19988/phonefarm.cyou

## Admin

http://localhost:3000/admin/login — credentials in `.env`
