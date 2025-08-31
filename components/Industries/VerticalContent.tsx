"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type ApproachItem = { title: string; desc: string };

export default function VerticalContent({
    items,
    sectionId = "approach",
    content,
    backgroundImage,
    buttonText,
}: {
    items: ApproachItem[];
    sectionId?: string;
    buttonText?: string;
    content: string;
    backgroundImage?: string;
}) {
    const [activeApproach, setActiveApproach] = useState(0);

    if (!items || items.length === 0) return null;

    const active = activeApproach >= 0 ? Math.max(0, Math.min(activeApproach, items.length - 1)) : -1;
    const panelId = `${sectionId}-panel`;
    const activeTabId = active >= 0 ? `${sectionId}-tab-${active}` : undefined;

    return (
        <section
            id={sectionId}
            className="w-full bg-[#ececec] min-h-screen max-md:min-h-[50vh]"
        >
            <section className="w-full bg-[#f5f5f5] py-6 sm:py-8 md:py-10" >
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#595959] mb-4 sm:mb-6">
                        Where proof lives.
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#595959]/80 leading-normal">
                        {content}
                    </p>
                </div>
            </section>
            <div className="h-[60vh] sm:h-[65vh] md:h-[70vh] flex items-center py-6 sm:py-8 md:py-10 relative">
                {/* Background Image */}
                {backgroundImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={backgroundImage}
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Blue overlay */}
                        <div className="absolute inset-0 mix-blend-multiply bg-[#005190] z-10"></div>
                    </div>
                )}

                <div className="max-w-4xl h-full px-4 sm:px-6 md:px-8 lg:px-10 space-y-4 sm:space-y-5 mx-auto w-full relative z-10">
                    <div className="flex flex-col-reverse h-full justify-center items-center">
                        {/* Left: Active content - Now horizontal */}
                        <div
                            id={panelId}
                            role="tabpanel"
                            aria-labelledby={activeTabId}
                            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 h-1/2 text-white"
                        >
                            <motion.div
                                key={active}
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0, ease: "easeOut" }}
                                className="contents"
                            >
                                <h3 className="text-lg sm:text-xl md:text-2xl leading-tight">
                                    {items[active].desc}
                                </h3>
                            </motion.div>
                        </div>

                        {/* Right: Buttons - Now vertical */}
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="flex flex-wrap max-md:flex-nowrap max-md:flex-col max-md:justify-center max-md:gap-4 h-1/2 py-6 sm:py-8 md:py-10 justify-between w-full gap-x-2 sm:gap-x-3"
                                role="tablist"
                                aria-label="Approach options"
                            >
                                {items.map((it, i) => {
                                    const isActive = active === i;
                                    const tabId = `${sectionId}-tab-${i}`;
                                    return (
                                        <button
                                            key={`${tabId}-${it.title}-${i}`}
                                            id={tabId}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            aria-controls={panelId}
                                            onClick={() => setActiveApproach(i)}
                                            className={`text-left px-0 py-1 sm:py-2 text-2xl sm:text-3xl md:text-4xl transition-all duration-300 ease-out
                                                ${isActive
                                                    ? "text-white"
                                                    : "text-[#009B80] hover:text-white"
                                                }`}
                                        >
                                            {it.title}.<span className="pr-1" />
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Action Button */}
                    {buttonText && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex justify-center -mt-20 "
                        >
                            <Link href={'https://meibanenergy.com'} target="_blank">
                                <button className="px-4 sm:px-5 md:px-6 py-2 text-xs font-regular rounded-full border transition-colors duration-200 bg-transparent text-white hover:bg-[#1789FF] hover:text-white border-white hover:border-[#1789FF]">
                                    {buttonText}
                                </button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
