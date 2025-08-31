import React from "react";
import VerticalContent from "@/components/Industries/VerticalContent";

const Page = () => {
  return (
    <>
      <VerticalContent
        buttonText={"Learn more at meibanenergy.com"}

        backgroundImage="/static/industries/ONG.jpg"
        items={[
          {
            title: "Ruggedness",
            desc: "Processes and controls are built for subsea, high-pressure, and high-temperature duty. Our API Spec Q1–certified quality management system underpins drilling, honing, machining, and threading services tailored for Oil & Gas applications."
          },
          {
            title: "Precision",
            desc: "We deliver tight-tolerance parts through process-disciplined deep-hole boring, long-length honing, turning and milling, as well as controlled threading — verified to drawing and API requirements with in-process checks and documented release criteria."
          },
          {
            title: "Material Mastery",
            desc: "We work extensively with exotic alloys including titanium and Inconel, and apply advanced coatings and treatments to extend wear life and corrosion resistance. Our capabilities span welding, heat treatment, and nondestructive testing, enabling us to manufacture mission-critical parts with confidence."
          },
          {
            title: "Lifecycle Support",
            desc: "Programs are built to run long: we sustain legacy SKUs, manage engineering changes, and maintain capacity at our Johor site for replacement and service parts to support field demand."
          }
        ]}
        content="In Oil & Gas, components must withstand extreme conditions — high pressure, corrosive environments, and remote field deployment. With over 10 years of experience in machining and turnkey manufacturing, Mnex is a trusted partner to global service companies delivering reliable performance in the toughest environments."
        sectionId="oil-gas"
      />

    
    </>
  );
};

export default Page;
