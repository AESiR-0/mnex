"use client";
import { useState } from "react";

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
    title: "Fast-Tracked Control Panel",
    challenge:
      "Deliver a cosmetically critical control panel in 6 weeks, evaluating options like spray painting, IMD, and IML.",
    approach: [
      "Conducted a process trade-off study and chose In-Mold Labeling (IML) for consistent quality, flexible MOQs, and fast deployment.",
      "Solved thin-wall warpage with robust tooling design, optimized gate placement, and precise processing controls.",
      "Delivered a fully integrated solution—tooling, machine pairing, and automation—developed in parallel at the design stage.",
    ],
    outcome: [
      "Concept to production in 6 weeks",
      "Finish quality on par with spray painting, zero post-processing",
    ],
    quote:
      "Partnering with Mnex on the right process—and having them execute end-to-end with incredible speed and quality—let us focus on our product, not the manufacturing hurdles.",
    author: "Program Manager, Electronics (Anonymized)",
  },
  {
    id: 2,
    title: "Another Case Study",
    challenge: "Description of another challenge...",
    approach: ["Step 1", "Step 2"],
    outcome: ["Result 1", "Result 2"],
    quote: "Another testimonial goes here.",
    author: "Manager, Client X",
  },
];

export default function CaseStudySection() {
  const [active, setActive] = useState(0);
  const study = caseStudies[active];

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8 text-xs uppercase tracking-widest text-[#595959]">
          <span>Case Study</span>
          <div className="flex gap-2">
            {caseStudies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`px-2 py-1 ${
                  active === idx
                    ? "text-[#1789FF] font-semibold"
                    : "text-gray-400"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1789FF] mb-6">
              {study.title}
            </h2>

            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase text-[#1789FF] mb-1">
                Challenge
              </h3>
              <p className="text-[#595959] text-sm md:text-base">
                {study.challenge}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase text-[#1789FF] mb-1">
                Mnex Approach
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-[#595959] text-sm md:text-base">
                {study.approach.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase text-[#1789FF] mb-1">
                Outcome
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-[#595959] text-sm md:text-base">
                {study.outcome.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Image Placeholder) */}
          <div className="w-full h-64 md:h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Image/Graphic
          </div>
        </div>

        {/* Quote */}
        <div className="flex mt-10 max-w-3xl gap-8">
          <blockquote className="relative text-base md:text-lg text-[#1789FF] font-medium leading-relaxed">
            <span className="absolute  md:-left-6 text-6xl md:text-8xl font-serif text-[#1789FF] select-none">
              &ldquo;
            </span>
          </blockquote>
          <div className="border-t text-xl md:text-2xl border-gray-200 pt-6">
            <blockquote className="relative  text-[#1789FF] font-medium leading-relaxed">
              {/* Big opening quote */}
              <span className="">{study.quote}"</span>
            </blockquote>
            <p className="mt-4 text-[#1789FF] text-lg">{study.author}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
