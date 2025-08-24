"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDownOnlyObserver } from "@/lib/useDownOnlyObserver";

export type ApproachItem = { title: string; desc: string };

export default function ApproachSection({
  items,
  sectionId = "approach",
}: {
  items: ApproachItem[];
  sectionId?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
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
    <section className="w-full bg-[#eaeaea] min-h-[75vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-around  gap-40  items-start px-4">
        <div className="w-1/2 flex flex-col gap-4 text-[#595959] h-full  justify-start items-start">
          <h2 className="text-sm font-semibold  mb-2 uppercase tracking-widest">
            Our Approach
          </h2>
          <div className="text-3xl font-semibold  mb-2">
            {items[activeApproach]?.title}
          </div>
          <div className=" text-2xl mb-4">{items[activeApproach]?.desc}</div>
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          {approachButtons.map((item, i) => (
            <button
              key={item}
              onClick={() => setActiveApproach(i)}
              className={`text-left px-0 py-2 text-2xl font-medium transition-colors duration-200 ${activeApproach === i ? "text-[#009B80] font-bold" : "text-[#595959]"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
