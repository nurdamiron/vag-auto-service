import Link from "next/link";
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
            className={`type-display shrink-0 text-xl uppercase tracking-[0.18em] transition-colors sm:text-2xl ${
              dark
                ? "text-white/35 hover:text-orange"
                : "text-navy/30 hover:text-orange"
            }`}
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
