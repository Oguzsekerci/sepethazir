"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/store/cart";

const navItems = [
  { href: "/shop", label: "Ürünler" },
  { href: "/orders", label: "Siparişler" },
  { href: "/tracking", label: "Kurye" },
  { href: "/stats", label: "Stats" },
];

export default function Header() {
  const pathname = usePathname();
  const itemCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0)
  );
  const cartIsActive = pathname === "/cart" || pathname === "/checkout";

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">SH</span>
        <span>SepetHazır</span>
      </Link>
      <nav className="nav" aria-label="Ana navigasyon">
        {navItems.slice(0, 1).map((item) => (
          <Link
            aria-current={isActive(item.href) ? "page" : undefined}
            className={isActive(item.href) ? "active" : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
        <Link
          aria-current={cartIsActive ? "page" : undefined}
          className={[
            "nav-cart",
            itemCount > 0 ? "has-items" : "",
            cartIsActive ? "active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          href="/cart"
        >
          Sepet
          {itemCount > 0 && <span>{itemCount}</span>}
        </Link>
        {navItems.slice(1).map((item) => (
          <Link
            aria-current={isActive(item.href) ? "page" : undefined}
            className={isActive(item.href) ? "active" : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
