"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const defaultTabs = [
  { name: "Approach", href: "/about/approach" },
  { name: "Legacy", href: "/about/legacy" },
];

export default function Tabs({
  tabs = defaultTabs,
}: {
  tabs?: { name: string; href: string }[];
}) {
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
        <div className="w-full bg-[#ffffff] py-6 pt-18">
      <div className="max-w-5xl mx-auto tracking-[0.05em]  flex justify-center gap-3 sm:gap-4">
        {tabs.map((tab) => {
          const isActive = activeName === tab.name;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`px-6 sm:px-5 py-2 text-xs font-regular  uppercase rounded-full border transition-colors duration-200 
                ${isActive
                  ? "bg-[#1789FF] text-white "
                  : "bg-transparent text-[#595959] hover:bg-[#1789FF] hover:text-white"
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
