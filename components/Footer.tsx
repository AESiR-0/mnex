"use client";
import { useContactSlider } from "@/lib/useContactSlider";
import Image from "next/image";
import LocalizedLink from "./LocalizedLink";
import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import TranslatableText from "./TranslatableText";

export default function SiteFooter() {
  const { open } = useContactSlider();
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before checking pathname to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hide footer on ebizcard/cindy page (only after mount to avoid hydration mismatch)
  if (isMounted && pathname.includes('ebizcard/cindy')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#eaeaea]">
      {/* top teal rule */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main footer content - two columns */}
        <div className="flex flex-col md:flex-row lg:justify-between gap-8 md:gap-0">

          {/* Left Column: Logo, Tagline, Back to Top */}
          <div className="flex flex-col w-full md:w-1/2  justify-between gap-6 md:gap-0">
            {/* Logo */}
            <div className="min-h-32 sm:min-h-40 md:min-h-48 w-full">
              <LocalizedLink href="/" className="block pb-5 w-20 sm:w-24 lg:w-32">
                <Image
                  src="/static/Logo/Logo_SVG/MNex_v2-11.svg"
                  alt="MNex Logo"
                  className="h-5 w-32"
                  width={160}
                  height={160}
                />
              </LocalizedLink>
              <p className="text-sm xl:text-md text-[#595959] pb-2 sm:pb-3">
                <b><TranslatableText translationKey="Footer.singapore.name" /></b> <br />
                <TranslatableText translationKey="Footer.singapore.address1" /> <br />
                <TranslatableText translationKey="Footer.singapore.address2" />
                {t("Footer.singapore.address3") && (
                  <>
                    <br />
                    <TranslatableText translationKey="Footer.singapore.address3" />
                  </>
                )}
              </p>
              <h5 className="text-sm xl:text-md text-[#1789FF] pb-1 sm:pb-2">
                <TranslatableText translationKey="Footer.ourFacilities" />
              </h5>
              <p className="text-sm xl:text-md text-[#595959] pb-2 sm:pb-3">
                <b><TranslatableText translationKey="Footer.china.name" /></b> <br />
                <TranslatableText translationKey="Footer.china.address1" /><br />
                <TranslatableText translationKey="Footer.china.address2" />
                {t("Footer.china.address3") && (
                  <>
                    <br />
                    <TranslatableText translationKey="Footer.china.address3" />
                  </>
                )}
              </p>
              <p className="text-sm xl:text-md text-[#595959] pb-3 sm:pb-5">
                <b><TranslatableText translationKey="Footer.malaysia.name" /></b> <br />
                <TranslatableText translationKey="Footer.malaysia.address1" /> <br />
                <TranslatableText translationKey="Footer.malaysia.address2" /> <br />
                <TranslatableText translationKey="Footer.malaysia.address3" />
              </p>
            </div>

            {/* Tagline */}
            <h3 className="text-md sm:text-lg lg:text-xl xl:text-2xl font-medium max-md:font-semibold  text-[#595959]">
              <TranslatableText translationKey="Home.hero.line1" />
              <br />
              <TranslatableText translationKey="Home.hero.line2" />
            </h3>

            {/* Back to Top */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-xs sm:text-sm text-[#595959] hover:text-[#1789FF] transition self-start"
            >
<TranslatableText translationKey="Footer.backToTop" /> <span className="inline-block rotate-45 hover:rotate-0 transition-transform duration-300 align-middle"><svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></span>
            </button>
          </div>

          {/* Right Column: Sitemap, Contact, Legal */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">

            {/* Sitemap Section */}
            <div className="min-h-36 sm:min-h-56 md:min-h-64">
              <p className="text-xs tracking-wider font-bold uppercase text-[#7A7A7A] pb-3 sm:pb-5">
                <TranslatableText translationKey="Common.sitemap" />
              </p>
              <div className="grid grid-cols-2 text-base sm:text-lg gap-x-8 sm:gap-x-12 lg:gap-x-20 gap-y-4 sm:gap-y-6 lg:gap-y-8">
                {/* Left column */}
                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <li>
                    <LocalizedLink
                      href="/about"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      <TranslatableText translationKey="Navigation.about" className="uppercase" />
                    </LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink
                      href="/solutions"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      <TranslatableText translationKey="Navigation.solutions" className="uppercase" />
                    </LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink
                      href="/industries"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      <TranslatableText translationKey="Navigation.industries" className="uppercase" />
                    </LocalizedLink>
                  </li>
                </ul>

                {/* Right column */}
                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <li>
                    <LocalizedLink
                      href="/sustainability"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      {t("Navigation.sustainability").toUpperCase()}
                    </LocalizedLink>
                  </li>
                  <li>
                    <LocalizedLink
                      href="/culture"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      {t("Navigation.culture").toUpperCase()}
                    </LocalizedLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        open();
                      }}
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      {t("Navigation.contact").toUpperCase()}
                    </button>
                  </li>
                </ul>
                
              </div>
            </div>

            {/* Contact Section */}
            <div className="sm:mt-10">
              <p className="uppercase font-bold text-xs tracking-wider pb-1 max-md:pb-3  text-[#7A7A7A]">
                <TranslatableText translationKey="Navigation.contact" />
              </p>
              <Link
                href="mailto:connect@mnexprecision.com"
                className="text-sm lg:text-base xl:text-lg text-[#595959] hover:text-[#1789FF] transition"
              >
                connect@mnexprecision.com
              </Link>
            </div>

            {/* Legal Section */}
            <div className="pt-3 sm:pt-4 lg:pt-6">
              <div className="flex md:items-center gap-5 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-[#595959]">
                <p><TranslatableText translationKey="Footer.copyright" values={{ year: new Date().getFullYear() }} /></p>
                <div className="flex gap-3 sm:gap-4 lg:gap-6">
                  <LocalizedLink href="/privacy" className="hover:text-[#1789FF] transition">
                    <TranslatableText translationKey="Common.privacyPolicy" />
                  </LocalizedLink>
                  <LocalizedLink href="/terms" className="hover:text-[#1789FF] transition">
                    <TranslatableText translationKey="Common.termsOfUse" />
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
