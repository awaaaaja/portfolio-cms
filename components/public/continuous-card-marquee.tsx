"use client";

import { Children } from "react";
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

export function ContinuousCardMarquee({
  children,
  ariaLabel,
  direction = "left",
  speed = 24,
  itemClassName
}: {
  children: React.ReactNode;
  ariaLabel: string;
  direction?: "left" | "right";
  speed?: number;
  itemClassName?: string;
}) {
  const items = Children.toArray(children);
  if (!items.length) return null;

  return (
    <div role="region" aria-label={ariaLabel} className="mask-fade-x w-full min-w-0 overflow-hidden py-2">
      <Marquee autoFill pauseOnHover direction={direction} speed={speed} gradient={false}>
        {items.map((item, index) => (
          <div key={index} className={cn("mx-2 flex h-full shrink-0", itemClassName)}>
            {item}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
