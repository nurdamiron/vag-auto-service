import Link from "next/link";
import { BrandLogo } from "@/components/site/BrandLogo";
import { brands } from "@/lib/data";

/**
 * Бесконечная лента марок. Список дублируется, трек едет на -50% —
 * поэтому шов не виден. Анимация чистая CSS, на hover встаёт.
 */
export function BrandMarquee({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const items = [...brands, ...brands];
  const dark = tone === "dark";

  return (
    <div
      className={`marquee-wrap marquee-mask overflow-hidden border-y py-5 ${
        dark ? "border-white/10 bg-navy-deep" : "border-border bg-bg"
      }`}
    >
      <div className="marquee-track gap-10 sm:gap-14">
        {items.map((brand, i) => (
          <Link
            key={`${brand.slug}-${i}`}
            href={`/brands/${brand.slug}`}
            aria-hidden={i >= brands.length}
            tabIndex={i >= brands.length ? -1 : 0}
            className={`flex shrink-0 items-center gap-3 transition-colors ${
              dark
                ? "text-white/45 hover:text-orange"
                : "text-navy/35 hover:text-orange"
            }`}
          >
            <BrandLogo
              slug={brand.slug}
              name={brand.name}
              decorative
              className="h-8 w-[4.75rem] sm:h-9 sm:w-24"
            />
            <span className="type-display text-lg uppercase tracking-[0.18em] sm:text-xl">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
