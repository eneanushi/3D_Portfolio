import { useState, useEffect } from 'react';

interface MobileState {
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  screenWidth: number;
  screenHeight: number;
  isTouchDevice: boolean;
}

export const useMobileDetection = (): MobileState => {
  const [state, setState] = useState<MobileState>(() => ({
    isMobile: false,
    isTablet: false,
    isLandscape: true,
    isPortrait: false,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 1080,
    isTouchDevice: false,
  }));

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setState({
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isLandscape: width > height,
        isPortrait: height > width,
        screenWidth: width,
        screenHeight: height,
        isTouchDevice,
      });
    };

    checkDevice();
    
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', () => {
      // Small delay to let the browser update dimensions
      setTimeout(checkDevice, 100);
    });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return state;
};

// Simple check without hook for SSR-safe usage
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || 'ontouchstart' in window;
};
