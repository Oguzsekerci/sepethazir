import type { Metadata } from "next";
import Link from "next/link";
import { getGuide, guides } from "@/data/guides";
import { siteAuthorName, siteAuthorUrl } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return { title: "Rehber bulunamadı" };

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/rehber/${guide.slug}` },
    authors: [{ name: siteAuthorName, url: siteAuthorUrl }],
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Person", name: siteAuthorName, url: siteAuthorUrl },
    publisher: { "@type": "Organization", name: "SepetHazır" },
  };

  return (
    <main className="legal-page guide-page">
      <Link className="back-link" href="/rehber">← Tüm rehberler</Link>
      <article className="card legal-content">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
        <span className="badge">{guide.category} · {guide.readTime}</span>
        <h1>{guide.title}</h1>
        <p className="muted">
          <Link href="/yazar/oguz-sekerci">{siteAuthorName}</Link> · Yayın: {new Date(guide.publishedAt).toLocaleDateString("tr-TR")} ·
          Güncelleme: {new Date(guide.updatedAt).toLocaleDateString("tr-TR")}
        </p>
        <p>{guide.intro}</p>

        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        <h2>Hızlı kontrol listesi</h2>
        <ul>
          {guide.checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>

        {guide.sources?.length ? (
          <section aria-labelledby="guide-sources-title">
            <h2 id="guide-sources-title">Resmî kaynaklar ve ileri okuma</h2>
            <p>Bu bağlantılar yalnızca yanlarında belirtilen konuları destekler. Ürün özelliklerini, satıcı beyanlarını veya kullanıcı yorumlarını bizim adımıza doğrulamaz. Mevzuat ve koşullar değişebileceği için güncel metni kaynağında kontrol edin.</p>
            <ul>
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">{source.title}</a>
                  <p className="muted">{source.context}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p>
          Bu rehber genel bilgilendirme sunar ve kişisel mali veya hukuki
          danışmanlık yerine geçmez. Güncel ürün, satıcı, teslimat, garanti ve
          iade koşullarını işlemi yapacağın platformdan doğrula.
        </p>
        <p className="muted">
          İçeriğin nasıl hazırlandığını öğrenmek için <Link href="/yayin-ilkeleri">yayın ilkelerimizi</Link> inceleyebilirsin.
        </p>
      </article>
      <Link className="btn" href="/shop">Mağazadaki örnekleri incele</Link>
    </main>
  );
}
