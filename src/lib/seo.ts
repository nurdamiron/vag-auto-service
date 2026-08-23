/**
 * Единый слой SEO: абсолютные ссылки, метаданные страниц и Schema.org.
 *
 * Вся разметка собирается в один граф (`@graph`) с устойчивыми `@id`,
 * чтобы поисковые системы и LLM-краулеры видели одну и ту же сущность
 * компании на всех страницах, а не десяток независимых карточек.
 */

import type { Metadata } from "next";
import { business } from "./business";
import { brands } from "./brands";
import { services, type Service } from "./services";
import { faq } from "./copy";
import { SITE_URL } from "./site";

/* ------------------------------------------------------------------ */
/*  Идентификаторы узлов графа                                         */
/* ------------------------------------------------------------------ */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const LOCALE = "ru_KZ";
export const LANGUAGE = "ru-KZ";

/**
 * Машиночитаемые версии сайта. Указываем на каждой странице:
 * `alternates` в Next.js не наследуется, а заменяется целиком.
 */
export const ALTERNATE_TYPES = {
  "application/rss+xml": `${SITE_URL}/feed.xml`,
  "text/plain": `${SITE_URL}/llms.txt`,
} as const;

/**
 * Ограничение на длину description в выдаче.
 * Google обрезает сниппет примерно на 160 символах.
 */
const DESCRIPTION_MAX = 158;

/**
 * Склеивает предложения, пока помещается в лимит сниппета.
 *
 * Обрезать по символам нельзя — получится оборванная фраза, поэтому
 * лишние предложения просто не добавляем. Первое берём всегда:
 * без него описание потеряет смысл.
 */
export function composeDescription(
  parts: string[],
  max = DESCRIPTION_MAX
): string {
  return parts.filter(Boolean).reduce((acc, part) => {
    if (!acc) return part;
    const next = `${acc} ${part}`;
    return next.length <= max ? next : acc;
  }, "");
}

/** Абсолютный URL из внутреннего пути: `/services` → `https://…/services` */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/* ------------------------------------------------------------------ */
/*  Метаданные страниц                                                 */
/* ------------------------------------------------------------------ */

type PageMetaInput = {
  title: string;
  description: string;
  /** Внутренний путь страницы — идёт в canonical и og:url */
  path: string;
  /** Тип OG: обычная страница или статья */
  type?: "website" | "article";
  /** Абсолютный или внутренний URL картинки для соцсетей */
  image?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  /**
   * Не добавлять «· VAG Auto Service» к заголовку. Нужно там, где
   * заголовок и так длинный — например у статей: с суффиксом он
   * перестаёт помещаться в выдачу и обрезается.
   */
  standaloneTitle?: boolean;
};

