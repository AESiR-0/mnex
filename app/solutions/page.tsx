import CapabilitiesSection from "@/components/CapabilitiesSection";
import React from "react";

const Page = () => {
  return (
    <div>
      <section className="w-full bg-[#F2F2F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-18 lg:py-24 text-center">
          {/* Headline */}
          <h1
            className="text-[#444] pt-5 font-semibold leading-tight
                       text-2xl sm:text-3xl md:text-4xl "
          >
            We don't sell capabilities.
            <br />
            We build the right one for you.
          </h1>

          {/* Copy */}
          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-5 text-[#666]">
            <p
              className="mx-auto max-w-2xl leading-relaxed
                        text-lg   "
            >
              At Mnex, we start with your product, scale, and <br /> market risks, then
              shape a complete solution around it.
            </p>
            <p  
              className="mx-auto max-w-xl leading-relaxed
                        text-lg   "
            >
              From tooling and molding to automation and integrated product
              development, we deliver what your strategy truly needs.
            </p>
          </div>
        </div>
      </section>
      <section>
        <CapabilitiesSection />
      </section>
    </div>
  );
};

export default Page;
