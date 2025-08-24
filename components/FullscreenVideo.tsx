"use client";
import { useRef, useEffect } from "react";

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
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        muted
        loop
        playsInline
        autoPlay
        poster={poster}
      />
      {darkOverlay && <div className="absolute inset-0 bg-black/35" />}
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
