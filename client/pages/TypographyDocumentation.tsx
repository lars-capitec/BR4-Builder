import React from 'react';
import { typography, typographyStyles, TypographyVariant } from '../lib/typography';
import { cn } from '../lib/utils';

interface TypeStyleProps {
  variant: TypographyVariant;
  children: string;
}

const TypeStyle: React.FC<TypeStyleProps> = ({ variant, children }) => {
  const style = typographyStyles[variant];
  
  return (
    <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
          {variant.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h3>
        <div 
          className={cn(typography({ variant }))}
          style={{ 
            fontFamily: style.fontFamily === 'Flama' ? 'var(--font-flama)' : 'var(--font-nunito)',
            color: '#000000'
          }}
        >
          {children}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-sm font-semibold text-[#1F272E] mb-3" style={{ fontFamily: 'var(--font-nunito)' }}>
          Style Specifications
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
          <div>
            <span className="font-medium">Font Family:</span>
            <br />
            <span>{style.fontFamily}</span>
          </div>
          <div>
            <span className="font-medium">Font Size:</span>
            <br />
            <span>{style.fontSize}</span>
          </div>
          <div>
            <span className="font-medium">Font Weight:</span>
            <br />
            <span>{style.fontWeight}</span>
          </div>
          <div>
            <span className="font-medium">Line Height:</span>
            <br />
            <span>{style.lineHeight}</span>
          </div>
          <div>
            <span className="font-medium">Letter Spacing:</span>
            <br />
            <span>{style.letterSpacing}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TypographyDocumentation: React.FC = () => {
  const displayStyles: TypographyVariant[] = ['display-large', 'display-medium', 'display-small'];
  const headlineStyles: TypographyVariant[] = ['headline-xl', 'headline-large', 'headline-medium', 'headline-small', 'headline-xs'];
  const titleStyles: TypographyVariant[] = ['title-large', 'title-medium', 'title-small'];
  const bodyStyles: TypographyVariant[] = [
    'body-large', 'body-large-emphasis', 
    'body-regular', 'body-regular-emphasis', 
    'body-small', 'body-small-emphasis', 
    'body-xs', 'body-xs-emphasis'
  ];
  const labelStyles: TypographyVariant[] = [
    'label-large', 'label-large-emphasis',
    'label-medium', 'label-medium-emphasis',
    'label-small', 'label-small-emphasis'
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Typography System
          </h1>
          <p className="text-lg text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
            A comprehensive typography scale with consistent styles for all text elements in the design system.
          </p>
        </div>

        {/* Navigation */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
            Type Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Display
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#display-styles" className="text-[#2F70EF] hover:underline">
                    Large, Medium, Small
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Headlines
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#headline-styles" className="text-[#2F70EF] hover:underline">
                    XL, Large, Medium, Small, XS
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Titles
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#title-styles" className="text-[#2F70EF] hover:underline">
                    Large, Medium, Small
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Body Text
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#body-styles" className="text-[#2F70EF] hover:underline">
                    Large, Regular, Small, XS
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-[#1F272E]" style={{ fontFamily: 'var(--font-nunito)' }}>
                Labels
              </h3>
              <ul className="space-y-1 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>
                  <a href="#label-styles" className="text-[#2F70EF] hover:underline">
                    Large, Medium, Small
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Display Styles */}
        <section id="display-styles" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Display Styles
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Large, impactful text for hero sections and major headings. Uses Flama font family.
          </p>
          
          {displayStyles.map((variant) => (
            <TypeStyle key={variant} variant={variant}>
              {variant.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </TypeStyle>
          ))}
        </section>

        {/* Headline Styles */}
        <section id="headline-styles" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Headline Styles
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Section headings and important content titles. Uses Nunito Sans with semibold weight.
          </p>
          
          {headlineStyles.map((variant) => (
            <TypeStyle key={variant} variant={variant}>
              {variant.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </TypeStyle>
          ))}
        </section>

        {/* Title Styles */}
        <section id="title-styles" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Title Styles
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Subsection titles and component headings. Uses Nunito Sans with bold weight.
          </p>
          
          {titleStyles.map((variant) => (
            <TypeStyle key={variant} variant={variant}>
              {variant.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </TypeStyle>
          ))}
        </section>

        {/* Body Styles */}
        <section id="body-styles" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Body Text Styles
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Content text for paragraphs, descriptions, and general reading. Available in regular and emphasis weights.
          </p>
          
          {bodyStyles.map((variant) => (
            <TypeStyle key={variant} variant={variant}>
              {variant.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </TypeStyle>
          ))}
        </section>

        {/* Label Styles */}
        <section id="label-styles" className="mb-16">
          <h2 className="text-3xl font-bold text-[#1F272E] mb-2" style={{ fontFamily: 'var(--font-nunito)' }}>
            Label Styles
          </h2>
          <p className="text-[#4A535C] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Text for form labels, captions, and UI element descriptions. Available in semibold and bold weights.
          </p>
          
          {labelStyles.map((variant) => (
            <TypeStyle key={variant} variant={variant}>
              {variant.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </TypeStyle>
          ))}
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Usage Guidelines
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <pre className="text-sm text-[#1F272E] overflow-x-auto whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
{`// Using typography with the typography function
import { typography } from '@/lib/typography';

// Apply typography class
<h1 className={typography({ variant: "display-large" })}>
  Large Display Text
</h1>

// With additional classes
<p className={cn(
  typography({ variant: "body-regular" }),
  "text-gray-600 mb-4"
)}>
  Body text with custom styling
</p>

// Using inline styles (for dynamic content)
import { typographyStyles } from '@/lib/typography';

<div style={{
  fontFamily: typographyStyles['headline-large'].fontFamily,
  fontSize: typographyStyles['headline-large'].fontSize,
  fontWeight: typographyStyles['headline-large'].fontWeight,
  lineHeight: typographyStyles['headline-large'].lineHeight,
}}>
  Dynamic headline text
</div>`}
            </pre>
          </div>
        </section>

        {/* Typography Scale */}
        <section>
          <h2 className="text-2xl font-bold text-[#1F272E] mb-8" style={{ fontFamily: 'var(--font-nunito)' }}>
            Typography Scale Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Font Families
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• <strong>Flama:</strong> Display text (72px, 64px, 56px)</li>
                <li>• <strong>Nunito Sans:</strong> All other text styles</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Font Weights
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• <strong>400 (Normal):</strong> Body text</li>
                <li>• <strong>600 (Semibold):</strong> Headlines and labels</li>
                <li>• <strong>700 (Bold):</strong> Display, titles, emphasis</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Letter Spacing
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• <strong>Normal:</strong> Display, headline, title styles</li>
                <li>• <strong>0.25px:</strong> Small body and medium label text</li>
                <li>• <strong>0.4px:</strong> Extra small body and small label text</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#1F272E] mb-4" style={{ fontFamily: 'var(--font-nunito)' }}>
                Size Range
              </h3>
              <ul className="space-y-2 text-[#4A535C]" style={{ fontFamily: 'var(--font-nunito)' }}>
                <li>• <strong>Display:</strong> 72px → 56px</li>
                <li>• <strong>Headlines:</strong> 40px → 24px</li>
                <li>• <strong>Titles:</strong> 24px → 18px</li>
                <li>• <strong>Body/Labels:</strong> 18px → 12px</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TypographyDocumentation;
