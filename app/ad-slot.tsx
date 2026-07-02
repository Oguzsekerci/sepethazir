"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  body?: string;
  cta?: string;
  className?: string;
  href?: string;
  label?: string;
  slot?: string;
  title?: string;
};

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function AdSlot({
  body = "Sepete yakışacak fırsatları Amazon'da incele.",
  cta = "İncele",
  className = "",
  href,
  label = "Reklam",
  slot,
  title = "SepetHazır seçkisi",
}: AdSlotProps) {
  const canRenderAd = Boolean(clientId && slot);

  useEffect(() => {
    if (!canRenderAd) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed third-party scripts can throw here.
    }
  }, [canRenderAd, slot]);

  return (
    <aside className={`ad-card ${className}`.trim()} aria-label={label}>
      <span>{label}</span>
      {canRenderAd ? (
        <ins
          className="adsbygoogle"
          data-ad-client={clientId}
          data-ad-format="auto"
          data-ad-slot={slot}
          data-full-width-responsive="true"
          style={{ display: "block" }}
        />
      ) : href ? (
        <a className="house-ad" href={href} rel="noreferrer" target="_blank">
          <strong>{title}</strong>
          <small>{body}</small>
          <b>{cta}</b>
        </a>
      ) : (
        <div className="house-ad">
          <strong>{title}</strong>
          <small>{body}</small>
        </div>
      )}
    </aside>
  );
}
