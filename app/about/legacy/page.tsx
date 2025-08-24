"use client";
import Image from "next/image";

type Props = {
  title?: string;
  subtitleTop?: string;
  subtitleBottom?: string;
  imageSrc: string; // e.g. /images/about/origin.jpg
  imageAlt?: string;
  priority?: boolean;
};

export default function AboutOriginHero({
  title = "Our Origin:\nFrom Meiban to Mnex",
  subtitleTop = "A legacy of precision.",
  subtitleBottom = "A future of purpose-driven manufacturing.",
  imageSrc,
  imageAlt = "Meiban to MNEX crates",
  priority = false,
}: Props) {
  return (
    <>
      <section className="w-full bg-white">
        {/* Copy block */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-6 text-center">
          <h1
            className="whitespace-pre-line text-[#333] font-semibold
                       text-2xl sm:text-3xl md:text-4xl lg:text-[28px]"
          >
            {title}
          </h1>

          <div className="mt-5 space-y-1.5">
            <p className="text-[#6b6b6b] text-sm sm:text-[15px] md:text-base">
              {subtitleTop}
            </p>
            <p className="text-[#6b6b6b] text-sm sm:text-[15px] md:text-base">
              {subtitleBottom}
            </p>
          </div>
        </div>

        {/* Full-bleed image */}
        <div className="relative w-full h-[36vh] sm:h-[44vh] md:h-[56vh] lg:h-[64vh] xl:h-[72vh]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            priority={priority}
            className="object-cover"
          />
        </div>
      </section>
      <section className="w-full bg-white text-[#595959] py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6 text-base leading-relaxed">
          <p>
            For nearly four decades, Meiban was trusted worldwide for precision
            tooling, high-quality injection molding, and disciplined
            manufacturing. That hard-earned reputation for reliability is the
            foundation of everything we do at Mnex.
          </p>

          <p>
            Mnex represents the next phase of that legacy—shaped by modern
            manufacturing needs, advanced automation, and digitally integrated
            systems.
          </p>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              Execution Aligned with Strategy
            </h3>
            <p>
              Your business goals—volume, cost, speed, and compliance—guide how
              we engineer, automate, and deliver. We don’t just manufacture
              parts; we build purpose-driven solutions that reduce risk and
              create measurable value.
            </p>
          </div>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              Agility Built In
            </h3>
            <p>
              Our lean teams and digital-first operations (MES and paperless QA
              systems) ensure faster decision-making, total traceability, and
              quicker launches.
            </p>
          </div>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              Automation that Matters
            </h3>
            <p>
              From robotics to closed-loop process control, we apply automation
              with intention—enhancing scalability, quality, and smart labor
              use.
            </p>
          </div>

          <div>
            <h3 className="text-[#1789FF] font-semibold mb-1">
              The Spirit of Meiban Lives On.
            </h3>
            <p className="italic">
              But Mnex brings a new momentum—
              <br />
              <span className="not-italic font-medium">
                Strategic. Responsive. Precision-led.
              </span>
              <br />
              Engineering what matters today, with the vision of tomorrow.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
