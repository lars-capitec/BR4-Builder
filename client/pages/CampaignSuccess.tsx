import * as React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/ui/primary-button";
import { TonalButton } from "../components/ui/tonal-button";
import { SuccessIcon } from "../components/ui/success-icon";
import { Menu, Wifi, Signal, Battery } from "lucide-react";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const CampaignSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateAnother = () => {
    // Navigate to choose objective to create another campaign
    navigate("/choose-objective");
  };

  const handleGoToDashboard = () => {
    // Navigate to campaigns overview page (dashboard)
    navigate("/reward-campaigns");
  };

  return (
    <div className="flex flex-col min-h-screen max-w-sm mx-auto bg-white font-sans">
      {/* Status Bar */}
      <div className="flex justify-between items-center h-10 px-4 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-sm font-normal text-[#1F272E]">9:30</span>
        </div>
        
        {/* Camera notch */}
        <div className="w-[124px] h-6 bg-[#2E2E2E] rounded-full"></div>
        
        <div className="flex items-center gap-1">
          <Wifi className="w-4 h-4 text-[#1F272E]" fill="currentColor" />
          <Signal className="w-4 h-4 text-[#1F272E]" fill="currentColor" />
          <Battery className="w-4 h-4 text-[#1F272E]" fill="currentColor" />
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center h-[60px] px-4 bg-white shadow-[0px_1px_2px_0px_rgba(0,51,160,0.15)]">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 text-[#1F272E]" />
          
          {/* Capitec Logo */}
          <div className="flex items-center gap-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M23.0168 8.41565H11.5996V13.2056C11.5996 14.9154 12.999 16.3039 14.7092 16.3039H20.6786C22.8165 16.3039 24.5654 18.0532 24.5654 20.1915V24.7179C28.7069 24.0334 31.878 20.6599 31.878 16.6306C31.878 12.1125 27.8903 8.41565 23.0168 8.41565" fill="#E61414"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M18.288 16.9746H12.3369C10.199 16.9746 8.45014 15.2519 8.45014 13.1148V8.49451C3.82814 8.75759 0.133789 12.3443 0.133789 16.6928C0.133789 21.2118 4.12156 24.9086 8.99542 24.9086H21.3972V20.0842C21.3972 18.374 19.9983 16.9746 18.288 16.9746" fill="#00486D"/>
            </svg>
            
            <div className="w-5 h-px bg-[#CFD5E0] rotate-90"></div>
            
            <span className="text-base font-bold text-[#1F272E]">
              {CONTENT_TOKENS.APP_NAME}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 bg-white flex flex-col">
        {/* Page Title */}
        <div className="text-center mb-4">
          <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
            {CONTENT_TOKENS.CAMPAIGN_SUCCESS.TITLE}
          </h1>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-center space-y-10">
          {/* Success Icon and Subtitle */}
          <div className="flex flex-col items-center gap-4">
            <SuccessIcon className="mx-auto" />
            <p
              className="text-lg font-bold text-[#4A535C] text-center leading-8"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              {CONTENT_TOKENS.CAMPAIGN_SUCCESS.SUBTITLE}
            </p>
          </div>

          {/* What's Next Section */}
          <div className="space-y-4">
            <h2 
              className="text-lg font-bold text-[#4A535C]"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              {CONTENT_TOKENS.CAMPAIGN_SUCCESS.WHATS_NEXT_TITLE}
            </h2>
            
            <div className="space-y-2">
              {CONTENT_TOKENS.CAMPAIGN_SUCCESS.NEXT_STEPS.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A535C] rounded-full mt-3 flex-shrink-0"></div>
                  <p 
                    className="text-base text-[#4A535C] leading-7"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-6 pt-4">
            <PrimaryButton 
              onClick={handleCreateAnother}
              className="w-full"
            >
              {CONTENT_TOKENS.CAMPAIGN_SUCCESS.CREATE_ANOTHER_BUTTON}
            </PrimaryButton>
            
            <TonalButton 
              onClick={handleGoToDashboard}
              className="w-full"
            >
              {CONTENT_TOKENS.CAMPAIGN_SUCCESS.DASHBOARD_BUTTON}
            </TonalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSuccess;
