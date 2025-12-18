import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const outlinedButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F70EF] focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 border",
  {
    variants: {
      size: {
        default: "h-12 px-6 gap-2 text-base leading-5 [&_svg]:size-5 rounded-full border",
        small: "h-8 px-4 gap-1 text-sm leading-5 [&_svg]:size-4 rounded-full border",
      },
      state: {
        enabled: "border-[#2F70EF] bg-transparent text-[#2F70EF] hover:bg-[rgba(47,112,239,0.08)] hover:border-[#2F70EF]",
        disabled: "border-[rgba(31,39,46,0.12)] bg-transparent text-[#1F272E] opacity-38",
      },
      iconPosition: {
        leading: "flex-row",
        trailing: "flex-row-reverse",
        none: "",
      },
    },
    defaultVariants: {
      size: "default",
      state: "enabled",
      iconPosition: "none",
    },
  },
);

export interface OutlinedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof outlinedButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const OutlinedButton = React.forwardRef<HTMLButtonElement, OutlinedButtonProps>(
  ({ className, size, state, iconPosition, asChild = false, icon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Determine state based on disabled prop
    const buttonState = disabled ? "disabled" : state || "enabled";
    
    // Determine icon position based on whether icon is provided
    const effectiveIconPosition = icon ? (iconPosition || "leading") : "none";
    
    return (
      <Comp
        className={cn(outlinedButtonVariants({ 
          size, 
          state: buttonState, 
          iconPosition: effectiveIconPosition, 
          className 
        }))}
        ref={ref}
        disabled={disabled}
        style={{
          fontFamily: 'var(--font-nunito)',
          opacity: disabled ? 0.38 : undefined,
        }}
        {...props}
      >
        {effectiveIconPosition === "leading" && icon}
        <span className="relative z-10">{children}</span>
        {effectiveIconPosition === "trailing" && icon}
      </Comp>
    );
  },
);

OutlinedButton.displayName = "OutlinedButton";

export { OutlinedButton, outlinedButtonVariants };
