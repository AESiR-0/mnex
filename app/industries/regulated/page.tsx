import React from "react";
import VerticalContent from "@/components/Industries/VerticalContent";

const Page = () => {
  return (
    <>
      <VerticalContent
        backgroundImage="/static/industries/Regulated.webp"
        items={[
          {
            title: "Compliance",
            desc: "Our facilities operate under ISO 13485 for medical manufacturing, with validated processes such as IQ, OQ, and PQ ensuring long-term stability. For juvenile products, we align with EN71, ASTM, and other international safety standards, while selecting materials that consistently meet global regulatory requirements."
          },
          {
            title: "Safety & Traceability",
            desc: "We safeguard every part through strict controls at both material and process level. Production begins with biocompatible, BPA-free, and phthalate-free materials, compliant with RoHS and REACH, and verified in-house using XRF and other lab equipment. Lot-level traceability is maintained through rigorous supplier management, while FMEA and risk-based reviews anticipate and mitigate risks. A fully digital quality system supports SPC and trend analysis, creating forward traceability and consistent compliance."
          },
          {
            title: "Reliability",
            desc: "Reliability is built in through tooling and processes designed for stability. Molds are engineered and validated for long lifecycle programs, maintaining dimensional integrity over years of production. Critical molding and assembly are carried out in controlled environments, ensuring process consistency, cleanliness, and uninterrupted supply for global OEMs. At Mnex, we engineer for compliance, safety, and reliability — so your regulated products remain safe, trusted, and globally marketable."
          }
        ]}
        content="In regulated industries, precision alone is not enough. Every part must meet stringent safety, compliance, and documentation requirements. Mnex combines molding expertise with robust quality systems to ensure medical devices and juvenile products meet the highest global standards."
        sectionId="regulated"
      />
    </>
  );
};

export default Page;
