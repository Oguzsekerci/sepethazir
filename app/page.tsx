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
          <div className="fake-receipt">
            <div className="receipt-row">
              <span>Sipariş</span>
              <strong>SH-48291</strong>
            </div>
            <div className="receipt-row">
              <span>Durum</span>
              <strong>Kuryede</strong>
            </div>
            <div className="receipt-row">
              <span>ETA</span>
              <strong>11 dk</strong>
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
