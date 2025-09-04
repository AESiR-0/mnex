"use client";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();
  return (
    <>
      <section className="w-full bg-[#ececec]">
        {/* Copy block */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-6 text-center">
          <h1
            className="whitespace-pre-line text-[#444] font-semibold
                       text-2xl  md:text-4xl "
          >
            {t("About.legacy.title")}
          </h1>

          <div className="my-8 ">
            <p className="text-[#6b6b6b] text-lg  ">
              {t("About.legacy.subtitle1")}
            </p>
            <p className="text-[#6b6b6b] text-lg  ">
              {t("About.legacy.subtitle2")}
            </p>
          </div>
        </div>

        {/* Full-bleed image */}
        <div className="relative w-full h-[36vh] text-[#595959] sm:h-[44vh] md:h-[56vh] lg:h-[64vh] xl:h-[72vh]">
          <Image
            src="/static/about/approach.webp" // ✅ hardcoded
            alt="Meiban to MNEX crates"
            fill
            sizes="100vw"
            priority
            className="object-cover "
          />
          {/* Blue overlay */}
        </div>
      </section>

      <section className="w-full bg-white text-[#595959] py-10 px-6">
        <div className="max-w-5xl mx-auto space-y-6 text-base leading-relaxed">
          <p>
            {t("About.legacy.paragraph1")}
          </p>

          <p>
            {t("About.legacy.paragraph2")}
          </p>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              {t("About.legacy.execution.title")}
            </h3>
            <p>
              {t("About.legacy.execution.desc")}
            </p>
          </div>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              {t("About.legacy.agility.title")}
            </h3>
            <p>
              {t("About.legacy.agility.desc")}
            </p>
          </div>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              {t("About.legacy.automation.title")}
            </h3>
            <p>
              {t("About.legacy.automation.desc")}
            </p>
          </div>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              {t("About.legacy.spirit.title")}
            </h3>
            <p className="italic">
              {t("About.legacy.spirit.desc")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
