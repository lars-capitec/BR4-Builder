/**
 * Content Tokens
 * 
 * Centralized content management for the application.
 * This file contains all persistent content tokens that appear throughout the UI.
 * Modify these values to change app branding or A/B test different messaging.
 */

// Dynamic user state
let currentUserName = "";

export const CONTENT_TOKENS = {
  // App Branding
  APP_NAME: "Capitec Partner Rewards",

  // Onboarding Flow
  ONBOARDING: {
    get WELCOME_TITLE() {
      return currentUserName ? `Hi ${currentUserName}!` : "Hi there!";
    },
    WELCOME_DESCRIPTION: "Now you can reward your clients for choosing to shop with you. It's just another way we're empowering businesses.",
    WHATS_NEXT: "What's next?",
    STEP_1_TITLE: "Tell us about your shop",
    STEP_1_DESCRIPTION: "What do you do and where do you trade?",
    STEP_2_TITLE: "Read our agreement", 
    STEP_2_DESCRIPTION: "If you're comfortable with the terms, accept and confirm",
  },

  // Business Info Form
  BUSINESS_INFO: {
    TITLE: "Tell us about your shop",
    SUBTITLE: "Got more than one? Tell us where you'd like to run your first campaign – you can add more shops later.",
    BUSINESS_DETAILS: "Business details",
    SHOP_NAME_LABEL: "Shop name *",
    SHOP_NAME_PLACEHOLDER: "Enter the name your clients are familiar with",
    INDUSTRY_LABEL: "Industry *",
    INDUSTRY_PLACEHOLDER: "Choose your industry",
    WHERE_DO_BUSINESS: "Where do you do business?",
    SHOP_ADDRESS_LABEL: "Shop address *",
    OPERATING_HOURS: "Operating hours",
    OPEN_LABEL: "Open",
    CLOSE_LABEL: "Close",
    BUSY_TIMES_TITLE: "Busy times (optional)",
    BUSY_TIMES_DESCRIPTION: "This can help you decide when to run your campaign",
    UPLOAD_LOGO: "Upload your logo (you can do this later)",
    UPLOAD_LOGO_BUTTON: "Upload your logo",
  },

  // Brand Assets Upload
  BRAND_ASSETS: {
    TITLE: "Upload brand assets",
    DESCRIPTION: "Upload your logo and a marketing image i.e. a nice photo of your shop or products to entice customers.",
    LOGO_LABEL: "Logo",
    LOGO_UPLOAD_TEXT: "Upload your logo",
    LOGO_FILE_FORMATS: "SVG, JPG, PNG and GIF file formats are allowed. Maximum size: 5GB.",
    LOGO_BUTTON: "Add logo",
    LOGO_GUIDELINES: [
      "Square logo on white background or transparent PNG",
      "Minimum size 576x576px", 
      "Maximum file size 2MB"
    ],
    MARKETING_IMAGE_LABEL: "Marketing image",
    MARKETING_IMAGE_UPLOAD_TEXT: "Upload a marketing image",
    MARKETING_IMAGE_BUTTON: "Add image",
    MARKETING_IMAGE_GUIDELINES: [
      "Use a plain image with no logos or CTAs",
      "Image size 1440x812px recommended",
      "Maximum file size 2MB"
    ],
    SAVE_BUTTON: "Save brand assets",
    SUCCESS_TITLE: "Brand assets successfully uploaded!",
    SUCCESS_WHAT_ARE_THESE: "What are these used for?",
    SUCCESS_LOGO_USE: "Your logo will be displayed on your reward campaigns",
    SUCCESS_IMAGE_USE: "Your marketing image will be used in your reward campaigns",
  },

  // Terms and Conditions
  TERMS: {
    TITLE: "Read our agreement",
    SUBTITLE: "If you're comfortable with the terms, accept and confirm.",
    HEADING: "Terms and conditions",
    CONFIDENTIALITY_LINK: "Confidentiality",
    SERVICE_STANDARDS_LINK: "Service standards",
    ACCEPT_BUTTON: "Accept",
  },

  // Completion
  COMPLETION: {
    TITLE: "You're all set!",
    WELCOME_TO: "Welcome to",
    EXPLORE_BUTTON: "Explore the platform",
  },

  // How This Works
  HOW_THIS_WORKS: {
    TITLE: "How this works",
    SUBTITLE: "3 steps to launch a campaign",
    STEP_1_TITLE: "Choose a template",
    STEP_1_DESCRIPTION: "Pick from our design templates",
    STEP_2_TITLE: "Personalise",
    STEP_2_DESCRIPTION: "Make any changes you want to make",
    STEP_3_TITLE: "Review and publish",
    STEP_3_DESCRIPTION: "Our team checks the details and we let you know when its ready",
    TRY_IT_BUTTON: "Try it out for yourself",
  },

  // Reward Types (used across multiple features)
  REWARD_TYPES: {
    LOYALTY_CARD: {
      NAME: "loyalty card",
      DISPLAY_NAME: "Loyalty Card",
      BUILD_ACTION: "Build a loyalty card",
    },
    INSTANT_REWARD: {
      NAME: "instant reward",
      DISPLAY_NAME: "Instant Reward",
      BUILD_ACTION: "Build an instant reward",
    },
    TRIGGERED_REWARD: {
      NAME: "triggered reward",
      DISPLAY_NAME: "Triggered Reward",
      BUILD_ACTION: "Build a triggered reward",
    },
  },

  // Choose Objective
  CHOOSE_OBJECTIVE: {
    TITLE: "What are you looking to achieve?",
    LOYALTY_CARD: {
      TITLE: "Keep customers coming back",
      DESCRIPTION: "Loyalty cards help you track repeat customers and reward them for choosing to consistently shop with you.",
      BUTTON_TEXT: "Build a loyalty card",
    },
    INSTANT_REWARD: {
      TITLE: "Attract new customers",
      DESCRIPTION: "Offer a reward, like a discount, to welcome first-time shoppers and get them to try your business.",
      BUTTON_TEXT: "Build an instant reward",
    },
    TRIGGERED_REWARD: {
      TITLE: "Influence buying behaviour",
      DESCRIPTION: "Give rewards when customers take specific actions, like spending a certain amount, to guide their habits.",
      BUTTON_TEXT: "Build a triggered reward",
    },
  },

  // Campaign Creation Start Pages
  CAMPAIGN_START: {
    SUBTITLE: "Set it up in minutes and get back to business",
    STEPS: {
      STEP_1: {
        TITLE: "Choose a template",
        DESCRIPTION: "Pick from our design templates",
      },
      STEP_2: {
        TITLE: "Personalise",
        DESCRIPTION: "Make any changes you want to make",
      },
      STEP_3: {
        TITLE: "Review and publish",
        DESCRIPTION: "Our team checks the details and we let you know when its ready",
      },
    },
    READY_TO_START: "Ready to start?",
    CHOOSE_TEMPLATE_BUTTON: "Choose a template",
  },

  // Template Selection
  TEMPLATE_SELECTION: {
    TITLE: "Choose a template",
    SUBTITLE: "Here are some available templates:",
    STEP_LABELS: {
      CHOOSE: "Choose",
      PERSONALISE: "Personalise",
      REVIEW: "Review",
    },
    TEMPLATE_PLACEHOLDER: {
      TEMPLATE_1: "Template 1",
      TEMPLATE_2: "Template 2",
    },
  },

  // Common UI Elements
  COMMON: {
    NEXT_BUTTON: "Next",
    OK_BUTTON: "OK",
    BACK_BUTTON: "Back",
    CANCEL_BUTTON: "Cancel",
    SAVE_BUTTON: "Save",
    CLOSE_BUTTON: "Close",
  },

  // Login
  LOGIN: {
    TITLE: "Welcome back",
    EMAIL_LABEL: "Email",
    PASSWORD_LABEL: "Password",
    SIGN_IN_BUTTON: "Sign in",
    FORGOT_PASSWORD_TEXT: "Forgot your password?",
    FORGOT_PASSWORD_LINK: "Click here",
  },

  // Audience Selection
  AUDIENCE_SELECTION: {
    TITLE: "Target specific customers",
    DESCRIPTION: "Refine your audience by using the filters below:",
    SPENDING_PERSONAS: [
      { id: 'high-spenders', name: 'High spenders', count: 2.5 },
      { id: 'regular-customers', name: 'Regular customers', count: 8.2 },
      { id: 'occasional-visitors', name: 'Occasional visitors', count: 15.1 },
      { id: 'new-customers', name: 'New customers', count: 5.7 },
      { id: 'lapsed-customers', name: 'Lapsed customers', count: 3.9 },
      { id: 'everyone', name: 'Everyone', count: 20.0 },
    ],
    AGE_LABEL: "Age",
    GENDER_LABEL: "Gender",
    AUDIENCE_SIZE_LABEL: "Audience size",
    GENDER_OPTIONS: {
      MALE: "Male",
      FEMALE: "Female",
      OTHER: "Other",
    },
    AGE_RANGE: {
      MIN: 18,
      MAX: 65,
      DEFAULT_MIN: 25,
      DEFAULT_MAX: 40,
    },
  },

  // Data Dashboard
  DATA_DASHBOARD: {
    REWARDS_BALANCE: {
      REWARDS_AVAILABLE_TEXT: "rewards available",
      // Placeholder values for development/testing
      PLACEHOLDER_VALUES: {
        AVAILABLE_REWARDS_COUNT: 500,
      },
    },
    CAMPAIGN_PERFORMANCE: {
      REDEEMED_LABEL: "redeemed",
      CHANGE_COMPARISON_TEXT: "than last month",
    },
  },

  // Campaign Success
  CAMPAIGN_SUCCESS: {
    TITLE: "Hooray!",
    SUBTITLE: "Your campaign has been submitted for approval",
    WHATS_NEXT_TITLE: "What's next?",
    NEXT_STEPS: [
      "Our team will review your campaign",
      "Watch your inbox for feedback",
      "Once approved, your campaign will go live to Capitec clients in the Live Better World"
    ],
    CREATE_ANOTHER_BUTTON: "Create another reward",
    DASHBOARD_BUTTON: "Go to your dashboard",
  },
} as const;

// Type helper for content tokens
export type ContentTokens = typeof CONTENT_TOKENS;

// Helper function to update user name
export function updateUserName(firstName: string): void {
  currentUserName = firstName;
}

// Helper function to get current user name
export function getCurrentUserName(): string {
  return currentUserName;
}

// Helper function to get nested content tokens safely
export function getContentToken(path: string): string {
  const keys = path.split('.');
  let current: any = CONTENT_TOKENS;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Content token not found: ${path}`);
      return path; // Return the path as fallback
    }
  }

  return typeof current === 'string' ? current : path;
}
