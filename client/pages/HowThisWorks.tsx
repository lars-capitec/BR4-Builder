import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TextButton } from "@/components/ui/text-button";
import { Menu, Wifi, Signal, Battery } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function HowThisWorks() {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const loopCountRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Static video preview image from figma design
  const staticVideoImage = "https://api.builder.io/api/v1/image/assets/TEMP/68edec7f4f8eaebb41c52933a459fba6b74d523d?width=728";

  const carouselData = [
    {
      id: 1,
      title: CONTENT_TOKENS.HOW_THIS_WORKS.STEP_1_TITLE,
      description: CONTENT_TOKENS.HOW_THIS_WORKS.STEP_1_DESCRIPTION
    },
    {
      id: 2,
      title: CONTENT_TOKENS.HOW_THIS_WORKS.STEP_2_TITLE,
      description: CONTENT_TOKENS.HOW_THIS_WORKS.STEP_2_DESCRIPTION
    },
    {
      id: 3,
      title: CONTENT_TOKENS.HOW_THIS_WORKS.STEP_3_TITLE,
      description: CONTENT_TOKENS.HOW_THIS_WORKS.STEP_3_DESCRIPTION
    }
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(currentIndex);

    // Track loop completion
    if (currentIndex === 0 && selectedIndex === carouselData.length - 1) {
      loopCountRef.current += 1;
      // Stop auto-scrolling after 2 complete loops
      if (loopCountRef.current >= 2) {
        setAutoScrollEnabled(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }
  }, [emblaApi, selectedIndex, carouselData.length]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!emblaApi || !autoScrollEnabled) return;

    intervalRef.current = setInterval(() => {
      if (autoScrollEnabled) {
        emblaApi.scrollNext();
      }
    }, 2000); // 2 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [emblaApi, autoScrollEnabled]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);

    // Stop auto-scroll when user interacts
    const handleUserInteraction = () => {
      setAutoScrollEnabled(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    emblaApi.on('pointerDown', handleUserInteraction);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', handleUserInteraction);
    };
  }, [emblaApi, onSelect]);

  const handleTryItOut = () => {
    // Navigate to choose objective page
    navigate("/choose-objective");
  };

  const handleExplore = () => {
    // Navigate to reward campaigns overview page
    navigate("/reward-campaigns");
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
      <div className="flex-1 px-6 py-4 sm:px-8 md:px-12 lg:px-16 bg-white flex flex-col">
        {/* Page Header */}
        <div className="space-y-2 mb-6">
          <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
            {CONTENT_TOKENS.HOW_THIS_WORKS.TITLE}
          </h1>
          <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
            {CONTENT_TOKENS.HOW_THIS_WORKS.SUBTITLE}
          </p>
        </div>

        {/* Static Video Preview */}
        <div className="relative w-full h-[205px] mb-6 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={staticVideoImage}
            alt="How this works video preview"
            className="w-full h-full object-cover"
            style={{ aspectRatio: '16/9' }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        {/* Scrolling Text Content */}
        <div className="flex-1 flex flex-col">
          <div className="h-[180px] mb-6">
            <div className="embla overflow-hidden h-full" ref={emblaRef}>
              <div className="embla__container flex h-full">
                {carouselData.map((item, index) => (
                  <div key={item.id} className="embla__slide flex-[0_0_100%] min-w-0">
                    <div className="flex flex-col items-center h-full justify-start">
                      {/* Content - Fixed Height Container */}
                      <div className="h-[96px] flex flex-col justify-start items-center text-center space-y-2 mb-6">
                        <h3 className="text-lg font-bold text-[#1F272E] leading-8">
                          {item.title}
                        </h3>
                        <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
                          {item.description}
                        </p>
                      </div>

                      {/* Progress Indicators */}
                      <div className="flex items-center gap-2">
                        {carouselData.map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`rounded-full transition-all duration-200 ${
                              dotIndex === selectedIndex
                                ? 'w-4 h-2 bg-[#004BB8]'
                                : 'w-2 h-2 bg-[rgba(0,83,255,0.16)]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Try It Out Button and Explore Button */}
          <div className="mt-auto space-y-4">
            <PrimaryButton
              onClick={handleTryItOut}
              className="w-full"
            >
              {CONTENT_TOKENS.HOW_THIS_WORKS.TRY_IT_BUTTON}
            </PrimaryButton>
            <div className="flex justify-center">
              <TextButton
                onClick={handleExplore}
                className="text-[#2F70EF] font-semibold"
              >
                Explore
              </TextButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
