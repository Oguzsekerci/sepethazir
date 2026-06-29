import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { CartItem, FakeOrder, OrderStatus } from "@/store/cart";

type OrderPayload = {
  fantasyNote?: string;
  order?: FakeOrder;
};

const rateLimitWindowMs = 60 * 1000;
const rateLimitMax = 30;
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

function isOrderStatus(value: unknown): value is OrderStatus {
  return value === "preparing" || value === "courier" || value === "delivered";
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<CartItem>;

  return (
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    typeof item.price === "number" &&
    typeof item.oldPrice === "number" &&
    typeof item.emoji === "string" &&
    typeof item.query === "string" &&
    typeof item.category === "string" &&
    typeof item.qty === "number" &&
    item.qty > 0 &&
    item.qty <= 99
  );
}

function isFakeOrder(value: unknown): value is FakeOrder {
  if (!value || typeof value !== "object") return false;

  const order = value as Partial<FakeOrder>;

  return (
    typeof order.id === "string" &&
    Array.isArray(order.items) &&
    order.items.length > 0 &&
    order.items.length <= 50 &&
    order.items.every(isCartItem) &&
    typeof order.subtotal === "number" &&
    typeof order.discount === "number" &&
    typeof order.shipping === "number" &&
    typeof order.total === "number" &&
    typeof order.address === "string" &&
    order.address.length > 0 &&
    order.address.length <= 120 &&
    isOrderStatus(order.status) &&
    typeof order.createdAt === "string" &&
    Boolean(order.courier) &&
    typeof order.courier?.name === "string" &&
    typeof order.courier?.vehicle === "string" &&
    typeof order.courier?.plate === "string" &&
    typeof order.courier?.etaMinutes === "number"
  );
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const payload = (await request.json().catch(() => null)) as OrderPayload | null;

  if (!isFakeOrder(payload?.order)) {
    return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ remoteId: null, status: "disabled" });
  }

  const { order } = payload;
  const fantasyNote =
    typeof payload.fantasyNote === "string"
      ? payload.fantasyNote.slice(0, 240)
      : null;
  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      public_id: order.id,
      user_id: null,
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      total: order.total,
      address: order.address,
      status: order.status,
      courier: order.courier,
      fantasy_note: fantasyNote,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ remoteId: data?.id ?? null, status: "synced" });
}
