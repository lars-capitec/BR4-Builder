import { CONTENT_TOKENS } from '../lib/content-tokens';
import { typography } from '../lib/typography';
import { cn } from '../lib/utils';

export default function SplashGraphic() {
  return (
    <div
      className="flex p-8 flex-col items-start gap-10 flex-1 self-stretch relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0033A0 0%, #2F70EF 50%, #5B9BFF 100%)'
      }}
    >
      {/* Capitec Logo */}
      <div className="flex items-center gap-3 z-10">
        <div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center">
          <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
            <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8c1.54 0 2.98-.44 4.2-1.2l-2.4-2.4C8.6 12.8 7.4 13.2 6 13.2c-2.88 0-5.2-2.32-5.2-5.2S3.12 2.8 6 2.8s5.2 2.32 5.2 5.2c0 1.4-.4 2.6-.8 3.8l2.4 2.4c.76-1.22 1.2-2.66 1.2-4.2C16 3.58 12.42 0 8 0z" fill="#0033A0"/>
            <circle cx="24" cy="8" r="8" fill="#0033A0"/>
          </svg>
        </div>
        <span className="text-white font-bold text-lg font-nunito">CAPITEC</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-2 z-10">
        <h1 className={cn(
          typography({ variant: "display-small" }),
          "text-white w-full"
        )}>
          <span className="w-full">
            {CONTENT_TOKENS.APP_NAME}
          </span>
        </h1>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large blue circles */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/20 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-1/3 right-0 w-32 h-32 bg-blue-500/30 rounded-full transform translate-x-1/3"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-600/25 rounded-full transform translate-x-1/4 translate-y-1/4"></div>
        
        {/* Decorative lines and shapes */}
        <div className="absolute top-1/2 right-8 w-20 h-0.5 bg-orange-400 transform rotate-45"></div>
        <div className="absolute bottom-1/3 right-12 w-16 h-16 border-2 border-orange-400/50 rounded-full"></div>
        <div className="absolute top-2/3 right-4 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute top-1/4 right-16 w-1 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
}
