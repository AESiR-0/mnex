import PurposeCarousel from "@/components/About/PurposeCarousel";

const slides = [
  {
    img: "/images/about/approach-1.jpg",
    imgAlt: "Team discussion",
    step: "1",
    title: "Business-Aligned from Day One",
    lead: "We start with your strategy—not our machines. Every plan is tailored to your volumes, risks, and business goals.",
    bullets: [
      "Tailored manufacturing strategies",
      "Early alignment to cost, compliance, and launch targets",
    ],
  },
  {
    img: "/images/about/approach-2.jpg",
    step: "2",
    title: "Precision by Design",
    lead: "Design for manufacturing and digital traceability built into the process from the start.",
    bullets: ["DFM reviews", "Process capability early", "Paperless QA"],
  },
  {
    img: "/images/about/approach-3.jpg",
    step: "3",
    title: "Automation that Matters",
    lead: "Robotics, vision and closed-loop control applied with intention for throughput and quality.",
  },
];

export default function AboutApproach() {
  return <PurposeCarousel slides={slides} intervalMs={6000} />;
}
