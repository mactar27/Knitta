import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ShopProvider } from "@/context/ShopContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "KnittaCorner | Crochet Fait Main & Cosmétiques",
  description: "Découvrez les créations uniques en crochet faites main à Dakar par Binta et une sélection tendance de cosmétiques, maquillage et accessoires.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <ShopProvider>
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
