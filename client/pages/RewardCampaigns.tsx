import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/ui/primary-button";
import { CampaignPerformanceCard } from "../components/ui/campaign-performance-card";
import { CampaignTable, type Campaign } from "../components/ui/campaign-table";
import { EngagementHeatmap, type EngagementData } from "../components/ui/engagement-heatmap";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";

// Icon for success notification
const CheckCircleIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#009243]"
  >
    <path 
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" 
      fill="currentColor"
    />
    <path 
      d="M13.5 7.5L8.5 12.5L6.5 10.5" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Close icon for dismissing notification
const CloseIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#4A535C] hover:text-[#1F272E] cursor-pointer"
  >
    <path 
      d="M15 5L5 15M5 5L15 15" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Interface for daily engagement data
interface DayEngagementData {
  id: string;
  label: string;
  engagementLevel: 'low' | 'medium' | 'high';
  transactionCount: number;
}

const RewardCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);
  const [dateRange, setDateRange] = useState("Last month");

  const handleCreateNewCampaign = () => {
    // Navigate to outcomes-based reward creation selection screen
    navigate("/choose-objective");
  };

  // Data sets for different date ranges
  const getEngagementDataByRange = (range: string): EngagementData[] => {
    switch (range) {
      case "Last week":
        // Recent week - stronger evening pattern
        return [
          { hour: 6, intensity: 0.1 },
          { hour: 8, intensity: 0.5 },
          { hour: 10, intensity: 0.4 },
          { hour: 12, intensity: 0.7 },
          { hour: 14, intensity: 0.3 },
          { hour: 16, intensity: 0.8 },
          { hour: 18, intensity: 1.0 }, // Very strong evening peak
        ];
      case "Last month":
        // Standard pattern with lunch and evening peaks
        return [
          { hour: 6, intensity: 0.2 },
          { hour: 8, intensity: 0.4 },
          { hour: 10, intensity: 0.6 },
          { hour: 12, intensity: 0.9 }, // Peak lunch hour
          { hour: 14, intensity: 0.5 },
          { hour: 16, intensity: 0.7 },
          { hour: 18, intensity: 0.8 }, // Peak evening hour
        ];
      case "Last 3 months":
        // More spread out pattern
        return [
          { hour: 6, intensity: 0.3 },
          { hour: 8, intensity: 0.6 },
          { hour: 10, intensity: 0.8 },
          { hour: 12, intensity: 0.7 },
          { hour: 14, intensity: 0.6 },
          { hour: 16, intensity: 0.5 },
          { hour: 18, intensity: 0.4 },
        ];
      case "Last 6 months":
        // Seasonal pattern - morning focus
        return [
          { hour: 6, intensity: 0.4 },
          { hour: 8, intensity: 0.9 }, // Strong morning peak
          { hour: 10, intensity: 1.0 }, // Peak morning hours
          { hour: 12, intensity: 0.6 },
          { hour: 14, intensity: 0.4 },
          { hour: 16, intensity: 0.3 },
          { hour: 18, intensity: 0.2 },
        ];
      default:
        return [
          { hour: 6, intensity: 0.2 },
          { hour: 8, intensity: 0.4 },
          { hour: 10, intensity: 0.6 },
          { hour: 12, intensity: 0.9 },
          { hour: 14, intensity: 0.5 },
          { hour: 16, intensity: 0.7 },
          { hour: 18, intensity: 0.8 },
        ];
    }
  };

  // Get current engagement data based on selected date range
  const engagementData = getEngagementDataByRange(dateRange);

  // Sample campaigns data
  const campaigns: Campaign[] = [
    {
      id: '1',
      label: 'This coffee is on us ❤️',
      subtitle: 'Instant reward | Ends: 7 Jul 2...',
      status: 'active',
      variant: 'active',
      percentage: 64,
    },
    {
      id: '2',
      label: 'Buy 5 cappuccinos and get 1 free',
      subtitle: 'Stamp card | Ends: 31 Dec 2...',
      status: 'active',
      variant: 'active',
      percentage: 64,
    },
    {
      id: '3',
      label: 'Operation Stardust',
      subtitle: 'Instant reward | Start date - end date',
      status: 'approved',
      variant: 'inactive',
      availableRewards: 500,
    },
    {
      id: '4',
      label: 'Campaign Evergreen',
      subtitle: 'Stamp card | Start date - end date',
      status: 'scheduled',
      variant: 'inactive',
      availableRewards: 500,
    },
    {
      id: '5',
      label: 'Mission Horizon',
      subtitle: 'Stamp card | Start date - end date',
      status: 'scheduled',
      variant: 'inactive',
      availableRewards: 500,
    },
  ];

  // Daily engagement data based on selected date range
  const getDailyEngagementByRange = (range: string): DayEngagementData[] => {
    switch (range) {
      case "Last week":
        // Recent week - weekend heavy
        return [
          { id: 'su', label: 'Su', engagementLevel: 'high', transactionCount: 245 },
          { id: 'mo', label: 'Mo', engagementLevel: 'medium', transactionCount: 178 },
          { id: 'tu', label: 'Tu', engagementLevel: 'medium', transactionCount: 156 },
          { id: 'we', label: 'We', engagementLevel: 'medium', transactionCount: 189 },
          { id: 'th', label: 'Th', engagementLevel: 'high', transactionCount: 203 },
          { id: 'fr', label: 'Fr', engagementLevel: 'high', transactionCount: 289 },
          { id: 'sa', label: 'Sa', engagementLevel: 'high', transactionCount: 312 }, // Peak weekend
        ];
      case "Last month":
        // Standard monthly pattern
        return [
          { id: 'su', label: 'Su', engagementLevel: 'medium', transactionCount: 156 },
          { id: 'mo', label: 'Mo', engagementLevel: 'high', transactionCount: 234 },
          { id: 'tu', label: 'Tu', engagementLevel: 'high', transactionCount: 198 },
          { id: 'we', label: 'We', engagementLevel: 'high', transactionCount: 267 },
          { id: 'th', label: 'Th', engagementLevel: 'medium', transactionCount: 189 },
          { id: 'fr', label: 'Fr', engagementLevel: 'high', transactionCount: 312 }, // Peak day
          { id: 'sa', label: 'Sa', engagementLevel: 'medium', transactionCount: 178 },
        ];
      case "Last 3 months":
        // Quarterly pattern - mid-week focus
        return [
          { id: 'su', label: 'Su', engagementLevel: 'low', transactionCount: 98 },
          { id: 'mo', label: 'Mo', engagementLevel: 'medium', transactionCount: 167 },
          { id: 'tu', label: 'Tu', engagementLevel: 'high', transactionCount: 245 },
          { id: 'we', label: 'We', engagementLevel: 'high', transactionCount: 289 }, // Peak mid-week
          { id: 'th', label: 'Th', engagementLevel: 'high', transactionCount: 256 },
          { id: 'fr', label: 'Fr', engagementLevel: 'medium', transactionCount: 134 },
          { id: 'sa', label: 'Sa', engagementLevel: 'low', transactionCount: 87 },
        ];
      case "Last 6 months":
        // Seasonal pattern - consistent weekdays
        return [
          { id: 'su', label: 'Su', engagementLevel: 'low', transactionCount: 67 },
          { id: 'mo', label: 'Mo', engagementLevel: 'high', transactionCount: 198 },
          { id: 'tu', label: 'Tu', engagementLevel: 'high', transactionCount: 203 },
          { id: 'we', label: 'We', engagementLevel: 'high', transactionCount: 189 },
          { id: 'th', label: 'Th', engagementLevel: 'high', transactionCount: 195 },
          { id: 'fr', label: 'Fr', engagementLevel: 'high', transactionCount: 207 },
          { id: 'sa', label: 'Sa', engagementLevel: 'medium', transactionCount: 123 },
        ];
      default:
        return [
          { id: 'su', label: 'Su', engagementLevel: 'medium', transactionCount: 156 },
          { id: 'mo', label: 'Mo', engagementLevel: 'high', transactionCount: 234 },
          { id: 'tu', label: 'Tu', engagementLevel: 'high', transactionCount: 198 },
          { id: 'we', label: 'We', engagementLevel: 'high', transactionCount: 267 },
          { id: 'th', label: 'Th', engagementLevel: 'medium', transactionCount: 189 },
          { id: 'fr', label: 'Fr', engagementLevel: 'high', transactionCount: 312 },
          { id: 'sa', label: 'Sa', engagementLevel: 'medium', transactionCount: 178 },
        ];
    }
  };

  // Get current daily engagement data based on selected date range
  const dailyEngagement = getDailyEngagementByRange(dateRange);

  // Get styling based on engagement level
  const getEngagementStyle = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return 'bg-purple-600 text-white'; // Dark purple for high engagement
      case 'medium':
        return 'bg-purple-300 text-purple-900'; // Medium purple for medium engagement
      case 'low':
      default:
        return 'bg-purple-100 text-purple-600'; // Light purple for low engagement
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Notification Banner */}
      {showNotification && (
        <div className="bg-[rgba(42,217,249,0.06)] border-b border-[rgba(42,217,249,0.12)] px-4 py-3">
          <div className="flex items-start gap-3 max-w-md mx-auto">
            <CheckCircleIcon />
            <div className="flex-1 text-sm">
              <div 
                className="font-bold text-[#1F272E] mb-1"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Congrats! A campaign has been approved
              </div>
              <button 
                className="text-[#2F70EF] font-semibold hover:underline"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Go to campaigns page
              </button>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="mt-0.5"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 
              className="text-2xl font-bold text-[#1F272E] mb-2"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Reward campaigns
            </h1>
            <p 
              className="text-[#4A535C] text-sm"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              See a snapshot of your campaigns and engagement
            </p>
          </div>
          <PrimaryButton size="small" onClick={handleCreateNewCampaign}>
            + New
          </PrimaryButton>
        </div>

        {/* Active Campaigns Section */}
        <div className="mb-8">
          <h2 
            className="text-lg font-bold text-[#1F272E] mb-4"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Active campaigns
          </h2>
          
          <div className="space-y-4">
            {/* Coffee Campaign Card */}
            <CampaignPerformanceCard
              variant="increase"
              title="This coffee is on us ❤️"
              value="57"
              label="redeemed"
              changePercent="+2.6%"
              compareText="than last month"
              animate={true}
            />

            {/* Cappuccino Campaign Card */}
            <CampaignPerformanceCard
              variant="decrease"
              title="Buy 5 cappuccinos and get 1 free"
              value="31"
              label="redeemed"
              changePercent="-0.5%"
              compareText="than last month"
              animate={true}
            />
          </div>
        </div>

        {/* Your Latest Campaigns */}
        <div className="mb-8">
          <CampaignTable
            title="Your latest campaigns"
            campaigns={campaigns}
            onCampaignClick={(campaign) => {
              console.log('Navigate to campaign:', campaign.id);
            }}
            onSeeAllClick={() => {
              console.log('Navigate to all campaigns');
            }}
            maxItems={5}
          />
        </div>

        {/* Engagement Section */}
        <div className="mb-8">
          <h2 
            className="text-lg font-bold text-[#1F272E] mb-6"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Engagement
          </h2>

          {/* Date Range Selector */}
          <div className="mb-6">
            <label 
              className="block text-sm font-semibold text-[#4A535C] mb-2"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Date range:
            </label>
            <div className="relative">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full h-12 px-4 bg-white border border-[#A1ACBA] rounded-xl text-[#1F272E] font-normal appearance-none cursor-pointer focus:border-[#2F70EF] focus:outline-none focus:ring-2 focus:ring-[#2F70EF] focus:ring-opacity-20"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                <option value="Last week">Last week</option>
                <option value="Last month">Last month</option>
                <option value="Last 3 months">Last 3 months</option>
                <option value="Last 6 months">Last 6 months</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="#4A535C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Busy Days - Data-driven engagement display */}
          <div className="mb-6">
            <h3
              className="text-sm font-semibold text-[#4A535C] mb-3"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Busy days
            </h3>
            <div className="flex w-full gap-2">
              {dailyEngagement.map((day) => (
                <div
                  key={day.id}
                  className={`flex-1 py-2 rounded-full text-sm font-semibold text-center ${
                    getEngagementStyle(day.engagementLevel)
                  }`}
                  style={{ fontFamily: 'var(--font-nunito)' }}
                  title={`${day.transactionCount} transactions`}
                >
                  {day.label}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6D7885] mt-2" style={{ fontFamily: 'var(--font-nunito)' }}>
              {dateRange.toLowerCase()} - darker colors indicate higher engagement
            </p>
          </div>

          {/* Busy Times - Engagement Heatmap */}
          <div>
            <h3 
              className="text-sm font-semibold text-[#4A535C] mb-3"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Busy times
            </h3>
            <EngagementHeatmap data={engagementData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCampaigns;
