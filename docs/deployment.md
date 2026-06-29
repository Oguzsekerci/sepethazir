# Deployment Runbook

## 1. Environment

Set these in the hosting provider before deploying production:

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
STATS_ACCESS_KEY=
NEXT_PUBLIC_AMAZON_AFFILIATE_TAG=sepethazir-21
NEXT_PUBLIC_AMAZON_LINK_ID=17183d8abbb6f1a60f791b706e1756a1
```

Run locally when the same values are available:

```bash
npm run check:env:prod
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` as a `NEXT_PUBLIC_` variable.

## 2. Supabase

Run `supabase/orders.sql` in the target Supabase project.

Expected result:

- `orders` and `affiliate_clicks` tables exist.
- Row-level security is enabled.
- Anonymous insert policies are removed.
- Server routes write with the service role key.

## 3. Pre-Deploy

```bash
npm ci
npm run verify
```

`npm run verify` runs product validation, lint, production build, and audit.

## 4. Deploy

Deploy from `main` after CI passes.

## 5. Post-Deploy Smoke

```bash
SMOKE_BASE_URL=https://www.sepethazir.com.tr npm run smoke
```

Also check manually:

- `/shop`
- `/checkout`
- `/out` with a product link
- `/stats`
- `/api/health`

## 6. Stats

Open `/stats`, enter `STATS_ACCESS_KEY`, then confirm:

- Stats screen opens without the key in the URL.
- Logout returns to the locked stats screen.
- Remote Supabase status is active when service role env is configured.

## 7. Analytics Test

Create one fake order and click one Amazon link.

Then reopen `/stats` and confirm:

- Fake order count changes.
- Affiliate click count changes.
- Recent affiliate click shows the source.

## 8. Rollback

If smoke or core flow fails after deploy:

1. Revert to the previous working deployment in Vercel.
2. Check `/api/health`.
3. Re-run production smoke against the rollback URL.
4. Inspect Vercel function logs for `/api/orders`, `/api/affiliate-clicks`, and `/stats`.
