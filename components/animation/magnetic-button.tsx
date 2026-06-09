"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 110, damping: 20, mass: 0.7 });
  const y = useSpring(useMotionValue(0), { stiffness: 110, damping: 20, mass: 0.7 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="flex w-full sm:inline-flex sm:w-auto"
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.992 }}
      onMouseMove={(event) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.07);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.07);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  );
}
