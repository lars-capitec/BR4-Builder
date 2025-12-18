import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/ui/primary-button";
import { TextButton } from "../components/ui/text-button";
import { Menu, Wifi, Signal, Battery, ArrowLeft, ChevronRight } from "lucide-react";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

// Stepper component for the review flow
const ReviewStepper = () => {
  const steps = [
    { number: 1, label: "Choose", status: "complete" },
    { number: 2, label: "Personalise", status: "complete" },
    { number: 3, label: "Review", status: "active" },
  ];

  return (
    <div className="flex items-center gap-2 w-full px-4 py-2">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            {/* Step indicator */}
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2F70EF] text-white text-sm font-bold">
              {step.status === "complete" ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M13.6464 2.97945C13.8417 2.78419 14.1583 2.78419 14.3536 2.97945C14.5311 3.15697 14.5472 3.43474 14.402 3.63048L14.3536 3.68656L5.68689 12.3532C5.50938 12.5307 5.2316 12.5469 5.03586 12.4016L4.97978 12.3532L1.64645 9.01989C1.45118 8.82463 1.45118 8.50805 1.64645 8.31279C1.82396 8.13528 2.10173 8.11914 2.29747 8.26438L2.35355 8.31279L5.33333 11.2923L13.6464 2.97945Z" 
                    fill="white"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            {/* Step label */}
            <span className="text-sm font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Campaign preview card component
const CampaignPreviewCard = () => {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden">
      {/* Header with blue background and logo */}
      <div className="relative">
        <div className="h-[90px] bg-[#2259D0]"></div>
        <div className="absolute bottom-[-31px] left-1/2 transform -translate-x-1/2">
          <div className="w-[90px] h-[90px] bg-[#6B7280] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">LOGO</span>
          </div>
        </div>
      </div>
      
      {/* Campaign details */}
      <div className="pt-8 pb-4">
        <div className="flex flex-col items-center gap-2 px-4">
          <h3 className="text-2xl font-bold text-[#1F272E] text-center" style={{ fontFamily: 'var(--font-nunito)' }}>
            Free coffee ☕️
          </h3>
          <p className="text-base text-[#1F272E] text-center" style={{ fontFamily: 'var(--font-nunito)' }}>
            A coffee on us!
          </p>
        </div>
        
        {/* Reward value section */}
        <div className="px-6 py-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
              Free coffee ☕️
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

// List item component for review sections
interface ReviewListItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  showDivider?: boolean;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({ icon, label, onClick, showDivider = true }) => {
  return (
    <div className="flex flex-col">
      <button 
        onClick={onClick}
        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
      >
        {/* Leading icon */}
        <div className="flex items-center justify-center w-6 h-6">
          {icon}
        </div>
        
        {/* Label */}
        <div className="flex-1">
          <span className="text-base font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
            {label}
          </span>
        </div>
        
        {/* Trailing chevron */}
        <ChevronRight className="w-6 h-6 text-[#4A535C]" />
      </button>
      
      {showDivider && (
        <div className="w-full h-px bg-[#CFD5E0]"></div>
      )}
    </div>
  );
};

// Document icon component (used for all list items)
const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M13 1.46484H2C1.58579 1.46484 1.25 1.80063 1.25 2.21484V22.2148C1.25 22.6291 1.58579 22.9648 2 22.9648H10.25C10.6642 22.9648 11 22.6291 11 22.2148C11 21.8006 10.6642 21.4648 10.25 21.4648H2.75V2.96484H12.25V8.21484C12.25 8.62906 12.5858 8.96484 13 8.96484H18C18.4142 8.96484 18.75 8.62906 18.75 8.21484C18.75 8.03939 18.6885 7.86949 18.5762 7.73471L13.5762 1.73471C13.4337 1.56371 13.2226 1.46484 13 1.46484ZM13.75 4.28638L16.3987 7.46484H13.75V4.28638Z" 
      fill="#009DE0"
    />
    <path 
      d="M10.25 11.9648H5C4.58579 11.9648 4.25 11.6291 4.25 11.2148C4.25 10.8006 4.58579 10.4648 5 10.4648H10.25C10.6642 10.4648 11 10.8006 11 11.2148C11 11.6291 10.6642 11.9648 10.25 11.9648Z" 
      fill="#009DE0"
    />
    <path 
      d="M8.25 15.9648H5C4.58579 15.9648 4.25 15.6291 4.25 15.2148C4.25 14.8006 4.58579 14.4648 5 14.4648H8.25C8.66421 14.4648 9 14.8006 9 15.2148C9 15.6291 8.66421 15.9648 8.25 15.9648Z" 
      fill="#009DE0"
    />
    <path 
      d="M14.0624 16.829C14.3574 16.5382 14.8357 16.5382 15.1307 16.829L15.8958 17.5832L18.2326 15.2797C18.5275 14.9889 19.0058 14.9889 19.3008 15.2797C19.5958 15.5705 19.5958 16.0419 19.3008 16.3327L16.4299 19.1627C16.1349 19.4535 15.6567 19.4535 15.3617 19.1627L14.0624 17.882C13.7675 17.5912 13.7675 17.1197 14.0624 16.829Z" 
      fill="#009DE0"
    />
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M22.75 16.9648C22.75 20.2786 20.0637 22.9648 16.75 22.9648C13.4363 22.9648 10.75 20.2786 10.75 16.9648C10.75 13.6511 13.4363 10.9648 16.75 10.9648C20.0637 10.9648 22.75 13.6511 22.75 16.9648ZM21.25 16.9648C21.25 19.4501 19.2353 21.4648 16.75 21.4648C14.2647 21.4648 12.25 19.4501 12.25 16.9648C12.25 14.4796 14.2647 12.4648 16.75 12.4648C19.2353 12.4648 21.25 14.4796 21.25 16.9648Z" 
      fill="#009DE0"
    />
  </svg>
);

const CampaignReview: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate back to personalization step
    navigate("/instant-reward-personalization");
  };

  const handleSave = () => {
    // Save as draft
    console.log("Saving campaign as draft");
  };

  const handleSubmit = () => {
    // Submit for review - navigate to success screen
    console.log("Submitting campaign for review");
    navigate("/campaign-success");
  };

  const handleSectionClick = (section: string) => {
    console.log(`Editing ${section} section`);
    // TODO: Navigate to specific edit screens
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

      {/* Stepper */}
      <ReviewStepper />

      {/* Main Content */}
      <div className="flex-1 bg-[#F0F3FA] px-0 py-4">
        {/* Internal Header */}
        <div className="flex items-start gap-4 px-6 mb-4">
          <button onClick={handleGoBack} className="mt-2">
            <ArrowLeft className="w-6 h-6 text-[#2F70EF]" />
          </button>
          <div className="flex-1">
            <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
              Review
            </h1>
          </div>
        </div>

        {/* Campaign Preview and Review Sections */}
        <div className="bg-white">
          <div className="px-4 py-4 bg-[#F0F3FA]">
            <CampaignPreviewCard />
          </div>
          
          {/* Review sections */}
          <div className="bg-white">
            <ReviewListItem
              icon={<DocumentIcon />}
              label="Terms and conditions"
              onClick={() => handleSectionClick('terms')}
            />
            <ReviewListItem
              icon={<DocumentIcon />}
              label="Voucher expiry"
              onClick={() => handleSectionClick('expiry')}
            />
            <ReviewListItem
              icon={<DocumentIcon />}
              label="How to redeem"
              onClick={() => handleSectionClick('redeem')}
            />
            <ReviewListItem
              icon={<DocumentIcon />}
              label="Campaign duration"
              onClick={() => handleSectionClick('duration')}
            />
            <ReviewListItem
              icon={<DocumentIcon />}
              label="Limits"
              onClick={() => handleSectionClick('limits')}
            />
            <ReviewListItem
              icon={<DocumentIcon />}
              label="Audience"
              onClick={() => handleSectionClick('audience')}
              showDivider={false}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white border-t border-[#CFD5E0] rounded-t-[28px]">
        <div className="flex items-center justify-between gap-3">
          <TextButton onClick={handleSave}>
            Save
          </TextButton>
          <div className="flex-1">
            <PrimaryButton onClick={handleSubmit} className="w-full">
              Submit
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignReview;
