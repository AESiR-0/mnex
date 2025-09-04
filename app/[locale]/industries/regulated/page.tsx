import React from "react";
import VerticalContent from "@/components/Industries/VerticalContent";
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();
  return (
    <>
      <VerticalContent
        backgroundImage="/static/industries/Regulated.webp"
        items={[
          {
            title: t("Industries.regulated.compliance.title"),
            desc: t("Industries.regulated.compliance.desc")
          },
          {
            title: t("Industries.regulated.safety.title"),
            desc: t("Industries.regulated.safety.desc")
          },
          {
            title: t("Industries.regulated.reliability.title"),
            desc: t("Industries.regulated.reliability.desc")
          }
        ]}
        content={t("Industries.regulated.content")}
        sectionId="regulated"
      />
    </>
  );
};

export default Page;
