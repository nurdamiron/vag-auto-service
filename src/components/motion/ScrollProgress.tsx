"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Тонкая полоса прогресса чтения под шапкой */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-orange via-orange-light to-orange"
    />
  );
}
