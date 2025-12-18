import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Campaign app brand colors
        brand: {
          purple: "hsl(var(--brand-purple))",
          "purple-light": "hsl(var(--brand-purple-light))",
          "purple-dark": "hsl(var(--brand-purple-dark))",
        },
        success: "hsl(var(--success-green))",
        warning: "hsl(var(--warning-orange))",
        gray: {
          50: "hsl(var(--gray-50))",
          100: "hsl(var(--gray-100))",
          200: "hsl(var(--gray-200))",
          300: "hsl(var(--gray-300))",
          400: "hsl(var(--gray-400))",
          500: "hsl(var(--gray-500))",
          600: "hsl(var(--gray-600))",
          700: "hsl(var(--gray-700))",
          800: "hsl(var(--gray-800))",
          900: "hsl(var(--gray-900))",
        },
        // Campaign status color tokens
        "color-data-campaign-status": {
          // Draft (tonal style)
          "draft-selected-bg": "rgba(42, 217, 249, 0.12)",
          "draft-selected-text": "#007681",
          "draft-selected-icon": "#007681",
          "draft-unselected-bg": "#F3F4F6",
          "draft-unselected-text": "#6B7280",
          "draft-unselected-border": "#D1D5DB",

          // Pending (tonal style)
          "pending-selected-bg": "rgba(255, 130, 63, 0.12)",
          "pending-selected-text": "#B14C02",
          "pending-selected-icon": "#B14C02",
          "pending-unselected-bg": "#F3F4F6",
          "pending-unselected-text": "#6B7280",
          "pending-unselected-border": "#D1D5DB",

          // Approved (filled style)
          "approved-selected-bg": "#D66700",
          "approved-selected-text": "#FFFFFF",
          "approved-selected-icon": "#FFFFFF",
          "approved-unselected-bg": "#F3F4F6",
          "approved-unselected-text": "#6B7280",
          "approved-unselected-border": "#D1D5DB",

          // Scheduled (filled style)
          "scheduled-selected-bg": "#00929F",
          "scheduled-selected-text": "#FFFFFF",
          "scheduled-selected-icon": "#FFFFFF",
          "scheduled-unselected-bg": "#F3F4F6",
          "scheduled-unselected-text": "#6B7280",
          "scheduled-unselected-border": "#D1D5DB",

          // Active (filled style)
          "active-selected-bg": "#009243",
          "active-selected-text": "#FFFFFF",
          "active-selected-icon": "#FFFFFF",
          "active-unselected-bg": "#F3F4F6",
          "active-unselected-text": "#6B7280",
          "active-unselected-border": "#D1D5DB",

          // Ended (tonal style)
          "ended-selected-bg": "rgba(91, 106, 163, 0.12)",
          "ended-selected-text": "#4A535C",
          "ended-selected-icon": "#545F6A",
          "ended-unselected-bg": "#F3F4F6",
          "ended-unselected-text": "#6B7280",
          "ended-unselected-border": "#D1D5DB",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        'flama': ['var(--font-flama)', 'Flama', 'system-ui', 'sans-serif'],
        'nunito': ['var(--font-nunito)', 'Nunito Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
