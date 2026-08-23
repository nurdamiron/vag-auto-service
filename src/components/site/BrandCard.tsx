import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { BrandLogo } from "@/components/site/BrandLogo";
import type { Brand } from "@/lib/data";

/**
 * Карточка марки. Официальный знак сверху — сетка читается как список
 * брендов, а не как набор абстрактных букв.
 */
export function BrandCard({ brand }: { brand: Brand }) {
  const korea = brand.group === "korea";

  return (
    <SpotlightCard
      href={`/brands/${brand.slug}`}
      className="surface-card surface-card-hover group relative flex h-full flex-col overflow-hidden p-6"
    >
      <div className="flex h-14 items-center">
        <BrandLogo
          slug={brand.slug}
          name={brand.name}
          decorative
          className="h-11 w-28 text-navy transition-colors duration-300 group-hover:text-orange"
        />
      </div>

      <span
        className={`mt-4 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
          korea
            ? "bg-orange/10 text-orange"
            : "bg-navy/[0.06] text-navy/70"
        }`}
      >
        {korea ? "Корея" : "VAG"}
      </span>

      <h3 className="type-display mt-3 text-2xl text-navy">{brand.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
        {brand.short}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold text-navy transition-colors group-hover:text-orange">
        Что делаем по марке
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </SpotlightCard>
  );
}
