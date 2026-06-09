import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition duration-300 will-change-transform before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.22),transparent)] before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:before:translate-x-full active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-cyan-300 text-slate-950 shadow-neon hover:bg-cyan-200",
        secondary: "border border-white/10 bg-white/8 text-white hover:bg-white/12",
        ghost: "text-slate-200 hover:bg-white/8",
        destructive: "bg-red-500 text-white hover:bg-red-400",
        outline: "border border-cyan-300/40 bg-transparent text-cyan-100 hover:bg-cyan-300/10"
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6",
        icon: "h-10 w-10 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
