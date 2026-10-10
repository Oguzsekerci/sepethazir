import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yayın İlkeleri",
  description: "SepetHazır içerik hazırlama, kaynak, güncelleme, reklam ve düzeltme ilkeleri.",
};

export default function EditorialPolicyPage() {
  return (
    <main className="legal-page">
      <div className="page-head"><div><span className="badge">Editoryal</span><h1>Yayın İlkeleri</h1></div></div>
      <article className="card legal-content">
        <h2>Okur için değer</h2>
        <p>Her rehber açık bir kullanıcı sorusunu cevaplamalı ve okurun uygulayabileceği kontrol, hesap veya karşılaştırma adımları içermelidir. Yalnızca arama trafiği çekmek, sayfa sayısını artırmak veya reklam göstermek amacıyla içerik yayımlamayız.</p>
        <h2>Özgünlük ve kaynak kullanımı</h2>
        <p>Metinler SepetHazır için özgün olarak yazılır. Dış kaynaklardan alınan iddialar kendi anlatımımızın yerine geçirilmez. Hukuk, platform koşulları ve teknik standartlar değişebileceği için okuru güncel resmi kaynağı kontrol etmeye yönlendiririz.</p>
        <h2>Ticari bağımsızlık</h2>
        <p>Ürün satmıyor ve satış ortaklığı bağlantısı kullanmıyoruz. Reklam bulunması bir ürünün seçilmesini veya yazının sonucunu etkilemez. Reklamlar yayıncı içeriğinden açıkça ayrılmalı ve simülasyonun işlem, sonuç veya navigasyon ekranlarında gösterilmemelidir.</p>
        <h2>Güncelleme ve düzeltme</h2>
        <p>Yazılarda yayın ve güncelleme tarihi gösterilir. Maddi hata bildirildiğinde içerik yeniden incelenir ve gerekli düzeltme yapılır. Okurlar iletisim@sepethazir.com.tr adresinden başlık, bağlantı ve gerekçeyle geri bildirim gönderebilir.</p>
        <h2>Kapsam sınırı</h2>
        <p>İçerikler genel bilgilendirmedir. Kişisel mali, hukuki, tıbbi veya güvenlik danışmanlığı değildir. Yüksek riskli kararlarda yetkili uzman ve güncel resmi kaynak kullanılmalıdır.</p>
        <p className="muted">Son güncelleme: 10 Ekim 2026</p>
      </article>
    </main>
  );
}
