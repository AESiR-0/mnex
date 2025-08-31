"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Header from "./Header";

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
    v.play().catch(() => { });
  }, []);
  
  return (
    <section className="relative w-full h-[100vh] max-md:h-[60vh] overflow-hidden">
      {/* Background Video */}
      <video
        ref={vref}
        className="absolute grayscale inset-0 w-full h-full object-cover"
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Link
          href={href}
          className="group block w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[34rem] aspect-square"
          aria-label={`Open case study: ${title}`}
        >
          <div
            className="
              rounded-2xl sm:rounded-3xl w-full aspect-square shadow-[0_10px_40px_rgba(0,0,0,0.1)]
              px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16
              transition-colors duration-300
              bg-[rgba(23,137,255,0.60)] group-hover:bg-[rgba(23,137,255,1)]
              flex flex-col justify-around
            "
          >
            <div>
              <Header className="text-white/90 mb-0 pb-2 text-sm sm:text-base md:text-lg lg:text-xl">Case Study</Header>
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-semibold leading-tight mb-4 sm:mb-6 md:mb-8">
                {title}
              </h2>
            </div>

            <div className="grid md:grid-cols-1 gap-6 sm:gap-8 md:gap-10 leading-tight text-white">
              <div>
                <Header className="text-white mb-0 pb-2 font-semibold uppercase text-xs sm:text-sm md:text-base lg:text-lg">
                  Sector
                </Header>
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl">{sector}</p>
              </div>
              <div>
                <Header className="text-white mb-0 pb-2 font-semibold uppercase text-xs sm:text-sm md:text-base lg:text-lg">
                  Challenge
                </Header>
                <p className="text-white/95 text-sm sm:text-base md:text-lg lg:text-2xl whitespace-pre-line leading-tight">
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
