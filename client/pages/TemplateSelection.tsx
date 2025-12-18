import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Wifi, Signal, Battery, ArrowLeft } from "lucide-react";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { TextButton } from "@/components/ui/text-button";

interface TemplateSelectionProps {
  campaignType: "loyalty-card" | "instant-reward" | "triggered-reward";
  onBack: () => void;
  onNext: (templateId: string) => void;
}

interface Template {
  id: string;
  name: string;
  // placeholder for future template preview image
  previewImage?: string;
}

export default function TemplateSelection({ campaignType, onBack, onNext }: TemplateSelectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Placeholder templates - these will be replaced with real template data
  const templates: Template[] = [
    {
      id: "template-1",
      name: CONTENT_TOKENS.TEMPLATE_SELECTION.TEMPLATE_PLACEHOLDER.TEMPLATE_1,
    },
    {
      id: "template-2", 
      name: CONTENT_TOKENS.TEMPLATE_SELECTION.TEMPLATE_PLACEHOLDER.TEMPLATE_2,
    },
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleNext = () => {
    if (selectedTemplate) {
      onNext(selectedTemplate);
    }
  };

  const handleSave = () => {
    console.log("Save draft...");
    // Save current state
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

      {/* Progress Stepper */}
      <div className="flex px-4 py-2">
        <div className="flex items-center gap-2 w-full">
          {/* Step 1 - Choose (Active) */}
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center justify-center w-6 h-6 bg-[#2F70EF] rounded-full">
              <span className="text-sm font-bold text-white">1</span>
            </div>
            <span className="text-sm font-bold text-[#1F272E]">
              {CONTENT_TOKENS.TEMPLATE_SELECTION.STEP_LABELS.CHOOSE}
            </span>
          </div>

          {/* Step 2 - Personalise (Inactive) */}
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center justify-center w-6 h-6 bg-[#A1ACBA] rounded-full">
              <span className="text-sm font-bold text-white">2</span>
            </div>
            <span className="text-sm font-bold text-[#6D7885]">
              {CONTENT_TOKENS.TEMPLATE_SELECTION.STEP_LABELS.PERSONALISE}
            </span>
          </div>

          {/* Step 3 - Review (Inactive) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-[#A1ACBA] rounded-full">
              <span className="text-sm font-bold text-white">3</span>
            </div>
            <span className="text-sm font-bold text-[#6D7885]">
              {CONTENT_TOKENS.TEMPLATE_SELECTION.STEP_LABELS.REVIEW}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 sm:px-8 md:px-12 lg:px-16 bg-white">
        {/* Internal Header with Back Button */}
        <div className="flex items-start gap-4 mb-6">
          <button 
            onClick={onBack}
            className="mt-2"
          >
            <ArrowLeft className="w-6 h-6 text-[#2F70EF]" />
          </button>
          
          <div className="flex-1">
            <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
              {CONTENT_TOKENS.TEMPLATE_SELECTION.TITLE}
            </h1>
          </div>
        </div>

        {/* Templates Content */}
        <div className="space-y-4 flex-1">
          {/* Subtitle */}
          <h2 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>
            {CONTENT_TOKENS.TEMPLATE_SELECTION.SUBTITLE}
          </h2>

          {/* Template Grid */}
          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`
                  relative h-[200px] rounded-xl p-6 border-2 transition-all duration-200
                  ${selectedTemplate === template.id 
                    ? 'border-[#004BB8] bg-[rgba(0,81,255,0.10)]' 
                    : 'border-[#CFD5E0] bg-white hover:border-[#A1ACBA]'
                  }
                `}
              >
                {/* Radio Button */}
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200">
                    {selectedTemplate === template.id ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#004BB8"/>
                        <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="#004BB8"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#6D7885"/>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Template Preview Area */}
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  {/* Placeholder Gift Icon - This will be replaced with actual template previews */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M45.3337 21.3333H18.667C17.1943 21.3333 16.0003 22.5273 16.0003 24V48C16.0003 49.4727 17.1943 50.6667 18.667 50.6667H45.3337C46.8064 50.6667 48.0003 49.4727 48.0003 48V24C48.0003 22.5273 46.8064 21.3333 45.3337 21.3333Z" fill="#4A90E2"/>
                      <path d="M32 13.3333C28.6863 13.3333 26 16.0196 26 19.3333V21.3333H38V19.3333C38 16.0196 35.3137 13.3333 32 13.3333Z" fill="#F39C12"/>
                      <rect x="30" y="28" width="4" height="16" fill="#E74C3C"/>
                      <rect x="28" y="34" width="8" height="4" fill="#E74C3C"/>
                    </svg>
                  </div>

                  {/* Template Name */}
                  <span className="text-base font-bold text-[#1F272E] text-center">
                    {template.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#CFD5E0] bg-white rounded-b-[28px] p-6">
        <div className="flex justify-between items-center">
          <TextButton
            onClick={handleSave}
            className="font-bold"
          >
            {CONTENT_TOKENS.COMMON.SAVE_BUTTON}
          </TextButton>
          
          <Button
            onClick={handleNext}
            disabled={!selectedTemplate}
            className={`
              flex-1 ml-3 h-12 font-bold text-base rounded-full
              ${selectedTemplate 
                ? 'bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white' 
                : 'bg-[#2F70EF] opacity-30 text-white cursor-not-allowed'
              }
            `}
          >
            {CONTENT_TOKENS.COMMON.NEXT_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
}
