"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";

type Tab = {
  title: string;
  desc: string;
  video?: string;
  poster?: string;
  img?: string;
  chips?: string[];
  bullets?: string[];
};

function Badge({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[20px] border-2 border-white/90 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 flex flex-col items-center justify-center text-center shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] ${className}`}
    >
      <span className="font-semibold tracking-wide text-base sm:text-lg md:text-2xl leading-none">
        {title}
      </span>
      {subtitle ? (
        <span className="mt-1 text-xs sm:text-sm leading-none">{subtitle}</span>
      ) : null}
    </div>
  );
}

export default function CapabilitiesSection({
  tabs,
  sectionTitle = "Core Capabilities",
  eyebrow = "Core Capabilities",
}: {
  tabs: Tab[];
  sectionTitle?: string;
  eyebrow?: string;
}) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="w-full bg-[#ececec]">
      {/* Header and Tabs */}
      <div className="bg-[#ececec]">
        <Header className="text-center pt-4 sm:pt-6 pb-2 md:mb-0">Core Capabilities</Header>
        <div className="pb-3 flex justify-center z-10">
          <div className="w-full max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
            <div className="flex justify-between max-md:justify-start max-md:flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-20 overflow-x-auto no-scrollbar">
              {tabs.map((t, idx) => (
                <button
                  key={`${t.title}-${idx}`}
                  onClick={() => setActive(idx)}
                  className={`shrink-0 text-xs sm:text-lg md:text-xl py-2 sm:py-3 transition-colors ${active === idx
                    ? "text-[#1789FF]"
                    : "text-[#8a8a8a] hover:text-[#1789FF]"
                    }`}
                  aria-current={active === idx ? "page" : undefined}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative w-full h-[50vh] sm:h-[58vh] md:h-[64vh] lg:h-[75vh] xl:h-[85vh] overflow-hidden">
        {/* Media */}
        {tab.video ? (
          <video
            key={`${tab.title}-${active}`}
            className="absolute inset-0 w-full h-full object-cover"
            src={tab.video}
            poster={tab.poster}
            muted
            playsInline
            autoPlay
          />
        ) : tab.img ? (
          <Image
            key={`${tab.title}-${active}`}
            src={tab.img}
            alt={tab.title}
            fill
            className="object-cover"
            priority={active === 0}
          />
        ) : null}

        {/* Left gradient + brand tint */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
          <div className="absolute inset-0 bg-[#1789FF]/40 mix-blend-multiply" />
        </div>

        {/* Overlay content */}
        <div className="absolute h-full inset-0 z-10 flex items-center">
          <div className="px-4 sm:px-6 lg:px-8 h-full mx-auto w-full max-w-7xl">
            <div className="max-w-lg sm:max-w-xl md:max-w-2xl flex flex-col gap-3 sm:gap-4 justify-between h-full py-12 sm:py-16 md:py-20">
              <div className="">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium leading-tight mb-3 sm:mb-4 md:mb-6 whitespace-pre-line">
                  {tab.title === "Tooling"
                    ? "Tools that\nshape outcomes."
                    : tab.desc}
                </h3>

                {/* Show bullets if they exist, otherwise show badges */}
                {tab.bullets && tab.bullets.length > 0 ? (
                  <div className="mt-6 sm:mt-8 md:mt-10">
                    <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                      {tab.bullets.map((bullet, index) => (
                        <li key={index} className="text-white/90 text-sm sm:text-base leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link
                      href={`/solutions#${tab.title.toLowerCase().split(' ').join('-')}`}
                      className="inline-block text-white/90 text-xs sm:text-sm uppercase tracking-wide underline underline-offset-4 decoration-white/60 hover:decoration-white"
                    >
                      Learn more
                    </Link>
                    {/* Badges */}
                    <div className="flex flex-wrap text-left justify-start max-w-2xl gap-2 sm:gap-3 md:gap-4 mt-12 sm:mt-14 md:mt-16">
                      <Image src="/static/badges/Thermoplastics unit.svg" alt="capabilities" width={400} height={400} className="object-contain w-64 sm:w-80 md:w-96 lg:w-[400px]" />

                      {/* {<div className="bg-transparent border border-white py-3 rounded-lg">
                        <div className="text-white text-center space-y-2">
                          <div className="pb-2 border-b border-white">
                            <div className="text-lg uppercase flex gap-2  px-6 tracking-wide text-left">
                              <span className="text-white">THERMOPLASTICS</span> |
                              <span className="text-white">THERMOSETS</span>
                            </div>
                            <div className="text-base text-left px-6 md:text-lg uppercase tracking-wide mt-2">
                              SUSTAINABLE POLYMERS
                            </div>
                          </div>

                          <div className="py-2  border-b border-white">
                            <div className="text-lg items-center    uppercase flex gap-2  px-6 tracking-wide text-left">
                              <span className="text-white">MULTI-SHOT</span> |
                              <span className="text-white">MULTI-MATERIAL FUSION</span>
                            </div>

                          </div>    <div className="  ">
                            <div className="text-lg items-center uppercase flex gap-2 pt-1  px-6 tracking-wide text-left">
                              <span className="text-white"> LEAN CELLS </span> |
                              <span className="text-white">INTEGRATED FLOW</span>
                            </div>

                          </div>
                        </div>
                      </div>
                      } */}
                    </div>

                  </>
                )}

                {/* Optional dynamic chips */}
                {!!tab.chips?.length && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
                    {tab.chips.map((c, i) => (
                      <div
                        key={`${c}-${i}`}
                        className="rounded-2xl bg-white/10 border border-white/80 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-white text-center text-xs sm:text-sm md:text-base font-semibold"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}