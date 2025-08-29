"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./Header";

type Capability = {
    title: string;
    headline: string;
    desc: string;
    bullets: string[];
    img: string;
    video?: string;
};

const capabilities: Capability[] = [
    {
        title: "Tooling",
        headline: `Tools that drive performance,
not just parts`,
        desc: ``,
        bullets: [
            "Innovation Built-In: 30+ patents; every mold is a system for efficiency and assembly.",
            // "Motion Complexity Mastered: Engineered slides, lifters, and core pullers deliver accuracy in tight spaces.",
            "Precision & Motion: Engineered slides, lifters, and core pullers deliver accuracy in tight spaces.",
            "Integrated by Design: In-house CNC, EDM, and grinding achieve micron tolerances while enabling inserts, sub-assemblies, and encapsulation.",
            "Ready for Anything: From prototypes to high-volume stack molds, our toolroom delivers."
        ],
        img: "/images/capabilities/tooling.jpg",
        video: "/videos/home/Solutions - Tooling.webm",
    },
    {
        title: "Injection Molding",
        headline: `Material, machine, process, 
perfectly aligned.`,
        desc: "",
        bullets: [
            "Thermoplastics Perfected: Resins to advanced polymers - processed for accuracy and stability.",
            "Beyond Thermoplastics: Thermosets (BMC, epoxy, LSR) with custom tooling and controls.",
            "90+ Machines, Zero Limits: Micro to macro tonnage, vertical or horizontal, twin or single barrel.",
            "Scientific Molding Discipline: Stable, repeatable, production-ready processes.",
            "Sub-Micron Metrology: CMMs, vision systems and fixtures that measure performance and shape.",
        ],
        img: "/images/capabilities/molding.jpg",
        video: "/videos/home/Solutions - Injection Molding.webm",
    },
    {
        title: "Smart Automation & Assembly",
        headline: `Automation built in,
engineered to flow.`,
        desc: "",
        bullets: [
            "Custom jigs, fixtures, EOATs, and robotic stations",
            "Vision systems, poka-yoke checkpoints, and traceability",
            "Modular, adaptable setups for changing product needs",
            "Proprietary solutions when off-the-shelf isn't enough - improving productivity, safety, and quality",
        ],
        img: "/images/capabilities/automation.jpg",
        video: "/videos/home/Solutions - Smart Automation & Fixtures.webm",
    },
    {
        title: "Integrated Product Development",
        headline: `Design thinking,
manufacturing reality.`,
        desc: "",
        bullets: [
            "Structured product strategy and design-for-manufacturability",
            "Built-in function, compliance, durability, and aesthetics",
            "Proven track record: child safety systems, sterilizers, complex sub-assemblies",
            "Same rigor whether it's a single part or a full electromechanical system",
        ],
        img: "/images/capabilities/development.jpg",
        video: "/videos/home/Solutions - Integrated Product Development.webm",
    },
];

export default function CapabilitiesSection() {
    const [activeTab, setActiveTab] = useState(0);
    const activeCapability = capabilities[activeTab];

    // Function to get tab index from hash
    const getTabIndexFromHash = (hash: string) => {
        const cleanHash = hash.replace('#', '');
        const tabIndex = capabilities.findIndex(capability => 
            capability.title.toLowerCase().split(' ').join('-') === cleanHash
        );
        return tabIndex >= 0 ? tabIndex : 0;
    };

    // Handle hash changes and initial load
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const tabIndex = getTabIndexFromHash(hash);
                setActiveTab(tabIndex);
            }
        };

        // Set initial tab from hash if present
        if (window.location.hash) {
            const tabIndex = getTabIndexFromHash(window.location.hash);
            setActiveTab(tabIndex);
        }

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Update hash when tab changes
    const handleTabChange = (index: number) => {
        setActiveTab(index);
        const tabId = capabilities[index].title.toLowerCase().split(' ').join('-');
        window.location.hash = tabId;
    };

    // Function to format bullet text with bold parts
    const formatBulletText = (text: string) => {
        const parts = text.split(':');
        if (parts.length > 1) {
            return (
                <>
                    <span className="font-bold">{parts[0]}:</span>
                    <span>{parts.slice(1).join(':')}</span>
                </>
            );
        }
        return text;
    };

    return (
        <section className="w-full whitespace-pre-line bg-[#ececec] flex flex-col">
            {/* Header */}
            <div className="bg-[#ececec] py-4 flex-shrink-0">
                <div className="max-w-7xl mx-auto px-4">
                    <Header className="text-center  mb-0 pb-2">
                        Core Capabilities
                    </Header>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-20">
                        {capabilities.map((capability, index) => {
                            const tabId = capability.title.toLowerCase().split(' ').join('-');
                            return (
                                <button
                                    key={capability.title}
                                    id={tabId}
                                    onClick={() => handleTabChange(index)}
                                    className={`text-lg md:text-xl py-2 whitespace-pre-line transition-colors ${activeTab === index
                                        ? "text-[#1789FF] "
                                        : "text-[#8a8a8a] hover:text-[#1789FF]"
                                        }`}
                                    aria-selected={activeTab === index}
                                    role="tab"
                                    aria-controls={`${tabId}-panel`}
                                >
                                    {capability.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 py-16 relative">
                {/* Background Video/Image */}
                {activeCapability.video ? (
                    <video
                        key={`${activeCapability.title}-${activeTab}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        src={activeCapability.video}
                        muted
                        playsInline
                        autoPlay
                        loop
                    />
                ) : (
                    <Image
                        src={activeCapability.img}
                        alt={activeCapability.title}
                        fill
                        className="object-cover"
                        priority={activeTab === 0}
                    />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />

                {/* Content overlay */}
                <div className="relative z-10 h-full flex items-start py-20">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <div
                            id={`${activeCapability.title.toLowerCase().split(' ').join('-')}-panel`}
                            role="tabpanel"
                            aria-labelledby={`${activeCapability.title.toLowerCase().split(' ').join('-')}`}
                            className="max-w-2xl"
                        >
                            {/* Headline */}
                            <h3 className="text-white  text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
                                {activeCapability.headline}
                            </h3>

                            {/* Description */}
                            <p className="text-white/90  text-lg md:text-xl leading-normal mb-4 whitespace-pre-line">
                                {activeCapability.desc}
                            </p>

                            {/* Bullet Points */}
                            <ul className="space-y-4">
                                {activeCapability.bullets.map((bullet, index) => (
                                    <li key={index} className="text-white/90 pr-48 text-base  md:text-lg leading-normal flex items-start">
                                        <span className="font-bold rounded-full mr-2">•</span>
                                        <span>{formatBulletText(bullet)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
