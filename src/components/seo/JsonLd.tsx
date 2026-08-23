/**
 * Вставка Schema.org на страницу.
 *
 * Один компонент на все страницы: так разметка всегда сериализуется
 * одинаково и не расползается по дюжине inline-скриптов.
 */

type Props = { data: object; id?: string };

export function JsonLd({ data, id }: Props) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // Данные формируются на сервере из наших же модулей контента,
      // пользовательского ввода здесь нет.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
