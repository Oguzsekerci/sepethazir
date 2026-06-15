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

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

export default function ShopPage() {
  const add = useCart((state) => state.add);
  const itemCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.qty, 0)
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "Tümü" || product.category === category;
      const matchesQuery = product.name
        .toLocaleLowerCase("tr-TR")
        .includes(query.toLocaleLowerCase("tr-TR"));

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

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

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="field" style={{ marginBottom: 10 }}>
          <label htmlFor="search">Ürün ara</label>
          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="kulaklık, kahve makinesi, saat..."
          />
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
              <span className="badge">Sahte</span>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => add(product)} type="button">
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
    </>
  );
}
