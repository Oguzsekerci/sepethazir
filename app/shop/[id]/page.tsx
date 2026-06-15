import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { buildAffiliateUrl } from "@/lib/affiliate";
import ProductDetailActions from "./product-detail-actions";

function formatPrice(value: number) {
  return value.toLocaleString("tr-TR");
}

function discountRate(price: number, oldPrice: number) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  const similar = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Link className="back-link" href="/shop">
        ← Ürünlere dön
      </Link>

      <section className="product-detail">
        <div className="product-detail-media">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.imageAlt ?? product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 480px"
            />
          ) : (
            <span>{product.emoji}</span>
          )}
        </div>

        <div className="product-detail-copy">
          <div className="detail-badges">
            <span className="badge">{product.category}</span>
            {product.meme && <span className="meme-chip">{product.meme}</span>}
          </div>
          <h1>{product.name}</h1>
          <p>{product.blurb}</p>

          <div className="detail-price-row">
            <div>
              <span className="old-price">{formatPrice(product.oldPrice)} TL</span>
              <strong>{formatPrice(product.price)} TL</strong>
              <small>Ödenecek gerçek tutar: 0 TL. Hissetmesi serbest.</small>
            </div>
            <span className="badge">%{discountRate(product.price, product.oldPrice)}</span>
          </div>

          <div className="detail-specs">
            <div>
              <span>Tahmini pişmanlık</span>
              <strong>3 dakika</strong>
            </div>
            <div>
              <span>Dopamin garantisi</span>
              <strong>Kargo bildirimine kadar</strong>
            </div>
            <div>
              <span>İade politikası</span>
              <strong>Hiç gelmeyeni iade etmiyoruz</strong>
            </div>
          </div>

          <ProductDetailActions product={product} />

          <a
            className="btn ghost"
            href={buildAffiliateUrl(product.query)}
            rel="noreferrer"
            target="_blank"
          >
            Amazon’da gerçeğini ara
          </a>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="dream-grid-section">
          <div className="page-head">
            <div>
              <h2>Bu bahaneye yakın şeyler</h2>
              <p className="muted">Aynı ruh hali, farklı sepet.</p>
            </div>
          </div>
          <div className="dream-grid three">
            {similar.map((item) => (
              <Link className="dream-card" href={`/shop/${item.id}`} key={item.id}>
                <span className="dream-image">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.name}
                      fill
                      sizes="180px"
                    />
                  ) : (
                    <span>{item.emoji}</span>
                  )}
                </span>
                <strong>{item.name}</strong>
                <small>Detaya bak</small>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
