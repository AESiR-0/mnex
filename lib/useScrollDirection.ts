"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollDirection() {
  const lastY = useRef(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setDirection(y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return direction;
}
