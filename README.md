# VAG Auto Service — vag-service.com

Сайт автосервиса **VAG Auto Service** (Алматы) на **Next.js + React + Tailwind CSS**.
Дизайн — по мотивам Framer-шаблона [Camber](https://neat-room-613097.framer.app/).

Продовый домен: **https://vag-service.com**

## Данные бизнеса (2ГИС)

- **Адрес:** ул. Цветочная, 1/1, бокс 8, мкр. Таугуль, Алматы  
- **Телефон / WhatsApp:** +7 707 405 69 07  
- **Email:** baigozy@mail.ru  
- **Рейтинг:** 4.8 (100+ оценок)  
- **2ГИС:** https://2gis.kz/almaty/firm/70000001068542185  

## Стек

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide icons

## Дизайн (Camber tokens)

| Token   | Value     |
|---------|-----------|
| Navy    | `#0b1b2b` |
| Orange  | `#ea5a1e` |
| Slate   | `#45566b` |
| BG      | `#f4f6f9` |
| Fonts   | Archivo + Inter |

## Запуск

```bash
cd vag-service
cp .env.example .env.local     # при необходимости поправьте значения
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

Все — публичные (`NEXT_PUBLIC_*`), задаются в Vercel → Project → Settings → Environment Variables.
Шаблон лежит в `.env.example`.

| Переменная | Назначение | Обязательна |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Канонический адрес сайта. В коде дефолт `https://vag-service.com`, переменную задают только для превью и локалки | нет |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4, `G-XXXXXXXXXX` | нет |
| `NEXT_PUBLIC_YM_ID` | Номер счётчика Яндекс.Метрики | нет |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | `content` мета-тега Google Search Console | нет |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | `content` мета-тега Яндекс.Вебмастера | нет |

`SITE_URL` используется в `sitemap.xml`, `robots.txt`, canonical, Open Graph и Schema.org —
менять домен в коде нужно только в `src/lib/site.ts` и `next.config.ts`.

## Домен vag-service.com

1. **DNS** (у регистратора домена):
   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
2. **Vercel** → Project → Settings → Domains: добавить `vag-service.com` (Primary) и `www.vag-service.com`.
3. Приложение само склеивает хосты на канонический (308) — см. `LEGACY_HOSTS` в `next.config.ts`:
   `www.vag-service.com` и старый `vag-auto-service.vercel.app`.
4. После выката: Google Search Console + Яндекс.Вебмастер — подтвердить домен,
   положить код в `NEXT_PUBLIC_*_VERIFICATION` и отправить `https://vag-service.com/sitemap.xml`.

## Структура

```
src/
  app/                 # страницы: /, /services, /brands, /about, /blog, /contact
  components/site/     # Header, Footer, forms, FAQ…
  components/motion/   # Reveal, Stagger, ScrollProgress
  lib/data.ts          # контент и контакты
  lib/site.ts          # домен и счётчики
```

## Скрипты

- `npm run dev` — dev-сервер  
- `npm run build` — production build  
- `npm run start` — запуск production  
- `npm run lint` — ESLint  

Контент и цены — в `src/lib/`, правьте под актуальный прайс сервиса.
