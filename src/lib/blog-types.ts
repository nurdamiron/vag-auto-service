/** Типы блога. Сами статьи живут в `src/content/blog/posts.json`. */

export type BlogFaq = {
  q: string;
  a: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  date: string;
  dateIso: string;
  image: string;
  coverAlt: string;
  primaryKeyword: string;
  keywords: string[];
  relatedService?: string;
  relatedBrand?: string;
  relatedModel?: string;
  /** Intro without a heading — first answer for search / LLM */
  lead: string[];
  sections: BlogSection[];
  faqs: BlogFaq[];
  takeaways: string[];
};

export const BLOG_CATEGORIES = [
  "Диагностика",
  "Двигатель",
  "КПП",
  "Ходовая",
  "Тормоза",
  "Электрика",
  "Малярка",
  "Перед покупкой",
  "ТО",
  "Климат",
  "Охлаждение",
  "Алматы",
  "Volkswagen",
  "Audi",
  "Skoda",
  "Kia / Hyundai",
  "Porsche",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
