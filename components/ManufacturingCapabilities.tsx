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
      className={`rounded-[20px] border-2 border-white/90 px-5 py-3 sm:px-6 sm:py-4 flex flex-col items-center justify-center text-center shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] ${className}`}
    >
      <span className="font-semibold tracking-wide text-lg sm:text-2xl leading-none">
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
      <div className="bg-[#ececec] ">
        <Header className="text-center pt-6 pb-2 md:mb-0">Core Capabilities</Header>
        <div className="pb-3 flex justify-center z-10">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex justify-between gap-6 md:gap-20 overflow-x-auto no-scrollbar">
              {tabs.map((t, idx) => (
                <button
                  key={`${t.title}-${idx}`}
                  onClick={() => setActive(idx)}
                  className={`shrink-0 text-lg sm:text-md md:text-xl py-3 transition-colors ${active === idx
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
      <div className="relative w-full h-[58vh] sm:h-[64vh] md:h-[75vh] xl:h-[85vh] overflow-hidden">
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
          <div className="px-4 h-full mx-auto w-full max-w-7xl">
            <div className="max-w-xl flex flex-col gap-4 justify-between h-full py-20 sm:max-w-2xl">
              <div className="">
                <h3 className="text-white text-2xl sm:text-3xl md:text-5xl font-medium leading-tight mb-4 sm:mb-6 whitespace-pre-line">
                  {tab.title === "Tooling"
                    ? "Tools that\nshape outcomes."
                    : tab.desc}
                </h3>

                {/* Show bullets if they exist, otherwise show badges */}
                {tab.bullets && tab.bullets.length > 0 ? (
                  <div className="mt-8 sm:mt-10 md:mt-4">
                    <ul className="space-y-3 sm:space-y-4">
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
                      href={`/solutions#${tab.title}`}
                      className="inline-block text-white/90 text-xs sm:text-sm uppercase tracking-wide underline underline-offset-4 decoration-white/60 hover:decoration-white"
                    >
                      Learn more
                    </Link>
                    {/* Badges */}
                    <div className="flex flex-wrap text-left justify-start max-w-2xl gap-3 sm:gap-4 md:gap-4 mt-16">
                    <Image src="/static/badges/Thermoplastics unit.svg" alt="capabilities" width={400} height={400} className="object-contain" />

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
                  <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
                    {tab.chips.map((c, i) => (
                      <div
                        key={`${c}-${i}`}
                        className="rounded-2xl bg-white/10 border border-white/80 px-4 py-2 sm:px-6 sm:py-3 text-white text-center text-sm sm:text-base font-semibold"
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