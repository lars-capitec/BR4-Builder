/**
 * Design Tokens for Form Components
 * 
 * Centralized design tokens for consistent styling across input fields,
 * select menus, and other form components based on Figma specifications.
 */

export const INPUT_TOKENS = {
  // Sizing
  HEIGHT: '48px',
  BORDER_RADIUS: '12px',
  BORDER_WIDTH: '1px',
  BORDER_WIDTH_FOCUSED: '3px',
  
  // Spacing
  PADDING_HORIZONTAL: '16px',
  PADDING_VERTICAL: '4px',
  LABEL_SPACING: '8px',
  HINT_SPACING: '4px',
  CONTENT_GAP: '12px',
  
  // Colors - Borders
  BORDER_ENABLED: '#A1ACBA',
  BORDER_HOVERED: '#4A535C', 
  BORDER_FOCUSED: '#2F70EF',
  BORDER_ERROR: '#A5132A',
  BORDER_DISABLED: 'rgba(31, 39, 46, 0.12)',
  
  // Colors - Backgrounds
  BACKGROUND_DEFAULT: '#FFFFFF',
  BACKGROUND_ERROR: '#FFF8F7',
  BACKGROUND_READONLY: '#F8FAFD',
  BACKGROUND_DISABLED: '#FFFFFF',
  
  // Colors - Text
  LABEL_COLOR: '#4A535C',
  INPUT_COLOR: '#1F272E',
  HINT_COLOR: '#6D7885',
  ERROR_COLOR: '#A5132A',
  DISABLED_COLOR: 'rgba(31, 39, 46, 0.40)',
  
  // Typography
  LABEL_SIZE: '14px',
  LABEL_WEIGHT: '600',
  LABEL_LINE_HEIGHT: '20px',
  LABEL_LETTER_SPACING: '0.25px',
  
  INPUT_SIZE: '16px',
  INPUT_WEIGHT: '400',
  INPUT_LINE_HEIGHT: '28px',
  
  HINT_SIZE: '12px',
  HINT_WEIGHT: '600',
  HINT_LINE_HEIGHT: '14px',
  HINT_LETTER_SPACING: '0.4px',
  
  // Font Family
  FONT_FAMILY: 'var(--font-nunito)',
} as const;

export const HEATMAP_TOKENS = {
  // Purple gradient colors for engagement heatmap
  GRADIENT_START: '#CF9ED8',
  GRADIENT_PEAK: '#8D00A3',
  GRADIENT_END: '#CF9ED8',

  // Gradient definition
  ENGAGEMENT_GRADIENT: 'linear-gradient(90deg, #CF9ED8 0%, #8D00A3 30.29%, #CF9ED8 100%)',

  // Component sizing
  BAR_HEIGHT: '16px',
  BAR_BORDER_RADIUS: '8px',
  COMPONENT_WIDTH: '320px',
  COMPONENT_GAP: '16px',

  // Time label styling
  TIME_LABEL_COLOR: '#4A535C',
  TIME_LABEL_SIZE: '14px',
  TIME_LABEL_WEIGHT: '700',
  TIME_LABEL_LINE_HEIGHT: '20px',
  TIME_LABEL_LETTER_SPACING: '0.25px',

  // Icon styling
  ICON_SIZE: '24px',
  ICON_WEIGHT: '700',

  // Font family
  FONT_FAMILY: 'var(--font-nunito)',
} as const;

export const FORM_TOKENS = {
  // Common form element spacing
  FIELD_SPACING: '16px',
  SECTION_SPACING: '24px',
  
  // Error icon size
  ERROR_ICON_SIZE: '16px',
  
  // Validation states
  VALIDATION: {
    SUCCESS_COLOR: '#059669',
    WARNING_COLOR: '#D97706',
    INFO_COLOR: '#0EA5E9',
  },
  
  // Focus ring
  FOCUS_RING: {
    WIDTH: '2px',
    COLOR: '#2F70EF',
    OFFSET: '2px',
  },
} as const;

// CSS Custom Properties for runtime use
export const INPUT_CSS_VARS = {
  '--input-height': INPUT_TOKENS.HEIGHT,
  '--input-border-radius': INPUT_TOKENS.BORDER_RADIUS,
  '--input-border-width': INPUT_TOKENS.BORDER_WIDTH,
  '--input-border-width-focused': INPUT_TOKENS.BORDER_WIDTH_FOCUSED,
  '--input-padding-x': INPUT_TOKENS.PADDING_HORIZONTAL,
  '--input-padding-y': INPUT_TOKENS.PADDING_VERTICAL,
  '--input-border-enabled': INPUT_TOKENS.BORDER_ENABLED,
  '--input-border-hovered': INPUT_TOKENS.BORDER_HOVERED,
  '--input-border-focused': INPUT_TOKENS.BORDER_FOCUSED,
  '--input-border-error': INPUT_TOKENS.BORDER_ERROR,
  '--input-border-disabled': INPUT_TOKENS.BORDER_DISABLED,
  '--input-bg-default': INPUT_TOKENS.BACKGROUND_DEFAULT,
  '--input-bg-error': INPUT_TOKENS.BACKGROUND_ERROR,
  '--input-bg-readonly': INPUT_TOKENS.BACKGROUND_READONLY,
  '--input-text-label': INPUT_TOKENS.LABEL_COLOR,
  '--input-text-input': INPUT_TOKENS.INPUT_COLOR,
  '--input-text-hint': INPUT_TOKENS.HINT_COLOR,
  '--input-text-error': INPUT_TOKENS.ERROR_COLOR,
  '--input-text-disabled': INPUT_TOKENS.DISABLED_COLOR,
} as const;

export type InputTokens = typeof INPUT_TOKENS;
export type FormTokens = typeof FORM_TOKENS;
export type HeatmapTokens = typeof HEATMAP_TOKENS;
