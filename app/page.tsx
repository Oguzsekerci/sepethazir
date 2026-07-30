import Link from "next/link";
import type { Metadata } from "next";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
  },
  title: siteName,
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-panel">
          <div>
            <span className="badge">Dopamin sepeti</span>
            <h1>Para harcamadan alışveriş yapmış gibi hisset.</h1>
            <p>
              Ürünleri sepete at, sahte sipariş oluştur, var olmayan kuryeyi
              takip et. Kartından para çekilmez; deneyim sadece keyif ve
              simülasyon içindir.
            </p>
          </div>
          <Link className="btn" href="/shop">
            Sepeti doldurmaya başla
          </Link>
        </div>

        <div className="dopamine-board">
          <div className="guarantee-stage" aria-label="Dopamin garantili">
            <div className="guarantee-stamp">
              <span>Dopamin</span>
              <strong>Garantili</strong>
            </div>
            <div className="guarantee-sparks" aria-hidden="true">
              <span>0 TL</span>
              <span>Sahte kargo</span>
              <span>Gerçek his</span>
            </div>
          </div>
          <div className="card">
            <span className="badge">Gerçek ödeme yok</span>
            <h2 style={{ marginTop: 10 }}>Sanal harcama, gerçek rahatlama.</h2>
            <p className="muted" style={{ marginTop: 8 }}>
              İsteyen kullanıcı ürünün gerçek arama linkine de gidebilir; ana
              akışın tamamı sahte sipariş deneyimi olarak çalışır.
            </p>
          </div>
        </div>
      </section>

      <section className="editorial-section home-editorial" aria-labelledby="about-title">
        <span className="section-kicker">SepetHazır nedir?</span>
        <h2 id="about-title">Alışveriş hissini, satın alma baskısı olmadan keşfet.</h2>
        <p>
          SepetHazır bir alışveriş sitesi ya da fiyat karşılaştırma hizmeti
          değildir. Buradaki sepet, sipariş ve kargo adımları tamamen
          simülasyondur; ödeme alınmaz, ürün gönderilmez ve ekrandaki rakamlar
          gerçek kampanya bilgisi sayılmaz.
        </p>
        <div className="editorial-grid">
          <div>
            <h3>Önce ihtiyacı adlandır</h3>
            <p>“İşe yarar mı?” sorusunu, “şu an hangi sorunu çözmeye çalışıyorum?” sorusundan sonra sor.</p>
          </div>
          <div>
            <h3>Gerçek teklifi kaynağında doğrula</h3>
            <p>Dış bağlantıya gittiğinde güncel fiyat, satıcı, teslimat, garanti ve iade koşullarını kontrol et.</p>
          </div>
          <div>
            <h3>Kararı biraz beklet</h3>
            <p>İstek listesi oluşturup en az bir gün beklemek, dürtüyle ihtiyaç arasındaki farkı görünür kılar.</p>
          </div>
        </div>
        <Link className="text-link" href="/rehber">Bilinçli alışveriş rehberine git →</Link>
      </section>
    </>
  );
}
