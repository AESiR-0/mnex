"use client";
import { useRef, useEffect, useState } from "react";
import { useVideoCache } from "@/lib/useVideoCache";

export default function FullscreenVideo({
  src,
  poster,
  children,
  darkOverlay = false,
}: {
  src: string;
  poster?: string;
  children?: React.ReactNode;
  darkOverlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const { isLoaded, hasError } = useVideoCache(src);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const play = async () => {
      try {
        await v.play();
      } catch {}
    };
    play();
  }, []);

  return (
    <section className="relative w-full h-[100svh]">
      <div className="relative w-full h-full">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-20">
            <div className="text-white text-lg">Loading video...</div>
          </div>
        )}
        <video
          ref={ref}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          poster={poster}
          preload="metadata"
        />
      </div>
      {darkOverlay && <div className="absolute inset-0 bg-black/35" />}
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
