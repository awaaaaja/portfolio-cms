import { AnimatedGridBackground } from "@/components/animation/animated-grid-background";
import { CustomCursor } from "@/components/animation/custom-cursor";
import { SmoothScrollProvider } from "@/components/animation/smooth-scroll-provider";

export function PublicProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AnimatedGridBackground />
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
