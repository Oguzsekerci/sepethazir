# SepetHazır

Para harcamadan alışveriş yapmış gibi hissettiren sahte sepet, sahte sipariş ve kurye takip deneyimi.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Run the HTTP smoke suite against a running local server:

```bash
npm run smoke
```

To target another environment:

```bash
SMOKE_BASE_URL=https://www.sepethazir.com.tr npm run smoke
```

Run local verification before committing:

```bash
npm run verify
```

Validate catalog consistency only:

```bash
npm run validate:products
```

Check environment variables:

```bash
npm run check:env
npm run check:env:prod
```

GitHub Actions runs `npm ci`, product validation, lint, audit, build, and a production smoke test on pushes to `main` and pull requests.

## Environment Variables

Copy `.env.example` to `.env.local` and fill the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=sepethazir-21
NEXT_PUBLIC_AMAZON_LINK_ID=17183d8abbb6f1a60f791b706e1756a1
STATS_ACCESS_KEY=
```

Amazon affiliate links are generated in this format:

```text
https://www.amazon.com.tr/s?k=kablosuz+kulakl%C4%B1k&linkCode=ll2&tag=sepethazir-21&linkId=17183d8abbb6f1a60f791b706e1756a1&ref_=as_li_ss_tl
```

If these variables are omitted, the app defaults to `sepethazir-21` and the configured Amazon link id. The old `NEXT_PUBLIC_AMAZON_AFFILIATE_SUFFIX=&tag=sepethazir-21` format is still accepted for tag extraction.

Supabase is optional at runtime. If it is not configured, fake orders are still saved locally in the browser with Zustand. Remote order and affiliate click writes go through server API routes and require `SUPABASE_SERVICE_ROLE_KEY`.

`STATS_ACCESS_KEY` protects `/stats` in production. Enter it through the locked stats form; the key is stored in a short-lived httpOnly cookie and is not carried in the URL. `SUPABASE_SERVICE_ROLE_KEY` is server-only; when present, `/stats` can read all Supabase order and affiliate click rows and the API routes can write remote events. Never prefix it with `NEXT_PUBLIC_`.

## Supabase Setup

Run `supabase/orders.sql` in the Supabase SQL editor. It creates the `orders` and `affiliate_clicks` tables with row-level security enabled. Client browsers do not write directly to Supabase; server API routes write with the service role key.

## Product Links

Product cards route through `/out` first, record the affiliate click locally and in Supabase when configured, then redirect to Amazon TR using each product's `query` value from `data/products.ts`. To link to exact products instead of search results, set `affiliateUrl` on a product.

## Production Checklist

See `docs/deployment.md` for the full deployment runbook.

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the hosting provider.
2. Set `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=sepethazir-21` and `NEXT_PUBLIC_AMAZON_LINK_ID`.
3. Set `STATS_ACCESS_KEY` for the protected stats screen.
4. Confirm `/stats` accepts `STATS_ACCESS_KEY` through the form and does not expose the key in the URL.
5. Run `supabase/orders.sql` in the target Supabase project.
6. Run `npm run check:env:prod`.
7. Run `npm run verify`.
8. Run `SMOKE_BASE_URL=https://www.sepethazir.com.tr npm run smoke`.
9. Test the core flow: products, cart, checkout, orders, tracking, stats.
