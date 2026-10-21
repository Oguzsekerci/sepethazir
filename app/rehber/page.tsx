import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Bilinçli Alışveriş Rehberi",
  description: "İhtiyaç belirleme, ürün karşılaştırma ve güvenli alışveriş için pratik rehber.",
  alternates: { canonical: "/rehber" },
};

export default function GuidePage() {
  return (
    <main className="legal-page guide-page">
      <div className="page-head">
        <div>
          <span className="badge">Özgün rehber</span>
          <h1>Bilinçli alışveriş rehberleri</h1>
          <p className="muted">Bütçe, karşılaştırma ve güvenli alışveriş için özgün ve uygulanabilir yöntemler.</p>
        </div>
      </div>

      <article className="card legal-content">
        <p>
          SepetHazır rehberleri belirli bir ürünü satın almaya yönlendirmek
          yerine, farklı kategorilerde tekrar kullanılabilecek karar araçları
          sunar. İçerikler Oğuz Şekerci tarafından özgün olarak hazırlanır,
          anlaşılabilirlik ve uygulanabilirlik açısından gözden geçirilir.
        </p>

        <h2>1. İhtiyaç listesi oluştur</h2>
        <p>
          “Olmazsa olmaz” ile “olsa güzel olur” maddelerini ayır. Örneğin bir
          kulaklıkta bağlantı türü, rahatlık ve mikrofon kalitesi temel ihtiyaç
          olabilir; renk veya uygulama efektleri ikinci sırada kalabilir.
          Ev aletlerinde ölçü, enerji tüketimi, bakım gereksinimi ve yedek
          parça erişimi benzer şekilde ilk kontrol edilmesi gerekenlerdir.
        </p>

        <h2>2. Tek bir fiyata değil, toplam koşula bak</h2>
        <p>
          Aynı ürünün fiyatı satıcıya, teslimat süresine, kupona ve garanti
          kapsamına göre değişebilir. Karşılaştırırken ürünün tam model kodunu,
          kutu içeriğini, yetkili satıcı bilgisini, teslimat ücretini ve iade
          süresini aynı satırda not etmek yanlış eşleştirmeleri önler.
        </p>

        <h2>3. Yorumları bağlamıyla oku</h2>
        <p>
          Kullanıcı yorumları yararlıdır; ancak tek başına karar ölçütü
          değildir. En yeni yorumlara, tekrar eden şikâyetlere ve kullanım
          senaryosuna yakın deneyimlere odaklan. Bir ürünün çok sayıda olumlu
          yorumu olması, senin cihazınla uyumlu veya senin ihtiyacın için doğru
          olduğu anlamına gelmez.
        </p>

        <h2>4. Dürtüye karşı bekleme kuralı koy</h2>
        <p>
          İndirim ibaresi aciliyet yaratabilir. Büyük ya da tekrarlayan bir
          alışverişte ürünü listeye ekleyip 24 saat beklemek, bütçe ve ihtiyaç
          kontrolü için basit bir yöntemdir. Bekledikten sonra aynı sorunu
          hâlâ çözmek istiyorsan, alternatifleri ve toplam maliyeti tekrar
          karşılaştır.
        </p>

        <h2>Mağazadaki örnek ürünler hakkında</h2>
        <p>
          Mağazadaki ürün adları, fiyatlar ve bütçe tutarları alışveriş kararını
          düşünmeye yardımcı olmak için hazırlanmış kurgusal örneklerdir. Gerçek
          fiyat, kampanya, değerlendirme veya satıcı tavsiyesi değildir; sitede
          gerçek ürün satışı ve ödeme yapılmaz.
        </p>
      </article>

      <Link className="btn" href="/shop">Mağazadaki örnekleri incele</Link>

      <section className="dream-grid-section" aria-labelledby="more-guides-title">
        <div className="page-head">
          <div>
            <span className="section-kicker">Devam et</span>
            <h2 id="more-guides-title">Karar vermeye yardımcı rehberler</h2>
          </div>
        </div>
        <div className="dream-grid">
          {guides.map((guide) => (
            <article className="dream-card" key={guide.slug}>
              <small>{guide.category} · {guide.readTime}</small>
              <strong>{guide.title}</strong>
              <p>{guide.description}</p>
              <Link className="text-link" href={`/rehber/${guide.slug}`}>
                Rehberi oku →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
