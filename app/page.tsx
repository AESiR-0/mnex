"use client";
import ApproachSection from "@/components/ApproachSection";
import CaseStudySection from "@/components/CaseStudySection";
import SustainabilitySection from "@/components/SustainabilitySection";
import CapabilitiesSection from "@/components/ManufacturingCapabilities";
import { useState } from "react";
import Header from "@/components/Header";

const tabData = [
  {
    title: "Tooling",
    video: "/videos/home/Solutions - Tooling.webm",
    desc: "Tools that shape outcomes.",
    link: "/solutions#tooling",
  },
  {
    title: "Injection Molding",
    video: "/videos/home/Solutions - Injection Molding.webm",
    desc: `Where material, machine 
    and process align.`,
    link: "/solutions#injection-molding",
  },
  {
    title: "Smart Automation & Assembly",
    video: "/videos/home/Solutions - Smart Automation & Fixtures.webm",
    desc: "Automation designed to flow-assembly built to scale",
    link: "/solutions#smart-automation-assembly",
  },
  {
    title: "Integrated Product Development",
    video:
      "/videos/home/Solutions - Integrated Product Development.webm",
    desc: `Design thinking, 
    built for reality.`,
    link: "/solutions#integrated-product-development",
  },
];

const approachContent = [
  {
    title: "We Build What Matters",
    desc: `From concept to precision-built reality, we create with purpose, speed and obsessive detail. This is industrial manufacturing where manufacturability is engineered from day one.`,
  },
  {
    title: "Vision, Engineered",
    desc: `From the very first step, we align our manufacturing strategy to your business strategy - not the other way round.`,
  },
  {
    title: "Innovation That Serves",
    desc: `Smart technology, no overengineering—just practical, scalable value aligned to your goals`,
  },
  {
    title: "Built to Scale + Specialize",
    desc: `From global programs to custom builds, we deliver with equal precision and commitment—robust for scale, flexible for specialization.`,
  },
  // {
  //   title: "Vertically Integrated for Speed",
  //   desc: "Tooling, molding, automation, assembly - all in one place for tighter control and faster delivery.",
  // },
  // {
  //   title: "Precision by Design",
  //   desc: "Decades of expertise ensure stable, repeatable, high-accuracy parts.",
  // },
  // {
  //   title: "Innovation That Serves",
  //   desc: "Smart tech, applied with intention. No overengineering. No waste.",
  // },
  {
    title: "Integrated Precision, Delivered Fast",
    desc: `Tooling, molding, automation, and assembly under one roof—for speed, control, and accuracy.`,
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
          challenge={`Reduce cost for a long-running program without changing the material, function & aesthetics.`}
          href="/industries/cei#case-study"
          title="Doubling Output with Multi-Level Tooling"
          key={"case-study"}
        />

        {/* 5. Solutions Section */}
        <section className="w-full md:min-h-[60vh]  justify-start py-6 pb-10 sm:py-8 md:py-10 flex flex-col items-center bg-white lg:px-8">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Header className="pb-3 sm:pb-4 md:pb-5 max-md:text-center">Solutions</Header>
          </div>
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
            {/* Left column */}
            <div className="flex flex-col justify-start">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-[#1789FF] leading-snug">
                We don't sell capabilities.
                <br />
                We build the right one for you.
              </p>
            </div>

            {/* Right column */}
            <div className="flex flex-col justify-center text-[#595959]">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-3 sm:mb-4 md:mb-6">
                At Mnex, every solution is engineered around your product, scale
                and market demands.
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                From precision tooling to smart automation. We deliver exactly what your strategy demands.

              </p>
            </div>
          </div>
        </section>

        <CapabilitiesSection tabs={tabData} />

        {/* 6. Sustainability Section */}
        <SustainabilitySection />

        {/* <section className="w-full py-20 bg-[#009B80]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to build what matters?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let's discuss how Mnex can help you achieve your manufacturing goals with precision, speed, and innovation.
            </p>
            <ContactButton />
          </div>
        </section> */}
      </div>
    </main>
  );
}
