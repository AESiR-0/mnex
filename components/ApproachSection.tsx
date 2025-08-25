"use client";
import { useEffect, useState } from "react";

export type ApproachItem = { title: string; desc: string };

export default function ApproachSection({
  items,
  sectionId = "approach",
}: {
  items: ApproachItem[];
  sectionId?: string;
}) {
  const [activeApproach, setActiveApproach] = useState(0);

  // Clamp active index if items change / shrink
  useEffect(() => {
    if (!items?.length) return;
    if (activeApproach > items.length - 1) {
      setActiveApproach(items.length - 1);
    }
  }, [items, activeApproach]);

  if (!items || items.length === 0) return null;

  const active = Math.max(0, Math.min(activeApproach, items.length - 1));
  const panelId = `${sectionId}-panel`;
  const activeTabId = `${sectionId}-tab-${active}`;

  return (
    <section id={sectionId} className="w-full bg-[#eaeaea]">
      <div className="max-w-7xl mx-auto w-full px-4 py-10 sm:py-12 md:py-16">
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
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              {items[active].title}
            </h3>
            <p className="text-lg whitespace-pre-wrap sm:text-xl md:text-2xl leading-relaxed">
              {items[active].desc}
            </p>
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
                  key={`${tabId}-${it.title}`}
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
                  }
                  focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#009B80] focus-visible:rounded-md`}
                >
                  {it.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
