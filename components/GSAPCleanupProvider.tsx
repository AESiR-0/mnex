"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { disableScrollTrigger, enableScrollTrigger, cleanupAllGSAP } from "@/lib/gsap-cleanup";

export default function GSAPCleanupProvider() {
    const pathname = usePathname();

    useEffect(() => {
        // Disable ScrollTrigger during navigation
        disableScrollTrigger();
        
        // Small delay to ensure DOM is stable, then re-enable
        const timer = setTimeout(() => {
            enableScrollTrigger();
        }, 150);
        
        return () => {
            clearTimeout(timer);
            // Cleanup on unmount
            cleanupAllGSAP();
        };
    }, [pathname]);

    // This component doesn't render anything
    return null;
}
