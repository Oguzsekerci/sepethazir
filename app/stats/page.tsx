import Link from "next/link";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  isStatsSessionValid,
  statsSessionCookieName,
} from "@/lib/stats-auth";
import type { AffiliateClick, CartItem, FakeOrder, OrderStatus } from "@/store/cart";
import StatsClient, { type StatsRemoteData } from "./stats-client";

type StatsSearchParams = {
  error?: string;
};

type RemoteOrderRow = {
  public_id: string | null;
  items: CartItem[] | null;
  subtotal: number | null;
  discount: number | null;
  shipping: number | null;
  total: number | null;
  address: string | null;
  status: OrderStatus | null;
  courier:
    | {
        name?: string;
        vehicle?: string;
        plate?: string;
        etaMinutes?: number;
      }
    | null;
  created_at: string | null;
};

type RemoteClickRow = {
  public_id: string | null;
  product_id: number | null;
  product_name: string | null;
  category: string | null;
  href: string | null;
  source: string | null;
  created_at: string | null;
};

function normalizeOrder(row: RemoteOrderRow, index: number): FakeOrder {
  return {
    id: row.public_id ?? `REMOTE-${index}`,
    items: row.items ?? [],
    subtotal: row.subtotal ?? 0,
    discount: row.discount ?? 0,
    shipping: row.shipping ?? 0,
    total: row.total ?? 0,
    address: row.address ?? "",
    status: row.status ?? "courier",
    createdAt: row.created_at ?? new Date(0).toISOString(),
    courier: {
      name: row.courier?.name ?? "Bilinmeyen kurye",
      vehicle: row.courier?.vehicle ?? "Bilinmeyen araç",
      plate: row.courier?.plate ?? "-",
      etaMinutes: row.courier?.etaMinutes ?? 0,
    },
  };
}

function normalizeClick(row: RemoteClickRow, index: number): AffiliateClick {
  return {
    id: row.public_id ?? `REMOTE-CLK-${index}`,
    productId: row.product_id ?? 0,
    productName: row.product_name ?? "Bilinmeyen ürün",
    category: row.category ?? "Genel",
    href: row.href ?? "",
    source: row.source ?? "unknown",
    createdAt: row.created_at ?? new Date(0).toISOString(),
  };
}

async function getRemoteStats(): Promise<StatsRemoteData> {
  if (!supabaseAdmin) {
    return {
      clicks: [],
      orders: [],
      status:
        "Remote veri kapalı. SUPABASE_SERVICE_ROLE_KEY tanımlanırsa stats tüm Supabase kayıtlarını da okur.",
    };
  }

  const [ordersResult, clicksResult] = await Promise.all([
    supabaseAdmin
      .from("orders")
      .select("public_id, items, subtotal, discount, shipping, total, address, status, courier, created_at")
      .order("created_at", { ascending: false })
      .limit(500),
    supabaseAdmin
      .from("affiliate_clicks")
      .select("public_id, product_id, product_name, category, href, source, created_at")
      .order("created_at", { ascending: false })
      .limit(1000),
  ]);

  if (ordersResult.error || clicksResult.error) {
    return {
      clicks: [],
      orders: [],
      status: `Remote veri okunamadı: ${
        ordersResult.error?.message ?? clicksResult.error?.message
      }`,
    };
  }

  return {
    clicks: (clicksResult.data ?? []).map((row, index) =>
      normalizeClick(row as RemoteClickRow, index)
    ),
    orders: (ordersResult.data ?? []).map((row, index) =>
      normalizeOrder(row as RemoteOrderRow, index)
    ),
    status: "Remote Supabase verisi aktif. Local tarayıcı verisiyle birleştirildi.",
  };
}

function StatsLocked({ invalidKey }: { invalidKey: boolean }) {
  return (
    <div className="card stats-lock">
      <span className="badge">Korumalı ekran</span>
      <h1>Stats erişimi kapalı</h1>
      <p className="muted">
        Devam etmek için stats anahtarını gir. Anahtar URL&apos;de taşınmaz.
      </p>
      <form action="/stats/access" method="post">
        <div className="field">
          <label htmlFor="key">Stats key</label>
          <input id="key" name="key" type="password" />
        </div>
        {invalidKey && <p className="error">Stats key hatalı.</p>}
        <button className="btn" type="submit">
          Stats ekranına gir
        </button>
      </form>
      <Link className="btn ghost" href="/shop">
        Ürünlere dön
      </Link>
    </div>
  );
}

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<StatsSearchParams>;
}) {
  const [{ error }, cookieStore] = await Promise.all([searchParams, cookies()]);
  const statsSession = cookieStore.get(statsSessionCookieName)?.value;

  if (!isStatsSessionValid(statsSession)) {
    return <StatsLocked invalidKey={error === "1"} />;
  }

  const remoteData = await getRemoteStats();

  return <StatsClient remoteData={remoteData} />;
}
