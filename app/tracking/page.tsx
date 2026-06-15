import { Suspense } from "react";
import TrackingClient from "./tracking-client";

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="card map-card">Takip yükleniyor...</div>}>
      <TrackingClient />
    </Suspense>
  );
}
