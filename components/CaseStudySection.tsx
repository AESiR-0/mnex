"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function CaseStudySpotlight({
  href,
  title,
  sector,
  challenge,
  videoSrc = "/videos/home/case-study.webm",
  poster,
}: {
  href: string;
  title: string;
  sector: string;
  challenge: string;
  videoSrc?: string;
  poster?: string;
}) {
  const vref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden">
      <video
        ref={vref}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        poster={poster}
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <Link
          href={href}
          className="group block w-full max-w-xl"
          aria-label={`Open case study: ${title}`}
        >
          <div
            className="
              rounded-3xl max-w-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]
              px-8 md:px-12 py-8 md:py-12
              transition-colors duration-300
              bg-[rgba(23,137,255,0.60)] group-hover:bg-[rgba(23,137,255,1)]
            "
          >
            <p className="text-white/90 text-xs md:text-sm tracking-[0.15em] uppercase mb-6">
              Case Study
            </p>
            <h2 className="text-white text-3xl md:text-5xl font-semibold leading-tight mb-8">
              {title}
            </h2>

            <div className="grid md:grid-cols-1 gap-8 text-white">
              <div>
                <p className="text-white/80 text-[11px] md:text-xs tracking-[0.18em] uppercase mb-2">
                  Sector
                </p>
                <p className="text-white text-lg md:text-2xl">{sector}</p>
              </div>
              <div>
                <p className="text-white/80 text-[11px] md:text-xs tracking-[0.18em] uppercase mb-2">
                  Challenge
                </p>
                <p className="text-white/95 text-lg md:text-2xl leading-snug">
                  {challenge}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
