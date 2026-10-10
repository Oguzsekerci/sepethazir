import type { Metadata } from "next";
import Link from "next/link";
import { siteAuthorName, siteAuthorUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteAuthorName} — Yazar`,
  description: "SepetHazır kurucusu ve editörü Oğuz Şekerci'nin yazar profili ve editoryal yaklaşımı.",
  alternates: { canonical: "/yazar/oguz-sekerci" },
};

export default function AuthorPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteAuthorName,
    url: siteAuthorUrl,
    jobTitle: "SepetHazır Kurucusu ve Editörü",
    worksFor: { "@type": "Organization", name: "SepetHazır" },
  };

  return (
    <main className="legal-page">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
      <div className="page-head">
        <div><span className="badge">Yazar</span><h1>{siteAuthorName}</h1></div>
      </div>
      <article className="card legal-content">
        <p>Oğuz Şekerci, SepetHazır&apos;ın kurucusu ve editörüdür. Sitedeki bilinçli alışveriş, bütçe planlama, ürün karşılaştırma ve çevrim içi işlem güvenliği rehberlerinin araştırma, yazım ve güncelleme süreçlerini yürütür.</p>
        <h2>Editoryal yaklaşım</h2>
        <p>İçeriklerde belirli bir ürünü satın almaya yönlendirmek yerine, okurun kendi ihtiyacını tanımlamasına ve doğrulanabilir ölçütlerle karar vermesine yardımcı olan yöntemlere odaklanır. Ürün satışı veya satış ortaklığı geliri kullanılmaz.</p>
        <h2>İletişim ve düzeltmeler</h2>
        <p>İçerik hataları, güncelleme önerileri ve kaynak bildirimleri için iletisim@sepethazir.com.tr adresine ulaşılabilir. Bildirimlerde ilgili yazının bağlantısının ve düzeltilmesi istenen bölümün belirtilmesi incelemeyi hızlandırır.</p>
        <p><Link className="text-link" href="/rehber">Yayımlanan rehberleri gör →</Link></p>
      </article>
    </main>
  );
}
