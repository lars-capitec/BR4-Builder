import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Wifi, Signal, Battery, ArrowLeft } from "lucide-react";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function CreateInstantReward() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/choose-objective");
  };

  const handleChooseTemplate = () => {
    navigate("/instant-reward-templates");
  };

  return (
    <div className="flex flex-col min-h-screen max-w-sm mx-auto bg-white font-sans sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
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
      <div className="flex justify-between items-center h-[60px] px-4 sm:px-6 md:px-8 bg-white shadow-[0px_1px_2px_0px_rgba(0,51,160,0.15)]">
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

      {/* Content */}
      <div className="flex-1 px-6 py-4 sm:px-8 md:px-12 lg:px-16 bg-white">
        {/* Internal Header with Back Button */}
        <div className="flex items-start gap-4 mb-6">
          <button 
            onClick={handleGoBack}
            className="mt-2"
          >
            <ArrowLeft className="w-6 h-6 text-[#2F70EF]" />
          </button>
          
          <div className="flex-1">
            <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
              {CONTENT_TOKENS.REWARD_TYPES.INSTANT_REWARD.BUILD_ACTION}
            </h1>
          </div>
        </div>

        {/* Campaign Setup Content */}
        <div className="space-y-4">
          {/* Subtitle */}
          <h2 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>
            {CONTENT_TOKENS.CAMPAIGN_START.SUBTITLE}
          </h2>

          {/* Steps List */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#E8EDFF] rounded-full flex items-center justify-center mt-1">
                <span className="text-xs font-bold text-[#1655D1]">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#1F272E] leading-6">
                  {CONTENT_TOKENS.CAMPAIGN_START.STEPS.STEP_1.TITLE}
                </h3>
                <p className="text-sm text-[#4A535C] leading-5 mt-1">
                  {CONTENT_TOKENS.CAMPAIGN_START.STEPS.STEP_1.DESCRIPTION}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#E8EDFF] rounded-full flex items-center justify-center mt-1">
                <span className="text-xs font-bold text-[#1655D1]">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#1F272E] leading-6">
                  {CONTENT_TOKENS.CAMPAIGN_START.STEPS.STEP_2.TITLE}
                </h3>
                <p className="text-sm text-[#4A535C] leading-5 mt-1">
                  {CONTENT_TOKENS.CAMPAIGN_START.STEPS.STEP_2.DESCRIPTION}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-3">
              <div className="flex-shrink-0 w-5 h-5 bg-[#E8EDFF] rounded-full flex items-center justify-center mt-1">
                <span className="text-xs font-bold text-[#1655D1]">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#1F272E] leading-6">
                  {CONTENT_TOKENS.CAMPAIGN_START.STEPS.STEP_3.TITLE}
                </h3>
                <p className="text-sm text-[#4A535C] leading-5 mt-1">
                  {CONTENT_TOKENS.CAMPAIGN_START.STEPS.STEP_3.DESCRIPTION}
                </p>
              </div>
            </div>
          </div>

          {/* Ready to Start Section */}
          <div className="flex flex-col items-center text-center space-y-4 pt-8">
            <h3 className="text-2xl font-bold text-[#1F272E] leading-9">
              {CONTENT_TOKENS.CAMPAIGN_START.READY_TO_START}
            </h3>

            <Button
              onClick={handleChooseTemplate}
              className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold text-base rounded-full"
            >
              {CONTENT_TOKENS.CAMPAIGN_START.CHOOSE_TEMPLATE_BUTTON}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
