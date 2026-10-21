export type Guide = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  checklist: string[];
  sources?: Array<{ title: string; url: string; context: string }>;
};

const common = {
  publishedAt: "2026-10-10",
  updatedAt: "2026-10-10",
};

export const guides: Guide[] = [
  {
    ...common,
    slug: "ihtiyac-listesi-ve-butce",
    title: "İhtiyaç listesi ve bütçe: satın alma kararını yavaşlatma rehberi",
    description: "Bir ürünü almadan önce ihtiyacı, toplam maliyeti ve bekleme süresini netleştiren uygulanabilir yöntem.",
    readTime: "7 dk okuma",
    category: "Bütçe",
    intro: "İyi bir alışveriş kararı en düşük etiketi bulmaktan önce, çözülmek istenen işi doğru tarif etmekle başlar. Bu çalışma ürünü yasaklamak için değil, paranın hangi ihtiyaca ayrıldığını görünür kılmak için tasarlandı.",
    sections: [
      {
        heading: "Ürün yerine kullanım anını yaz",
        paragraphs: [
          "Listeye ürün adıyla başlamak seçenekleri gereksiz yere daraltır. ‘Yeni kulaklık’ yerine ‘çevrim içi toplantıda karşı tarafa temiz ses göndermek’ yazıldığında mikrofon kalitesi öne çıkar; marka, renk ve ışıklandırma ikinci plana iner.",
          "Ardından olmazsa olmaz üç ölçüt belirle. Ölçü, bağlantı türü, kapasite, bakım kolaylığı veya mevcut cihazlarla uyumluluk bunlardan biri olabilir. Üçü aşan listelerde istekle ihtiyacı yeniden ayırmak karar yorgunluğunu azaltır.",
        ],
      },
      {
        heading: "Bütçeyi etiket fiyatından büyük düşün",
        paragraphs: [
          "Teslimat, aksesuar, sarf malzemesi, kurulum ve bakım maliyetlerini aynı satırda topla. Ucuz görünen bir yazıcı pahalı kartuşla, uygun görünen bir kahve makinesi özel kapsülle uzun vadede daha yüksek maliyet yaratabilir.",
          "Ödemeyi hangi bütçe kaleminden yapacağını da yaz. Acil durum birikimi, kira veya kredi kartı borcuyla yarışan bir alışverişin gerçek maliyeti etikette görünmez. Taksit, fiyatı düşürmez; yalnızca ödeme zamanını böler.",
        ],
      },
      {
        heading: "Bekleme süresini önceden belirle",
        paragraphs: [
          "Karar anında konulan bekleme kuralı kolayca esnetilir. Bu nedenle harcama aralıklarına göre önceden bir gece, üç gün veya bir hafta gibi basit eşikler belirle. Süre dolduğunda ihtiyaç hâlâ aynıysa değerlendirmeye devam et.",
          "Beklerken sürekli yeni seçenek ekleme. İlk üç adayın eksik bilgilerini tamamla; garanti, iade ve kullanım koşullarını doğrula. Karar kalitesi, açılan sekme sayısından çok aynı ölçütlerin tutarlı uygulanmasına bağlıdır.",
        ],
      },
    ],
    checklist: ["Çözmek istediğim işi tek cümlede yazdım.", "Üç olmazsa olmaz ölçüt belirledim.", "Toplam sahip olma maliyetini hesapladım.", "Harcamanın bütçe kaynağını belirledim.", "Bekleme süremi tamamladım."],
  },
  {
    ...common,
    slug: "urun-karsilastirma-notlari",
    title: "Ürün karşılaştırma notu nasıl hazırlanır?",
    description: "Model, fiyat, satıcı, garanti ve kullanım koşullarını aynı tabloda değerlendirmenin sade yolu.",
    readTime: "6 dk okuma",
    category: "Karşılaştırma",
    intro: "Karşılaştırma, en fazla sekmeyi açmak değil; her aday için aynı soruları sormaktır. Küçük bir not şablonu, pazarlama ifadeleri ile doğrulanabilir özellikleri birbirinden ayırır.",
    sections: [
      { heading: "Aynı beş alanı kullan", paragraphs: ["Her seçenek için tam model kodu, son fiyat, satıcı, teslimat/iade koşulu ve ihtiyacınla ilgili ana özelliği aynı sırayla yaz. Boş kalan alan, olumlu varsayım değil araştırılacak eksik bilgidir.", "Renk veya kapasite gibi varyantların model kodunu değiştirebildiğini unutma. Başlıklara güvenmek yerine üretici kodunu karşılaştırmak, farklı ürünleri aynı sanma hatasını azaltır."] },
      { heading: "Fiyata zaman damgası ekle", paragraphs: ["Fiyat, kupon ve stok hızla değişir. Rakamın yanına kontrol tarihini ve zorunlu üyelik gibi koşulları yaz; birkaç gün sonra eski fiyatı güncel sanmazsın.", "İndirim yüzdesi yerine ödenecek son tutarı kullan. Referans fiyatın gerçekten uygulanıp uygulanmadığını bilmiyorsan yüzdelik oran karar ölçütü olmamalıdır."] },
      { heading: "Örnek: iki seçeneğin dört yıllık maliyeti", paragraphs: ["Aşağıdaki sayılar yalnızca hesabı göstermek için uydurulmuş örnektir; gerçek ürün, fiyat veya kullanım ömrü bilgisi değildir. A seçeneği 8.000 TL, ilk ek gideri 0 TL ve yıllık gideri 1.800 TL ise dört yıllık toplamı 8.000 + (4 × 1.800) = 15.200 TL olur. B seçeneği 10.500 TL, ilk ek gideri 500 TL ve yıllık gideri 1.000 TL ise toplamı 10.500 + 500 + (4 × 1.000) = 15.000 TL olur.", "İki seçeneğin de haftada üç kez kullanılacağını varsayarsak dört yılda yaklaşık 624 kullanım eder. Tahmini kullanım başı maliyet A için 24,36 TL, B için 24,04 TL çıkar. Bu küçük fark B'nin daha iyi olduğunu kanıtlamaz: gider ve kullanım ömrü tahminleri değişirse sonuç da değişir. Belirsiz kalemleri ayrıca işaretle; kararı değiştirecek bilgi varsa önce onu doğrula." ] },
      { heading: "Eksileri de görünür tut", paragraphs: ["Karşılaştırma tablosuna yalnızca güçlü yanları yazmak ilk beğenilen ürünü doğrulamaya dönüşür. Her aday için kabul edeceğin bir eksiyi ve vazgeçme nedeni olabilecek bir riski açıkça ekle.", "Son aşamada özellik saymak yerine kullanım senaryosu seç: evde, yolculukta veya yoğun iş gününde hangi aday daha az sürtünme yaratıyor? Kazanan, her sütunda en yüksek puanı alan değil ihtiyaca en iyi uyan seçenektir."] },
    ],
    checklist: ["Tam model kodları aynı.", "Fiyatların kontrol tarihini yazdım.", "Satıcı ve iade koşullarını ekledim.", "Her adayın eksisini kaydettim.", "Kararı kendi kullanım senaryomda sınadım."],
  },
  {
    ...common,
    slug: "toplam-sahip-olma-maliyeti",
    title: "Toplam sahip olma maliyeti nasıl hesaplanır?",
    description: "Satın alma fiyatının arkasındaki bakım, enerji, sarf ve yenileme giderlerini hesaplama yöntemi.",
    readTime: "8 dk okuma",
    category: "Bütçe",
    intro: "İki ürün arasında görünen fiyat farkı, kullanım dönemi boyunca tersine dönebilir. Toplam sahip olma maliyeti hesabı geleceği kusursuz tahmin etmez; görünmeyen giderleri aynı çerçevede karşılaştırmayı sağlar.",
    sections: [
      { heading: "Tek seferlik giderleri çıkar", paragraphs: ["Ürünle birlikte zorunlu alınacak kablo, aparat, kurulum, taşıma veya koruyucu ekipmanı listele. Ürün bu parçalar olmadan amacını yerine getirmiyorsa bunlar seçenek değil başlangıç maliyetidir.", "Eski cihazın elden çıkarılması, veri aktarımı veya alan düzenlemesi de zaman ve para gerektirebilir. Özellikle büyük ev aleti ve mobilyada teslimatın kapıya mı kata mı olduğu önemlidir."] },
      { heading: "Düzenli giderleri yıllıklaştır", paragraphs: ["Elektrik, filtre, kartuş, kapsül, abonelik ve bakım giderlerini aylık ya da kullanım başına tahmin edip yıllık toplamda göster. Tahmini kullanım sıklığını abartmamak için son üç aydaki gerçek alışkanlığı temel al.", "Abonelik gerektiren özelliklerde ücretsiz dönemin sonrasını hesapla. Bir özelliğin çalışması için sürekli ödeme gerekiyorsa abonelik, ürün fiyatının ayrılmaz parçasıdır."] },
      { heading: "Kullanım ömrüyle böl", paragraphs: ["Toplam maliyeti beklenen kullanım yılına veya kullanım sayısına bölmek seçenekleri ortak zemine taşır. Daha dayanıklı ama pahalı ürün, gerçekten daha uzun kullanılıyorsa kullanım başına ucuzlayabilir.", "Bu hesap kaliteyi tek başına kanıtlamaz. Yedek parça erişimi, tamir edilebilirlik ve garanti süreci için doğrulanabilir bilgi yoksa iyimser ömür varsayımı kullanma."] },
    ],
    checklist: ["Zorunlu aksesuarları ekledim.", "Sarf ve enerji giderlerini yıllıklaştırdım.", "Abonelikleri hesaba kattım.", "Gerçekçi kullanım ömrü seçtim.", "Sonucu kullanım başına maliyetle karşılaştırdım."],
  },
  {
    ...common,
    slug: "indirim-gercek-mi",
    title: "Bir indirim gerçekten avantajlı mı?",
    description: "Referans fiyat, kupon koşulu ve acele baskısını ayırarak kampanya değerlendirme kontrolü.",
    readTime: "7 dk okuma",
    category: "Fiyat",
    intro: "Büyük bir yüzde, iyi bir alışverişin kanıtı değildir. İndirim değerlendirmesinde amaç etiketi doğrulamak, toplam tutarı görmek ve ürünün indirim olmasa da ihtiyaç listesinde bulunup bulunmayacağını sormaktır.",
    sections: [
      { heading: "Referans fiyatı sorgula", paragraphs: ["Üzeri çizili fiyatın hangi tarihte ve ne kadar süre uygulandığını bilmiyorsan yalnızca bugünkü ödenecek tutara odaklan. Farklı satıcılardaki aynı model kodunu kontrol etmek daha anlamlı bir referans verir.", "Paket içeriği, kapasite veya garanti türü değiştiğinde daha düşük fiyat aynı ürün anlamına gelmeyebilir. Karşılaştırmada ürün adını değil model ve kutu içeriğini eşleştir."] },
      { heading: "Koşullu avantajları ayır", paragraphs: ["Kupon için üyelik, belirli kart, minimum sepet veya ücretli program gerekiyorsa koşulun maliyetini yaz. Kullanmayacağın ek ürünlerle sepet eşiğini tamamlamak tasarruf değildir.", "Taksit ve erteleme kampanyalarında toplam ödemeyi kontrol et. Aylık rakamın küçük görünmesi ürünün bütçeye uygun olduğu anlamına gelmez."] },
      { heading: "İndirimsiz karar testi yap", paragraphs: ["Kendine ‘Bu yüzde etiketi olmasa ürünü bugün araştırır mıydım?’ diye sor. Yanıt hayırsa karar ihtiyaca değil kaybetme korkusuna dayanıyor olabilir.", "Stok sayacı veya kısa süreli geri sayım varsa doğrulamak için sayfayı sonra yeniden kontrol et. Aciliyet hissi yükseldiğinde yeni bilgi toplamak yerine bekleme kuralına dön."] },
    ],
    checklist: ["Aynı modelin normal fiyatını kontrol ettim.", "Paket içeriğini eşleştirdim.", "Kupon ve üyelik maliyetini ekledim.", "Toplam ödeme tutarına baktım.", "İndirimsizken de ürünü isterdim."],
  },
  {
    ...common,
    slug: "satici-guvenilirligi-kontrolu",
    title: "Çevrim içi satıcı güvenilirliği nasıl kontrol edilir?",
    description: "Pazar yeri mağazalarında satıcı kimliği, teslimat, fatura ve iade bilgilerini doğrulama listesi.",
    readTime: "8 dk okuma",
    category: "Güvenli alışveriş",
    intro: "Ürün doğru olsa bile satıcı ve işlem koşulları yanlış seçim olabilir. Güvenilirlik kontrolü yalnızca yıldız puanına bakmak değil, işlemin kiminle ve hangi şartlarda yapılacağını anlamaktır.",
    sections: [
      { heading: "Satıcı ile platformu ayır", paragraphs: ["Pazar yerinin adı, ürünü gerçekten satan işletmeyle aynı olmayabilir. Satıcı unvanını, fatura bilgisini, mağaza geçmişini ve ürünün kim tarafından gönderileceğini ayrı ayrı kontrol et.", "Platform güvencesinin hangi durumları kapsadığını oku. Teslimat, iade veya garanti sorumluluğunun satıcıda olduğu aşamaları önceden bilmek sorun anında doğru kanala ulaşmayı kolaylaştırır."] },
      { heading: "Yorumların dağılımına bak", paragraphs: ["Tek bir ortalama puan yerine yakın tarihli yorumlarda tekrar eden teslimat, paketleme ve fatura sorunlarını ara. Ürün kalitesiyle satıcı hizmetini birbirine karıştırma.", "Aşırı benzer cümleler, aynı tarihte yoğunlaşan değerlendirmeler veya yalnızca genel övgüler karar için zayıf sinyaldir. Doğrulanabilir ayrıntı içeren dengeli yorumlar daha faydalıdır."] },
      { heading: "İşlem öncesi kayıt tut", paragraphs: ["Ürün sayfasındaki model, fiyat, teslimat ve satıcı bilgisini sipariş öncesinde kaydet. Koşullar değişirse hangi bilgiye dayanarak karar verdiğini gösterebilirsin.", "Ödemeyi platform dışına taşıma, mesajla farklı hesaba para gönderme veya kişisel bilgi paylaşma taleplerini kabul etme. Güvenli ödeme ve itiraz mekanizmasını terk etmek korumayı azaltır."] },
    ],
    checklist: ["Satıcının ticari unvanını gördüm.", "Gönderici ve faturayı kimin düzenlediğini biliyorum.", "Yakın tarihli satıcı yorumlarını okudum.", "İade adresi ve süresi açık.", "Ödeme platformun güvenli akışında kalıyor."],
  },
  {
    ...common,
    slug: "iade-ve-garanti-kosullari",
    title: "İade ve garanti koşullarını satın almadan önce okuma rehberi",
    description: "Süre, istisna, servis ve belge koşullarını kararın başında değerlendirmek için kontrol listesi.",
    readTime: "7 dk okuma",
    category: "Tüketici kontrolü",
    intro: "İade ve garanti, sorun çıktıktan sonra bakılacak dipnotlar değildir. Uyumluluk veya performans belirsizliği yüksek bir üründe bu koşullar ürünün kendisi kadar önemlidir.",
    sections: [
      { heading: "İade senaryosunu önceden canlandır", paragraphs: ["Süreyi, başvuru kanalını, kargo masrafını ve paketin açılması hâlindeki koşulları oku. Hijyen, kişiselleştirme veya dijital içerik gibi kategorilerde farklı kurallar bulunabilir.", "Ürünü teslim aldığında ambalajı, seri numarasını ve fiziksel durumu kontrol etmek için nasıl kayıt tutacağını belirle. Eksik veya hasarlı teslimatta gecikmeden satıcıya ve platforma bildirim yap."] },
      { heading: "Garanti tarafını belirle", paragraphs: ["Garanti süresinin yanında hizmeti kimin verdiğini sor. Üretici, ithalatçı ve satıcı garantileri aynı süreç anlamına gelmez; servis ağı ve gerekli belgeler değişebilir.", "Yurt dışı veya paralel ithalat ürünlerinde servis yolunu yazılı olarak doğrula. Ucuz fiyat, erişilemeyen servis ve yüksek gönderim masrafıyla dengelenebilir."] },
      { heading: "Sözlü vaat yerine kayıt kullan", paragraphs: ["Ürün sayfası, sipariş özeti, fatura ve yazışmaları sakla. Telefon görüşmesinde verilen kritik bir bilginin yazılı teyidini istemek sonradan yaşanacak belirsizliği azaltır.", "Bu rehber hukuki danışmanlık değildir. Uyuşmazlıkta güncel mevzuat ve resmi tüketici kanallarını kontrol et; tarih ve tutar sınırlarının değişebileceğini unutma."] },
    ],
    checklist: ["İade süresi ve istisnaları açık.", "Kargo masrafını kimin karşıladığını biliyorum.", "Garanti sağlayıcısını doğruladım.", "Servis ve belge şartlarını okudum.", "Sipariş kayıtlarını saklayacağım."],
  },
  {
    ...common,
    slug: "kullanici-yorumlarini-okumak",
    title: "Kullanıcı yorumları nasıl okunmalı?",
    description: "Ortalama puanın ötesine geçip tekrar eden sorunları ve kullanım bağlamını ayıklama yöntemi.",
    readTime: "7 dk okuma",
    category: "Araştırma",
    intro: "Yorumlar laboratuvar testi değildir fakat doğru okunduğunda gerçek kullanım sürtünmelerini gösterir. Amaç tek tek kişilere inanmak değil, kendi kullanımına benzeyen tekrar eden örüntüleri bulmaktır.",
    sections: [
      { heading: "Önce kendi sorunu tanımla", paragraphs: ["Yorumlara girmeden önce öğrenmek istediğin üç soruyu yaz: pil bir iş gününü çıkarıyor mu, kumaş ölçüsü tutarlı mı, temizliği zahmetli mi? Sorusu olmayan okuma, en duygusal yoruma takılmaya açıktır.", "İhtiyacınla ilgisiz övgü ve şikâyetleri ayır. Profesyonel kullanım bekleyen biriyle ayda bir kullanan kişinin aynı üründen beklentisi doğal olarak farklıdır."] },
      { heading: "Tekrarı ve tarihi izle", paragraphs: ["Farklı tarihlerde aynı parçanın kırılması veya aynı yazılım sorununun anlatılması anlamlı bir işarettir. Tek bir uç deneyim ise daha fazla doğrulama gerektirir.", "Ürün revizyonu ve güncelleme tarihlerini kontrol et. İki yıl önceki sorun yeni modelde çözülmüş, yeni bir güncelleme de eski olumlu yorumları geçersiz kılmış olabilir."] },
      { heading: "Puanı kararın yerine koyma", paragraphs: ["Ortalama puan; beklenti, fiyat, teslimat ve satıcı deneyimini tek sayıya sıkıştırır. Aynı puana sahip iki ürünün riskleri tamamen farklı olabilir.", "Yorumlarda bulduğun iddiaları üretici belgesi, ölçü tablosu veya bağımsız test gibi başka kaynaklarla doğrula. Yorum, araştırma sorusu üretmek için iyidir; tek başına kesin cevap değildir."] },
    ],
    checklist: ["Üç araştırma sorum hazır.", "Kendi kullanım senaryoma benzeyen yorumları seçtim.", "Tekrarlanan sorunları ayırdım.", "Yorum tarihlerini kontrol ettim.", "Kritik iddiaları ikinci kaynaktan doğruladım."],
  },
  {
    ...common,
    slug: "elektronik-uyumluluk-kontrolu",
    title: "Elektronik ürünlerde uyumluluk kontrolü",
    description: "Port, güç, işletim sistemi, ölçü ve aksesuar uyumunu siparişten önce doğrulama rehberi.",
    readTime: "8 dk okuma",
    category: "Teknoloji",
    intro: "Bir elektronik ürünün iyi olması, mevcut düzeninle çalışacağı anlamına gelmez. Uyumluluk kontrolü teknik özellik listesini ezberlemek yerine iki cihazın ortak koşullarını eşleştirmektir.",
    sections: [
      { heading: "Bağlantı adını değil işlevini eşleştir", paragraphs: ["Aynı fiziksel porta benzeyen bağlantılar farklı veri, görüntü veya güç yeteneklerine sahip olabilir. USB-C biçimi tek başına ekran çıkışı ya da hızlı şarj garantisi vermez.", "Kaynak cihaz, kablo, adaptör ve hedef cihaz zincirindeki en düşük kapasite sonucu belirler. Her parçanın gereken standardı desteklediğini üretici belgelerinden kontrol et."] },
      { heading: "Güç ve ölçüyü unutma", paragraphs: ["Voltaj, güç ve adaptör gereksinimini yalnızca ‘çalışır’ açısından değil güvenli ve kararlı kullanım açısından karşılaştır. Uygun olmayan adaptör performansı düşürebilir veya risk oluşturabilir.", "Masa, çanta, raf ve montaj alanını ölç. Ürün ölçüsüne kablo kıvrımı, havalandırma ve kapağın açılacağı boşluğu da ekle; teknik olarak sığan ürün pratikte kullanışsız olabilir."] },
      { heading: "Yazılım desteğinin sonunu araştır", paragraphs: ["İşletim sistemi sürümü, uygulama zorunluluğu ve güncelleme politikasını kontrol et. Bulut hizmetine bağlı bir özellik hizmet sona erdiğinde çalışmayabilir.", "İade süresinde kritik işlevleri denemek için kısa bir test listesi hazırla. Bağlantı, uyku modundan uyanma, ses/görüntü kararlılığı ve günlük kullandığın uygulamalar ilk günlerde sınanmalıdır."] },
    ],
    checklist: ["Portun işlevini doğruladım.", "Kablo ve adaptör standardı uygun.", "Fiziksel alanı ölçtüm.", "İşletim sistemi desteğini kontrol ettim.", "İade süresinde yapacağım testler hazır."],
  },
  {
    ...common,
    slug: "ev-aletlerinde-enerji-ve-bakim",
    title: "Ev aletlerinde enerji, bakım ve kapasite seçimi",
    description: "Günlük kullanım sıklığına göre kapasite ve bakım yükünü karşılaştırma yaklaşımı.",
    readTime: "8 dk okuma",
    category: "Ev",
    intro: "Ev aletinde fazla kapasite her zaman konfor, küçük kapasite de her zaman tasarruf değildir. Doğru seçim evin gerçek kullanım sıklığı, temizleme alışkanlığı ve cihazın yerleşeceği alanla birlikte yapılır.",
    sections: [
      { heading: "Bir haftalık gerçek kullanımı say", paragraphs: ["Kaç kişi için, haftada kaç kez ve tek seferde ne kadar iş yapılacağını kaydet. En yoğun tek günü değil olağan haftayı temel almak gereksiz büyük kapasiteyi önler.", "Nadir misafir veya özel gün ihtiyacını kiralama, mevcut ekipman ya da iki tur kullanım gibi alternatiflerle karşılaştır. Sürekli taşınacak büyük cihazın alan maliyetini de hesaba kat."] },
      { heading: "Bakım adımlarını ürün özelliği say", paragraphs: ["Filtre temizliği, kireç çözme, hazne boşaltma ve erişilmesi zor yüzeyler kullanım süresinin parçasıdır. Bakımı zor cihaz daha seyrek kullanılarak beklenen faydayı düşürebilir.", "Sarf malzemesinin bulunabilirliğini ve fiyatını kontrol et. Özel filtre veya parça yalnızca tek kaynaktan alınabiliyorsa uzun vadeli maliyet ve tedarik riski artar."] },
      { heading: "Etiketi kullanımına göre yorumla", paragraphs: ["Enerji etiketleri modelleri ortak koşullarda kıyaslamaya yardım eder; evindeki gerçek tüketim program, sıcaklık ve kullanım sıklığına göre değişir. Yıllık tahmini kendi kullanımınla ölçekle.", "Sessizlik, program süresi ve bekleme tüketimi gibi günlük deneyimi etkileyen ayrıntıları da değerlendir. En düşük tüketim, işin iki kez yapılmasına neden oluyorsa tek başına iyi sonuç değildir."] },
    ],
    checklist: ["Haftalık kullanım sayımı yaptım.", "Doğru kapasiteyi belirledim.", "Temizlik ve bakım adımlarını okudum.", "Sarf ve yedek parça erişimini kontrol ettim.", "Enerji tahminini kendi kullanımıma uyarladım."],
  },
  {
    ...common,
    slug: "abonelik-ve-ucretsiz-deneme",
    title: "Ücretsiz deneme ve aboneliklerde gerçek maliyet",
    description: "Yenileme tarihi, paket farkı ve iptal sürecini görünür kılan abonelik kontrol yöntemi.",
    readTime: "6 dk okuma",
    category: "Dijital hizmetler",
    intro: "Ücretsiz deneme bir fiyat değil, belirli tarihte ücretli plana dönüşebilen bir sözleşme başlangıcıdır. Küçük ve dağınık ödemeleri yıllık toplamda görmek kararın gerçek ölçeğini ortaya çıkarır.",
    sections: [
      { heading: "Yenileme anını kaydet", paragraphs: ["Denemenin biteceği tarihi, yenilenecek paketi ve tahsil edilecek tutarı takvime yaz. Hatırlatmayı son güne değil değerlendirme yapacak kadar erken bir tarihe kur.", "Aylık ve yıllık planların iptal/iade koşulları farklı olabilir. Yıllık rakamı on ikiye bölmek nakit çıkışının tek seferde yapılacağı gerçeğini değiştirmez."] },
      { heading: "Kullandığın değeri ölç", paragraphs: ["Son dört haftadaki gerçek kullanım sayısını ve hangi özelliğin işini çözdüğünü not et. ‘Bir gün kullanırım’ ihtimali yerine geçmiş davranıştan hareket et.", "Aynı işi yapan çakışan abonelikleri birlikte incele. Tek tek ucuz görünen hizmetler toplamda kullanılmayan önemli bir bütçe kalemi oluşturabilir."] },
      { heading: "İptali satın almadan araştır", paragraphs: ["İptal kanalını, veri dışa aktarma imkânını ve hesap kapandığında kaybolacak içerikleri önceden öğren. Çıkış maliyeti yüksek hizmette başlangıç fiyatı tek başına yeterli değildir.", "İptal sonrasında onay ekranını veya e-postayı sakla. Kart hareketlerini bir sonraki dönemde kontrol etmek, yanlış yenilemeyi erken fark etmeyi sağlar."] },
    ],
    checklist: ["Yenileme tarihi takvimde.", "Yıllık toplamı hesapladım.", "Son ay kullanımımı ölçtüm.", "Çakışan abonelikleri kontrol ettim.", "İptal ve veri taşıma koşullarını okudum."],
  },
  {
    ...common,
    slug: "durtsel-alisveris-tetikleyicileri",
    title: "Dürtüsel alışveriş tetikleyicilerini fark etmek",
    description: "Aciliyet, ödül hissi ve sosyal karşılaştırmanın karar üzerindeki etkisini azaltan pratikler.",
    readTime: "7 dk okuma",
    category: "Karar psikolojisi",
    intro: "Dürtüsel karar yalnızca irade eksikliği değildir; zaman baskısı, kolay ödeme ve duygusal rahatlama aynı anda çalışabilir. Tetikleyiciyi adlandırmak, satın alma ile ihtiyaç arasına kısa bir değerlendirme alanı açar.",
    sections: [
      { heading: "Karardan önceki duyguyu kaydet", paragraphs: ["Sepete eklemeden hemen önce sıkılma, stres, ödül ihtiyacı veya başkalarıyla karşılaştırma olup olmadığını not et. Amaç duyguyu yargılamak değil kararın hangi sorunu çözmeye çalıştığını anlamaktır.", "Ürünün sağlayacağı işlevle beklenen duygusal sonucu iki ayrı cümleye yaz. İkincisi baskınsa ücretsiz veya geri döndürülebilir başka bir rahatlama seçeneğini önce dene."] },
      { heading: "Sürtünmeyi bilinçli artır", paragraphs: ["Kayıtlı kartı kaldırmak, bildirimleri kapatmak ve ürünü doğrudan almak yerine listeye eklemek küçük ama etkili duraklar yaratır. Amaç alışverişi imkânsızlaştırmak değil otomatikliği azaltmaktır.", "Gece, yorgunluk veya yoğun stres gibi tekrar eden zamanları fark edersen kararları ertesi güne bırakacak kişisel bir kural koy. Aynı kuralı her seferinde uygulamak pazarlık payını azaltır."] },
      { heading: "Sonucu satın alma dışında ölç", paragraphs: ["Bekleme sonunda ürünü almamak da tamamlanmış bir karardır. Vazgeçilen tutarı ayrı bir hedefe aktarmak, satın almamanın görünmez faydasını somutlaştırır.", "Alışveriş harcamaları kontrol edilemez hâle geliyor, borç veya yoğun sıkıntı yaratıyorsa yalnızca uygulama ipuçlarına güvenme; uygun bir mali danışmanlık veya ruh sağlığı desteği düşün."] },
    ],
    checklist: ["Karardan önceki duyguyu adlandırdım.", "İşlev ve duygu beklentisini ayırdım.", "Kayıtlı ödeme kolaylığını azalttım.", "Kişisel bekleme kuralımı uyguladım.", "Vazgeçtiğim tutarın hedefini belirledim."],
  },
  {
    ...common,
    slug: "ikinci-el-urun-kontrol-listesi",
    title: "İkinci el ürün alırken kontrol listesi",
    description: "Kimlik, durum, seri numarası, test ve güvenli ödeme adımlarını planlayan görüşme rehberi.",
    readTime: "8 dk okuma",
    category: "İkinci el",
    intro: "İkinci el alışveriş maliyet ve kaynak kullanımı açısından iyi bir seçenek olabilir; ancak ürün geçmişi ve işlem koruması daha fazla doğrulama gerektirir. Kontrol listesi görüşme heyecanında kritik adımların unutulmasını önler.",
    sections: [
      { heading: "İlanla ürünü eşleştir", paragraphs: ["Model kodu, kapasite, renk, aksesuar ve belirtilen kusurları yazılı olarak netleştir. Temsili fotoğraf yerine mevcut ürüne ait farklı açılardan, iyi ışıkta çekilmiş görüntüler iste.", "Seri numarasının paylaşılması güvenliyse ürün üzerindeki etiketle yazılım ekranını eşleştir. Çalıntı veya hesap kilitli cihaz riskine karşı ilgili resmi sorgulama imkânlarını kullan."] },
      { heading: "Kısa bir test senaryosu hazırla", paragraphs: ["Görüşmeden önce açılış, bağlantılar, pil, ekran, ses, düğmeler ve şarj gibi kategoriye uygun testleri sırala. Satıcının acele ettirmesi nedeniyle testi atlama.", "Kusurun onarım maliyetini yalnızca tahmin etme; mümkünse parça ve servis erişimini önceden araştır. Ucuz ürün, zor bulunan bir parçayla ekonomik olmaktan çıkabilir."] },
      { heading: "İşlem güvenliğini koru", paragraphs: ["Mümkün olduğunda platformun ödeme ve alıcı koruma sisteminde kal. Kapora, farklı hesaba havale veya kimlik belgesi gönderme taleplerinde kişisel ve mali riskleri değerlendir.", "Teslim anında ürün durumu, ödeme ve taraflar arasındaki anlaşmayı kayıt altına al. Mevzuat ve platform kuralları değişebileceğinden güncel resmi koşulları ayrıca kontrol et."] },
    ],
    checklist: ["Gerçek ürün fotoğraflarını gördüm.", "Model ve aksesuarlar net.", "Seri/hesap kilidi riskini kontrol ettim.", "Test sıram hazır.", "Ödeme korunan kanal üzerinden yapılacak."],
  },
  {
    ...common,
    slug: "teslimat-paket-kontrolu",
    title: "Teslimatta paket ve ürün kontrolü",
    description: "Hasar, eksik parça ve yanlış model sorunlarını erken fark etmek için teslimat sonrası ilk adımlar.",
    readTime: "6 dk okuma",
    category: "Teslimat",
    intro: "Teslimatın tamamlanması kontrolün bittiği anlamına gelmez. Özellikle yüksek değerli veya kırılabilir ürünlerde paketi sistemli incelemek, sorun bildiriminin hızlı ve belgeli yapılmasını sağlar.",
    sections: [
      { heading: "Dış paketi teslim anında incele", paragraphs: ["Ezilme, yırtık, ıslaklık veya yeniden bantlanma belirtisi varsa mümkün olan kanallardan kayıt oluştur. Teslimat görevlisinin prosedürü ve platformun hasar bildirim yöntemini takip et.", "Kargo etiketindeki alıcı ve paket sayısını siparişle eşleştir. Birden fazla koli beklenen siparişte eksik paketi ürün eksikliğiyle karıştırmamak için gönderi parçalarını kontrol et."] },
      { heading: "Model ve içeriği eşleştir", paragraphs: ["Kutuyu açtıktan sonra model kodu, renk, kapasite ve seri numarasını sipariş özetiyle karşılaştır. Ürünü yoğun kullanmadan önce yanlış varyant ihtimalini ele.", "Kılavuzdaki kutu içeriğine göre kablo, aparat ve belgeleri say. Eksik parçayı aynı gün fotoğraf ve sipariş numarasıyla bildirmek süreci kolaylaştırır."] },
      { heading: "İlk testi sınırlı ve planlı yap", paragraphs: ["İade koşullarını koruyacak biçimde temel işlevleri dene. Ambalaj ve koruyucu parçaları, doğru ürün ve sorunsuz çalışma teyit edilene kadar düzenli sakla.", "Sorun varsa açıklayıcı fotoğraf veya kısa video hazırla ve yazılı destek kanalını kullan. Ürün üzerinde onarım ya da değişiklik yapmak garanti ve iade değerlendirmesini etkileyebilir."] },
    ],
    checklist: ["Dış paketi kontrol ettim.", "Koli sayısı doğru.", "Model ve seri bilgisi eşleşiyor.", "Kutu içeriği eksiksiz.", "Temel işlevleri iade süresi içinde denedim."],
  },
];

