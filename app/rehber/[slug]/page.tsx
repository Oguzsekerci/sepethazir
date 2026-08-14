import type { Metadata } from "next";
import Link from "next/link";
import { getGuide, guides } from "@/data/guides";
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

  return (
    <main className="legal-page guide-page">
      <Link className="back-link" href="/rehber">← Tüm rehberler</Link>
      <article className="card legal-content">
        <span className="badge">{guide.readTime}</span>
        <h1>{guide.title}</h1>
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

        <p>
          Bu rehber genel bilgi verir. Güncel ürün bilgisi, teklif, satıcı,
          teslimat ve iade koşulları için her zaman ilgili mağazanın sayfasını
          kontrol et.
        </p>
      </article>
      <Link className="btn" href="/shop">Seçkiyi keşfet</Link>
    </main>
  );
}
