"use client";

import Link from "next/link";
import { getCartTotals, useCart } from "@/store/cart";
import ProductImage from "../product-image";

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

export default function CartPage() {
  const { items, inc, dec, clear } = useCart((state) => state);
  const totals = getCartTotals(items);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sepet</h1>
          <p className="muted">Bu, kurgusal mağazanın sepetidir. Gerçek ürün veya sipariş içermez; ödeme alınmaz.</p>
        </div>
        <Link className="btn ghost" href="/shop">
          Mağazaya dön
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="card">
          <h2>Sepet boş</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            Biraz pahalı ürün ekleyip sahte sipariş hissini başlat.
          </p>
          <Link className="btn" href="/shop" style={{ marginTop: 14 }}>
            Ürünlere git
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <div className="stack">
            {items.map((item) => (
              <article className="card cart-item" key={item.id}>
                <div className="cart-emoji">
                  <ProductImage
                    alt={item.imageAlt ?? item.name}
                    emoji={item.emoji}
                    image={item.image}
                    sizes="56px"
                  />
                </div>
                <div>
                  <h2 className="product-title">{item.name}</h2>
                  <p className="muted">Kurgusal örnek fiyat: {formatPrice(item.price)} TL</p>
                </div>
                <div className="qty">
                  <button
                    aria-label={`${item.name} adetini azalt`}
                    onClick={() => dec(item.id)}
                    type="button"
                  >
                    -
                  </button>
                  <strong aria-label={`${item.name} adedi: ${item.qty}`}>
                    {item.qty}
                  </strong>
                  <button
                    aria-label={`${item.name} adetini artır`}
                    onClick={() => inc(item.id)}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="card">
            <h2>Karar özeti</h2>
            <div style={{ marginTop: 12 }}>
              <div className="summary-row">
                <span>Toplam bütçe etkisi</span>
                <strong>{formatPrice(totals.subtotal)} TL</strong>
              </div>
              <div className="summary-row">
                <span>Bekleme payı</span>
                <strong>-{formatPrice(totals.discount)} TL</strong>
              </div>
              <div className="summary-row">
                <span>Ek karar yükü</span>
                <strong>{totals.shipping} TL</strong>
              </div>
              <div className="summary-total">
                <span>Toplam</span>
                <span>{formatPrice(totals.total)} TL</span>
              </div>
            </div>
            <div className="actions" style={{ marginTop: 14 }}>
              <Link className="btn" href="/checkout">
                Sahte sipariş oluştur
              </Link>
              <button className="btn ghost" onClick={clear} type="button">
                Sepeti temizle
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
