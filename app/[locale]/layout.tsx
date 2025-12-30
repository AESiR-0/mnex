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
import type { Metadata } from 'next';
import { SanityLive } from '@/sanity/lib/live';
import VisualEditingWrapper from '@/components/VisualEditingWrapper';
import ErrorBoundary from '@/components/ErrorBoundary';
import { draftMode } from 'next/headers';

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"], // 400=Regular, 500=Medium, 600=Semibold, 700=Bold
});

const locales = ['en', 'zh'];

export const metadata: Metadata = {
  title: 'Mnex - Industrial Solutions',
  description: 'MNex provides innovative industrial solutions and services',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) notFound();
  
  // Check if draft mode is enabled (for visual editing in preview)
  // The Presentation Tool should enable draft mode automatically
  const draft = await draftMode();
  const isDraftMode = draft.isEnabled;
  
  const messages = await getMessages();

  return (
    <>
      {/* Set html lang attribute dynamically */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('lang', '${locale}');`,
        }}
      />
      <div className={`${instrumentSans.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <SanityLive />
          {/* Visual editing - always render, but only activates in draft mode */}
          {/* The VisualEditing component handles its own connection logic */}
          <ErrorBoundary fallback={null}>
            <VisualEditingWrapper />
          </ErrorBoundary>
          <GSAPCleanupProvider />
          <ContactSliderProvider />
          <VideoPreloader />
          <Navbar />
          <div className="relative">
            {children}
          </div>
          <SiteFooter />
        </NextIntlClientProvider>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
