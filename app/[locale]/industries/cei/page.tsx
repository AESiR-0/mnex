import Header from "@/components/Header";
import VerticalContent from "@/components/Industries/VerticalContent";
import CaseStudySection from "@/components/Industries/CaseStudySection";
import { useTranslations } from 'next-intl';

export default function CeiPage() {
  const t = useTranslations();
  return (
    <>
      <VerticalContent
        backgroundImage="/static/industries/CEI.jpg"
        mobileImage="/static/industries/C&I_mobile.webp"
        items={[
          {
            title: t("Industries.cei.speed.title"),
            desc: t("Industries.cei.speed.desc")
          },
          {
            title: t("Industries.cei.volume.title"),
            desc: t("Industries.cei.volume.desc")
          },
          {
            title: t("Industries.cei.cost.title"),
            desc: t("Industries.cei.cost.desc")
          },
          {
            title: t("Industries.cei.aesthetics.title"),
            desc: t("Industries.cei.aesthetics.desc")
          }
        ]}
        content={t("Industries.cei.content")}
      />
      <div id="case-study">
        <CaseStudySection />
      </div>
    </>
  );
}
