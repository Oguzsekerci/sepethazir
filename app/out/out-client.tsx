"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";

export type OutboundClick = {
  category: string;
  productId: number;
  productName: string;
  source: string;
  target: string;
};

export default function OutClient({ click }: { click: OutboundClick }) {
  const trackAffiliateClick = useCart((state) => state.trackAffiliateClick);

  useEffect(() => {
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
  }, [click, trackAffiliateClick]);

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
