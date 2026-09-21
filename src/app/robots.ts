import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "GoogleOther",
  "PerplexityBot",
  "Applebot-Extended",
  "Bytespider",
  "cohere-ai",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "Diffbot",
  "CCBot",
  "Omgilibot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
