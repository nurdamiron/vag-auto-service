"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const STAGGER_STEP = 0.07;

export function StaggerGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduced ? 0 : STAGGER_STEP },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced
          ? { opacity: 0 }
          : { opacity: 0, y: 22, filter: "blur(4px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: reduced ? 0.2 : 0.55,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
