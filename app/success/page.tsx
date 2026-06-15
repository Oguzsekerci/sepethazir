import { Suspense } from "react";
import SuccessClient from "./success-client";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="card">Sahte ödeme sonucu hazırlanıyor...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
