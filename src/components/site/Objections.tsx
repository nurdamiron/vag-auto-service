import { StaggerGrid, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { objections } from "@/lib/data";

/**
 * Прямая отработка возражений. Формулируем вопрос так, как его думает
 * клиент, — включая неудобные.
 */
export function Objections() {
  return (
    <StaggerGrid className="grid gap-4 md:grid-cols-2">
      {objections.map((item) => (
        <StaggerItem key={item.q}>
          <SpotlightCard className="surface-card surface-card-hover flex h-full flex-col p-6">
            <p className="type-display text-lg leading-snug text-navy sm:text-xl">
              «{item.q}»
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate sm:text-[15px]">
              {item.a}
            </p>
          </SpotlightCard>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
