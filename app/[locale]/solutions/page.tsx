import CapabilitiesSection from "@/components/CapabilitiesSection";
import React from "react";
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();
  return (
    <div>
      <section className="w-full bg-[#F2F2F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-18 lg:py-24 text-center">
          {/* Headline */}
          <h1
            className="text-[#444] pt-5 font-semibold leading-tight
                       text-2xl sm:text-3xl md:text-4xl "
          >
            {t("Home.solutions.leftTitle.line1")}
            <br />
            {t("Home.solutions.leftTitle.line2")}
          </h1>

          {/* Copy */}
          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-5 text-[#666]">
            <p
              className="mx-auto max-w-2xl leading-relaxed
                        text-lg   "
            >
              {t("Home.solutions.rightText.paragraph1")}
            </p>
            <p  
              className="mx-auto max-w-xl leading-relaxed
                        text-lg   "
            >
              {t("Home.solutions.rightText.paragraph2")}
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
