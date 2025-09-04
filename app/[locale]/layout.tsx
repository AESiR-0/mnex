import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/Footer";
import VideoPreloader from "@/components/VideoPreloader";
import GSAPCleanupProvider from "@/components/GSAPCleanupProvider";
import ContactSlider from "@/components/ContactSlider";
import ContactSliderProvider from "@/components/ContactSliderProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"], // 400=Regular, 500=Medium, 600=Semibold, 700=Bold
});

const locales = ['en', 'zh'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`overflow-x-hidden ${instrumentSans.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <GSAPCleanupProvider />
          <ContactSliderProvider />
          <VideoPreloader />
          <Navbar />
          <div className="relative">
            {children}
          </div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
