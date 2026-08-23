# SEO и оптимизация под ИИ-поиск

Документ описывает, что уже реализовано в коде и что нужно сделать
руками после деплоя. Технические детали — в `src/lib/seo.ts`,
`src/lib/markdown.ts` и `src/lib/answers.ts`.

## Что уже в коде

### Метаданные

| Что | Где |
|-----|-----|
| Title, description, keywords по каждой странице | `pageMetadata()` в `src/lib/seo.ts` |
| Canonical на каждой странице | `pageMetadata()`; в корневом layout canonical намеренно не задан |
| Open Graph и Twitter Card | `pageMetadata()` |
| Картинки для соцсетей 1200×630 | `opengraph-image.tsx` в корне и в `services/[slug]`, `brands/[slug]`, `blog/[slug]` |
| `max-snippet:-1`, `max-image-preview:large` | `robots` в `src/app/layout.tsx` |
| Гео-метки, manifest, apple-icon, theme-color | `src/app/layout.tsx`, `manifest.ts`, `apple-icon.tsx` |

Canonical живёт только на страницах. В Next.js `alternates` наследуется,
поэтому canonical в корневом layout привёл бы к тому, что все страницы
указывали бы на главную.

### Schema.org

Вся разметка собирается в один граф с устойчивыми `@id`, чтобы
поисковик видел одну сущность компании, а не копию на каждой странице.

- `AutoRepair` + `LocalBusiness` — адрес, координаты, часы, оплата,
  рейтинг, марки, каталог услуг, `knowsAbout`
- `WebSite`, `WebPage` / `CollectionPage` / `AboutPage` / `ContactPage` / `FAQPage`
- `BreadcrumbList` на всех внутренних страницах
- `Service` с `OfferCatalog` — на каждой услуге
- `FAQPage` — на `/faq`, на каждой услуге и каждой марке
- `BlogPosting` с `articleBody`, датами и автором — на статьях
- `Review` и `AggregateRating` — на главной

### Файлы для языковых моделей

| Адрес | Что отдаёт |
|-------|-----------|
| `/llms.txt` | карта сайта по спецификации llmstxt.org: факты о бизнесе и аннотированные ссылки |
| `/llms-full.txt` | весь контент сайта одним текстовым файлом (~90 КБ) |
| `/<любая-страница>.md` | Markdown-версия страницы, например `/services/brakes.md` |
| `/feed.xml` | RSS-лента статей |

`.md`-адреса переписываются в `src/proxy.ts` на маршрут `/md/[...slug]`
и отдаются с `X-Robots-Tag: noindex, follow` — чтобы ассистенты могли
их читать, но в индексе не появлялись дубли HTML-страниц.

### robots.txt

Кроме общего правила поимённо разрешены краулеры ИИ-поисковиков:
GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User,
Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended,
DuckAssistBot, YandexBot и другие. Список — в `src/app/robots.ts`.

### Контент под прямые ответы

На страницах услуг и марок есть блок «частые вопросы» — обычным
текстом, без аккордеона. Пары вопрос-ответ собираются из того же
контента, что показан на странице (`src/lib/answers.ts`), поэтому
ответ ИИ всегда совпадает с тем, что человек увидит на сайте.

## Что нужно сделать после деплоя

1. **Домен.** Задать `NEXT_PUBLIC_SITE_URL` в переменных окружения
   Vercel. Без этого canonical и sitemap указывают на адрес `.vercel.app`.
2. **Google Search Console.** Подтвердить сайт, положить код в
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, отправить `/sitemap.xml`.
3. **Яндекс.Вебмастер.** То же самое через `NEXT_PUBLIC_YANDEX_VERIFICATION`.
4. **Счётчики.** `NEXT_PUBLIC_GA_ID` и `NEXT_PUBLIC_YM_ID`. Пока пустые —
   скрипты просто не подключаются.
5. **Google Business Profile.** Карточка с тем же названием, адресом и
   телефоном, что в `src/lib/business.ts`. NAP должен совпадать
   символ в символ с 2ГИС и сайтом.
6. **Ссылка на сайт в 2ГИС** и в Google Business Profile — после этого
   добавить обратные ссылки в `sameAs` (`organizationNode()` в `seo.ts`).
7. **Отзывы.** В `src/lib/copy.ts` тексты обобщены по мотивам реальных.
   Когда владелец пришлёт выгрузку — заменить на дословные цитаты с
   датами, иначе разметка `Review` может считаться недостоверной.
8. **Проверить разметку** после деплоя: Rich Results Test и валидатор
   schema.org.

## Как проверять локально

```bash
npm run build && npm run start

curl -s localhost:3000/robots.txt
curl -s localhost:3000/llms.txt | head -30
curl -s localhost:3000/services/brakes.md | head
curl -s localhost:3000/sitemap.xml | head
```

## Что даст следующий прирост

Технический слой закрыт — дальше растёт только контент:

- страницы под связку «услуга + марка» (`ремонт DSG Volkswagen в Алматы`)
- страницы под районы Алматы, откуда реально едут клиенты
- фотографии реальных работ вместо стоковых с framerusercontent
- реальные цены или вилки — сейчас на весь сайт нет ни одной цифры,
  а «сколько стоит» ищут чаще всего
