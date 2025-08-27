import CapabilitiesSection from "@/components/ManufacturingCapabilities";
import React from "react";

const tabData = [
  {
    title: "Tooling",
    img: "/images/capabilities/tooling.jpg", // replace with actual image path
    headline: "Tools that shape outcomes.",
    desc: "Tools that drive performance, not just parts. Our toolmakers engage early to simplify designs, cut costs, and speed up launches—without compromising quality.",
    bullets: [
      "Innovation Built-In: 30+ patents; every mold is a system for assembly, encapsulation, and efficiency.",
      "Motion Complexity Mastered: Slides, micro-lifters, and core pullers engineered for precise movements.",
      "Precision at Scale: CNC, EDM, wire-cutting, and grinding done in-house for micron-level tolerances.",
      "Integrated by Design: Molds eliminate downstream steps by enabling inserts, sub-assemblies, and encapsulation.",
      "Ready for Anything: From rapid prototypes to stack molds for high volumes, our toolroom is fully equipped.",
    ],
  },
  {
    title: "Injection Molding",
    img: "/images/capabilities/molding.jpg",
    headline: "Molding that scales with you.",
    desc: "From prototypes to high-volume runs, our molding expertise ensures consistency, precision, and efficiency.",
    bullets: [
      "Flexible Capacity: High-tonnage presses to handle diverse part sizes.",
      "Advanced Materials: Expertise in engineering resins and specialty polymers.",
      "Automation-Integrated: Robotic handling for consistency and reduced labor.",
      "Quality Assured: In-line monitoring and testing for every batch.",
    ],
  },
  {
    title: "Smart Automation & Assembly",
    img: "/images/capabilities/automation.jpg",
    headline: "Automation engineered with purpose.",
    desc: "We design automation solutions that enhance scalability, reduce risk, and improve quality across production lines.",
    bullets: [
      "Custom Automation: Tailored systems for assembly and testing.",
      "Scalable Solutions: From pilot lines to full production automation.",
      "Smart Control: Closed-loop systems for real-time quality assurance.",
      "Efficiency Gains: Reduce cycle times, costs, and manual errors.",
    ],
  },
  {
    title: "Product Level Testing",
    img: "/images/capabilities/testing.jpg",
    headline: "Testing that ensures trust.",
    desc: "Comprehensive testing services validate function, durability, and compliance before products hit the market.",
    bullets: [
      "Rigorous Standards: Functional, environmental, and lifecycle testing.",
      "Digital Traceability: Paperless QA for transparent quality history.",
      "Faster to Market: Rapid validation reduces launch risks.",
      "Compliance Ready: Certified processes for global standards.",
    ],
  },
  {
    title: "Integrated Product Development",
    img: "/images/capabilities/development.jpg",
    headline: "From concept to reality.",
    desc: "We partner with you end-to-end — aligning product design, manufacturing, and validation for faster launches and stronger outcomes.",
    bullets: [
      "Collaborative Design: Cross-functional teams align early with customers.",
      "Rapid Prototyping: Accelerate iterations with 3D printing and pilot tooling.",
      "End-to-End Integration: From concept to testing, everything under one roof.",
      "Faster Launches: Streamlined processes shorten time-to-market.",
    ],
  },
];

const Page = () => {
  return (
    <div>
      <section className="w-full bg-[#F4F4F4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
          {/* Headline */}
          <h1
            className="text-[#3D3D3D] font-semibold leading-tight
                       text-2xl sm:text-3xl md:text-4xl"
          >
            We don’t sell capabilities.
            <br />
            We build the right one for you.
          </h1>

          {/* Copy */}
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-[#666]">
            <p
              className="mx-auto max-w-2xl leading-relaxed
                        text-sm sm:text-[15px] md:text-base"
            >
              At Mnex, we start with your product, scale, and market risks, then
              shape a complete solution around it.
            </p>
            <p
              className="mx-auto max-w-3xl leading-relaxed
                        text-sm sm:text-[15px] md:text-base"
            >
              From tooling and molding to automation and integrated product
              development, we deliver what your strategy truly needs.
            </p>
          </div>
        </div>
      </section>
      <section>
        <CapabilitiesSection tabs={tabData} />
      </section>
    </div>
  );
};

export default Page;
