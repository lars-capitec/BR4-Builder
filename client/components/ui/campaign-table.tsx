import * as React from "react";
import { cn } from "@/lib/utils";
import { StatusChip, type CampaignStatus } from "./status-chip";
import { CampaignListItem } from "./campaign-list-item";

// Information icon from Figma
const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6Z" fill="#08A6B5"/>
    <path d="M12 9.25C12.3797 9.25 12.6935 9.53215 12.7432 9.89823L12.75 10V17C12.75 17.4142 12.4142 17.75 12 17.75C11.6203 17.75 11.3065 17.4678 11.2568 17.1018L11.25 17V10C11.25 9.58579 11.5858 9.25 12 9.25Z" fill="#08A6B5"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0.25C5.51065 0.25 0.25 5.51065 0.25 12C0.25 18.4893 5.51065 23.75 12 23.75C18.4893 23.75 23.75 18.4893 23.75 12C23.75 5.51065 18.4893 0.25 12 0.25ZM12 1.75C17.6609 1.75 22.25 6.33908 22.25 12C22.25 17.6609 17.6609 22.25 12 22.25C6.33908 22.25 1.75 17.6609 1.75 12C1.75 6.33908 6.33908 1.75 12 1.75Z" fill="#08A6B5"/>
  </svg>
);

export interface Campaign {
  id: string;
  label: string;
  subtitle: string;
  status: CampaignStatus;
  percentage?: number;
  availableRewards?: number;
  variant: "active" | "inactive";
}

export interface CampaignTableProps extends React.HTMLAttributes<HTMLDivElement> {
  campaigns: Campaign[];
  title?: string;
  onCampaignClick?: (campaign: Campaign) => void;
  onSeeAllClick?: () => void;
  maxItems?: number;
  showFilters?: boolean;
}

const CampaignTable = React.forwardRef<HTMLDivElement, CampaignTableProps>(
  ({ 
    className,
    campaigns,
    title = "Your latest campaigns",
    onCampaignClick,
    onSeeAllClick,
    maxItems,
    showFilters = true,
    ...props 
  }, ref) => {
    const [selectedStatuses, setSelectedStatuses] = React.useState<CampaignStatus[]>([]);
    
    // Get unique statuses from campaigns for filter chips
    const availableStatuses = React.useMemo(() => {
      const statuses = Array.from(new Set(campaigns.map(c => c.status)));
      // Order them in a logical sequence
      const statusOrder: CampaignStatus[] = ['active', 'scheduled', 'approved', 'pending', 'draft', 'ended'];
      return statusOrder.filter(status => statuses.includes(status));
    }, [campaigns]);

    // Filter campaigns based on selected statuses
    const filteredCampaigns = React.useMemo(() => {
      if (selectedStatuses.length === 0) {
        return campaigns;
      }
      return campaigns.filter(campaign => selectedStatuses.includes(campaign.status));
    }, [campaigns, selectedStatuses]);

    // Limit campaigns if maxItems is specified
    const displayCampaigns = React.useMemo(() => {
      return maxItems ? filteredCampaigns.slice(0, maxItems) : filteredCampaigns;
    }, [filteredCampaigns, maxItems]);

    const handleStatusToggle = (status: CampaignStatus) => {
      setSelectedStatuses(prev => {
        if (prev.includes(status)) {
          return prev.filter(s => s !== status);
        } else {
          return [...prev, status];
        }
      });
    };

    const handleCampaignClick = (campaign: Campaign) => {
      onCampaignClick?.(campaign);
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-start gap-4 w-full max-w-md", className)}
        {...props}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-2 w-full">
          <h2 
            className="text-[#1F272E] font-bold leading-7"
            style={{
              fontFamily: 'var(--font-nunito)',
              fontSize: '20px',
              lineHeight: '28px',
            }}
          >
            {title}
          </h2>
          <InfoIcon />
        </div>

        {/* Table Container */}
        <div className="flex flex-col items-start gap-4 w-full">
          {/* Filters */}
          {showFilters && availableStatuses.length > 0 && (
            <div className="flex flex-col items-start w-full">
              <div className="flex items-start content-start gap-2 flex-wrap">
                {availableStatuses.map((status) => (
                  <StatusChip
                    key={status}
                    status={status}
                    selected={selectedStatuses.includes(status)}
                    onSelectionChange={() => handleStatusToggle(status)}
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Campaign List */}
          <div className="flex flex-col justify-center items-start w-full rounded-2xl border border-[#CFD5E0] overflow-hidden">
            {displayCampaigns.length === 0 ? (
              <div className="flex items-center justify-center w-full py-12 px-4">
                <p 
                  className="text-[#6B7280] text-center"
                  style={{
                    fontFamily: 'var(--font-nunito)',
                    fontSize: '14px',
                  }}
                >
                  No campaigns match the selected filters.
                </p>
              </div>
            ) : (
              displayCampaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="w-full transition-colors duration-200 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                  onClick={() => handleCampaignClick(campaign)}
                >
                  <CampaignListItem
                    variant={campaign.variant}
                    status={campaign.status}
                    label={campaign.label}
                    subtitle={campaign.subtitle}
                    percentage={campaign.percentage}
                    availableRewards={campaign.availableRewards}
                    showDivider={index < displayCampaigns.length - 1}
                    className="cursor-pointer"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* See All Button */}
        <button
          onClick={onSeeAllClick}
          className="flex h-12 flex-col justify-center items-center gap-2 w-full rounded-full transition-all duration-200 hover:bg-[rgba(47,112,239,0.08)] active:bg-[rgba(47,112,239,0.12)]"
        >
          <div className="flex py-2 px-5 justify-center items-center gap-2 flex-1 w-full">
            <span
              className="text-[#2F70EF] text-center font-bold tracking-[0.1px]"
              style={{
                fontFamily: 'var(--font-nunito)',
                fontSize: '16px',
                lineHeight: '20px',
              }}
            >
              See all campaigns
            </span>
          </div>
        </button>
      </div>
    );
  }
);

CampaignTable.displayName = "CampaignTable";

export { CampaignTable };
