import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CONTENT_TOKENS } from "@/lib/content-tokens";

const rewardsBalanceVariants = cva(
  "relative inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        progress: "relative",
        "pre-launch": "flex-col justify-center items-center w-12 h-12 bg-[rgba(8,188,221,0.06)] rounded-full",
      },
      size: {
        large: "w-[106px] h-[106px]",
        small: "w-[77px] h-[77px]",
      },
    },
    defaultVariants: {
      variant: "progress",
      size: "large",
    },
  }
);

const getGradientColors = (percentage: number) => {
  if (percentage >= 85) {
    // Warning state: yellow to red gradient
    return {
      start: "#FFD666",
      end: "#FF4842",
    };
  } else {
    // Normal state: yellow to orange gradient
    return {
      start: "#FFD666", 
      end: "#FFAB00",
    };
  }
};

export interface RewardsBalanceIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rewardsBalanceVariants> {
  percentage?: number;
  availableRewards?: number;
  animate?: boolean;
}

const RewardsBalanceIndicator = React.forwardRef<HTMLDivElement, RewardsBalanceIndicatorProps>(
  ({ 
    className, 
    variant = "progress",
    size = "large", 
    percentage = 0, 
    availableRewards,
    animate = true,
    ...props 
  }, ref) => {
    // Pre-launch variant renders differently
    if (variant === "pre-launch") {
      const rewardsCount = availableRewards ?? CONTENT_TOKENS.DATA_DASHBOARD.REWARDS_BALANCE.PLACEHOLDER_VALUES.AVAILABLE_REWARDS_COUNT;

      return (
        <div
          ref={ref}
          className={cn("flex flex-col justify-center items-center w-12 h-12 bg-[rgba(8,188,221,0.06)] rounded-full", className)}
          {...props}
        >
          <div className="w-11 text-center">
            <div 
              className="text-[#212B36] font-bold leading-normal tracking-[0.4px]"
              style={{
                fontFamily: 'var(--font-nunito)',
                fontSize: '12px',
              }}
            >
              {rewardsCount}
            </div>
            <div 
              className="text-[#212B36] font-normal leading-normal"
              style={{
                fontFamily: 'var(--font-nunito)',
                fontSize: '8px',
              }}
            >
              {CONTENT_TOKENS.DATA_DASHBOARD.REWARDS_BALANCE.REWARDS_AVAILABLE_TEXT}
            </div>
          </div>
        </div>
      );
    }

    // Progress variant (existing functionality)
    // Generate unique ID for this instance
    const uniqueId = React.useId();
    const gradientId = `gradient-${uniqueId}`;
    
    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    
    // Size-specific configurations
    const isLarge = size === "large";
    const svgSize = isLarge ? 106 : 77;
    const strokeWidth = isLarge ? 9.0439 : 4;
    const center = svgSize / 2;
    const radius = center - strokeWidth / 2 - 16; // Account for stroke and padding
    
    const { start, end } = getGradientColors(clampedPercentage);
    const fontSize = isLarge ? 14 : 8;
    const centerCircleSize = isLarge ? 54 : 40;
    
    // Calculate stroke dash for progress
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn(rewardsBalanceVariants({ variant, size, className }))}
        {...props}
      >
        {/* SVG Container */}
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="absolute inset-0"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={start} />
              <stop offset="100%" stopColor={end} />
            </linearGradient>
          </defs>
          
          {/* Background circle - always visible */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#919EAB"
            strokeOpacity={0.16}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress circle - only render if percentage > 0 */}
          {clampedPercentage > 0 && (
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={animate ? circumference : strokeDashoffset}
              initial={animate ? { strokeDashoffset: circumference } : { strokeDashoffset }}
              animate={animate ? { strokeDashoffset } : {}}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: "easeOut"
              }}
            />
          )}
        </svg>
        
        {/* Center content with white background */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div
            className="rounded-full bg-white flex items-center justify-center shadow-sm"
            style={{
              width: `${centerCircleSize}px`,
              height: `${centerCircleSize}px`,
            }}
          >
            <span
              className="font-bold text-[#212B36] select-none"
              style={{
                fontFamily: 'Inter, var(--font-nunito), sans-serif',
                fontSize: `${fontSize}px`,
                lineHeight: 1,
              }}
            >
              {Math.round(clampedPercentage)}%
            </span>
          </div>
        </div>
      </div>
    );
  }
);

RewardsBalanceIndicator.displayName = "RewardsBalanceIndicator";

export { RewardsBalanceIndicator, rewardsBalanceVariants };
