"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { FakeOrder, useCart } from "@/store/cart";
import ProductImage from "../product-image";

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
  const addMany = useCart((state) => state.addMany);
  const recommendations = products.slice(0, 6);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Siparişler</h1>
          <p className="muted">
            {orders.length} sahte sipariş ve dopamin beklentisi.
          </p>
        </div>
        <Link className="btn" href="/shop">
          Ürünlere dön
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
                    <span className="badge">Simülasyon</span>
                  </div>
                ))}
              </div>

              <div className="summary-total">
                <span>Senaryo toplamı</span>
                <span>{formatPrice(order.total)} birim</span>
              </div>

              <Link className="btn secondary" href={`/tracking?order=${order.id}`}>
                Kuryeyi takip et
              </Link>
              <button
                className="btn ghost"
                onClick={() => addMany(order.items)}
                type="button"
              >
                Siparişi tekrar sepete al
              </button>
            </article>
          ))}
        </div>
      )}

      <section className="dream-grid-section">
        <div className="page-head">
          <div>
            <h2>Bir de bunlara bak</h2>
            <p className="muted">Sepeti doldurmak ücretsiz, pişmanlık opsiyonel.</p>
          </div>
          <Link className="btn ghost" href="/shop">
            Ürünlere dön
          </Link>
        </div>
        <div className="dream-grid">
          {recommendations.map((product) => (
            <a
              className="dream-card"
              href={`/shop/${product.id}`}
              key={product.id}
            >
              <span className="dream-image">
                <ProductImage
                  alt={product.imageAlt ?? product.name}
                  emoji={product.emoji}
                  image={product.image}
                  sizes="(max-width: 560px) calc(50vw - 20px), 160px"
                />
              </span>
              <strong>{product.name}</strong>
              <small>Detaya bak</small>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
