"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import { buildTrackedAffiliateUrl } from "@/lib/affiliate";
import { type Product, useCart } from "@/store/cart";
import AdSlot from "../ad-slot";
import ProductImage from "../product-image";

const categories = [
  "Tümü",
  ...Array.from(new Set(products.map((p) => p.category))),
];

const sortOptions = [
  "Öne çıkan",
  "Ucuzdan pahalıya",
  "Pahalıdan ucuza",
  "En yüksek indirim",
  "En popüler",
  "Dopamin skoru",
] as const;

type SortOption = (typeof sortOptions)[number];

const quickFilters = [
  {
    id: "all",
    label: "Tüm ruh halleri",
    desc: "Kategori ve arama ne diyorsa onu göster.",
  },
  {
    id: "trend",
    label: "Trend sepet",
    desc: "Sepete atınca daha güncel hissettirenler.",
  },
  {
    id: "dopamine",
    label: "Dopamin yüksek",
    desc: "Puanı yüksek, bahanesi hazır ürünler.",
  },
  {
    id: "setup",
    label: "Setup kuruyorum",
    desc: "Masa, ofis ve gaming bahanesine yakın şeyler.",
  },
  {
    id: "home",
    label: "Ev modu",
    desc: "Evi toparlıyormuş gibi hissettirenler.",
  },
  {
    id: "escape",
    label: "Kaçış planı",
    desc: "Outdoor, seyahat ve hafta sonu fantezileri.",
  },
] as const;

type QuickFilterId = (typeof quickFilters)[number]["id"];

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

function discountRate(price: number, oldPrice: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function searchableText(product: Product) {
  return [
    product.name,
    product.category,
    product.blurb,
    product.status,
    product.meme,
    ...(product.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("tr-TR");
}

function matchesQuickFilter(product: Product, activeFilter: QuickFilterId) {
  if (activeFilter === "all") return true;
  if (activeFilter === "trend") return Boolean(product.isTrending);
  if (activeFilter === "dopamine") return (product.dopamineScore ?? 0) >= 82;
  if (activeFilter === "setup") {
    return [product.category, ...(product.tags ?? [])].some((item) =>
      ["Teknoloji", "Ofis", "Gaming", "Setup", "Home office"].includes(item)
    );
  }
  if (activeFilter === "home") {
    return [product.category, ...(product.tags ?? [])].some((item) =>
      ["Ev", "Mutfak", "Dekor", "Rahatlık", "Kişisel Bakım"].includes(item)
    );
  }
  if (activeFilter === "escape") {
    return [product.category, ...(product.tags ?? [])].some((item) =>
      ["Outdoor", "Seyahat", "Kamp", "Hafta sonu"].includes(item)
    );
  }

  return true;
}

export default function ShopPage() {
  const add = useCart((state) => state.add);
  const inc = useCart((state) => state.inc);
  const dec = useCart((state) => state.dec);
  const cartItems = useCart((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [sort, setSort] = useState<SortOption>("Öne çıkan");
  const [quickFilter, setQuickFilter] = useState<QuickFilterId>("all");
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      const matchesCategory = category === "Tümü" || product.category === category;
      const matchesQuery = searchableText(product).includes(
        query.toLocaleLowerCase("tr-TR")
      );
      const matchesMood = matchesQuickFilter(product, quickFilter);

      return matchesCategory && matchesQuery && matchesMood;
    });

    return [...matches].sort((a, b) => {
      if (sort === "Ucuzdan pahalıya") return a.price - b.price;
      if (sort === "Pahalıdan ucuza") return b.price - a.price;
      if (sort === "En yüksek indirim") {
        return discountRate(b.price, b.oldPrice) - discountRate(a.price, a.oldPrice);
      }
      if (sort === "En popüler") {
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      }
      if (sort === "Dopamin skoru") {
        return (b.dopamineScore ?? 0) - (a.dopamineScore ?? 0);
      }

      return Number(Boolean(b.isTrending)) - Number(Boolean(a.isTrending)) || a.id - b.id;
    });
  }, [category, query, quickFilter, sort]);

  function handleAdd(product: (typeof products)[number]) {
    add(product);
    setToast(`${product.name} sepete eklendi.`);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast("");
      toastTimerRef.current = null;
    }, 2400);
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
        <div className="quick-filter-section">
          <div className="section-kicker">Hızlı koleksiyon</div>
          <div className="quick-filter-grid">
            {quickFilters.map((filter) => (
              <button
                aria-pressed={filter.id === quickFilter}
                className={
                  filter.id === quickFilter
                    ? "quick-filter selected"
                    : "quick-filter"
                }
                key={filter.id}
                onClick={() => setQuickFilter(filter.id)}
                type="button"
              >
                <strong>{filter.label}</strong>
                <span>{filter.desc}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="nav">
          {categories.map((item) => (
            <button
              aria-pressed={item === category}
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
        <span>
          {category} · {quickFilters.find((item) => item.id === quickFilter)?.label}
        </span>
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
              setQuickFilter("all");
            }}
            type="button"
          >
            Filtreleri temizle
          </button>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map((product, index) => (
            <FragmentWithAd
              cartQty={
                cartItems.find((item) => item.id === product.id)?.qty ?? 0
              }
              index={index}
              key={product.id}
              onDec={dec}
              onInc={inc}
              onAdd={handleAdd}
              product={product}
            />
          ))}
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <Link href="/cart">Sepete git</Link>
        </div>
      )}

      {itemCount > 0 && (
        <Link className="mobile-cart-bar" href="/cart">
          <span>
            <strong>{itemCount} ürün</strong>
            <small>{formatPrice(cartTotal)} TL sahte sepet</small>
          </span>
          <b>Sepete git</b>
        </Link>
      )}
    </>
  );
}

