"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ApproachItem = { title: string; desc: string };

export default function ApproachSection({
  items,
  sectionId = "approach",
}: {
  items: ApproachItem[];
  sectionId?: string;
}) {
  const [activeApproach, setActiveApproach] = useState(-1); // Start with no active approach
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // Create smooth scroll trigger for pinning
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${items.length * 100}`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const step = Math.floor(progress * (items.length + 1)); // +1 for inactive state
        const clampedStep = Math.min(step, items.length);

        // Set to -1 for inactive state, 0+ for active approaches
        const newActiveApproach = clampedStep === 0 ? -1 : clampedStep - 1;

        if (newActiveApproach !== activeApproach) {
          setActiveApproach(newActiveApproach);
        }
      },
      onLeave: () => {
        setActiveApproach(items.length - 1);
      },
      onEnterBack: () => {
        setActiveApproach(-1); // Back to inactive state
      }
    });

    // Cleanup
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [items.length, activeApproach]);

  if (!items || items.length === 0) return null;

  const active = activeApproach >= 0 ? Math.max(0, Math.min(activeApproach, items.length - 1)) : -1;
  const panelId = `${sectionId}-panel`;
  const activeTabId = active >= 0 ? `${sectionId}-tab-${active}` : undefined;

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className="w-full bg-[#D1D1D1] min-h-screen"
    >
      <section className="w-full relative min-h-[20vh] md:min-h-[40vh] flex items-center justify-start bg-[#ffffff] overflow-hidden">
        {/* Background Image with reduced opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/static/home/second_section.webp"
            alt="Background"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 mx-auto max-w-7xl w-full flex items-center justify-start ">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-[#1789FF] leading-tight">
            Shaping Precision,
            <br />
            Engineering what matters
          </h1>
        </div>
      </section>
      <div ref={contentRef} className="h-[70vh] flex  items-start py-10">
        <div className="max-w-7xl space-y-10 mx-auto w-full ">
          <h2 className="text-xs text-[#595959] font-medium uppercase tracking-widest">
            Our Approach
          </h2>
          <div className="flex justify-between items-start">
            {/* Left: Active content */}
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={activeTabId}
              className="flex flex-col w-1/2 gap-3 text-[#595959]"
            >


              <AnimatePresence mode="wait">
                {active >= 0 ? (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="contents"
                  >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                      {items[active].title}
                    </h3>
                    <p className="text-lg whitespace-pre-wrap sm:text-xl md:text-xl leading-relaxed">
                      {items[active].desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="inactive"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="contents"
                  >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                      We Build What Matters
                    </h3>
                    <p className="text-lg whitespace-pre-wrap sm:text-xl md:text-xl leading-relaxed">
                      From concept to precision-built reality,<br />
                      We create with purpose, speed and obsessive detail.<br />
                      This is industrial manufacturing where manufacturability is engineered from day one.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Buttons - Only show when an approach is active */}
            <AnimatePresence>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex  flex-col gap-2 sm:gap-3"
                role="tablist"
                aria-label="Approach options"
              >
                {items.map((it, i) => {
                  const isActive = active === i;
                  const tabId = `${sectionId}-tab-${i}`;
                  return (
                    <button
                      key={`${tabId}-${it.title}-${i}`}
                      id={tabId}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={panelId}
                      onClick={() => {
                        setActiveApproach(i);
                        // Smooth scroll to the specific progress
                        if (scrollTriggerRef.current) {
                          const progress = (i + 1) / (items.length + 1); // +1 for inactive state
                          scrollTriggerRef.current.scroll(progress);
                        }
                      }}
                      className={`text-left px-0 pb-2 sm:pb-2.5 md:pb-3 text-xl sm:text-2xl md:text-3xl  font-medium transition-all duration-300 ease-out
                          ${isActive
                          ? "text-[#009B80]  "
                          : "text-[#969696] hover:text-[#009B80] "
                        }`}
                    >
                      {it.title}
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
