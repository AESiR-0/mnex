"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDownOnlyObserver } from "@/lib/useDownOnlyObserver";

type Tab = { title: string; image?: string; desc: string };

export default function SolutionsSection({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const paneRef = useRef<HTMLDivElement | null>(null);

  const ids = useMemo(() => tabs.map((_, i) => `#solution-pane-${i}`), [tabs]);
  const onActive = useCallback((i: number) => setActive(i), []);

  useDownOnlyObserver(ids, onActive, paneRef.current ?? undefined);

  return (
    <section className="w-full h-[100svh]">
      <div className="h-full grid grid-rows-[auto_1fr]">
        {/* Header + Tabs */}
        <div className="max-w-7xl mx-auto px-4 pt-10">
          <h2 className="text-xs font-semibold text-[#595959] uppercase tracking-widest mb-3">
            Solutions
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((t, i) => (
              <button
                key={t.title}
                onClick={() => {
                  const el = paneRef.current?.querySelector(ids[i]);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActive(i);
                }}
                className={`px-4 py-2 rounded-full border text-sm transition
                  ${active === i ? "bg-[#1789FF] text-white border-[#1789FF]" : "bg-white text-[#595959] border-[#D1D1D1] hover:border-[#1789FF]"}`}
              >
                {t.title}
              </button>
            ))}
          </div>
          <p className="mt-4 text-2xl md:text-3xl font-semibold text-[#595959]">
            We don’t sell capabilities. We build the right one for you.
          </p>
        </div>

        {/* Panes: smooth inner scroll; no snap */}
        <div ref={paneRef} className="h-full overflow-y-auto">
          {tabs.map((t, i) => (
            <div
              id={`solution-pane-${i}`}
              key={t.title}
              className="relative w-full h-[100svh]"
            >
              {t.image && (
                <div
                  style={{ backgroundImage: `url(${t.image})` }}
                  className="absolute inset-0 bg-cover bg-center"
                  aria-hidden
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="relative z-10 h-full">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                  <div className="max-w-xl">
                    <h3 className="text-white text-3xl md:text-4xl font-semibold mb-3">
                      {t.title}
                    </h3>
                    <p className="text-[#A8D3FF]">{t.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
