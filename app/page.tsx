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
    video: "/videos/home/Solutions - Tooling.webm",
    desc: "Tools that shape outcomes.",
  },
  {
    title: "Injection Molding",
    video: "/videos/home/Solutions - Injection Molding.webm",
    desc: "Where material, machine, and process align.",
  },
  {
    title: "Smart Automation & Assembly",
    video: "/videos/home/Solutions - Smart Automation & Fixtures.webm",
    desc: "Automation designed to flow-assembly built to scale",
  },
  {
    title: "Integrated Product Development",
    video:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    desc: "Design thinking, built for reality.",
  },
];

const approachContent = [
  {
    title: "We Build What Matters",
    desc: `From concept to precision-built reality,
We create with purpose, speed and obsessive detail.
This is industrial manufacturing where manufacturability is engineered from day one.`,
  },
  {
    title: "Vision, Engineered",
    desc: `Business-Aligned from Day One
We align every step of production to your business strategy—not the other way around.`,
  },
  {
    title: "Built to Scale or Specialize",
    desc: "Global programs or custom builds—we serve both with equal precision.",
  },
  {
    title: "Vertically Integrated for Speed",
    desc: "Tooling, molding, automation, assembly—all in one place for tighter control and faster delivery.",
  },
  {
    title: "Precision by Design",
    desc: "Decades of expertise ensure stable, repeatable, high-accuracy parts.",
  },
  {
    title: "Innovation That Serves",
    desc: "Smart tech, applied with intention. No overengineering. No waste.",
  },
  {
    title: "Driven to Deliver",
    desc: "Fast setups. Proven systems. A team that executes—every time.",
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
        <video
          src="/videos/home/hero.webm"
          autoPlay
          playsInline
          loop
          muted
          className="object-cover absolute inset-0 w-full h-full"
        />
      </section>

      {/* 2. Centered Headline Section */}
      <section className="w-full min-h-[20vh] md:min-h-[40vh] flex items-center">
        <div className="mx-auto max-w-7xl w-full flex items-center justify-start ">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1789FF] leading-tight">
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
    </main>
  );
}
