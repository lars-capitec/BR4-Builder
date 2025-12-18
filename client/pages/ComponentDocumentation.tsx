import React from 'react';
import { PrimaryButton } from '../components/ui/primary-button';
import { TonalButton } from '../components/ui/tonal-button';
import { OutlinedButton } from '../components/ui/outlined-button';
import { TextButton } from '../components/ui/text-button';
import { TextInput } from '../components/ui/text-input';
import { CampaignPerformanceCard } from '../components/ui/campaign-performance-card';
import { RewardsBalanceIndicator } from '../components/ui/rewards-balance-indicator';
import { StatusChip, type CampaignStatus } from '../components/ui/status-chip';
import { CampaignListItem } from '../components/ui/campaign-list-item';
import { CampaignTable, type Campaign } from '../components/ui/campaign-table';
import { EngagementHeatmap, type EngagementData } from '../components/ui/engagement-heatmap';
import { SuccessIcon } from '../components/ui/success-icon';

// Icon component placeholder (using the same icon from the Figma)
const IconPlaceholder = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.24004 11.6932H10.6088V11.2368C10.6088 10.7883 10.5676 10.4583 10.4852 10.2469C10.4029 10.0335 10.2305 9.85566 9.96829 9.7134C9.70603 9.57113 9.37334 9.5 8.9702 9.5C8.67327 9.5 8.40993 9.54643 8.18019 9.6393C7.95261 9.73019 7.7738 9.85566 7.64375 10.0157C7.51588 10.1758 7.43894 10.3427 7.41293 10.5166C7.38692 10.6885 7.37391 10.9473 7.37391 11.2931V12.695C7.37391 13.1653 7.41618 13.518 7.50071 13.7531C7.58523 13.9863 7.75754 14.169 8.01763 14.3014C8.27772 14.4338 8.60825 14.5 9.00921 14.5C9.39501 14.5 9.71904 14.422 9.98129 14.2659C10.2457 14.1098 10.4159 13.928 10.4917 13.7205C10.5697 13.513 10.6088 13.1613 10.6088 12.6654V12.4787H9.24004V13.0803C9.24004 13.3431 9.22379 13.5101 9.19128 13.5812C9.16093 13.6523 9.09483 13.6879 8.99296 13.6879C8.88676 13.6879 8.81848 13.6523 8.78814 13.5812C8.7578 13.5101 8.74263 13.3579 8.74263 13.1248V10.896C8.74263 10.6529 8.7578 10.4949 8.78814 10.4218C8.81848 10.3486 8.89001 10.3121 9.00271 10.3121C9.10241 10.3121 9.16635 10.3427 9.19453 10.404C9.22487 10.4632 9.24004 10.6144 9.24004 10.8574V11.6932Z" fill="currentColor"/>
    <path d="M4.56006 14.3992H5.92877V9.60077H4.56006V14.3992Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15.0953 12.4105C15.0953 12.8926 15.0823 13.2344 15.0563 13.436C15.0324 13.6355 14.9544 13.8183 14.8222 13.9843C14.6921 14.1503 14.5155 14.2777 14.2923 14.3666C14.069 14.4555 13.8089 14.5 13.512 14.5C13.2302 14.5 12.9766 14.4585 12.7512 14.3755C12.528 14.2906 12.3481 14.1641 12.2116 13.9961C12.075 13.8282 11.9937 13.6454 11.9677 13.4478C11.9417 13.2502 11.9287 12.9045 11.9287 12.4105V11.5895C11.9287 11.1074 11.9406 10.7665 11.9645 10.567C11.9905 10.3654 12.0685 10.1817 12.1986 10.0157C12.3308 9.84973 12.5085 9.72229 12.7317 9.63337C12.955 9.54446 13.2151 9.5 13.512 9.5C13.7938 9.5 14.0463 9.54248 14.2695 9.62745C14.4949 9.71043 14.6759 9.8359 14.8124 10.0039C14.949 10.1718 15.0303 10.3546 15.0563 10.5522C15.0823 10.7498 15.0953 11.0955 15.0953 11.5895V12.4105ZM13.7266 10.8337C13.7266 10.6105 13.7125 10.4682 13.6843 10.4069C13.6583 10.3437 13.603 10.3121 13.5185 10.3121C13.447 10.3121 13.3917 10.3378 13.3527 10.3892C13.3158 10.4385 13.2974 10.5867 13.2974 10.8337V13.0744C13.2974 13.353 13.3093 13.5249 13.3332 13.5901C13.3592 13.6553 13.4177 13.6879 13.5087 13.6879C13.6019 13.6879 13.6615 13.6504 13.6876 13.5753C13.7136 13.5002 13.7266 13.3214 13.7266 13.0388V10.8337Z" fill="currentColor"/>
    <path d="M18.2291 14.3992H19.4287V9.60077H18.2843V11.7614L17.5171 9.60077H16.3727V14.3992H17.5171V12.2178L18.2291 14.3992Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0.25C5.51065 0.25 0.25 5.51065 0.25 12C0.25 18.4893 5.51065 23.75 12 23.75C18.4893 23.75 23.75 18.4893 23.75 12C23.75 5.51065 18.4893 0.25 12 0.25ZM12 1.75C17.6609 1.75 22.25 6.33908 22.25 12C22.25 17.6609 17.6609 22.25 12 22.25C6.33908 22.25 1.75 17.6609 1.75 12C1.75 6.33908 6.33908 1.75 12 1.75Z" fill="currentColor"/>
  </svg>
);

const ComponentDocumentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="/component-documentation"
              className="text-lg font-semibold text-[#2F70EF] hover:underline"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Component Library
            </a>
            <span className="text-[#A1ACBA]">•</span>
            <a
              href="/style-guide"
              className="text-lg font-semibold text-[#4A535C] hover:text-[#2F70EF] hover:underline transition-colors"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Style Guide
            </a>
          </div>
          <h1 className="text-4xl font-bold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Component Library
          </h1>
          <p className="text-lg text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
            A comprehensive design system with reusable components for consistent UI development.
          </p>
        </div>

        {/* Navigation */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Buttons
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#primary-buttons" className="text-[#2F70EF] hover:underline">
                    Primary Buttons
                  </a>
                </li>
                <li>
                  <a href="#tonal-buttons" className="text-[#2F70EF] hover:underline">
                    Tonal Buttons
                  </a>
                </li>
                <li>
                  <a href="#outlined-buttons" className="text-[#2F70EF] hover:underline">
                    Outlined Buttons
                  </a>
                </li>
                <li>
                  <a href="#text-buttons" className="text-[#2F70EF] hover:underline">
                    Text Buttons
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Forms
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#text-inputs" className="text-[#2F70EF] hover:underline">
                    Text Inputs
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Data Display
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#campaign-performance-cards" className="text-[#2F70EF] hover:underline">
                    Campaign Performance Cards
                  </a>
                </li>
                <li>
                  <a href="#rewards-balance-indicators" className="text-[#2F70EF] hover:underline">
                    Rewards Balance Indicators
                  </a>
                </li>
                <li>
                  <a href="#status-chips" className="text-[#2F70EF] hover:underline">
                    Status Chips
                  </a>
                </li>
                <li>
                  <a href="#campaign-list-items" className="text-[#2F70EF] hover:underline">
                    Campaign List Items
                  </a>
                </li>
                <li>
                  <a href="#campaign-table" className="text-[#2F70EF] hover:underline">
                    Campaign Table
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Primary Buttons */}
        <section id="primary-buttons" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Primary Buttons
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            High-emphasis buttons with solid background for primary actions.
          </p>

          <h3 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Default Size (48px height)
          </h3>
          
          <div className="space-y-12">
            {/* Text Only */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Text Only
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="default">Label</PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="default" className="hover:before:bg-[rgba(0,51,160,0.12)]">Label</PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="default" disabled>Label</PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Leading Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Leading Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="leading">
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton 
                    size="default" 
                    icon={<IconPlaceholder size={24} />} 
                    iconPosition="leading"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="leading" disabled>
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Trailing Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Trailing Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="trailing">
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton 
                    size="default" 
                    icon={<IconPlaceholder size={24} />} 
                    iconPosition="trailing"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="trailing" disabled>
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Small Size Buttons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Small Size (32px height)
          </h2>
          
          <div className="space-y-12">
            {/* Text Only */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Text Only
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="small">Label</PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="small" className="hover:before:bg-[rgba(0,51,160,0.12)]">Label</PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="small" disabled>Label</PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Leading Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Leading Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="leading">
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton 
                    size="small" 
                    icon={<IconPlaceholder size={16} />} 
                    iconPosition="leading"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="leading" disabled>
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Trailing Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Trailing Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="trailing">
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton 
                    size="small" 
                    icon={<IconPlaceholder size={16} />} 
                    iconPosition="trailing"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <PrimaryButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="trailing" disabled>
                    Label
                  </PrimaryButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tonal Button Sections */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Tonal Buttons - Default Size (48px height)
          </h2>

          <div className="space-y-12">
            {/* Text Only */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Text Only
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="default">Label</TonalButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="default" className="hover:before:bg-[rgba(0,51,160,0.12)]">Label</TonalButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="default" disabled>Label</TonalButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Leading Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Leading Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="leading">
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton
                    size="default"
                    icon={<IconPlaceholder size={24} />}
                    iconPosition="leading"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="leading" disabled>
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Trailing Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Trailing Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="trailing">
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton
                    size="default"
                    icon={<IconPlaceholder size={24} />}
                    iconPosition="trailing"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="default" icon={<IconPlaceholder size={24} />} iconPosition="trailing" disabled>
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tonal Small Size Buttons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Tonal Buttons - Small Size (32px height)
          </h2>

          <div className="space-y-12">
            {/* Text Only */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Text Only
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="small">Label</TonalButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="small" className="hover:before:bg-[rgba(0,51,160,0.12)]">Label</TonalButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="small" disabled>Label</TonalButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Leading Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Leading Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="leading">
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton
                    size="small"
                    icon={<IconPlaceholder size={16} />}
                    iconPosition="leading"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="leading" disabled>
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Trailing Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Trailing Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="trailing">
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton
                    size="small"
                    icon={<IconPlaceholder size={16} />}
                    iconPosition="trailing"
                    className="hover:before:bg-[rgba(0,51,160,0.12)]"
                  >
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TonalButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="trailing" disabled>
                    Label
                  </TonalButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Text Buttons */}
        <section id="text-buttons" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Text Buttons
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Low-emphasis buttons with transparent background for secondary actions.
          </p>

          <h3 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Default Size (48px height)
          </h3>

          <div className="space-y-12">
            {/* Text Only */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Text Only
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="default">Label</TextButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="default" className="hover:bg-[rgba(47,112,239,0.08)]">Label</TextButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="default" disabled>Label</TextButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Leading Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Leading Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="default" icon={<IconPlaceholder size={20} />} iconPosition="leading">
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton
                    size="default"
                    icon={<IconPlaceholder size={20} />}
                    iconPosition="leading"
                    className="hover:bg-[rgba(47,112,239,0.08)]"
                  >
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="default" icon={<IconPlaceholder size={20} />} iconPosition="leading" disabled>
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Trailing Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Trailing Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="default" icon={<IconPlaceholder size={20} />} iconPosition="trailing">
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton
                    size="default"
                    icon={<IconPlaceholder size={20} />}
                    iconPosition="trailing"
                    className="hover:bg-[rgba(47,112,239,0.08)]"
                  >
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="default" icon={<IconPlaceholder size={20} />} iconPosition="trailing" disabled>
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Text Buttons Small Size */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Text Buttons - Small Size (32px height)
          </h2>

          <div className="space-y-12">
            {/* Text Only */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Text Only
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="small">Label</TextButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="small" className="hover:bg-[rgba(47,112,239,0.08)]">Label</TextButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="small" disabled>Label</TextButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Leading Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Leading Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="leading">
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton
                    size="small"
                    icon={<IconPlaceholder size={16} />}
                    iconPosition="leading"
                    className="hover:bg-[rgba(47,112,239,0.08)]"
                  >
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="leading" disabled>
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>

            {/* Trailing Icon */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Trailing Icon
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="trailing">
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Enabled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton
                    size="small"
                    icon={<IconPlaceholder size={16} />}
                    iconPosition="trailing"
                    className="hover:bg-[rgba(47,112,239,0.08)]"
                  >
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Hover</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TextButton size="small" icon={<IconPlaceholder size={16} />} iconPosition="trailing" disabled>
                    Label
                  </TextButton>
                  <span className="text-sm text-[#4A535C]">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Usage Examples
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <pre className="text-sm text-[#1F272E] overflow-x-auto" style={{ fontFamily: 'monospace' }}>
{`// Primary Button - Basic usage
<PrimaryButton>Label</PrimaryButton>

// Primary Button - Small size
<PrimaryButton size="small">Label</PrimaryButton>

// Primary Button - With leading icon
<PrimaryButton icon={<Icon />} iconPosition="leading">
  Label
</PrimaryButton>

// Primary Button - Disabled state
<PrimaryButton disabled>Label</PrimaryButton>

// Tonal Button - Basic usage
<TonalButton>Label</TonalButton>

// Tonal Button - Small size
<TonalButton size="small">Label</TonalButton>

// Tonal Button - With trailing icon
<TonalButton icon={<Icon />} iconPosition="trailing">
  Label
</TonalButton>

// Tonal Button - Disabled state
<TonalButton disabled>Label</TonalButton>

// Outlined Button - Basic usage
<OutlinedButton>Label</OutlinedButton>

// Outlined Button - Small size
<OutlinedButton size="small">Save</OutlinedButton>

// Outlined Button - With trailing icon
<OutlinedButton icon={<Icon />} iconPosition="trailing">
  Continue
</OutlinedButton>

// Outlined Button - Disabled state
<OutlinedButton disabled>Label</OutlinedButton>

// Text Button - Basic usage
<TextButton>Label</TextButton>

// Text Button - Small size
<TextButton size="small">Label</TextButton>

// Text Button - With leading icon
<TextButton icon={<Icon />} iconPosition="leading">
  Label
</TextButton>

// Text Button - Disabled state
<TextButton disabled>Label</TextButton>`}
            </pre>
          </div>
        </section>

        {/* Text Inputs */}
        <section id="text-inputs" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Text Inputs
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Form input components with comprehensive state management for data collection and user interactions.
          </p>

          {/* Default State Examples */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Default States
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Enabled</h4>
                  <TextInput
                    label="Label"
                    hint="Hint description text"
                    placeholder="Enter text..."
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Filled</h4>
                  <TextInput
                    label="Label"
                    hint="Hint description text"
                    value="Input text"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Hover/Focus</h4>
                  <TextInput
                    label="Label"
                    hint="Hint description text"
                    placeholder="Hover or click to see focus state"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                State Variants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#A5132A]">Error State</h4>
                  <TextInput
                    label="Label"
                    error="Error description text"
                    value="Invalid input"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#6D7885]">Disabled State</h4>
                  <TextInput
                    label="Label"
                    hint="Hint description text"
                    value="Disabled input"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Read-only State</h4>
                  <TextInput
                    label="Label"
                    hint="Hint description text"
                    value="Read-only input"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Optional Field</h4>
                  <TextInput
                    label="Label"
                    hint="Hint description text"
                    placeholder="Optional field..."
                    optional
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Different Input Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Email</h4>
                  <TextInput
                    type="email"
                    label="Email Address"
                    hint="Enter your email address"
                    placeholder="user@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Password</h4>
                  <TextInput
                    type="password"
                    label="Password"
                    hint="Must be at least 8 characters"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">Number</h4>
                  <TextInput
                    type="number"
                    label="Amount"
                    hint="Enter a numeric value"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#4A535C]">URL</h4>
                  <TextInput
                    type="url"
                    label="Website"
                    hint="Enter a valid URL"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Basic text input
<TextInput
  label="Full Name"
  placeholder="Enter your full name"
  hint="First and last name"
/>

// Email input with validation
<TextInput
  type="email"
  label="Email Address"
  placeholder="user@example.com"
  error={errors.email}
  onChange={(e) => handleEmailChange(e.target.value)}
/>

// Required field
<TextInput
  label="Company Name"
  placeholder="Enter company name"
  required
/>

// Optional field
<TextInput
  label="Middle Name"
  placeholder="Enter middle name"
  optional
/>

// Read-only field
<TextInput
  label="User ID"
  value="12345"
  readOnly
  hint="This field cannot be edited"
/>

// Disabled field
<TextInput
  label="Account Status"
  value="Active"
  disabled
/>

// With error state
<TextInput
  label="Phone Number"
  value="+1234567890"
  error="Please enter a valid phone number"
/>`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Dimensions
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Height: 48px</li>
                    <li>• Border radius: 12px</li>
                    <li>• Padding: 16px horizontal</li>
                    <li>• Border width: 1px (3px when focused)</li>
                    <li>• Min width: 120px</li>
                    <li>• Max width: 600px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Typography
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Font family: Nunito Sans</li>
                    <li>• Label: 14px, semibold</li>
                    <li>• Input text: 16px, regular</li>
                    <li>• Hint text: 12px, semibold</li>
                    <li>• Letter spacing: 0.25px (label), 0.4px (hint)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Colors - Borders
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Default: #A1ACBA</li>
                    <li>• Hover: #4A535C</li>
                    <li>• Focus: #2F70EF</li>
                    <li>• Error: #A5132A</li>
                    <li>• Disabled: rgba(31,39,46,0.12)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Colors - Backgrounds
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Default: #FFFFFF</li>
                    <li>• Error: #FFF8F7</li>
                    <li>• Read-only: #F8FAFD</li>
                    <li>• Text: #1F272E</li>
                    <li>• Label: #4A535C</li>
                    <li>• Hint: #6D7885</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Performance Cards */}
        <section id="campaign-performance-cards" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Campaign Performance Cards
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Data-driven cards for displaying campaign performance metrics with visual indicators and subtle animations.
          </p>

          <div className="space-y-12">
            {/* Card Variants */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Variants
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Increase Variant (Green)
                  </h4>
                  <div className="max-w-sm">
                    <CampaignPerformanceCard
                      variant="increase"
                      title="This coffee is on us ❤️"
                      value="57"
                      changePercent="+2.6%"
                      animate={false}
                    />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Used to show positive campaign performance with green color scheme and upward trend indicators.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Decrease Variant (Orange)
                  </h4>
                  <div className="max-w-sm">
                    <CampaignPerformanceCard
                      variant="decrease"
                      title="Buy 5 cappuccinos and get 1 free"
                      value="31"
                      changePercent="-0.5%"
                      animate={false}
                    />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Used to show declining campaign performance with orange color scheme and downward trend indicators.
                  </p>
                </div>
              </div>
            </div>

            {/* With Animation */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                With Animation
              </h3>
              <p className="text-[#4A535C] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                The chart features a subtle animation on reveal, drawing the line path and fading in the gradient fill.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Animated Increase Card
                  </h4>
                  <div className="max-w-sm">
                    <CampaignPerformanceCard
                      variant="increase"
                      title="Weekly Coffee Rewards"
                      value="125"
                      changePercent="+15.3%"
                      animate={true}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Animated Decrease Card
                  </h4>
                  <div className="max-w-sm">
                    <CampaignPerformanceCard
                      variant="decrease"
                      title="Monthly Stamp Collection"
                      value="89"
                      changePercent="-3.2%"
                      animate={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Basic increase card
<CampaignPerformanceCard
  variant="increase"
  title="This coffee is on us ❤️"
  value="57"
  changePercent="+2.6%"
/>

// Basic decrease card
<CampaignPerformanceCard
  variant="decrease"
  title="Buy 5 cappuccinos and get 1 free"
  value="31"
  changePercent="-0.5%"
/>

// With custom label and comparison text
<CampaignPerformanceCard
  variant="increase"
  title="Weekend Special Offers"
  value="342"
  label="claimed"
  changePercent="+18.7%"
  compareText="than last weekend"
/>

// Disable animation
<CampaignPerformanceCard
  variant="increase"
  title="Daily Rewards"
  value="95"
  changePercent="+5.2%"
  animate={false}
/>

// With custom styling
<CampaignPerformanceCard
  variant="decrease"
  title="Loyalty Card Signups"
  value="47"
  changePercent="-1.8%"
  className="max-w-md mx-auto"
/>`}
                </pre>
              </div>
            </div>

            {/* Design Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Card Dimensions
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Border radius: 16px</li>
                    <li>• Content padding: 16px</li>
                    <li>• Chart height: 133px</li>
                    <li>• Arrow icon size: 40x40px</li>
                    <li>• Small arrow icon: 20x20px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Typography
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Font family: Nunito Sans</li>
                    <li>• Title: 16px, bold</li>
                    <li>• Value: 32px, bold</li>
                    <li>• Label: 14px, bold</li>
                    <li>• Change text: 14px, normal</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Increase Variant Colors
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Background: Green gradient</li>
                    <li>• Primary text: #007867</li>
                    <li>• Secondary text: #004B50</li>
                    <li>• Icon background: #007867</li>
                    <li>• Chart color: #007867</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Decrease Variant Colors
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Background: Orange gradient</li>
                    <li>• Primary text: #7A4100</li>
                    <li>�� Secondary text: #7A4100</li>
                    <li>• Icon background: #B76E00</li>
                    <li>• Chart color: #B76E00</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Animation Properties
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Chart line draws over 1.2s</li>
                    <li>• Gradient fill fades in over 0.8s</li>
                    <li>• 0.3s delay for line animation</li>
                    <li>• 0.2s delay for fill animation</li>
                    <li>• Easing: ease-out</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Props Interface
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• variant: "increase" | "decrease"</li>
                    <li>• title: string</li>
                    <li>• value: string | number</li>
                    <li>• label?: string (default: "redeemed")</li>
                    <li>• changePercent: string</li>
                    <li>• compareText?: string</li>
                    <li>• animate?: boolean (default: true)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rewards Balance Indicators */}
        <section id="rewards-balance-indicators" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Rewards Balance Indicators
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Circular progress indicators for displaying rewards balance with visual warnings when nearing completion.
          </p>

          <div className="space-y-12">
            {/* Size Variants */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Size Variants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Large Size (106px)
                  </h4>
                  <div className="flex items-center gap-6">
                    <RewardsBalanceIndicator
                      size="large"
                      percentage={64}
                      animate={false}
                    />
                    <div className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                      <p>64% complete</p>
                      <p className="text-xs opacity-70">Normal state</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Small Size (77px)
                  </h4>
                  <div className="flex items-center gap-6">
                    <RewardsBalanceIndicator
                      size="small"
                      percentage={64}
                      animate={false}
                    />
                    <div className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                      <p>64% complete</p>
                      <p className="text-xs opacity-70">Normal state</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pre-launch Variant */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Pre-launch Variant
              </h3>
              <p className="text-[#4A535C] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Shows available rewards for campaigns that haven't started yet. The count is dynamic and comes from API calls, with supporting text from content tokens.
              </p>
              <div className="flex items-center gap-6">
                <RewardsBalanceIndicator
                  variant="pre-launch"
                  availableRewards={500}
                />
                <div className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  <p>500 rewards available</p>
                  <p className="text-xs opacity-70">Pre-launch state</p>
                </div>
              </div>
            </div>

            {/* State Variants */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Progress States
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Empty (0%)
                  </h4>
                  <div className="flex justify-center">
                    <RewardsBalanceIndicator
                      size="large"
                      percentage={0}
                      animate={false}
                    />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    No rewards claimed yet
                  </p>
                </div>

                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Progress (45%)
                  </h4>
                  <div className="flex justify-center">
                    <RewardsBalanceIndicator
                      size="large"
                      percentage={45}
                      animate={false}
                    />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Normal yellow-orange
                  </p>
                </div>

                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Warning (90%)
                  </h4>
                  <div className="flex justify-center">
                    <RewardsBalanceIndicator
                      size="large"
                      percentage={90}
                      animate={false}
                    />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Yellow-red warning
                  </p>
                </div>

                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Complete (100%)
                  </h4>
                  <div className="flex justify-center">
                    <RewardsBalanceIndicator
                      size="large"
                      percentage={100}
                      animate={false}
                    />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    All rewards claimed
                  </p>
                </div>
              </div>
            </div>

            {/* With Animation */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Animated Examples
              </h3>
              <p className="text-[#4A535C] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                The progress ring animates smoothly when the percentage changes, with a subtle ease-out transition.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Normal Progress Animation
                  </h4>
                  <div className="flex items-center gap-6">
                    <RewardsBalanceIndicator
                      size="large"
                      percentage={75}
                      animate={true}
                    />
                    <div className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                      <p>75% complete</p>
                      <p className="text-xs opacity-70">Smooth animation</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Warning State Animation
                  </h4>
                  <div className="flex items-center gap-6">
                    <RewardsBalanceIndicator
                      size="large"
                      percentage={95}
                      animate={true}
                    />
                    <div className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                      <p>95% complete</p>
                      <p className="text-xs opacity-70">Warning gradient</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Progress variant - Basic usage
<RewardsBalanceIndicator percentage={64} />

// Large size (default)
<RewardsBalanceIndicator
  variant="progress"
  size="large"
  percentage={45}
/>

// Small size
<RewardsBalanceIndicator
  variant="progress"
  size="small"
  percentage={75}
/>

// Empty state (no rewards claimed)
<RewardsBalanceIndicator
  variant="progress"
  percentage={0}
/>

// Warning state (near completion)
<RewardsBalanceIndicator
  variant="progress"
  percentage={90}
/>

// Pre-launch variant - Shows available rewards
<RewardsBalanceIndicator
  variant="pre-launch"
  availableRewards={500}
/>

// Pre-launch with dynamic API data
<RewardsBalanceIndicator
  variant="pre-launch"
  availableRewards={campaignData.availableRewards}
/>

// Pre-launch using content token placeholder
<RewardsBalanceIndicator
  variant="pre-launch"
  // availableRewards not specified - uses content token default
/>

// Disable animation on progress variant
<RewardsBalanceIndicator
  variant="progress"
  percentage={60}
  animate={false}
/>

// Dynamic percentage (from API)
<RewardsBalanceIndicator
  variant="progress"
  percentage={rewardsData.completionPercentage}
  size={isMobile ? "small" : "large"}
  animate={true}
/>

// With custom styling
<RewardsBalanceIndicator
  variant="progress"
  percentage={85}
  className="mx-auto my-4"
/>`}
                </pre>
              </div>
            </div>

            {/* Design Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Large Size Specifications
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Container: 106x106px</li>
                    <li>• Stroke width: 9.0439px</li>
                    <li>• Center circle: 54x54px</li>
                    <li>• Font size: 14px</li>
                    <li>• Padding: 16px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Small Size Specifications
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Container: 77x77px</li>
                    <li>• Stroke width: 4px</li>
                    <li>• Center circle: 40x40px</li>
                    <li>• Font size: 8px</li>
                    <li>• Padding: 16px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Color Specifications
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Background ring: #919EAB (16% opacity)</li>
                    <li>• Normal gradient: #FFD666 → #FFAB00</li>
                    <li>• Warning gradient: #FFD666 → #FF4842</li>
                    <li>• Text color: #212B36</li>
                    <li>• Center background: #FFFFFF</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Animation Properties
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Duration: 1.2 seconds</li>
                    <li>• Delay: 0.2 seconds</li>
                    <li>• Easing: ease-out</li>
                    <li>• Warning threshold: 85%</li>
                    <li>• Stroke linecap: round</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Typography
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Font family: Inter (fallback: Nunito)</li>
                    <li>• Font weight: 700 (Bold)</li>
                    <li>• Large text: 14px</li>
                    <li>• Small text: 8px</li>
                    <li>• Number formatting: Rounded percentage</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Pre-launch Variant Specs
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Container: 48x48px</li>
                    <li>• Shape: Perfect circle (rounded-full)</li>
                    <li>• Background: rgba(8,188,221,0.06)</li>
                    <li>• Main text: 12px, bold</li>
                    <li>• Supporting text: 8px, regular</li>
                    <li>• Content from content tokens</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Props Interface
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• variant?: "progress" | "pre-launch"</li>
                    <li>• percentage?: number (0-100, for progress)</li>
                    <li>• availableRewards?: number (for pre-launch)</li>
                    <li>• size?: "large" | "small" (progress only)</li>
                    <li>• animate?: boolean (default: true, progress only)</li>
                    <li>• className?: string</li>
                    <li>• Automatic warning at 85%+ (progress)</li>
                    <li>• Content tokens integration (pre-launch)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Chips */}
        <section id="status-chips" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Status Chips
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Clickable filter chips for campaign status management with distinctive colors and selection states.
          </p>

          <div className="space-y-12">
            {/* Campaign Status Chips */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Campaign Status Options
              </h3>
              <p className="text-[#4A535C] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Status chips representing the lifecycle of campaign management from draft to completion.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Draft
                  </h4>
                  <div className="flex items-center gap-4">
                    <StatusChip status="draft" selected={false} />
                    <StatusChip status="draft" selected={true} />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Campaign is being created and not yet submitted for review.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Pending
                  </h4>
                  <div className="flex items-center gap-4">
                    <StatusChip status="pending" selected={false} />
                    <StatusChip status="pending" selected={true} />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Campaign has been submitted and is under review.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Approved
                  </h4>
                  <div className="flex items-center gap-4">
                    <StatusChip status="approved" selected={false} />
                    <StatusChip status="approved" selected={true} />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Campaign passed review and is ready to be published.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Scheduled
                  </h4>
                  <div className="flex items-center gap-4">
                    <StatusChip status="scheduled" selected={false} />
                    <StatusChip status="scheduled" selected={true} />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Approved campaign is scheduled to go live on a specific date.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Active
                  </h4>
                  <div className="flex items-center gap-4">
                    <StatusChip status="active" selected={false} />
                    <StatusChip status="active" selected={true} />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Campaign is currently live and running.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Ended
                  </h4>
                  <div className="flex items-center gap-4">
                    <StatusChip status="ended" selected={false} />
                    <StatusChip status="ended" selected={true} />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Campaign has finished or was manually ended.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Example */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Interactive Filter Example
              </h3>
              <p className="text-[#4A535C] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Click the chips to see how they would work in a campaign filter interface.
              </p>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(['active', 'scheduled', 'approved', 'pending', 'draft', 'ended'] as CampaignStatus[]).map((status) => (
                    <StatusChip
                      key={status}
                      status={status}
                      selected={status === 'active'}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                  In a real application, these would filter the campaigns table based on selection.
                </p>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Basic status chip
<StatusChip status="active" selected={false} />

// With selection state
<StatusChip
  status="active"
  selected={isSelected}
  onSelectionChange={setIsSelected}
/>

// Custom label
<StatusChip
  status="pending"
  selected={false}
  label="Under Review"
/>

// All status types
{(['draft', 'pending', 'approved', 'scheduled', 'active', 'ended'] as const).map((status) => (
  <StatusChip
    key={status}
    status={status}
    selected={selectedStatuses.includes(status)}
    onSelectionChange={(selected) => {
      if (selected) {
        setSelectedStatuses([...selectedStatuses, status]);
      } else {
        setSelectedStatuses(selectedStatuses.filter(s => s !== status));
      }
    }}
  />
))}

// With click handler
<StatusChip
  status="active"
  selected={false}
  onClick={() => filterCampaigns('active')}
/>`}
                </pre>
              </div>
            </div>

            {/* Design Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Dimensions
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Height: 32px</li>
                    <li>• Horizontal padding: 12px</li>
                    <li>• Gap between icon and text: 4px</li>
                    <li>• Border radius: 100px (fully rounded)</li>
                    <li>• Border width: 1px (unselected state)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Typography
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Font family: Nunito Sans</li>
                    <li>• Font size: 14px</li>
                    <li>• Font weight: 700 (Bold)</li>
                    <li>• Line height: 20px</li>
                    <li>• Letter spacing: 0.25px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Status Colors (Selected State)
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Draft: #6B7280 (Gray)</li>
                    <li>• Pending: #F59E0B (Amber)</li>
                    <li>• Approved: #D66700 (Orange)</li>
                    <li>• Scheduled: #00929F (Teal)</li>
                    <li>• Active: #009243 (Green)</li>
                    <li>��� Ended: #DC2626 (Red)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Unselected State Colors
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Background: #F0F3FA</li>
                    <li>• Text: #4A535C</li>
                    <li>• Border: #A1ACBA</li>
                    <li>• Applies to all status types</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Interaction States
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Clickable cursor on hover</li>
                    <li>• Smooth transition: 200ms</li>
                    <li>• Check icon appears when selected</li>
                    <li>• Icon size: 18x18px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Props Interface
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• status: CampaignStatus</li>
                    <li>• selected?: boolean</li>
                    <li>• onSelectionChange?: function</li>
                    <li>• label?: string (overrides default)</li>
                    <li>• onClick?: event handler</li>
                    <li>• className?: string</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign List Items */}
        <section id="campaign-list-items" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Campaign List Items
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Reusable list item components for displaying campaign information with status indicators and progress metrics.
          </p>

          <div className="space-y-12">
            {/* Basic Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Basic Examples
              </h3>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Inactive Campaign (Pre-launch)
                  </h4>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Shows available rewards count and uses tonal status color indicator.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg max-w-md">
                    <CampaignListItem
                      variant="inactive"
                      status="draft"
                      label="Summer Loyalty Campaign"
                      subtitle="Loyalty Card | 15 Jun - 31 Aug"
                      availableRewards={500}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Active Campaign (Live)
                  </h4>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Shows progress percentage and uses filled status color indicator.
                  </p>
                  <div className="bg-white border border-gray-200 rounded-lg max-w-md">
                    <CampaignListItem
                      variant="active"
                      status="active"
                      label="Holiday Rewards"
                      subtitle="Instant Reward | Ends 31 Dec"
                      percentage={64}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Variations */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Status Variations
              </h3>
              <p className="text-[#4A535C] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Different campaign statuses with their corresponding status indicator colors.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inactive Variants */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Inactive Campaigns
                  </h4>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <CampaignListItem
                      variant="inactive"
                      status="draft"
                      label="Draft Campaign"
                      subtitle="Loyalty Card | Start date - end date"
                      availableRewards={500}
                      showDivider={true}
                    />
                    <CampaignListItem
                      variant="inactive"
                      status="pending"
                      label="Pending Approval"
                      subtitle="Instant Reward | Start date - end date"
                      availableRewards={250}
                      showDivider={true}
                    />
                    <CampaignListItem
                      variant="inactive"
                      status="approved"
                      label="Approved Campaign"
                      subtitle="Triggered Reward | Start date - end date"
                      availableRewards={1000}
                      showDivider={true}
                    />
                    <CampaignListItem
                      variant="inactive"
                      status="scheduled"
                      label="Scheduled Launch"
                      subtitle="Loyalty Card | Starts 1 Jan"
                      availableRewards={750}
                      showDivider={false}
                    />
                  </div>
                </div>

                {/* Active Variants */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Active Campaigns
                  </h4>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <CampaignListItem
                      variant="active"
                      status="active"
                      label="Live Campaign"
                      subtitle="Loyalty Card | Ends 31 Dec"
                      percentage={64}
                      showDivider={true}
                    />
                    <CampaignListItem
                      variant="active"
                      status="active"
                      label="Flash Sale"
                      subtitle="Instant Reward | Ends today"
                      percentage={89}
                      showDivider={true}
                    />
                    <CampaignListItem
                      variant="active"
                      status="ended"
                      label="Completed Campaign"
                      subtitle="Triggered Reward | Ended 15 Nov"
                      percentage={100}
                      showDivider={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Basic inactive campaign
<CampaignListItem
  variant="inactive"
  status="draft"
  label="Summer Campaign"
  subtitle="Loyalty Card | 15 Jun - 31 Aug"
  availableRewards={500}
/>

// Active campaign with progress
<CampaignListItem
  variant="active"
  status="active"
  label="Holiday Rewards"
  subtitle="Instant Reward | Ends 31 Dec"
  percentage={64}
/>

// Without divider (last item in list)
<CampaignListItem
  variant="inactive"
  status="scheduled"
  label="New Year Campaign"
  subtitle="Triggered Reward | Starts 1 Jan"
  availableRewards={1000}
  showDivider={false}
/>

// With click handler
<CampaignListItem
  variant="active"
  status="active"
  label="Current Campaign"
  subtitle="Loyalty Card | Ends soon"
  percentage={78}
  onClick={() => openCampaignDetails(campaignId)}
/>`}
                </pre>
              </div>
            </div>

            {/* Design Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Layout
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Height: 72px</li>
                    <li>• Padding: 12px 16px</li>
                    <li>• Status indicator: 4px wide</li>
                    <li>• Content gap: 16px</li>
                    <li>• Divider height: 1px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Typography
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Label: 16px, Bold, #1F272E</li>
                    <li>• Subtitle: 14px, Regular, #4A535C</li>
                    <li>• Font family: Nunito Sans</li>
                    <li>• Line height: 20px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Status Indicator Colors
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Uses campaign status color tokens</li>
                    <li>• Active: Filled colors</li>
                    <li>• Inactive: Tonal colors</li>
                    <li>• 4px width, rounded corners</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Props Interface
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• variant: "inactive" | "active"</li>
                    <li>• status: CampaignStatus</li>
                    <li>• label: string</li>
                    <li>• subtitle: string</li>
                    <li>• percentage?: number</li>
                    <li>• availableRewards?: number</li>
                    <li>• showDivider?: boolean</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Table */}
        <section id="campaign-table" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Campaign Table
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Sortable table component for displaying campaigns with status filtering and interactive list items.
          </p>

          <div className="space-y-12">
            {/* Sample Data */}
            {React.useMemo(() => {
              const sampleCampaigns: Campaign[] = [
                {
                  id: '1',
                  label: 'This coffee is on us ❤️',
                  subtitle: 'Instant reward | Ends: 7 Jul 2025',
                  status: 'active',
                  variant: 'active',
                  percentage: 64,
                },
                {
                  id: '2',
                  label: 'Buy 5 cappuccinos and get 1 free',
                  subtitle: 'Stamp card | Ends: 31 Dec 2025',
                  status: 'active',
                  variant: 'active',
                  percentage: 64,
                },
                {
                  id: '3',
                  label: 'Operation Stardust',
                  subtitle: 'Instant reward | Start date - end date',
                  status: 'approved',
                  variant: 'inactive',
                  availableRewards: 500,
                },
                {
                  id: '4',
                  label: 'Campaign Evergreen',
                  subtitle: 'Stamp card | Start date - end date',
                  status: 'scheduled',
                  variant: 'inactive',
                  availableRewards: 500,
                },
                {
                  id: '5',
                  label: 'Mission Horizon',
                  subtitle: 'Stamp card | Start date - end date',
                  status: 'scheduled',
                  variant: 'inactive',
                  availableRewards: 500,
                },
                {
                  id: '6',
                  label: 'Draft Campaign',
                  subtitle: 'Loyalty Card | Start date - end date',
                  status: 'draft',
                  variant: 'inactive',
                  availableRewards: 750,
                },
                {
                  id: '7',
                  label: 'Pending Review',
                  subtitle: 'Instant Reward | Start date - end date',
                  status: 'pending',
                  variant: 'inactive',
                  availableRewards: 250,
                },
                {
                  id: '8',
                  label: 'Completed Campaign',
                  subtitle: 'Triggered Reward | Ended 15 Nov',
                  status: 'ended',
                  variant: 'active',
                  percentage: 100,
                },
              ];

              return (
                <div>
                  <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Interactive Example
                  </h3>
                  <p className="text-[#4A535C] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Complete campaign table with filtering, click handlers, and responsive design. Try clicking the status chips to filter campaigns.
                  </p>

                  <div className="max-w-md mx-auto">
                    <CampaignTable
                      campaigns={sampleCampaigns}
                      onCampaignClick={(campaign) => {
                        alert(`Clicked on campaign: ${campaign.label}`);
                      }}
                      onSeeAllClick={() => {
                        alert('Navigate to all campaigns page');
                      }}
                      maxItems={5}
                    />
                  </div>
                </div>
              );
            }, [])}

            {/* Basic Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Basic Examples
              </h3>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Without Filters
                  </h4>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Simple campaign table without status filtering chips.
                  </p>
                  <div className="max-w-md">
                    <CampaignTable
                      campaigns={[
                        {
                          id: '1',
                          label: 'Simple Campaign',
                          subtitle: 'Instant reward | Active now',
                          status: 'active',
                          variant: 'active',
                          percentage: 75,
                        },
                        {
                          id: '2',
                          label: 'Upcoming Campaign',
                          subtitle: 'Stamp card | Starts next week',
                          status: 'scheduled',
                          variant: 'inactive',
                          availableRewards: 500,
                        },
                      ]}
                      showFilters={false}
                      onCampaignClick={(campaign) => console.log('Clicked:', campaign.label)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Custom Title
                  </h4>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Campaign table with custom title and limited items.
                  </p>
                  <div className="max-w-md">
                    <CampaignTable
                      title="Recent campaigns"
                      campaigns={[
                        {
                          id: '1',
                          label: 'Flash Sale',
                          subtitle: 'Instant reward | Ends today',
                          status: 'active',
                          variant: 'active',
                          percentage: 89,
                        },
                      ]}
                      maxItems={3}
                      onCampaignClick={(campaign) => console.log('Clicked:', campaign.label)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Basic campaign table
<CampaignTable
  campaigns={campaigns}
  onCampaignClick={(campaign) => navigate(\`/campaigns/\${campaign.id}\`)}
  onSeeAllClick={() => navigate('/campaigns')}
/>

// Without filters
<CampaignTable
  campaigns={campaigns}
  showFilters={false}
  title="Recent campaigns"
  maxItems={5}
/>

// Custom event handlers
<CampaignTable
  campaigns={campaigns}
  onCampaignClick={(campaign) => {
    // Custom click logic
    analytics.track('Campaign Clicked', { id: campaign.id });
    router.push(\`/campaigns/\${campaign.id}\`);
  }}
  onSeeAllClick={() => {
    analytics.track('See All Clicked');
    router.push('/campaigns');
  }}
/>

// Campaign data structure
const campaigns: Campaign[] = [
  {
    id: '1',
    label: 'Summer Sale',
    subtitle: 'Instant reward | Ends 31 Aug',
    status: 'active',
    variant: 'active',
    percentage: 64,
  },
  {
    id: '2',
    label: 'Loyalty Program',
    subtitle: 'Stamp card | Ongoing',
    status: 'scheduled',
    variant: 'inactive',
    availableRewards: 500,
  },
];`}
                </pre>
              </div>
            </div>

            {/* Design Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Layout
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Max width: 384px (24rem)</li>
                    <li>• Gap between sections: 16px</li>
                    <li>• Filter chips gap: 8px</li>
                    <li>• Table border radius: 16px</li>
                    <li>• Border color: #CFD5E0</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Typography
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Title: 20px, Bold, #1F272E</li>
                    <li>• Button: 16px, Bold, #2F70EF</li>
                    <li>• Font family: Nunito Sans</li>
                    <li>• Title line height: 28px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Interaction States
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Hover: background-color gray-50</li>
                    <li>• Active: background-color gray-100</li>
                    <li>• Button hover: rgba(47,112,239,0.08)</li>
                    <li>• Button active: rgba(47,112,239,0.12)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Props Interface
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• campaigns: Campaign[]</li>
                    <li>• title?: string</li>
                    <li>• onCampaignClick?: function</li>
                    <li>• onSeeAllClick?: function</li>
                    <li>• maxItems?: number</li>
                    <li>• showFilters?: boolean</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Heatmap */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Engagement Heatmap
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            A data-driven heatmap component that visualizes customer engagement patterns throughout the day.
            Perfect for displaying peak business hours and optimal campaign timing.
          </p>

          <div className="space-y-12">
            {/* Basic Example */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Default Heatmap
              </h3>
              <p className="text-sm text-[#4A535C] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Default heatmap with purple gradient showing standard engagement pattern.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <EngagementHeatmap />
              </div>
            </div>

            {/* Dynamic Data Example */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Dynamic Data Example
              </h3>
              <p className="text-sm text-[#4A535C] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Heatmap with custom engagement data showing peak hours at lunchtime and evening.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <EngagementHeatmap
                  data={[
                    { hour: 6, intensity: 0.1 },
                    { hour: 8, intensity: 0.3 },
                    { hour: 10, intensity: 0.5 },
                    { hour: 12, intensity: 0.9 }, // Peak lunch hour
                    { hour: 14, intensity: 0.4 },
                    { hour: 16, intensity: 0.7 },
                    { hour: 18, intensity: 0.8 }, // Peak evening hour
                  ]}
                />
              </div>
            </div>

            {/* High Activity Example */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                High Activity Pattern
              </h3>
              <p className="text-sm text-[#4A535C] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Busy restaurant or retail location with multiple peak periods.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <EngagementHeatmap
                  data={[
                    { hour: 6, intensity: 0.2 },
                    { hour: 8, intensity: 0.8 }, // Morning rush
                    { hour: 10, intensity: 0.4 },
                    { hour: 12, intensity: 1.0 }, // Peak lunch
                    { hour: 14, intensity: 0.3 },
                    { hour: 16, intensity: 0.6 },
                    { hour: 18, intensity: 0.9 }, // Evening rush
                  ]}
                />
              </div>
            </div>

            {/* Without Time Labels */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Compact Version
              </h3>
              <p className="text-sm text-[#4A535C] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Heatmap without time labels for use in dashboards or cards.
              </p>
              <div className="flex justify-center p-8 bg-gray-50 rounded-lg">
                <EngagementHeatmap
                  showTimeLabels={false}
                  data={[
                    { hour: 6, intensity: 0.3 },
                    { hour: 8, intensity: 0.5 },
                    { hour: 10, intensity: 0.7 },
                    { hour: 12, intensity: 0.9 },
                    { hour: 14, intensity: 0.6 },
                    { hour: 16, intensity: 0.8 },
                    { hour: 18, intensity: 0.4 },
                  ]}
                />
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Basic heatmap
<EngagementHeatmap />

// With custom engagement data
<EngagementHeatmap
  data={[
    { hour: 6, intensity: 0.1 },
    { hour: 8, intensity: 0.3 },
    { hour: 10, intensity: 0.5 },
    { hour: 12, intensity: 0.9 },
    { hour: 14, intensity: 0.4 },
    { hour: 16, intensity: 0.7 },
    { hour: 18, intensity: 0.8 },
  ]}
/>

// Compact version without time labels
<EngagementHeatmap
  showTimeLabels={false}
  data={engagementData}
/>

// Engagement data structure
const engagementData: EngagementData[] = [
  {
    hour: 12,        // 24-hour format (6-18 for 6am-6pm)
    intensity: 0.9   // 0-1 scale (0 = low, 1 = peak)
  },
  // ... more data points
];`}
                </pre>
              </div>
            </div>

            {/* Design Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Component Dimensions
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Max width: 320px</li>
                    <li>• Bar height: 16px</li>
                    <li>• Border radius: 8px</li>
                    <li>• Component gap: 16px</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Purple Gradient Colors
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Start: #CF9ED8 (Light purple)</li>
                    <li>• Peak: #8D00A3 (Dark purple)</li>
                    <li>• End: #CF9ED8 (Light purple)</li>
                    <li>• Gradient: 90deg linear</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Icons and Typography
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Sun icon: 🌞 (24px)</li>
                    <li>• Moon icon: 🌚 (24px)</li>
                    <li>• Time labels: 14px, bold</li>
                    <li>• Font: Nunito Sans</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Data Props
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• data?: EngagementData[]</li>
                    <li>• showTimeLabels?: boolean</li>
                    <li>• hour: number (6-18)</li>
                    <li>• intensity: number (0-1)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Icon */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Success Icon
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            A reusable success icon component with multiple sizes. Perfect for success screens, completion states, and positive feedback.
            Features a three-layered green circle design with a white checkmark.
          </p>

          <div className="space-y-12">
            {/* Size Variants */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Size Variants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Small (64px)
                  </h4>
                  <div className="flex justify-center">
                    <SuccessIcon size="small" />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Ideal for inline feedback and small success states
                  </p>
                </div>

                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Medium (80px)
                  </h4>
                  <div className="flex justify-center">
                    <SuccessIcon size="medium" />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Perfect for modals and confirmation dialogs
                  </p>
                </div>

                <div className="space-y-4 text-center">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Large (140px)
                  </h4>
                  <div className="flex justify-center">
                    <SuccessIcon size="large" />
                  </div>
                  <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Best for full-screen success pages and major completions
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Context */}
            <div>
              <h3 className="text-xl font-semibold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Context
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Success Screens
                  </h4>
                  <div className="p-6 bg-gray-50 rounded-lg text-center space-y-4">
                    <SuccessIcon size="large" className="mx-auto" />
                    <div>
                      <h5 className="text-lg font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                        Campaign Submitted!
                      </h5>
                      <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                        Your campaign has been submitted for approval
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Confirmation Dialog
                  </h4>
                  <div className="p-6 bg-gray-50 rounded-lg text-center space-y-4">
                    <SuccessIcon size="medium" className="mx-auto" />
                    <div>
                      <h5 className="text-base font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                        Changes Saved
                      </h5>
                      <p className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                        Your settings have been updated
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Usage Examples
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Basic usage - Large size (default)
<SuccessIcon />

// Different sizes
<SuccessIcon size="small" />
<SuccessIcon size="medium" />
<SuccessIcon size="large" />

// With custom styling
<SuccessIcon className="mx-auto" />
<SuccessIcon size="medium" className="my-4" />

// In success screens
<div className="text-center space-y-4">
  <SuccessIcon className="mx-auto" />
  <h2>Operation Successful!</h2>
  <p>Your action has been completed successfully.</p>
</div>

// In confirmation dialogs
<div className="flex items-center gap-3">
  <SuccessIcon size="small" />
  <span>Settings saved successfully</span>
</div>`}
                </pre>
              </div>
            </div>

            {/* Design Specifications */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
                Design Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Size Dimensions
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Small: 64x64px (w-16 h-16)</li>
                    <li>• Medium: 80x80px (w-20 h-20)</li>
                    <li>• Large: 140x140px (w-[140px] h-[140px])</li>
                    <li>• ViewBox: 0 0 140 140 (scalable)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Color Specifications
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Outer circle: #49E33B (15% opacity)</li>
                    <li>• Middle circle: #009243 (20% opacity)</li>
                    <li>• Inner circle: #009243 (solid)</li>
                    <li>• Checkmark: #FFFFFF (white)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Component Structure
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• Three concentric circles</li>
                    <li>• Scalable SVG with preserved aspect ratio</li>
                    <li>• No animation (static icon)</li>
                    <li>• Flex-shrink-0 for layout stability</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Props Interface
                  </h4>
                  <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                    <li>• size?: "small" | "medium" | "large"</li>
                    <li>• className?: string</li>
                    <li>• Standard HTML div props</li>
                    <li>• Default size: "large"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Specifications */}
        <section>
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Button Design Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Default Size (Both Types)
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• Height: 48px</li>
                <li>• Padding: 24px horizontal</li>
                <li>• Gap: 8px</li>
                <li>• Font size: 16px</li>
                <li>• Icon size: 24px</li>
                <li>��� Border radius: 100px (fully rounded)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Small Size (Both Types)
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• Height: 32px</li>
                <li>• Padding: 16px horizontal</li>
                <li>• Gap: 4px</li>
                <li>• Font size: 14px</li>
                <li>• Icon size: 16px</li>
                <li>• Border radius: 100px (fully rounded)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Primary Button Colors
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• Background: #2F70EF</li>
                <li>• Text: #FFFFFF</li>
                <li>• Hover overlay: rgba(0,51,160,0.12)</li>
                <li>• Disabled background: rgba(31,39,46,0.12)</li>
                <li>• Disabled text: #1F272E (40% opacity)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Tonal Button Colors
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• Background: #D6E3FE</li>
                <li>• Text: #0033A0</li>
                <li>• Hover overlay: rgba(0,51,160,0.12)</li>
                <li>• Disabled background: rgba(31,39,46,0.12)</li>
                <li>• Disabled text: #1F272E (38% opacity)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Outlined Button Colors
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• Border: #2F70EF</li>
                <li>• Background: transparent</li>
                <li>• Text: #2F70EF</li>
                <li>• Hover background: rgba(47,112,239,0.08)</li>
                <li>• Disabled border: rgba(31,39,46,0.12)</li>
                <li>• Disabled text: #1F272E (38% opacity)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Text Button Colors
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• Background: transparent</li>
                <li>• Text: #2F70EF</li>
                <li>• Hover background: rgba(47,112,239,0.08)</li>
                <li>• Disabled text: #1F272E (38% opacity)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Typography (All Types)
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• Font family: Nunito Sans</li>
                <li>• Font weight: 700 (Bold)</li>
                <li>• Default line height: 20px</li>
                <li>• Small line height: 20px</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentDocumentation;