/**
 * Собирает метаданные страницы с обязательным canonical.
 *
 * Canonical задаём на каждой странице явно: в Next.js `alternates`
 * наследуется от корневого layout, и без переопределения все страницы
 * получили бы canonical главной.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  keywords,
  publishedTime,
  modifiedTime,
  standaloneTitle,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  /**
   * Картинку задаём явно: как только страница объявляет свой
   * `openGraph`, Next перестаёт подмешивать файл opengraph-image,
   * и превью в мессенджерах остаётся пустым.
   */
  const cover = image ?? absoluteUrl("/opengraph-image");
  const images = [{ url: cover, alt: title, width: 1200, height: 630 }];

  return {
    title: standaloneTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path, types: ALTERNATE_TYPES },
    openGraph: {
      title: `${title} · ${business.name}`,
      description,
      url,
      siteName: business.name,
      locale: LOCALE,
      type,
      images,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${business.name}`,
      description,
      images: [cover],
    },
  };
}

/** Путь к автогенерируемой картинке страницы (файл opengraph-image) */
export function ogImageUrl(path: string) {
  return absoluteUrl(`${path}/opengraph-image`);
}

/* ------------------------------------------------------------------ */
/*  Базовые узлы графа                                                 */
/* ------------------------------------------------------------------ */

const openingHours = {
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
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: business.address,
  addressLocality: business.city,
  addressRegion: business.city,
  postalCode: business.postal,
  addressCountry: "KZ",
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: business.lat,
  longitude: business.lon,
};

/** Карточка автосервиса — главная сущность сайта */
export function organizationNode() {
  return {
    "@type": ["AutoRepair", "LocalBusiness"],
    "@id": ORG_ID,
    name: business.name,
    legalName: business.name,
    alternateName: ["ВАГ Авто Сервис", "VAG Автосервис Алматы"],
    description: business.description,
    slogan: business.tagline,
    url: SITE_URL,
    telephone: business.phone,
    email: business.email,
    priceRange: "$$",
    currenciesAccepted: "KZT",
    paymentAccepted: business.payment.join(", "),
    image: absoluteUrl("/images/hero-auto-service.jpg"),
    /**
     * Именно логотип, а не OG-обложка: Google ждёт здесь фирменный
     * знак, а не превью 1200×630 для соцсетей.
     */
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absoluteUrl("/logo.svg"),
      width: 512,
      height: 512,
      caption: business.name,
    },
    address: postalAddress,
    geo,
    hasMap: business.mapUrl,
    areaServed: [
      { "@type": "City", name: "Алматы" },
      { "@type": "AdministrativeArea", name: "Ауэзовский район" },
      { "@type": "AdministrativeArea", name: "мкр. Таугуль" },
    ],
    openingHoursSpecification: openingHours,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    brand: brands.map((b) => ({ "@type": "Brand", name: b.name })),
    knowsAbout: [
      "компьютерная диагностика автомобиля",
      "ремонт двигателя",
      "ремонт АКПП, DSG и DCT",
      "ремонт ходовой части",
      "автоэлектрика",
      "малярно-кузовные работы",
      "проверка автомобиля перед покупкой",
      ...brands.map((b) => `ремонт ${b.name}`),
    ],
    knowsLanguage: ["ru", "kk"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Услуги ${business.name}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": serviceId(s.slug) },
      })),
    },
    sameAs: [business.mapUrl],
  };
}

/** Сайт как сущность — нужен для sitelinks и поисковой строки */
export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: business.name,
    description: business.description,
    inLanguage: LANGUAGE,
    publisher: { "@id": ORG_ID },
  };
}

/* ------------------------------------------------------------------ */
/*  Узлы страниц                                                       */
/* ------------------------------------------------------------------ */

type WebPageInput = {
  path: string;
  name: string;
  description: string;
  /** Подтип: ContactPage, AboutPage, CollectionPage, FAQPage… */
  type?: string;
  crumbs?: { name: string; path?: string }[];
  image?: string;
};

export function webPageNode({
  path,
  name,
  description,
  type = "WebPage",
  crumbs,
  image,
}: WebPageInput) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: LANGUAGE,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: image } }
      : {}),
    ...(crumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

/** Хлебные крошки — дублируют визуальные крошки в PageHero */
export function breadcrumbNode(
  path: string,
  crumbs: { name: string; path?: string }[]
) {
  const url = absoluteUrl(path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: absoluteUrl(c.path) } : {}),
    })),
  };
}

export function serviceId(slug: string) {
  return `${SITE_URL}/services/${slug}#service`;
}

/** Услуга как отдельная сущность, привязанная к автосервису */
export function serviceNode(service: Service) {
  return {
    "@type": "Service",
    "@id": serviceId(service.slug),
    name: service.title,
    alternateName: `${service.title} в Алматы`,
    description: service.short,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Алматы" },
    audience: {
      "@type": "Audience",
      name: `Владельцы ${brands.map((b) => b.name).join(", ")}`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Что входит: ${service.title}`,
      itemListElement: service.includes.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "KZT",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "KZT",
        description:
          "Стоимость называем после осмотра и всегда до начала работ.",
      },
      areaServed: { "@type": "City", name: "Алматы" },
      seller: { "@id": ORG_ID },
    },
  };
}

/** Список сущностей — для страниц-каталогов */
export function itemListNode(
  path: string,
  items: { name: string; path: string }[]
) {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#list`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function faqNode(path: string, items: { q: string; a: string }[] = faq) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  Сборка графа                                                       */
/* ------------------------------------------------------------------ */

/**
 * Итоговый JSON-LD страницы. Организация и сайт добавляются всегда,
 * поэтому любая точка входа на сайт полностью описывает бизнес —
 * это важно для ответов LLM, которые читают одну страницу из выдачи.
 */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), ...nodes],
  };
}
