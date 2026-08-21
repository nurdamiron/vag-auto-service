"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Направление появления; "none" — только opacity */
  from?: Direction;
} & Omit<HTMLMotionProps<"div">, "children">;

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  ...rest
}: Props) {
  const reduced = useReducedMotion();
  const offset = reduced ? OFFSET.none : OFFSET[from];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduced ? 0.2 : 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: reduced ? 0 : delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
