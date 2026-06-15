import Link from "next/link";

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
    </>
  );
}
