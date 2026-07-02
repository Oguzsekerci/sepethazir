import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: `${siteName} çerez politikası.`,
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
          SepetHazır, site deneyimini çalıştırmak, güvenliği sağlamak, reklam
          göstermek ve performansı ölçmek için çerezler ve benzer teknolojiler
          kullanabilir.
        </p>

        <h2>Zorunlu çerezler</h2>
        <p>
          Sepet, oturum, güvenlik ve temel site işlevleri için gerekli
          çerezlerdir. Bu çerezler olmadan bazı özellikler beklenen şekilde
          çalışmayabilir.
        </p>

        <h2>Reklam çerezleri</h2>
        <p>
          Google AdSense reklamların gösterilmesi, sınırlandırılması,
          kişiselleştirilmesi ve ölçümlenmesi için çerez kullanabilir. Avrupa
          Ekonomik Alanı, Birleşik Krallık ve İsviçre kullanıcıları için Google
          onay mesajı üzerinden tercih alınabilir.
        </p>

        <h2>Satış ortaklığı bağlantıları</h2>
        <p>
          Amazon bağlantılarına tıkladığınızda, Amazon tıklama ve satın alma
          davranışını kendi çerezleriyle takip edebilir. Bu işlem Amazon
          platformunda gerçekleşir.
        </p>

        <h2>Tercihleri yönetme</h2>
        <p>
          Çerez tercihlerinizi tarayıcı ayarlarınızdan ve Google onay mesajı
          üzerinden yönetebilirsiniz. Çerezleri kapatmanız bazı özelliklerin
          performansını etkileyebilir.
        </p>

        <p className="muted">Son güncelleme: 2 Temmuz 2026</p>
      </section>
    </main>
  );
}
