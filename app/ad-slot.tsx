"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  className?: string;
  label?: string;
  slot?: string;
};

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function AdSlot({
  className = "",
  label = "Reklam",
  slot,
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
      ) : (
        <div className="ad-placeholder">
          <strong>AdSense alanı hazır</strong>
          <small>Client ID ve slot girilince reklam gösterilir.</small>
        </div>
      )}
    </aside>
  );
}
