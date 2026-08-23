# VAG Auto Service

Сайт автосервиса **VAG Auto Service** (Алматы) — клон дизайна Framer-шаблона [Camber](https://neat-room-613097.framer.app/) на **Next.js + React + Tailwind CSS**.

## Данные бизнеса (2ГИС)

- **Адрес:** ул. Цветочная, 1/1, бокс 8, мкр. Таугуль, Алматы  
- **Телефон / WhatsApp:** +7 707 405 69 07  
- **Email:** baigozy@mail.ru  
- **Рейтинг:** 4.8 (100+ оценок)  
- **2ГИС:** https://2gis.kz/almaty/firm/70000001068542185  

## Стек

- Next.js (App Router)
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
cd vag-auto-service
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

```
src/
  app/                 # страницы: /, /services, /brands, /faq, /about, /blog, /contact
  components/site/     # Header, Footer, forms, FAQ…
  components/motion/   # Reveal, Stagger
  components/seo/      # вставка Schema.org
  lib/data.ts          # контент и контакты
  lib/seo.ts           # метаданные и Schema.org
  lib/markdown.ts      # llms.txt и Markdown-зеркала страниц
  proxy.ts             # переписывает /page.md на Markdown-маршрут
```

## SEO и ИИ-поиск

Сайт отдаёт машиночитаемые версии контента:

| Адрес | Что это |
|-------|---------|
| `/sitemap.xml` | карта сайта |
| `/robots.txt` | правила обхода, включая краулеры ChatGPT, Claude, Perplexity |
| `/llms.txt` | карта сайта для языковых моделей |
| `/llms-full.txt` | весь контент одним файлом |
| `/feed.xml` | RSS статей |
| `/services/brakes.md` | Markdown-версия любой страницы |

Подробности и список задач после деплоя — в [docs/SEO.md](docs/SEO.md).

## Переменные окружения

Скопируйте `.env.example` в `.env.local`. Ключевая — `NEXT_PUBLIC_SITE_URL`:
без неё canonical и sitemap указывают на адрес `.vercel.app`.

## Скрипты

- `npm run dev` — dev-сервер  
- `npm run build` — production build  
- `npm run start` — запуск production  
- `npm run lint` — ESLint  

Контент и цены в `src/lib/data.ts` — правьте под актуальный прайс сервиса.
