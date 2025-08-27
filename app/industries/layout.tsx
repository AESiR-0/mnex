import Tabs from "@/components/Tabs";

const tabs = [
  { name: "Consumer & Industrial", href: "/industries/cei" },
  { name: "Regulated", href: "/industries/regulated" },
  { name: "Oil & Gas", href: "/industries/oil-and-gas" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Tabs tabs={tabs} />
      <main>{children}</main>
    </>
  );
}
