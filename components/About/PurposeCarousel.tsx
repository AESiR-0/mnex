"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

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
    <section className="w-full bg-[#f5f5f5]">
      {/* Top copy */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center">
        <h2 className="text-[#444] font-semibold text-2xl sm:text-3xl md:text-4xl">
          Engineering with purpose.
          <br />
          Delivering with precision.
        </h2>
        <p className="mt-4 text-[#6F6F6F] text-sm sm:text-[15px]">
          We begin with your business reality—
          <br className="hidden sm:block" />
          your volumes, cost targets, and roadmap.
        </p>
        <p className="mt-2 text-[#6F6F6F] text-sm sm:text-[15px]">
          Then we engineer what matters: solutions shaped by
          <br className="hidden sm:block" />
          clarity, operational discipline, and purposeful innovation.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full h-[62vh] sm:h-[70vh] md:h-[78vh] overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          {/* brand blue overlay */}
          <div className="absolute inset-0 bg-[#1789FF]/40 mix-blend-multiply" />
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="px-4 sm:px-6 lg:px-12 max-w-7xl w-full mx-auto">
            <div className="max-w-xl text-white">
              {slide.step && (
                <div className="text-base sm:text-lg md:text-xl mb-4 opacity-90">
                  {slide.step}
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
                {slide.title}
              </h3>
              {slide.lead && (
                <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90">
                  {slide.lead}
                </p>
              )}
              {!!slide.bullets?.length && (
                <ul className="mt-4 space-y-2 text-sm sm:text-base text-white/90">
                  {slide.bullets.map((b, i) => (
                    <li key={i} className="pl-4 relative">
                      <span className="absolute left-0 top-2 block h-1 w-1 rounded-full bg-white/80" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute z-10 bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => {
            const active = i === idx;
            return (
              <button
                key={i}
                onClick={() => to(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all
                  ${active ? "bg-white/90 w-6" : "bg-white/50 hover:bg-white/70"}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
