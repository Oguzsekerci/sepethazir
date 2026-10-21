"use client";

import { useMemo, useState } from "react";

type Option = {
  id: number;
  name: string;
  price: string;
  initialCosts: string;
  annualCosts: string;
  years: string;
  usesPerWeek: string;
  meetsNeeds: boolean;
  compatible: boolean;
  checkedSellerTerms: boolean;
};

function createOption(id: number): Option {
  return {
    id,
    name: `Seçenek ${id}`,
    price: "",
    initialCosts: "",
    annualCosts: "",
    years: "2",
    usesPerWeek: "3",
    meetsNeeds: false,
    compatible: false,
    checkedSellerTerms: false,
  };
}

function money(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(value);
}

function numeric(value: string) {
  const result = Number(value);
  return Number.isFinite(result) && result >= 0 ? result : 0;
}

export default function ProductComparison() {
  const [options, setOptions] = useState<Option[]>([createOption(1), createOption(2)]);
  const [status, setStatus] = useState("");
  const nextId = useMemo(() => Math.max(...options.map((option) => option.id)) + 1, [options]);

  function update(id: number, patch: Partial<Option>) {
    setOptions((current) => current.map((option) => option.id === id ? { ...option, ...patch } : option));
  }

  function addOption() {
    if (options.length < 3) setOptions((current) => [...current, createOption(nextId)]);
  }

  function removeOption(id: number) {
    if (options.length > 2) setOptions((current) => current.filter((option) => option.id !== id));
  }

  function fillExample() {
    setOptions([
      { ...createOption(1), name: "Örnek A (kurgu)", price: "8000", annualCosts: "1800", years: "4", usesPerWeek: "3", meetsNeeds: true, compatible: true, checkedSellerTerms: true },
      { ...createOption(2), name: "Örnek B (kurgu)", price: "10500", initialCosts: "500", annualCosts: "1000", years: "4", usesPerWeek: "3", meetsNeeds: true, compatible: true, checkedSellerTerms: true },
    ]);
    setStatus("Kurgusal örnek yüklendi. Gerçek ürün bilgisi değildir.");
  }

  function clearOptions() {
    setOptions([createOption(1), createOption(2)]);
    setStatus("Alanlar temizlendi.");
  }

  async function copySummary() {
    const lines = options.map((option) => {
      const total = numeric(option.price) + numeric(option.initialCosts) + numeric(option.annualCosts) * numeric(option.years);
      const uses = Math.floor(numeric(option.years) * numeric(option.usesPerWeek) * 52);
      const checks = [option.meetsNeeds, option.compatible, option.checkedSellerTerms].map((checked) => checked ? "Evet" : "Kontrol edilmedi");
      return `${option.name}: ${total > 0 ? `${money(total)} tahmini toplam (${option.years} yıl), ${uses.toLocaleString("tr-TR")} kullanım varsayımı` : "maliyet bilgisi girilmedi"}. İhtiyaca uygunluk / uyum / satıcı koşulları: ${checks.join(" / ")}.`;
    });
    const summary = `SepetHazır ürün karşılaştırma notu\n${lines.join("\n")}\nBu hesaplama girilen tahminlere dayanır; otomatik ürün önerisi değildir.`;
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Karşılaştırma özeti panoya kopyalandı.");
    } catch {
      setStatus("Pano erişimi kullanılamadı. Tarayıcı izinlerini kontrol edin.");
    }
  }

  return (
    <section className="card comparison-tool" aria-label="Ürün seçeneklerini karşılaştırın">
      <p className="muted">Fiyat ve kullanım tahminlerini ürün sayfalarından kontrol ederek girin. En fazla üç seçeneği karşılaştırabilirsiniz.</p>
      <div className="comparison-actions">
        <button className="btn secondary" onClick={fillExample} type="button">Kurgusal örneği doldur</button>
        <button className="btn ghost" onClick={clearOptions} type="button">Alanları temizle</button>
      </div>
      <div className="comparison-grid">
        {options.map((option) => {
          const price = numeric(option.price);
          const initial = numeric(option.initialCosts);
          const annual = numeric(option.annualCosts);
          const years = numeric(option.years);
          const weeklyUses = numeric(option.usesPerWeek);
          const total = price + initial + annual * years;
          const estimatedUses = Math.floor(years * weeklyUses * 52);
          const costPerUse = estimatedUses > 0 ? total / estimatedUses : null;
          const ready = price > 0 && years > 0 && weeklyUses > 0;

          return (
            <fieldset className="comparison-option" key={option.id}>
              <legend>{option.name}</legend>
              <label className="field">Seçenek adı
                <input maxLength={60} onChange={(event) => update(option.id, { name: event.target.value })} value={option.name} />
              </label>
              <label className="field">Satın alma fiyatı (TL)
                <input inputMode="decimal" min="0" onChange={(event) => update(option.id, { price: event.target.value })} placeholder="Ürün sayfasından girin" type="number" value={option.price} />
              </label>
              <label className="field">İlk seferlik ek giderler (TL)
                <input inputMode="decimal" min="0" onChange={(event) => update(option.id, { initialCosts: event.target.value })} placeholder="Kargo, aksesuar, kurulum" type="number" value={option.initialCosts} />
              </label>
              <label className="field">Yıllık tahmini giderler (TL)
                <input inputMode="decimal" min="0" onChange={(event) => update(option.id, { annualCosts: event.target.value })} placeholder="Enerji, sarf, bakım" type="number" value={option.annualCosts} />
              </label>
              <div className="comparison-inline-fields">
                <label className="field">Kullanım yılı
                  <input min="0.1" step="0.1" onChange={(event) => update(option.id, { years: event.target.value })} type="number" value={option.years} />
                </label>
                <label className="field">Haftalık kullanım
                  <input min="0" onChange={(event) => update(option.id, { usesPerWeek: event.target.value })} type="number" value={option.usesPerWeek} />
                </label>
              </div>
              <div className="comparison-checks">
                <label><input checked={option.meetsNeeds} onChange={(event) => update(option.id, { meetsNeeds: event.target.checked })} type="checkbox" /> Belirlediğim ihtiyacı karşılıyor</label>
                <label><input checked={option.compatible} onChange={(event) => update(option.id, { compatible: event.target.checked })} type="checkbox" /> Mevcut cihaz/alanımla uyumlu</label>
                <label><input checked={option.checkedSellerTerms} onChange={(event) => update(option.id, { checkedSellerTerms: event.target.checked })} type="checkbox" /> Satıcı, garanti ve iade koşullarını kontrol ettim</label>
              </div>
              <div className="comparison-result" aria-live="polite">
                {ready ? <>
                  <span>Tahmini toplam ({years} yıl)</span><strong>{money(total)}</strong>
                  <span>{estimatedUses.toLocaleString("tr-TR")} kullanım varsayımı</span>
                  <strong>{costPerUse === null ? "—" : `${money(costPerUse)} / kullanım`}</strong>
                </> : <p>Hesaplama için fiyat, kullanım süresi ve haftalık kullanım girin.</p>}
              </div>
              {options.length > 2 && <button className="btn ghost comparison-remove" onClick={() => removeOption(option.id)} type="button">Bu seçeneği kaldır</button>}
            </fieldset>
          );
        })}
      </div>
      {options.length < 3 && <button className="btn secondary" onClick={addOption} type="button">Bir seçenek daha ekle</button>}
      <div className="comparison-actions comparison-share">
        <button className="btn primary" onClick={copySummary} type="button">Özeti kopyala</button>
        <button className="btn ghost" onClick={() => window.print()} type="button">Yazdır / PDF kaydet</button>
        <span className="comparison-status" role="status" aria-live="polite">{status}</span>
      </div>
      <p className="comparison-note">Bilgiler bu sayfada, tarayıcınızda hesaplanır ve kaydedilmez. Kopyalama ve yazdırma işlemleri sizin cihazınızda yapılır.</p>
      <p className="comparison-note">İşaret kutuları sizin değerlendirmenizdir; ürün bilgisi veya bağımsız doğrulama anlamına gelmez. Araç otomatik kazanan seçmez. Daha düşük maliyet, ihtiyacınıza daha uygun olduğu anlamına tek başına gelmez.</p>
    </section>
  );
}
