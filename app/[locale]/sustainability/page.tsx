"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";
import TranslatableText from "@/components/TranslatableText";

type Capability = {
  title: string;
  headline: string;
  desc: string;
  bullets: string[];
  img: string;
  video?: string;
};

const getCapabilities = (t: any): Capability[] => [
  {
    title: t("Sustainability.environmental"),
    headline: t("Sustainability.environmentalImpact.headline"),
    desc: ``,
    bullets: [
      t("Sustainability.environmentalImpact.bullet1"),
      t("Sustainability.environmentalImpact.bullet2"),
      t("Sustainability.environmentalImpact.bullet3"),
      t("Sustainability.environmentalImpact.bullet4"),
    ],
    img: "/static/home/sustainability.webp",
    video: "/videos/sustainability/Environmental_impact.webm",
  },
  {
    title: t("Sustainability.material"),
    headline: t("Sustainability.materialEfficiency.headline"),
    desc: "",
    bullets: [
      t("Sustainability.materialEfficiency.bullet1"),
      t("Sustainability.materialEfficiency.bullet2"),
    ],
    img: "/static/home/sustainability.webp",
    video: "/videos/sustainability/Material_Efficiency.webm",
  },
  {
    title: t("Sustainability.responsibleProcurement"),
    headline: t("Sustainability.responsibleProcurementContent.headline"),
    desc: "",
    bullets: [
      t("Sustainability.responsibleProcurementContent.bullet1"),
      t("Sustainability.responsibleProcurementContent.bullet2"),
      t("Sustainability.responsibleProcurementContent.bullet3"),
    ],
    img: "/static/home/sustainability.webp",
    video: "/videos/sustainability/Responsible+Procurement.webm",
  },
  {
    title: t("Sustainability.compliance"),
    headline: t("Sustainability.complianceStandards.headline"),
    desc: "",
    bullets: [
      t("Sustainability.complianceStandards.bullet1"),
      t("Sustainability.complianceStandards.bullet2"),
    ],
    img: "/static/home/sustainability.webp",
    video: "/videos/sustainability/Complaince_Standards.webm",
  },
];

