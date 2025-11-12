"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import { useTranslations } from 'next-intl';

export type ApproachItem = { title: string; desc: string };

// Hook to detect phone devices only (not tablets)
const useIsPhoneOrTablet = () => {
  const [isPhoneOrTablet, setIsPhoneOrTablet] = useState(false);

  useEffect(() => {
    const checkIsPhoneOrTablet = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return;
      }

      // Phone: width < 640, Tablet: width < 1024 (typical breakpoints)
      const isSmallScreen = window.innerWidth < 640;
      const isTabletScreen = window.innerWidth >= 640 && window.innerWidth < 1024;

      // User agent checks
      const userAgent = navigator.userAgent.toLowerCase();
      const isPhoneUserAgent = /android.*mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTabletUserAgent = /ipad|tablet|android(?!.*mobile)/i.test(userAgent);

      // If it's a phone or a tablet, return true
      const isPhoneOrTabletDevice =
        isPhoneUserAgent ||
        isTabletUserAgent ||
        isSmallScreen ||
        isTabletScreen;

      setIsPhoneOrTablet(isPhoneOrTabletDevice);
    };

    checkIsPhoneOrTablet();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIsPhoneOrTablet);
      window.addEventListener('orientationchange', checkIsPhoneOrTablet);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkIsPhoneOrTablet);
        window.removeEventListener('orientationchange', checkIsPhoneOrTablet);
      }
    };
  }, []);

  return isPhoneOrTablet;
};

