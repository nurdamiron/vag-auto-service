/**
 * Markdown-представление сайта для LLM-краулеров и ассистентов.
 *
 * Модели читают страницу быстрее и точнее, когда контент отдан
 * плоским текстом без разметки и скриптов. На основе этих функций
 * работают /llms.txt, /llms-full.txt и .md-зеркала страниц.
 */

import { business } from "./business";
import { brands, type Brand } from "./brands";
import { services, diagAreas, type Service } from "./services";
import { blogPosts, type BlogPost } from "./blog";
import { faq } from "./copy";
import { brandQa, serviceQa } from "./answers";
import { absoluteUrl } from "./seo";
import { SITE_URL } from "./site";

const bullets = (items: readonly string[]) =>
  items.map((i) => `- ${i}`).join("\n");

const qaBlock = (items: { q: string; a: string }[]) =>
  items.map((item) => `**${item.q}**\n\n${item.a}`).join("\n\n");

/** Карточка бизнеса — повторяется в каждом экспорте, чтобы факты не терялись */
export function businessMarkdown(): string {
  return [
    `# ${business.name}`,
    "",
    `> ${business.description}`,
    "",
    "## Факты о сервисе",
    "",
    bullets([
      `Название: ${business.name}`,
      `Специализация: ${business.tagline}`,
      `Город: ${business.city}, Казахстан`,
      `Адрес: ${business.fullAddress} (${business.district})`,
      `Координаты: ${business.lat}, ${business.lon}`,
      `Телефон и WhatsApp: ${business.phoneDisplay}`,
      `Email: ${business.email}`,
      `Часы работы: ${business.hours}`,
      `Рейтинг: ${business.rating} из 5 на 2ГИС (${business.reviewCount}+ оценок)`,
      `Марки: ${brands.map((b) => b.name).join(", ")}`,
      `Возраст автомобилей: примерно с ${business.carsFromYear} года и новее`,
      `Оплата: ${business.payment.join(", ")}`,
      `Гарантия: ${business.guarantee}`,
      `Карта: ${business.mapUrl}`,
      `Сайт: ${SITE_URL}`,
    ]),
  ].join("\n");
}

export function serviceMarkdown(service: Service): string {
  return [
    `# ${service.title} в Алматы`,
    "",
    `URL: ${absoluteUrl(`/services/${service.slug}`)}`,
    "",
    `> ${service.short}`,
    "",
    `**Когда пора:** ${service.trigger}`,
    "",
    "## С чем приезжают",
    "",
    bullets(service.symptoms),
    "",
    "## Подробно",
    "",
    service.description,
    "",
    "## Что входит",
    "",
    bullets(service.includes),
    "",
    "## Вопросы и ответы",
    "",
    qaBlock(serviceQa(service)),
  ].join("\n");
}

export function brandMarkdown(brand: Brand): string {
  return [
    `# Ремонт ${brand.name} в Алматы`,
    "",
    `URL: ${absoluteUrl(`/brands/${brand.slug}`)}`,
    "",
    `> ${brand.intro}`,
    "",
    "## Модели",
    "",
    bullets(brand.models.map((m) => `${brand.name} ${m}`)),
    "",
    "## Типовые обращения",
    "",
    brand.issues.map((i) => `### ${i.title}\n\n${i.text}`).join("\n\n"),
    "",
    "## Вопросы и ответы",
    "",
    qaBlock(brandQa(brand)),
  ].join("\n");
}

export function postMarkdown(post: BlogPost): string {
  const sections = post.sections
    .map((s) => `## ${s.heading}\n\n${s.paragraphs.join("\n\n")}`)
    .join("\n\n");
  const faqs = post.faqs.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n");
  return [
    `# ${post.title}`,
    "",
    `URL: ${absoluteUrl(`/blog/${post.slug}`)}`,
    `Дата публикации: ${post.dateIso}`,
    `Рубрика: ${post.category}`,
    `Ключевой запрос: ${post.primaryKeyword}`,
    "",
    `> ${post.excerpt}`,
    "",
    post.lead.join("\n\n"),
    "",
    sections,
    "",
    "## Коротко",
    "",
    post.takeaways.map((t) => `- ${t}`).join("\n"),
    "",
    "## Вопросы и ответы",
    "",
    faqs,
  ].join("\n");
}

export function diagnosticsMarkdown(): string {
  return [
    "## Направления диагностики",
    "",
    diagAreas
      .map((a) => `### ${a.title}\n\n${a.short}\n\n${bullets(a.points)}`)
      .join("\n\n"),
  ].join("\n");
}

export function faqMarkdown(): string {
  return ["## Частые вопросы", "", qaBlock(faq)].join("\n");
}

/* ------------------------------------------------------------------ */
/*  Файлы для LLM                                                      */
/* ------------------------------------------------------------------ */

/**
 * /llms.txt — краткая карта сайта по спецификации llmstxt.org:
 * факты о бизнесе плюс аннотированные ссылки на все разделы.
 */
export function llmsTxt(): string {
  const link = (title: string, path: string, note: string) =>
    `- [${title}](${absoluteUrl(path)}): ${note}`;

  return [
    businessMarkdown(),
    "",
    "## Услуги",
    "",
    services.map((s) => link(s.title, `/services/${s.slug}`, s.short)).join("\n"),
    "",
    "## Марки",
    "",
    brands.map((b) => link(`Ремонт ${b.name}`, `/brands/${b.slug}`, b.short)).join("\n"),
    "",
    "## Статьи",
    "",
    blogPosts.map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt)).join("\n"),
    "",
    "## Разделы сайта",
    "",
    [
      link("Главная", "/", "обзор сервиса, симптомы, отзывы"),
      link("Все услуги", "/services", "каталог из двенадцати направлений"),
      link("Все марки", "/brands", "концерн VAG и корейские марки"),
      link("Вопросы и ответы", "/faq", "цены, гарантия, запись, оплата"),
      link("О сервисе", "/about", "как работаем и чем отличаемся"),
      link("Контакты и запись", "/contact", "адрес, телефон, форма заявки"),
    ].join("\n"),
    "",
    "## Полный текст",
    "",
    `- [llms-full.txt](${absoluteUrl("/llms-full.txt")}): весь контент сайта одним файлом`,
    `- Любую страницу можно получить в Markdown, добавив \`.md\`: например ${absoluteUrl("/services/computer-diagnostics.md")}`,
  ].join("\n");
}

/** /llms-full.txt — весь контент сайта одним документом */
export function llmsFullTxt(): string {
  const rule = "\n\n---\n\n";

  return [
    businessMarkdown(),
    diagnosticsMarkdown(),
    faqMarkdown(),
    "# Услуги",
    services.map(serviceMarkdown).join(rule),
    "# Марки",
    brands.map(brandMarkdown).join(rule),
    "# Статьи",
    blogPosts.map(postMarkdown).join(rule),
  ].join(rule);
}
