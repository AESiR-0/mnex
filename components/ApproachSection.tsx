"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import { useTranslations } from 'next-intl';

export type ApproachItem = { title: string; desc: string };

// Hook to detect phone devices only (not tablets)
const useIsPhone = () => {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkIsPhone = () => {
      // Check screen width - phones are typically smaller than tablets
      const isSmallScreen = window.innerWidth < 640; // More restrictive than 768

      // Check user agent for phone devices specifically (excluding tablets)
      const userAgent = navigator.userAgent.toLowerCase();
      const isPhoneUserAgent = /android.*mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Exclude tablets explicitly
      const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);

      const isPhoneDevice = (isSmallScreen || isPhoneUserAgent) && !isTablet;

      setIsPhone(isPhoneDevice);
    };

    checkIsPhone();
    window.addEventListener('resize', checkIsPhone);
    window.addEventListener('orientationchange', checkIsPhone);
    return () => {
      window.removeEventListener('resize', checkIsPhone);
      window.removeEventListener('orientationchange', checkIsPhone);
    };
  }, []);

  return isPhone;
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
  const isPhone = useIsPhone();

  // viewport height (handles mobile address bar)
  useEffect(() => {
    const update = () => setVh(window.innerHeight || 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Handle click outside of headings and p tags to deactivate tabs (phone only)
  const handleSectionClick = (e: React.MouseEvent) => {
    if (!isPhone) return;
    
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
    if (!sectionRef.current || vh === 0 || items.length === 0 || isPhone) return;

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
  }, [vh, items.length, activeApproach, isPhone]);



  if (!items || items.length === 0) return null;


  const active = activeApproach; // 0 = "We Build", 1+ = approaches (all in items array now)

  // Debug logging

  const panelId = `${sectionId}-panel`;
  const activeTabId = active >= 0 ? `${sectionId}-tab-${active}` : undefined;

  // The container height is N * 70vh + 50vh (extra to release pin) - only on desktop
  // Increase height on XL screens
  const getContainerHeight = () => {
    if (isPhone) return 'auto';
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
        style={{ height: isPhone ? 'auto' : (vh ? `${containerHeight}px` : undefined) }}
        className="relative"
      >
        {/* STICKY LAYER (pinned) - only on desktop */}
        <div className={isPhone ? "relative" : "sticky top-0"}>
          {/* Header section */}
          <section className="w-full relative min-h-[20vh] md:min-h-[30vh] flex items-center justify-start bg-[#ffffff] overflow-hidden">
            {/* Background Image with reduced opacity */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/static/home/second_section.webp"
                alt="Background"
                fill
                className="object-cover opacity-25 max-md:opacity-40"
                priority
              />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 mx-auto max-w-7xl   w-full flex items-center justify-start ">
              <h1 className="text-[1.7rem] whitespace-pre-line sm:text-2xl px-4 lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-[#1789FF] leading-tight">
                {t("Home.hero.line1")}
                <br />
                {t("Home.hero.line2")}
              </h1>
            </div>
          </section>

          {/* Approach content */}
          <div className={`${isPhone ? 'min-h-[50vh]' : 'h-[60vh] xl:h-[70vh]'} flex items-start py-6 sm:py-8 md:py-10`}>
            <div className="max-w-7xl h-full px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5 mx-auto w-full">
              <Header className="pb-3 pt-5 sm:pb-4 md:pb-5">{t("Home.approach.title")}</Header>
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
                      <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl pb-2 font-semibold ${active === 0 ? 'text-[#595959]' : 'text-[#009B80]'
                        }`}>
                        {items[active]?.title || 'No title'}
                      </h3>
                      <p className={`text-lg sm:text-xl md:text-2xl leading-tight ${active === 0 ? 'text-[#595959]' : 'text-[#009B80]'
                        }`}>
                        {items[active]?.desc || 'No description'}
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
                          
                          if (isPhone) {
                            // On phone, just update the active state without scroll effects
                            setActiveApproach(i);
                            return;
                          }

                          // Calculate the scroll position for this tab (using vh-based calculations)
                          const frameHeight = vh * 0.7; // 70vh per frame
                          const tabScrollPosition = i * frameHeight + vh * 0.1; // 10vh offset
                          const containerTop = sectionRef.current?.getBoundingClientRect().top || 0;
                          const scrollTarget = window.scrollY + containerTop + tabScrollPosition;

                          console.log('Scroll calculation:', { i, tabScrollPosition, containerTop, scrollTarget });

                          // Update the active state immediately
                          setActiveApproach(i);

                          // Smooth scroll to the tab position (exactly like ManufacturingCapabilities)
                          window.scrollTo({
                            top: scrollTarget,
                            behavior: 'smooth'
                          });
                        }}
                        className={`text-left px-0 pb-2 sm:pb-2.5 md:pb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-regular transition-all duration-300 ease-out
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