export default function ApproachSection({
  items,
  sectionId = "approach",
}: {
  items: ApproachItem[];
  sectionId?: string;
}) {
  const [activeApproach, setActiveApproach] = useState(0); // Start with "We Build" (index 0)
  const [vh, setVh] = useState(0); // viewport height in px
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);
  const t = useTranslations();
  const isPhoneOrTablet = useIsPhoneOrTablet();

  // viewport height (handles mobile address bar)
  useEffect(() => {
    const update = () => setVh(window.innerHeight || 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Handle click outside of headings and p tags to deactivate tabs (phone only)
  const handleSectionClick = (e: React.MouseEvent) => {
    if (!isPhoneOrTablet) return;
    
    const target = e.target as HTMLElement;
    
    // Check if the click is on a heading (h1, h2, h3, h4, h5, h6) or p tag
    const isHeadingOrParagraph = target.tagName.match(/^H[1-6]$/i) || target.tagName === 'P';
    
    // If click is not on heading or paragraph, deactivate all tabs (set to 0)
    if (!isHeadingOrParagraph) {
      setActiveApproach(0);
    }
  };

  // scroll logic: pin + advance on down only (exactly like ManufacturingCapabilities)
  // Only enable on desktop (not phones)
  useEffect(() => {
    if (!sectionRef.current || vh === 0 || items.length === 0 || isPhoneOrTablet) return;

    const root = sectionRef.current;
    const rootTop = () => root.getBoundingClientRect().top + window.scrollY;
    let topPx = rootTop();
    let scrollTimeout: NodeJS.Timeout | null = null;
    let isScrollingUp = false;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      lastScrollY.current = y;

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // where we are inside the pinned region (using vh-based calculations)
      const frameHeight = vh * 0.7; // 70vh per frame
      const totalHeight = items.length * frameHeight + vh * 0.5; // 50vh extra
      const offset = Math.max(0, Math.min(y - topPx, totalHeight));

      // which "frame" we are in (0..items.length-1)
      const idx = Math.min(items.length - 1, Math.floor(offset / frameHeight));

      // Debounce the state change to prevent flashing
      scrollTimeout = setTimeout(() => {
        if (idx !== activeApproach) {
          setActiveApproach(idx);
        }
      }, 50); // Small delay to prevent rapid changes

      // Handle scroll up - only trigger when at the start of the last tab

    };

    const onResize = () => {
      topPx = rootTop();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [vh, items.length, activeApproach, isPhoneOrTablet]);



  if (!items || items.length === 0) return null;


  const active = activeApproach; // 0 = "We Build", 1+ = approaches (all in items array now)

  // Debug logging

  const panelId = `${sectionId}-panel`;
  const activeTabId = active >= 0 ? `${sectionId}-tab-${active}` : undefined;

  // The container height is N * 70vh + 50vh (extra to release pin) - only on desktop
  // Increase height on XL screens
  const getContainerHeight = () => {
    if (isPhoneOrTablet) return 'auto';
    const frameHeight = vh * 0.7; // 70vh per frame
    const baseHeight = items.length * frameHeight + vh * 0.5; // 50vh extra
    // Increase height on XL screens (1280px+)
    if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
      return baseHeight + vh * 0.3; // Add extra 30vh for XL screens
    }
    return baseHeight;
  };
  const containerHeight = getContainerHeight();

  return (
    <section className="w-full  bg-[#ececec]" onClick={handleSectionClick}>
      {/* SCROLL CONTAINER (tall) */}
      <div
        ref={sectionRef}
        style={{ height: isPhoneOrTablet ? 'auto' : (vh ? `${containerHeight}px` : undefined) }}
        className="relative"
      >
        {/* STICKY LAYER (pinned) - only on desktop */}
        <div className={isPhoneOrTablet ? "relative" : "sticky top-0"}>


          {/* Approach content */}
          <div className={`${isPhoneOrTablet   ? 'min-h-[50vh]' : 'h-[60vh] xl:h-[70vh]'} flex items-start py-6 sm:py-8 md:py-10`}>
            <div className="max-w-7xl h-full px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5 mx-auto w-full">
              <Header className="pb-3 pt-5 max-md:w-fit  sm:pb-4 md:pb-5">{t("Home.approach.title")}</Header>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-0 h-full">
                {/* Left: Active content */}
                <div
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={activeTabId}
                  className="flex flex-col w-full lg:w-[32%] h-[40%] lg:h-full gap-2 sm:gap-3 text-[#009B80]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0, ease: "easeOut" }}
                      className="contents"
                    >
                      <h3 className={`text-xl  max-md:w-fit sm:text-2xl md:text-3xl lg:text-4xl pb-2 font-semibold ${active === 0 ? 'text-[#595959]' : 'text-[#009B80]'
                        }`}>
                        {items[active]?.title || t("ApproachSection.noTitle")}
                      </h3>
                      <p className={`text-lg sm:text-xl  max-md:w-[23rem] md:text-2xl leading-tight ${active === 0 ? 'text-[#595959]' : 'text-[#009B80]'
                        }`}>
                        {items[active]?.desc || t("ApproachSection.noDescription")}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right: Buttons */}
                <div className="flex  max-md:w-fit w-full lg:w-1/2 h-[78%] lg:h-full flex-col gap-2 sm:gap-3">
                  {items.map((it, i) => {
                    const isActive = active === i;
                    const tabId = `${sectionId}-tab-${i}`;
                    if (i === 0) {
                      return null;
                    }
                    return (
                      <button
                        key={`${tabId}-${it.title}-${i}`}
                        id={tabId}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={panelId}
                        onClick={(e) => {
                          // Prevent event bubbling to avoid triggering section click handler
                          e.stopPropagation();
                          
                          if (isPhoneOrTablet) {
                            // On phone, just update the active state without scroll effects
                            setActiveApproach(i);
                            return;
                          }

                          // Calculate the scroll position for this tab (using vh-based calculations)
                          const frameHeight = vh * 0.7; // 70vh per frame
                          const tabScrollPosition = i * frameHeight + vh * 0.1; // 10vh offset
                          const containerTop = sectionRef.current?.getBoundingClientRect().top || 0;
                          
                          if (typeof window !== 'undefined') {
                            const scrollTarget = window.scrollY + containerTop + tabScrollPosition;

                            // Update the active state immediately
                            setActiveApproach(i);

                            // Smooth scroll to the tab position (exactly like ManufacturingCapabilities)
                            window.scrollTo({
                              top: scrollTarget,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className={`text-left  px-0 pb-2 sm:pb-2.5 md:pb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-regular transition-all duration-300 ease-out
                            ${isActive
                            ? "text-[#009B80]"
                            : "text-[#969696] hover:text-[#009B80]"
                          }`}
                      >
                        {it.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
