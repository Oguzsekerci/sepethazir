"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getCartTotals, useCart } from "@/store/cart";

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const createFakeOrder = useCart((state) => state.createFakeOrder);
  const [address, setAddress] = useState("İstanbul, Kadıköy");
  const [fantasyNote, setFantasyNote] = useState("");
  const [cardName, setCardName] = useState("Limitsiz Platin Kart");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totals = getCartTotals(items);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Sepet boş. Önce ürün ekle.");
      return;
    }

    if (!address.trim()) {
      setError("Sahte teslimat adresi gerekli.");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createFakeOrder({
        address: address.trim(),
        fantasyNote: fantasyNote.trim() || cardName.trim(),
      });
      router.push(`/tracking?order=${order.id}`);
    } catch (err) {
      console.error(err);
      setError(
        "Sipariş oluşturulamadı. Supabase ayarı hatalıysa yerel kayıt yine çalışmalı."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sahte ödeme</h1>
          <p className="muted">Bu ekranda karttan para çekilmez.</p>
        </div>
        <Link className="btn ghost" href="/cart">
          Sepete dön
        </Link>
      </div>

      <div className="checkout-layout">
        <form className="card" onSubmit={handleSubmit}>
          <div className="notice" style={{ marginBottom: 14 }}>
            Gerçek kart numarası girme. Bu alan sadece deneyimin hikayesi için.
          </div>

          <div className="field">
            <label htmlFor="address">Sahte teslimat adresi</label>
            <textarea
              id="address"
              onChange={(event) => setAddress(event.target.value)}
              rows={3}
              value={address}
            />
          </div>

          <div className="field">
            <label htmlFor="cardName">Sahte kart adı</label>
            <input
              id="cardName"
              onChange={(event) => setCardName(event.target.value)}
              value={cardName}
            />
          </div>

          <div className="field">
            <label htmlFor="note">Sipariş notu</label>
            <input
              id="note"
              onChange={(event) => setFantasyNote(event.target.value)}
              placeholder="Bugün kendimi zengin hissediyorum"
              value={fantasyNote}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sipariş üretiliyor..." : "Sahte siparişi onayla"}
          </button>
        </form>

        <aside className="card">
          <h2>Sepet özeti</h2>
          <div style={{ marginTop: 12 }}>
            <div className="summary-row">
              <span>Ürün</span>
              <strong>{items.reduce((sum, item) => sum + item.qty, 0)}</strong>
            </div>
            <div className="summary-row">
              <span>Ara toplam</span>
              <strong>{formatPrice(totals.subtotal)} TL</strong>
            </div>
            <div className="summary-row">
              <span>Dopamin indirimi</span>
              <strong>-{formatPrice(totals.discount)} TL</strong>
            </div>
            <div className="summary-total">
              <span>Ödenecek</span>
              <span>0 TL</span>
            </div>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>
            Ekranda gösterilen {formatPrice(totals.total)} TL sadece simülasyon
            tutarıdır.
          </p>
        </aside>
      </div>
    </>
  );
}