export function getGuide(slug: string) {
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return undefined;

  const sources = guideSources[slug] ?? [];
  return {
    ...guide,
    sources,
    updatedAt: sources.length ? "2026-10-21" : guide.updatedAt,
  };
}

const guideSources: Record<string, NonNullable<Guide["sources"]>> = {
  "ihtiyac-listesi-ve-butce": [
    {
      title: "Ticaret Bakanlığı: Mesafeli sözleşmeler hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme",
      context: "Çevrim içi alışveriş öncesi satıcı, toplam fiyat, teslimat ve sözleşme bilgilerinin kontrolü için resmi tüketici kaynağı.",
    },
    {
      title: "Ticaret Bakanlığı: Fiyat etiketleri hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/fiyat-etiketleri-hakkinda-bilgilendirme",
      context: "Fiyat etiketi ve indirim öncesi fiyat sunumu hakkında güncel resmi açıklama.",
    },
  ],
  "urun-karsilastirma-notlari": [
    {
      title: "Ticaret Bakanlığı: Mesafeli sözleşmeler hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme",
      context: "Satıcı kimliği, toplam fiyat, teslimat ve cayma hakkı gibi satın alma öncesi kontrol başlıkları.",
    },
    {
      title: "Ticaret Bakanlığı: Tanıtma ve kullanma kılavuzları hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/tanitma-ve-kullanma-kilavuzlari-hakkinda-bilgilendirme",
      context: "Ürünün kullanım, kurulum ve bakım bilgilerinin üretici belgelerinden doğrulanması için.",
    },
  ],
  "indirim-gercek-mi": [
    {
      title: "Ticaret Bakanlığı: Fiyat etiketleri hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/fiyat-etiketleri-hakkinda-bilgilendirme",
      context: "İndirim öncesi fiyatın nasıl belirlenmesi gerektiğine ilişkin Bakanlık açıklaması.",
    },
    {
      title: "Ticaret Bakanlığı: Ticari reklamlar ve haksız ticari uygulamalar",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/ticari-reklamlar-ve-haksiz-ticari-uygulamalar-hakkinda-bilgilendirme",
      context: "Reklam ve kampanya beyanları hakkında resmi tüketici rehberi.",
    },
  ],
  "satici-guvenilirligi-kontrolu": [
    {
      title: "Ticaret Bakanlığı: Mesafeli sözleşmeler hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme",
      context: "Satıcının ticari unvanı, adresi ve iletişim bilgilerinin alışveriş öncesi kontrolü için resmi kaynak.",
    },
  ],
  "iade-ve-garanti-kosullari": [
    {
      title: "Ticaret Bakanlığı: Mesafeli sözleşmeler hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme",
      context: "Mesafeli sözleşme ve cayma hakkı bilgisini güncel mevzuatla birlikte kontrol edin.",
    },
    {
      title: "Ticaret Bakanlığı: Garanti belgeleri hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/garanti-belgeleri-hakkinda-bilgilendirme",
      context: "Garanti belgesi ve ürün arızasındaki tüketici hakları için resmi kaynak.",
    },
  ],
  "kullanici-yorumlarini-okumak": [
    {
      title: "Ticaret Bakanlığı: Tüketici değerlendirmeleri hakkında kılavuz (PDF)",
      url: "https://tuketici.ticaret.gov.tr/data/65089fd113b8769d9861719f/T%C3%BCketici%20De%C4%9Ferlendirmeleri%20Hakk%C4%B1nda%20K%C4%B1lavuz%20-%20kurul%20karar%C4%B1.pdf",
      context: "Çevrim içi tüketici değerlendirmelerinin yayımlanması ve doğrulanmasına ilişkin resmi çerçeve; bu yazı belirli ürün yorumlarını doğrulamaz.",
    },
  ],
  "elektronik-uyumluluk-kontrolu": [
    {
      title: "Ticaret Bakanlığı: Tanıtma ve kullanma kılavuzları hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/tanitma-ve-kullanma-kilavuzlari-hakkinda-bilgilendirme",
      context: "Uyumluluk ve kullanım şartlarını modelin üretici kılavuzundan doğrulama yaklaşımını destekler.",
    },
  ],
  "abonelik-ve-ucretsiz-deneme": [
    {
      title: "Ticaret Bakanlığı: Abonelik sözleşmeleri hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/abonelik-sozlesmeleri-hakkinda-bilgilendirme",
      context: "Abonelik sözleşmesi, bilgilendirme ve fesih başlıkları için resmi tüketici rehberi.",
    },
    {
      title: "Ticaret Bakanlığı: Mesafeli sözleşmeler hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme",
      context: "Çevrim içi kurulan hizmet sözleşmelerinin kapsamını ve ilgili istisnaları kontrol edin.",
    },
  ],
  "ikinci-el-urun-kontrol-listesi": [
    {
      title: "Ticaret Bakanlığı: Yenilenmiş ürünler hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/yenilenmis-urunler-hakkinda-bilgilendirme",
      context: "Yalnızca Bakanlıkça yetkilendirilmiş yenileme merkezlerinden satılan yenilenmiş ürünlerin kuralları için; tüm ikinci el satışlara genellenmemelidir.",
    },
  ],
  "teslimat-paket-kontrolu": [
    {
      title: "Ticaret Bakanlığı: Mesafeli sözleşmeler hakkında bilgilendirme",
      url: "https://tuketici.ticaret.gov.tr/yayinlar/tuketici-bilgi-rehberi/mesafeli-sozlesmeler-hakkinda-bilgilendirme",
      context: "Teslimat ve sözleşme yükümlülükleri için resmi kaynak; uyuşmazlıkta güncel metni kontrol edin.",
    },
  ],
};
