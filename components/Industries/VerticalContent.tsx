"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Header from "@/components/Header";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export type ApproachItem = { title: string; desc: string };

export default function VerticalContent({
    items,
    sectionId = "approach",
    content,
    backgroundImage,
}: {
    items: ApproachItem[];
    sectionId?: string;
    content: string;
    backgroundImage?: string;
}) {
    const [activeApproach, setActiveApproach] = useState(0); // Start with first approach active
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current) return;

        const section = sectionRef.current;
        const content = contentRef.current;

        // Create smooth scroll trigger for pinning
        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${items.length * 700}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const step = Math.floor(progress * items.length);
                const clampedStep = Math.min(step, items.length - 1);

                // Set active approach based on scroll progress
                const newActiveApproach = Math.max(0, clampedStep);

                if (newActiveApproach !== activeApproach) {
                    setActiveApproach(newActiveApproach);
                }
            },
            onLeave: () => {
                setActiveApproach(items.length - 1);
            },
            onEnterBack: () => {
                setActiveApproach(0); // Back to first item
            }
        });

        // Cleanup
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
        };
    }, [items.length, activeApproach]);

    if (!items || items.length === 0) return null;

    const active = activeApproach >= 0 ? Math.max(0, Math.min(activeApproach, items.length - 1)) : -1;
    const panelId = `${sectionId}-panel`;
    const activeTabId = active >= 0 ? `${sectionId}-tab-${active}` : undefined;

    return (
        <section
            id={sectionId}
            ref={sectionRef}
            className="w-full bg-[#ececec] min-h-screen"
        >
            <section className="w-full bg-[#f5f5f5] py-8 sm:py-10" >
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#595959] mb-6">
                        Where proof lives.
                    </h2>
                    <p className="text-sm  sm:text-base md:text-lg text-[#595959]/80 leading-normal">
                        {content}
                    </p>
                </div>
                <div className="">

                </div>
            </section >
            <div ref={contentRef} className="h-[70vh] flex items-center py-10 relative">
                <div className="max-w-4xl bg-[url('/static/industries/CEI_2.svg')] bg-cover bg-center px-10 space-y-5 mx-auto w-full relative z-10">
                    <div className="flex flex-col-reverse justify-end items-center">
                        {/* Left: Active content - Now horizontal */}
                        <div
                            id={panelId}
                            role="tabpanel"
                            aria-labelledby={activeTabId}
                            className="flex  gap-6 sm:gap-8 md:gap-10 text-[#009B80]"
                        >
                            <motion.div
                                key={active}
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0, ease: "easeOut" }}
                                className="contents"
                            >
                                <h3 className="text-2xl leading-tight  ">
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
                                className="flex flex-wrap py-10 justify-between w-full  gap-x-3     "
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
                                            onClick={() => {
                                                setActiveApproach(i);
                                                // Smooth scroll to the specific progress
                                                if (scrollTriggerRef.current) {
                                                    const progress = i / items.length;
                                                    scrollTriggerRef.current.scroll(progress);
                                                }
                                            }}
                                            className={`text-left px-0 py-2  text-4xl  transition-all duration-300 ease-out
                          ${isActive
                                                    ? "text-[#009B80]  "
                                                    : "text-[#969696] hover:text-[#009B80] "
                                                }`}
                                        >
                                            {it.title}.<span className="pr-1" />
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
