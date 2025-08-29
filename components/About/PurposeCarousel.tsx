"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  img: string; // public/ path or remote URL
  imgAlt?: string;
  step?: string; // e.g. "1"
  title: string; // "Business-Aligned from Day One"
  lead?: string; // short paragraph
  bullets?: string[]; // bullet list
};

export default function PurposeCarousel({
  slides,
  intervalMs = 5500,
}: {
  slides: Slide[];
  intervalMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = slides.length;
  const clamp = (n: number) => (n + len) % len;

  const go = (n: number) => setIdx((i) => clamp(i + n));
  const to = (n: number) => setIdx(clamp(n));

  // autoplay (pause on hover / when tab hidden)
  useEffect(() => {
    if (paused || len <= 1) return;
    const id = setInterval(() => setIdx((i) => clamp(i + 1)), intervalMs);
    return () => clearInterval(id);
  }, [paused, intervalMs, len]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // swipe
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      go(dx < 0 ? +1 : -1);
    }
    touch.current = null;
  };

  // keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(+1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const slide = slides[idx];

  return (
    <section className="w-full bg-[#ececec] min-h-screen">
      {/* Top copy */}
      <div className="max-w-7xl px-4 mx-auto  py-20 space-y-4 sm:py-12 text-center">
        <h2 className="text-[#444] font-semibold text-2xl sm:text-3xl md:text-4xl">
          Engineering with purpose.
          <br />
          Delivering with precision.
        </h2>
        <p className="mt-4   text-[#6F6F6F] text-xl">
          We begin with your business reality -  <br /> your volumes, cost targets, and
          roadmap.
        </p>
        <p className="mt-2  text-[#6F6F6F] text-xl">
          Then we engineer what matters: solutions shaped by <br /> clarity, operational  discipline, and purposeful innovation.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full min-h-screen sm:h-[70vh] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Image */}
        <Image
          key={slide.img + idx}
          src={slide.img}
          alt={slide.imgAlt || slide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-[800ms] will-change-transform"
        />
        {/* Gradient for legibility */}
        <div className="absolute inset-0">
          {/* base black fade for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
          {/* brand blue overlay */}
          <div className="absolute inset-0 bg-[#005295]/50 " />
        </div>

        {/* Overlay content */}
        <div className="absolute -top-20  inset-0 z-10 flex items-start pt-[15rem]">
          <div className="px-4 sm:px-6 lg:px-12 max-w-7xl w-full mx-auto">
            <div className="max-w-3xl text-white">
              {slide.step && (
                <div className="text-3xl font-bold mb-20 opacity-90">
                  {slide.step}
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-6">
                {slide.title}
              </h3>
              {slide.lead && (
                <p className="text-lg  text-white/90 leading-relaxed mb-8">
                  {slide.lead}
                </p>
              )}
              {!!slide.bullets?.length && (
                <ul className="space-y-4 text-lg md:text-xl font-light text-white/90 mb-12">
                  {slide.bullets.map((b, i) => (
                    <li key={i} className="relative flex gap-4 items-center">
                      <span className="block h-2 w-2 rounded-full bg-white/80 flex-shrink-0 mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>
        </div>

        {/* Dots */}
        {/* Arrow Navigation */}
        <div className="absolute z-10 bottom-20 left-0 w-full">
          <div className="px-4 sm:px-6 lg:px-12 max-w-7xl w-full mx-auto">
            <div className="max-w-3xl flex justify-start gap-5 items-center">
              {/* Left Arrow */}
              <button
                onClick={() => to(idx === 0 ? slides.length - 1 : idx - 1)}
                aria-label="Previous slide"
                className="p-4 rounded-full hover:bg-[#1789FF] bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => to(idx === slides.length - 1 ? 0 : idx + 1)}
                aria-label="Next slide"
                className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="absolute z-10 bottom-8 left-0 w-full">
          <div className="px-4 sm:px-6 lg:px-12 max-w-7xl w-full mx-auto">
            <div className="max-w-3xl flex gap-3">
              {slides.map((_, i) => {
                const active = i === idx;
                return (
                  <button
                    key={i}
                    onClick={() => to(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-3 w-3 rounded-full transition-all
                      ${active ? "bg-white" : "bg-white/50 hover:bg-white/70"}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
