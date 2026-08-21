import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { brands, business, services } from "@/lib/data";
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

/** Домен проекта на Vercel; поменять, когда подключим свой */
const SITE_URL = "https://vag-auto-service.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} — диагностика, ремонт и малярка VW, Audi, Skoda, Kia, Hyundai в Алматы`,
    template: `%s · ${business.name}`,
  },
  description: business.description,
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
  ],
  openGraph: {
    title: `${business.name} — СТО в Алматы: VAG, Kia, Hyundai`,
    description: business.description,
    url: SITE_URL,
    siteName: business.name,
    locale: "ru_KZ",
    type: "website",
  },
  alternates: { canonical: "/" },
};

/** Schema.org: карточка сервиса + каталог услуг и марок */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: business.name,
  description: business.description,
  url: SITE_URL,
  telephone: business.phone,
  email: business.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address,
    addressLocality: business.city,
    postalCode: business.postal,
    addressCountry: "KZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.lat,
    longitude: business.lon,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "20:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating,
    reviewCount: business.reviewCount,
  },
  brand: brands.map((b) => ({ "@type": "Brand", name: b.name })),
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.title,
      description: s.short,
      url: `${SITE_URL}/services/${s.slug}`,
    },
  })),
  sameAs: [business.mapUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} ${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <Header />
        <main className="relative flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
