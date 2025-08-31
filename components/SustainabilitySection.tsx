import Header from "./Header";

// components/SustainabilitySection.tsx
export default function SustainabilitySection() {
  return (
    <section className="w-full h-screen max-md:h-[60vh] bg-cover bg-center bg-no-repeat text-white flex items-center relative" style={{ backgroundImage: 'url(/static/home/sustainability.webp)' }}>
      <div className="absolute inset-0 bg-[#009B80]/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
        {/* Left copy */}
        <div className="max-w-2xl">
          <Header className="text-white text-sm sm:text-base md:text-lg lg:text-xl">Sustainability</Header>

          <h2 className="text-2xl sm:text-3xl md:text-4xl leading-[1] md:leading-[1.25] font-semibold mb-6 sm:mb-8 md:mb-10">
            Built to Perform.
            <br />
            Designed to Waste Less.
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-snug mb-4 sm:mb-6 opacity-95">
            We believe good manufacturing <br /> is responsible manufacturing.
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-snug mb-6 sm:mb-8 md:mb-10 opacity-95">
            At Mnex, we reduce waste, save energy, <br /> and build smarter for a better planet.
          </p>

          <a
            href="/sustainability"
            className="uppercase inline-block text-xs sm:text-sm md:text-base tracking-wider font-medium underline underline-offset-4 decoration-white/70 hover:decoration-white transition"
          >
            Learn more
          </a>
        </div>

        {/* Right badges */}
        <div className="justify-self-start md:justify-self-end w-full max-w-[640px]">
          <div className="grid grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-10">
            {/* Row 1
            <Badge title="ISO" subtitle="14001" className="h-24 sm:h-28 md:h-32" />
            <Badge title="ISO" subtitle="9001" className="h-24 sm:h-28 md:h-32" />
            <div /> 
            <Badge title="RoHS" className="h-20 sm:h-24 md:h-28" />
            <Badge title="REACH" className="h-20 sm:h-24 md:h-28" />
            <Badge title="Prop65" className="h-20 sm:h-24 md:h-28" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[20px] sm:rounded-[24px] border-2 border-white/90 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex flex-col items-center justify-center text-center shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] ${className}`}
    >
      <span className="font-semibold tracking-wide text-lg sm:text-xl md:text-2xl lg:text-3xl leading-none">
        {title}
      </span>
      {subtitle && (
        <span className="mt-1 text-sm sm:text-base md:text-lg lg:text-xl leading-none">
          {subtitle}
        </span>
      )}
    </div>
  );
}
