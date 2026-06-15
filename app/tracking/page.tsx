"use client";

import { useEffect, useState } from "react";

export default function Tracking() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 10 : 100));
    }, 400);

    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>🚴 Kurye yolda</h1>

      <div style={{ width: "100%", height: 10, background: "#eee" }}>
        <div
          style={{
            width: `${progress}%`,
            height: 10,
            background: "#FF6000",
          }}
        />
      </div>

      {progress === 100 && (
        <div style={{ marginTop: 20 }}>
          <h3>🎉 Sipariş teslim edildi</h3>

          <a href="https://www.trendyol.com" target="_blank">
            Ürünü tekrar satın al →
          </a>
        </div>
      )}
    </div>
  );
}