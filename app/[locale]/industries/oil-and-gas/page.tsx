import React from "react";
import VerticalContent from "@/components/Industries/VerticalContent";
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();
  return (
    <>
      <VerticalContent
        buttonText={t("Industries.oilAndGas.buttonText")}
        backgroundImage="/static/industries/ONG.jpg"
        items={[
          {
            title: t("Industries.oilAndGas.ruggedness.title"),
            desc: t("Industries.oilAndGas.ruggedness.desc")
          },
          {
            title: t("Industries.oilAndGas.precision.title"),
            desc: t("Industries.oilAndGas.precision.desc")
          },
          {
            title: t("Industries.oilAndGas.material.title"),
            desc: t("Industries.oilAndGas.material.desc")
          },
          {
            title: t("Industries.oilAndGas.lifecycle.title"),
            desc: t("Industries.oilAndGas.lifecycle.desc")
          }
        ]}
        content={t("Industries.oilAndGas.content")}
        sectionId="oil-gas"
      />

    
    </>
  );
};

export default Page;
