import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const campaignCardVariants = cva(
  "flex flex-col items-start w-full rounded-2xl border-none transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        increase: "bg-gradient-to-br from-[rgba(91,228,155,0.20)] to-[rgba(0,167,111,0.20)] bg-white",
        decrease: "bg-gradient-to-br from-[rgba(255,214,102,0.20)] to-[rgba(255,171,0,0.20)] bg-white",
      },
    },
    defaultVariants: {
      variant: "increase",
    },
  }
);

const UpArrowIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 13.3993C28 13.0459 27.8596 12.7069 27.6097 12.457C27.3597 12.207 27.0208 12.0666 26.6673 12.0666L16.0058 12C15.6523 12 15.3134 12.1404 15.0634 12.3903C14.8135 12.6403 14.6731 12.9792 14.6731 13.3327C14.6731 13.6861 14.8135 14.0251 15.0634 14.275C15.3134 14.525 15.6523 14.6654 16.0058 14.6654H23.4155L12.3942 25.7134C12.2693 25.8373 12.1702 25.9847 12.1025 26.1471C12.0348 26.3095 12 26.4837 12 26.6596C12 26.8355 12.0348 27.0097 12.1025 27.1721C12.1702 27.3345 12.2693 27.4819 12.3942 27.6058C12.5181 27.7307 12.6655 27.8298 12.8279 27.8975C12.9903 27.9652 13.1645 28 13.3404 28C13.5163 28 13.6905 27.9652 13.8529 27.8975C14.0153 27.8298 14.1627 27.7307 14.2866 27.6058L25.3346 16.5578V23.9942C25.3346 24.3477 25.475 24.6866 25.725 24.9366C25.9749 25.1865 26.3139 25.3269 26.6673 25.3269C27.0208 25.3269 27.3597 25.1865 27.6097 24.9366C27.8596 24.6866 28 24.3477 28 23.9942V13.3993Z"
      fill="#C8FAD6"
    />
  </svg>
);

const DownArrowIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.6058 12.3942C27.4819 12.2693 27.3345 12.1702 27.1721 12.1025C27.0097 12.0348 26.8355 12 26.6596 12C26.4837 12 26.3095 12.0348 26.1471 12.1025C25.9847 12.1702 25.8373 12.2693 25.7134 12.3942L14.6654 23.4555V16.0058C14.6654 15.6523 14.525 15.3134 14.275 15.0634C14.0251 14.8135 13.6861 14.6731 13.3327 14.6731C12.9792 14.6731 12.6403 14.8135 12.3903 15.0634C12.1404 15.3134 12 15.6523 12 16.0058V26.6673C12 27.0208 12.1404 27.3597 12.3903 27.6097C12.6403 27.8596 12.9792 28 13.3327 28H23.9942C24.3477 28 24.6866 27.8596 24.9366 27.6097C25.1865 27.3597 25.3269 27.0208 25.3269 26.6673C25.3269 26.3139 25.1865 25.9749 24.9366 25.725C24.6866 25.475 24.3477 25.3346 23.9942 25.3346H16.5445L27.6058 14.2866C27.7307 14.1627 27.8298 14.0153 27.8975 13.8529C27.9652 13.6905 28 13.5163 28 13.3404C28 13.1645 27.9652 12.9903 27.8975 12.8279C27.8298 12.6655 27.7307 12.5181 27.6058 12.3942Z"
      fill="#FFF5CC"
    />
  </svg>
);

const SmallUpArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.0015 5.83333C17.0094 5.77527 17.0094 5.7164 17.0015 5.65833C16.9942 5.60941 16.9802 5.56173 16.9598 5.51667C16.9378 5.47594 16.9127 5.43694 16.8848 5.4C16.8531 5.34729 16.8138 5.29956 16.7681 5.25833L16.6681 5.2C16.62 5.16413 16.5666 5.13601 16.5098 5.11667H16.3431C16.2923 5.0675 16.2331 5.02796 16.1681 5H12.0015C11.7805 5 11.5685 5.0878 11.4122 5.24408C11.2559 5.40036 11.1681 5.61232 11.1681 5.83333C11.1681 6.05435 11.2559 6.26631 11.4122 6.42259C11.5685 6.57887 11.7805 6.66667 12.0015 6.66667H14.3598L11.0265 10.5917L7.42647 8.45C7.25595 8.34858 7.05485 8.31133 6.85932 8.34493C6.66379 8.37854 6.48667 8.4808 6.3598 8.63333L2.19313 13.6333C2.12297 13.7175 2.0701 13.8148 2.03756 13.9194C2.00502 14.0241 1.99346 14.1342 2.00352 14.2433C2.01358 14.3525 2.04508 14.4585 2.09621 14.5555C2.14733 14.6525 2.21708 14.7384 2.30147 14.8083C2.45139 14.9326 2.64009 15.0004 2.8348 15C2.95723 15.0002 3.07819 14.9734 3.18909 14.9216C3.3 14.8697 3.39811 14.7941 3.47647 14.7L7.1848 10.25L10.7431 12.3833C10.9119 12.4834 11.1106 12.5208 11.3042 12.4888C11.4978 12.4567 11.6739 12.3574 11.8015 12.2083L15.3348 8.08333V10C15.3348 10.221 15.4226 10.433 15.5789 10.5893C15.7352 10.7455 15.9471 10.8333 16.1681 10.8333C16.3891 10.8333 16.6011 10.7455 16.7574 10.5893C16.9137 10.433 17.0015 10.221 17.0015 10V5.83333Z"
      fill="#004B50"
    />
  </svg>
);

const SmallDownArrowIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 10.337C18 10.116 17.9064 9.904 17.7397 9.74772C17.573 9.59144 17.3469 9.50364 17.1112 9.50364C16.8754 9.50364 16.6494 9.59144 16.4827 9.74772C16.316 9.904 16.2223 10.116 16.2223 10.337V12.2536L12.4537 8.08698C12.3177 7.93787 12.1298 7.83856 11.9233 7.80655C11.7168 7.77454 11.5049 7.81187 11.3249 7.91198L7.52962 10.087L3.57433 5.63698C3.49963 5.55271 3.40796 5.48307 3.30455 5.43202C3.20114 5.38097 3.08802 5.34952 2.97164 5.33946C2.85527 5.3294 2.73792 5.34093 2.6263 5.37339C2.51467 5.40585 2.41096 5.45861 2.32109 5.52865C2.23121 5.59868 2.15693 5.68463 2.10248 5.78159C2.04803 5.87854 2.01449 5.9846 2.00376 6.09371C1.99303 6.20282 2.00533 6.31284 2.03995 6.41749C2.07457 6.52215 2.13084 6.61938 2.20554 6.70365L6.64968 11.7036C6.78499 11.8562 6.97391 11.9584 7.18246 11.992C7.39101 12.0256 7.60551 11.9884 7.78738 11.887L11.5916 9.74531L15.1469 13.6703H12.667C12.4313 13.6703 12.2052 13.7581 12.0385 13.9144C11.8719 14.0707 11.7782 14.2826 11.7782 14.5036C11.7782 14.7247 11.8719 14.9366 12.0385 15.0929C12.2052 15.2492 12.4313 15.337 12.667 15.337H17.1112C17.2206 15.3345 17.3287 15.3147 17.4312 15.2786L17.5556 15.212C17.6019 15.1901 17.6465 15.165 17.6889 15.137C17.7376 15.0958 17.7795 15.048 17.8133 14.9953C17.8431 14.9584 17.8699 14.9194 17.8933 14.8786C17.9151 14.8336 17.93 14.7859 17.9378 14.737C17.9738 14.6635 17.9949 14.5844 18 14.5036V10.337Z"
      fill="#7A4100"
    />
  </svg>
);

