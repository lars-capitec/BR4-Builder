export default function StatusBar() {
  return (
    <div className="flex items-start w-full bg-[#0033A0]">
      <div className="flex h-10 px-4 justify-between items-center flex-1 relative">
        {/* Camera cutout */}
        <div className="absolute left-1/2 top-2 transform -translate-x-1/2 w-[124px] h-6 bg-[#2E2E2E] rounded-full"></div>
        
        {/* Time */}
        <div className="flex w-32 items-center gap-2">
          <span className="text-white text-sm font-normal font-['Roboto'] leading-5 tracking-wide">
            9:30
          </span>
        </div>
        
        {/* Status icons */}
        <div className="flex w-[143px] h-10 justify-end items-center gap-[-2px]">
          {/* WiFi */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M0.666992 5.99996L8.00033 13.3333L15.3337 5.99996C11.2803 1.94663 4.72033 1.94663 0.666992 5.99996Z" fill="white"/>
          </svg>
          
          {/* Signal */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14.6663 1.33337L1.33301 14.6667H14.6663V1.33337Z" fill="white"/>
          </svg>
          
          {/* Battery */}
          <div className="flex h-[52px] items-center gap-0.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M9.5 1.33337H6.5V2.66671H5C4.44772 2.66671 4 3.11442 4 3.66671V13.6667C4 14.219 4.44772 14.6667 5 14.6667H11C11.5523 14.6667 12 14.219 12 13.6667V3.66671C12 3.11442 11.5523 2.66671 11 2.66671H9.5V1.33337Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
