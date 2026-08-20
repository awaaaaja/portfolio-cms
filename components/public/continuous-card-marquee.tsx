import { Children } from "react";
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

  // ponytail: fixed duration per speed, not measured width; tune if pacing feels off
  const duration = Math.max(12, Math.round(900 / speed));

  return (
    <div role="region" aria-label={ariaLabel} className="group mask-fade-x w-full min-w-0 overflow-hidden py-2">
      <div
        className="marquee-track flex w-max group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: direction === "right" ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className={cn("mx-2 flex h-full shrink-0", itemClassName)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}