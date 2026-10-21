import Link from "next/link";
import type { Metadata } from "next";
import AdSenseScript from "./adsense-script";
import { guides } from "@/data/guides";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
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
      <AdSenseScript />

      <section className="hero">
        <div className="hero-panel">
          <div>
            <span className="badge">Bilinçli alışveriş rehberi</span>
            <h1>Satın almadan önce ihtiyacını ve bütçeni netleştir.</h1>
            <p>
              SepetHazır; ürün seçimi, toplam maliyet, satıcı güvenilirliği,
              iade koşulları ve dürtüsel alışveriş üzerine bağımsız rehberler
              sunar. Karar simülatörü ödeme almaz ve gerçek ürün satmaz.
            </p>
          </div>
          <div className="actions">
            <Link className="btn" href="/rehber">
              Rehberleri oku
            </Link>
            <Link className="btn secondary" href="/araclar/urun-karsilastir">
              Gerçek seçenekleri karşılaştır
            </Link>
            <Link className="btn secondary" href="/shop">
              Kurgusal karar egzersizini dene
            </Link>
          </div>
        </div>

        <div className="dopamine-board">
          <div className="guarantee-stage" aria-label="Karar molası">
            <div className="guarantee-stamp">
              <span>Karar</span>
              <strong>Molası</strong>
            </div>
            <div className="guarantee-sparks" aria-hidden="true">
              <span>İhtiyaç</span>
              <span>Toplam maliyet</span>
              <span>24 saat</span>
            </div>
          </div>
          <div className="card">
            <span className="badge">Bağımsız yayın</span>
            <h2 style={{ marginTop: 10 }}>Önce ölçüt, sonra ürün.</h2>
            <p className="muted" style={{ marginTop: 8 }}>
              İçeriklerimiz ürün satmak için değil, karşılaştırılabilir ölçütler
              kurmak için hazırlanır. Kurgusal simülasyon verileri gerçek fiyat,
              yorum veya kampanya değildir.
            </p>
          </div>
        </div>
      </section>

      <section className="editorial-section home-editorial" aria-labelledby="latest-guides-title">
        <span className="section-kicker">Editörün seçtikleri</span>
        <h2 id="latest-guides-title">Alışveriş kararını adım adım güçlendir.</h2>
        <p>
          Rehberler, belirli bir ürünü övmek yerine farklı kategorilerde tekrar
          kullanılabilen karar yöntemleri sunar. Her yazı SepetHazır editörü
          tarafından hazırlanır ve yayın ilkelerimize göre gözden geçirilir.
        </p>
        <div className="editorial-grid">
          {guides.slice(0, 6).map((guide) => (
            <article key={guide.slug}>
              <small>{guide.category} · {guide.readTime}</small>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <Link className="text-link" href={`/rehber/${guide.slug}`}>
                Rehberi oku →
              </Link>
            </article>
          ))}
        </div>
        <Link className="btn" href="/rehber">Tüm rehberleri gör</Link>
      </section>

      <section className="editorial-section" aria-labelledby="method-title">
        <span className="section-kicker">Nasıl çalışıyoruz?</span>
        <h2 id="method-title">Kararı reklam dilinden ayıran dört kontrol.</h2>
        <div className="editorial-grid">
          <div>
            <h3>İhtiyaç</h3>
            <p>Ürün adından önce çözülmek istenen işi ve kullanım sıklığını tanımlarız.</p>
          </div>
          <div>
            <h3>Toplam maliyet</h3>
            <p>Etiket fiyatına teslimat, bakım, sarf malzemesi ve kullanım ömrünü ekleriz.</p>
          </div>
          <div>
            <h3>Doğrulama</h3>
            <p>Model, satıcı, garanti ve iade bilgisinin güncel kaynaktan kontrol edilmesini isteriz.</p>
          </div>
          <div>
            <h3>Bekleme</h3>
            <p>Acil olmayan kararlarda bütçeye uygun bir bekleme süresi kullanırız.</p>
          </div>
        </div>
        <Link className="text-link" href="/yayin-ilkeleri">Yayın ilkelerimizi incele →</Link>
      </section>
    </>
  );
}
