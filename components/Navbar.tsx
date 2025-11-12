"use client";
import LocalizedLink from "./LocalizedLink";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useContactSlider } from "@/lib/useContactSlider";
import { useLocale, useTranslations } from 'next-intl';

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { isOpen: isContactOpen, open: openContactSlider } = useContactSlider();

  // Get current language display
  const currentLanguage = locale === 'zh' ? '中文' : 'EN';

  // Get translated navigation links
  const navLocalizedLinks = [
    {
      name: t("Navigation.about"),
      href: "/about/approach",
      children: [
        { name: t("Navigation.aboutSubmenu.approach"), href: "/about/approach" },
        { name: t("Navigation.aboutSubmenu.legacy"), href: "/about/legacy" },
        // { name: t("Navigation.aboutSubmenu.leadership"), href: "/about/leadership" },
      ],
    },
    { name: t("Navigation.solutions"), href: "/solutions" },
    {
      name: t("Navigation.industries"),
      href: "/industries/cei",
      children: [
        { name: t("Navigation.industriesSubmenu.cei"), href: "/industries/cei" },
        { name: t("Navigation.industriesSubmenu.regulated"), href: "/industries/regulated" },
        { name: t("Navigation.industriesSubmenu.oilAndGas"), href: "/industries/oil-and-gas" },
      ],
    },
    { name: t("Navigation.sustainability"), href: "/sustainability" },
    { name: t("Navigation.culture"), href: "/culture" },
    { name: t("Navigation.contact"), href: "/contact" },
  ];

  // Handle language switching
  const handleLanguageChange = (newLang: 'EN' | '中文') => {
    const newLocale = newLang === '中文' ? 'zh' : 'en';
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${newLocale}${currentPath}`;
    router.push(newPath);
    setLangOpen(false);
  };

  // Check if a link is active
  const isLocalizedLinkActive = (href: string) => {
    return pathname.includes(href);
  };

  // Check if About section is active
  const isAboutActive = () => {
    return pathname.includes('about');
  };

  // Check if Industries section is active
  const isIndustriesActive = () => {
    return pathname.includes('industries');
  };

  // Check if a link should show dropdown (not active)
  const shouldShowDropdown = (href: string) => {
    return !isLocalizedLinkActive(href);
  };

  // Handle scroll for navbar visibility
  useEffect(() => {
    let lastScrollY = 0;
    let scrollUpDistance = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track scroll up distance when scrolling up
      if (currentScrollY < lastScrollY && currentScrollY > 500) {
        scrollUpDistance += (lastScrollY - currentScrollY);
        // Only show navbar after scrolling up 500px
        if (scrollUpDistance >= 500) {
          setIsVisible(true);
        }
      } 
      // Reset scroll up distance and hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 500) {
        scrollUpDistance = 0;
        setIsVisible(false);
      }
      // Always show navbar when above 500px
      else if (currentScrollY <= 500) {
        scrollUpDistance = 0;
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navbar mouse leave to close all dropdowns
  const handleNavbarMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <motion.nav
      className="fixed left-0 top-0 min-h-[65px] max-md:w-full w-full max-w-screen text-[#575757] bg-[#ffffff] uppercase z-50 flex items-center shadow-none border-none"
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible && !isContactOpen ? 0 : -70,
        opacity: isContactOpen ? 0 : 1
      }}
      transition={{ duration: 0.3, ease: "linear" }}
      onMouseLeave={handleNavbarMouseLeave}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 w-full">
        {/* Logo */}
        <LocalizedLink href="/" className="flex items-center gap-2">
          <Image
            src="/static/Logo/Logo_PNG/MNex_v2-11.png"
            width={128}
            height={128}
            alt="MNex Logo"
            className="h-auto w-auto"
          />
        </LocalizedLink>

        {/* Desktop Nav */}
        <ul className="hidden transition-all  tracking-[0.05em] text-sm xl:flex gap-8 items-center">
          {navLocalizedLinks.map((link) => {
            if (link.href === "/contact") {
              return (
                <li key={link.name} className="relative group  transition-all">
                  <div className="flex bg-transparent items-center">
                    <button
                      onClick={openContactSlider}
                      className={`px-6 sm:px-5 py-2 text-xs font-regular  uppercase rounded-full border transition-colors duration-200 
                        bg-transparent text-[#595959] hover:bg-[#009b80] hover:text-white`}
                    >
                      {link.name}
                    </button>
                  </div>
                </li>
              );
            } else if (link.href === "/about/approach") {
              // Special handling for About Us - no dropdown when About is active
              const isAboutSectionActive = isAboutActive();
              return (
                <li
                  key={link.name}
                  className="relative group transition-all"
                  onMouseEnter={() =>
                    !isAboutSectionActive && link.children && setOpenDropdown(link.name)
                  }
                  tabIndex={0}
                  onFocus={() => !isAboutSectionActive && link.children && setOpenDropdown(link.name)}
                >
                  <div className="flex items-center">
                    <LocalizedLink
                      href={link.href}
                      className={`px-2 py-1 transition-colors duration-200 flex items-center gap-1 hover:text-[#1789FF]
            ${isAboutSectionActive ? "text-[#1789FF]" : "text-[#575757]"}
          `}
                    >
                      {link.name}
                    </LocalizedLink>
                    {link.children && !isAboutSectionActive && (
                      <motion.span
                        initial={false}
                        animate={{
                          rotate: openDropdown === link.name ? 180 : 0,
                        }}
                        transition={{
                          type: "keyframes",
                          duration: 0.2,
                        }}
                        className="flex items-center justify-center w-3 h-3 group-hover:fill-[#1789FF]"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:fill-[#1789FF]"
                        >
                          <motion.rect
                            x="3"
                            y="7.25"
                            width="10"
                            height="1.5"
                            rx="0.75"
                            fill={`${isAboutSectionActive ? "#1789ff" : "#595959"}`}
                            className="group-hover:fill-[#1789FF]"
                          />
                          <motion.rect
                            x="7.25"
                            y="3"
                            width="1.5"
                            height="10"
                            rx="0.75"
                            fill={`${isAboutSectionActive ? "#1789ff" : "#595959"}`}
                            className="group-hover:fill-[#1789FF]"
                            animate={{
                              scaleY: openDropdown === link.name ? 0 : 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                              mass: 0.5,
                            }}
                            style={{ originY: 0.5 }}
                          />
                        </svg>
                      </motion.span>
                    )}
                  </div>
                  {/* Mega Dropdown - only show when About is not active */}
                  <AnimatePresence>
                    {link.children && !isAboutSectionActive && openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 1, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 1, height: 0, y: -10 }}
                        transition={{
                          type: "keyframes",
                          duration: 0.2,
                        }}
                        className="fixed left-0 top-[55px] pb-3 w-screen z-1 bg-[#ffffff] flex justify-center overflow-hidden"
                        style={{ zIndex: 100 }}
                      >
                        <div className="max-w-5xl mx-auto flex justify-center gap-3 sm:gap-4 py-6">
                          {link.children.map((sublink, index) => {
                            const isSublinkActive = isLocalizedLinkActive(sublink.href);
                            return (
                              <motion.div
                                key={sublink.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeOut"
                                }}
                                className="z-[1]"
                              >
                                <LocalizedLink
                                  href={sublink.href}
                                  className={`px-6 sm:px-5 py-2 text-xs font-regular  uppercase rounded-full border transition-colors duration-200 
                                    ${isSublinkActive
                                      ? "bg-[#1789FF] text-white  hover:bg-[#959595]"
                                      : "bg-transparent text-[#595959] hover:bg-[#1789FF] hover:text-white"
                                    }`}
                                >
                                  {sublink.name}
                                </LocalizedLink>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            } else if (link.href === "/industries/cei") {
              // Special handling for Industries - no dropdown when Industries is active
              const isIndustriesSectionActive = isIndustriesActive();
              return (
                <li
                  key={link.name}
                  className="relative group transition-all"
                  onMouseEnter={() =>
                    !isIndustriesSectionActive && link.children && setOpenDropdown(link.name)
                  }
                  tabIndex={0}
                  onFocus={() => !isIndustriesSectionActive && link.children && setOpenDropdown(link.name)}
                >
                  <div className="flex items-center">
                    <LocalizedLink
                      href={link.href}
                      className={`px-2 py-1 transition-colors duration-200 flex items-center gap-1 hover:text-[#1789FF]
            ${isIndustriesSectionActive ? "text-[#1789FF]" : "text-[#575757]"}
          `}
                    >
                      {link.name}
                    </LocalizedLink>
                    {link.children && !isIndustriesSectionActive && (
                      <motion.span
                        initial={false}
                        animate={{
                          rotate: openDropdown === link.name ? 180 : 0,
                        }}
                        transition={{
                          type: "keyframes",
                          duration: 0.2,
                        }}
                        className="flex items-center justify-center w-3 h-3 group-hover:fill-[#1789FF]"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:fill-[#1789FF]"
                        >
                          <motion.rect
                            x="3"
                            y="7.25"
                            width="10"
                            height="1.5"
                            rx="0.75"
                            fill={`${isIndustriesSectionActive ? "#1789ff" : "#595959"}`}
                            className="group-hover:fill-[#1789FF]"
                          />
                          <motion.rect
                            x="7.25"
                            y="3"
                            width="1.5"
                            height="10"
                            rx="0.75"
                            fill={`${isIndustriesSectionActive ? "#1789ff" : "#595959"}`}
                            className="group-hover:fill-[#1789FF]"
                            animate={{
                              scaleY: openDropdown === link.name ? 0 : 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                              mass: 0.5,
                            }}
                            style={{ originY: 0.5 }}
                          />
                        </svg>
                      </motion.span>
                    )}
                  </div>
                  {/* Mega Dropdown - only show when Industries is not active */}
                  <AnimatePresence>
                    {link.children && !isIndustriesSectionActive && openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 1, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 1, height: 0, y: 0 }}
                        transition={{
                          type: "keyframes",
                          duration: 0.2,
                        }}
                        className="fixed left-0 pb-3 top-[55px] w-screen bg-white flex justify-center overflow-hidden"
                        style={{ zIndex: 100 }}
                      >
                        <div className="max-w-5xl mx-auto flex justify-center gap-3 sm:gap-4 py-6">
                          {link.children.map((sublink, index) => {
                            const isSublinkActive = isLocalizedLinkActive(sublink.href);
                            return (
                              <motion.div
                                key={sublink.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeOut"
                                }}
                              >
                                <LocalizedLink
                                  href={sublink.href}
                                  className={`px-6 sm:px-5 py-2 text-xs font-regular  uppercase rounded-full border transition-colors duration-200 
                                    ${isSublinkActive
                                      ? "bg-[#1789FF] text-white  hover:bg-[#959595]"
                                      : "bg-transparent text-[#595959] hover:bg-[#1789FF] hover:text-white"
                                    }`}
                                >
                                  {sublink.name}
                                </LocalizedLink>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            } else if (link.href === "/sustainability") {
              // Special handling for Sustainability - hover effect
              const isSustainabilityActive = isLocalizedLinkActive(link.href);
              return (
                <li
                  key={link.name}
                  className="relative group transition-all"
                >
                  <div className="flex items-center">
                    <LocalizedLink
                      href={link.href}
                      className={`px-2 py-1 transition-colors duration-200 flex items-center gap-1 hover:text-[#009b80]
            ${isSustainabilityActive ? "text-[#009b80]" : "text-[#575757]"}
          `}
                    >
                      {link.name}
                    </LocalizedLink>
                  </div>
                </li>
              );
            } else
              return (
                <li
                  key={link.name}
                  className="relative group transition-all"
                  onMouseEnter={() =>
                    link.children && shouldShowDropdown(link.href) && setOpenDropdown(link.name)
                  }
                  tabIndex={0}
                  onFocus={() => link.children && shouldShowDropdown(link.href) && setOpenDropdown(link.name)}
                >
                  <div className="flex items-center">
                    <LocalizedLink
                      href={link.href}
                      className={`px-2 py-1 transition-colors duration-200 flex items-center gap-1 hover:text-[#1789FF]
            ${isLocalizedLinkActive(link.href) ? "text-[#1789FF]" : "text-[#575757]"}
          `}
                    >
                      {link.name}
                    </LocalizedLink>
                    {link.children && shouldShowDropdown(link.href) && (
                      <motion.span
                        initial={false}
                        animate={{
                          rotate: openDropdown === link.name ? 180 : 0,
                        }}
                        transition={{
                          type: "keyframes",
                          duration: 0.2,
                        }}
                        className="flex items-center justify-center w-3 h-3 group-hover:fill-[#1789FF]"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:fill-[#1789FF]"
                        >
                          <motion.rect
                            x="3"
                            y="7.25"
                            width="10"
                            height="1.5"
                            rx="0.75"
                            fill={`${isLocalizedLinkActive(link.href) ? "#1789ff" : "#595959"}`}
                            className="group-hover:fill-[#1789FF]"
                          />
                          <motion.rect
                            x="7.25"
                            y="3"
                            width="1.5"
                            height="10"
                            rx="0.75"
                            fill={`${isLocalizedLinkActive(link.href) ? "#1789ff" : "#595959"}`}
                            className="group-hover:fill-[#1789FF]"
                            animate={{
                              scaleY: openDropdown === link.name ? 0 : 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                              mass: 0.5,
                            }}
                            style={{ originY: 0.5 }}
                          />
                        </svg>
                      </motion.span>
                    )}
                  </div>
                  {/* Mega Dropdown */}
                  <AnimatePresence>
                    {link.children && shouldShowDropdown(link.href) && openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 1, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 1, height: 0, y: -10 }}
                        transition={{
                          type: "keyframes",
                          duration: 0.2,
                        }}
                        className="fixed left-0 top-[55px] w-screen bg-[#ffffff] flex justify-center overflow-hidden"
                        style={{ zIndex: 100 }}
                      >
                        <div className="max-w-5xl mx-auto flex justify-center gap-3 sm:gap-4 py-6">
                          {link.children.map((sublink, index) => {
                            const isSublinkActive = isLocalizedLinkActive(sublink.href);
                            return (
                              <motion.div
                                key={sublink.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeOut"
                                }}
                              >
                                <LocalizedLink
                                  href={sublink.href}
                                  className={`px-6 sm:px-5 py-2 text-xs font-regular  uppercase rounded-full border transition-colors duration-200 
                                    ${isSublinkActive
                                      ? "bg-[#1789FF] text-white  hover:bg-[#959595]"
                                      : "bg-transparent text-[#595959] hover:bg-[#1789FF] hover:text-white"
                                    }`}
                                >
                                  {sublink.name}
                                </LocalizedLink>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
          })}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="h-[2.075rem] w-[2.075rem]  flex items-center bg-[#1789FF] justify-center rounded-full  text-xs   text-[#ffffff] hover:bg-[#00b298] hover:border-[#00b298] transition-colors"
              aria-label={t("Common.changeLanguage")}
            >
              {currentLanguage}
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-28 bg-white border border-[#e0e0e0] rounded-lg shadow-md overflow-hidden z-[9999]"
                >
                  {["EN", "中文"].map((lang) => (
                    <li key={lang}>
                      <button
                        onClick={() => handleLanguageChange(lang as "EN" | "中文")}
                        className={`w-full px-3 py-2 text-left text-xs transition ${
                          currentLanguage === lang 
                            ? "bg-[#1789FF]/10 text-[#1789FF] font-medium" 
                            : "hover:bg-[#1789FF]/10 text-[#595959] hover:text-[#1789FF]"
                        }`}
                      >
                        {lang}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </ul>

        {/* Hamburger */}
        <button
          className="xl:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={t("Common.toggleMenu")}
        >
          <span
            className={`block absolute h-0.5 w-6 bg-[#595959] rounded transform transition duration-300 ease-in-out
      ${menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
          />
          <span
            className={`block absolute h-0.5 w-6 bg-[#595959] rounded transform transition duration-300 ease-in-out
      ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block absolute h-0.5 w-6 bg-[#595959] rounded transform transition duration-300 ease-in-out
      ${menuOpen ? "-rotate-45 translate-y-0" : "translate-y-0"}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="xl:hidden flex flex-col bg-white  shadow-lg w-full absolute top-full left-0"
          >
            {navLocalizedLinks.map((link) => {
              if (link.href === "/contact") {
                return (
                  <li key={link.name} className="border-b border-[#595959]/5">
                    <div className="flex items-center justify-between px-6 py-4">
                      <button
                        onClick={() => {
                          openContactSlider();
                          setMenuOpen(false);
                        }}
                        className="text-[#595959] hover:text-[#1789FF] transition-colors"
                      >
                        {link.name}
                      </button>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.name} className="border-b border-[#595959]/5">
                  <div className="flex items-center justify-between px-6 py-4">
                    <LocalizedLink
                      href={link.href}
                      className={` ${isLocalizedLinkActive(link.href) ? "text-[#1789FF]" : "text-[#595959]"}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </LocalizedLink>
                    {link.children && (
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === link.name ? null : link.name
                          )
                        }
                        aria-label={t("Common.toggleSubmenu", { name: link.name })}
                        className="ml-2 flex items-center justify-center w-4 h-4"
                      >
                        <motion.span
                          initial={false}
                          animate={{
                            rotate: mobileDropdown === link.name ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.15,
                            ease: "easeInOut"
                          }}
                          className="flex items-center justify-center w-4 h-4"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <motion.rect
                              x="3"
                              y="7.25"
                              width="10"
                              height="1.5"
                              rx="0.75"
                              fill="#1789FF"
                            />
                            <motion.rect
                              x="7.25"
                              y="3"
                              width="1.5"
                              height="10"
                              rx="0.75"
                              fill="#1789FF"
                              animate={{
                                scaleY: mobileDropdown === link.name ? 0 : 1,
                              }}
                              transition={{
                                duration: 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          </svg>
                        </motion.span>
                      </button>
                    )}
                  </div>
                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {link.children && mobileDropdown === link.name && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.15,
                          ease: "easeInOut"
                        }}
                        className="flex flex-col bg-white  ml-6"
                      >
                        {link.children.map((sublink) => (
                          <li key={sublink.name}>
                            <LocalizedLink
                              href={sublink.href}
                              className="block px-4 py-2 text-[#595959] hover:bg-[#1789FF]/10"
                              onClick={() => setMenuOpen(false)}
                            >
                              {sublink.name}
                            </LocalizedLink>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
            {/* Language Selector (Mobile only) */}
            <li className="px-6 py-4 flex items-center justify-between">
              <span className="text-[#595959] font-semibold">
                {t("Common.language")}
              </span>
              <div className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="h-8 w-8 flex items-center text-xs justify-center bg-[#1789ff] rounded-full border border-[#595959]/40  font-semibold text-white hover:border-[#1789FF] hover:text-[#1789FF] transition-colors"
                  aria-label={t("Common.changeLanguage")}
                >
                  {currentLanguage}
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-28 bg-white border border-[#e0e0e0] rounded-lg shadow-md overflow-hidden z-50"
                    >
                      {["EN", "中文"].map((lang) => (
                        <li key={lang}>
                          <button
                            onClick={() => handleLanguageChange(lang as "EN" | "中文")}
                            className={`w-full px-3 py-3 text-left z-[9999] text-xs font-thin transition ${
                              currentLanguage === lang 
                                ? "bg-[#1789FF]/10 text-[#1789FF] font-medium" 
                                : "hover:bg-[#1789FF]/10 text-[#595959] hover:text-[#1789FF]"
                            }`}
                          >
                            {lang}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}