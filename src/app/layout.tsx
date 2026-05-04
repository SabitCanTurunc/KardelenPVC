import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kardelen Pen - Turunçlar Plastik | PVC Pencere ve Kapı Sistemleri",
  description: "Kardelen Pen ve Turunçlar Plastik, PVC pencere sistemleri ve lüks çelik kapılarda bölge bayiliği güvencesiyle yanınızda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} antialiased font-sans`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
