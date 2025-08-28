import Header from "@/components/Header";
import VerticalContent from "@/components/Industries/VerticalContent";
import CaseStudySection from "@/components/Industries/CaseStudySection";

export default function CeiPage() {
  return (
    <>
      <VerticalContent 
        backgroundImage="/static/industries/CEI.jpg" 
        items={[
          {
            title: "Speed",
            desc: "Integrated tooling, molding, and automation under one roof. Proven ability to meet compressed launch schedules without sacrificing process discipline or product quality."
          },
          {
            title: "Volume",
            desc: `90+ injection molding machines across our facilities, supported by a developed supply chain and standardized processes refined over decades. Our teams have scaled stable, long-running programs for leading global brands — from pilot runs to millions of parts annually.`
          },
          {
            title: "Cost",
            desc: `Early design-for-manufacturing (DFM), value engineering, and lean practices are built into every program. We invest in automation and process innovations that deliver measurable savings. See how we achieved 2× throughput for a legacy program without new capital equipment in our case study`
          },
          {
            title: "Aesthetics",
            desc: `Molding expertise, advanced texturing, IMD/IML and secondary finishing ensure that cosmetic surfaces and design intent are preserved — because in consumer products, looks matter as much as performance.
At Mnex, we engineer for speed, volume, cost, and aesthetics — so your products launch fast, scale reliably, and win in the market.`
          }
        ]} 
        content="In the consumer and industrial space, market success is defined by how quickly you launch, how efficiently you scale, and how well you balance cost with product appeal. Mnex brings decades of experience partnering with the world's top brands to deliver at this intersection." 
      />
      
      <CaseStudySection />
    </>
  );
}
