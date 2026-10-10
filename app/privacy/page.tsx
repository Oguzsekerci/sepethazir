import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: `${siteName} gizlilik politikası.`,
  alternates: { canonical: "/privacy" },
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
          Ana sayfa ve rehber içeriklerinde Google AdSense altyapısı
          kullanılabilir. Google; reklam sunma, ölçüm, güvenlik ve kötüye
          kullanımı önleme amaçlarıyla çerezler, IP adresi ve benzer çevrim içi
          tanımlayıcıları kendi politikalarına göre işleyebilir. Simülasyonun
          sepet, ödeme, sipariş, takip ve sonuç ekranlarında AdSense kodu
          çalıştırılmaz.
        </p>

        <h2>Verilerin kullanımı</h2>
        <p>
          Bilgiler site deneyimini çalıştırmak, güvenliği sağlamak, istatistik
          tutmak ve kullanıcı taleplerine yanıt vermek için kullanılır.
        </p>

        <h2>Üçüncü taraflar</h2>
        <p>
          Google gibi reklam ve altyapı sağlayıcıları kendi hizmetlerini sunmak
          için veri işleyebilir. Sitede satış ortaklığı bağlantısı bulunmaz.
          Üçüncü tarafların veri işleme faaliyetlerinde kendi gizlilik
          politikaları geçerlidir.
        </p>

        <h2>Haklarınız</h2>
        <p>
          Kişisel verilerinizle ilgili bilgi alma, düzeltme veya silme talebi
          için iletişim sayfasındaki kanaldan bize ulaşabilirsiniz.
        </p>

        <h2>Reklam tercihleri</h2>
        <p>
          Google reklam kişiselleştirme tercihleri Google reklam ayarlarından,
          tarayıcı çerezleri ise tarayıcı ayarlarından yönetilebilir. Reklamlar
          etkinleştirilmeden önce uygulanması gereken bölgesel onay mekanizmaları
          ayrıca devreye alınır.
        </p>

        <p className="muted">Son güncelleme: 10 Ekim 2026</p>
      </section>
    </main>
  );
}
