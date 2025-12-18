import { useNavigate } from "react-router-dom";
import { Menu, Wifi, Signal, Battery, ArrowLeft, Plus } from "lucide-react";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TextButton } from "@/components/ui/text-button";

export default function ChooseObjective() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/how-this-works");
  };

  const handleLoyaltyCard = () => {
    navigate("/create-loyalty-card");
  };

  const handleInstantReward = () => {
    navigate("/create-instant-reward");
  };

  const handleTriggeredReward = () => {
    navigate("/create-triggered-reward");
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
          <TextButton
            onClick={handleGoBack}
            icon={<ArrowLeft className="w-6 h-6" />}
            className="mt-2 p-0 w-6 h-6"
          />
          
          <div className="flex-1">
            <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
              {CONTENT_TOKENS.CHOOSE_OBJECTIVE.TITLE}
            </h1>
          </div>
        </div>

        {/* Objective Cards */}
        <div className="space-y-6">
          {/* Keep customers coming back */}
          <div className="bg-[#E8EDFF] rounded-xl p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F272E] leading-8">
                {CONTENT_TOKENS.CHOOSE_OBJECTIVE.LOYALTY_CARD.TITLE}
              </h2>
              
              <div className="flex items-start gap-1">
                <div className="flex-1">
                  <p className={cn(typography({ variant: "body-regular" }), "text-[#1F272E]")}>
                    {CONTENT_TOKENS.CHOOSE_OBJECTIVE.LOYALTY_CARD.DESCRIPTION}
                  </p>
                </div>
                
                {/* Illustration Container */}
                <div className="w-[129px] h-[136px] flex items-center justify-center">
                  {/* Hand with loyalty cards illustration */}
                  <svg width="220" height="125" viewBox="0 0 221 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.5 68.8825C44.5 95.2785 65.8411 116.677 92.1667 116.677H128.833C155.159 116.677 176.5 95.2785 176.5 68.8825C176.5 42.4865 155.159 21.0884 128.833 21.0884H92.1667C65.8411 21.0884 44.5 42.4865 44.5 68.8825Z" fill="#437FFF" fillOpacity="0.15"/>
                    <path d="M194.746 36.311C194.746 24.4156 185.129 14.7725 173.265 14.7725H169.227C157.364 14.7725 147.746 24.4156 147.746 36.311V59.8261H173.265C185.129 59.8261 194.746 50.1829 194.746 38.2875V36.311Z" fill="#2259D0"/>
                    <path d="M165.713 36.412H162.465C162.022 36.412 161.668 36.7673 161.668 37.2113V39.6685C161.668 40.1125 162.022 40.4678 162.465 40.4678H165.713C166.156 40.4678 166.51 40.1125 166.51 39.6685V37.2113C166.51 36.7673 166.156 36.412 165.713 36.412Z" fill="white"/>
                    <path d="M169.67 36.412H172.917C173.36 36.412 173.714 36.7673 173.714 37.2113V39.6685C173.714 40.1125 173.36 40.4678 172.917 40.4678H169.67C169.227 40.4678 168.872 40.1125 168.872 39.6685V37.2113C168.872 36.7673 169.227 36.412 169.67 36.412Z" fill="white"/>
                    <path d="M180.15 36.412H176.903C176.46 36.412 176.105 36.7673 176.105 37.2113V39.6685C176.105 40.1125 176.46 40.4678 176.903 40.4678H180.15C180.593 40.4678 180.948 40.1125 180.948 39.6685V37.2113C180.948 36.7673 180.593 36.412 180.15 36.412Z" fill="white"/>
                    <path d="M162.465 42.9248H165.713C166.156 42.9248 166.51 43.2801 166.51 43.7241V46.1813C166.51 46.6254 166.156 46.9806 165.713 46.9806H162.465C162.022 46.9806 161.668 46.6254 161.668 46.1813V43.7241C161.668 43.2801 162.022 42.9248 162.465 42.9248Z" fill="white"/>
                    <path d="M172.917 42.9248H169.67C169.227 42.9248 168.872 43.2801 168.872 43.7241V46.1813C168.872 46.6254 169.227 46.9806 169.67 46.9806H172.917C173.36 46.9806 173.714 46.6254 173.714 46.1813V43.7241C173.714 43.2801 173.36 42.9248 172.917 42.9248Z" fill="white"/>
                    <path d="M176.903 42.9248H180.15C180.593 42.9248 180.948 43.2801 180.948 43.7241V46.1813C180.948 46.6254 180.593 46.9806 180.15 46.9806H176.903C176.46 46.9806 176.105 46.6254 176.105 46.1813V43.7241C176.105 43.2801 176.46 42.9248 176.903 42.9248Z" fill="white"/>
                    <path d="M64.4633 107.777C60.7736 105.129 57.4763 101.967 54.6758 98.3952C62.6105 85.4622 74.8593 75.6986 89.3128 70.8888L120.86 60.3906C122.671 65.7043 119.835 71.4828 114.53 73.2845L94.3587 80.1361L116.97 88.5477L123.323 92.6087L115.149 100.805H76.3945L64.4633 107.777Z" fill="#A8542F"/>
                    <ellipse cx="118.207" cy="63.0013" rx="19.3866" ry="19.4383" fill="white"/>
                    <ellipse cx="118.207" cy="63.0006" rx="15.5928" ry="15.6344" fill="#F0F3FA"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M112.147 70.6468C112.45 70.9654 112.888 71.1246 113.463 71.1246C114.038 71.1246 114.469 70.9654 114.757 70.6468C115.059 70.3283 115.21 69.8808 115.21 69.3045V64.7087H116.935C117.404 64.7087 117.797 64.7845 118.115 64.9361C118.448 65.0878 118.728 65.376 118.955 65.8007L121.133 69.8278C121.375 70.2677 121.647 70.5937 121.95 70.8061C122.267 71.0185 122.676 71.1246 123.175 71.1246C123.674 71.1246 124.052 71.0109 124.31 70.7833C124.567 70.5559 124.703 70.2601 124.718 69.896C124.733 69.5319 124.635 69.1604 124.423 68.7811L123.016 66.1648C122.668 65.5277 122.252 65.0575 121.768 64.7541C121.554 64.6088 121.323 64.4965 121.074 64.4175C121.413 64.3272 121.727 64.2119 122.018 64.0716C122.85 63.6772 123.485 63.116 123.924 62.388C124.363 61.6599 124.582 60.7954 124.582 59.7942C124.582 58.2471 124.098 57.0414 123.13 56.1767C122.161 55.3122 120.785 54.8799 119 54.8799H113.486C112.911 54.8799 112.465 55.0316 112.147 55.3349C111.845 55.6383 111.693 56.0857 111.693 56.6773V69.3045C111.693 69.8808 111.845 70.3283 112.147 70.6468ZM118.365 62.1604H115.21V57.6329H118.365C119.302 57.6329 120.006 57.8224 120.475 58.2017C120.959 58.5808 121.201 59.1421 121.201 59.8853C121.201 60.6437 120.959 61.2125 120.475 61.5916C120.006 61.9709 119.302 62.1604 118.365 62.1604Z" fill="#A6B6D1"/>
                  </svg>
                </div>
              </div>
              
              <PrimaryButton
                onClick={handleLoyaltyCard}
                icon={<Plus className="w-6 h-6" />}
                className="w-full"
              >
                {CONTENT_TOKENS.REWARD_TYPES.LOYALTY_CARD.BUILD_ACTION}
              </PrimaryButton>
            </div>
          </div>

          {/* Attract new customers */}
          <div className="bg-[#E8EDFF] rounded-xl p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F272E] leading-8">
                {CONTENT_TOKENS.CHOOSE_OBJECTIVE.INSTANT_REWARD.TITLE}
              </h2>
              
              <div className="flex items-start gap-1">
                <div className="flex-1">
                  <p className={cn(typography({ variant: "body-regular" }), "text-[#1F272E]")}>
                    {CONTENT_TOKENS.CHOOSE_OBJECTIVE.INSTANT_REWARD.DESCRIPTION}
                  </p>
                </div>
                
                {/* Illustration Container - Same as loyalty card for now */}
                <div className="w-[129px] h-[136px] flex items-center justify-center">
                  <svg width="220" height="125" viewBox="0 0 221 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.5 68.8825C44.5 95.2785 65.8411 116.677 92.1667 116.677H128.833C155.159 116.677 176.5 95.2785 176.5 68.8825C176.5 42.4865 155.159 21.0884 128.833 21.0884H92.1667C65.8411 21.0884 44.5 42.4865 44.5 68.8825Z" fill="#437FFF" fillOpacity="0.15"/>
                    <path d="M64.4633 107.777C60.7736 105.129 57.4763 101.967 54.6758 98.3952C62.6105 85.4622 74.8593 75.6986 89.3128 70.8888L120.86 60.3906C122.671 65.7043 119.835 71.4828 114.53 73.2845L94.3587 80.1361L116.97 88.5477L123.323 92.6087L115.149 100.805H76.3945L64.4633 107.777Z" fill="#A8542F"/>
                    <ellipse cx="118.207" cy="63.0013" rx="19.3866" ry="19.4383" fill="white"/>
                    <ellipse cx="118.207" cy="63.0006" rx="15.5928" ry="15.6344" fill="#F0F3FA"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M112.147 70.6468C112.45 70.9654 112.888 71.1246 113.463 71.1246C114.038 71.1246 114.469 70.9654 114.757 70.6468C115.059 70.3283 115.21 69.8808 115.21 69.3045V64.7087H116.935C117.404 64.7087 117.797 64.7845 118.115 64.9361C118.448 65.0878 118.728 65.376 118.955 65.8007L121.133 69.8278C121.375 70.2677 121.647 70.5937 121.95 70.8061C122.267 71.0185 122.676 71.1246 123.175 71.1246C123.674 71.1246 124.052 71.0109 124.31 70.7833C124.567 70.5559 124.703 70.2601 124.718 69.896C124.733 69.5319 124.635 69.1604 124.423 68.7811L123.016 66.1648C122.668 65.5277 122.252 65.0575 121.768 64.7541C121.554 64.6088 121.323 64.4965 121.074 64.4175C121.413 64.3272 121.727 64.2119 122.018 64.0716C122.85 63.6772 123.485 63.116 123.924 62.388C124.363 61.6599 124.582 60.7954 124.582 59.7942C124.582 58.2471 124.098 57.0414 123.13 56.1767C122.161 55.3122 120.785 54.8799 119 54.8799H113.486C112.911 54.8799 112.465 55.0316 112.147 55.3349C111.845 55.6383 111.693 56.0857 111.693 56.6773V69.3045C111.693 69.8808 111.845 70.3283 112.147 70.6468ZM118.365 62.1604H115.21V57.6329H118.365C119.302 57.6329 120.006 57.8224 120.475 58.2017C120.959 58.5808 121.201 59.1421 121.201 59.8853C121.201 60.6437 120.959 61.2125 120.475 61.5916C120.006 61.9709 119.302 62.1604 118.365 62.1604Z" fill="#A6B6D1"/>
                  </svg>
                </div>
              </div>
              
              <PrimaryButton
                onClick={handleInstantReward}
                icon={<Plus className="w-6 h-6" />}
                className="w-full"
              >
                {CONTENT_TOKENS.REWARD_TYPES.INSTANT_REWARD.BUILD_ACTION}
              </PrimaryButton>
            </div>
          </div>

          {/* Influence buying behaviour */}
          <div className="bg-[#E8EDFF] rounded-xl p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F272E] leading-8">
                {CONTENT_TOKENS.CHOOSE_OBJECTIVE.TRIGGERED_REWARD.TITLE}
              </h2>
              
              <div className="flex items-start gap-1">
                <div className="flex-1">
                  <p className={cn(typography({ variant: "body-regular" }), "text-[#1F272E]")}>
                    {CONTENT_TOKENS.CHOOSE_OBJECTIVE.TRIGGERED_REWARD.DESCRIPTION}
                  </p>
                </div>
                
                {/* Illustration Container - Placeholder */}
                <div className="w-[129px] h-[136px] flex items-center justify-center">
                  <div className="w-[220px] h-[125px] bg-[#F0F3FA] rounded-lg flex items-center justify-center">
                    <div className="text-center text-[#A6B6D1] text-sm">
                      <div className="w-12 h-12 bg-[#A6B6D1] rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-lg font-bold">?</span>
                      </div>
                      <p>Placeholder<br />Illustration</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <PrimaryButton
                onClick={handleTriggeredReward}
                icon={<Plus className="w-6 h-6" />}
                className="w-full"
              >
                {CONTENT_TOKENS.REWARD_TYPES.TRIGGERED_REWARD.BUILD_ACTION}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
