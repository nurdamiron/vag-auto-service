type Props = {
  slug: string;
  name: string;
  className?: string;
  /** Рядом уже есть текстовое имя — логотип только картинка */
  decorative?: boolean;
};

/**
 * Официальный знак марки из /public/images/brands/{slug}.svg.
 * Цвет берётся из currentColor, поэтому один файл работает
 * и на тёмной ленте, и на белых карточках.
 */
export function BrandLogo({
  slug,
  name,
  className = "h-10 w-24",
  decorative = false,
}: Props) {
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : name}
      className={`brand-logo ${className}`}
      style={{ ["--brand-logo" as string]: `url("/images/brands/${slug}.svg")` }}
    />
  );
}
