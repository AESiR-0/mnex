import Tabs from "@/components/Tabs";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Tabs />
      <main>{children}</main>
    </>
  );
}
