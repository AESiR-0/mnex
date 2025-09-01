"use client";
import PurposeCarousel from "@/components/About/PurposeCarousel";
import { useEffect, useState } from "react";

const slides = [
  {
    img: "/static/about/1.jpg",
    mobileImage: "/static/about/mobile/1.jpg",
    imgAlt: "Team discussion",
    step: "1",
    title: "Business-Aligned from Day One",
    lead: "We start with your strategy - not our machines. Every plan is tailored to your volumes, risks, and business goals.",
    bullets: [
      "Tailored manufacturing strategies",
      "Early alignment to cost, compliance, and launch targets",
    ],
    // ctas: [
    //   { label: "See How We Build", href: "/build" },
    //   { label: "Explore Case Studies", href: "/case-studies" },
    // ],
  },
  {
    img: "/static/about/2.webp",
    mobileImage: "/static/about/mobile/2_mobile.webp",
    imgAlt: "Custom manufacturing",
    step: "2",
    title: "Flexible from Specialized to Scaled",
    lead: "Structured for global manufacturing programs, yet agile enough for custom industrial builds.",
    bullets: [
      "Agile teams for complex custom projects",
      "Systems designed for consistent large-scale execution",
    ],
    // ctas: [
    //   { label: "See How We Build", href: "/build" },
    //   { label: "Explore Case Studies", href: "/case-studies" },
    // ],
  },
  {
    img: "/static/about/3.webp",
    mobileImage: "/static/about/mobile/3_mobile.webp",
    imgAlt: "Integrated tooling and automation",
    step: "3",
    title: "Vertically Integrated for Speed",
    lead: "Everything in one place: tooling, molding, automation, assembly.",
    bullets: [
      "Faster iteration cycles",
      "Tighter quality control",
      "Seamless handoffs at every stage",
    ],
    // ctas: [
    //   { label: "See How We Build", href: "/build" },
    //   { label: "Explore Case Studies", href: "/case-studies" },
    // ],
  },
  {
    img: "/static/about/4.jpg",
    imgAlt: "Precision design",
    step: "4",
    title: "Precision by Design",
    lead: "Decades of tooling and process mastery are built into every solution.",
    bullets: [
      "Stable, repeatable results",
      "Micron-level tolerances where it matters",
      "Quality designed in, not inspected in",
    ],
    // ctas: [
    //   { label: "See How We Build", href: "/build" },
    //   { label: "Explore Case Studies", href: "/case-studies" },
    // ],
  },
  {
    img: "/static/about/5.jpg",
    mobileImage: "/static/about/mobile/5.jpg",
    imgAlt: "Innovation",
    step: "5",
    title: "Pragmatic Innovation",
    lead: "We don't add complexity for show.",
    bullets: [
      "Right technology for the right reason",
      "Outcome-driven solutions, never overengineered",
      "Measurable gains in performance and reliability",
    ],
    // ctas: [
    //   { label: "See How We Build", href: "/build" },
    //   { label: "Explore Case Studies", href: "/case-studies" },
    // ],
  },
  {
    img: "/static/about/6.jpg",
    mobileImage: "/static/about/mobile/6.jpg",
    imgAlt: "Execution focused",
    step: "6",
    title: "Execution Obsessed",
    lead: "Because ideas only matter if they launch on time.",
    bullets: [
      "Fast setups and mature systems",
      "Teams with decades of successful deliveries",
      "Relentless focus on timelines and outcomes",
    ],
    // ctas: [
    //   { label: "See How We Build", href: "/build" },
    //   { label: "Explore Case Studies", href: "/case-studies" },
    // ],
  },
];

export default function AboutApproach() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updatedSlides = slides.map(slide => ({
    ...slide,
    img: isMobile && slide.mobileImage ? slide.mobileImage : slide.img
  }));

  return <PurposeCarousel slides={updatedSlides} intervalMs={6000} />;
}