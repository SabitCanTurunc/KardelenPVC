import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#004a99",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kardelenpvc.com'),
  title: "Hatay Kardelen Pen | Turunçlar Plastik PVC ve Çelik Kapı",
  description: "Hatay demonte pencere, PVC pencere sistemleri, Antakya lüks çelik kapı ve cam balkon. Karpen, Egepen Deceuninck bölge bayisi Turunçlar Plastik. İskenderun ve tüm ilçelere hizmet.",
  keywords: "Hatay PVC, Antakya çelik kapı, Hatay demonte pencere, İskenderun cam balkon, Turunçlar Plastik, Kardelen Pen Hatay, Hatay Egepen bayi, Karpen Hatay",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hatay Kardelen Pen | PVC Pencere ve Çelik Kapı",
    description: "Hatay ve tüm ilçelerinde PVC, demonte pencere ve lüks çelik kapı sistemleri.",
    url: "https://kardelenpvc.com",
    siteName: "Kardelen Pen Hatay",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: '/images/pvc_pencere_sistemi.png',
        width: 1200,
        height: 630,
        alt: 'Hatay Kardelen Pen PVC ve Çelik Kapı',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hatay Kardelen Pen | Turunçlar Plastik",
    description: "Hatay demonte pencere, PVC pencere sistemleri ve lüks çelik kapılarda bölge bayisi.",
    images: ['/images/pvc_pencere_sistemi.png'],
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
    "@id": "https://kardelenpvc.com",
    "url": "https://kardelenpvc.com",
    "telephone": "+905392648495",
    "priceRange": "₺₺",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kardelen Pen Mevkii",
      "addressLocality": "Antakya",
      "addressRegion": "Hatay",
      "postalCode": "31000",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.2023,
      "longitude": 36.1606
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Antakya"
      },
      {
        "@type": "City",
        "name": "İskenderun"
      },
      {
        "@type": "City",
        "name": "Defne"
      },
      {
        "@type": "City",
        "name": "Samandağ"
      }
    ]
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
