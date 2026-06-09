"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function AboutPhotoSlider({ images, name }: { images: string[]; name: string }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion || images.length < 2) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % images.length), 5200);
    return () => window.clearInterval(interval);
  }, [images.length, reduceMotion]);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/[0.06]">
      <AnimatePresence mode="sync">
        <motion.img
          key={images[active]}
          src={images[active]}
          alt={`${name} - photo ${active + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      {images.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 backdrop-blur-md">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show photo ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-6 bg-cyan-200" : "w-1.5 bg-white/45 hover:bg-white/80"}`}
              data-cursor="hover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
