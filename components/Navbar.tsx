'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
    { name: 'Home', href: '/' },
    {
        name: 'About Us',
        href: '/about',
        children: [
            { name: 'Meiban - mnex story', href: '/about/story' },
            { name: 'Our approach + usp', href: '/about/approach' },
            { name: 'Leadership', href: '/about/leadership' },
        ],
    },
    { name: 'Solution', href: '/solution' },
    {
        name: 'Industries',
        href: '/industries',
        children: [
            { name: 'CE', href: '/industries/ce' },
            { name: 'Industrial', href: '/industries/industrial' },
            { name: 'Medical', href: '/industries/medical' },
            { name: 'Oil and Gas', href: '/industries/oil-gas' },
        ],
    },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Culture', href: '/culture' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // For mobile: track which dropdown is open
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

    return (
        <nav className="fixed transition-all top-0 min-h-[72px] left-0 w-full z-50 flex items-center border-b border-[#1789FF]/50 ">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 w-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/static/Logo/Logo_PNG/MNex_v2-11.png" width={128} height={128} alt="MNex Logo" className="h-auto w-auto" />
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden transition-all md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <li
                            key={link.name}
                            className="relative group transition-all"
                            onMouseEnter={() => link.children && setOpenDropdown(link.name)}
                            onMouseLeave={() => link.children && setOpenDropdown(null)}
                            tabIndex={0}
                            onFocus={() => link.children && setOpenDropdown(link.name)}
                            onBlur={() => link.children && setOpenDropdown(null)}
                        >
                            <div className="flex items-center">
                                <Link
                                    href={link.href}
                                    className={`text-[#595959] font-sans font-semibold px-2 py-1 transition-colors duration-200 flex items-center gap-1
            ${openDropdown === link.name ? 'border-b-2 border-[#1789FF]' : ''}
          `}
                                >
                                    {link.name}
                                </Link>
                                {link.children && (
                                    <motion.span
                                        initial={false}
                                        animate={{ rotate: openDropdown === link.name ? 180 : 0 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 10, mass: 0.5 }}
                                        className="ml-1 flex items-center justify-center w-4 h-4"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <motion.rect x="3" y="7.25" width="10" height="1.5" rx="0.75" fill="#1789FF" />
                                            <motion.rect
                                                x="7.25" y="3" width="1.5" height="10" rx="0.75" fill="#1789FF"
                                                animate={{ scaleY: openDropdown === link.name ? 0 : 1 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 20, mass: 0.5 }}
                                                style={{ originY: 0.5 }}
                                            />
                                        </svg>
                                    </motion.span>
                                )}
                            </div>
                            {/* Mega Dropdown */}
                            <AnimatePresence>
                                {link.children && openDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                                        className="fixed left-0 top-[72px] w-screen md:h-[300px] md:max-h-[300px] px-28 bg-[#595959] justify-center  text-white border-t border-[#1789FF] flex"
                                        style={{ zIndex: 100 }}
                                    >
                                        {/* Left: Subpages */}
                                        <div className="flex-1 p-8 flex flex-col justify-center gap-4">
                                            {link.children.map((sublink) => (
                                                <Link
                                                    key={sublink.name}
                                                    href={sublink.href}
                                                    className="text-2xl transition-all font-semibold hover:underline"
                                                >
                                                    {sublink.name}
                                                </Link>
                                            ))}
                                        </div>
                                        {/* Right: Description (optional, can be dynamic) */}
                                        <div className="flex-1 p-8 border-l border-[#1789FF] flex items-center">
                                            <p>
                                                {/* You can add a description for each section here, or make it dynamic */}
                                                {link.name === 'About Us' && 'Learn more about our story, approach, and leadership.'}
                                                {link.name === 'Industries' && 'Explore the industries we serve: CE, Industrial, Medical, Oil and Gas.'}
                                                {/* ...other descriptions */}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>

                {/* Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span className="w-6 h-0.5 bg-[#595959] rounded transition-all" />
                    <span className="w-6 h-0.5 bg-[#595959] rounded transition-all" />
                    <span className="w-6 h-0.5 bg-[#595959] rounded transition-all" />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 22 }}
                        className="md:hidden flex flex-col bg-white border-t border-[#595959]/10 shadow-lg w-full absolute top-full left-0"
                    >
                        {navLinks.map((link) => (
                            <li key={link.name} className="border-b border-[#595959]/5">
                                <div className="flex items-center justify-between px-6 py-4">
                                    <Link
                                        href={link.href}
                                        className="text-[#595959] font-sans font-semibold"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.children && (
                                        <button
                                            onClick={() =>
                                                setMobileDropdown(mobileDropdown === link.name ? null : link.name)
                                            }
                                            aria-label={`Toggle ${link.name} submenu`}
                                            className="ml-2 flex items-center justify-center w-4 h-4"
                                        >
                                            <motion.span
                                                initial={false}
                                                animate={{ rotate: mobileDropdown === link.name ? 90 : 0 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 20, mass: 0.5 }}
                                                className="flex items-center justify-center w-4 h-4"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <motion.rect x="3" y="7.25" width="10" height="1.5" rx="0.75" fill="#1789FF" />
                                                    <motion.rect
                                                        x="7.25" y="3" width="1.5" height="10" rx="0.75" fill="#1789FF"
                                                        animate={{ scaleY: mobileDropdown === link.name ? 0 : 1 }}
                                                        transition={{ type: 'spring', stiffness: 400, damping: 20, mass: 0.5 }}
                                                        style={{ originY: 0.5 }}
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
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ type: 'spring', stiffness: 60, damping: 22 }}
                                            className="flex flex-col bg-white border-l border-[#1789FF]/20 ml-6"
                                        >
                                            {link.children.map((sublink) => (
                                                <li key={sublink.name}>
                                                    <Link
                                                        href={sublink.href}
                                                        className="block px-4 py-2 text-[#595959] hover:bg-[#1789FF]/10 font-sans"
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
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
}