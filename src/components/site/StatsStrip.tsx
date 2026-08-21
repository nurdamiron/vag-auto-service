import { Counter } from "@/components/motion/Counter";
import { stats } from "@/lib/data";

/** Полоса цифр под hero — счётчики стартуют при появлении в кадре */
export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
      {stats.map((s) => (
        <div key={s.label} className="px-5 py-6 text-center sm:py-7">
          <p className="type-numeral text-4xl text-white sm:text-5xl">
            <Counter
              value={s.value}
              decimals={s.decimals}
              suffix={s.suffix}
              className="text-gradient-ember"
            />
          </p>
          <p className="mt-2 text-[13px] leading-snug text-white/55">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
