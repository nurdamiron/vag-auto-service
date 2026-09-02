/**
 * Адрес сайта и идентификаторы счётчиков.
 *
 * SITE_URL берётся из переменной окружения, чтобы на превью-деплоях
 * и в dev можно было подменить хост — достаточно задать
 * NEXT_PUBLIC_SITE_URL в настройках проекта на Vercel.
 * Дефолт — продовый домен vag-service.com.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vag-service.com"
).replace(/\/$/, "");

/** Хост без протокола — для canonical, robots и текстов на сайте */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

/** Google Analytics 4: G-XXXXXXXXXX */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Яндекс.Метрика: номер счётчика */
export const YM_ID = process.env.NEXT_PUBLIC_YM_ID ?? "";

/** Подтверждение прав в Google Search Console (content тега meta) */
export const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "";

/** Подтверждение прав в Яндекс.Вебмастере */
export const YANDEX_VERIFICATION = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "";
