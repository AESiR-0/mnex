"use client";
import { useEffect } from "react";
import { useScrollDirection } from "./useScrollDirection";

/**
 * Observe a list of targets and call onActive(index) when intersecting,
 * but ONLY when the user is scrolling DOWN. Supports a custom root
 * (e.g., an inner scroll container) if provided.
 */
export function useDownOnlyObserver(
  selectors: string[],
  onActive: (index: number) => void,
  rootEl?: HTMLElement | null
) {
  const dir = useScrollDirection();

  useEffect(() => {
    const els = selectors
      .map((sel) => (rootEl ?? document).querySelector<HTMLElement>(sel))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (dir !== "down") return; // ignore upward scroll
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = els.findIndex((el) => el === e.target);
            if (idx >= 0) onActive(idx);
          }
        });
      },
      {
        root: rootEl ?? null,
        threshold: 0.55,
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dir, selectors.join("|"), onActive, rootEl]);
}
