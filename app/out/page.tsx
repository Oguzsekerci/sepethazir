import Link from "next/link";
import { isAllowedAmazonTarget } from "@/lib/affiliate";
import OutClient from "./out-client";

type OutSearchParams = {
  category?: string;
  productId?: string;
  productName?: string;
  source?: string;
  target?: string;
};

function BlockedOutbound() {
  return (
    <div className="card empty-state">
      <h1>Link doğrulanamadı</h1>
      <p className="muted">
        Amazon hedefi güvenli görünmediği için yönlendirme yapılmadı.
      </p>
      <Link className="btn" href="/shop">
        Ürünlere dön
      </Link>
    </div>
  );
}

export default async function OutPage({
  searchParams,
}: {
  searchParams: Promise<OutSearchParams>;
}) {
  const params = await searchParams;
  const click = {
    target: params.target ?? "",
    productId: Number(params.productId ?? 0),
    productName: params.productName ?? "Bilinmeyen ürün",
    category: params.category ?? "Genel",
    source: params.source ?? "unknown",
  };

  if (!isAllowedAmazonTarget(click.target) || !click.productId) {
    return <BlockedOutbound />;
  }

  return (
    <OutClient click={click} />
  );
}
