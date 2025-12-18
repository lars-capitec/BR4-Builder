import { useState, useEffect, useCallback } from 'react';

interface UseAdaptiveHeightOptions {
  minHeight?: string;
  maxHeight?: string;
  contentBased?: boolean;
}

export function useAdaptiveHeight(options: UseAdaptiveHeightOptions = {}) {
  const {
    minHeight = '60vh',
    maxHeight = '90vh',
    contentBased = true
  } = options;

  const [viewportHeight, setViewportHeight] = useState(0);
  const [adaptiveClass, setAdaptiveClass] = useState('');

  const updateViewportHeight = useCallback(() => {
    const vh = window.innerHeight;
    setViewportHeight(vh);

    // Dynamic height class based on viewport size
    let heightClass = '';
    
    if (vh < 600) {
      // Very small screens (phones in landscape)
      heightClass = `max-h-[95vh] min-h-[80vh] h-auto`;
    } else if (vh < 800) {
      // Small screens (standard phones)
      heightClass = `max-h-[${maxHeight}] min-h-[70vh] h-auto`;
    } else if (vh < 1000) {
      // Medium screens (large phones, small tablets)
      heightClass = `max-h-[${maxHeight}] min-h-[${minHeight}] h-auto`;
    } else {
      // Large screens (tablets, desktop)
      heightClass = `max-h-[85vh] min-h-[50vh] h-auto`;
    }

    setAdaptiveClass(heightClass);
  }, [minHeight, maxHeight]);

  useEffect(() => {
    updateViewportHeight();
    
    const handleResize = () => {
      updateViewportHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateViewportHeight]);

  return {
    viewportHeight,
    adaptiveClass,
    isSmallViewport: viewportHeight < 700,
    isMediumViewport: viewportHeight >= 700 && viewportHeight < 1000,
    isLargeViewport: viewportHeight >= 1000
  };
}
