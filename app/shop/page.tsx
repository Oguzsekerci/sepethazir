"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { useCart } from "@/store/cart";

const categories = [
  "Tümü",
  ...Array.from(new Set(products.map((p) => p.category))),
];

const sortOptions = [
  "Öne çıkan",
  "Ucuzdan pahalıya",
  "Pahalıdan ucuza",
  "En yüksek indirim",
] as const;

type SortOption = (typeof sortOptions)[number];

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

function discountRate(price: number, oldPrice: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function ShopPage() {
  const add = useCart((state) => state.add);
  const itemCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0)
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [sort, setSort] = useState<SortOption>("Öne çıkan");
  const [toast, setToast] = useState("");

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      const matchesCategory = category === "Tümü" || product.category === category;
      const matchesQuery = product.name
        .toLocaleLowerCase("tr-TR")
        .includes(query.toLocaleLowerCase("tr-TR"));

      return matchesCategory && matchesQuery;
    });

    return [...matches].sort((a, b) => {
      if (sort === "Ucuzdan pahalıya") return a.price - b.price;
      if (sort === "Pahalıdan ucuza") return b.price - a.price;
      if (sort === "En yüksek indirim") {
        return discountRate(b.price, b.oldPrice) - discountRate(a.price, a.oldPrice);
      }

      return a.id - b.id;
    });
  }, [category, query, sort]);

  function handleAdd(product: (typeof products)[number]) {
    add(product);
    setToast(`${product.name} sepete eklendi.`);
    window.setTimeout(() => setToast(""), 2400);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Ürünler</h1>
          <p className="muted">
            Sepeti abartmak serbest. Buradaki siparişler simüle edilir.
          </p>
        </div>
        <Link className="btn secondary" href="/cart">
          Sepet ({itemCount})
        </Link>
      </div>

      <div className="card controls-card">
        <div className="field" style={{ marginBottom: 10 }}>
          <label htmlFor="search">Ürün ara</label>
          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="kulaklık, kahve makinesi, saat..."
          />
        </div>
        <div className="field" style={{ marginBottom: 10 }}>
          <label htmlFor="sort">Sıralama</label>
          <select
            id="sort"
            onChange={(event) => setSort(event.target.value as SortOption)}
            value={sort}
          >
            {sortOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="nav">
          {categories.map((item) => (
            <button
              className={item === category ? "btn" : "btn ghost"}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="result-bar">
        <span>{filteredProducts.length} ürün</span>
        <span>{category}</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="card empty-state">
          <h2>Ürün bulunamadı</h2>
          <p className="muted">
            Arama kelimesini sadeleştir veya farklı bir kategori seç.
          </p>
          <button
            className="btn"
            onClick={() => {
              setQuery("");
              setCategory("Tümü");
              setSort("Öne çıkan");
            }}
            type="button"
          >
            Filtreleri temizle
          </button>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
          <article className="card product-card" key={product.id}>
            <div className="product-visual">{product.emoji}</div>
            <span className="badge">{product.category}</span>
            <h2 className="product-title">{product.name}</h2>
            <div className="product-meta">
              <div>
                <div className="old-price">{formatPrice(product.oldPrice)} TL</div>
                <div className="price">{formatPrice(product.price)} TL</div>
              </div>
              <span className="badge">%{discountRate(product.price, product.oldPrice)}</span>
            </div>
            <div className="actions">
              <button
                className="btn"
                onClick={() => handleAdd(product)}
                type="button"
              >
                Sepete ekle
              </button>
              <a
                className="btn secondary"
                href={buildAffiliateUrl(product.query)}
                rel="noreferrer"
                target="_blank"
              >
                Amazon’da incele
              </a>
            </div>
          </article>
          ))}
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <Link href="/cart">Sepete git</Link>
        </div>
      )}
    </>
  );
}
