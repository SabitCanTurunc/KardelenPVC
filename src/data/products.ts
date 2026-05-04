export type Product = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  details: string;
  specs: string[];
  price: string;
  badge: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "pvc-pencere-sistemleri",
    title: "PVC Pencere Sistemleri",
    category: "Pencere",
    image: "/images/pvc_pencere_sistemi.png",
    details: "Yüksek ısı ve ses yalıtımı sağlayan, Avrupa standartlarında PVC profiller. Kardelen Pen güvencesiyle Hatay'da uzun ömürlü kullanım ve %100 su geçirmezlik.",
    specs: ["70mm Profil Genişliği", "A Sınıfı Et Kalınlığı", "3'lü Cam Opsiyonu", "Gri/Antrasit Renk Seçenekleri"],
    price: "₺2.450",
    badge: "En Çok Tercih Edilen"
  },
  {
    id: 2,
    slug: "luks-celik-kapi-serisi",
    title: "Lüks Çelik Kapı Serisi",
    category: "Kapı",
    image: "/images/luks_celik_kapi.png",
    details: "Hatay ve çevresinde güvenliği estetikle birleştiren lüks çelik kapı modelleri. Darbelere dayanıklı gövde ve üst düzey merkezi kilit sistemleriyle güvendesiniz.",
    specs: ["1.2mm Monoblok Gövde", "Kancalı Kilit Sistemi", "Mobilya Kaplama Yüzey", "Isı Yalıtımlı Kasa"],
    price: "₺8.900",
    badge: "Yeni Sezon"
  },
  {
    id: 3,
    slug: "surme-ve-katlanir-sistemler",
    title: "Sürme & Katlanır Sistemler",
    category: "Pencere",
    image: "/images/surme_katlanir_sistem.png",
    details: "Geniş açıklıklar için kesintisiz manzara sunan, kolay açılıp kapanan sürme ve katlanır cam balkon sistemleri. Akdeniz iklimine tam uyumlu rüzgar dayanımı.",
    specs: ["Konfor Cam Özelliği", "Rüzgar Dayanımı", "Çocuk Kilidi Desteği", "Eşikli/Eşiksiz Seçenek"],
    price: "₺3.200",
    badge: "Kampanya"
  },
  {
    id: 4,
    slug: "antrasit-modern-tasarimlar",
    title: "Antrasit Modern Tasarımlar",
    category: "Pencere",
    image: "/images/antrasit_modern_pencere.png",
    details: "Modern mimariye uygun, pürüzsüz yüzeyli antrasit gri PVC sistemleri. Turunçlar Plastik farkıyla Antakya'da en çok tercih edilen yeni nesil tasarım.",
    specs: ["UV Dayanımlı Folyo", "Solmaz Renk Garantisi", "Özel Tasarım Donanım", "Kolay Temizlenebilir"],
    price: "₺2.890",
    badge: "Premium"
  }
];
