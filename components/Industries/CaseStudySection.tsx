"use client";
import { useState } from "react";
import Header from "@/components/Header";

type CaseStudy = {
  id: number;
  title: string;
  challenge: string;
  approach: string[];
  outcome: string[];
  quote: string;
  author: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Doubling Output with Multi-Level Tooling",
    challenge:
      "Reduce cost per part for a long-running legacy program without changing the material, function, or aesthetics of a stable production part.",
    approach: [
      `Designed and built a Multi-Level Tool (MLT) that doubled cavitation—and productivity—without requiring a larger press.\n\nDeveloped a lightweight hot runner system to reduce tool mass, allowing the MLT to run on existing machines across all production sites.\n\nMaintained full part integrity and dimensional stability despite increased mold complexity and shot size.`,
    ],
    outcome: [
      "2× throughput achieved without additional floor space or new capital equipment",
      "Significant cost-per-part reduction with no compromises in quality or process reliability",
    ],
    quote: "",
    author: "",
  },
  // {
  //   id: 2,
  //   title: "Fast-Tracked Control Panel",
  //   challenge:
  //     "Deliver a cosmetically critical control panel in 6 weeks, evaluating options like spray painting, IMD, and IML.",
  //   approach: [
  //     "Conducted a process trade-off study and chose In-Mold Labeling (IML) for consistent quality, flexible MOQs, and fast deployment.",
  //     "Solved thin-wall warpage with robust tooling design, optimized gate placement, and precise processing controls.",
  //     "Delivered a fully integrated solution—tooling, machine pairing, and automation—developed in parallel at the design stage.",
  //   ],
  //   outcome: [
  //     "Concept to production in 6 weeks",
  //     "Finish quality on par with spray painting, zero post-processing",
  //   ],
  //   quote:
  //     "Partnering with Mnex on the right process—and having them execute end-to-end with incredible speed and quality—let us focus on our product, not the manufacturing hurdles.",
  //   author: "Program Manager, Electronics (Anonymized)",
  // },
];

export default function CaseStudySection() {
  const [active, setActive] = useState(0);
  const study = caseStudies[active];

  return (
    <div className="max-w-7xl py-16 sm:py-20 mx-auto px-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8 text-xs uppercase tracking-widest text-[#595959]">
        <div className="flex w-full pb-16 gap-5">
          <Header className="mb-0 ">Case Study</Header>
          <div className="flex gap-2">
            {caseStudies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`px-2  ${active === idx
                  ? "text-[#1789FF] font-semibold"
                  : "text-gray-400"
                  }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid max-md:grid-cols-1 gap-x-20 grid-cols-2 items-start">
        {/* Left Column - Text Content (2/3 width) */}
        <div className="">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1789FF] mb-6">
            {study.title}
          </h2>

          <div className="mb-6">
            <Header className="text-[#1789FF] py-6 mb-0">
              Challenge
            </Header>
            <p className="text-[#595959] text-sm md:text-base">
              {study.challenge}
            </p>
          </div>

          <div className="mb-6">
            <Header className="text-[#1789FF] py-6 mb-0">
              Mnex Approach
            </Header>
            <ul className="whitespace-pre-line space-y-2 text-[#595959] text-sm md:text-base">
              {study.approach}
            </ul>
          </div>

          <div className="mb-6">
            <Header className="text-[#1789FF] py-6 mb-0">
              Outcome
            </Header>
            <ul className="space-y-2 text-[#595959] text-sm md:text-base">
              {study.outcome.map((point, i) => {
                return (
                  <li className="flex gap-2" key={i}><span className="font-bold">•</span><span className="">{point}</span></li>
                )
              })}
            </ul>
          </div>

          {/* Quote - Only show if quote exists */}
          {study.quote && (
            <div className="flex mt-10 max-w-3xl gap-8">
              <blockquote className="relative text-base md:text-lg text-[#1789FF] font-medium leading-relaxed">
                <span className="absolute md:-left-6 text-6xl md:text-8xl font-serif text-[#1789FF] select-none">
                  &ldquo;
                </span>
              </blockquote>
              <div className="border-t text-xl md:text-2xl border-gray-200 pt-6">
                <blockquote className="relative text-[#1789FF] font-medium leading-relaxed">
                  <span className="">{study.quote}"</span>
                </blockquote>
                <p className="mt-4 text-[#1789FF] text-lg">{study.author}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Image Placeholder (1/3 width) */}
        <div className="md:col-span-1">
          <div className="w-full h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            📷 Image of the {study.title.toLowerCase()} or production line in operation
          </div>
        </div>
      </div>
    </div>
  );
}
