"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const products = [
  { id: 1, name: "Kulaklık Pro", price: 1299, emoji: "🎧", q: "kulaklık" },
  { id: 2, name: "Sneakers", price: 1999, emoji: "👟", q: "ayakkabı" },
  { id: 3, name: "Mekanik Klavye", price: 1499, emoji: "⌨️", q: "klavye" },
  { id: 4, name: "Kahve Makinesi", price: 2599, emoji: "☕", q: "kahve makinesi" },
];

export default function Shop() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "sans-serif" }}>
      
      {/* HEADER */}
      <div
        style={{
          background: "#FF6000",
          color: "#fff",
          padding: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <b>🛒 SepetHazır</b>

        <div
          onClick={() => alert(`Sepet: ${totalItems} ürün`)}
          style={{
            background: "#fff",
            color: "#FF6000",
            borderRadius: 20,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          {totalItems}
        </div>
      </div>

      {/* CART INFO */}
      <div style={{ padding: 10, fontSize: 14, opacity: 0.7 }}>
        Toplam: {totalPrice} ₺
      </div>

      {/* PRODUCTS */}
      <div style={{ padding: 10 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 12,
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 28 }}>{p.emoji}</div>
            <b>{p.name}</b>
            <p>{p.price} ₺</p>

            <button
              onClick={() => addToCart(p)}
              style={{
                background: "#FF6000",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Sepete Ekle
            </button>

            <button
              onClick={() => router.push("/checkout")}
              style={{
                marginLeft: 8,
                background: "#111",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}