'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import React from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import Link from 'next/link';


type Capability = {
    title: string;
    headline: string;
    desc: string;
    bullets: string[];
    img: string;
    imgPhone: string;
    video?: string;
    id: string; // English identifier for hash navigation
};

const getCapabilities = (t: any): Capability[] => [
    {
        id: "safety",
        title: t("Culture.safety.title"),
        headline: t("Culture.safety.headline"),
        desc: '',
        bullets: [
            t("Culture.safety.bullet1"),
            t("Culture.safety.bullet2"),
            t("Culture.safety.bullet3"),
            t("Culture.safety.bullet4")
        ],
        img: "/static/culture/1.webp",
        imgPhone: "/static/culture/1-phone.webp",
    },
    {
        id: "innovation",
        title: t("Culture.innovation.title"),
        headline: t("Culture.innovation.headline"),
        desc: "",
        bullets: [
            t("Culture.innovation.bullet1"),
            t("Culture.innovation.bullet2"),
            t("Culture.innovation.bullet3"),
            t("Culture.innovation.bullet4")
        ],
        img: "/static/culture/2.webp",
        imgPhone: "/static/culture/2-phone.webp",
    },
    {
        id: "collaboration",
        title: t("Culture.collaboration.title"),
        headline: t("Culture.collaboration.headline"),
        desc: "",
        bullets: [
            t("Culture.collaboration.bullet1"),
            t("Culture.collaboration.bullet2"),
            t("Culture.collaboration.bullet3"),
            t("Culture.collaboration.bullet4")
        ],
        img: "/static/culture/3.webp",
        imgPhone: "/static/culture/3-phone.webp",
    },
    {
        id: "values",
        title: t("Culture.values.title"),
        headline: t("Culture.values.headline"),
        desc: "",
        bullets: [
            t("Culture.values.bullet1"),
            t("Culture.values.bullet2"),
            t("Culture.values.bullet3"),
            t("Culture.values.bullet4")
        ],
        img: "/static/culture/1.webp",
        imgPhone: "/static/culture/1-phone.webp",
    },
];

function CapabilitiesSection() {
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
                // This is external navigation, so we don't set isInternalNavigation
            }
        };

        // Set initial tab from hash if present (external navigation)
        if (window.location.hash) {
            const tabIndex = getTabIndexFromHash(window.location.hash);
            setActiveTab(tabIndex);
        }

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Update hash when tab changes (only for external navigation)
    const handleTabChange = (index: number) => {
        setActiveTab(index);
        // Don't update hash for internal tab switching
        // Hash will only be updated when navigating from external pages
    };

    // Function to format bullet text with bold parts
    const formatBulletText = (text: string) => {
        // Handle bold text with ** syntax
        if (text.includes("**")) {
            const parts = text.split("**");
            if (parts.length >= 3) {
                return (
                    <>
                        <span>{parts[0]}</span>
                        <span className="font-semibold">{parts[1]}</span>
                        <span>{parts.slice(2).join("**")}</span>
                    </>
                );
            }
        }

        // Handle text with colons
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
        <section className="w-full whitespace-pre-line sm:h-[128vh] md:h-screen  max-md:min-h-screen xl:h-[135vh] bg-[#ececec] flex flex-col">
            {/* Header */}
            <div className="bg-[#ececec] py-4 flex-shrink-0">
                <div className="max-w-7xl mx-auto px-4 max-md:max-w-full">
                    <Header className="pt-4 sm:pt-6 pb-4 md:mb-0 text-center">
                        {t("Culture.ourFocus")}
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
            <div className="flex-1 py-10   relative">
                {/* Background Video/Image */}
                {activeCapability.video ? (
                    <video
                        key={`${activeCapability.title}-${activeTab}`}
                        className="absolute inset-0 w-full  object-cover"
                        src={activeCapability.video}
                        muted
                        playsInline
                        autoPlay
                        loop
                    />
                ) : (
                    <>
                        {/* Desktop Image */}
                        <Image
                            src={activeCapability.img}
                            alt={activeCapability.title}
                            fill
                            className="object-cover hidden md:block"
                            priority={activeTab === 0}
                        />
                        {/* Mobile Image */}
                        <Image
                            src={activeCapability.imgPhone}
                            alt={activeCapability.title}
                            fill
                            className="object-cover block md:hidden"
                            priority={activeTab === 0}
                        />
                    </>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />

                {/* Content overlay */}
                <div className="relative z-10 h-full flex items-start py-16 max-md:py-5">
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
                            <p className="text-white/90  text-lg md:text-xl leading-normal my-8 whitespace-pre-line">
                                {activeCapability.desc}
                            </p>

                            {/* Bullet Points */}
                            <ul className="space-y-4">
                                {activeCapability.bullets.map((bullet, index) => (
                                    <li key={index} className="text-white/90 pr-36 max-md:pr-5 text-base  md:text-lg leading-normal flex items-start">
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



const page = () => {
    const t = useTranslations();
    return (
        <div>
            <section className="w-full h-auto  ">
                <div className=" h-full w-full bg-[#f2f2f2]">
                    <div className="max-w-4xl px-4 mx-auto max-[380px]:my-4 pb-20 pt-32 space-y-3  text-center">
                        <h2 className="text-[#444] whitespace-pre-line font-semibold text-2xl sm:text-3xl pb-4 md:text-4xl">
                            {t("Culture.hero.title")}
                            <br />
                            {t("Culture.hero.subtitle")}
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto  text-[#6F6F6F] text-lg">
                            {t("Culture.hero.description")}
                        </p>
                    </div></div>
            </section>
            <CapabilitiesSection />
            <section className="w-full h-[75vh] max-md:h-[60vh] bg-cover bg-center bg-no-repeat text-white flex items-center relative">
                <div className="absolute inset-0 bg-[#009B80]"></div>
                <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col  items-center justify-center h-full">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl leading-[1] md:leading-[1.25] font-semibold mb-6 sm:mb-8 md:mb-10">
                            {t("Culture.careerOpportunities.title")} <br />
                            {t("Culture.careerOpportunities.subtitle")}
                        </h2>

                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.3] opacity-95 mb-8 sm:mb-10">
                            {t("Culture.careerOpportunities.description")}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex justify-center mt-10 max-md:mt-0"
                        >
                            <Link href={'mailto:careers@mnexprecision.com'} target="_blank">
                                <button className="mt-12 max-md:mt-6 px-8  py-3 text-sm sm:text-base font-regular rounded-full border transition-colors duration-200 bg-transparent text-white hover:bg-white/80 hover:text-[#009B80] border-white hover:border-white/80">
                                    {t("Culture.careerOpportunities.cta")}
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}




export default page 