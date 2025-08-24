"use client";
import { useState } from "react";

export type ApproachItem = { title: string; desc: string };

export default function ApproachSection({
  items,
  sectionId = "approach",
}: {
  items: ApproachItem[];
  sectionId?: string;
}) {
  const [activeApproach, setActiveApproach] = useState(0);

  const approachButtons = [
    "Business-Aligned Manufacturing",
    "Scalable and Specialized",
    "Vertically integrated for Speed",
    "Precision by Design",
    "Innovation with Purpose",
    "Execution Obsessed",
  ];

  return (
    <section id={sectionId} className="w-full bg-[#eaeaea]">
      <div className="max-w-7xl mx-auto w-full px-4 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-start">
          {/* Left: Active content */}
          <div className="flex flex-col gap-3 text-[#595959]">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest">
              Our Approach
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              {items[activeApproach]?.title}
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
              {items[activeApproach]?.desc}
            </p>
          </div>

          {/* Right: Buttons */}
          <div
            className="flex flex-col gap-2 sm:gap-3"
            role="tablist"
            aria-label="Approach options"
          >
            {approachButtons.map((label, i) => {
              const isActive = activeApproach === i;
              return (
                <button
                  key={label}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${sectionId}-panel-${i}`}
                  onClick={() => setActiveApproach(i)}
                  className={`text-left px-0 py-2 sm:py-2.5 md:py-3 text-xl sm:text-2xl font-medium transition-colors outline-none
                    ${isActive ? "text-[#009B80] font-semibold" : "text-[#595959] hover:text-[#009B80]"}
                    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#009B80] focus-visible:rounded-md`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hidden panels for a11y (optional, keeps IDs matched to aria-controls) */}
        <div className="sr-only" aria-live="polite">
          {items.map((item, i) => (
            <div id={`${sectionId}-panel-${i}`} key={item.title}>
              {i === activeApproach ? `${item.title}: ${item.desc}` : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
