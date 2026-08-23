import { ImageResponse } from "next/og";
import { business } from "./business";

/**
 * Генерация картинок для соцсетей и мессенджеров.
 *
 * Один шаблон на все страницы: заголовок, подпись и реквизиты сервиса
 * в фирменных цветах Camber (navy + orange).
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const NAVY = "#0b1b2b";
const ORANGE = "#ea5a1e";

/**
 * Шрифт для рендера картинки.
 *
 * Берём Inter, а не заголовочный Archivo: у Archivo в Google Fonts нет
 * кириллического набора, и русский текст уезжал в запасной шрифт.
 * Satori не умеет woff2, поэтому просим CSS без современного
 * User-Agent — тогда в ответе приходит ссылка на TTF. Если сети нет,
 * возвращаем null и рендерим встроенным шрифтом.
 */
async function loadFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Inter:wght@700&text=${encodeURIComponent(
      text
    )}`;
    const css = await fetch(cssUrl).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

type Props = { title: string; eyebrow?: string };

export async function ogImage({ title, eyebrow }: Props) {
  const footer = `${business.phoneDisplay} · ${business.fullAddress}`;
  const label = eyebrow ?? business.city;
  const font = await loadFont(
    `${title}${label}${footer}${business.name}${business.rating}Рейтинг на 2ГИС`
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          padding: 72,
          color: "white",
          fontFamily: font ? "Inter" : "sans-serif",
        }}
      >
        {/* Оранжевая полоса-акцент сверху */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 12,
            background: ORANGE,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ORANGE,
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 48 ? 62 : 76,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderTop: "2px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 40 }}>
            {business.name}
            <span style={{ color: ORANGE, marginLeft: 20 }}>
              Рейтинг {business.rating} на 2ГИС
            </span>
          </div>
          <div
            style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.7)" }}
          >
            {footer}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font
        ? [{ name: "Inter", data: font, style: "normal", weight: 700 }]
        : undefined,
    }
  );
}
