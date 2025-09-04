"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import { useTranslations } from 'next-intl';

export type ApproachItem = { title: string; desc: string };

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check screen width
      const isSmallScreen = window.innerWidth < 768;

      // Check if device has touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

      const isMobileDevice = isSmallScreen || hasTouch || isMobileUserAgent;

      setIsMobile(isMobileDevice);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    window.addEventListener('orientationchange', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', checkIsMobile);
    };
  }, []);

  return isMobile;
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
  const isMobile = useIsMobile();

  // viewport height (handles mobile address bar)
  useEffect(() => {
    const update = () => setVh(window.innerHeight || 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // scroll logic: pin + advance on down only (exactly like ManufacturingCapabilities)
  // Only enable on desktop
  useEffect(() => {
    if (!sectionRef.current || vh === 0 || items.length === 0 || isMobile) return;

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

      // where we are inside the pinned region
      const offset = Math.max(0, Math.min(y - topPx, items.length * 700 + 410));

      // which "frame" we are in (0..items.length-1)
      const idx = Math.min(items.length - 1, Math.floor(offset / 700));

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
  }, [vh, items.length, activeApproach, isMobile]);



  if (!items || items.length === 0) return null;


  const active = activeApproach; // 0 = "We Build", 1+ = approaches (all in items array now)

  // Debug logging

  const panelId = `${sectionId}-panel`;
  const activeTabId = active >= 0 ? `${sectionId}-tab-${active}` : undefined;

  // The container height is N * 700px + 200px (extra to release pin) - only on desktop
  const containerHeight = isMobile ? 'auto' : items.length * 700 + 200;

  return (
    <section className="w-full  bg-[#ececec]">
      {/* SCROLL CONTAINER (tall) */}
      <div
        ref={sectionRef}
        style={{ height: isMobile ? 'auto' : (vh ? `${containerHeight}px` : undefined) }}
        className="relative"
      >
        {/* STICKY LAYER (pinned) - only on desktop */}
        <div className={isMobile ? "relative" : "sticky top-0"}>
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
          <div className={`${isMobile ? 'min-h-[50vh]' : 'h-[60vh]'} flex items-start py-6 sm:py-8 md:py-10`}>
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
                <div className="flex  w-full lg:w-1/2 h-[78%] lg:h-full flex-col gap-2 sm:gap-3">
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
                        onClick={() => {
                          if (isMobile) {
                            // On mobile, just update the active state without scroll effects
                            setActiveApproach(i);
                            return;
                          }

                          // Calculate the scroll position for this tab (exactly like ManufacturingCapabilities)
                          const tabScrollPosition = i * 700 + 60;
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
