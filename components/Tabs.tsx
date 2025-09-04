"use client";
import LocalizedLink from "./LocalizedLink";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();
  const isIndustriesPage = pathname.split('/').includes('industries');
  const activeName = useMemo(() => {
    const p = pathname.toLowerCase();
    const activeTab = p.split('/').filter(Boolean).pop();
    const hit = tabs.find((t) => {
      const tabLast = t.href.toLowerCase().split('/').filter(Boolean).pop();
      return activeTab === tabLast;
    });
    // if user is on /about (no subpage), default to first tab
    if (!hit && (p === "/about" || p === "/about/")) return tabs[0].name;
    return hit?.name ?? tabs[0].name;
  }, [pathname, tabs]);

  return (
    <div className={`w-full max-md:px-3   bg-[#ffffff] pt-18 ${isIndustriesPage ? 'py-0' : 'py-6'}`}>
      <div className="max-w-5xl mx-auto tracking-[0.05em]   flex justify-center  gap-3 sm:gap-4">
        {tabs.map((tab) => {
          const isActive = activeName === tab.name;
          return (
            <LocalizedLink
              key={tab.name}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`px-6 sm:px-5 flex items-center justify-center  py-2 text-xs font-regular  uppercase rounded-full border transition-colors duration-200 
                ${tab.name ===
                  "Consumer & Industrial"
                  ? "text-center w-40"
                  : ""
                }
              
                ${tab.name ===
                  "Oil & Gas"
                  ? "text-center w-32"
                  : ""
                }
                ${isActive
                  ? "bg-[#1789FF] text-white "
                  : "bg-transparent text-[#595959] hover:bg-[#1789FF] hover:text-white"
                }`}
            >
              {tab.name}
            </LocalizedLink>
          );
        })}
      </div>
    </div>
  );
}
