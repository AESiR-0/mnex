"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const [activeApproach, setActiveApproach] = useState(0);
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
      end: `+=${(items.length - 1) * 100}`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const step = Math.floor(progress * items.length);
        const clampedStep = Math.min(step, items.length - 1);

        if (clampedStep !== activeApproach) {
          setActiveApproach(clampedStep);
        }
      },
      onLeave: () => {
        setActiveApproach(items.length - 1);
      },
      onEnterBack: () => {
        setActiveApproach(0);
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

  const active = Math.max(0, Math.min(activeApproach, items.length - 1));
  const panelId = `${sectionId}-panel`;
  const activeTabId = `${sectionId}-tab-${active}`;

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className="w-full bg-[#D1D1D1] h-screen"
    >
      <section className="w-full min-h-[20vh] md:min-h-[30vh] flex items-center bg-[#F5F5F5] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl w-full flex items-center justify-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-[#1789FF] leading-tight">
            Shaping Precision,
            <br />
            Engineering what matters
          </h1>
        </div>
      </section>
      <div ref={contentRef} className="h-[70vh] flex items-start py-10">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:gap-24 md:grid-cols-2 items-start">
            {/* Left: Active content */}
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={activeTabId}
              className="flex flex-col gap-3 text-[#595959]"
            >
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest">
                Our Approach
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="contents"
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                    {items[active].title}
                  </h3>
                  <p className="text-lg whitespace-pre-wrap sm:text-xl md:text-2xl leading-relaxed">
                    {items[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Buttons */}
            <div
              className="flex flex-col gap-2 sm:gap-3"
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
                        const progress = i / (items.length - 1);
                        scrollTriggerRef.current.scroll(progress);
                      }
                    }}
                    className={`text-left px-0 py-2 sm:py-2.5 md:py-3 text-xl sm:text-2xl font-medium transition-all duration-300 ease-out
                      ${isActive
                        ? "text-[#009B80] font-semibold "
                        : "text-[#595959] hover:text-[#009B80] "
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
    </section>
  );
}
