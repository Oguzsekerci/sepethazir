import type { Metadata } from "next";
import Link from "next/link";
import ProductComparison from "./product-comparison";

export const metadata: Metadata = {
  title: "Ürün karşılaştırma çalışma alanı",
  description: "Gerçek ürün seçeneklerini toplam maliyet, kullanım başı maliyet ve ihtiyaç ölçütleriyle yan yana karşılaştırın.",
  alternates: { canonical: "/araclar/urun-karsilastir" },
};

export default function CompareProductsPage() {
  return (
    <main className="legal-page comparison-page">
      <div className="page-head">
        <div>
          <span className="badge">Ücretsiz karar aracı</span>
          <h1>Ürünleri aynı ölçütlerle karşılaştırın</h1>
          <p className="muted">Gerçek ürün sayfalarından bilgileri kendiniz girin. Hesaplama karşılaştırmayı düzenler; hangi ürünü alacağınıza sizin yerinize karar vermez.</p>
        </div>
      </div>

      <ProductComparison />

      <article className="card legal-content comparison-method">
        <h2>Hesaplama yöntemi</h2>
        <p><strong>Tahmini dönem maliyeti</strong> = satın alma fiyatı + ilk seferlik ek giderler + (yıllık tahmini gider × kullanım yılı).</p>
        <p><strong>Kullanım başı maliyet</strong> = tahmini dönem maliyeti ÷ (kullanım yılı × haftalık kullanım × 52).</p>
        <p>Yıllık gider alanına enerji, sarf malzemesi, bakım veya abonelik tahmininizi ekleyebilirsiniz. Ömür ve kullanım sıklığı tahmindir; bunları kendi deneyiminize göre değiştirin. Finansman maliyeti, enflasyon, ikinci el değeri ve beklenmedik onarımlar hesaba dahil değildir.</p>
        <h2>Veri ve gizlilik</h2>
        <p>Yazdıklarınız yalnızca bu sayfa açıkken tarayıcınızın belleğinde kalır. Kaydetme, hesap oluşturma veya sunucuya gönderme yapılmaz. Sayfadan ayrıldığınızda girdiler silinir.</p>
        <p>Ürün özellikleri ve satıcı koşulları zamanla değişebilir. Karşılaştırmayı <Link href="/rehber/urun-karsilastirma-notlari">ürün karşılaştırma rehberimizdeki</Link> kontrol listesiyle birlikte kullanın.</p>
      </article>
    </main>
  );
}
