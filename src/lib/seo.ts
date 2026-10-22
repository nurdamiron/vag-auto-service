import type { Metadata } from "next";
import { business } from "./business";

/** Картинка для превью ссылки в WhatsApp, Telegram и соцсетях */
export const OG_IMAGE = {
  url: "/images/hero-auto-service.jpg",
  width: 1280,
  height: 720,
  alt: `${business.name} — автосервис в Алматы`,
};

type PageMetaInput = {
  title: string;
  description: string;
  /** Путь страницы от корня, например "/services/brakes" */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Метаданные страницы: свой canonical, Open Graph и Twitter.
 *
 * Next.js сливает метаданные сегментов поверхностно, поэтому страница,
 * которая не задаёт canonical и openGraph, наследует их от layout —
 * то есть от главной. Каждая страница должна вызывать этот хелпер.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const fullTitle = `${title} · ${business.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: business.name,
      locale: "ru_KZ",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
