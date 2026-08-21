"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  /** Длительность отсчёта, мс */
  duration?: number;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Счётчик, который отсчитывает значение при появлении в кадре */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  className,
  duration = 1400,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    // При reduced motion число показываем сразу, без отсчёта
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setShown(value * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  const display = reduced ? value : shown;

  const formatted = display.toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
