import { Suspense } from "react";
import OutClient from "./out-client";

export default function OutPage() {
  return (
    <Suspense fallback={<div className="card">Amazon linki hazırlanıyor...</div>}>
      <OutClient />
    </Suspense>
  );
}
