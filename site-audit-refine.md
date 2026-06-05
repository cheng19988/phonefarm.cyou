# Site Audit & Refine — Cyou Phone Farm (phonefarm.cyou)

**Reference:** [niaozun.shop](https://www.niaozun.shop/) (structure only)  
**Date:** 2026-06-05

## Critical issues found

| Issue | Impact | Action |
|-------|--------|--------|
| `public/images/` empty in repo | Broken hero, product, facility images site-wide | Synced 74 files from fallback material pack |
| `/products` duplicates `/shop` | Confusing nav, split SEO | Redirect `/products` → `/shop` |
| `/support` duplicates `/help` | Redundant nav item | Keep redirect; remove Support from header |
| ProductCard CTA says "Add to Cart" but links to detail | Misleading button | Rename to "View details" |
| Header pushes Login + Cart + duplicate Shop | Feels like unfinished mall template | Lead with Get Quote / Contact; de-emphasize account |
| `GLOBAL_STATS` fake order table | High AI-template signal | Replace with honest "Regions we ship to" |
| `CURRENCY.label` mentions USDT checkout | Over-promises payment flow | Quote-first wording |
| Company photos referenced but not deployed | About/home facility grid broken | Copied from material library |

## Pages reviewed

- `/` — dense but structurally aligned with reference; stats table and mirror VIP block need tone pass
- `/shop`, `/products/[slug]` — functional; quote-first CTAs preferred
- `/services`, `/deployment`, `/services/packages` — solid B2B structure
- `/help`, `/faq`, `/about`, `/contact` — usable; about needs more factory credibility
- `/login`, `/cart`, `/admin` — exist but not promoted (per scope: no new commerce complexity)

## Not in scope (per request)

- No new payment, auth, admin, or database features
- No full rewrite of seed/catalog or Prisma layer
