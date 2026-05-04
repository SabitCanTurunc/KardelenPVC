import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  
  if (!product) return { title: "Ürün Bulunamadı" };

  return {
    title: `${product.title} Fiyatları Hatay | Kardelen Pen`,
    description: `Hatay ${product.category.toLowerCase()} modelleri. ${product.details} Antakya, İskenderun ve tüm ilçelere hizmet veriyoruz.`,
    keywords: `Hatay ${product.title}, Antakya ${product.category}, İskenderun demonte pencere, Hatay PVC, Turunçlar Plastik ${product.category}`,
    openGraph: {
      title: `${product.title} - Hatay Kardelen PVC`,
      description: product.details,
      images: [product.image],
    }
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Structured Data for Google (Product JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.title} - Hatay PVC`,
    "image": `https://kardelenpvc.com${product.image}`,
    "description": product.details,
    "brand": {
      "@type": "Brand",
      "name": "Kardelen Pen"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://kardelenpvc.com/urunler/${product.slug}`,
      "priceCurrency": "TRY",
      "price": product.price.replace("₺", "").replace(".", ""),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Turunçlar Plastik Hatay"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/#urunler" className="inline-flex items-center text-[#004a99] font-bold mb-8 hover:underline">
          <ChevronLeft size={20} className="mr-1" /> Tüm Ürünlere Dön
        </Link>
        
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 relative h-[400px] md:h-auto">
            <Image 
              src={product.image} 
              alt={`Hatay ${product.title}`} 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-3 block italic">{product.category} - Hatay Bayisi</span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{product.title}</h1>
            <p className="text-gray-500 mb-8 text-base md:text-lg leading-relaxed">{product.details}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {product.specs.map((spec: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-gray-800 font-bold bg-blue-50 p-4 rounded-xl text-sm">
                  <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-auto">
              <a 
                href={`https://wa.me/905392648495?text=${encodeURIComponent(`Merhaba, Hatay'dan ulaşıyorum. ${product.title} ürününüz hakkında bilgi ve fiyat almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#004a99] text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-800 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                Hatay'a Özel Fiyat Al <Phone size={22} />
              </a>
              <p className="text-center text-xs text-gray-400 font-bold mt-4 flex items-center justify-center gap-1">
                <MapPin size={14} /> Antakya, İskenderun ve tüm ilçelere montaj
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
