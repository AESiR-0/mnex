"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "About Us",
    href: "/about/approach",
    children: [
      { name: "Our approach + usp", href: "/about/approach" },
      { name: "Meiban - mnex story", href: "/about/legacy" },
      { name: "Leadership", href: "/about/leadership" },
    ],
  },
  { name: "Solution", href: "/solution" },
  {
    name: "Industries",
    href: "/industries",
    children: [
      { name: "CE", href: "/industries/ce" },
      { name: "Industrial", href: "/industries/industrial" },
      { name: "Medical", href: "/industries/medical" },
      { name: "Oil and Gas", href: "/industries/oil-gas" },
    ],
  },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Culture", href: "/culture" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [language, setLanguage] = useState<"EN" | "中文">("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Scroll direction state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Initial load state for delayed slide down
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Check if a link is active
  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Check if a link should show dropdown (not active)
  const shouldShowDropdown = (href: string) => {
    return !isLinkActive(href);
  };

  return (
    <motion.nav
      className="fixed max-md:w-full max-w-screen text-[#575757] bg-white uppercase transition-all top-0 min-h-[72px] left-0 w-full z-50 flex items-center "
      initial={{ y: -72 }} // Start hidden above viewport
      animate={{
        y: isLoaded ? (isVisible ? 0 : -72) : -72 // Slide down after 2 seconds, then follow scroll behavior
      }}
      transition={{
        duration: 0.55,
        delay: isLoaded ? 0 : 0 // No delay when loaded, but initial delay handled by isLoaded state
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/static/Logo/Logo_PNG/MNex_v2-11.png"
            width={128}
            height={128}
            alt="MNex Logo"
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden transition-all font-medium text-sm md:flex gap-8 items-center">
          {navLinks.map((link) => {
            if (link.name == "Contact Us") {
              return (
                <li key={link.name} className="relative group transition-all">
                  <div className="flex bg-transparent items-center">
                    <Link
                      href={link.href}
                      className={`text-[#575757] hover:bg-[#00b298] hover:text-white border rounded-2xl px-4 py-1 transition-colors duration-200 flex items-center gap-1
            ${openDropdown === link.name ? "" : ""}
          `}
                    >
                      {link.name}
                    </Link>
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
                  onMouseLeave={() => link.children && setOpenDropdown(null)}
                  tabIndex={0}
                  onFocus={() => link.children && shouldShowDropdown(link.href) && setOpenDropdown(link.name)}
                  onBlur={() => link.children && setOpenDropdown(null)}
                >
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      className={`px-2 py-1 transition-colors duration-200 flex items-center gap-1 hover:text-[#1789FF]
            ${isLinkActive(link.href) ? "text-[#1789FF]" : "text-[#575757]"}
          `}
                    >
                      {link.name}
                    </Link>
                    {link.children && shouldShowDropdown(link.href) && (
                      <motion.span
                        initial={false}
                        animate={{
                          rotate: openDropdown === link.name ? 180 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                          mass: 0.5,
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
                            fill={`${isLinkActive(link.href) ? "#1789ff" : "#595959"}`}
                            className="group-hover:fill-[#1789FF]"
                          />
                          <motion.rect
                            x="7.25"
                            y="3"
                            width="1.5"
                            height="10"
                            rx="0.75"
                            fill={`${isLinkActive(link.href) ? "#1789ff" : "#595959"}`}
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
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        className="fixed left-0 top-[72px] w-screen bg-[#f0f0f0]  flex justify-center"
                        style={{ zIndex: 100 }}
                      >
                        <div className="max-w-5xl mx-auto flex justify-center gap-3 sm:gap-4 py-6">
                          {link.children.map((sublink) => {
                            const isSublinkActive = isLinkActive(sublink.href);
                            return (
                              <Link
                                key={sublink.name}
                                href={sublink.href}
                                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold uppercase rounded-full border transition-colors duration-200 
                                  ${isSublinkActive
                                    ? "bg-[#1789FF] text-white border-[#1789FF] hover:bg-[#959595] hover:border-[#959595]"
                                    : "bg-transparent text-[#969696] border-[#969696]/50 hover:bg-[#1789FF] hover:text-white hover:border-[#1789FF]"
                                  }`}
                              >
                                {sublink.name}
                              </Link>
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
              className="h-9 w-9 flex items-center bg-[#1789FF] justify-center rounded-full border border-[#595959]/40 text-sm font-semibold text-[#ffffff] hover:bg-[#00b298] hover:border-[#00b298] transition-colors"
              aria-label="Change language"
            >
              {language}
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
                        onClick={() => {
                          setLanguage(lang as "EN" | "中文");
                          setLangOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-[#1789FF]/10 text-[#595959] hover:text-[#1789FF] transition"
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
          className="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
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
      ${menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
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
            transition={{ type: "keyframes", duration: 0.2 }}
            className="md:hidden flex flex-col bg-white  shadow-lg w-full absolute top-full left-0"
          >
            {navLinks.map((link) => (
              <li key={link.name} className="border-b border-[#595959]/5">
                <div className="flex items-center justify-between px-6 py-4">
                  <Link
                    href={link.href}
                    className={`font-semibold ${isLinkActive(link.href) ? "text-[#1789FF]" : "text-[#595959]"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.children && shouldShowDropdown(link.href) && (
                    <button
                      onClick={() =>
                        setMobileDropdown(
                          mobileDropdown === link.name ? null : link.name
                        )
                      }
                      aria-label={`Toggle ${link.name} submenu`}
                      className="ml-2 flex items-center justify-center w-4 h-4"
                    >
                      <motion.span
                        initial={false}
                        animate={{
                          rotate: mobileDropdown === link.name ? 180 : 0,
                        }}
                        transition={{
                          type: "keyframes",
                          duration: 0.2,
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
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                              mass: 0.5,
                            }}
                            style={{ originY: 0.5 }}
                          />
                        </svg>
                      </motion.span>
                    </button>
                  )}
                </div>
                {/* Mobile Dropdown */}
                <AnimatePresence>
                  {link.children && shouldShowDropdown(link.href) && mobileDropdown === link.name && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 22,
                      }}
                      className="flex flex-col bg-white border-l border-[#1789FF]/20 ml-6"
                    >
                      {link.children.map((sublink) => (
                        <li key={sublink.name}>
                          <Link
                            href={sublink.href}
                            className="block px-4 py-2 text-[#595959] hover:bg-[#1789FF]/10"
                            onClick={() => setMenuOpen(false)}
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
            {/* Language Selector (Mobile only) */}
            <li className="px-6 py-4 flex items-center justify-between">
              <span className="text-[#595959] font-semibold">
                Language
              </span>
              <div className="relative">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="h-9 w-9 flex items-center justify-center bg-[#1789ff] rounded-full border border-[#595959]/40 text-sm font-semibold text-[#595959] hover:border-[#1789FF] hover:text-[#1789FF] transition-colors"
                  aria-label="Change language"
                >
                  {language}
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
                            onClick={() => {
                              setLanguage(lang as "EN" | "中文");
                              setLangOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-[#1789FF]/10 text-[#595959] hover:text-[#1789FF] transition"
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
