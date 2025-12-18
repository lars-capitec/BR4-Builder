import { cva } from "class-variance-authority";

// Typography variants based on Figma design specifications
export const typography = cva("", {
  variants: {
    variant: {
      // Display styles (Flama font family)
      "display-large": "font-flama text-[72px] font-bold leading-[80px]",
      "display-medium": "font-flama text-[64px] font-bold leading-[72px]",
      "display-small": "font-flama text-[56px] font-bold leading-[64px]",
      
      // Headline styles (Nunito Sans)
      "headline-xl": "font-nunito text-[40px] font-semibold leading-[48px]",
      "headline-large": "font-nunito text-[36px] font-semibold leading-[44px]",
      "headline-medium": "font-nunito text-[32px] font-semibold leading-[40px]",
      "headline-small": "font-nunito text-[28px] font-semibold leading-[36px]",
      "headline-xs": "font-nunito text-[24px] font-semibold leading-[36px]",
      
      // Title styles (Nunito Sans)
      "title-large": "font-nunito text-[24px] font-bold leading-[32px]",
      "title-medium": "font-nunito text-[20px] font-bold leading-[28px]",
      "title-small": "font-nunito text-[18px] font-bold leading-[24px]",
      
      // Body styles (Nunito Sans)
      "body-large": "font-nunito text-[18px] font-normal leading-[32px]",
      "body-large-emphasis": "font-nunito text-[18px] font-bold leading-[32px]",
      "body-regular": "font-nunito text-[16px] font-normal leading-[28px]",
      "body-regular-emphasis": "font-nunito text-[16px] font-bold leading-[28px]",
      "body-small": "font-nunito text-[14px] font-normal leading-[20px] tracking-[0.25px]",
      "body-small-emphasis": "font-nunito text-[14px] font-bold leading-[20px] tracking-[0.25px]",
      "body-xs": "font-nunito text-[12px] font-normal leading-[16px] tracking-[0.4px]",
      "body-xs-emphasis": "font-nunito text-[12px] font-bold leading-[16px] tracking-[0.4px]",
      
      // Label styles (Nunito Sans)
      "label-large": "font-nunito text-[16px] font-semibold leading-[24px]",
      "label-large-emphasis": "font-nunito text-[16px] font-bold leading-[24px]",
      "label-medium": "font-nunito text-[14px] font-semibold leading-[20px] tracking-[0.25px]",
      "label-medium-emphasis": "font-nunito text-[14px] font-bold leading-[20px] tracking-[0.25px]",
      "label-small": "font-nunito text-[12px] font-semibold leading-[14px] tracking-[0.4px]",
      "label-small-emphasis": "font-nunito text-[12px] font-bold leading-[16px] tracking-[0.4px]",
    },
  },
});

export const typographyStyles = {
  // Display styles
  "display-large": {
    fontFamily: "Flama",
    fontSize: "72px", 
    fontWeight: 700,
    lineHeight: "80px",
    letterSpacing: "normal"
  },
  "display-medium": {
    fontFamily: "Flama",
    fontSize: "64px",
    fontWeight: 700, 
    lineHeight: "72px",
    letterSpacing: "normal"
  },
  "display-small": {
    fontFamily: "Flama", 
    fontSize: "56px",
    fontWeight: 700,
    lineHeight: "64px", 
    letterSpacing: "normal"
  },
  
  // Headline styles
  "headline-xl": {
    fontFamily: "Nunito Sans",
    fontSize: "40px",
    fontWeight: 600,
    lineHeight: "48px",
    letterSpacing: "normal"
  },
  "headline-large": {
    fontFamily: "Nunito Sans", 
    fontSize: "36px",
    fontWeight: 600,
    lineHeight: "44px",
    letterSpacing: "normal"
  },
  "headline-medium": {
    fontFamily: "Nunito Sans",
    fontSize: "32px", 
    fontWeight: 600,
    lineHeight: "40px",
    letterSpacing: "normal"
  },
  "headline-small": {
    fontFamily: "Nunito Sans",
    fontSize: "28px",
    fontWeight: 600, 
    lineHeight: "36px",
    letterSpacing: "normal"
  },
  "headline-xs": {
    fontFamily: "Nunito Sans",
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: "36px", 
    letterSpacing: "normal"
  },
  
  // Title styles
  "title-large": {
    fontFamily: "Nunito Sans",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "32px",
    letterSpacing: "normal"
  },
  "title-medium": {
    fontFamily: "Nunito Sans", 
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "28px",
    letterSpacing: "normal"
  },
  "title-small": {
    fontFamily: "Nunito Sans",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "normal"
  },
  
  // Body styles
  "body-large": {
    fontFamily: "Nunito Sans",
    fontSize: "18px", 
    fontWeight: 400,
    lineHeight: "32px",
    letterSpacing: "normal"
  },
  "body-large-emphasis": {
    fontFamily: "Nunito Sans",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "32px",
    letterSpacing: "normal"
  },
  "body-regular": {
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "28px", 
    letterSpacing: "normal"
  },
  "body-regular-emphasis": {
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "28px",
    letterSpacing: "normal"
  },
  "body-small": {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.25px"
  },
  "body-small-emphasis": {
    fontFamily: "Nunito Sans", 
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "20px",
    letterSpacing: "0.25px"
  },
  "body-xs": {
    fontFamily: "Nunito Sans",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0.4px"
  },
  "body-xs-emphasis": {
    fontFamily: "Nunito Sans",
    fontSize: "12px",
    fontWeight: 700, 
    lineHeight: "16px",
    letterSpacing: "0.4px"
  },
  
  // Label styles
  "label-large": {
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "normal"
  },
  "label-large-emphasis": {
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "24px", 
    letterSpacing: "normal"
  },
  "label-medium": {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0.25px"
  },
  "label-medium-emphasis": {
    fontFamily: "Nunito Sans", 
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "20px",
    letterSpacing: "0.25px"
  },
  "label-small": {
    fontFamily: "Nunito Sans",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "14px",
    letterSpacing: "0.4px"
  },
  "label-small-emphasis": {
    fontFamily: "Nunito Sans",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "16px",
    letterSpacing: "0.4px"
  }
} as const;

export type TypographyVariant = keyof typeof typographyStyles;
