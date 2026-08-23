import { NextResponse, type NextRequest } from "next/server";

/**
 * Markdown-зеркало страниц: `/services/brakes.md` → `/md/services/brakes`.
 *
 * Суффикс `.md` — привычный для ИИ-ассистентов способ получить чистый
 * текст страницы. Переписываем адрес, чтобы сами маршруты оставались
 * обычными и не плодили дубли в навигации.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.endsWith(".md")) return NextResponse.next();

  const clean = pathname.slice(0, -".md".length).replace(/^\/+/, "");
  const url = request.nextUrl.clone();
  url.pathname = `/md/${clean || "index"}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
