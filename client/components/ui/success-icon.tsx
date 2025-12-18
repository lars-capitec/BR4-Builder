import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const successIconVariants = cva(
  "flex-shrink-0",
  {
    variants: {
      size: {
        small: "w-16 h-16",
        medium: "w-20 h-20", 
        large: "w-[140px] h-[140px]",
      },
    },
    defaultVariants: {
      size: "large",
    },
  }
);

export interface SuccessIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof successIconVariants> {
  size?: "small" | "medium" | "large";
}

const SuccessIcon = React.forwardRef<HTMLDivElement, SuccessIconProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(successIconVariants({ size, className }))}
        {...props}
      >
        <svg 
          viewBox="0 0 140 140"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer circle - lightest green */}
          <path 
            opacity="0.15" 
            d="M70 140C108.66 140 140 108.66 140 70C140 31.3401 108.66 0 70 0C31.3401 0 0 31.3401 0 70C0 108.66 31.3401 140 70 140Z"
            fill="#49E33B"
          />
          {/* Middle circle - medium green */}
          <path 
            opacity="0.2" 
            d="M70 125C100.376 125 125 100.376 125 70C125 39.6243 100.376 15 70 15C39.6243 15 15 39.6243 15 70C15 100.376 39.6243 125 70 125Z"
            fill="#009243"
          />
          {/* Inner circle - solid green */}
          <path 
            d="M70 110C92.0914 110 110 92.0914 110 70C110 47.9086 92.0914 30 70 30C47.9086 30 30 47.9086 30 70C30 92.0914 47.9086 110 70 110Z"
            fill="#009243"
          />
          {/* White checkmark */}
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M88.8103 56.2598C90.0103 57.4098 90.0403 59.3098 88.9003 60.4998L66.6703 83.6598C66.1003 84.2498 65.3203 84.5798 64.5103 84.5798C63.7003 84.5798 62.9103 84.2498 62.3503 83.6598L52.5703 73.4698C51.4203 72.2698 51.4603 70.3798 52.6603 69.2298C53.8603 68.0798 55.7503 68.1198 56.9003 69.3198L64.5203 77.2598L84.5903 56.3498C85.7403 55.3498 87.6403 55.3198 88.8303 56.2598H88.8103Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }
);

SuccessIcon.displayName = "SuccessIcon";

export { SuccessIcon, successIconVariants };
