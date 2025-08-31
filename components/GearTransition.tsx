// components/GearTransition.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const GearTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gearRefs = useRef<(SVGSVGElement | null)[]>([]);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [prev, setPrev] = useState("");

  const animateTransition = () => {
    const tl = gsap.timeline();
    gsap.set(containerRef.current, { display: "flex", opacity: 1 });

    // // Slide in panels
    // tl.fromTo(
    //   topPanelRef.current,
    //   { y: "-100%" },
    //   { y: "0%", duration: 0.4, ease: "power2.inOut" },
    //   0
    // );
    // tl.fromTo(
    //   bottomPanelRef.current,
    //   { y: "100%" },
    //   { y: "0%", duration: 0.4, ease: "power2.inOut" },
    //   0
    // );

    // Rotate gears
    gearRefs.current.forEach((gear, i) => {
      if (!gear) return;
      tl.to(
        gear,
        {
          rotate: i % 2 === 0 ? "+=360" : "-=360",
          duration: 1,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        },
        0
      );
    });

    // // Slide panels out
    // tl.to(
    //   [topPanelRef.current, bottomPanelRef.current],
    //   {
    //     y: (idx: number) => (idx === 0 ? "-100%" : "100%"),
    //     duration: 0.5,
    //     ease: "power2.inOut",
    //   },
    //   "+=0.4"
    // );

    // Fade overlay
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
        },
      },
      "-=0.2"
    );
  };

  useEffect(() => {
    if (prev) animateTransition();
    setPrev(pathname);
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      style={{ display: "none", opacity: 0, backgroundColor: "#1E1E1E" }}
    >
      {/* Sliding panels
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#1E1E1E] z-[9996]" // changed from z-[9998]
      />
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#1E1E1E] z-[9996]" // changed from z-[9998]
      /> */}

      {/* Gears */}
      <div className="relative w-48 h-48">
        {[0, 1, 2].map((_, i) => (
          <svg
            key={i}
            ref={(el) => {
              gearRefs.current[i] = el;
            }}
            className={`absolute ${
              i === 0
                ? "w-24 h-24 top-1/2 left-1/2 transform -translate-x-12 -translate-y-12"
                : i === 1
                  ? "w-20 h-20 top-1/2 left-1/2 transform -translate-x-20 -translate-y-10"
                  : "w-16 h-16 top-1/2 left-1/2 transform translate-x-10 -translate-y-8"
            }`}
            viewBox="0 0 24 24"
          >
            {/* Realistic gear path from SVG Repo public domain :contentReference[oaicite:1]{index=1} */}
            <path
              fill={i % 2 === 0 ? "#FFD700" : "#FFC300"}
              d="M12 21a8.985 8.985 0 0 1-1.755-.173 1 1 0 0 1-.791-.813l-.273-1.606a6.933 6.933 0 0 1-1.32-.762l-1.527.566a1 1 0 0 1-1.1-.278 8.977 8.977 0 0 1-1.756-3.041 1 1 0 0 1 .31-1.092l1.254-1.04a6.979 6.979 0 0 1 0-1.524L3.787 10.2a1 1 0 0 1-.31-1.092 8.977 8.977 0 0 1 1.756-3.042 1 1 0 0 1 1.1-.278l1.527.566a6.933 6.933 0 0 1 1.32-.762l.274-1.606a1 1 0 0 1 .791-.813 8.957 8.957 0 0 1 3.51 0 1 1 0 0 1 .791.813l.273 1.606a6.933 6.933 0 0 1 1.32.762l1.527-.566a1 1 0 0 1 1.1.278 8.977 8.977 0 0 1 1.756 3.041 1 1 0 0 1-.31 1.092l-1.254 1.04a6.979 6.979 0 0 1 0 1.524l1.254 1.04a1 1 0 0 1 .31 1.092 8.977 8.977 0 0 1-1.756 3.041 1 1 0 0 1-1.1.278l-1.527-.566a6.933 6.933 0 0 1-1.32.762l-.273 1.606a1 1 0 0 1-.791.813A8.985 8.985 0 0 1 12 21z"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default GearTransition;
