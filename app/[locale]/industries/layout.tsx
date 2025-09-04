import Tabs from "@/components/Tabs";

const tabs = [
  { nameKey: "Navigation.industriesSubmenu.cei", href: "/industries/cei" },
  { nameKey: "Navigation.industriesSubmenu.regulated", href: "/industries/regulated" },
  { nameKey: "Navigation.industriesSubmenu.oilAndGas", href: "/industries/oil-and-gas" },
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
