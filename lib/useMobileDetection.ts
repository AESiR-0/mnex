"use client";
import { useState, useEffect } from 'react';

export function useMobileDetection() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            if (typeof window === 'undefined' || typeof navigator === 'undefined') {
                return;
            }
            
            const userAgent = navigator.userAgent;
            const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
            const isSmallScreen = window.innerWidth <= 768; // More standard mobile breakpoint
            
            const mobileResult = isMobileDevice || isSmallScreen;
            
         
            setIsMobile(mobileResult);
        };

        // Check on mount
        checkMobile();

        // Check on resize
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', checkMobile);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', checkMobile);
            }
        };
    }, []);

    return isMobile;
}
