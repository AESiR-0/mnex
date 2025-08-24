"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Tab = {
  title: string;
  desc: string;
  videoSrc?: string; // e.g. '/videos/capabilities/tooling.webm'
  poster?: string; // optional poster for the video
  img?: string; // optional fallback image
  chips?: string[]; // e.g. ['30+ PATENTS', 'CNC', 'EDM']
};

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Try to autoplay current tab's video when tab changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = async () => {
      try {
        await v.play();
      } catch {
        /* ignore autoplay block */
      }
    };
    // give the DOM a beat to swap the src
    const id = setTimeout(play, 50);
    return () => clearTimeout(id);
  }, [active]);

  const onVideoEnded = () => {
    // advance to next tab cyclically
    setActive((prev) => (prev + 1) % tabs.length);
  };

  const tab = tabs[active];

  return (
    <section className="w-full min-h-screen py-5 bg-[#eaeaea]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Eyebrow + tabs bar */}
        <div className="sticky top-16 z-10  backdrop-blur border-b border-neutral-200">
          <div className="px-4 pt-4 font-semibold text-center text-[12px] tracking-[0.2em] uppercase text-black">
            {eyebrow}
          </div>
          <div className="px-4 flex flex-wrap items-end mt-8 justify-between gap-6 md:gap-10 ">
            {tabs.map((t, idx) => (
              <button
                key={t.title}
                onClick={() => setActive(idx)}
                className={`text-md md:text-xl transition-colors ${
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

        {/* Media + overlay content */}
        <div className="relative w-full h-[70vh] md:h-[78vh] my-8 md:my-12 rounded-xl overflow-hidden">
          {/* media */}
          {tab.videoSrc ? (
            <video
              key={tab.videoSrc} // force reload on tab switch
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={tab.videoSrc}
              poster={tab.poster}
              muted
              playsInline
              autoPlay
              onEnded={onVideoEnded}
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

          {/* left gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />

          {/* overlay content */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="px-6 md:px-10 max-w-7xl mx-auto w-full">
              <div className="max-w-2xl">
                <p className="text-white/70 text-[11px] tracking-[0.18em] uppercase mb-4">
                  {tab.title}
                </p>
                <h3 className="text-white text-3xl md:text-5xl font-semibold leading-tight mb-6">
                  {tab.title === "Tooling"
                    ? "Tools that\nshape outcomes."
                    : tab.title}
                </h3>
                <p className="text-[#A8D3FF] text-lg md:text-2xl leading-relaxed max-w-xl mb-6 whitespace-pre-line">
                  {tab.desc}
                </p>
                <a
                  href="/solutions"
                  className="inline-block text-white/90 text-sm uppercase tracking-wide underline underline-offset-4 decoration-white/60 hover:decoration-white"
                >
                  Learn more
                </a>

                {!!tab.chips?.length && (
                  <div className="flex flex-wrap gap-4 mt-8">
                    {tab.chips.map((c) => (
                      <div
                        key={c}
                        className="rounded-2xl bg-white/10 border border-white/80 px-6 py-3 text-white text-center text-lg font-semibold"
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
