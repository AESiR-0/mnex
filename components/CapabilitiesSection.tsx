"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./Header";
import { useTranslations } from 'next-intl';

type Capability = {
    title: string;
    headline: string;
    desc: string;
    bullets: string[];
    img: string;
    video?: string;
    id: string; // English identifier for hash navigation
};

const getCapabilities = (t: any): Capability[] => [
    {
        id: "tooling",
        title: t("Solutions.tooling"),
        headline: t("Solutions.toolingHeadline"),
        desc: t("Solutions.toolingDesc"),
        bullets: [
            t("Solutions.toolingBullet1"),
            t("Solutions.toolingBullet2"),
            t("Solutions.toolingBullet3"),
            t("Solutions.toolingBullet4")
        ],
        img: "/images/capabilities/tooling.jpg",
        video: "/videos/home/Solutions - Tooling.webm",
    },
    {
        id: "injection-molding",
        title: t("Solutions.injectionMolding"),
        headline: t("Solutions.injectionMoldingHeadline"),
        desc: t("Solutions.injectionMoldingDesc"),
        bullets: [
            t("Solutions.injectionMoldingBullet1"),
            t("Solutions.injectionMoldingBullet2"),
            t("Solutions.injectionMoldingBullet3"),
            t("Solutions.injectionMoldingBullet4"),
            t("Solutions.injectionMoldingBullet5"),
        ],
        img: "/images/capabilities/molding.jpg",
        video: "/videos/home/Solutions - Injection Molding.webm",
    },
    {
        id: "smart-automation-assembly",
        title: t("Solutions.smartAutomation"),
        headline: t("Solutions.smartAutomationHeadline"),
        desc: t("Solutions.smartAutomationDesc"),
        bullets: [
            t("Solutions.smartAutomationBullet1"),
            t("Solutions.smartAutomationBullet2"),
            t("Solutions.smartAutomationBullet3"),
            t("Solutions.smartAutomationBullet4"),
        ],
        img: "/images/capabilities/automation.jpg",
        video: "/videos/home/Solutions - Smart Automation & Fixtures.webm",
    },
    {
        id: "integrated-product-development",
        title: t("Solutions.productDevelopment"),
        headline: t("Solutions.productDevelopmentHeadline"),
        desc: t("Solutions.productDevelopmentDesc"),
        bullets: [
            t("Solutions.productDevelopmentBullet1"),
            t("Solutions.productDevelopmentBullet2"),
            t("Solutions.productDevelopmentBullet3"),
            t("Solutions.productDevelopmentBullet4"),
        ],
        img: "/images/capabilities/development.jpg",
        video: "/videos/home/Solutions - Integrated Product Development.webm",
    },
];

export default function CapabilitiesSection() {
    const [activeTab, setActiveTab] = useState(0);
    const t = useTranslations();
    const capabilities = getCapabilities(t);
    const activeCapability = capabilities[activeTab];

    // Function to get tab index from hash
    const getTabIndexFromHash = (hash: string) => {
        const cleanHash = hash.replace('#', '');
        const tabIndex = capabilities.findIndex(capability =>
            capability.id === cleanHash
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
        const tabId = capabilities[index].id;
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
                <div className="max-w-7xl mx-auto px-4 max-md:max-w-full">
                    <Header className="pt-4 sm:pt-6 pb-4 md:mb-0 text-center">
                        {t("Home.capabilities.title")}
                    </Header>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-20">
                        {capabilities.map((capability, index) => {
                            return (
                                <button
                                    key={capability.id}
                                    id={capability.id}
                                    onClick={() => handleTabChange(index)}
                                    className={`shrink-0 text-sm sm:text-lg md:text-xl py-1 sm:py-3 transition-colors ${activeTab === index
                                        ? "text-[#1789FF] "
                                        : "text-[#8a8a8a] hover:text-[#1789FF]"
                                        }`}
                                    aria-selected={activeTab === index}
                                    role="tab"
                                    aria-controls={`${capability.id}-panel`}
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
                    <div className="max-w-7xl mx-auto px-4 w-full max-md:max-w-full">
                        <div
                            id={`${activeCapability.id}-panel`}
                            role="tabpanel"
                            aria-labelledby={`${activeCapability.id}`}
                            className="max-w-2xl max-md:max-w-full"
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
                                    <li key={index} className="text-white/90 pr-48 max-md:pr-5 text-base  md:text-lg leading-normal flex items-start">
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
