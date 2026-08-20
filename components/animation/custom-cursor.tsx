"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.55 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.55 });

  useEffect(() => {
    const canUse = window.matchMedia("(any-pointer: fine)").matches && !window.matchMedia("(pointer: coarse)").matches;
    setEnabled(canUse);
    if (!canUse) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      const target = event.target as HTMLElement | null;
      const hover = target?.closest("a,button,[data-cursor],[data-cursor-label]");
      setActive(Boolean(hover));
      setLabel((hover as HTMLElement | null)?.dataset.cursorLabel || "");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(245,14,162,0.95)]"
        animate={{ scale: active ? 1.45 : 1, opacity: visible ? 1 : 0 }}
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-cyan-200/70 bg-cyan-200/[0.03] text-[10px] font-bold uppercase tracking-wider text-cyan-100 shadow-[0_0_36px_rgba(245,14,162,0.22)]"
        animate={{
          width: label ? 74 : active ? 54 : 36,
          height: label ? 74 : active ? 54 : 36,
          opacity: visible ? (active ? 1 : 0.72) : 0,
          borderColor: active ? "rgba(255,71,189,0.92)" : "rgba(255,71,189,0.46)"
        }}
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(245,14,162,0.2),transparent_62%)]"
          animate={{ scale: active ? 1 : 0.45, opacity: active ? 1 : 0 }}
        />
        {label ? <span className="relative">{label}</span> : null}
      </motion.div>
    </>
  );
}
