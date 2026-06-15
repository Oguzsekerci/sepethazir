"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function Header() {
  const itemCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0)
  );

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">SH</span>
        <span>SepetHazır</span>
      </Link>
      <nav className="nav" aria-label="Ana navigasyon">
        <Link href="/shop">Ürünler</Link>
        <Link className={itemCount > 0 ? "nav-cart active" : "nav-cart"} href="/cart">
          Sepet
          {itemCount > 0 && <span>{itemCount}</span>}
        </Link>
        <Link href="/orders">Siparişler</Link>
        <Link href="/tracking">Kurye</Link>
      </nav>
    </header>
  );
}
