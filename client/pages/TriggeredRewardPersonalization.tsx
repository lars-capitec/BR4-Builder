import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdaptiveHeight } from "@/hooks/use-adaptive-height";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TextButton } from "@/components/ui/text-button";
import {
  Menu,
  Wifi,
  Signal,
  Battery,
  ArrowLeft,
  Upload,
  Edit3,
  Check,
  ChevronUp,
  ChevronDown,
  X,
  Calendar as CalendarIcon,
  Clock,
  TriangleAlert
} from "lucide-react";
import StatusBar from "@/components/StatusBar";
import { CONTENT_TOKENS } from "@/lib/content-tokens";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

// Color palette for selection
const colorPalette = [
  { id: 'blue', color: '#2259D0', name: 'Blue' },
  { id: 'turquoise', color: '#1FB3CB', name: 'Turquoise' },
  { id: 'pink', color: '#DF1690', name: 'Pink' },
  { id: 'purple', color: '#773EEB', name: 'Purple' },
  { id: 'orange', color: '#FDBA34', name: 'Orange' }
];

export default function TriggeredRewardPersonalization() {
  const navigate = useNavigate();

  // Adaptive height hooks for different bottom sheets
  const rewardLimitsHeight = useAdaptiveHeight({ minHeight: '60vh', maxHeight: '90vh' });
  const audienceHeight = useAdaptiveHeight({ minHeight: '70vh', maxHeight: '90vh' });
  const campaignDurationHeight = useAdaptiveHeight({ minHeight: '65vh', maxHeight: '90vh' });
  const redeemHeight = useAdaptiveHeight({ minHeight: '70vh', maxHeight: '90vh' });
  const expiryHeight = useAdaptiveHeight({ minHeight: '65vh', maxHeight: '90vh' });
  const termsHeight = useAdaptiveHeight({ minHeight: '75vh', maxHeight: '90vh' });
  
  // Form state
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);
  const [rewardName, setRewardName] = useState("Name your reward");
  const [description, setDescription] = useState("Description of campaign");
  const [numberOfVisits, setNumberOfVisits] = useState(3);
  const [timePeriod, setTimePeriod] = useState("10");
  const [timePeriodUnit, setTimePeriodUnit] = useState("days");
  const [rewardType, setRewardType] = useState<'percentage' | 'amount' | 'product'>('percentage');
  const [percentageValue, setPercentageValue] = useState([40]);
  const [amountValue, setAmountValue] = useState("");
  const [productValue, setProductValue] = useState("");
  
  // Edit states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  
  // Logo upload state
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [showLogoSuccess, setShowLogoSuccess] = useState(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Business name for avatar fallback
  const [businessName] = useState("Test Business"); // This would come from context/props

  // Bottom sheet state
  const [showRewardLimitsSheet, setShowRewardLimitsSheet] = useState(false);
  const [showAudienceSelectionSheet, setShowAudienceSelectionSheet] = useState(false);
  const [showCampaignDurationSheet, setShowCampaignDurationSheet] = useState(false);
  const [showHowToRedeemSheet, setShowHowToRedeemSheet] = useState(false);
  const [showVoucherExpirySheet, setShowVoucherExpirySheet] = useState(false);
  const [showTermsConditionsSheet, setShowTermsConditionsSheet] = useState(false);

  // Reward limits state
  const [totalRewards, setTotalRewards] = useState([600]);
  const [perCustomerLimit, setPerCustomerLimit] = useState(1);

  // Campaign duration state
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 0, 6)); // 1/6/25
  const [endDate, setEndDate] = useState<Date>(new Date(2025, 11, 31)); // 31/12/25
  const [specificTimes, setSpecificTimes] = useState(true);
  const [startTime, setStartTime] = useState("7:00 AM");
  const [endTime, setEndTime] = useState("5:00 PM");

  // How to redeem state
  const [redemptionSteps, setRedemptionSteps] = useState(`Step 1:
Visit <business name>

Step 2:
Present your voucher to the staff and enter the 4-digit voucher code provided to you.

Step 3:
Either enjoy your <reward value captured above>`);
  const [voucherCode, setVoucherCode] = useState(['', '', '', '']);
  const voucherCodeRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  // Voucher expiry state
  const [expiryType, setExpiryType] = useState<'specific' | 'period' | 'never'>('specific');
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [expiryAmount, setExpiryAmount] = useState('');
  const [expiryUnit, setExpiryUnit] = useState('months');

  // Terms and conditions state
  const [termsAndConditions, setTermsAndConditions] = useState(`•	This voucher card expires on <insert date defined via expiry input>
•	Simply present this voucher to claim your <insert reward value captured above>
•	Offer may not be combined with any other sale, promotion, discount, code, credit, coupon, and/or offer
•	Promotions and/or offers have no cash value
•	Offer cannot be sold or otherwise bartered`);

  // Audience selection state
  const [selectedPersona, setSelectedPersona] = useState<string>('');
  const [ageRange, setAgeRange] = useState([CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_RANGE.DEFAULT_MIN, CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_RANGE.DEFAULT_MAX]);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'other' | 'all'>('all');

  // Calculate participation
  const calculateParticipation = () => {
    return Math.floor(totalRewards[0] / perCustomerLimit);
  };

  // Calculate audience size based on selected filters
  const calculateAudienceSize = () => {
    let baseSize = 0;

    if (selectedPersona) {
      const persona = CONTENT_TOKENS.AUDIENCE_SELECTION.SPENDING_PERSONAS.find(p => p.id === selectedPersona);
      baseSize = persona ? persona.count : 20; // Default to 'Everyone' if not found
    } else {
      baseSize = 20; // Default to 'Everyone'
    }

    // Apply age filter (assuming linear distribution)
    const ageRange_span = ageRange[1] - ageRange[0];
    const totalAgeRange = CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_RANGE.MAX - CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_RANGE.MIN;
    const ageMultiplier = ageRange_span / totalAgeRange;

    // Apply gender filter
    let genderMultiplier = 1;
    if (selectedGender === 'male' || selectedGender === 'female') {
      genderMultiplier = 0.5; // Assuming 50/50 split
    } else if (selectedGender === 'other') {
      genderMultiplier = 0.05; // Assuming 5% for other
    }

    const finalSize = baseSize * ageMultiplier * genderMultiplier;
    return Math.max(1, Math.round(finalSize * 10) / 10); // Round to 1 decimal, minimum 1k
  };

  // Calculate number of people icons (1-6 based on audience size)
  const getPeopleIconCount = () => {
    const audienceSize = calculateAudienceSize();
    if (audienceSize <= 2) return 1;
    if (audienceSize <= 5) return 2;
    if (audienceSize <= 8) return 3;
    if (audienceSize <= 12) return 4;
    if (audienceSize <= 16) return 5;
    return 6;
  };

  // Generate people icons with gradient colors
  const generatePeopleIcons = () => {
    const count = getPeopleIconCount();
    const icons = [];

    for (let i = 0; i < count; i++) {
      // Create gradient from light purple to dark purple
      const intensity = (i + 1) / count;
      const lightness = 80 - (intensity * 30); // From 80% to 50% lightness
      const color = `hsl(260, 70%, ${lightness}%)`;

      icons.push(
        <svg
          key={i}
          width="18"
          height="40"
          viewBox="0 0 18 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M9 8C11.2091 8 13 6.20914 13 4C13 1.79086 11.2091 0 9 0C6.79086 0 5 1.79086 5 4C5 6.20914 6.79086 8 9 8Z"
            fill={color}
          />
          <path
            d="M3 32V40H6V24H4C3.44772 24 3 24.4477 3 25V32Z"
            fill={color}
          />
          <path
            d="M15 32V40H12V24H14C14.5523 24 15 24.4477 15 25V32Z"
            fill={color}
          />
          <path
            d="M3 12C3 10.3431 4.34315 9 6 9H12C13.6569 9 15 10.3431 15 12V22C15 22.5523 14.5523 23 14 23H4C3.44772 23 3 22.5523 3 22V12Z"
            fill={color}
          />
        </svg>
      );
    }

    return icons;
  };

  // Get formatted reward value
  const getRewardValue = () => {
    switch (rewardType) {
      case 'percentage':
        return `${percentageValue[0]}% off`;
      case 'amount':
        return amountValue ? `R${amountValue} off` : '<reward value captured above>';
      case 'product':
        return productValue || '<reward value captured above>';
      default:
        return '<reward value captured above>';
    }
  };

  // Get business name or placeholder
  const getBusinessName = () => {
    return businessName && businessName !== "Test Business" ? businessName : '<business name>';
  };

  // Get processed redemption steps with dynamic content
  const getProcessedRedemptionSteps = () => {
    return redemptionSteps
      .replace(/<business name>/g, getBusinessName())
      .replace(/<reward value captured above>/g, getRewardValue());
  };

  // Get expiry date text
  const getExpiryDateText = () => {
    if (expiryType === 'specific' && expiryDate) {
      return expiryDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else if (expiryType === 'period' && expiryAmount && expiryUnit) {
      return `${expiryAmount} ${expiryUnit} after issuance`;
    } else if (expiryType === 'never') {
      return 'never expires';
    }
    return '<insert date defined via expiry input>';
  };

  // Get processed terms and conditions with dynamic content
  const getProcessedTermsAndConditions = () => {
    return termsAndConditions
      .replace(/<insert date defined via expiry input>/g, getExpiryDateText())
      .replace(/<insert reward value captured above>/g, getRewardValue());
  };

  const handleBack = () => {
    navigate("/triggered-reward-templates");
  };

  const handleSave = () => {
    // Save current state
    console.log("Saving triggered reward personalization data...");
  };

  const handleReview = () => {
    // Navigate to review screen
    navigate("/campaign-review");
  };

  // Logo upload functionality
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const openLogoFilePicker = () => {
    logoFileInputRef.current?.click();
  };

  const handleSaveLogo = () => {
    console.log("Logo file:", logoFile);
    setShowLogoSuccess(true);
  };

  const handleLogoSuccess = () => {
    setShowLogoSuccess(false);
    setShowLogoModal(false);
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

  // Edit handlers
  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingName(false);
  };

  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingDescription(false);
  };

  // Visit controls
  const handleIncreaseVisits = () => {
    if (numberOfVisits < 10) {
      setNumberOfVisits(numberOfVisits + 1);
    }
  };

  const handleDecreaseVisits = () => {
    if (numberOfVisits > 1) {
      setNumberOfVisits(numberOfVisits - 1);
    }
  };

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const characterLimit = 150; // About 2-3 lines

  return (
    <div className="flex flex-col min-h-screen max-w-sm mx-auto bg-white font-sans">
      <StatusBar />

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

      {/* Progress Stepper */}
      <div className="flex items-center gap-2 px-6 py-2">
        {/* Step 1 - Complete */}
        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center justify-center w-6 h-6 bg-[#2F70EF] rounded-full">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-[#1F272E]">Choose</span>
        </div>

        {/* Step 2 - Active */}
        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center justify-center w-6 h-6 bg-[#2F70EF] rounded-full">
            <span className="text-sm font-bold text-white">2</span>
          </div>
          <span className="text-sm font-bold text-[#1F272E]">Personalise</span>
        </div>

        {/* Step 3 - Inactive */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 bg-[#A1ACBA] rounded-full">
            <span className="text-sm font-bold text-white">3</span>
          </div>
          <span className="text-sm font-bold text-[#6D7885]">Review</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#F0F3FA] overflow-y-auto">
        {/* Page Header */}
        <div className="flex items-start gap-4 px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-6 h-6 mt-2"
          >
            <ArrowLeft className="w-6 h-6 text-[#2F70EF]" />
          </button>
          
          <div className="flex-1">
            <h1 className={cn(typography({ variant: "headline-large" }), "text-[#1F272E]")}>
              Personalise
            </h1>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="bg-white rounded-xl overflow-hidden">
            {/* Color Picker */}
            <div className="flex justify-center gap-2 py-4 px-4">
              {colorPalette.map((colorOption) => (
                <button
                  key={colorOption.id}
                  onClick={() => setSelectedColor(colorOption)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedColor.id === colorOption.id ? 'ring-2 ring-white ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: colorOption.color }}
                >
                  {selectedColor.id === colorOption.id && (
                    <Check className="w-6 h-6 text-white" />
                  )}
                </button>
              ))}
            </div>

            {/* Triggered Reward Preview */}
            <div className="px-4 pb-4">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                {/* Header with selected color */}
                <div 
                  className="h-20 relative flex items-center justify-center"
                  style={{ backgroundColor: selectedColor.color }}
                >
                  {/* Logo or Avatar */}
                  <div className="absolute -bottom-8">
                    {logoFile ? (
                      <div className="w-16 h-16 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
                        <img 
                          src={URL.createObjectURL(logoFile)} 
                          alt="Logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#D9D9D9] border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-[#6D7885]">
                          {getInitials(businessName)}
                        </span>
                      </div>
                    )}
                    {/* Edit icon */}
                    <button
                      onClick={() => setShowLogoModal(true)}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#2F70EF] rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Edit3 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-12 pb-6 px-6 space-y-4">
                  {/* Reward Name */}
                  <div className="text-center">
                    {isEditingName ? (
                      <form onSubmit={handleNameSubmit} className="flex items-center gap-3">
                        <Input
                          value={rewardName}
                          onChange={(e) => setRewardName(e.target.value)}
                          className="text-center text-xl font-bold border-none bg-[#F8FAFD] rounded-lg"
                          autoFocus
                          onBlur={() => setIsEditingName(false)}
                        />
                      </form>
                    ) : (
                      <button
                        onClick={handleNameClick}
                        className="flex items-center gap-3 mx-auto group"
                      >
                        <span className="text-xl font-bold text-[#1F272E]">{rewardName}</span>
                        <Edit3 className="w-5 h-5 text-[#2F70EF] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-center">
                    {isEditingDescription ? (
                      <form onSubmit={handleDescriptionSubmit} className="space-y-2">
                        <Textarea
                          value={description}
                          onChange={(e) => {
                            if (e.target.value.length <= characterLimit) {
                              setDescription(e.target.value);
                            }
                          }}
                          className="text-center text-base border-none bg-[#F8FAFD] rounded-lg resize-none min-h-[80px]"
                          autoFocus
                          onBlur={() => setIsEditingDescription(false)}
                        />
                        <div className="text-xs text-[#6D7885] text-right">
                          {description.length}/{characterLimit}
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={handleDescriptionClick}
                        className="flex items-center gap-3 mx-auto group"
                      >
                        <span className="text-base text-[#1F272E]">{description}</span>
                        <Edit3 className="w-4 h-4 text-[#2F70EF] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>

                  {/* Trigger Configuration */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-[#4A535C]">No. of visits</Label>
                        <div className="w-24 h-12 border border-[#A1ACBA] rounded-xl flex items-center justify-center">
                          <span className="text-base font-normal text-[#0F2132]">{numberOfVisits}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <button
                          onClick={handleIncreaseVisits}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronUp className="w-6 h-6 text-[#009DE0]" />
                        </button>
                        <button
                          onClick={handleDecreaseVisits}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronDown className="w-6 h-6 text-[#009DE0]" />
                        </button>
                      </div>
                    </div>

                    {/* Time Period */}
                    <div className="space-y-2 text-center">
                      <Label className="text-sm font-bold text-[#4A535C]">Within time period</Label>
                      <div className="flex items-center justify-center gap-2">
                        <Input
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(e.target.value)}
                          className="w-20 h-12 text-center text-base border-[#A1ACBA] rounded-xl"
                          placeholder="10"
                          type="number"
                          min="1"
                        />
                        <Select value={timePeriodUnit} onValueChange={setTimePeriodUnit}>
                          <SelectTrigger className="w-20 h-12 border-[#A1ACBA] rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="days">days</SelectItem>
                            <SelectItem value="weeks">weeks</SelectItem>
                            <SelectItem value="months">months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Reward Type Selector */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#1F272E] text-center">
                      What do you want to offer your customers?
                    </h3>

                    {/* Tab Selector */}
                    <div className="flex p-1 bg-[rgba(0,51,160,0.12)] rounded-xl">
                      <button
                        onClick={() => setRewardType('percentage')}
                        className={`flex-1 py-2 px-1 text-sm font-bold rounded-lg transition-colors ${
                          rewardType === 'percentage'
                            ? 'bg-white text-[#0033A0] shadow-sm'
                            : 'text-[#0033A0]'
                        }`}
                      >
                        %
                      </button>
                      <button
                        onClick={() => setRewardType('amount')}
                        className={`flex-1 py-2 px-1 text-sm font-bold rounded-lg transition-colors ${
                          rewardType === 'amount'
                            ? 'bg-white text-[#0033A0] shadow-sm'
                            : 'text-[#0033A0]'
                        }`}
                      >
                        R
                      </button>
                      <button
                        onClick={() => setRewardType('product')}
                        className={`flex-1 py-2 px-1 text-sm font-bold rounded-lg transition-colors ${
                          rewardType === 'product'
                            ? 'bg-white text-[#0033A0] shadow-sm'
                            : 'text-[#0033A0]'
                        }`}
                      >
                        Free product
                      </button>
                    </div>

                    {/* Content based on selected type */}
                    {rewardType === 'percentage' && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-[#1F272E]">Percentage off</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="text-base text-[#1F272E]">0%</span>
                            <div className="flex-1">
                              <Slider
                                value={percentageValue}
                                onValueChange={setPercentageValue}
                                max={100}
                                step={5}
                                className="flex-1"
                              />
                            </div>
                            <span className="text-base text-[#1F272E]">100%</span>
                          </div>
                          <div className="text-center">
                            <span className="text-2xl font-bold text-[#2F70EF]">{percentageValue[0]}%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {rewardType === 'amount' && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-[#1F272E]">Amount off</h4>
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-[#4A535C]">Rand amount</Label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base text-[#1F272E]">R</span>
                            <Input
                              value={amountValue}
                              onChange={(e) => setAmountValue(e.target.value)}
                              className="pl-8 h-12 rounded-xl border-[#A1ACBA]"
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {rewardType === 'product' && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-[#1F272E]">Free product</h4>
                        <div className="space-y-2">
                          <Label className="text-sm font-bold text-[#4A535C]">Product name</Label>
                          <Input
                            value={productValue}
                            onChange={(e) => setProductValue(e.target.value)}
                            className="h-12 rounded-xl border-[#A1ACBA]"
                            placeholder="e.g. Free coffee, Free haircut"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Tiles */}
            <div className="px-4 pb-4 space-y-1">
              {[
                { icon: "⚖️", title: "Reward limits", subtitle: "How many rewards do you want to make available?", onClick: () => setShowRewardLimitsSheet(true) },
                { icon: "👥", title: "Audience selection", subtitle: "Who do you want to target with this campaign?", onClick: () => setShowAudienceSelectionSheet(true) },
                { icon: "📊", title: "Campaign duration", subtitle: "When do you want this campaign to run?", onClick: () => setShowCampaignDurationSheet(true) },
                { icon: "🔄", title: "How to redeem", subtitle: "What do customers need to do to claim their reward?", onClick: () => setShowHowToRedeemSheet(true) },
                { icon: "📅", title: "Voucher expiry", subtitle: "How long should the voucher be usable?", onClick: () => setShowVoucherExpirySheet(true) },
                { icon: "📄", title: "Terms and conditions", subtitle: "What are the T's & C's customers need to know about?", onClick: () => setShowTermsConditionsSheet(true) }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 p-4 bg-white hover:bg-gray-50 transition-colors border-b border-[#CFD5E0] last:border-b-0"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-[#1F272E]">{item.title}</div>
                    <div className="text-sm text-[#4A535C]">{item.subtitle}</div>
                  </div>
                  <ChevronUp className="w-6 h-6 text-[#4A535C] rotate-90" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white border-t border-[#CFD5E0] rounded-t-[28px]">
        <div className="flex justify-between items-center gap-4">
          <TextButton
            onClick={handleSave}
            className="font-bold"
          >
            Save
          </TextButton>
          <Button
            onClick={handleReview}
            className="flex-1 h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold rounded-full"
          >
            Review
          </Button>
        </div>
      </div>

      {/* Logo Upload Modal */}
      <Dialog open={showLogoModal} onOpenChange={setShowLogoModal}>
        <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto p-0 bg-white">
          <DialogTitle className="sr-only">
            {showLogoSuccess ? "Logo Upload Success" : "Upload Your Logo"}
          </DialogTitle>
          <div className="flex flex-col min-h-[500px]">
            <StatusBar />

            {showLogoSuccess ? (
              // Success Screen
              <div className="flex-1 px-6 py-4 flex flex-col justify-center items-center space-y-10">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-[140px] h-[140px] rounded-full bg-[#49E33B] opacity-15 flex items-center justify-center">
                      <div className="w-[110px] h-[110px] rounded-full bg-[#009243] opacity-20 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-[#009243] flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center space-y-4">
                  <h2 className="text-lg font-bold text-[#4A535C] leading-8">
                    Logo successfully uploaded!
                  </h2>
                </div>

                {/* Explanation */}
                <div className="space-y-4 text-center">
                  <h3 className="text-lg font-bold text-[#4A535C] leading-6">
                    What is this used for?
                  </h3>
                  <div className="text-base text-[#4A535C] leading-7">
                    <p>Your logo will be displayed on your reward campaigns and customer-facing materials.</p>
                  </div>
                </div>
              </div>
            ) : (
              // Upload Form
              <div className="flex-1 px-6 py-4 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-[28px] font-bold text-[#1F272E] leading-9 mb-1">
                      Upload your logo
                    </h1>
                    <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
                      Your logo will appear on your loyalty cards and marketing materials.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowLogoModal(false)}
                    className="p-1 ml-2"
                  >
                    <X className="w-8 h-8 text-[#009DE0]" />
                  </button>
                </div>

                {/* Logo Upload Section */}
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-[#4A535C]">Logo</Label>

                  <div
                    className="flex flex-col items-center justify-center h-[200px] p-6 border-2 border-dashed border-[#CFD5E0] rounded-xl bg-[#F8FAFD] cursor-pointer"
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
                        SVG, JPG, PNG formats. Max size: 2MB.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="mt-4 h-8 bg-[#D6E3FE] hover:bg-[#D6E3FE]/80 text-[#0033A0] font-bold text-sm rounded-full px-4"
                    >
                      Add logo
                    </Button>
                  </div>

                  <div className="text-sm text-[#4A535C] leading-6 space-y-1">
                    <p>• Square logo on white background or transparent PNG</p>
                    <p>• Minimum size 576x576px</p>
                    <p>• Maximum file size 2MB</p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-6 bg-white">
              <Button
                onClick={showLogoSuccess ? handleLogoSuccess : handleSaveLogo}
                disabled={!showLogoSuccess && !logoFile}
                className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold text-base rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {showLogoSuccess ? "OK" : "Save logo"}
              </Button>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={logoFileInputRef}
            type="file"
            accept=".svg,.jpg,.jpeg,.png"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </DialogContent>
      </Dialog>

      {/* Reward Limits Bottom Sheet */}
      <Sheet open={showRewardLimitsSheet} onOpenChange={setShowRewardLimitsSheet}>
        <SheetContent side="bottom" className={`max-w-sm mx-auto p-0 rounded-t-[24px] overflow-hidden ${rewardLimitsHeight.adaptiveClass}`}>
          <SheetTitle className="sr-only">Reward Limits Settings</SheetTitle>
          <div className="bg-white rounded-t-[24px] w-full min-h-full flex flex-col">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-3">
              <div className="w-8 h-1 bg-[#6D7885] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-bold text-[#1F272E]">Reward limits</h2>
              <button
                onClick={() => setShowRewardLimitsSheet(false)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-[#4A535C]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-thin scrollbar-thumb-[#A1ACBA] scrollbar-track-[#F0F3FA]" style={{ maxHeight: rewardLimitsHeight.isSmallViewport ? '300px' : '400px' }}>
              {/* Total Rewards Slider */}
              <div className="space-y-8">
                <h3 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>Total rewards available</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[#1F272E] min-w-[20px]">1</span>
                    <div className="flex-1 px-2">
                      <Slider
                        value={totalRewards}
                        onValueChange={setTotalRewards}
                        max={1000}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-base text-[#1F272E] min-w-[40px]">1000</span>
                  </div>

                  {/* Slider Value Indicator */}
                  <div className="flex justify-center mt-2">
                    <div className="relative">
                      <div className="bg-[#0033A0] text-white px-3 py-2 rounded-lg font-bold text-lg min-w-[50px] text-center">
                        {totalRewards[0]}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#0033A0]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Per Customer Limit */}
              <div className="space-y-4">
                <h3 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>Per customer limit</h3>

                <div className="flex p-1 bg-[rgba(0,51,160,0.12)] rounded-xl">
                  {[1, 2, 5, 10].map((value) => (
                    <button
                      key={value}
                      onClick={() => setPerCustomerLimit(value)}
                      className={`flex-1 py-2 px-1 text-sm font-bold rounded-lg transition-colors ${
                        perCustomerLimit === value
                          ? 'bg-white text-[#0033A0] shadow-sm'
                          : 'text-[#0033A0]'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>

                {/* Participation Info */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 p-4 bg-[#E2F8FC] rounded-lg">
                    <div className="w-6 h-6 bg-[#00929F] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">i</span>
                    </div>
                    <span className="text-base font-bold text-[#1F272E]">
                      {calculateParticipation()} customers can participate
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 space-y-4">
              <Button
                onClick={() => {
                  // Save the limits
                  console.log("Saving reward limits:", { totalRewards: totalRewards[0], perCustomerLimit });
                  setShowRewardLimitsSheet(false);
                }}
                className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold rounded-full"
              >
                Save
              </Button>
              <TextButton
                onClick={() => setShowRewardLimitsSheet(false)}
                className="w-full"
              >
                Cancel
              </TextButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Audience Selection Bottom Sheet */}
      <Sheet open={showAudienceSelectionSheet} onOpenChange={setShowAudienceSelectionSheet}>
        <SheetContent side="bottom" className={`max-w-sm mx-auto p-0 rounded-t-[24px] overflow-hidden ${audienceHeight.adaptiveClass}`}>
          <SheetTitle className="sr-only">Audience Selection Settings</SheetTitle>
          <div className="bg-white rounded-t-[24px] w-full min-h-full flex flex-col">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-3">
              <div className="w-8 h-1 bg-[#6D7885] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-bold text-[#1F272E]">{CONTENT_TOKENS.AUDIENCE_SELECTION.TITLE}</h2>
              <button
                onClick={() => setShowAudienceSelectionSheet(false)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-[#4A535C]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-[#A1ACBA] scrollbar-track-[#F0F3FA]" style={{ maxHeight: audienceHeight.isSmallViewport ? '400px' : '500px' }}>
              {/* Spending Personas */}
              <div className="space-y-3">
                {CONTENT_TOKENS.AUDIENCE_SELECTION.SPENDING_PERSONAS.map((persona) => (
                  <div
                    key={persona.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-colors cursor-pointer ${
                      selectedPersona === persona.id
                        ? 'bg-[#F1F3FF] border-2 border-[#004BB8]'
                        : 'bg-white border border-gray-200'
                    }`}
                    onClick={() => setSelectedPersona(persona.id)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPersona === persona.id
                        ? 'border-[#004BB8] bg-[#004BB8]'
                        : 'border-[#6D7885]'
                    }`}>
                      {selectedPersona === persona.id && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="flex-1 text-base font-bold text-[#1F272E]">
                      {persona.name} ({persona.count}k)
                    </span>
                  </div>
                ))}
              </div>

              {/* Filters Description */}
              <div className="pt-4">
                <p className={cn(typography({ variant: "body-regular" }), "text-[#4A535C]")}>
                  {CONTENT_TOKENS.AUDIENCE_SELECTION.DESCRIPTION}
                </p>
              </div>

              {/* Age Filter */}
              <div className="space-y-4">
                <h3 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>{CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_LABEL}</h3>

                <div className="flex items-center gap-4">
                  <span className="text-base text-[#1F272E] min-w-[20px]">{CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_RANGE.MIN}</span>
                  <div className="flex-1 px-2">
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      max={CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_RANGE.MAX}
                      min={CONTENT_TOKENS.AUDIENCE_SELECTION.AGE_RANGE.MIN}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <span className="text-base text-[#1F272E] min-w-[40px]">65+</span>
                </div>

                {/* Age Range Display */}
                <div className="flex justify-center gap-4 text-sm font-bold text-[#2F70EF]">
                  <span>{ageRange[0]}</span>
                  <span>-</span>
                  <span>{ageRange[1]}</span>
                </div>
              </div>

              {/* Gender Filter */}
              <div className="space-y-4">
                <h3 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>{CONTENT_TOKENS.AUDIENCE_SELECTION.GENDER_LABEL}</h3>

                <div className="flex h-10 min-h-8 max-h-10 justify-center items-center gap-0 self-stretch">
                  <button
                    onClick={() => setSelectedGender('male')}
                    className={`flex-1 h-full flex justify-center items-center rounded-l-full border transition-colors ${
                      selectedGender === 'male'
                        ? 'bg-[#2F70EF] text-white border-[#2F70EF]'
                        : 'bg-white text-[#1F272E] border-[#A1ACBA]'
                    }`}
                  >
                    <span className="text-sm font-bold">{CONTENT_TOKENS.AUDIENCE_SELECTION.GENDER_OPTIONS.MALE}</span>
                  </button>
                  <button
                    onClick={() => setSelectedGender('female')}
                    className={`flex-1 h-full flex justify-center items-center border-t border-b -ml-px transition-colors ${
                      selectedGender === 'female'
                        ? 'bg-[#2F70EF] text-white border-[#2F70EF]'
                        : 'bg-white text-[#1F272E] border-[#A1ACBA]'
                    }`}
                  >
                    <span className="text-sm font-bold">{CONTENT_TOKENS.AUDIENCE_SELECTION.GENDER_OPTIONS.FEMALE}</span>
                  </button>
                  <button
                    onClick={() => setSelectedGender('other')}
                    className={`flex-1 h-full flex justify-center items-center rounded-r-full border -ml-px transition-colors ${
                      selectedGender === 'other'
                        ? 'bg-[#2F70EF] text-white border-[#2F70EF]'
                        : 'bg-white text-[#1F272E] border-[#A1ACBA]'
                    }`}
                  >
                    <span className="text-sm font-bold">{CONTENT_TOKENS.AUDIENCE_SELECTION.GENDER_OPTIONS.OTHER}</span>
                  </button>
                </div>
              </div>

              {/* Audience Size Display */}
              <div className="space-y-4">
                <h3 className={cn(typography({ variant: "body-large-emphasis" }), "text-[#1F272E]")}>{CONTENT_TOKENS.AUDIENCE_SELECTION.AUDIENCE_SIZE_LABEL}</h3>

                <div className="flex items-center justify-between p-4 border border-[#A1ACBA] rounded-2xl bg-white">
                  <div className="flex items-center gap-2">
                    {generatePeopleIcons()}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-[#1F272E]">{calculateAudienceSize()}</span>
                    <span className="text-xl font-bold text-[#1F272E]">k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 space-y-4">
              <Button
                onClick={() => {
                  console.log("Saving audience selection:", {
                    selectedPersona,
                    ageRange,
                    selectedGender,
                    audienceSize: calculateAudienceSize()
                  });
                  setShowAudienceSelectionSheet(false);
                }}
                className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold rounded-full"
              >
                Save
              </Button>
              <TextButton
                onClick={() => setShowAudienceSelectionSheet(false)}
                className="w-full"
              >
                Cancel
              </TextButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Campaign Duration Bottom Sheet */}
      <Sheet open={showCampaignDurationSheet} onOpenChange={setShowCampaignDurationSheet}>
        <SheetContent side="bottom" className={`max-w-sm mx-auto p-0 rounded-t-[24px] overflow-hidden ${campaignDurationHeight.adaptiveClass}`}>
          <SheetTitle className="sr-only">Campaign Duration Settings</SheetTitle>
          <div className="bg-white rounded-t-[24px] w-full min-h-full flex flex-col">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-3">
              <div className="w-8 h-1 bg-[#6D7885] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-bold text-[#1F272E]">Campaign start and end dates</h2>
              <button
                onClick={() => setShowCampaignDurationSheet(false)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-[#4A535C]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-[#A1ACBA] scrollbar-track-[#F0F3FA]" style={{ maxHeight: campaignDurationHeight.isSmallViewport ? '250px' : '350px' }}>
              {/* Date Inputs */}
              <div className="flex gap-3">
                {/* Start Date */}
                <div className="flex-1 space-y-2">
                  <Label className="text-sm font-bold text-[#4A535C]">Start date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-between rounded-xl border-[#A1ACBA] bg-white hover:bg-gray-50"
                      >
                        <span className="text-base text-[#1F272E]">
                          {startDate?.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'numeric',
                            year: '2-digit'
                          }) || "1/6/25"}
                        </span>
                        <CalendarIcon className="w-6 h-6 text-[#2F70EF]" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => date && setStartDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="flex-1 space-y-2">
                  <Label className="text-sm font-bold text-[#4A535C]">End date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-between rounded-xl border-[#A1ACBA] bg-white hover:bg-gray-50"
                      >
                        <span className="text-base text-[#1F272E]">
                          {endDate?.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'numeric',
                            year: '2-digit'
                          }) || "31/12/25"}
                        </span>
                        <CalendarIcon className="w-6 h-6 text-[#2F70EF]" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => date && setEndDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Specific Times Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="specific-times"
                  checked={specificTimes}
                  onCheckedChange={(checked) => setSpecificTimes(checked as boolean)}
                  className="w-6 h-6 rounded-sm border-2 border-[#A1ACBA] data-[state=checked]:bg-[#004BB8] data-[state=checked]:border-[#004BB8]"
                />
                <Label htmlFor="specific-times" className="text-base font-bold text-[#1F272E]">
                  Specific times
                </Label>
              </div>

              {/* Time Inputs - Only show when specificTimes is checked */}
              {specificTimes && (
                <div className="flex gap-3 animate-in slide-in-from-top-2 duration-200">
                  {/* Start Time */}
                  <div className="flex-1 space-y-2">
                    <Label className="text-sm font-bold text-[#4A535C]">Start time</Label>
                    <div className="relative">
                      <Input
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="h-12 rounded-xl border-[#A1ACBA] pr-12 text-base"
                        placeholder="7:00 AM"
                      />
                      <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#2F70EF]" />
                    </div>
                  </div>

                  {/* End Time */}
                  <div className="flex-1 space-y-2">
                    <Label className="text-sm font-bold text-[#4A535C]">End time</Label>
                    <div className="relative">
                      <Input
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="h-12 rounded-xl border-[#A1ACBA] pr-12 text-base"
                        placeholder="5:00 PM"
                      />
                      <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#2F70EF]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 space-y-4">
              <Button
                onClick={() => {
                  // Save the campaign duration
                  console.log("Saving campaign duration:", {
                    startDate,
                    endDate,
                    specificTimes,
                    ...(specificTimes && { startTime, endTime })
                  });
                  setShowCampaignDurationSheet(false);
                }}
                className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold rounded-full"
              >
                Save
              </Button>
              <TextButton
                onClick={() => setShowCampaignDurationSheet(false)}
                className="w-full"
              >
                Cancel
              </TextButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* How to Redeem Bottom Sheet */}
      <Sheet open={showHowToRedeemSheet} onOpenChange={setShowHowToRedeemSheet}>
        <SheetContent side="bottom" className={`max-w-sm mx-auto p-0 rounded-t-[24px] overflow-hidden ${redeemHeight.adaptiveClass}`}>
          <SheetTitle className="sr-only">How to Redeem Settings</SheetTitle>
          <div className="bg-white rounded-t-[24px] w-full min-h-full flex flex-col">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-3">
              <div className="w-8 h-1 bg-[#6D7885] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-bold text-[#1F272E]">Steps to redeem</h2>
              <button
                onClick={() => setShowHowToRedeemSheet(false)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-[#4A535C]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-[#A1ACBA] scrollbar-track-[#F0F3FA]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#A1ACBA #F0F3FA',
                maxHeight: redeemHeight.isSmallViewport ? '280px' : '380px'
              }}
            >
              {/* Steps Text Area */}
              <div className="space-y-1">
                <div className="relative">
                  <Textarea
                    value={getProcessedRedemptionSteps()}
                    onChange={(e) => {
                      if (e.target.value.length <= 100) {
                        setRedemptionSteps(e.target.value);
                      }
                    }}
                    className="min-h-[180px] text-base border-[#A1ACBA] rounded-xl resize-none"
                    placeholder="Enter redemption steps..."
                  />
                  {/* Resize handle */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 opacity-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.2803 6.21967C17.5732 6.51256 17.5732 6.98744 17.2803 7.28033L7.28033 17.2803C6.98744 17.5732 6.51256 17.5732 6.21967 17.2803C5.92678 16.9874 5.92678 16.5126 6.21967 16.2197L16.2197 6.21967C16.5126 5.92678 16.9874 5.92678 17.2803 6.21967ZM17.2803 11.934C17.5732 12.2268 17.5732 12.7017 17.2803 12.9946L12.9946 17.2803C12.7017 17.5732 12.2268 17.5732 11.934 17.2803C11.6411 16.9874 11.6411 16.5126 11.934 16.2197L16.2197 11.934C16.5126 11.6411 16.9874 11.6411 17.2803 11.934Z" fill="#1F272E"/>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6D7885] font-bold">Hint description text</span>
                  <span className="text-[#6D7885] font-bold">{getProcessedRedemptionSteps().length}/100</span>
                </div>
              </div>

              {/* Voucher Code Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1F272E]">Voucher code</h3>

                <div className="space-y-4">
                  <p className="text-xl font-bold text-[#1F272E] leading-7">
                    You'll give this 4-digit code to your customers when they redeem a reward.
                  </p>

                  {/* 4-Digit Code Inputs */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-[#4A535C]">Create 4-digit code</Label>
                    <div className="flex gap-3">
                      {voucherCode.map((digit, index) => (
                        <Input
                          key={index}
                          ref={voucherCodeRefs[index]}
                          value={digit}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Only allow single digit
                            if (value.length <= 1 && /^\d*$/.test(value)) {
                              const newCode = [...voucherCode];
                              newCode[index] = value;
                              setVoucherCode(newCode);

                              // Auto-jump to next field if digit entered
                              if (value && index < 3) {
                                voucherCodeRefs[index + 1].current?.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace to go to previous field
                            if (e.key === 'Backspace' && !voucherCode[index] && index > 0) {
                              voucherCodeRefs[index - 1].current?.focus();
                            }
                          }}
                          className="w-12 h-12 text-center text-lg font-bold border-[#A1ACBA] rounded-xl"
                          maxLength={1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-[#4A535C]">What is this?</h4>
                    <div className="space-y-2 text-base text-[#4A535C]">
                      <div className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-[#4A535C] rounded-full mt-3 flex-shrink-0"></span>
                        <span>This code helps you track redemptions and prevent fraud</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-[#4A535C] rounded-full mt-3 flex-shrink-0"></span>
                        <span>It stops people from sharing screenshots or using vouchers they didn't earn</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 space-y-4">
              <Button
                onClick={() => {
                  // Save the redemption settings
                  console.log("Saving redemption settings:", {
                    redemptionSteps,
                    voucherCode: voucherCode.join('')
                  });
                  setShowHowToRedeemSheet(false);
                }}
                className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold rounded-full"
              >
                Save
              </Button>
              <TextButton
                onClick={() => setShowHowToRedeemSheet(false)}
                className="w-full"
              >
                Cancel
              </TextButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Voucher Expiry Bottom Sheet */}
      <Sheet open={showVoucherExpirySheet} onOpenChange={setShowVoucherExpirySheet}>
        <SheetContent side="bottom" className={`max-w-sm mx-auto p-0 rounded-t-[24px] overflow-visible ${expiryHeight.adaptiveClass}`}>
          <SheetTitle className="sr-only">Voucher Expiry Settings</SheetTitle>
          <div className="bg-white rounded-t-[24px] w-full min-h-full flex flex-col">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-3">
              <div className="w-8 h-1 bg-[#6D7885] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-bold text-[#1F272E]">Voucher expiry</h2>
              <button
                onClick={() => setShowVoucherExpirySheet(false)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-[#4A535C]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-[#A1ACBA] scrollbar-track-[#F0F3FA]" style={{ maxHeight: expiryHeight.isSmallViewport ? '300px' : '400px' }}>
              {/* Radio Group */}
              <div className="space-y-3">
                {/* On a specific date */}
                <div
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-colors cursor-pointer ${
                    expiryType === 'specific'
                      ? 'bg-[#F1F3FF] border-2 border-[#004BB8]'
                      : 'bg-white border border-gray-200'
                  }`}
                  onClick={() => setExpiryType('specific')}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    expiryType === 'specific'
                      ? 'border-[#004BB8] bg-[#004BB8]'
                      : 'border-[#6D7885]'
                  }`}>
                    {expiryType === 'specific' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="flex-1 text-base font-bold text-[#1F272E]">
                    On a specific date
                  </span>
                </div>

                {/* After a period of time */}
                <div
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-colors cursor-pointer ${
                    expiryType === 'period'
                      ? 'bg-[#F1F3FF] border-2 border-[#004BB8]'
                      : 'bg-white border border-gray-200'
                  }`}
                  onClick={() => setExpiryType('period')}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    expiryType === 'period'
                      ? 'border-[#004BB8] bg-[#004BB8]'
                      : 'border-[#6D7885]'
                  }`}>
                    {expiryType === 'period' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="flex-1 text-base font-bold text-[#1F272E]">
                    After a period of time
                  </span>
                </div>

                {/* Never expires */}
                <div
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-colors cursor-pointer ${
                    expiryType === 'never'
                      ? 'bg-[#F1F3FF] border-2 border-[#004BB8]'
                      : 'bg-white border border-gray-200'
                  }`}
                  onClick={() => setExpiryType('never')}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    expiryType === 'never'
                      ? 'border-[#004BB8] bg-[#004BB8]'
                      : 'border-[#6D7885]'
                  }`}>
                    {expiryType === 'never' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="flex-1 text-base font-bold text-[#1F272E]">
                    Never expires
                  </span>
                </div>
              </div>

              {/* Conditional Content Based on Selection */}
              {expiryType === 'specific' && (
                <div className="space-y-2 px-4 animate-in slide-in-from-top-2 duration-200">
                  <Label className="text-sm font-bold text-[#4A535C]">Expiry date</Label>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-between rounded-xl border-[#A1ACBA] bg-white hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span className="text-base text-[#1F272E]">
                          {expiryDate ? expiryDate.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'numeric',
                            year: '2-digit'
                          }) : "Select date"}
                        </span>
                        <CalendarIcon className="w-6 h-6 text-[#2F70EF]" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 z-50"
                      align="start"
                      side="top"
                      sideOffset={5}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Calendar
                        mode="single"
                        selected={expiryDate}
                        onSelect={(date) => {
                          setExpiryDate(date);
                          // Don't close immediately to allow month navigation
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {expiryType === 'period' && (
                <div className="space-y-4 px-4 animate-in slide-in-from-top-2 duration-200">
                  <Label className="text-sm font-bold text-[#4A535C]">Voucher expires</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={expiryAmount}
                      onChange={(e) => setExpiryAmount(e.target.value)}
                      className="w-16 h-12 text-center text-base border-[#A1ACBA] rounded-xl"
                      placeholder="0"
                      type="number"
                      min="1"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Select value={expiryUnit} onValueChange={setExpiryUnit}>
                      <SelectTrigger className="w-[120px] h-12 border-[#A1ACBA] rounded-xl" onClick={(e) => e.stopPropagation()}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">days</SelectItem>
                        <SelectItem value="weeks">weeks</SelectItem>
                        <SelectItem value="months">months</SelectItem>
                        <SelectItem value="years">years</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm font-bold text-[#1F272E]">after issuance</span>
                  </div>
                </div>
              )}

              {expiryType === 'never' && (
                <div className="px-4 animate-in slide-in-from-top-2 duration-200">
                  <Alert className="bg-[#FFF0E8] border-[#F2C07F] border">
                    <TriangleAlert className="h-4 w-4 text-[#F97316]" />
                    <AlertDescription className="text-base font-normal text-[#1F272E]">
                      Rewards that never expire may create long-term liability for your business.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 space-y-4">
              <Button
                onClick={() => {
                  // Save the voucher expiry settings
                  console.log("Saving voucher expiry:", {
                    expiryType,
                    ...(expiryType === 'specific' && { expiryDate }),
                    ...(expiryType === 'period' && { expiryAmount, expiryUnit })
                  });
                  setShowVoucherExpirySheet(false);
                }}
                className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold rounded-full"
              >
                Save
              </Button>
              <TextButton
                onClick={() => setShowVoucherExpirySheet(false)}
                className="w-full"
              >
                Cancel
              </TextButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Terms and Conditions Bottom Sheet */}
      <Sheet open={showTermsConditionsSheet} onOpenChange={setShowTermsConditionsSheet}>
        <SheetContent side="bottom" className={`max-w-sm mx-auto p-0 rounded-t-[24px] overflow-visible ${termsHeight.adaptiveClass}`}>
          <SheetTitle className="sr-only">Terms and Conditions Settings</SheetTitle>
          <div className="bg-white rounded-t-[24px] w-full min-h-full flex flex-col">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-3">
              <div className="w-8 h-1 bg-[#6D7885] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-bold text-[#1F272E]">Terms and conditions</h2>
              <button
                onClick={() => setShowTermsConditionsSheet(false)}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-[#4A535C]" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-[#A1ACBA] scrollbar-track-[#F0F3FA]" style={{ maxHeight: termsHeight.isSmallViewport ? '200px' : '300px' }}>
              {/* Terms Text Area */}
              <div className="space-y-1">
                <div className="relative">
                  <Textarea
                    value={getProcessedTermsAndConditions()}
                    onChange={(e) => {
                      // Remove processing and store raw text with placeholders
                      let rawText = e.target.value;
                      // Replace current dynamic values back to placeholders for storage
                      const currentExpiryText = getExpiryDateText();
                      const currentRewardValue = getRewardValue();

                      if (currentExpiryText !== '<insert date defined via expiry input>') {
                        rawText = rawText.replace(new RegExp(currentExpiryText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '<insert date defined via expiry input>');
                      }
                      if (currentRewardValue !== '<reward value captured above>') {
                        rawText = rawText.replace(new RegExp(currentRewardValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '<insert reward value captured above>');
                      }

                      setTermsAndConditions(rawText);
                    }}
                    className="min-h-[320px] text-base border-[#A1ACBA] rounded-xl resize-none"
                    placeholder="Enter terms and conditions..."
                    onClick={(e) => e.stopPropagation()}
                  />
                  {/* Resize handle */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 opacity-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.2803 6.21967C17.5732 6.51256 17.5732 6.98744 17.2803 7.28033L7.28033 17.2803C6.98744 17.5732 6.51256 17.5732 6.21967 17.2803C5.92678 16.9874 5.92678 16.5126 6.21967 16.2197L16.2197 6.21967C16.5126 5.92678 16.9874 5.92678 17.2803 6.21967ZM17.2803 11.934C17.5732 12.2268 17.5732 12.7017 17.2803 12.9946L12.9946 17.2803C12.7017 17.5732 12.2268 17.5732 11.934 17.2803C11.6411 16.9874 11.6411 16.5126 11.934 16.2197L16.2197 11.934C16.5126 11.6411 16.9874 11.6411 17.2803 11.934Z" fill="#1F272E"/>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6D7885] font-bold">Hint description text</span>
                  <span className="text-[#6D7885] font-bold">{getProcessedTermsAndConditions().length}/500</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 space-y-4">
              <Button
                onClick={() => {
                  // Save the terms and conditions
                  console.log("Saving terms and conditions:", termsAndConditions);
                  setShowTermsConditionsSheet(false);
                }}
                className="w-full h-12 bg-[#2F70EF] hover:bg-[#2F70EF]/90 text-white font-bold rounded-full"
              >
                Save
              </Button>
              <TextButton
                onClick={() => setShowTermsConditionsSheet(false)}
                className="w-full"
              >
                Cancel
              </TextButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
