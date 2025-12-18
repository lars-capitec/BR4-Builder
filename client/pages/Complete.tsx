import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Menu, Wifi, Signal, Battery } from "lucide-react";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function Complete() {
  const navigate = useNavigate();

  const handleExplorePlatform = () => {
    // Navigate to how this works screen
    console.log("Exploring platform");
    navigate("/how-this-works");
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

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 sm:px-8 md:px-12 lg:px-16 bg-white flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center flex-1 space-y-10">
          {/* Page Title */}
          <div className="text-center">
            <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
              {CONTENT_TOKENS.COMPLETION.TITLE}
            </h1>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center">
            <svg width="140" height="141" viewBox="0 0 140 141" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.15" d="M70 140.242C108.66 140.242 140 108.902 140 70.2424C140 31.5825 108.66 0.242432 70 0.242432C31.3401 0.242432 0 31.5825 0 70.2424C0 108.902 31.3401 140.242 70 140.242Z" fill="#49E33B"/>
              <path opacity="0.2" d="M70 125.242C100.376 125.242 125 100.618 125 70.2424C125 39.8668 100.376 15.2424 70 15.2424C39.6243 15.2424 15 39.8668 15 70.2424C15 100.618 39.6243 125.242 70 125.242Z" fill="#009243"/>
              <path d="M70 110.242C92.0914 110.242 110 92.3338 110 70.2424C110 48.151 92.0914 30.2424 70 30.2424C47.9086 30.2424 30 48.151 30 70.2424C30 92.3338 47.9086 110.242 70 110.242Z" fill="#009243"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M88.8103 56.5025C90.0103 57.6525 90.0403 59.5525 88.9003 60.7425L66.6703 83.9025C66.1003 84.4925 65.3203 84.8225 64.5103 84.8225C63.7003 84.8225 62.9103 84.4925 62.3503 83.9025L52.5703 73.7125C51.4203 72.5125 51.4603 70.6225 52.6603 69.4725C53.8603 68.3225 55.7503 68.3625 56.9003 69.5625L64.5203 77.5025L84.5903 56.5925C85.7403 55.3925 87.6403 55.3625 88.8303 56.5025H88.8103Z" fill="white"/>
            </svg>
          </div>

          {/* Welcome Message */}
          <div className="text-center space-y-1">
            <p className="text-lg font-bold text-[#4A535C] leading-8">
              {CONTENT_TOKENS.COMPLETION.WELCOME_TO}
            </p>
            <p className="text-lg font-bold text-[#4A535C] leading-8">
              {CONTENT_TOKENS.APP_NAME}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 sm:px-8 md:px-12 lg:px-16 border-t border-[#CFD5E0] bg-white rounded-t-[28px]">
        <PrimaryButton
          onClick={handleExplorePlatform}
          className="w-full"
        >
          {CONTENT_TOKENS.COMPLETION.EXPLORE_BUTTON}
        </PrimaryButton>
      </div>
    </div>
  );
}
