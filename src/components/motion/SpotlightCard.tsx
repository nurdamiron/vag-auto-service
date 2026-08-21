"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { useCallback } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Если передан — карточка целиком становится ссылкой */
  href?: string;
};

/**
 * Карточка с бликом, следующим за курсором.
 * Координаты пишем в CSS-переменные --mx / --my (см. .spotlight в globals.css).
 */
export function SpotlightCard({ children, className = "", href }: Props) {
  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const classes = `spotlight ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onPointerMove={onPointerMove}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