export default function Sustainability() {
  const t = useTranslations();
  const capabilities = getCapabilities(t);
  return (
    <div className="pt-10">
      <section className="w-full text-[#009b80]  bg-[#F2F2F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
          {/* Headline */}
          <h1
            className="pt-3 sm:pt-4 md:pt-5 font-semibold leading-tight
                       text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          >
            <TranslatableText translationKey="Sustainability.hero.title" />
            <br />
            <TranslatableText translationKey="Sustainability.hero.subtitle" />
          </h1>

          {/* Copy */}
          <div className="mt-4 sm:mt-6 md:mt-8 space-y-2 sm:space-y-3 md:space-y-5">
            <p
              className="mx-auto max-w-2xl leading-relaxed
                        text-base sm:text-lg"
            >
              <TranslatableText translationKey="Sustainability.hero.description1" />
              <br /> <TranslatableText translationKey="Sustainability.hero.description2" />
            </p>
          </div>
        </div>
      </section>
      {/* Solar Energy Data Section */}
      <section className="w-full bg-[#eaeaea] py-10 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header className="text-center text-xs sm:text-sm font-medium text-[#009b80] uppercase tracking-[0.15em] mb-0 pb-12 sm:pb-16 md:pb-20">
            <TranslatableText translationKey="Sustainability.solarEnergy.title" />
          </Header>

          <div className="grid grid-cols-1 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-0 sm:place-items-center lg:gap-8">
            {/* Solar Panels */}
            <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink">
                <Image
                  src="/static/sustainability/solar panel.svg"
                  alt="Solar Panel Icon"
                  width={50}
                  height={50}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#009b80]"
                />
              </div>
              <div className="text-left  min-w-0 flex-1">
                <div className="text-[#009b80] font-bold leading-none text-base sm:text-lg lg:text-xl">
                  1,562
                </div>
                <div className="text-[#009b80] font-medium text-xs sm:text-sm lg:text-base">
                  <TranslatableText translationKey="Sustainability.solarEnergy.panels" />
                </div>
              </div>
            </div>

            {/* Annual Power Generation */}
            <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0">
                <Image
                  src="/static/sustainability/annual power.svg"
                  alt="Power Generation Icon"
                  width={50}
                  height={50}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#009b80]"
                />
              </div>
              <div className="text-left   min-w-0 flex-1">
                <div className="text-[#009b80] text-xs sm:text-sm lg:text-base">
                  <TranslatableText translationKey="Sustainability.solarEnergy.powerGeneration" />
                </div>
              </div>
            </div>

            {/* CO2 Emissions Reduction */}
            <div className="sm:col-span-2 lg:col-span-1 sm:flex sm:justify-center lg:justify-start">
              <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
                <div className="flex-shrink-0">
                  <Image
                    src="/static/sustainability/c02 emission.svg"
                    alt="CO2 Reduction Icon"
                    width={50}
                    height={50}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#009b80]"
                  />
                </div>
                <div className="text-left  min-w-0 flex-1  lg:text-left">
                  <div className="text-[#009b80] font-medium text-xs sm:text-sm lg:text-base">
                    <TranslatableText translationKey="Sustainability.solarEnergy.co2Reduction" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <CapabilitiesSection />
      </section>
    </div>
  );
}

function CapabilitiesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations();
  const capabilities = getCapabilities(t);
  const activeCapability = capabilities[activeTab];

  // Function to format bullet text with bold parts
  const formatBulletText = (text: string) => {
    // Handle bold text with ** syntax
    if (text.includes("**")) {
      const parts = text.split("**");
      if (parts.length >= 3) {
        return (
          <>
            <span>{parts[0]}</span>
            <span className="font-semibold">{parts[1]}</span>
            <span>{parts.slice(2).join("**")}</span>
          </>
        );
      }
    }

    // Handle text with colons
    const parts = text.split(":");
    if (parts.length > 1) {
      return (
        <>
          <span className="font-bold">{parts[0]}:</span>
          <span>{parts.slice(1).join(":")}</span>
        </>
      );
    }
    return text;
  };

  return (
    <section className="w-full h-screen  max-[400px]:h-[120vh] whitespace-pre-line bg-[#eaeaea]  flex flex-col">
      {/* Header */}
      <div className="bg-[#ffff] py-3 sm:py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="flex max-md:flex-wrap max-md:justify-center max-md:gap-y-2 justify-between gap-4 sm:gap-6 md:gap-20">
            {capabilities.map((capability, index) => (
              <button
                key={capability.title}
                onClick={() => setActiveTab(index)}
                className={`text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 max-md:py-2 whitespace-pre-line transition-colors ${
                  activeTab === index
                    ? "text-[#009b80] "
                    : "text-[#8a8a8a] hover:text-[#009b80]"
                }`}
              >
                {capability.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-16 relative">
        {/* Background Video/Image */}
        {activeCapability.video ? (
          <video
            key={`${activeCapability.title}-${activeTab}`}
            className="absolute inset-0 max-[400px]:h-screen w-full h-[85vh] object-cover"
            src={activeCapability.video}
            muted
            playsInline
            autoPlay
            loop
            onLoadedMetadata={(e) => {
              // For Compliance & Standards video, set duration to 4 seconds
              if (activeCapability.title === "Compliance & Standards") {
                const video = e.currentTarget;
                video.currentTime = 0;
                const interval = setInterval(() => {
                  if (video.currentTime >= 4) {
                    video.currentTime = 0;
                  }
                }, 100);

                // Cleanup interval when component unmounts
                return () => clearInterval(interval);
              }
            }}
          />
        ) : (
          <Image
            src={activeCapability.img}
            alt={activeCapability.title}
            fill
            className="object-cover"
            priority={activeTab === 0}
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r h-[85vh] max-[400px]:h-screen from-black/75 to-transparent" />

        {/* Content overlay */}
        <div className="relative z-10 h-full  flex items-start py-20">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-full  ">
              {/* Headline */}
              <h3 className="text-white text-2xl mb-12 md:text-3xl lg:text-5xl font-medium leading-tight  whitespace-pre-line">
                {activeCapability.headline}
              </h3>

              {/* Description */}
              <p className="text-white/90   text-lg md:text-xl leading-normal mb-4 whitespace-pre-line">
                {activeCapability.desc}
              </p>

              <ul className="space-y-4 ">
                {activeCapability.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="text-white/90 max-md:pr-24  pr-40 text-base  md:text-lg leading-normal flex items-start"
                  >
                    <span className="font-bold rounded-full mr-2">•</span>
                    <span>{formatBulletText(bullet)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
