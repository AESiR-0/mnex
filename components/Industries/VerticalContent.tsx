"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    buttonText,
}: {
    items: ApproachItem[];
    sectionId?: string;
    buttonText?: string;
    content: string;
    backgroundImage?: string;
}) {
    const [activeApproach, setActiveApproach] = useState(0);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const isMountedRef = useRef(true);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const pathname = usePathname();

    // Component mount/unmount tracking
    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Next.js 15 specific: Disable ScrollTrigger during navigation
    useEffect(() => {
        // Disable ScrollTrigger globally during navigation
        ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });

        return () => {
            // Re-enable ScrollTrigger
            ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
        };
    }, [pathname]);

    // GSAP Context-based ScrollTrigger management
    useEffect(() => {
        if (!sectionRef.current || !contentRef.current || !isMountedRef.current) return;

        const section = sectionRef.current;
        const content = contentRef.current;

        // Kill existing ScrollTrigger if it exists
        if (scrollTriggerRef.current) {
            try {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            } catch (error) {
                console.warn('ScrollTrigger cleanup error:', error);
            }
        }

        // Create GSAP context for this component
        const ctx = gsap.context(() => {
            // Create ScrollTrigger within the context
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: `+=${items.length * 700}`,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    if (!isMountedRef.current) return;

                    try {
                        const progress = self.progress;
                        const step = Math.floor(progress * items.length);
                        const clampedStep = Math.min(step, items.length - 1);

                        // Set active approach based on scroll progress
                        const newActiveApproach = Math.max(0, clampedStep);

                        if (newActiveApproach !== activeApproach && isMountedRef.current) {
                            setActiveApproach(newActiveApproach);
                        }
                    } catch (error) {
                        console.warn('ScrollTrigger onUpdate error:', error);
                    }
                },
                onLeave: () => {
                    if (isMountedRef.current) {
                        try {
                            setActiveApproach(items.length - 1);
                        } catch (error) {
                            console.warn('ScrollTrigger onLeave error:', error);
                        }
                    }
                },
                onEnterBack: () => {
                    if (isMountedRef.current) {
                        try {
                            setActiveApproach(0);
                        } catch (error) {
                            console.warn('ScrollTrigger onEnterBack error:', error);
                        }
                    }
                }
            });
        }, sectionRef); // Scope to the section element

        // Cleanup function
        return () => {
            // Kill ScrollTrigger first
            if (scrollTriggerRef.current) {
                try {
                    scrollTriggerRef.current.kill();
                    scrollTriggerRef.current = null;
                } catch (error) {
                    console.warn('ScrollTrigger kill error:', error);
                }
            }

            // Then revert the GSAP context
            try {
                ctx.revert();
            } catch (error) {
                console.warn('GSAP context revert error:', error);
            }
        };
    }, [items.length, activeApproach, pathname]);

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
            </section>
            <div ref={contentRef} className="h-[70vh] flex items-center py-10 relative">
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

                <div className="max-w-4xl  h-full  px-10 space-y-5 mx-auto w-full relative z-10">
                    <div className="flex flex-col-reverse h-full justify-center items-center">
                        {/* Left: Active content - Now horizontal */}
                        <div
                            id={panelId}
                            role="tabpanel"
                            aria-labelledby={activeTabId}
                            className="flex gap-6  h-1/2 sm:gap-8 md:gap-10 text-white"
                        >
                            <motion.div
                                key={active}
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0, ease: "easeOut" }}
                                className="contents"
                            >
                                <h3 className="text-2xl leading-tight">
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
                                className="flex  flex-wrap h-1/2  py-10 justify-between w-full gap-x-3"
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
                                                if (isMountedRef.current) {
                                                    setActiveApproach(i);
                                                }
                                            }}
                                            className={`text-left px-0 py-2 text-4xl transition-all duration-300 ease-out
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
                            className="flex justify-center -mt-15 "
                        >
                            <Link href={'https://meibanenergy.com'} target="_blank">
                                <button className="px-6 sm:px-5 py-2 text-xs font-regular  rounded-full border transition-colors duration-200 bg-transparent text-white hover:bg-[#1789FF] hover:text-white border-white hover:border-[#1789FF]">
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
