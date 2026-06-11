"use client";

import { Children, Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HorizontalAutoSlider({
  children,
  ariaLabel,
  intervalMs = 3600,
  itemClassName
}: {
  children: React.ReactNode;
  ariaLabel: string;
  intervalMs?: number;
  itemClassName?: string;
}) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const resetTimerRef = useRef<number>();
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const stepWidth = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 16 : 0;
  }, []);

  const go = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track || items.length < 2) return;

    indexRef.current = direction === 1
      ? indexRef.current + 1
      : indexRef.current <= 0 ? items.length - 1 : indexRef.current - 1;

    track.scrollTo({ left: stepWidth() * indexRef.current, behavior: reduceMotion ? "auto" : "smooth" });

    if (indexRef.current >= items.length) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(() => {
        indexRef.current = 0;
        track.scrollTo({ left: 0, behavior: "auto" });
      }, 750);
    }
  }, [items.length, reduceMotion, stepWidth]);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => go(1), intervalMs);
    return () => window.clearInterval(timer);
  }, [go, intervalMs, items.length, paused]);

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

  if (!items.length) return null;

  return (
    <div className="group/slider relative w-full min-w-0 max-w-full overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className="no-scrollbar flex w-full max-w-full cursor-grab snap-x snap-mandatory select-none gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 active:cursor-grabbing"
        onPointerDown={(event) => {
          const track = trackRef.current;
          if (!track) return;
          dragRef.current = { active: true, startX: event.clientX, scrollLeft: track.scrollLeft };
          setPaused(true);
          track.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const track = trackRef.current;
          if (!track || !dragRef.current.active) return;
          track.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
        }}
        onPointerUp={(event) => {
          const track = trackRef.current;
          if (!track) return;
          dragRef.current.active = false;
          track.releasePointerCapture(event.pointerId);
          const width = stepWidth();
          indexRef.current = width ? Math.round(track.scrollLeft / width) % items.length : 0;
          track.scrollTo({ left: width * indexRef.current, behavior: reduceMotion ? "auto" : "smooth" });
          window.setTimeout(() => setPaused(false), 900);
        }}
      >
        {(items.length > 1 ? [...items, ...items] : items).map((item, index) => (
          <div key={index} className={cn("h-auto shrink-0 snap-start", itemClassName)}>
            <Fragment>{item}</Fragment>
          </div>
        ))}
      </div>
      {items.length > 1 ? (
        <div className="mt-3 flex items-center justify-end gap-2">
          <button type="button" aria-label={`Previous ${ariaLabel}`} onClick={() => go(-1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100" data-cursor="hover"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" aria-label={`Next ${ariaLabel}`} onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100" data-cursor="hover"><ChevronRight className="h-4 w-4" /></button>
        </div>
      ) : null}
    </div>
  );
}
