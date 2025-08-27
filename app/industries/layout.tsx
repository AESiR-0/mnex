import Tabs from "@/components/Tabs";

const tabs = [
  { name: "Consumer & Industrial", href: "/industries/cei" },
  { name: "Medical", href: "/industries/medical" },
  { name: "Oil & Gas", href: "/industries/oil-gas" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Tabs tabs={tabs} />
      <section className="w-full bg-[#f5f5f5] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#595959] mb-4">
            Where proof lives.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#595959]/80 leading-relaxed">
            At Mnex, we start with your product, scale, and market risks -  then
            shape a complete solution around it.
          </p>
        </div>
      </section>

      <main>{children}</main>
    </>
  );
}
