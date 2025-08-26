"use client";
import ApproachSection from "@/components/ApproachSection";
import CaseStudySection from "@/components/CaseStudySection";
import SiteFooter from "@/components/Footer";
import SustainabilitySection from "@/components/SustainabilitySection";
import Image from "next/image";
import CapabilitiesSection from "@/components/ManufacturingCapabilities";
import { useState } from "react";
import Header from "@/components/Header";

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
      "/videos/home/Solutions - Integrated Product Development.webm",
    desc: "Design thinking, built for reality.",
  },
];

const approachContent = [

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
      {/* 1. Hero Video Section (Normal Scroll) */}
      <section className="relative w-full h-screen">
        <video
          src="/videos/home/hero.webm"
          autoPlay
          playsInline
          loop
          muted
          className="object-cover w-full h-full"
        />

      </section>

      {/* 2. Content Container */}
      <div className="relative z-10">
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
        <section className="w-full min-h-[60vh] justify-center flex flex-col items-center bg-white px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl px-4  ">
            <Header>Solutions</Header>
          </div>
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-6 lg:gap-0 px-4  ">
            {/* Left column */}
            <div className="flex flex-col justify-start ">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-[#1789FF] leading-snug">
                We don't sell capabilities.
                <br />
                We build the right one for you.
              </p>
            </div>

            {/* Right column */}
            <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8 text-[#595959]">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-4 sm:mb-6">
                At Mnex, every solution is engineered around your product, scale
                and market demands.
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                From precision tooling to smart automation. We deliver what your
                strategy needs, nothing more, nothing less.
              </p>
            </div>
          </div>
        </section>

        <CapabilitiesSection tabs={tabData} />

        {/* 6. Sustainability Section */}
        <SustainabilitySection />
      </div>
    </main>
  );
}
