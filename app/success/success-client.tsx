"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { products } from "@/data/products";
import { useCart } from "@/store/cart";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const orders = useCart((state) => state.orders);
  const addMany = useCart((state) => state.addMany);
  const orderId = searchParams.get("order") ?? "";
  const order = useMemo(() => {
    return orders.find((item) => item.id === orderId) ?? orders[0];
  }, [orderId, orders]);

  if (!order) {
    return (
      <div className="card empty-state">
        <h1>Sahte ödeme bulunamadı</h1>
        <p className="muted">Önce sepeti doldur, sonra dopamin fişi keselim.</p>
        <Link className="btn" href="/shop">
          Ürünlere git
        </Link>
      </div>
    );
  }

  const dopaminePoints = Math.max(150, Math.round(order.total / 10));
  const orderedCategories = new Set(order.items.map((item) => item.category));
  const recommendations = products
    .filter(
      (product) =>
        orderedCategories.has(product.category) &&
        !order.items.some((item) => item.id === product.id)
    )
    .slice(0, 3);

  return (
    <main className="success-wrap">
      <section className="success-card">
        <span className="success-confetti">🎉</span>
        <h1>Sahte ödeme başarılı!</h1>
        <p className="muted">
          Kartından 0 TL çekildi. Beynin ise bunu gerçek alışveriş sandı.
        </p>

        <div className="dopamine-score">
          <span>Kazandığın dopamin puanı</span>
          <strong>+{dopaminePoints}</strong>
          <small>Bu puan hiçbir yerde geçmez, moralde geçer.</small>
        </div>

        <div className="confirmation-box">
          <span>📩</span>
          <div>
            <strong>Onay maili gönderilmiş gibi yapıldı</strong>
            <p className="muted">
              Konu: {order.id} numaralı siparişin evrene bildirildi.
            </p>
          </div>
        </div>

        <div className="success-actions">
          <Link className="btn" href={`/tracking?order=${order.id}`}>
            Kuryeyi takip et
          </Link>
          <Link className="btn ghost" href="/shop">
            Alışverişe devam et
          </Link>
          <button className="btn secondary" onClick={() => addMany(order.items)} type="button">
            Aynı sepeti tekrar kur
          </button>
        </div>

        {recommendations.length > 0 && (
          <div className="success-recommendations">
            {recommendations.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id}>
                <span>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.imageAlt ?? product.name}
                      fill
                      sizes="52px"
                    />
                  ) : (
                    product.emoji
                  )}
                </span>
                <strong>{product.name}</strong>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
