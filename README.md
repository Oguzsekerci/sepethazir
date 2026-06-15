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
NEXT_PUBLIC_AMAZON_AFFILIATE_SUFFIX=
```

Amazon affiliate suffix example:

```bash
NEXT_PUBLIC_AMAZON_AFFILIATE_SUFFIX=&tag=sepethazir-21
```

If this variable is omitted, the app defaults to `&tag=sepethazir-21`.

Supabase is optional at runtime. If it is not configured, fake orders are still saved locally in the browser with Zustand.

## Supabase Setup

Run `supabase/orders.sql` in the Supabase SQL editor. It creates the `orders` table and row-level security policies for anonymous fake order inserts.

## Product Links

Product cards link to Amazon TR search pages using each product's `query` value from `data/products.ts`. To link to exact products instead of search results, replace or extend the product data with Amazon ASINs or full Amazon URLs.

## Production Checklist

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the hosting provider.
2. Set `NEXT_PUBLIC_AMAZON_AFFILIATE_SUFFIX=&tag=sepethazir-21`.
3. Run `supabase/orders.sql` in the target Supabase project.
4. Run `npm run lint`.
5. Run `npm run build`.
6. Test the core flow: products, cart, checkout, orders, tracking.
