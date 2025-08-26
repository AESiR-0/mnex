"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Tab = {
  title: string;
  desc: string;
  video?: string;
  poster?: string;
  img?: string;
  chips?: string[];
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
  const [vh, setVh] = useState(0); // viewport height in px
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastScrollY = useRef(0);

  // viewport height (handles mobile address bar)
  useEffect(() => {
    const update = () => setVh(window.innerHeight || 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // scroll logic: pin + advance on down only
  useEffect(() => {
    if (!containerRef.current || vh === 0 || tabs.length === 0) return;

    const root = containerRef.current;
    const rootTop = () => root.getBoundingClientRect().top + window.scrollY;
    let topPx = rootTop();

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      lastScrollY.current = y;

      // where we are inside the pinned region
      const offset = Math.max(0, Math.min(y - topPx, tabs.length * vh + 200));
      if (!goingDown) return; // up-scroll: do nothing (normal scroll)

      // which "frame" we are in (0..tabs.length-1)
      const idx = Math.min(tabs.length - 1, Math.floor(offset / vh));

      if (idx > active) setActive(idx);
    };

    const onResize = () => {
      topPx = rootTop();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [vh, tabs.length, active]);

  const tab = tabs[active];

  // The container height is N * 100vh + 200px (extra to release pin)
  const containerHeight = tabs.length * vh + 200;

  return (
    <section className="w-full bg-[#eaeaea]">
      {/* SCROLL CONTAINER (tall) */}
      <div
        ref={containerRef}
        style={{ height: vh ? `${containerHeight}px` : undefined }}
        className="relative"
      >
        {/* STICKY LAYER (pinned) */}
        <div className="sticky top-0">
          {/* Eyebrow + tabs bar */}
          <div className="my-4 z-10 bg-[#eaeaea]/90 backdrop-blur border-b border-neutral-200">
            <div className="px-4 pt-3 text-center text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-black">
              {eyebrow}
            </div>

            {/* Tabs: horizontal scroll on small screens */}
            <div className="px-4 md:pt-2 md:px-10 lg:px-20">
              <div className="flex justify-between gap-6 md:gap-10 overflow-x-auto no-scrollbar snap-x">
                {tabs.map((t, idx) => (
                  <button
                    key={`${t.title}-${idx}`}
                    onClick={() => setActive(idx)}
                    className={`shrink-0 snap-start text-sm sm:text-base md:text-lg py-3 transition-colors ${
                      active === idx
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

          {/* Media + overlay content */}
          <div className="relative w-full h-[58vh] sm:h-[64vh] md:h-[75vh] xl:h-[85vh] overflow-hidden">
            {/* media */}
            {tab.video ? (
              <video
                key={tab.video}
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={tab.video}
                poster={tab.poster}
                muted
                playsInline
                autoPlay
              />
            ) : tab.img ? (
              <Image
                key={tab.img}
                src={tab.img}
                alt={tab.title}
                fill
                className="object-cover"
                priority={active === 0}
              />
            ) : null}

            {/* left gradient + brand tint */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
              <div className="absolute inset-0 bg-[#1789FF]/40 mix-blend-multiply" />
            </div>

            {/* overlay content */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="px-4 sm:px-8 lg:px-20 mx-auto w-full">
                <div className="max-w-xl sm:max-w-2xl">
                  <p className="text-white/80 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase mb-3 sm:mb-4">
                    {tab.title}
                  </p>
                  <h3 className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight mb-4 sm:mb-6 whitespace-pre-line">
                    {tab.title === "Tooling"
                      ? "Tools that\nshape outcomes."
                      : tab.title}
                  </h3>
                  <p className="text-[#A8D3FF] text-base sm:text-lg md:text-2xl leading-relaxed max-w-xl mb-5 sm:mb-6 whitespace-pre-line">
                    {tab.desc}
                  </p>

                  <a
                    href="/solutions"
                    className="inline-block text-white/90 text-xs sm:text-sm uppercase tracking-wide underline underline-offset-4 decoration-white/60 hover:decoration-white"
                  >
                    Learn more
                  </a>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12">
                    <Badge
                      title="30+"
                      subtitle="Patents"
                      className="text-white"
                    />
                    <Badge title="CNC" className="text-white" />
                    <Badge title="EDM" className="text-white" />
                  </div>

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
          {/* END sticky block */}
        </div>
      </div>
    </section>
  );
}
