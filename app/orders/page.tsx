"use client";

import Link from "next/link";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { FakeOrder, useCart } from "@/store/cart";

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

function statusLabel(status: FakeOrder["status"]) {
  if (status === "preparing") return "Hazırlanıyor";
  if (status === "courier") return "Kuryede";
  return "Teslim edildi";
}

export default function OrdersPage() {
  const orders = useCart((state) => state.orders);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Siparişler</h1>
          <p className="muted">Tamamı sahte, hissi gerçek sipariş geçmişi.</p>
        </div>
        <Link className="btn" href="/shop">
          Yeni sepet yap
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="card">
          <h2>Henüz sipariş yok</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            Sepeti doldurup sahte sipariş oluşturduğunda burada görünecek.
          </p>
        </div>
      ) : (
        <div className="stack">
          {orders.map((order) => (
            <article className="card order-card" key={order.id}>
              <div className="order-top">
                <div>
                  <h2>{order.id}</h2>
                  <p className="muted">
                    {new Date(order.createdAt).toLocaleString("tr-TR")} ·{" "}
                    {order.items.reduce((sum, item) => sum + item.qty, 0)} ürün
                  </p>
                </div>
                <span className={`status ${order.status}`}>
                  {statusLabel(order.status)}
                </span>
              </div>

              <div className="stack">
                {order.items.slice(0, 3).map((item) => (
                  <div className="receipt-row" key={item.id}>
                    <span>
                      {item.emoji} {item.name} x{item.qty}
                    </span>
                    <a
                      className="badge"
                      href={buildAffiliateUrl(item.query)}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Amazon’da incele
                    </a>
                  </div>
                ))}
              </div>

              <div className="summary-total">
                <span>Sahte toplam</span>
                <span>{formatPrice(order.total)} TL</span>
              </div>

              <Link className="btn secondary" href={`/tracking?order=${order.id}`}>
                Kuryeyi takip et
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
