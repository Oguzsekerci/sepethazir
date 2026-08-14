import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${siteName} gizlilik politikası.`,
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="page-head">
        <div>
          <span className="badge">Yasal</span>
          <h1>Gizlilik Politikası</h1>
        </div>
      </div>

      <section className="card legal-content">
        <p>
          SepetHazır, kullanıcılarına sanal alışveriş, sahte sepet ve sipariş
          simülasyonu deneyimi sunar. Gerçek ödeme alınmaz ve fiziksel ürün
          gönderimi yapılmaz.
        </p>

        <h2>Toplanan bilgiler</h2>
        <p>
          Siteyi kullanırken sepet, sipariş simülasyonu ve ziyaret bilgileri
          gibi teknik veriler işlenebilir. İletişim kurmanız halinde adınız,
          e-posta adresiniz ve mesaj içeriğiniz değerlendirilebilir.
        </p>

        <h2>Reklam ve analiz</h2>
        <p>
          Sitede Google AdSense reklamları gösterilmez ve Google reklam
          çerezleri kullanılmaz. Amazon satış ortaklığı bağlantıları bulunabilir.
        </p>

        <h2>Verilerin kullanımı</h2>
        <p>
          Bilgiler site deneyimini çalıştırmak, güvenliği sağlamak, istatistik
          tutmak ve kullanıcı taleplerine yanıt vermek için kullanılır.
        </p>

        <h2>Üçüncü taraflar</h2>
        <p>
          Amazon ve benzeri üçüncü taraf hizmet sağlayıcıları, kendi
          hizmetlerini sunmak için veri işleyebilir. Bu tarafların kendi
          gizlilik politikaları geçerlidir.
        </p>

        <h2>Haklarınız</h2>
        <p>
          Kişisel verilerinizle ilgili bilgi alma, düzeltme veya silme talebi
          için iletişim sayfasındaki kanaldan bize ulaşabilirsiniz.
        </p>

        <p className="muted">Son güncelleme: 2 Temmuz 2026</p>
      </section>
    </main>
  );
}
