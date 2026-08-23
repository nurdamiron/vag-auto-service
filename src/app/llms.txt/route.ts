import { llmsTxt } from "@/lib/markdown";

/**
 * /llms.txt — карта сайта для языковых моделей (llmstxt.org).
 * Отдаём статически: контент меняется только вместе с деплоем.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
