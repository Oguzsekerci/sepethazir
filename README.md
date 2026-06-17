# SepetHazır

Para harcamadan alışveriş yapmış gibi hissettiren sahte sepet, sahte sipariş ve kurye takip deneyimi.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=sepethazir-21
NEXT_PUBLIC_AMAZON_LINK_ID=17183d8abbb6f1a60f791b706e1756a1
STATS_ACCESS_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Amazon affiliate links are generated in this format:

```text
https://www.amazon.com.tr/s?k=kablosuz+kulakl%C4%B1k&linkCode=ll2&tag=sepethazir-21&linkId=17183d8abbb6f1a60f791b706e1756a1&ref_=as_li_ss_tl
```

If these variables are omitted, the app defaults to `sepethazir-21` and the configured Amazon link id. The old `NEXT_PUBLIC_AMAZON_AFFILIATE_SUFFIX=&tag=sepethazir-21` format is still accepted for tag extraction.

Supabase is optional at runtime. If it is not configured, fake orders are still saved locally in the browser with Zustand.

`STATS_ACCESS_KEY` protects `/stats` in production. Open it with `/stats?key=YOUR_KEY`. `SUPABASE_SERVICE_ROLE_KEY` is optional and server-only; when present, `/stats` can read all Supabase order and affiliate click rows. Never prefix it with `NEXT_PUBLIC_`.

## Supabase Setup

Run `supabase/orders.sql` in the Supabase SQL editor. It creates the `orders` and `affiliate_clicks` tables with row-level security policies for anonymous fake order and affiliate click inserts.

## Product Links

Product cards route through `/out` first, record the affiliate click locally and in Supabase when configured, then redirect to Amazon TR using each product's `query` value from `data/products.ts`. To link to exact products instead of search results, set `affiliateUrl` on a product.

## Production Checklist

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the hosting provider.
2. Set `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=sepethazir-21` and `NEXT_PUBLIC_AMAZON_LINK_ID`.
3. Set `STATS_ACCESS_KEY` for the protected stats screen.
4. Optionally set `SUPABASE_SERVICE_ROLE_KEY` if `/stats` should read remote Supabase rows.
5. Run `supabase/orders.sql` in the target Supabase project.
6. Run `npm run lint`.
7. Run `npm run build`.
8. Test the core flow: products, cart, checkout, orders, tracking, stats.
