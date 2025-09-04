"use client";
import ApproachSection from "@/components/ApproachSection";
import CaseStudySection from "@/components/CaseStudySection";
import SustainabilitySection from "@/components/SustainabilitySection";
import CapabilitiesSection from "@/components/ManufacturingCapabilities";
import { useState } from "react";
import Header from "@/components/Header";
import { useTranslations } from 'next-intl';

const getTabData = (t: any) => [
  {
    title: "Solutions.tooling",
    video: "/videos/home/Solutions - Tooling.webm",
    desc: "Solutions.toolingDesc",
    link: "/solutions#tooling",
  },
  {
    title: "Solutions.injectionMolding",
    video: "/videos/home/Solutions - Injection Molding.webm",
    desc: "Solutions.injectionMoldingDesc",
    link: "/solutions#injection-molding",
  },
  {
    title: "Solutions.smartAutomation",
    video: "/videos/home/Solutions - Smart Automation & Fixtures.webm",
    desc: "Solutions.smartAutomationDesc",
    link: "/solutions#smart-automation-assembly",
  },
  {
    title: "Solutions.productDevelopment",
    video:
      "/videos/home/Solutions - Integrated Product Development.webm",
    desc: "Solutions.productDevelopmentDesc",
    link: "/solutions#integrated-product-development",
  },
];

const getApproachContent = (t: any) => [
  {
    title: t("Home.approach.weBuild.title"),
    desc: t("Home.approach.weBuild.desc"),
  },
  {
    title: t("Home.approach.vision.title"),
    desc: t("Home.approach.vision.desc"),
  },
  {
    title: t("Home.approach.innovation.title"),
    desc: t("Home.approach.innovation.desc"),
  },
  {
    title: t("Home.approach.scale.title"),
    desc: t("Home.approach.scale.desc"),
  },
  {
    title: t("Home.approach.integrated.title"),
    desc: t("Home.approach.integrated.desc"),
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeApproach, setActiveApproach] = useState(0);
  const t = useTranslations();
  
  const tabData = getTabData(t);
  const approachContent = getApproachContent(t);

  const approachButtons = [
    "Home.approach.businessAligned",
    "Home.approach.scalable",
    "Home.approach.verticallyIntegrated",
    "Home.approach.precision",
    "Home.approach.innovation",
    "Home.approach.execution",
  ];

  return (
    <main className="bg-[#F5F5F5] min-h-screen flex flex-col">
      {/* 1. Hero Video Section (Normal Scroll) */}
      <section className="relative w-full h-screen">
        {/* Mobile Video */}
        <video
          src="/videos/home/hero_mobile.webm"
          autoPlay
          playsInline
          loop
          muted
          className="object-cover w-full h-full md:hidden"
        />
        
        {/* Desktop Video */}
        <video
          src="/videos/home/hero.webm"
          autoPlay
          playsInline
          loop
          muted
          className="object-cover w-full h-full hidden md:block"
        />
      </section>

      {/* 2. Content Container */}
      <div className="relative z-10">
        {/* 3. Two-column Approach Section */}
        <ApproachSection items={approachContent} />

        {/* 4. Case Study Section with Background (full width) */}
        <CaseStudySection
          sector={t("Home.caseStudy.sector")}
          challenge={t("Home.caseStudy.challenge")}
          href="/industries/cei#case-study"
          title={t("Home.caseStudy.title")}
          key={"case-study"}
        />

        {/* 5. Solutions Section */}
        <section className="w-full md:min-h-[60vh]  justify-start py-6 pb-10 sm:py-8 md:py-10 flex flex-col items-center bg-white lg:px-8">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Header className="pb-3 sm:pb-4 md:pb-5 max-md:text-center">{t("Home.solutions.title")}</Header>
          </div>
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
            {/* Left column */}
            <div className="flex flex-col justify-start">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-[#1789FF] leading-snug">
                {t("Home.solutions.leftTitle.line1")}
                <br />
                {t("Home.solutions.leftTitle.line2")}
              </p>
            </div>

            {/* Right column */}
            <div className="flex flex-col justify-center text-[#595959]">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-3 sm:mb-4 md:mb-6">
                {t("Home.solutions.rightText.paragraph1")}
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                {t("Home.solutions.rightText.paragraph2")}
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
