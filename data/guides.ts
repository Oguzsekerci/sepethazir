export type Guide = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  checklist: string[];
};

export const guides: Guide[] = [
  {
    slug: "ihtiyac-listesi-ve-butce",
    title: "İhtiyaç listesi ve bütçe: satın alma kararını yavaşlatma rehberi",
    description:
      "Bir ürünü almadan önce ihtiyacı, toplam maliyeti ve bekleme süresini netleştirmek için pratik bir yöntem.",
    readTime: "6 dk okuma",
    intro:
      "İyi bir alışveriş kararı, en düşük etiketi bulmaktan çok sorunu doğru tanımlamakla başlar. Bu yöntem, kararını ertelemek veya satın almaktan vazgeçmek için değil; gerçekten işine yarayacak seçeneği daha sakin biçimde seçmek içindir.",
    sections: [
      {
        heading: "Önce çözmek istediğin işi tek cümlede yaz",
        paragraphs: [
          "Ürünün adı yerine kullanım anını yaz: ‘Evden çalışırken iki cihaz arasında geçiş yapıyorum’ ya da ‘Sabah kahvemi hızlı hazırlamak istiyorum’ gibi. Bu cümle, pazarlama özellikleriyle temel ihtiyacı ayırmaya yardım eder.",
          "Ardından olmazsa olmaz üç özelliği belirle. Ölçü, bağlantı türü, kapasite, bakım kolaylığı veya uyumluluk bunlardan biri olabilir. Üçü aşıldığında listeyi yeniden daralt; çok uzun gereksinim listeleri genellikle karşılaştırmayı zorlaştırır.",
        ],
      },
      {
        heading: "Toplam maliyeti aynı satırda topla",
        paragraphs: [
          "Ürün fiyatı tek başına karar verdirmez. Teslimat, aksesuar, sarf malzemesi, kurulum, garanti uzatması ve olası iade masrafını da not et. Böylece ucuz görünen bir seçenekle gerçekten ekonomik seçenek aynı şey olmadığında bunu erken fark edersin.",
          "Karşılaştırdığın ürünlerin tam model kodunu yaz. Aynı isimle satılan farklı kapasite, renk veya kutu içeriği sürümlerini yanlışlıkla eşleştirmek, özellikle elektronik ve ev aletlerinde yanıltıcı olabilir.",
        ],
      },
      {
        heading: "Bekleme süresini satın alma tutarına göre ayarla",
        paragraphs: [
          "Tekrarlayan veya pahalı bir satın alma için kendine önceden bir bekleme kuralı koy. Örneğin küçük harcamada bir gece, daha büyük harcamada birkaç gün beklemek; aciliyet hissi geçtikten sonra aynı ihtiyacın hâlâ devam edip etmediğini görmeni sağlar.",
          "Beklerken yeni ürün aramak yerine ilk listedeki üç seçeneği kontrol et. Sürekli yeni seçenek eklemek karar yorgunluğunu artırır ve iyi bir karşılaştırmayı bitirmeyi zorlaştırır.",
        ],
      },
    ],
    checklist: [
      "Çözmek istediğim işi tek cümlede yazdım.",
      "Üç olmazsa olmaz özelliği belirledim.",
      "Teslimat, aksesuar ve bakım dahil toplam maliyeti karşılaştırdım.",
      "Model kodu ve kutu içeriğinin aynı olduğundan emin oldum.",
      "Kararıma uygun bir bekleme süresi verdim.",
    ],
  },
  {
    slug: "urun-karsilastirma-notlari",
    title: "Ürün karşılaştırma notu nasıl hazırlanır?",
    description:
      "Fiyat, garanti, satıcı ve kullanım koşullarını yan yana değerlendirerek hatalı eşleştirmeleri azaltın.",
    readTime: "5 dk okuma",
    intro:
      "Karşılaştırma, en çok sekmeyi açmak değildir. Aynı kriterleri her seçenek için görünür hâle getirdiğinde, hangi farkın gerçekten önemli olduğu daha kolay anlaşılır.",
    sections: [
      {
        heading: "Her ürün için aynı beş alanı kullan",
        paragraphs: [
          "Basit bir notta model kodu, güncel fiyat, satıcı, teslimat/iade koşulu ve ihtiyacınla ilgili ana özelliği aynı sırayla yaz. Bu düzen, bir seçenekte eksik bilgi olduğunda bunu da görünür kılar; eksik bilgiyi olumlu varsayım olarak değerlendirmezsin.",
          "Yorum puanı faydalı bir sinyal olabilir, ancak ürünü tek başına açıklamaz. Yeni yorumlara, tekrar eden şikâyetlere ve ürünü seninkine benzer koşullarda kullanan kişilerin deneyimlerine bak.",
        ],
      },
      {
        heading: "Fiyatı zaman damgasıyla kaydet",
        paragraphs: [
          "Fiyatlar, kuponlar ve stok durumu hızlı değişebilir. Notuna fiyatı gördüğün tarihi ekle; günler sonra geri döndüğünde eski rakamı güncel sanmazsın. Gerçek teklif, satıcının sayfasında ve ödeme adımında doğrulanmalıdır.",
          "İndirim yüzdesi yerine ödeyeceğin son tutara odaklan. Kargo eşiği, üyelik şartı veya kupon kodu gibi koşullar karşılaştırmayı değiştirebilir.",
        ],
      },
      {
        heading: "İade ve garanti bilgisini son adım değil, ilk eleme yap",
        paragraphs: [
          "Özellikle beden, uyumluluk veya performans belirsizliği olan ürünlerde iade koşulu ürünün parçasıdır. Süreyi, masrafı, paketin açılmış olması hâlindeki şartları ve satıcının kim olduğunu satın almadan önce kontrol et.",
          "Garanti için ürünün hangi kanaldan hizmet alacağını ve belgenin nasıl sağlanacağını öğren. Bu bilgi belirsizse, yalnızca fiyat avantajı için riski kabul edip etmediğine bilinçli karar ver.",
        ],
      },
    ],
    checklist: [
      "Aynı model ve kutu içeriğini karşılaştırıyorum.",
      "Fiyatın yanına kontrol tarihini yazdım.",
      "Satıcı, teslimat ve iade koşullarını not ettim.",
      "Yorumlarda kendi kullanım senaryoma yakın deneyimleri aradım.",
      "Garanti sürecinin kim tarafından yürütüldüğünü kontrol ettim.",
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
