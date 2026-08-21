import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import type { Brand } from "@/lib/data";

/**
 * Карточка марки. Без стоковых фото: вместо картинки — крупная буквенная
 * марка на фоне, чтобы сетка читалась как система, а не как каталог.
 */
export function BrandCard({ brand }: { brand: Brand }) {
  const korea = brand.group === "korea";

  return (
    <SpotlightCard
      href={`/brands/${brand.slug}`}
      className="surface-card surface-card-hover group relative flex h-full flex-col overflow-hidden p-6"
    >
      {/* Буквенный водяной знак */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-extrabold leading-none tracking-tighter text-navy/[0.04] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:text-orange/[0.09]"
      >
        {brand.name.charAt(0)}
      </span>

      <span
        className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
          korea
            ? "bg-orange/10 text-orange"
            : "bg-navy/[0.06] text-navy/70"
        }`}
      >
        {korea ? "Корея" : "VAG"}
      </span>

      <h3 className="type-display mt-4 text-2xl text-navy">{brand.name}</h3>
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
