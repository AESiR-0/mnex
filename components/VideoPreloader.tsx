"use client";
import { useEffect } from "react";
import { useVideoPreloader } from "@/lib/useVideoCache";

// All video sources used in the application
const ALL_VIDEO_SOURCES = [
  "/videos/home/hero.webm",
  "/videos/home/case-study.webm",
  "/videos/home/Solutions - Injection Molding.webm",
  "/videos/home/Solutions - Smart Automation & Fixtures.webm",
  "/videos/home/Solutions - Tooling.webm"
];

export default function VideoPreloader() {
  const { preloadAll } = useVideoPreloader(ALL_VIDEO_SOURCES);

  useEffect(() => {
    // Preload all videos when component mounts
    preloadAll();
  }, [preloadAll]);

  // This component doesn't render anything visible
  return null;
}
