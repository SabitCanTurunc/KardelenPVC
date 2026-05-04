import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kardelenpvc.com'),
  title: "Hatay Kardelen Pen | Turunçlar Plastik PVC ve Çelik Kapı",
  description: "Hatay demonte pencere, PVC pencere sistemleri, Antakya lüks çelik kapı ve cam balkon. Karpen, Egepen Deceuninck bölge bayisi Turunçlar Plastik. İskenderun ve tüm ilçelere hizmet.",
  keywords: "Hatay PVC, Antakya çelik kapı, Hatay demonte pencere, İskenderun cam balkon, Turunçlar Plastik, Kardelen Pen Hatay, Hatay Egepen bayi, Karpen Hatay",
  openGraph: {
    title: "Hatay Kardelen Pen | PVC Pencere ve Çelik Kapı",
    description: "Hatay ve tüm ilçelerinde PVC, demonte pencere ve lüks çelik kapı sistemleri.",
    url: "https://kardelenpvc.com",
    siteName: "Kardelen Pen Hatay",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kardelen Pen - Turunçlar Plastik",
    "image": "https://kardelenpvc.com/images/pvc_pencere_sistemi.png",
    "description": "Hatay'ın öncü PVC pencere, çelik kapı ve cam balkon sistemleri tedarikçisi. Egepen ve Karpen bölge bayisi.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Antakya",
      "addressRegion": "Hatay",
      "addressCountry": "TR"
    },
    "telephone": "+905392648495",
    "url": "https://kardelenpvc.com"
  };

  return (
    <html
      lang="tr"
      className={`${inter.variable} antialiased font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