const IncreaseChart = ({ animate = true }: { animate?: boolean }) => (
  <motion.svg
    width="320"
    height="133"
    viewBox="0 0 320 133"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="increaseGradient" x1="0" y1="12.0391" x2="0" y2="131.34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#007867" stopOpacity="0.16"/>
        <stop offset="1" stopColor="#007867" stopOpacity="0"/>
      </linearGradient>
      <clipPath id="increaseClip">
        <rect width="320" height="133" fill="white"/>
      </clipPath>
    </defs>
    <g clipPath="url(#increaseClip)">
      <motion.path
        d="M0 131.34V74.2831C2.08173 72.5284 20.7005 57.0411 24.6154 53.5351C28.5303 50.029 41.0431 30.5171 49.2308 30.1936C57.4184 29.8701 69.9313 48.0839 73.8462 51.5899C77.761 55.096 93.8259 70.8031 98.4615 74.2831C103.097 77.763 117.372 85.3164 123.077 88.5473C128.782 91.7782 141.497 99.1443 147.692 102.163C153.887 105.182 164.103 112.537 172.308 112.537C180.513 112.537 192.427 105.657 196.923 102.163C201.419 98.6696 218.602 77.6481 221.538 74.2831C224.475 70.918 241.588 49.2419 246.154 45.7546C250.719 42.2672 264.574 39.6962 270.769 36.6773C276.964 33.6585 289.272 24.8241 295.385 21.7647C301.498 18.7053 316.619 13.375 320 12.0391V131.34H0Z"
        fill="url(#increaseGradient)"
        initial={animate ? { opacity: 0 } : { opacity: 1 }}
        animate={animate ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.path
        d="M0 74.2831C2.08173 72.5284 20.7005 57.0411 24.6154 53.5351C28.5303 50.029 41.0431 30.5171 49.2308 30.1936C57.4184 29.8701 69.9313 48.0839 73.8462 51.5899C77.761 55.096 93.8259 70.8031 98.4615 74.2831C103.097 77.763 117.372 85.3164 123.077 88.5473C128.782 91.7782 141.497 99.1444 147.692 102.163C153.887 105.182 164.103 112.537 172.308 112.537C180.513 112.537 192.427 105.657 196.923 102.163C201.419 98.6697 218.602 77.6481 221.538 74.2831C224.475 70.918 241.588 49.2419 246.154 45.7546C250.719 42.2672 264.574 39.6962 270.769 36.6773C276.964 33.6585 289.272 24.8241 295.385 21.7647C301.498 18.7053 316.619 13.375 320 12.0391"
        stroke="#007867"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
    </g>
  </motion.svg>
);

const DecreaseChart = ({ animate = true }: { animate?: boolean }) => (
  <motion.svg
    width="320"
    height="134"
    viewBox="0 0 320 134"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="decreaseGradient" x1="6.29883" y1="25.7734" x2="6.29883" y2="125.67" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B76E00" stopOpacity="0.16"/>
        <stop offset="1" stopColor="#B76E00" stopOpacity="0"/>
      </linearGradient>
      <clipPath id="decreaseClip">
        <rect width="320" height="134" fill="white"/>
      </clipPath>
    </defs>
    <g clipPath="url(#decreaseClip)">
      <motion.path
        d="M6.29883 125.67V103.83C7.76245 102.304 27.5295 81.8683 30.2358 78.8699C32.9422 75.8714 46.224 51.1784 54.1728 50.7899C62.1217 50.4013 75.4035 73.5315 78.1098 76.5299C80.8162 79.5283 97.5619 106.972 102.047 103.83C106.532 100.688 122.616 46.1179 125.984 42.9899C129.352 39.8618 144.861 56.3194 149.921 59.3699C154.981 62.4203 165.879 71.8499 173.858 71.8499C181.837 71.8499 194.56 62.4793 197.795 59.3699C201.03 56.2604 214.283 24.2522 221.732 25.8299C229.181 27.4075 241.092 66.3777 245.669 69.5099C250.246 72.642 264.546 61.6403 269.606 58.5899C274.666 55.5394 288.582 43.7212 293.543 40.6499C298.504 37.5785 314.587 30.3637 317.48 28.9499V125.67H6.29883Z"
        fill="url(#decreaseGradient)"
        initial={animate ? { opacity: 0 } : { opacity: 1 }}
        animate={animate ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.path
        d="M6.29883 103.83C7.76245 102.304 27.5295 81.8683 30.2358 78.8699C32.9422 75.8714 46.224 51.1784 54.1728 50.7899C62.1217 50.4013 75.4035 73.5314 78.1099 76.5299C80.8162 79.5283 97.5619 106.972 102.047 103.83C106.532 100.688 122.616 46.1179 125.984 42.9899C129.352 39.8618 144.861 56.3194 149.921 59.3699C154.981 62.4203 165.879 71.8499 173.858 71.8499C181.837 71.8499 194.56 62.4793 197.795 59.3699C201.03 56.2604 214.283 24.2522 221.732 25.8299C229.181 27.4075 241.092 66.3777 245.669 69.5099C250.246 72.642 264.546 61.6403 269.606 58.5899C274.666 55.5394 288.582 43.7212 293.543 40.6499C298.504 37.5785 314.587 30.3637 317.48 28.9499"
        stroke="#B76E00"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
    </g>
  </motion.svg>
);

export interface CampaignPerformanceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof campaignCardVariants> {
  title: string;
  value: string | number;
  label?: string;
  changePercent: string;
  compareText?: string;
  animate?: boolean;
}

const CampaignPerformanceCard = React.forwardRef<HTMLDivElement, CampaignPerformanceCardProps>(
  ({ 
    className, 
    variant = "increase", 
    title, 
    value, 
    label = "redeemed", 
    changePercent, 
    compareText = "than last month",
    animate = true,
    ...props 
  }, ref) => {
    const isIncrease = variant === "increase";
    const textColor = isIncrease ? "#007867" : "#7A4100";
    const secondaryTextColor = isIncrease ? "#004B50" : "#7A4100";
    const iconBgColor = isIncrease ? "#007867" : "#B76E00";

    return (
      <div
        ref={ref}
        className={cn(campaignCardVariants({ variant, className }))}
        {...props}
      >
        <div className="flex p-4 flex-col items-start gap-2 w-full">
          {/* Header with title and arrow icon */}
          <div className="flex items-start gap-2 w-full">
            <div className="flex py-1 items-center gap-2 flex-1">
              <h3 
                className="flex-1 text-base font-bold leading-7"
                style={{ 
                  fontFamily: 'var(--font-nunito)',
                  color: textColor
                }}
              >
                {title}
              </h3>
            </div>
            <div 
              className="flex w-10 h-10 items-center justify-center rounded-full"
              style={{ backgroundColor: iconBgColor }}
            >
              {isIncrease ? <UpArrowIcon /> : <DownArrowIcon />}
            </div>
          </div>

          {/* Value and label */}
          <div className="flex items-end gap-1 w-full">
            <span 
              className="text-[32px] font-bold leading-10"
              style={{ 
                fontFamily: 'var(--font-nunito)',
                color: textColor
              }}
            >
              {value}{" "}
            </span>
            <div className="flex pb-1 justify-center items-center gap-2 flex-1">
              <span 
                className="flex-1 text-sm font-bold leading-5 tracking-[0.25px]"
                style={{ 
                  fontFamily: 'var(--font-nunito)',
                  color: textColor
                }}
              >
                {label}
              </span>
            </div>
          </div>

          {/* Change indicator */}
          <div className="flex items-center content-center gap-1 flex-wrap w-full">
            <div className="flex items-center gap-1">
              {isIncrease ? <SmallUpArrowIcon /> : <SmallDownArrowIcon />}
              <div className="flex py-1 items-center gap-2">
                <span 
                  className="text-sm font-bold leading-5 tracking-[0.25px]"
                  style={{ 
                    fontFamily: 'var(--font-nunito)',
                    color: secondaryTextColor
                  }}
                >
                  {changePercent}
                </span>
              </div>
            </div>
            <div className="flex py-1 items-center gap-2 flex-1 opacity-80">
              <span 
                className="flex h-[16.67px] flex-col justify-center flex-1 text-sm font-normal leading-4 tracking-[0.25px]"
                style={{ 
                  fontFamily: 'var(--font-nunito)',
                  color: secondaryTextColor
                }}
              >
                {compareText}
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex h-[133px] flex-col items-start gap-2 w-full">
          {isIncrease ? (
            <IncreaseChart animate={animate} />
          ) : (
            <DecreaseChart animate={animate} />
          )}
        </div>
      </div>
    );
  }
);

CampaignPerformanceCard.displayName = "CampaignPerformanceCard";

export { CampaignPerformanceCard, campaignCardVariants };
