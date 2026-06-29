import { NextResponse } from "next/server";
import { isAllowedAmazonTarget } from "@/lib/affiliate";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { AffiliateClick } from "@/store/cart";

type AffiliateClickPayload = {
  click?: AffiliateClick;
};

const rateLimitWindowMs = 60 * 1000;
const rateLimitMax = 60;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local"
  );
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const key = getClientKey(request);
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > rateLimitMax;
}

function isAffiliateClick(value: unknown): value is AffiliateClick {
  if (!value || typeof value !== "object") return false;

  const click = value as Partial<AffiliateClick>;

  return (
    typeof click.id === "string" &&
    typeof click.productId === "number" &&
    click.productId > 0 &&
    typeof click.productName === "string" &&
    click.productName.length > 0 &&
    click.productName.length <= 160 &&
    typeof click.category === "string" &&
    click.category.length > 0 &&
    click.category.length <= 80 &&
    typeof click.href === "string" &&
    isAllowedAmazonTarget(click.href) &&
    typeof click.source === "string" &&
    click.source.length > 0 &&
    click.source.length <= 80 &&
    typeof click.createdAt === "string"
  );
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const payload = (await request.json().catch(() => null)) as
    | AffiliateClickPayload
    | null;

  if (!isAffiliateClick(payload?.click)) {
    return NextResponse.json({ error: "Invalid click payload" }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ status: "disabled" });
  }

  const { click } = payload;
  const { error } = await supabaseAdmin.from("affiliate_clicks").insert({
    public_id: click.id,
    user_id: null,
    product_id: click.productId,
    product_name: click.productName,
    category: click.category,
    href: click.href,
    source: click.source,
    created_at: click.createdAt,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ status: "synced" });
}
