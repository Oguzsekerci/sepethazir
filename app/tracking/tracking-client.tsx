"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { products } from "@/data/products";
import { buildTrackedAffiliateUrl } from "@/lib/affiliate";
import { FakeOrder, useCart } from "@/store/cart";

const TrackingMap = dynamic(() => import("./tracking-map"), {
  ssr: false,
  loading: () => <div className="card map-card">Harita yükleniyor...</div>,
});

function statusLabel(status: FakeOrder["status"]) {
  if (status === "preparing") return "Hazırlanıyor";
  if (status === "courier") return "Kuryede";
  return "Teslim edildi";
}

export default function TrackingClient() {
  const searchParams = useSearchParams();
  const orders = useCart((state) => state.orders);
  const markDelivered = useCart((state) => state.markDelivered);
  const orderId = searchParams.get("order") ?? "";

  const order = useMemo(() => {
    return orders.find((item) => item.id === orderId) ?? orders[0];
  }, [orderId, orders]);
  const recommendations = products
    .filter((product) => !order?.items.some((item) => item.id === product.id))
    .slice(0, 6);

  if (!order) {
    return (
      <div className="card">
        <h1>Aktif kurye yok</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Önce sahte sipariş oluştur, sonra kurye takip ekranı canlansın.
        </p>
        <Link className="btn" href="/shop" style={{ marginTop: 14 }}>
          Ürünlere git
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Kurye takip</h1>
          <p className="muted">
            {order.id} · {statusLabel(order.status)} · {order.courier.name}
          </p>
        </div>
        <Link className="btn ghost" href="/orders">
          Siparişlere dön
        </Link>
      </div>

      <section className="void-shipping-card">
        <span className="badge">Sahte lojistik merkezi</span>
        <h2>Adres doğrulandı: paket hayal gücüne zimmetlendi.</h2>
        <p>
          Siparişin gerçek depodan değil, dopaminin arka odasından çıktı. Kurye
          şu an var olmayan bir sokakta ciddi ciddi yol tarifi alıyor.
        </p>
        <div className="shipping-meter" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="shipping-labels">
          <span>Fiş üretildi</span>
          <span>Kuryeye anlatıldı</span>
          <span>Kapına yaklaştı gibi</span>
        </div>
      </section>

      <div className="tracking-layout">
        <TrackingMap order={order} />

        <aside className="card">
          <span className={`status ${order.status}`}>
            {statusLabel(order.status)}
          </span>
          <h2 style={{ marginTop: 12 }}>{order.courier.etaMinutes} dk</h2>
          <p className="muted">Tahmini teslimat</p>

          <div className="fake-receipt" style={{ marginTop: 14 }}>
            <div className="receipt-row">
              <span>Kurye</span>
              <strong>{order.courier.name}</strong>
            </div>
            <div className="receipt-row">
              <span>Araç</span>
              <strong>{order.courier.vehicle}</strong>
            </div>
            <div className="receipt-row">
              <span>Plaka</span>
              <strong>{order.courier.plate}</strong>
            </div>
          </div>

          <div className="timeline" style={{ marginTop: 14 }}>
            <div className="timeline-step">
              <strong>Sipariş alındı</strong>
              <p className="muted">Sahte fiş oluşturuldu.</p>
            </div>
            <div className="timeline-step">
              <strong>Kuryeye verildi</strong>
              <p className="muted">Var olmayan kurye yola çıktı.</p>
            </div>
            <div className="timeline-step">
              <strong>Kapına yaklaşıyor</strong>
              <p className="muted">Dopamin seviyesi yükseliyor.</p>
            </div>
          </div>

          <button
            className="btn secondary"
            onClick={() => markDelivered(order.id)}
            style={{ marginTop: 14, width: "100%" }}
            type="button"
          >
            Teslim edildi gibi yap
          </button>
        </aside>
      </div>

      <section className="order-detail-band">
        <div className="card order-card">
          <div className="order-top">
            <div>
              <h2>Ne sipariş ettin?</h2>
              <p className="muted">
                Paket içeriği fiziksel olarak yok, ama liste gayet etkileyici.
              </p>
            </div>
            <strong>{order.total.toLocaleString("tr-TR")} TL</strong>
          </div>
          <div className="compact-order-items">
            {order.items.map((item) => (
              <div className="compact-order-item" key={item.id}>
                <span>{item.emoji}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p className="muted">
                    x{item.qty} · {(item.price * item.qty).toLocaleString("tr-TR")} TL
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dream-grid-section">
        <div className="page-head">
          <div>
            <h2>Hayal kurmaya devam</h2>
            <p className="muted">Sepete atınca yine para çekilmeyecek.</p>
          </div>
          <Link className="btn ghost" href="/shop">
            Tüm ürünler
          </Link>
        </div>
        <div className="dream-grid">
          {recommendations.map((product) => (
            <a
              className="dream-card"
              href={buildTrackedAffiliateUrl(product, "tracking-recommendation")}
              key={product.id}
              rel="noreferrer"
              target="_blank"
            >
              <span className="dream-image">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.imageAlt ?? product.name}
                    fill
                    sizes="(max-width: 560px) calc(50vw - 20px), 160px"
                  />
                ) : (
                  <span>{product.emoji}</span>
                )}
              </span>
              <strong>{product.name}</strong>
              <small>Amazon’da incele</small>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
