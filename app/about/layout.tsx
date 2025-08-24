import AboutTabs from "@/components/About/Tabs";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Tabs visible only on /about/* */}
      <AboutTabs />
      <main>{children}</main>
    </>
  );
}
