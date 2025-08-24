"use client";
import ApproachSection from "@/components/ApproachSection";
import CaseStudySection from "@/components/CaseStudySection";
import SiteFooter from "@/components/Footer";
import SustainabilitySection from "@/components/SustainabilitySection";
import Image from "next/image";
import CapabilitiesSection from "@/components/ManufacturingCapabilities";
import { useState } from "react";

const tabData = [
  {
    title: "Tooling",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    desc: "High-precision tooling for every need.",
  },
  {
    title: "CNC",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "Advanced CNC machining for complex parts.",
  },
  {
    title: "EDM",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
    desc: "Precision EDM for intricate geometries.",
  },
  {
    title: "Automation",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    desc: "Smart automation for manufacturing efficiency.",
  },
];

const approachContent = [
  {
    title: "We Build What Matters",
    desc: `From concept to precision-built reality,
 We create with purpose, speed 
and obsessive detail.
 This is industrial manufacturing where
 manufacturability is engineered 
from day one`,
  },
  {
    title: "Business-Aligned Manufacturing",
    desc: "We align our manufacturing processes with your business goals for maximum impact.",
  },
  {
    title: "Scalable and Specialized",
    desc: "Our solutions scale with your needs and are tailored for specialized requirements.",
  },
  {
    title: "Vertically integrated for Speed",
    desc: "Integrated processes mean faster cycles and seamless delivery.",
  },
  {
    title: "Precision by Design",
    desc: "Every product is engineered for accuracy and reliability from the start.",
  },
  {
    title: "Innovation with Purpose",
    desc: "We innovate with a clear focus on solving real-world challenges.",
  },
  {
    title: "Execution Obsessed",
    desc: "Our team is dedicated to flawless execution at every stage.",
  },
];

export default function Home() {
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
    <main className="bg-[#F5F5F5] min-h-screen flex flex-col">
      {/* 1. Hero Image Section (full width) */}
      <section className="relative w-full h-screen min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Factory machinery"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* 2. Centered Headline Section */}
      <section className="w-full min-h-[40vh] flex items-center">
        <div className="px-30 mx-auto w-full flex items-center justify-start">
          <h1 className="text-5xl md:text-7xl font-semibold text-[#1789FF] text-left">
            Shaping Precision,
            <br />
            Engineering what matters
          </h1>
        </div>
      </section>

      {/* 3. Two-column Approach Section */}
      <ApproachSection items={approachContent} />

      {/* 4. Case Study Section with Background (full width) */}
      <CaseStudySection
        sector="Consumer Electronics"
        challenge="Deliver a cosmetically critical
 control panel in 6 weeks"
        href="case-study"
        title="Speed Without
 Compromise"
        key={"case-study"}
      />

      {/* 5. Solutions Section */}
      <section className="w-full min-h-[60vh] flex items-center bg-white">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-0">
          {/* Left column */}
          <div className="flex flex-col justify-start p-8">
            <h2 className="text-lg font-semibold text-[#595959] uppercase tracking-widest mb-6">
              Solutions
            </h2>
            <p className="text-2xl md:text-4xl font-semibold text-[#1789FF] leading-snug">
              We don't sell capabilities.
              <br />
              We build the right one for you.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-center p-8 text-[#595959]">
            <p className="text-2xl leading-relaxed mb-6">
              At Mnex, every solution is engineered around your product, scale
              and market demands.
            </p>
            <p className="text-2xl leading-relaxed">
              From precision tooling to smart automation. We deliver what your
              strategy needs, nothing more, nothing less.
            </p>
          </div>
        </div>
      </section>

      <CapabilitiesSection tabs={tabData} />

      {/* 7. Sustainability Section */}
      <SustainabilitySection />

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
