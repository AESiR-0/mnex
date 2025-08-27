// app/layout.tsx
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/Footer";
import VideoPreloader from "@/components/VideoPreloader";
import GSAPCleanupProvider from "@/components/GSAPCleanupProvider";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"], // 400=Regular, 500=Medium, 600=Semibold, 700=Bold
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden ${instrumentSans.variable} font-sans`}>
        <GSAPCleanupProvider />
        <VideoPreloader />
        <Navbar />
        <div className="relative">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
