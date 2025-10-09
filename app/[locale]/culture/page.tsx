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
        title: "Safety as Standard",
        headline: "Preventive, systematic, and always improving.",
        desc: '',
        bullets: [
            "Regular risk assessments & safety audits: Proactively identifying and addressing hazards before they become incidents.",
            "Standard operating procedures: Clear, documented steps for all high-risk functions to ensure consistency and safety.",
            "Mandatory safety training & equipment maintenance: Ongoing education and upkeep to keep everyone protected and prepared.",
        ],
        img: "/static/culture/1.webp",
        imgPhone: "/static/culture/1-phone.webp",
        // video: "/videos/home/Solutions - Tooling.webm",
    },
    {
        id: "fair-inclusive-hiring",
        title: "Fair & Inclusive Hiring",
        headline: "Diverse teams\nmake us stronger",
        desc: "",
        bullets: [
            "Clear expectations & fair advancement: Transparent criteria ensure opportunities are open and merit-based.",
            "Equal opportunity policies: A workplace built on respect, with zero tolerance for discrimination.",
            "Representation at every level: From the shop floor to the boardroom, including a women-led leadership team.",
        ],
        img: "/static/culture/2.webp",
        imgPhone: "/static/culture/2-phone.webp",
        // video: "/videos/home/Solutions - Injection Molding.webm",
    },
    {
        id: "employee-development",
        title: "Employee Development",
        headline: "Growth at\nevery level",
        desc: "We believe growth is built into every role, every project, every career.",
        bullets: [
            "Targeted Upskilling & Cross-Training: Building expertise with programs that strengthen both depth and breadth.",
            "Job Rotation & Knowledge Sharing: Expanding perspectives through cross-department exposure and collaboration.",
            "Clear Metrics & Feedback: Transparent performance measures and real-time feedback to fuel growth.",
            "Leadership & Career Development: Structured pathways to advance careers and prepare tomorrow's leaders.",
            "Recognition & Global Opportunities: Celebrating contributions and offering exposure across regions to build cultural intelligence.",
        ],
        img: "/static/culture/3.webp",
        imgPhone: "/static/culture/3-phone.webp",
        // video: "/videos/home/Solutions: Smart_Automation_Fixtures.webm",
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
                        OUR FOCUS
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
                            Our Culture:
                            <br />
                            Safe, Fair & Growth Oriented                    </h2>
                        <p className="mt-4 max-w-2xl mx-auto  text-[#6F6F6F] text-lg">
                            Our people are the foundation of everything we build.
                        </p>
                        <p className=" max-w-2xl mx-auto  text-[#6F6F6F] whitespace-pre-line text-lg">
                            At Mnex, operational excellence starts with a workforce that's supported,
                            empowered, and growing. We focus on Safety, Fair & Inclusive Hiring,

                            Employee Development, and Career Growth Opportunities.
                        </p>
                    </div></div>
            </section>
            <CapabilitiesSection />
            <section className="w-full h-[75vh] max-md:h-[60vh] bg-cover bg-center bg-no-repeat text-white flex items-center relative">
                <div className="absolute inset-0 bg-[#009B80]"></div>
                <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col  items-center justify-center h-full">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl leading-[1] md:leading-[1.25] font-semibold mb-6 sm:mb-8 md:mb-10">
                            Career Opportunities: <br />
                            Build your future with us
                        </h2>

                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.3] opacity-95 mb-8 sm:mb-10">
                            We offer long-term career growth with clear progression paths, providing
                            opportunities for every stage—whether you're just starting out or bringing
                            years of expertise—within a collaborative, high-performance culture that
                            thrives on innovation, support, and shared success.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex justify-center mt-10 max-md:mt-0"
                        >
                            <Link href={'mailto:careers@mnexprecision.com'} target="_blank">
                                <button className="mt-12 max-md:mt-6 px-8  py-3 text-sm sm:text-base font-regular rounded-full border transition-colors duration-200 bg-transparent text-white hover:bg-white/80 hover:text-[#009B80] border-white hover:border-white/80">
                                    Reach Us                               </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}




export default page 