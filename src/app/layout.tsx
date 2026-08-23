import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Analytics } from "@/components/analytics/Analytics";
import { ConversionTracking } from "@/components/analytics/ConversionTracking";
import { business } from "@/lib/data";
import { SITE_URL, VERIFICATION } from "@/lib/site";
import { ALTERNATE_TYPES, LOCALE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} — автосервис в Алматы: VW, Audi, Skoda, Kia`,
    template: `%s · ${business.name}`,
  },
  description: business.metaDescription,
  applicationName: business.name,
  authors: [{ name: business.name, url: SITE_URL }],
  creator: business.name,
  publisher: business.name,
  category: "automotive",
  keywords: [
    "автосервис Алматы",
    "компьютерная диагностика авто Алматы",
    "ремонт Volkswagen Алматы",
    "ремонт Audi Алматы",
    "ремонт Skoda Алматы",
    "ремонт Kia Алматы",
    "ремонт Hyundai Алматы",
    "малярные работы Алматы",
    "покраска авто Алматы",
    "ремонт ходовой Алматы",
    "ремонт АКПП Алматы",
    "проверка авто перед покупкой Алматы",
    "СТО Таугуль",
  ],
  /**
   * max-image-preview и max-snippet снимают ограничения на длину
   * сниппета и размер картинки — без них поисковики и ИИ-ответы
   * показывают урезанную выдержку.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${business.name} — СТО в Алматы: VAG, Kia, Hyundai`,
    description: business.description,
    url: SITE_URL,
    siteName: business.name,
    locale: LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} — СТО в Алматы: VAG, Kia, Hyundai`,
    description: business.description,
  },
  /**
   * canonical здесь намеренно не задаём: он наследуется дочерними
   * страницами, и любая страница без своего значения указывала бы
   * на главную. Каждая страница объявляет canonical сама.
   */
  alternates: { types: ALTERNATE_TYPES },
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    ...(VERIFICATION.yandex ? { yandex: VERIFICATION.yandex } : {}),
  },
  formatDetection: { telephone: true, address: true },
  appleWebApp: { capable: true, title: business.shortName },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "KZ-ALA",
    "geo.placename": business.city,
    "geo.position": `${business.lat};${business.lon}`,
    ICBM: `${business.lat}, ${business.lon}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1b2b",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} ${archivo.variable} h-full`}>
      <head>
        {/* Домены сторонних картинок — соединение поднимается заранее */}
        <link rel="preconnect" href="https://framerusercontent.com" />
        <link rel="dns-prefetch" href="https://framerusercontent.com" />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Analytics />
        <ConversionTracking />
        <ScrollProgress />
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        <Header />
        <main id="main" className="relative flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
