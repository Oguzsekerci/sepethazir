"use client";

import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();

  return (
    <div style={{ padding: 40 }}>
      <h1>Checkout</h1>

      <input placeholder="Adres" style={{ display: "block", marginBottom: 10 }} />
      <input placeholder="Kart" style={{ display: "block", marginBottom: 10 }} />

      <button
        onClick={() => router.push("/tracking")}
        style={{ marginTop: 20 }}
      >
        Siparişi Onayla
      </button>
    </div>
  );
}