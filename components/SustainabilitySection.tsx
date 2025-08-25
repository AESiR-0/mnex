// components/SustainabilitySection.tsx
export default function SustainabilitySection() {
  return (
    <section className="w-full h-[100svh] bg-[#009B80] text-white flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Left copy */}
        <div className="max-w-2xl">
          <p className="text-xl tracking-widest uppercase mb-6 opacity-90">
            Sustainability
          </p>

          <h2 className="text-3xl leading-[1] md:text-4xl md:leading-[1.25] font-semibold mb-10">
            Built to Perform.
            <br />
            Designed to Waste Less.
          </h2>

          <p className="text-lg md:text-2xl leading-snug mb-6 opacity-95">
            We believe good manufacturing is also responsible manufacturing.
          </p>
          <p className="text-lg md:text-2xl leading-snug mb-10 opacity-95">
            At Mnex, we reduce waste, save energy, and build smarter-because
            it's better for business and the planet.
          </p>

          <a
            href="/sustainability"
            className=" uppercase inline-block text-sm md:text-md tracking-wider font-medium underline underline-offset-4 decoration-white/70 hover:decoration-white transition"
          >
            Learn more
          </a>
        </div>

        {/* Right badges */}
        <div className="justify-self-start md:justify-self-end w-full max-w-[640px]">
          <div className="grid grid-cols-3 gap-x-8 gap-y-10">
            {/* Row 1 */}
            <Badge title="ISO" subtitle="14001" className="h-32" />
            <Badge title="ISO" subtitle="9001" className="h-32" />
            <div /> {/* spacer to mimic layout */}
            {/* Row 2 */}
            <Badge title="RoHS" className="h-28" />
            <Badge title="REACH" className="h-28" />
            <Badge title="Prop65" className="h-28" />
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
      className={`rounded-[24px] border-2 border-white/90 px-8 flex flex-col items-center justify-center text-center shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] ${className}`}
    >
      <span className="font-semibold tracking-wide text-2xl md:text-3xl leading-none">
        {title}
      </span>
      {subtitle && (
        <span className="mt-1 text-base md:text-xl leading-none">
          {subtitle}
        </span>
      )}
    </div>
  );
}