function FragmentWithAd({
  cartQty,
  index,
  onDec,
  onInc,
  onAdd,
  product,
}: {
  cartQty: number;
  index: number;
  onDec: (id: number) => void;
  onInc: (id: number) => void;
  onAdd: (product: (typeof products)[number]) => void;
  product: (typeof products)[number];
}) {
  return (
    <>
      {index === 8 && (
        <AdSlot
          body="Sepete bahanesi hazır teknoloji, ev ve ofis fırsatlarını tek aramada gör."
          className="shop-ad"
          cta="Amazon'da fırsatlara bak"
          href={buildTrackedAffiliateUrl(
            {
              id: 9001,
              name: "Sponsorlu Amazon Fırsatları",
              category: "Sponsorlu",
              query: "amazon fırsatları",
            },
            "shop-ad"
          )}
          label="Sponsorlu alan"
          slot={process.env.NEXT_PUBLIC_ADSENSE_SHOP_SLOT}
          title="Bugünün sepet bahanesi"
        />
      )}
      <ProductCard
        cartQty={cartQty}
        onDec={onDec}
        onInc={onInc}
        onAdd={onAdd}
        product={product}
      />
    </>
  );
}

function ProductCard({
  cartQty,
  onDec,
  onInc,
  onAdd,
  product,
}: {
  cartQty: number;
  onDec: (id: number) => void;
  onInc: (id: number) => void;
  onAdd: (product: (typeof products)[number]) => void;
  product: (typeof products)[number];
}) {
  return (
    <article
      className={cartQty > 0 ? "card product-card in-cart" : "card product-card"}
    >
      <Link className="product-visual" href={`/shop/${product.id}`}>
        <ProductImage
          alt={product.imageAlt ?? product.name}
          emoji={product.emoji}
          image={product.image}
          sizes="(max-width: 560px) calc(100vw - 52px), (max-width: 900px) calc(50vw - 30px), 240px"
        />
      </Link>
      <span className="badge">{product.category}</span>
      {product.isTrending && <span className="trend-chip">Trend</span>}
      {product.meme && <span className="meme-chip">{product.meme}</span>}
      <h2 className="product-title">
        <Link href={`/shop/${product.id}`}>{product.name}</Link>
      </h2>
      {product.blurb && <p className="product-blurb">{product.blurb}</p>}
      {(product.rating || product.dopamineScore) && (
        <div className="product-signals">
          {product.rating && (
            <span>
              ★ {product.rating.toLocaleString("tr-TR")} ·{" "}
              {(product.reviewCount ?? 0).toLocaleString("tr-TR")}
            </span>
          )}
          {product.dopamineScore && <span>{product.dopamineScore} DP</span>}
        </div>
      )}
      {product.tags && (
        <div className="tag-row">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      <div className="product-meta">
        <div>
          <div className="old-price">{formatPrice(product.oldPrice)} TL</div>
          <div className="price">{formatPrice(product.price)} TL</div>
        </div>
        <span className="badge">
          {product.status ?? `%${discountRate(product.price, product.oldPrice)}`}
        </span>
      </div>
      <div className="actions">
        {cartQty > 0 ? (
          <div className="card-qty-control" aria-label={`${product.name} sepet adedi`}>
            <button
              aria-label={`${product.name} adetini azalt`}
              onClick={() => onDec(product.id)}
              type="button"
            >
              -
            </button>
            <strong>{cartQty}</strong>
            <button
              aria-label={`${product.name} adetini artır`}
              onClick={() => onInc(product.id)}
              type="button"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="btn"
            onClick={() => onAdd(product)}
            type="button"
          >
            Sepete ekle
          </button>
        )}
        <a
          className="btn secondary"
          href={buildTrackedAffiliateUrl(product, "shop-card")}
          rel="noreferrer"
          target="_blank"
        >
          Amazon’da incele
        </a>
      </div>
    </article>
  );
}
