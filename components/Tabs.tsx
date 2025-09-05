"use client";
import LocalizedLink from "./LocalizedLink";
import { usePathname } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

const defaultTabs = [
  { nameKey: "Navigation.aboutSubmenu.approach", href: "/about/approach" },
  { nameKey: "Navigation.aboutSubmenu.legacy", href: "/about/legacy" },
];

export default function Tabs({
  tabs = defaultTabs,
}: {
  tabs?: { name?: string; nameKey?: string; href: string }[];
}) {
  const pathname = usePathname();
  const t = useTranslations();
  const [isMounted, setIsMounted] = useState(false);
  const isIndustriesPage = pathname.split('/').includes('industries');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeTabIndex = useMemo(() => {
    if (!isMounted) return 0; // Default to first tab during SSR
    
    const p = pathname.toLowerCase();
    // Remove locale prefix from pathname for comparison
    const pathWithoutLocale = p.replace(/^\/[a-z]{2}\//, '/');
    const activeTab = pathWithoutLocale.split('/').filter(Boolean).pop();
    const hit = tabs.findIndex((tab) => {
      const tabLast = tab.href.toLowerCase().split('/').filter(Boolean).pop();
      return activeTab === tabLast;
    });
    // if user is on /about (no subpage), default to first tab
    if (hit === -1 && (pathWithoutLocale === "/about" || pathWithoutLocale === "/about/")) {
      return 0;
    }
    return hit === -1 ? 0 : hit;
  }, [pathname, tabs, isMounted]);

  return (
    <div className={`w-full max-md:px-3   bg-[#ffffff] pt-18 ${isIndustriesPage ? 'py-3' : 'py-6'}`}>
      <div className="max-w-5xl mx-auto tracking-[0.05em]   flex justify-center  gap-3 sm:gap-4">
        {tabs.map((tab, index) => {
          const tabName = tab.nameKey ? t(tab.nameKey) : tab.name;
          const isActive = isMounted && activeTabIndex === index;
          return (
            <LocalizedLink
              key={tab.nameKey || tab.name}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`px-6 sm:px-5 flex items-center justify-center  py-2 text-xs font-regular  uppercase rounded-full border transition-colors duration-200 
                ${tab.nameKey === "Navigation.industriesSubmenu.cei"
                  ? "text-center max-md:w-40 w-56"
                  : ""
                }
              
                ${tab.nameKey === "Navigation.industriesSubmenu.oilAndGas"
                  ? "text-center w-32"
                  : ""
                }
                ${isActive
                  ? "bg-[#1789FF] text-white "
                  : "bg-transparent text-[#595959] hover:bg-[#1789FF] hover:text-white"
                }`}
            >
              {tabName}
            </LocalizedLink>
          );
        })}
      </div>
    </div>
  );
}
