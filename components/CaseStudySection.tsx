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
    <section className="relative w-full h-[100vh] overflow-hidden">
      {/* Background Video */}
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
          className="group block w-full max-w-lg aspect-square"
          aria-label={`Open case study: ${title}`}
        >
          <div
            className="
              rounded-3xl w-full aspect-square shadow-[0_10px_40px_rgba(0,0,0,0.1)]
              px-16 py-12 md:py-16
              transition-colors duration-300
              bg-[rgba(23,137,255,0.60)] group-hover:bg-[rgba(23,137,255,1)]
              flex flex-col justify-around
            "
          >
            <div>
              <Header className="text-white/90 mb-28">Case Study</Header>
              <h2 className="text-white text-3xl md:text-5xl font-semibold leading-tight mb-8 ">
                {title}
              </h2>
            </div>

            <div className="grid md:grid-cols-1 gap-10 leading-tight text-white">
              <div>
                <Header className="text-white mb-0 pb-2 font-semibold   uppercase ">
                  Sector
                </Header>
                <p className="text-white  text-lg md:text-2xl">{sector}</p>
              </div>
              <div>
                <Header className="text-white mb-0 pb-2 font-semibold   uppercase ">
                  Challenge
                </Header>
                <p className="text-white/95 text-lg md:text-2xl leading-tight">
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
