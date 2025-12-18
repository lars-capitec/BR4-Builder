import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HEATMAP_TOKENS } from "@/lib/design-tokens";

const engagementHeatmapVariants = cva(
  "flex flex-col items-start gap-4 w-full",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface EngagementData {
  hour: number; // 24-hour format (6-18 for 6am-6pm)
  intensity: number; // 0-1 scale for engagement intensity
}

export interface EngagementHeatmapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof engagementHeatmapVariants> {
  data?: EngagementData[];
  showTimeLabels?: boolean;
}

const EngagementHeatmap = React.forwardRef<HTMLDivElement, EngagementHeatmapProps>(
  ({ className, variant, data, showTimeLabels = true, ...props }, ref) => {
    // Default gradient if no data provided
    const defaultGradient = HEATMAP_TOKENS.ENGAGEMENT_GRADIENT;
    
    // Generate dynamic gradient based on data
    const generateDynamicGradient = (engagementData: EngagementData[]) => {
      if (!engagementData || engagementData.length === 0) {
        return defaultGradient;
      }
      
      // Sort data by hour
      const sortedData = [...engagementData].sort((a, b) => a.hour - b.hour);
      
      // Create gradient stops based on engagement intensity
      const gradientStops = sortedData.map((item, index) => {
        const position = (index / (sortedData.length - 1)) * 100;
        const intensity = Math.max(0, Math.min(1, item.intensity));
        
        // Interpolate between light and dark purple based on intensity
        const r = Math.round(207 + (141 - 207) * intensity); // CF to 8D
        const g = Math.round(158 + (0 - 158) * intensity);   // 9E to 00
        const b = Math.round(216 + (163 - 216) * intensity); // D8 to A3
        
        return `rgb(${r}, ${g}, ${b}) ${position}%`;
      }).join(', ');
      
      return `linear-gradient(90deg, ${gradientStops})`;
    };
    
    const gradientStyle = data ? generateDynamicGradient(data) : defaultGradient;
    
    // Time labels for 6am to 6pm
    const timeLabels = [
      { hour: 6, label: "6am" },
      { hour: 8, label: "8am" },
      { hour: 10, label: "10am" },
      { hour: 12, label: "12pm" },
      { hour: 14, label: "2pm" },
      { hour: 16, label: "4pm" },
      { hour: 18, label: "6pm" },
    ];

    return (
      <div
        ref={ref}
        className={cn(engagementHeatmapVariants({ variant, className }))}
        {...props}
      >
        {/* Heatmap bar with icons */}
        <div className="flex justify-center items-center gap-2 w-full">
          {/* Sun icon */}
          <div 
            className="text-black text-center font-bold leading-9"
            style={{
              fontFamily: HEATMAP_TOKENS.FONT_FAMILY,
              fontSize: HEATMAP_TOKENS.ICON_SIZE,
              fontWeight: HEATMAP_TOKENS.ICON_WEIGHT,
            }}
          >
            🌞
          </div>
          
          {/* Gradient bar */}
          <div 
            className="flex-1 rounded-lg"
            style={{
              height: HEATMAP_TOKENS.BAR_HEIGHT,
              borderRadius: HEATMAP_TOKENS.BAR_BORDER_RADIUS,
              background: gradientStyle,
            }}
          />
          
          {/* Moon icon */}
          <div 
            className="text-black text-center font-bold leading-9"
            style={{
              fontFamily: HEATMAP_TOKENS.FONT_FAMILY,
              fontSize: HEATMAP_TOKENS.ICON_SIZE,
              fontWeight: HEATMAP_TOKENS.ICON_WEIGHT,
            }}
          >
            🌚
          </div>
        </div>
        
        {/* Time labels */}
        {showTimeLabels && (
          <div className="flex justify-between items-center w-full">
            {timeLabels.map((time) => (
              <div 
                key={time.hour}
                className="flex flex-col justify-end items-center"
              >
                <div 
                  className="text-center"
                  style={{
                    color: HEATMAP_TOKENS.TIME_LABEL_COLOR,
                    fontFamily: HEATMAP_TOKENS.FONT_FAMILY,
                    fontSize: HEATMAP_TOKENS.TIME_LABEL_SIZE,
                    fontWeight: HEATMAP_TOKENS.TIME_LABEL_WEIGHT,
                    lineHeight: HEATMAP_TOKENS.TIME_LABEL_LINE_HEIGHT,
                    letterSpacing: HEATMAP_TOKENS.TIME_LABEL_LETTER_SPACING,
                  }}
                >
                  {time.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

EngagementHeatmap.displayName = "EngagementHeatmap";

export { EngagementHeatmap, engagementHeatmapVariants };
export type { EngagementData };
