import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "SepetHazır'ın amacı, editoryal yaklaşımı ve kurgusal mağazası hakkında bilgi.",
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <main className="legal-page">
      <div className="page-head">
        <div><span className="badge">Şeffaflık</span><h1>Hakkımızda</h1></div>
      </div>
      <article className="card legal-content">
        <h2>SepetHazır neden var?</h2>
        <p>SepetHazır, çevrim içi alışveriş kararlarında ürün listesinden önce doğru soruları görünür kılmak için hazırlanmış bağımsız bir Türkçe yayın ve kurgusal mağazadır. Amacımız ziyaretçiye ne alacağını söylemek değil; ihtiyaç, bütçe, toplam maliyet, satıcı ve iade koşullarını kendi ölçütleriyle değerlendirmesine yardımcı olmaktır.</p>
        <h2>İçerikleri kim hazırlıyor?</h2>
        <p>Rehberler <Link href="/yazar/oguz-sekerci">Oğuz Şekerci</Link> tarafından araştırılarak ve özgün biçimde yazılır. Metinler yayımlanmadan önce açık amaç, uygulanabilir adımlar, yanıltıcı kesinlikten kaçınma ve güncellik açısından kontrol edilir. Hata veya güncelleme önerileri iletişim adresinden kabul edilir.</p>
        <h2>Mağaza nedir?</h2>
        <p>Mağaza, bir ürünü satın almadan sepete ekleme ve bekleme fikrini örneklerle gösterir. Ürün adları ve bütçe tutarları kurgusaldır; gerçek fiyat, kampanya, kullanıcı yorumu veya satıcı teklifi değildir. Gerçek ödeme alınmaz, ürün satılmaz ve teslimat yapılmaz.</p>
        <h2>Gelir ve bağımsızlık</h2>
        <p>Sitede satış ortaklığı bağlantısı bulunmaz. Site AdSense onayı alırsa içerik sayfalarında Google reklamları gösterilebilir. Reklamverenler konu seçimine, değerlendirmelere veya editoryal sonuca müdahale etmez.</p>
        <p><Link className="text-link" href="/yayin-ilkeleri">Yayın ve düzeltme ilkelerini oku →</Link></p>
      </article>
    </main>
  );
}
