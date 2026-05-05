"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, X, Phone, MapPin, ChevronRight, 
  CheckCircle2, ArrowRight, ShieldCheck, 
  Award, Star, Users, Zap, Droplets
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | HTMLSpanElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (currentRef) observer.observe(currentRef);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting] as const;
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'PVC Pencere Sistemleri' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, service } = formData;
    if (!name || !phone) {
      alert("Lütfen adınızı ve telefon numaranızı girin.");
      return;
    }
    const message = `Merhaba, ben ${name}. İletişim numaram: ${phone}. ${service} hizmetiniz hakkında keşif talebi oluşturmak istiyorum.`;
    const whatsappUrl = `https://wa.me/905392648495?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brands = [
    { name: "Karpen", logo: "https://www.karpen.com.tr/view/default//images/logo.png", desc: "PVC Profil Sistemleri" },
    { name: "Egepen Deceuninck", logo: "https://www.egepen.com.tr/site/images/logo.svg", desc: "Dünya Standartlarında Yalıtım" },
    { name: "Kompen", logo: "https://www.kompen.com.tr/controls/tema/default/assets/img/logo.png", desc: "Komple Kalite" },
    { name: "Flashpen", logo: "https://flashpen.az/uploads/60a6cd884ef1e97652851a30abace29c.png", desc: "PVC Kapı ve Pencere Sistemleri" }
  ];

  const stats = [
    { icon: Users, value: 1500, suffix: "+", label: "Mutlu Müşteri" },
    { icon: Award, value: 25, suffix: "", label: "Yıllık Deneyim" },
    { icon: ShieldCheck, value: 100, suffix: "%", label: "Garanti" },
    { icon: Zap, value: 100, suffix: "%", label: "Zamanında Teslimat" }
  ];

  const categories = ['Tümü', ...new Set(products.map(p => p.category))];
  const filteredProducts = activeCategory === 'Tümü' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Shared animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
      {/* Üst Bilgi Barı */}
      <div className="bg-[#004a99] text-white py-2.5 px-4 text-sm hidden md:block relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <Phone size={14} className="animate-pulse" /> 
              <a href="tel:+905392648495" className="hover:text-blue-200 transition-colors">+90 539 264 84 95</a> &nbsp;|&nbsp; 
              <a href="tel:+905364720509" className="hover:text-blue-200 transition-colors">+90 536 472 05 09</a>
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <span className="opacity-90 font-medium tracking-tight flex items-center gap-2">
              <Star size={14} className="text-yellow-400" />
              Hatay Bölge Bayisi: Karpen | Egepen Deceuninck
            </span>
          </div>
        </div>
      </div>

      {/* Navigasyon */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-blue-900/5 py-3' 
          : 'bg-white py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative z-50">
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl font-black leading-none tracking-tighter text-[#004a99]">KARDELEN PEN</span>
            <span className="text-[10px] tracking-[0.25em] font-bold mt-1 uppercase text-gray-400">Turunçlar Plastik</span>
          </div>

          <div className="hidden md:flex items-center gap-10 font-semibold text-gray-700">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#004a99]">Anasayfa</button>
            <button onClick={() => scrollToSection('urunler')} className="hover:text-[#004a99]">Ürünler</button>
            <button onClick={() => scrollToSection('kurumsal')} className="hover:text-[#004a99]">Kurumsal</button>
            <button onClick={() => scrollToSection('bayilikler')} className="hover:text-[#004a99]">Bayilikler</button>
            <button onClick={() => scrollToSection('iletisim')} className="bg-[#004a99] text-white px-7 py-3 rounded-full hover:bg-blue-800 transition-all flex items-center gap-2 group">
              Teklif Al <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <button className="md:hidden text-gray-700 relative z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobil Menü Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-28 px-6 flex flex-col gap-6"
          >
            <button onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-3xl font-black text-gray-800 text-left border-b border-gray-100 pb-4">Anasayfa</button>
            <button onClick={() => scrollToSection('urunler')} className="text-3xl font-black text-gray-800 text-left border-b border-gray-100 pb-4">Ürünler</button>
            <button onClick={() => scrollToSection('kurumsal')} className="text-3xl font-black text-gray-800 text-left border-b border-gray-100 pb-4">Kurumsal</button>
            <button onClick={() => scrollToSection('bayilikler')} className="text-3xl font-black text-gray-800 text-left border-b border-gray-100 pb-4">Bayilikler</button>
            <button onClick={() => scrollToSection('iletisim')} className="text-2xl font-black text-white bg-[#004a99] p-5 rounded-2xl text-center mt-auto mb-32 shadow-xl shadow-blue-900/20">Teklif Al</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <header className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
            className="object-cover scale-105"
            alt="Hatay Demonte Pencere Sistemleri"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-900/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Award size={14} /> Hatay'ın Öncü PVC ve Kapı Sistemleri
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]">
              Hatay'da <br /> 
              <span className="text-blue-400">Yeni Nesil</span> Kalite.
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed border-l-4 border-white pl-6 max-w-2xl font-light">
              Hatay demonte pencere, PVC sistemleri ve Antakya çelik kapı çözümlerinde Turunçlar Plastik bölge bayiliği güvencesiyle yanınızda.
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => scrollToSection('urunler')}
                className="bg-white text-[#004a99] hover:bg-blue-50 px-10 py-4 rounded-xl font-black text-lg flex items-center gap-3 transition-all shadow-xl"
              >
                Ürünleri Keşfedin <ChevronRight size={22} />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Bar */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="bg-white py-12 md:py-16 mx-4 md:mx-8 lg:mx-16 rounded-3xl shadow-2xl shadow-blue-900/10 z-20 relative -mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl mb-3 md:mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon size={24} className="md:w-7 md:h-7" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1 md:mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-500 font-semibold text-xs md:text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Bayilikler */}
      <motion.section 
        id="bayilikler" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 md:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="flex flex-col items-center mb-12 md:mb-16 text-center">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-4">Ortaklarımız</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Güçlü İş Birliklerimiz</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {brands.map((brand, i) => (
              <motion.div 
                variants={fadeInUp}
                key={i} 
                className="group cursor-pointer bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center flex flex-col justify-between"
              >
                <div className="relative h-16 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6 w-full p-2 transition-transform duration-500 group-hover:scale-105">
                  <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2" />
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-lg md:text-xl mb-1 md:mb-2">{brand.name}</h3>
                  <p className="text-gray-500 font-medium text-xs md:text-sm hidden md:block">{brand.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Ürünler - Mobil Scrollable */}
      <motion.section 
        id="urunler" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 md:gap-8">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-center md:text-left">Neler Sunuyoruz?</h2>
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 md:px-6 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${
                    activeCategory === cat ? 'bg-[#004a99] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-6 md:gap-10 snap-x snap-mandatory pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredProducts.map((product) => (
              <motion.div 
                variants={fadeInUp}
                key={product.id}
                className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-500 border border-gray-100 min-w-[85vw] md:min-w-0 flex-shrink-0 snap-center"
              >
                <Link href={`/urunler/${product.slug}`} className="absolute inset-0 z-20" aria-label={`${product.title} Detayları`} />
                <div className="relative h-[350px] md:h-[420px] overflow-hidden">
                  <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-8 md:p-10">
                    <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">{product.category}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{product.title}</h3>
                    <div className="flex items-center text-white/80 font-bold text-sm md:text-base">Detayları Görüntüle <ChevronRight size={20} className="ml-2" /></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Kurumsal Section */}
      <motion.section 
        id="kurumsal" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 md:py-24 bg-gray-900 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">Hatay'da Yılların Tecrübesi ile <br /><span className="text-blue-500">Güven Veriyoruz.</span></h2>
            <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">Hatay PVC pencere ve çelik kapı sistemlerinde bölgenin en köklü kuruluşlarından biriyiz. Kalite standartlarımızdan ödün vermeden İskenderun'dan Antakya'ya kadar tüm evleri koruyoruz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10">
                <CheckCircle2 className="text-blue-500 mb-3 md:mb-4" />
                <h4 className="font-bold mb-1 md:mb-2">Dayanıklılık</h4>
                <p className="text-xs text-gray-500">5 yıl solmama garantisi.</p>
              </div>
              <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10">
                <Droplets className="text-blue-500 mb-3 md:mb-4" />
                <h4 className="font-bold mb-1 md:mb-2">Üstün Yalıtım</h4>
                <p className="text-xs text-gray-500">Mükemmel su geçirmezlik, yüksek ses ve ısı yalıtımı.</p>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2 h-[300px] md:h-[500px]">
            <Image src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200" fill className="rounded-3xl shadow-2xl z-10 object-cover" alt="Hatay PVC Fabrika" />
            <div className="absolute inset-0 bg-blue-600/20 blur-3xl -z-10 translate-x-10 translate-y-10"></div>
          </div>
        </div>
      </motion.section>

      {/* İletişim Formu */}
      <motion.section 
        id="iletisim" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 md:py-32 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="md:w-5/12">
            <h2 className="text-4xl md:text-5xl font-black mb-8 md:mb-10 leading-tight">Hatay'daki Hayalinizdeki Evi <br /><span className="text-blue-600">Birlikte Kuralım.</span></h2>
            <div className="space-y-6 md:space-y-8">
              <div className="flex gap-4">
                <Phone className="text-blue-600 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 font-bold uppercase text-xs mb-1">Telefon</p>
                  <a href="tel:+905392648495" className="font-bold text-base md:text-lg block hover:text-blue-600 transition-colors">+90 539 264 84 95</a>
                  <a href="tel:+905364720509" className="font-bold text-base md:text-lg block hover:text-blue-600 transition-colors">+90 536 472 05 09</a>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Turunçlar+Plastik+Kardelen+Pen" target="_blank" rel="noopener noreferrer" className="flex gap-4 group cursor-pointer">
                <MapPin className="text-blue-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-400 font-bold uppercase text-xs mb-1">Adres</p>
                  <p className="font-bold text-base md:text-lg group-hover:text-blue-600 transition-colors">Turunçlar Plastik, Kardelen Pen Mevkii, Hatay</p>
                </div>
              </a>
            </div>
          </div>
          <div className="md:w-7/12 bg-gray-50 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4 md:space-y-6">
              <input 
                type="text" 
                placeholder="Adınız Soyadınız" 
                className="w-full bg-white border-0 p-4 md:p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-sm md:text-base"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input 
                type="tel" 
                placeholder="Telefon Numaranız" 
                className="w-full bg-white border-0 p-4 md:p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-sm md:text-base"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
              <select 
                className="w-full bg-white border-0 p-4 md:p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 shadow-sm appearance-none text-sm md:text-base"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option>Hatay PVC Pencere Sistemleri</option>
                <option>Antakya Çelik Kapı Modelleri</option>
                <option>Sürme & Katlanır Sistemler</option>
              </select>
              <button type="submit" className="w-full bg-[#004a99] text-white py-5 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 md:gap-3">
                Keşif Talebi Gönder <ArrowRight size={20} className="md:w-6 md:h-6" />
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center border-b border-white/5 pb-12 md:pb-20 mb-8 md:mb-12">
          <span className="text-3xl md:text-4xl font-black block mb-4 md:mb-6">KARDELEN PEN HATAY</span>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed italic">&quot;Turunçlar Plastik güvencesiyle, Hatay'da kaliteli yaşam alanları inşa ediyoruz.&quot;</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 justify-between items-center text-gray-600 text-[10px] md:text-xs font-black uppercase tracking-widest text-center">
          <span>© 2024 Kardelen Pen - Turunçlar Plastik.</span>
          <span>Tüm Hakları Saklıdır.</span>
        </div>
      </footer>
    </div>
  );
}
