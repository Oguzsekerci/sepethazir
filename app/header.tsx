"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/rehber", label: "Rehber" },
  { href: "/araclar/urun-karsilastir", label: "Karşılaştırma aracı" },
  { href: "/shop", label: "Kurgusal karar egzersizi" },
  { href: "/hakkimizda", label: "Hakkımızda" },
];

export default function Header() {
  const pathname = usePathname();
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
        {navItems.map((item) => (
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
