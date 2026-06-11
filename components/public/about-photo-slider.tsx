"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function AboutPhotoSlider({ images, name }: { images: string[]; name: string }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % images.length), 2000);
    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-xl bg-white/[0.06]"
      drag={images.length > 1 ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (info.offset.x < -45) setActive((current) => (current + 1) % images.length);
        if (info.offset.x > 45) setActive((current) => (current - 1 + images.length) % images.length);
      }}
    >
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
        <>
          <button type="button" aria-label="Previous photo" onClick={() => setActive((current) => (current - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/45 text-white/75 opacity-0 backdrop-blur-md transition hover:text-white group-hover:opacity-100 sm:opacity-60" data-cursor="hover"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" aria-label="Next photo" onClick={() => setActive((current) => (current + 1) % images.length)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/45 text-white/75 opacity-0 backdrop-blur-md transition hover:text-white group-hover:opacity-100 sm:opacity-60" data-cursor="hover"><ChevronRight className="h-4 w-4" /></button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 backdrop-blur-md">
            {images.map((image, index) => (
              <button key={image} type="button" aria-label={`Show photo ${index + 1}`} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-6 bg-cyan-200" : "w-1.5 bg-white/45 hover:bg-white/80"}`} data-cursor="hover" />
            ))}
          </div>
        </>
      ) : null}
    </motion.div>
  );
}
