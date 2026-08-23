import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Краулеры ИИ-поисковиков и ассистентов.
 *
 * По умолчанию часть из них считает отсутствие явного правила поводом
 * не индексировать сайт, поэтому разрешаем доступ поимённо: сервис
 * заинтересован попадать в ответы ChatGPT, Claude, Perplexity и
 * ИИ-обзоров Google.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "YandexBot",
  "meta-externalagent",
  "Amazonbot",
  "MistralAI-User",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Служебные маршруты индексировать незачем
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
