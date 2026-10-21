import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: `${siteName} çerez politikası.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <div className="page-head">
        <div>
          <span className="badge">Yasal</span>
          <h1>Çerez Politikası</h1>
        </div>
      </div>

      <section className="card legal-content">
        <p>
          SepetHazır, site deneyimini çalıştırmak, güvenliği sağlamak ve
          performansı ölçmek için çerezler ve benzer teknolojiler kullanabilir.
        </p>

        <h2>Zorunlu çerezler</h2>
        <p>
          Sepet, oturum, güvenlik ve temel site işlevleri için gerekli
          çerezlerdir. Bu çerezler olmadan bazı özellikler beklenen şekilde
          çalışmayabilir.
        </p>

        <h2>Reklam çerezleri</h2>
        <p>
          Ana sayfa ve rehber içeriklerinde Google AdSense kodu bulunabilir.
          Google bu sayfalarda reklam sunumu, sıklık sınırı, ölçüm, güvenlik ve
          kötüye kullanımı önleme amaçlarıyla çerez veya benzer tanımlayıcılar
          kullanabilir. Reklam kişiselleştirme durumu kullanıcının bölgesi ve
          tercihleri doğrultusunda belirlenir.
        </p>

        <h2>İçeriksiz işlem sayfaları</h2>
        <p>
          AdSense kodu sepet, ödeme, sipariş, takip, yönlendirme ve sonuç
          ekranlarında çalıştırılmaz. Mağaza sepeti ve örnek sipariş durumu yalnızca temel
          işlevi sağlamak amacıyla cihazın yerel depolama alanında tutulabilir.
        </p>

        <h2>Tercihleri yönetme</h2>
        <p>
          Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz.
          Çerezleri kapatmanız bazı özelliklerin performansını etkileyebilir.
        </p>

        <p className="muted">Son güncelleme: 10 Ekim 2026</p>
      </section>
    </main>
  );
}
