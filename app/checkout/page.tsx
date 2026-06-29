"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getCartTotals, useCart } from "@/store/cart";

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

const fakeCards = [
  {
    name: "Limitsiz Platin Kart",
    line: "Banka ararsa açma",
    number: "4242 0000 0000 ∞∞∞∞",
    theme: "black",
  },
  {
    name: "Babam Görmesin Card",
    line: "Ekstre görünmez, vicdan görünür",
    number: "3400 0000 0000 0000",
    theme: "orange",
  },
  {
    name: "Kendimi Ödüllendiriyorum",
    line: "Bugün hak ettim limiti",
    number: "2026 0615 0000 0000",
    theme: "green",
  },
  {
    name: "Maaş Yatmış Gibi",
    line: "Bakiye: hayal gücü",
    number: "0000 0000 0000 0001",
    theme: "blue",
  },
];

const deliveryModes = [
  {
    name: "Motorlu Hayal Kurye",
    desc: "Adresini bulamaz ama niyeti iyi.",
  },
  {
    name: "Işınlanmış Paket",
    desc: "Gelmiş gibi yapma garantili.",
  },
  {
    name: "Kapıya Yaklaşmış Gibi",
    desc: "Bildirim gelir, paket gelmez.",
  },
];

const deliveryAreas = [
  "İstanbul / Kadıköy civarı",
  "İstanbul / Beşiktaş civarı",
  "Ankara / Çankaya civarı",
  "İzmir / Karşıyaka civarı",
  "Bursa / Nilüfer civarı",
  "Antalya / Muratpaşa civarı",
  "Tamamen hayali bir mahalle",
] as const;

const paymentModes = ["Sahte Kart", "Hayali Cüzdan", "Kapıda Yoklama"] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const createFakeOrder = useCart((state) => state.createFakeOrder);
  const [deliveryArea, setDeliveryArea] = useState<(typeof deliveryAreas)[number]>(
    deliveryAreas[0]
  );
  const [fantasyNote, setFantasyNote] = useState("");
  const [cardName, setCardName] = useState(fakeCards[0].name);
  const [deliveryMode, setDeliveryMode] = useState(deliveryModes[0].name);
  const [paymentMode, setPaymentMode] = useState<(typeof paymentModes)[number]>(
    "Sahte Kart"
  );
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

    setIsSubmitting(true);

    try {
      const order = await createFakeOrder({
        address: deliveryArea,
        fantasyNote:
          fantasyNote.trim() ||
          `${cardName.trim()} · ${deliveryMode} · ${paymentMode}`,
      });
      router.push(`/success?order=${order.id}`);
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
        <form className="checkout-form" id="fake-checkout" onSubmit={handleSubmit}>
          <section className="card checkout-section">
            <div className="checkout-step">
              <span>1</span>
              <strong>Teslimat</strong>
            </div>
            <div className="notice" style={{ marginBottom: 14 }}>
            Gerçek kart numarası girme. Bu alan sadece deneyimin hikayesi için.
            </div>

            <div className="field">
              <label htmlFor="delivery-area">Anonim teslimat bölgesi</label>
              <select
                id="delivery-area"
                onChange={(event) =>
                  setDeliveryArea(event.target.value as (typeof deliveryAreas)[number])
                }
                value={deliveryArea}
              >
                {deliveryAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Kurye modu</label>
              <div className="delivery-mode-grid">
                {deliveryModes.map((mode) => (
                  <button
                    className={mode.name === deliveryMode ? "delivery-mode selected" : "delivery-mode"}
                    key={mode.name}
                    onClick={() => setDeliveryMode(mode.name)}
                    type="button"
                  >
                    <strong>{mode.name}</strong>
                    <span>{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="card checkout-section">
            <div className="checkout-step">
              <span>2</span>
              <strong>Ödeme gibi yap</strong>
            </div>

            <div className="field">
              <label>Ödeme modu</label>
              <div className="segmented-control">
                {paymentModes.map((mode) => (
                  <button
                    className={mode === paymentMode ? "selected" : ""}
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    type="button"
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Sahte kart seç</label>
              <div className="fake-card-grid">
                {fakeCards.map((card) => (
                  <button
                    className={`fake-card-option ${card.theme} ${
                      card.name === cardName ? "selected" : ""
                    }`}
                    key={card.name}
                    onClick={() => setCardName(card.name)}
                    type="button"
                  >
                    <span className="fake-card-top">
                      <span>SepetHazır</span>
                      <span>0 TL</span>
                    </span>
                    <strong>{card.name}</strong>
                    <span>{card.number}</span>
                    <small>{card.line}</small>
                  </button>
                ))}
              </div>
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

            <button className="btn desktop-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Sipariş üretiliyor..." : "Sahte siparişi onayla"}
            </button>
          </section>
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

      <div className="checkout-sticky-bar">
        <div>
          <span>Ödenecek</span>
          <strong>0 TL</strong>
          <small>{formatPrice(totals.total)} TL sadece ekranda yakışıklı duruyor.</small>
        </div>
        <button className="btn" disabled={isSubmitting} form="fake-checkout" type="submit">
          {isSubmitting ? "Üretiliyor..." : "Sahte siparişi oluştur"}
        </button>
      </div>
    </>
  );
}
