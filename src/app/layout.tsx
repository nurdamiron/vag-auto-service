import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";
import { business } from "@/lib/data";
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
  title: {
    default: `${business.name} — диагностика и ремонт VAG в Алматы`,
    template: `%s · ${business.name}`,
  },
  description: business.description,
  openGraph: {
    title: `${business.name} — СТО VW / Audi / Skoda, Алматы`,
    description: business.description,
    locale: "ru_KZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} ${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Header />
        <main className="relative flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
