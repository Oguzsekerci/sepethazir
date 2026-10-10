import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${siteName} iletişim bilgileri.`,
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <div className="page-head">
        <div>
          <span className="badge">Destek</span>
          <h1>İletişim</h1>
        </div>
      </div>

      <section className="card legal-content">
        <p>
          SepetHazır hakkında soru, geri bildirim, reklam, gizlilik veya veri
          talepleri için aşağıdaki e-posta adresinden iletişime geçebilirsiniz.
        </p>

        <div className="contact-box">
          <span>E-posta</span>
          <a href="mailto:iletisim@sepethazir.com.tr">
            iletisim@sepethazir.com.tr
          </a>
        </div>

        <h2>Not</h2>
        <p>
          SepetHazır sanal sepet ve sahte sipariş simülasyonu sunar. Sitedeki
          ürün kartları kurgusal karar senaryolarıdır. Sitede gerçek ürün satışı,
          ödeme, teslimat veya satış ortaklığı yönlendirmesi yapılmaz.
        </p>
      </section>
    </main>
  );
}
