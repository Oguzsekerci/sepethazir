"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
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
    </>
  );
}
