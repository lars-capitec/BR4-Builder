import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Menu, Wifi, Signal, Battery, ArrowLeft, ChevronDown, Clock, Mic, MapPin, X, Upload, Check } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";
import { TextInput } from "@/components/ui/text-input";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TonalButton } from "@/components/ui/tonal-button";
import { TextButton } from "@/components/ui/text-button";
import { database, fileToBase64 } from "@/lib/database";

export default function BusinessInfo() {
  const navigate = useNavigate();
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [formData, setFormData] = useState({
    shopName: "",
    industry: "",
    address: "",
    openTime: "7:00 AM",
    closeTime: "5:00 PM",
    busyTimes: false,
    peakHoursFrom: "",
    peakHoursTo: ""
  });

  const [busyDays, setBusyDays] = useState<string[]>([]);

  const [showBrandAssetsModal, setShowBrandAssetsModal] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [marketingImageFile, setMarketingImageFile] = useState<File | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const marketingImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initGoogleMaps = async () => {
      try {
        // Temporarily disabled Google Maps API due to billing requirements
        // To enable:
        // 1. Go to https://console.cloud.google.com/project/_/billing/enable
        // 2. Enable billing on your Google Cloud Project
        // 3. Uncomment the code below and add your API key to environment variables

        console.log("🗺️ Google Maps API temporarily disabled - using manual address input");

        /*
        console.log("🗺️ Initializing Google Maps with API key...");
        const loader = new Loader({
          apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || "", // Use environment variable
          version: "weekly",
          libraries: ["places"]
        });

        await loader.load();
        console.log("✅ Google Maps API loaded successfully!");

        if (addressInputRef.current) {
          const autocompleteInstance = new google.maps.places.Autocomplete(addressInputRef.current, {
            types: ["establishment", "geocode"],
            componentRestrictions: { country: "za" } // Restrict to South Africa
          });

          autocompleteInstance.addListener("place_changed", () => {
            const place = autocompleteInstance.getPlace();
            console.log("📍 Place selected:", place);
            if (place.formatted_address) {
              setFormData(prev => ({ ...prev, address: place.formatted_address! }));
              console.log("✅ Address updated:", place.formatted_address);
            }
          });

          setAutocomplete(autocompleteInstance);
          console.log("🎯 Google Places Autocomplete initialized successfully!");
        }
        */
      } catch (error) {
        console.error("❌ Error loading Google Maps:", error);
      }
    };

    initGoogleMaps();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert files to base64 for storage
      const logoBase64 = logoFile ? await fileToBase64(logoFile) : null;
      const marketingImageBase64 = marketingImageFile ? await fileToBase64(marketingImageFile) : null;

      const businessData = {
        ...formData,
        busyDays,
        logoFile: logoBase64,
        marketingImageFile: marketingImageBase64
      };

      // Save to database
      const savedBusiness = await database.saveBusinessInfo(businessData);
      console.log("Business data saved:", savedBusiness);

      // Store business ID in sessionStorage for use in other parts of the app
      sessionStorage.setItem('currentBusinessId', savedBusiness.id);

      // Navigate to terms and conditions page
      navigate("/terms");
    } catch (error) {
      console.error("Failed to save business data:", error);
      // Still navigate on error for now
      navigate("/terms");
    }
  };

  const toggleBusyDay = (day: string) => {
    setBusyDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const isFormValid = formData.shopName.trim() !== "" &&
                     formData.industry !== "" &&
                     formData.address.trim() !== "";

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleMarketingImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMarketingImageFile(file);
    }
  };

  const openLogoFilePicker = () => {
    logoFileInputRef.current?.click();
  };

  const openMarketingImageFilePicker = () => {
    marketingImageInputRef.current?.click();
  };

  const handleSaveBrandAssets = () => {
    console.log("Logo file:", logoFile);
    console.log("Marketing image file:", marketingImageFile);
    // Show success screen instead of closing modal
    setShowSuccessScreen(true);
  };

  const handleSuccessOK = () => {
    setShowSuccessScreen(false);
    setShowBrandAssetsModal(false);
    // Reset file state if needed
    setLogoFile(null);
    setMarketingImageFile(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleMarketingImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setMarketingImageFile(file);
    }
  };

  const industries = [
    "Retail",
    "Restaurant",
    "Grocery Store",
    "Beauty Salon",
    "Auto Services",
    "Healthcare",
    "Fashion",
    "Electronics",
    "Other"
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Page Header */}
          <div className="flex items-start gap-4">
            <TextButton
              type="button"
              onClick={() => navigate("/welcome")}
              icon={<ArrowLeft className="w-6 h-6" />}
              className="w-6 h-6 mt-2 p-0"
            />
            
            <div className="flex-1 space-y-2">
              <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
                {CONTENT_TOKENS.BUSINESS_INFO.TITLE}
              </h1>
              <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
                {CONTENT_TOKENS.BUSINESS_INFO.SUBTITLE}
              </p>
            </div>
          </div>

          {/* Business Details Section */}
          <div className="space-y-4">
            <h2 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>
              Business details
            </h2>
            
            {/* Shop Name */}
            <TextInput
              label="Shop name"
              placeholder="Enter the name your clients are familiar with"
              value={formData.shopName}
              onChange={(e) => setFormData({...formData, shopName: e.target.value})}
              required
            />

            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-bold text-[#4A535C]">
                Industry *
              </Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                <SelectTrigger className="h-12 rounded-xl border-[#A1ACBA] text-[#7A8592]">
                  <SelectValue placeholder="Choose your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <h2 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>
              Where do you do business?
            </h2>
            
            {/* Shop Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-bold text-[#4A535C]">
                Shop address *
              </Label>
              <div className="relative">
                <div className="flex items-center h-12 pl-3 pr-4 border border-[#A1ACBA] rounded-3xl bg-white">
                  <div className="flex items-center justify-center w-6 h-6 mr-3">
                    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_2068_512623)">
                        <path d="M5.27344 17.7786C5.96229 18.6632 6.58928 19.5949 7.14987 20.5672C7.62847 21.4815 7.82799 22.1015 8.17775 23.2032C8.39226 23.8119 8.58613 23.9936 9.00294 23.9936C9.45714 23.9936 9.66321 23.6845 9.82242 23.2066C10.153 22.1661 10.4125 21.3721 10.8217 20.6218C11.6249 19.1733 12.6228 17.8862 13.6034 16.6491C13.8688 16.299 15.5852 14.2592 16.3578 12.6498C16.3578 12.6498 17.3075 10.8818 17.3075 8.4127C17.3075 6.10307 16.371 4.50122 16.371 4.50122L13.6745 5.22881L12.037 9.57438L11.6319 10.1736L11.5509 10.2821L11.4431 10.418L11.254 10.6351L10.9837 10.9073L9.52555 12.1043L5.8799 14.2252L5.27344 17.7786Z" fill="#34A853"/>
                        <path d="M1.51074 12.3527C2.40051 14.4004 4.11631 16.2005 5.27718 17.7802L11.4431 10.421C11.4431 10.421 10.5744 11.5657 8.9987 11.5657C7.2435 11.5657 5.82555 10.1535 5.82555 8.37276C5.82555 7.15163 6.55468 6.31274 6.55468 6.31274L2.3691 7.44277L1.51074 12.3527Z" fill="#FBBC04"/>
                        <path d="M11.5126 0.378418C13.5604 1.04368 15.3132 2.44033 16.3734 4.49981L11.4456 10.4166C11.4456 10.4166 12.1747 9.56257 12.1747 8.34903C12.1747 6.52687 10.6519 5.1656 9.00676 5.1656C7.45108 5.1656 6.55762 6.30838 6.55762 6.30838V2.58086L11.5126 0.378418Z" fill="#4285F4"/>
                        <path d="M2.64062 2.99281C3.86374 1.51834 6.01595 0 8.98309 0C10.4227 0 11.5072 0.380796 11.5072 0.380796L6.5527 6.31167H3.04238L2.64062 2.99281Z" fill="#1A73E8"/>
                        <path d="M1.51095 12.3525C1.51095 12.3525 0.692383 10.7374 0.692383 8.39752C0.692383 6.18605 1.54561 4.25297 2.64047 2.99268L6.55534 6.31207L1.51095 12.3525Z" fill="#EA4335"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_2068_512623">
                          <rect width="16.6154" height="24" fill="white" transform="translate(0.692383)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <Input
                    ref={addressInputRef}
                    id="address"
                    placeholder="Enter your business address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="flex-1 border-none h-auto text-xl font-normal text-[#707579] bg-transparent focus:ring-0 focus:border-none p-0"
                  />
                  <button type="button" className="flex items-center justify-center w-[52px] h-8 rounded-full">
                    <Mic className="w-6 h-6 text-[#3B4042]" />
                  </button>
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden ml-2">
                    <img 
                      src="https://cdn.builder.io/api/v1/image/assets%2F7270b073b50647a6beba073c73938d93%2F3c539f1317244c80aa000cb4ffbd6f25?format=webp&width=800"
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-2">
            <p className={cn(typography({ variant: "body-regular" }), "text-[#1F272E]")}>
              Operating hours
            </p>
            <div className="flex items-center gap-3">
              {/* Open Time */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="openTime" className="text-sm font-bold text-[#4A535C]">
                  Open
                </Label>
                <div className="relative">
                  <Input
                    id="openTime"
                    value={formData.openTime}
                    onChange={(e) => setFormData({...formData, openTime: e.target.value})}
                    className="h-12 rounded-xl border-[#A1ACBA] pr-12 font-normal text-[#1F272E]"
                  />
                  <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#2F70EF]" />
                </div>
              </div>

              {/* Close Time */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="closeTime" className="text-sm font-bold text-[#4A535C]">
                  Close
                </Label>
                <div className="relative">
                  <Input
                    id="closeTime"
                    value={formData.closeTime}
                    onChange={(e) => setFormData({...formData, closeTime: e.target.value})}
                    className="h-12 rounded-xl border-[#A1ACBA] pr-12 font-normal text-[#1F272E]"
                  />
                  <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#2F70EF]" />
                </div>
              </div>
            </div>
          </div>

          {/* Busy Times */}
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-3">
              <Checkbox
                id="busyTimes"
                checked={formData.busyTimes}
                onCheckedChange={(checked) => setFormData({...formData, busyTimes: checked as boolean})}
                className="w-[18px] h-[18px] border-2 border-[#6D7885] rounded-sm mt-1"
              />
              <div className="flex-1 space-y-1">
                <Label htmlFor="busyTimes" className="text-base font-bold text-[#1F272E] leading-6">
                  Busy times (optional)
                </Label>
                <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
                  This can help you decide when to run your campaign
                </p>
              </div>
            </div>

            {/* Expanding Busy Times Section */}
            {formData.busyTimes && (
              <div className="space-y-4 pl-10 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#1F272E]">When is your shop busiest?</h3>

                  {/* Peak Hours */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-[#4A535C]">Peak hours</Label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-[#4A535C]">From</Label>
                        <div className="relative">
                          <Input
                            placeholder="11:00 AM"
                            value={formData.peakHoursFrom}
                            onChange={(e) => setFormData({...formData, peakHoursFrom: e.target.value})}
                            className="h-10 rounded-lg border-[#A1ACBA] text-sm"
                          />
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2F70EF]" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-[#4A535C]">To</Label>
                        <div className="relative">
                          <Input
                            placeholder="2:00 PM"
                            value={formData.peakHoursTo}
                            onChange={(e) => setFormData({...formData, peakHoursTo: e.target.value})}
                            className="h-10 rounded-lg border-[#A1ACBA] text-sm"
                          />
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2F70EF]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Busy Days */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-[#4A535C]">Busiest days</Label>
                    <div className="flex w-full gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                        const isSelected = busyDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleBusyDay(day)}
                            className={`flex-1 h-8 text-sm font-medium rounded-lg border transition-colors flex items-center justify-center gap-1 ${
                              isSelected
                                ? 'border-[#2F70EF] bg-[#2F70EF] text-white'
                                : 'border-[#A1ACBA] bg-white hover:bg-[#F0F3FA] text-[#1F272E]'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logo Upload */}
          <div className="space-y-4">
            <p className={cn(typography({ variant: "body-regular" }), "text-[#1F272E]")}>
              Upload your logo (you can do this later)
            </p>
            <TonalButton
              type="button"
              onClick={() => setShowBrandAssetsModal(true)}
              className="w-full"
            >
              Upload your logo
            </TonalButton>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="p-6 sm:px-8 md:px-12 lg:px-16 border-t border-[#CFD5E0] bg-white rounded-t-[28px]">
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full"
        >
          Next
        </PrimaryButton>
      </div>

      {/* Brand Assets Upload Modal */}
      <Dialog open={showBrandAssetsModal} onOpenChange={setShowBrandAssetsModal}>
        <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto p-0 bg-white">
          <DialogTitle className="sr-only">
            {showSuccessScreen ? "Brand Assets Upload Success" : "Upload Brand Assets"}
          </DialogTitle>
          <div className="flex flex-col min-h-[600px]">
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

            {/* Modal Content - Success Screen or Upload Form */}
            {showSuccessScreen ? (
              // Success Screen
              <div className="flex-1 px-6 py-4 flex flex-col justify-center items-center space-y-10">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Outer circle - lightest green */}
                    <div className="w-[140px] h-[140px] rounded-full bg-[#49E33B] opacity-15 flex items-center justify-center">
                      {/* Middle circle - medium green */}
                      <div className="w-[110px] h-[110px] rounded-full bg-[#009243] opacity-20 flex items-center justify-center">
                        {/* Inner circle - solid green with checkmark */}
                        <div className="w-20 h-20 rounded-full bg-[#009243] flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.81 6.26C22.01 7.41 22.04 9.31 20.9 10.5L10.67 21.66C10.1 22.25 9.32 22.58 8.51 22.58C7.7 22.58 6.91 22.25 6.35 21.66L2.57 17.47C1.42 16.27 1.46 14.38 2.66 13.23C3.86 12.08 5.75 12.12 6.9 13.32L8.52 15.26L16.59 6.35C17.74 5.15 19.64 5.12 20.83 6.26H20.81Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center space-y-4">
                  <h2 className="text-lg font-bold text-[#4A535C] leading-8">
                    Brand assets successfully uploaded!
                  </h2>
                </div>

                {/* Explanation Section */}
                <div className="space-y-4 text-center">
                  <h3 className="text-lg font-bold text-[#4A535C] leading-6">
                    What are these used for?
                  </h3>
                  <div className="space-y-2 text-base text-[#4A535C] leading-7">
                    <p>• Your logo will be displayed on your reward campaigns</p>
                    <p>• Your marketing image will be used in your reward campaigns</p>
                  </div>
                </div>
              </div>
            ) : (
              // Upload Form
              <div className="flex-1 px-6 py-4 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-[32px] font-bold text-[#1F272E] leading-10 mb-1">
                      Upload brand assets
                    </h1>
                    <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
                      Upload your logo and a marketing image i.e. a nice photo of your shop or products to entice customers.
                    </p>
                  </div>
                  <TextButton
                    onClick={() => setShowBrandAssetsModal(false)}
                    icon={<X className="w-8 h-8 text-[#009DE0]" />}
                    className="p-1 ml-2 h-auto"
                  />
                </div>

              {/* Logo Upload Section */}
              <div className="space-y-4">
                <Label className="text-sm font-bold text-[#4A535C]">Logo</Label>

                <div
                  className="flex flex-col items-center justify-center h-[230px] p-7 border-2 border-dashed border-[#CFD5E0] rounded-xl bg-[#F8FAFD] cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleLogoDrop}
                  onClick={openLogoFilePicker}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="w-6 h-6 text-[#1F272E]" />
                    <p className="text-lg font-bold text-[#1F272E]">
                      {logoFile ? logoFile.name : "Upload your logo"}
                    </p>
                    <p className="text-xs text-[#6D7885] leading-4">
                      SVG, JPG, PNG and GIF file formats are allowed. Maximum size: 5GB.
                    </p>
                  </div>
                  <TonalButton
                    type="button"
                    size="small"
                    className="mt-5"
                  >
                    Add logo
                  </TonalButton>
                </div>

                <div className="text-base text-[#4A535C] leading-7">
                  <p>• Square logo on white background or transparent PNG</p>
                  <p>• Minimum size 576x576px</p>
                  <p>• Maximum file size 2MB</p>
                </div>
              </div>

              {/* Marketing Image Upload Section */}
              <div className="space-y-4">
                <Label className="text-sm font-bold text-[#4A535C]">Marketing image</Label>

                <div
                  className="flex flex-col items-center justify-center h-[230px] p-7 border-2 border-dashed border-[#CFD5E0] rounded-xl bg-[#F8FAFD] cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleMarketingImageDrop}
                  onClick={openMarketingImageFilePicker}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="w-6 h-6 text-[#1F272E]" />
                    <p className="text-lg font-bold text-[#1F272E]">
                      {marketingImageFile ? marketingImageFile.name : "Upload a marketing image"}
                    </p>
                    <p className="text-xs text-[#6D7885] leading-4">
                      SVG, JPG, PNG and GIF file formats are allowed. Maximum size: 5GB.
                    </p>
                  </div>
                  <TonalButton
                    type="button"
                    size="small"
                    className="mt-5"
                  >
                    Add image
                  </TonalButton>
                </div>

                <div className="text-base text-[#4A535C] leading-7">
                  <p>• Use a plain image with no logos or CTAs</p>
                  <p>• Image size 1440x812px recommended</p>
                  <p>• Maximum file size 2MB</p>
                </div>
              </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-6 bg-white">
              <PrimaryButton
                onClick={showSuccessScreen ? handleSuccessOK : handleSaveBrandAssets}
                className="w-full"
              >
                {showSuccessScreen ? "OK" : "Save brand assets"}
              </PrimaryButton>
            </div>
          </div>

          {/* Hidden File Inputs */}
          <input
            ref={logoFileInputRef}
            type="file"
            accept=".svg,.jpg,.jpeg,.png,.gif"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <input
            ref={marketingImageInputRef}
            type="file"
            accept=".svg,.jpg,.jpeg,.png,.gif"
            onChange={handleMarketingImageUpload}
            className="hidden"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
