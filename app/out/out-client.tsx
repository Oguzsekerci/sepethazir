"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useCart } from "@/store/cart";

function isAllowedAmazonTarget(target: string) {
  try {
    const url = new URL(target);

    return url.protocol === "https:" && url.hostname === "www.amazon.com.tr";
  } catch {
    return false;
  }
}

export default function OutClient() {
  const searchParams = useSearchParams();
  const trackAffiliateClick = useCart((state) => state.trackAffiliateClick);

  const click = useMemo(() => {
    const target = searchParams.get("target") ?? "";

    return {
      target,
      productId: Number(searchParams.get("productId") ?? 0),
      productName: searchParams.get("productName") ?? "Bilinmeyen ürün",
      category: searchParams.get("category") ?? "Genel",
      source: searchParams.get("source") ?? "unknown",
    };
  }, [searchParams]);
  const blocked = !isAllowedAmazonTarget(click.target) || !click.productId;

  useEffect(() => {
    if (blocked) {
      return;
    }

    trackAffiliateClick({
      productId: click.productId,
      productName: click.productName,
      category: click.category,
      href: click.target,
      source: click.source,
    });

    const redirectTimer = window.setTimeout(() => {
      window.location.replace(click.target);
    }, 450);

    return () => window.clearTimeout(redirectTimer);
  }, [blocked, click, trackAffiliateClick]);

  if (blocked) {
    return (
      <div className="card empty-state">
        <h1>Link doğrulanamadı</h1>
        <p className="muted">Amazon hedefi güvenli görünmediği için yönlendirme yapılmadı.</p>
        <Link className="btn" href="/shop">
          Ürünlere dön
        </Link>
      </div>
    );
  }

  return (
    <div className="card outbound-card">
      <span className="badge">Amazon TR</span>
      <h1>Affiliate link hazırlanıyor</h1>
      <p className="muted">
        {click.productName} için Amazon sayfasına yönlendiriliyorsun.
      </p>
      <a className="btn" href={click.target} rel="noreferrer">
        Beklemeden devam et
      </a>
    </div>
  );
}
