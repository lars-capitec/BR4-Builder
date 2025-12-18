import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Wifi, Signal, Battery, ArrowLeft } from "lucide-react";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { TextButton } from "@/components/ui/text-button";

export default function Terms() {
  const navigate = useNavigate();

  const handleAccept = () => {
    // Navigate to completion screen
    console.log("Terms accepted");
    navigate("/complete");
  };

  const termsContent = [
    "All information exchanged between us is subject to these confidentiality provisions",
    "Campaign details and dates to be approved by Capitec",
    "Capitec will publish information regarding campaigns to the relevant client base (\"consumers\"), if applicable",
    "Capitec does not guarantee uptake of offers or performance of duties by its clients",
    "You must ensure that there is sufficient inventory/ stock of the applicable reward for the campaign audience",
    "Capitec will not pay any costs relating to the campaign or rewards",
    "No personal information relating to consumers will be shared between us",
    "Both parties will comply with all applicable law",
    "Capitec may cancel your access to this service at any time, in its sole discretion",
    "Capitec shall not be liable for any damages you may suffer",
    "You remain liable for the fulfillment of your offers to consumers.",
    "You are responsible for dealing with consumer queries or complaints. These service description and service standards apply."
  ];

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

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 sm:px-8 md:px-12 lg:px-16 bg-white overflow-y-auto">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => navigate("/business-info")}
              className="flex items-center justify-center w-6 h-6 mt-2"
            >
              <ArrowLeft className="w-6 h-6 text-[#2F70EF]" />
            </button>
            
            <div className="flex-1 space-y-2">
              <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
                {CONTENT_TOKENS.TERMS.TITLE}
              </h1>
              <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
                {CONTENT_TOKENS.TERMS.SUBTITLE}
              </p>
            </div>
          </div>

          {/* Terms and Conditions Section */}
          <div className="space-y-6">
            <h2 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>
              {CONTENT_TOKENS.TERMS.HEADING}
            </h2>
            
            {/* Terms List */}
            <div className="space-y-6">
              <div className="text-base text-black leading-7 space-y-4">
                {termsContent.map((term, index) => (
                  <p key={index}>
                    {index + 1}. {term}
                  </p>
                ))}
              </div>
              
              {/* Links Section */}
              <div className="space-y-3">
                <TextButton
                  className="w-full font-bold"
                >
                  {CONTENT_TOKENS.TERMS.CONFIDENTIALITY_LINK}
                </TextButton>

                <TextButton
                  className="w-full font-bold"
                >
                  {CONTENT_TOKENS.TERMS.SERVICE_STANDARDS_LINK}
                </TextButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 sm:px-8 md:px-12 lg:px-16 border-t border-[#CFD5E0] bg-white rounded-t-[28px]">
        <Button
          onClick={handleAccept}
          className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold text-base rounded-full"
        >
          {CONTENT_TOKENS.TERMS.ACCEPT_BUTTON}
        </Button>
      </div>
    </div>
  );
}
