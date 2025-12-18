import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { RewardsBalanceIndicator } from "./rewards-balance-indicator";
import type { CampaignStatus } from "./status-chip";

const campaignListItemVariants = cva(
  "flex flex-col items-stretch min-w-[188px] min-h-[72px] bg-white",
  {
    variants: {
      variant: {
        inactive: "",
        active: "",
      },
    },
    defaultVariants: {
      variant: "inactive",
    },
  }
);

const getStatusIndicatorColor = (status: CampaignStatus, variant: "inactive" | "active") => {
  if (variant === "active") {
    // Use filled/selected colors for active campaigns
    switch (status) {
      case "draft":
        return "#007681";
      case "pending": 
        return "#B14C02";
      case "approved":
        return "#D66700";
      case "scheduled":
        return "#00929F";
      case "active":
        return "#009243";
      case "ended":
        return "#545F6A";
      default:
        return "#007681";
    }
  } else {
    // Use tonal/unselected colors for inactive campaigns
    switch (status) {
      case "draft":
        return "rgba(42, 217, 249, 0.12)";
      case "pending":
        return "rgba(255, 130, 63, 0.12)";
      case "approved":
        return "rgba(255, 130, 63, 0.12)";
      case "scheduled":
        return "rgba(42, 217, 249, 0.12)";
      case "active":
        return "rgba(42, 217, 249, 0.12)";
      case "ended":
        return "rgba(91, 106, 163, 0.12)";
      default:
        return "rgba(42, 217, 249, 0.12)";
    }
  }
};

export interface CampaignListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof campaignListItemVariants> {
  status: CampaignStatus;
  label: string;
  subtitle: string;
  percentage?: number;
  availableRewards?: number;
  showDivider?: boolean;
}

const CampaignListItem = React.forwardRef<HTMLDivElement, CampaignListItemProps>(
  ({ 
    className,
    variant = "inactive",
    status,
    label,
    subtitle,
    percentage,
    availableRewards,
    showDivider = true,
    ...props 
  }, ref) => {
    const statusColor = getStatusIndicatorColor(status, variant);
    
    return (
      <div
        ref={ref}
        className={cn(campaignListItemVariants({ variant, className }))}
        {...props}
      >
        {/* Main content area */}
        <div className="flex items-center gap-4 flex-1 px-4 py-3">
          {/* Leading status indicator */}
          <div className="flex items-center gap-1 self-stretch">
            <div
              className="w-12 h-12 rounded-full flex-shrink-0"
              style={{ backgroundColor: statusColor }}
            />
          </div>
          
          {/* Content */}
          <div className="flex items-center gap-4 flex-1">
            {/* Primary Column */}
            <div className="flex flex-col justify-center items-start flex-1 min-w-[90px]">
              <h3 
                className="self-stretch text-[#1F272E] font-bold leading-5"
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontSize: '16px',
                }}
              >
                {label}
              </h3>
              <p 
                className="h-5 self-stretch overflow-hidden text-ellipsis whitespace-nowrap text-[#4A535C] font-normal leading-5 tracking-[0.25px]"
                style={{
                  fontFamily: 'var(--font-nunito)',
                  fontSize: '14px',
                }}
              >
                {subtitle}
              </p>
            </div>
            
            {/* Secondary Column - Rewards Indicator */}
            <div className="flex justify-end items-center">
              {variant === "active" ? (
                <RewardsBalanceIndicator
                  variant="progress"
                  size="small"
                  percentage={percentage || 0}
                />
              ) : (
                <RewardsBalanceIndicator
                  variant="pre-launch"
                  availableRewards={availableRewards}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Divider */}
        {showDivider && (
          <div className="flex flex-col justify-center items-center self-stretch">
            <div className="w-full h-px bg-[#CFD5E0]" />
          </div>
        )}
      </div>
    );
  }
);

CampaignListItem.displayName = "CampaignListItem";

export { CampaignListItem, campaignListItemVariants };
