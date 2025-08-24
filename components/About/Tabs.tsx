"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const tabs = [
  { name: "Approach", href: "/about/approach" },
  { name: "Legacy", href: "/about/legacy" },
  { name: "Leadership", href: "/about/leadership" },
];

export default function AboutTabs() {
  const pathname = usePathname();

  // figure out the active tab from the URL every render
  const activeName = useMemo(() => {
    const p = (pathname || "").toLowerCase();
    // exact match or startsWith allows /about/approach/anything
    const hit = tabs.find(
      (t) => p === t.href.toLowerCase() || p.startsWith(t.href.toLowerCase())
    );
    // if user is on /about (no subpage), default to first tab
    if (!hit && (p === "/about" || p === "/about/")) return tabs[0].name;
    return hit?.name ?? tabs[0].name;
  }, [pathname]);

  return (
    <div className="w-full bg-[#f0f0f0] py-6">
      <div className="max-w-5xl mx-auto flex justify-center gap-3 sm:gap-4">
        {tabs.map((tab) => {
          const isActive = activeName === tab.name;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold uppercase rounded-full border transition-colors duration-200
                ${
                  isActive
                    ? "bg-[#1789FF] text-white border-[#1789FF]"
                    : "bg-transparent text-[#595959] border-[#595959]/50 hover:bg-[#1789FF] hover:text-white hover:border-[#1789FF]"
                }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
