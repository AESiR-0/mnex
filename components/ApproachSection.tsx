"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ApproachItem = { title: string; desc: string };

export default function ApproachSection({
  items,
  sectionId = "approach",
  releaseOffset = 200, // extra px after last item
}: {
  items: ApproachItem[];
  sectionId?: string;
  releaseOffset?: number;
}) {
  const [activeApproach, setActiveApproach] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Handle scroll-driven step switching
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const totalHeight = window.innerHeight * items.length + releaseOffset;
      const scrollTop = Math.min(
        Math.max(-rect.top, 0),
        totalHeight - window.innerHeight
      );

      const step = Math.floor(scrollTop / window.innerHeight);
      setActiveApproach(Math.min(step, items.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length, releaseOffset]);

  if (!items || items.length === 0) return null;

  const active = Math.max(0, Math.min(activeApproach, items.length - 1));
  const panelId = `${sectionId}-panel`;
  const activeTabId = `${sectionId}-tab-${active}`;

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      // full height = N * 100vh + release offset
      style={{ height: `${items.length * 100}vh`, minHeight: "100vh" }}
      className="w-full bg-[#eaeaea]"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4">
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
                  transition={{ duration: 0.3 }}
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
                    onClick={() => setActiveApproach(i)}
                    className={`text-left px-0 py-2 sm:py-2.5 md:py-3 text-xl sm:text-2xl font-medium transition-colors outline-none
                      ${
                        isActive
                          ? "text-[#009B80] font-semibold"
                          : "text-[#595959] hover:text-[#009B80]"
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
