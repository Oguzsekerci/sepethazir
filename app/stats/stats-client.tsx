"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { AffiliateClick, CartItem, FakeOrder, useCart } from "@/store/cart";

type RankedItem = {
  label: string;
  value: number;
  meta?: string;
};

export type StatsRemoteData = {
  clicks: AffiliateClick[];
  orders: FakeOrder[];
  status: string;
};

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

function mergeById<T extends { id: string }>(remoteItems: T[], localItems: T[]) {
  const merged = new Map<string, T>();

  remoteItems.forEach((item) => merged.set(item.id, item));
  localItems.forEach((item) => {
    if (!merged.has(item.id)) {
      merged.set(item.id, item);
    }
  });

  return Array.from(merged.values());
}

function rankBy<T>(
  items: T[],
  getKey: (item: T) => string,
  getValue: (item: T) => number = () => 1
) {
  const totals = new Map<string, number>();

  items.forEach((item) => {
    const key = getKey(item);
    totals.set(key, (totals.get(key) ?? 0) + getValue(item));
  });

  return Array.from(totals.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function getOrderedItems(orders: FakeOrder[]) {
  return orders.flatMap((order) => order.items);
}

function getCategoryCounts() {
  return rankBy(products, (product) => product.category);
}

function getCatalogHealth() {
  const categoryCounts = getCategoryCounts();
  const underfilled = categoryCounts
    .filter((item) => item.value < 4)
    .map((item) => item.label);
  const missingRatings = products.filter((product) => !product.rating).length;
  const missingReasons = products.filter((product) => !product.reasonToBuy).length;

  return {
    categoryCounts,
    underfilled,
    missingRatings,
    missingReasons,
    trendingCount: products.filter((product) => product.isTrending).length,
  };
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <article className="card stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{sub}</small>
    </article>
  );
}

function RankList({
  empty,
  items,
  suffix,
}: {
  empty: string;
  items: RankedItem[];
  suffix: string;
}) {
  if (items.length === 0) {
    return <p className="muted">{empty}</p>;
  }

  return (
    <div className="rank-list">
      {items.slice(0, 6).map((item, index) => (
        <div key={item.label}>
          <span>{index + 1}</span>
          <strong>{item.label}</strong>
          <small>
            {item.value.toLocaleString("tr-TR")} {suffix}
            {item.meta ? ` · ${item.meta}` : ""}
          </small>
        </div>
      ))}
    </div>
  );
}

function recentClickLabel(click: AffiliateClick) {
  return `${new Date(click.createdAt).toLocaleString("tr-TR")} · ${click.source}`;
}

export default function StatsClient({ remoteData }: { remoteData: StatsRemoteData }) {
  const localOrders = useCart((state) => state.orders);
  const localAffiliateClicks = useCart((state) => state.affiliateClicks);
  const orders = mergeById(remoteData.orders, localOrders);
  const affiliateClicks = mergeById(remoteData.clicks, localAffiliateClicks);
  const orderedItems = getOrderedItems(orders);
  const catalog = getCatalogHealth();
  const totalOrderValue = orders.reduce((sum, order) => sum + order.total, 0);
  const orderedQty = orderedItems.reduce((sum, item) => sum + item.qty, 0);
  const topClickedProducts = rankBy(
    affiliateClicks,
    (click) => click.productName
  );
  const topClickCategories = rankBy(affiliateClicks, (click) => click.category);
  const topClickSources = rankBy(affiliateClicks, (click) => click.source);
  const topOrderedProducts = rankBy<CartItem>(
    orderedItems,
    (item) => item.name,
    (item) => item.qty
  );
  const topOrderedCategories = rankBy<CartItem>(
    orderedItems,
    (item) => item.category,
    (item) => item.qty
  );

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Stats</h1>
          <p className="muted">
            Remote Supabase verisi uygunsa dahil edilir; tarayıcıdaki yerel veriyle birleştirilir.
          </p>
        </div>
        <Link className="btn" href="/shop">
          Ürünlere dön
        </Link>
      </div>

      <div className="notice stats-source">{remoteData.status}</div>

      <section className="stats-grid">
        <StatCard
          label="Affiliate çıkış"
          sub="Amazon'a giden takipli tıklama"
          value={affiliateClicks.length.toLocaleString("tr-TR")}
        />
        <StatCard
          label="Sahte sipariş"
          sub={`${orderedQty.toLocaleString("tr-TR")} ürün sepete girdi`}
          value={orders.length.toLocaleString("tr-TR")}
        />
        <StatCard
          label="Sahte ciro"
          sub="Gerçek ödeme yok, karar sinyali var"
          value={`${formatPrice(totalOrderValue)} TL`}
        />
        <StatCard
          label="Katalog"
          sub={`${catalog.trendingCount} trend ürün`}
          value={`${products.length} ürün`}
        />
      </section>

      <section className="analytics-layout">
        <div className="card analytics-panel">
          <div>
            <span className="badge">Affiliate</span>
            <h2>En çok tıklanan ürünler</h2>
          </div>
          <RankList
            empty="Henüz Amazon çıkışı yok. Shop'tan bir Amazon linkine tıklayınca burada görünür."
            items={topClickedProducts}
            suffix="tık"
          />
        </div>

        <div className="card analytics-panel">
          <div>
            <span className="badge">Kategori</span>
            <h2>Tıklama kategorileri</h2>
          </div>
          <RankList
            empty="Kategori tıklama verisi oluşmadı."
            items={topClickCategories}
            suffix="tık"
          />
        </div>

        <div className="card analytics-panel">
          <div>
            <span className="badge">Sipariş</span>
            <h2>Sepete en çok girenler</h2>
          </div>
          <RankList
            empty="Henüz sahte sipariş yok."
            items={topOrderedProducts}
            suffix="adet"
          />
        </div>

        <div className="card analytics-panel">
          <div>
            <span className="badge">Kaynak</span>
            <h2>Affiliate CTA kaynakları</h2>
          </div>
          <RankList
            empty="CTA kaynak verisi oluşmadı."
            items={topClickSources}
            suffix="tık"
          />
        </div>
      </section>

      <section className="analytics-layout">
        <div className="card analytics-panel">
          <div>
            <span className="badge">Katalog sağlığı</span>
            <h2>Kategori dağılımı</h2>
          </div>
          <RankList
            empty="Ürün kategorisi yok."
            items={catalog.categoryCounts}
            suffix="ürün"
          />
        </div>

        <div className="card analytics-panel">
          <div>
            <span className="badge">Öneri</span>
            <h2>Sonraki ürün artırımı</h2>
          </div>
          <div className="insight-list">
            <p>
              <strong>Az dolu kategoriler:</strong>{" "}
              {catalog.underfilled.length > 0
                ? catalog.underfilled.join(", ")
                : "Kategori dengesi iyi."}
            </p>
            <p>
              <strong>Rating eksik:</strong> {catalog.missingRatings} ürün
            </p>
            <p>
              <strong>Sepet nedeni eksik:</strong> {catalog.missingReasons} ürün
            </p>
            <p>
              <strong>Siparişte çalışan kategori:</strong>{" "}
              {topOrderedCategories[0]?.label ?? "Henüz veri yok"}
            </p>
          </div>
        </div>
      </section>

      <section className="card analytics-panel">
        <div>
          <span className="badge">Son hareket</span>
          <h2>Son affiliate çıkışları</h2>
        </div>
        {affiliateClicks.length === 0 ? (
          <p className="muted">Henüz tıklama kaydı yok.</p>
        ) : (
          <div className="recent-clicks">
            {affiliateClicks.slice(0, 8).map((click) => (
              <div key={click.id}>
                <strong>{click.productName}</strong>
                <span>{click.category}</span>
                <small>{recentClickLabel(click)}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
