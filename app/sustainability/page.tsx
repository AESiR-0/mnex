"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

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
        title: "Environmental Impact",
        headline: `Sustainability 
        starts at the source`,
        desc: ``,
        bullets: [
            "**>10%** renewable energy",
            "**>20%** of machines hybrid or electric (50% less energy)",
            "**VOC** captured and filtered on all production lines",
            ` Closed-loop water systems;
            **Zero** untreated wastewater`
        ],
        img: "/static/home/sustainability.webp",
        video: "/videos/sustainability/Environmental impact.webm",
    },
    {
        title: "Material Efficiency & Design Optimization",
        headline: `Smarter design 
        = less waste`,
        desc: "",
        bullets: [
            "Optimized part design, gating and molding",
            "Vertical integration reduces packaging & logistics waste"
        ],
        img: "/static/home/sustainability.webp",
        video: "",
    },
    {
        title: "Responsible Procurement",
        headline: `Local, recyclable, accountable.`,
        desc: "",
        bullets: [
            "**>50%** of packaging & consumables sourced within 50 km",
            "Recyclable packaging with recycled content",
            "Suppliers vetted for traceability & compliance"
        ],
        img: "/static/home/sustainability.webp",
        video: "/videos/sustainability/Responsible+Procurement.webm",
    },
    {
        title: "Compliance & Standards",
        headline: `Global benchmarks, always met.`,
        desc: "",
        bullets: [
            "**ISO 14001** certified",
            ` **REACH, RoHS & Prop 65**
            compliant`
        ],
        img: "/static/home/sustainability.webp",
        video: "/videos/sustainability/Complaince & Standards.webm",
    },
];

export default function Sustainability() {
    return (
        <div>
            <section className="w-full text-[#009b80] bg-[#F2F2F2]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-18 lg:py-24 text-center">
                    {/* Headline */}
                    <h1
                        className=" pt-5 font-semibold leading-tight
                       text-2xl sm:text-3xl md:text-4xl "
                    >
                        Built to Perform.
                        <br />
                        Designed to Waste Less
                    </h1>

                    {/* Copy */}
                    <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-5">
                        <p
                            className="mx-auto max-w-2xl leading-relaxed
                        text-lg   "
                        >
                            We believe good manufacturing is responsible manufacturing.
                            <br />   We build smarterbecause it's better for business and the planet
                        </p>

                    </div>
                </div>
            </section>
            {/* Solar Energy Data Section */}
            <section className="w-full bg-[#ebebeb] py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Header className="text-center text-xs sm:text-sm font-medium text-[#009b80] uppercase tracking-[0.15em] mb-0 pb-20">
                        MNEX SOLAR ENERGY DATA
                    </Header>

                    <div className="grid grid-cols-1 md:grid-cols-3 text-xl  gap-8 md:gap-12">
                        {/* Solar Panels */}
                        <div className="flex items-center gap-6 px-20">
                            <div className="flex-shrink-0">
                                <Image
                                    src="/static/sustainability/solar panel.svg"
                                    alt="Solar Panel Icon"
                                    width={80}
                                    height={80}
                                    className="text-[#009b80]"
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-[#009b80] font-bold leading-none">
                                    1,562
                                </div>
                                <div className="text-[#009b80]  font-medium">
                                    SOLAR PANELS
                                </div>
                            </div>
                        </div>

                        {/* Annual Power Generation */}
                        <div className="flex items-center gap-6 px-10">
                            <div className="flex-shrink-0">
                                <Image
                                    src="/static/sustainability/annual power.svg"
                                    alt="Power Generation Icon"
                                    width={80}
                                    height={80}
                                    className="text-[#009b80]"
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-[#009b80]  ">
                                    ANNUAL POWER GENERATION
                                </div>
                                <div className="text-[#009b80] uppercase  font-semibold   leading-none">
                                    1,150,000 kWh
                                </div>
                            </div>
                        </div>

                        {/* CO2 Emissions Reduction */}
                        <div className="flex items-center gap-6 px-10">
                            <div className="flex-shrink-0">
                                <Image
                                    src="/static/sustainability/c02 emission.svg"
                                    alt="CO2 Reduction Icon"
                                    width={80}
                                    height={80}
                                    className="text-[#009b80]"
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-[#009b80]  font-medium">
                                    CO₂ EMISSIONS REDUCTION:
                                </div>
                                <div className="text-[#009b80] uppercase  font-semibold leading-none">
                                    920 Tonnes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <CapabilitiesSection />
            </section>


        </div>
    )
}


function CapabilitiesSection() {
    const [activeTab, setActiveTab] = useState(0);
    const activeCapability = capabilities[activeTab];

    // Function to format bullet text with bold parts
    const formatBulletText = (text: string) => {
        // Handle bold text with ** syntax
        if (text.includes('**')) {
            const parts = text.split('**');
            if (parts.length >= 3) {
                return (
                    <>
                        <span>{parts[0]}</span>
                        <span className="font-semibold">{parts[1]}</span>
                        <span>{parts.slice(2).join('**')}</span>
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
        <section className="w-full whitespace-pre-line bg-white h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white py-4 flex-shrink-0">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Navigation Tabs */}
                    <div className="flex justify-between gap-6 md:gap-20">
                        {capabilities.map((capability, index) => (
                            <button
                                key={capability.title}
                                onClick={() => setActiveTab(index)}
                                className={`text-lg md:text-lg py-5 whitespace-pre-line transition-colors ${activeTab === index
                                    ? "text-[#009b80] "
                                    : "text-[#8a8a8a] hover:text-[#009b80]"
                                    }`}
                            >
                                {capability.title}
                            </button>
                        ))}
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
                        onLoadedMetadata={(e) => {
                            // For Compliance & Standards video, set duration to 4 seconds
                            if (activeCapability.title === "Compliance & Standards") {
                                const video = e.currentTarget;
                                video.currentTime = 0;
                                const interval = setInterval(() => {
                                    if (video.currentTime >= 4) {
                                        video.currentTime = 0;
                                    }
                                }, 100);

                                // Cleanup interval when component unmounts
                                return () => clearInterval(interval);
                            }
                        }}
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
                <div className="relative z-10 h-full  flex items-start py-20">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <div className="max-w-full  ">
                            {/* Headline */}
                            <h3 className="text-white  text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-10">
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
