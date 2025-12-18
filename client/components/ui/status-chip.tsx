import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusChipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold text-sm leading-5 tracking-[0.25px] h-8 px-3 gap-1 rounded-full transition-all duration-200 cursor-pointer",
  {
    variants: {
      status: {
        draft: "data-[selected=true]:bg-color-data-campaign-status-draft-selected-bg data-[selected=true]:text-color-data-campaign-status-draft-selected-text data-[selected=false]:bg-color-data-campaign-status-draft-unselected-bg data-[selected=false]:text-color-data-campaign-status-draft-unselected-text data-[selected=false]:border data-[selected=false]:border-color-data-campaign-status-draft-unselected-border",
        pending: "data-[selected=true]:bg-color-data-campaign-status-pending-selected-bg data-[selected=true]:text-color-data-campaign-status-pending-selected-text data-[selected=false]:bg-color-data-campaign-status-pending-unselected-bg data-[selected=false]:text-color-data-campaign-status-pending-unselected-text data-[selected=false]:border data-[selected=false]:border-color-data-campaign-status-pending-unselected-border",
        approved: "data-[selected=true]:bg-color-data-campaign-status-approved-selected-bg data-[selected=true]:text-color-data-campaign-status-approved-selected-text data-[selected=false]:bg-color-data-campaign-status-approved-unselected-bg data-[selected=false]:text-color-data-campaign-status-approved-unselected-text data-[selected=false]:border data-[selected=false]:border-color-data-campaign-status-approved-unselected-border",
        scheduled: "data-[selected=true]:bg-color-data-campaign-status-scheduled-selected-bg data-[selected=true]:text-color-data-campaign-status-scheduled-selected-text data-[selected=false]:bg-color-data-campaign-status-scheduled-unselected-bg data-[selected=false]:text-color-data-campaign-status-scheduled-unselected-text data-[selected=false]:border data-[selected=false]:border-color-data-campaign-status-scheduled-unselected-border",
        active: "data-[selected=true]:bg-color-data-campaign-status-active-selected-bg data-[selected=true]:text-color-data-campaign-status-active-selected-text data-[selected=false]:bg-color-data-campaign-status-active-unselected-bg data-[selected=false]:text-color-data-campaign-status-active-unselected-text data-[selected=false]:border data-[selected=false]:border-color-data-campaign-status-active-unselected-border",
        ended: "data-[selected=true]:bg-color-data-campaign-status-ended-selected-bg data-[selected=true]:text-color-data-campaign-status-ended-selected-text data-[selected=false]:bg-color-data-campaign-status-ended-unselected-bg data-[selected=false]:text-color-data-campaign-status-ended-unselected-text data-[selected=false]:border data-[selected=false]:border-color-data-campaign-status-ended-unselected-border",
      },
    },
    defaultVariants: {
      status: "draft",
    },
  }
);

const CheckIcon = ({ status }: { status: CampaignStatus }) => {
  // Get the correct icon color based on status (when selected)
  const getIconColor = () => {
    switch (status) {
      case "draft":
        return "#007681";
      case "pending":
        return "#B14C02";
      case "approved":
        return "#FFFFFF";
      case "scheduled":
        return "#FFFFFF";
      case "active":
        return "#FFFFFF";
      case "ended":
        return "#545F6A";
      default:
        return "#007681";
    }
  };

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3482 6.35389C12.5642 6.13789 12.9242 6.13789 13.1402 6.35389C13.3562 6.55189 13.3742 6.87589 13.1942 7.09189L13.1402 7.1459L7.90218 12.4019C7.70418 12.5999 7.38018 12.6179 7.16418 12.4559L4.84218 10.1339C4.62618 9.9179 4.62618 9.55789 4.84218 9.34189C5.05818 9.14389 5.36418 9.12589 5.58018 9.28789L5.65218 9.34189L7.50618 11.1959L12.3482 6.35389Z"
        fill={getIconColor()}
      />
    </svg>
  );
};

export type CampaignStatus = "draft" | "pending" | "approved" | "scheduled" | "active" | "ended";

export interface StatusChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof statusChipVariants> {
  selected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  label?: string;
}

const StatusChip = React.forwardRef<HTMLButtonElement, StatusChipProps>(
  ({ 
    className, 
    status = "draft", 
    selected = false, 
    onSelectionChange,
    label,
    onClick,
    ...props 
  }, ref) => {
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onSelectionChange?.(!selected);
      onClick?.(event);
    };

    // Get the display label
    const getStatusLabel = () => {
      if (label) return label;
      
      switch (status) {
        case "draft":
          return "Draft";
        case "pending":
          return "Pending";
        case "approved":
          return "Approved";
        case "scheduled":
          return "Scheduled";
        case "active":
          return "Active";
        case "ended":
          return "Ended";
        default:
          return status;
      }
    };

    return (
      <button
        ref={ref}
        className={cn(statusChipVariants({ status, className }))}
        data-selected={selected}
        onClick={handleClick}
        type="button"
        style={{
          fontFamily: 'var(--font-nunito)',
        }}
        {...props}
      >
        {selected && <CheckIcon status={status} />}
        <span>{getStatusLabel()}</span>
      </button>
    );
  }
);

StatusChip.displayName = "StatusChip";

export { StatusChip, statusChipVariants };
