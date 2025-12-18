import React from 'react';

const ColorSwatch = ({ 
  name, 
  value, 
  description 
}: { 
  name: string; 
  value: string; 
  description?: string;
}) => {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-white">
      <div 
        className="w-16 h-16 rounded-lg border border-gray-300 flex-shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="flex-1">
        <h4 className="font-semibold text-[#1F272E] text-sm" style={{ fontFamily: 'var(--font-nunito)' }}>
          {name}
        </h4>
        <p className="text-xs text-[#4A535C] font-mono mt-1">
          {value}
        </p>
        {description && (
          <p className="text-xs text-[#6B7280] mt-1" style={{ fontFamily: 'var(--font-nunito)' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const SpacingExample = ({ 
  name, 
  value, 
  pixelValue 
}: { 
  name: string; 
  value: string; 
  pixelValue: string;
}) => {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center space-x-2">
        <div 
          className="bg-blue-200 border-2 border-dashed border-blue-400"
          style={{ width: pixelValue, height: '24px' }}
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-[#1F272E] text-sm" style={{ fontFamily: 'var(--font-nunito)' }}>
          {name}
        </h4>
        <p className="text-xs text-[#4A535C] font-mono">
          {value} ({pixelValue})
        </p>
      </div>
    </div>
  );
};

const BorderRadiusExample = ({ 
  name, 
  value 
}: { 
  name: string; 
  value: string;
}) => {
  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-white">
      <div 
        className="w-16 h-16 bg-gray-200 border border-gray-300 flex-shrink-0"
        style={{ borderRadius: value }}
      />
      <div className="flex-1">
        <h4 className="font-semibold text-[#1F272E] text-sm" style={{ fontFamily: 'var(--font-nunito)' }}>
          {name}
        </h4>
        <p className="text-xs text-[#4A535C] font-mono">
          {value}
        </p>
      </div>
    </div>
  );
};

const StyleGuide: React.FC = () => {
  const campaignStatusColors = [
    // Draft
    { name: 'Draft - Selected Background', value: 'rgba(42, 217, 249, 0.12)', description: 'Tonal style background when draft chip is selected' },
    { name: 'Draft - Selected Text', value: '#007681', description: 'Text color for selected draft chip' },
    { name: 'Draft - Selected Icon', value: '#007681', description: 'Icon color for selected draft chip' },
    { name: 'Draft - Unselected Background', value: '#F3F4F6', description: 'Background when draft chip is not selected' },
    { name: 'Draft - Unselected Text', value: '#6B7280', description: 'Text color for unselected draft chip' },
    { name: 'Draft - Unselected Border', value: '#D1D5DB', description: 'Border color for unselected draft chip' },
    
    // Pending
    { name: 'Pending - Selected Background', value: 'rgba(255, 130, 63, 0.12)', description: 'Tonal style background when pending chip is selected' },
    { name: 'Pending - Selected Text', value: '#B14C02', description: 'Text color for selected pending chip' },
    { name: 'Pending - Selected Icon', value: '#B14C02', description: 'Icon color for selected pending chip' },
    { name: 'Pending - Unselected Background', value: '#F3F4F6', description: 'Background when pending chip is not selected' },
    { name: 'Pending - Unselected Text', value: '#6B7280', description: 'Text color for unselected pending chip' },
    { name: 'Pending - Unselected Border', value: '#D1D5DB', description: 'Border color for unselected pending chip' },
    
    // Approved
    { name: 'Approved - Selected Background', value: '#D66700', description: 'Filled style background when approved chip is selected' },
    { name: 'Approved - Selected Text', value: '#FFFFFF', description: 'Text color for selected approved chip' },
    { name: 'Approved - Selected Icon', value: '#FFFFFF', description: 'Icon color for selected approved chip' },
    { name: 'Approved - Unselected Background', value: '#F3F4F6', description: 'Background when approved chip is not selected' },
    { name: 'Approved - Unselected Text', value: '#6B7280', description: 'Text color for unselected approved chip' },
    { name: 'Approved - Unselected Border', value: '#D1D5DB', description: 'Border color for unselected approved chip' },
    
    // Scheduled
    { name: 'Scheduled - Selected Background', value: '#00929F', description: 'Filled style background when scheduled chip is selected' },
    { name: 'Scheduled - Selected Text', value: '#FFFFFF', description: 'Text color for selected scheduled chip' },
    { name: 'Scheduled - Selected Icon', value: '#FFFFFF', description: 'Icon color for selected scheduled chip' },
    { name: 'Scheduled - Unselected Background', value: '#F3F4F6', description: 'Background when scheduled chip is not selected' },
    { name: 'Scheduled - Unselected Text', value: '#6B7280', description: 'Text color for unselected scheduled chip' },
    { name: 'Scheduled - Unselected Border', value: '#D1D5DB', description: 'Border color for unselected scheduled chip' },
    
    // Active
    { name: 'Active - Selected Background', value: '#009243', description: 'Filled style background when active chip is selected' },
    { name: 'Active - Selected Text', value: '#FFFFFF', description: 'Text color for selected active chip' },
    { name: 'Active - Selected Icon', value: '#FFFFFF', description: 'Icon color for selected active chip' },
    { name: 'Active - Unselected Background', value: '#F3F4F6', description: 'Background when active chip is not selected' },
    { name: 'Active - Unselected Text', value: '#6B7280', description: 'Text color for unselected active chip' },
    { name: 'Active - Unselected Border', value: '#D1D5DB', description: 'Border color for unselected active chip' },
    
    // Ended
    { name: 'Ended - Selected Background', value: 'rgba(91, 106, 163, 0.12)', description: 'Tonal style background when ended chip is selected' },
    { name: 'Ended - Selected Text', value: '#4A535C', description: 'Text color for selected ended chip' },
    { name: 'Ended - Selected Icon', value: '#545F6A', description: 'Icon color for selected ended chip' },
    { name: 'Ended - Unselected Background', value: '#F3F4F6', description: 'Background when ended chip is not selected' },
    { name: 'Ended - Unselected Text', value: '#6B7280', description: 'Text color for unselected ended chip' },
    { name: 'Ended - Unselected Border', value: '#D1D5DB', description: 'Border color for unselected ended chip' },
  ];

  const semanticColors = [
    { name: 'Primary Purple', value: 'hsl(var(--brand-purple))', description: 'Main brand color' },
    { name: 'Purple Light', value: 'hsl(var(--brand-purple-light))', description: 'Light brand variant' },
    { name: 'Purple Dark', value: 'hsl(var(--brand-purple-dark))', description: 'Dark brand variant' },
    { name: 'Success Green', value: 'hsl(var(--success-green))', description: 'Success states and positive actions' },
    { name: 'Warning Orange', value: 'hsl(var(--warning-orange))', description: 'Warning states and caution' },
    { name: 'Background', value: 'hsl(var(--background))', description: 'Default page background' },
    { name: 'Foreground', value: 'hsl(var(--foreground))', description: 'Default text color' },
    { name: 'Muted', value: 'hsl(var(--muted))', description: 'Muted background color' },
    { name: 'Muted Foreground', value: 'hsl(var(--muted-foreground))', description: 'Muted text color' },
  ];

  const grayScale = [
    { name: 'Gray 50', value: 'hsl(var(--gray-50))', description: 'Lightest gray' },
    { name: 'Gray 100', value: 'hsl(var(--gray-100))', description: 'Very light gray' },
    { name: 'Gray 200', value: 'hsl(var(--gray-200))', description: 'Light gray' },
    { name: 'Gray 300', value: 'hsl(var(--gray-300))', description: 'Medium light gray' },
    { name: 'Gray 400', value: 'hsl(var(--gray-400))', description: 'Medium gray' },
    { name: 'Gray 500', value: 'hsl(var(--gray-500))', description: 'Base gray' },
    { name: 'Gray 600', value: 'hsl(var(--gray-600))', description: 'Medium dark gray' },
    { name: 'Gray 700', value: 'hsl(var(--gray-700))', description: 'Dark gray' },
    { name: 'Gray 800', value: 'hsl(var(--gray-800))', description: 'Very dark gray' },
    { name: 'Gray 900', value: 'hsl(var(--gray-900))', description: 'Darkest gray' },
  ];

  const spacingTokens = [
    { name: 'Spacing 1', value: '0.25rem', pixelValue: '4px' },
    { name: 'Spacing 2', value: '0.5rem', pixelValue: '8px' },
    { name: 'Spacing 3', value: '0.75rem', pixelValue: '12px' },
    { name: 'Spacing 4', value: '1rem', pixelValue: '16px' },
    { name: 'Spacing 5', value: '1.25rem', pixelValue: '20px' },
    { name: 'Spacing 6', value: '1.5rem', pixelValue: '24px' },
    { name: 'Spacing 8', value: '2rem', pixelValue: '32px' },
    { name: 'Spacing 10', value: '2.5rem', pixelValue: '40px' },
    { name: 'Spacing 12', value: '3rem', pixelValue: '48px' },
    { name: 'Spacing 16', value: '4rem', pixelValue: '64px' },
  ];

  const borderRadiusTokens = [
    { name: 'Small', value: 'calc(var(--radius) - 4px)' },
    { name: 'Medium', value: 'calc(var(--radius) - 2px)' },
    { name: 'Large', value: 'var(--radius)' },
    { name: 'Full', value: '9999px' },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="/component-documentation"
              className="text-lg font-semibold text-[#4A535C] hover:text-[#2F70EF] hover:underline transition-colors"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Component Library
            </a>
            <span className="text-[#A1ACBA]">•</span>
            <a
              href="/style-guide"
              className="text-lg font-semibold text-[#2F70EF] hover:underline"
              style={{ fontFamily: 'var(--font-nunito)' }}
            >
              Style Guide
            </a>
          </div>
          <h1 className="text-4xl font-bold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Style Guide
          </h1>
          <p className="text-lg text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
            Design tokens, colors, spacing, and other reusable UI attributes for consistent design implementation.
          </p>
        </div>

        {/* Navigation */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Design System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
              <li>
                <a href="#campaign-status-colors" className="text-[#2F70EF] hover:underline">
                  Campaign Status Colors
                </a>
              </li>
              <li>
                <a href="#semantic-colors" className="text-[#2F70EF] hover:underline">
                  Semantic Colors
                </a>
              </li>
            </ul>
            <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
              <li>
                <a href="#grayscale" className="text-[#2F70EF] hover:underline">
                  Grayscale
                </a>
              </li>
              <li>
                <a href="#spacing" className="text-[#2F70EF] hover:underline">
                  Spacing
                </a>
              </li>
            </ul>
            <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
              <li>
                <a href="#border-radius" className="text-[#2F70EF] hover:underline">
                  Border Radius
                </a>
              </li>
              <li>
                <a href="#typography" className="text-[#2F70EF] hover:underline">
                  Typography
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Campaign Status Colors */}
        <section id="campaign-status-colors" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
            Campaign Status Colors
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Color tokens used for campaign status chips. These follow the naming convention: 
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
              color-data-campaign-status-{'{status}'}-{'{state}'}
            </code>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaignStatusColors.map((color, index) => (
              <ColorSwatch key={index} {...color} />
            ))}
          </div>
        </section>

        {/* Semantic Colors */}
        <section id="semantic-colors" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
            Semantic Colors
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Brand colors and semantic color tokens for consistent theming.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {semanticColors.map((color, index) => (
              <ColorSwatch key={index} {...color} />
            ))}
          </div>
        </section>

        {/* Grayscale */}
        <section id="grayscale" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
            Grayscale
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Neutral gray colors for text, borders, and backgrounds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grayScale.map((color, index) => (
              <ColorSwatch key={index} {...color} />
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section id="spacing" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
            Spacing
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Consistent spacing values for margins, padding, and gaps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spacingTokens.map((spacing, index) => (
              <SpacingExample key={index} {...spacing} />
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section id="border-radius" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
            Border Radius
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Consistent border radius values for rounded corners.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {borderRadiusTokens.map((radius, index) => (
              <BorderRadiusExample key={index} {...radius} />
            ))}
          </div>
        </section>

        {/* Typography */}
        <section id="typography" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-6" style={{ fontFamily: 'var(--font-nunito)' }}>
            Typography
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Typography scale and font families used throughout the application.
          </p>
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Font Families
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-2xl mb-2" style={{ fontFamily: 'var(--font-flama)' }}>
                    Flama - Display Font
                  </h4>
                  <p className="text-sm text-[#4A535C] font-mono">font-family: var(--font-flama), 'Flama', 'system-ui', 'sans-serif'</p>
                </div>
                <div>
                  <h4 className="font-bold text-2xl mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
                    Nunito Sans - UI Font
                  </h4>
                  <p className="text-sm text-[#4A535C] font-mono">font-family: var(--font-nunito), 'Nunito Sans', 'system-ui', 'sans-serif'</p>
                </div>
              </div>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Type Scale
              </h3>
              <div className="space-y-3">
                <div className="text-4xl font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>Heading 1</div>
                <div className="text-3xl font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>Heading 2</div>
                <div className="text-2xl font-bold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>Heading 3</div>
                <div className="text-xl font-semibold text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>Heading 4</div>
                <div className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>Heading 5</div>
                <div className="text-base text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>Body Large</div>
                <div className="text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>Body Small</div>
                <div className="text-xs text-[#6B7280]" style={{ fontFamily: 'var(--font-nunito)' }}>Caption</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide;
