import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Next.js 15 specific: Aggressive cleanup function
export const cleanupAllGSAP = () => {
    try {
        // Kill all ScrollTriggers immediately
        ScrollTrigger.getAll().forEach(trigger => {
            try {
                if (trigger) {
                    trigger.kill();
                }
            } catch (error) {
                console.warn('ScrollTrigger cleanup error:', error);
            }
        });
        
        // Kill all GSAP tweens
        gsap.killTweensOf("*");
        
        // Clear global timeline
        gsap.globalTimeline.clear();
        
        // Force ScrollTrigger refresh to clear any remaining references
        ScrollTrigger.refresh();
        
        console.log('Next.js 15 GSAP cleanup completed');
    } catch (error) {
        console.warn('GSAP cleanup error:', error);
    }
};

// Next.js 15 specific: Disable ScrollTrigger during navigation
export const disableScrollTrigger = () => {
    try {
        // Disable ScrollTrigger auto-refresh
        ScrollTrigger.config({ 
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
            ignoreMobileResize: true,
            syncInterval: 60
        });
        
        // Kill all existing ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => {
            try {
                if (trigger) {
                    trigger.kill();
                }
            } catch (error) {
                console.warn('ScrollTrigger disable error:', error);
            }
        });
        
        console.log('ScrollTrigger disabled for navigation');
    } catch (error) {
        console.warn('ScrollTrigger disable error:', error);
    }
};

// Next.js 15 specific: Re-enable ScrollTrigger after navigation
export const enableScrollTrigger = () => {
    try {
        // Re-enable ScrollTrigger
        ScrollTrigger.config({ 
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
            ignoreMobileResize: false,
            syncInterval: 40
        });
        
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
        
        console.log('ScrollTrigger re-enabled after navigation');
    } catch (error) {
        console.warn('ScrollTrigger enable error:', error);
    }
};

// Setup cleanup listeners for Next.js 15
if (typeof window !== "undefined") {
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanupAllGSAP);
    window.addEventListener('pagehide', cleanupAllGSAP);
    
    // Next.js 15 specific: Handle navigation events
    let isNavigating = false;
    
    // Listen for navigation start
    const handleNavigationStart = () => {
        isNavigating = true;
        disableScrollTrigger();
    };
    
    // Listen for navigation complete
    const handleNavigationComplete = () => {
        isNavigating = false;
        // Small delay to ensure DOM is stable
        setTimeout(() => {
            if (!isNavigating) {
                enableScrollTrigger();
            }
        }, 100);
    };
    
    // Navigation event listeners
    window.addEventListener('popstate', handleNavigationStart);
    window.addEventListener('beforeunload', handleNavigationStart);
    
    // Listen for route changes (Next.js specific)
    if (typeof window !== "undefined" && window.history) {
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;
        
        window.history.pushState = function(...args) {
            handleNavigationStart();
            return originalPushState.apply(this, args);
        };
        
        window.history.replaceState = function(...args) {
            handleNavigationStart();
            return originalReplaceState.apply(this, args);
        };
    }
}

