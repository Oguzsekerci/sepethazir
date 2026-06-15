"use client";

import Link from "next/link";
import { Product, useCart } from "@/store/cart";

export default function ProductDetailActions({ product }: { product: Product }) {
  const add = useCart((state) => state.add);
  const qty =
    useCart((state) => state.items.find((item) => item.id === product.id)?.qty) ??
    0;

  return (
    <div className="detail-actions">
      <button className="btn" onClick={() => add(product)} type="button">
        {qty > 0 ? `Sepette ${qty} · +1 ekle` : "Sepete ekle"}
      </button>
      <Link className="btn secondary" href="/cart">
        Sepete git
      </Link>
    </div>
  );
}
