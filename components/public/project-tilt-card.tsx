"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ProjectTiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), { stiffness: 120, damping: 22, mass: 0.75 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), { stiffness: 120, damping: 22, mass: 0.75 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div data-cursor-label="View">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      data-cursor-label="View"
    >
      {children}
    </motion.div>
  );
}
