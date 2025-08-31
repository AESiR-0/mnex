"use client";
import { useContactSlider } from "@/lib/useContactSlider";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  const { open } = useContactSlider();

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
              <Link href="/" className="block w-20 sm:w-24 lg:w-32">
                <Image
                  src="/static/Logo/Logo_PNG/MNex_v2-11.png"
                  alt="MNEX"
                  width={128}
                  height={128}
                  className="h-auto w-auto pb-5 sm:pb-5"
                />
              </Link>
              <p className="text-sm xl:text-md text-[#595959] pb-2 sm:pb-3">
                Mnex Singapore <br />
                8 Temasek Blvd, Suntec Tower 3 <br />
                #44-02, Singapore 038 988
              </p>
              <h5 className="text-sm xl:text-md text-[#1789FF] pb-1 sm:pb-2">
                Our Facilities
              </h5>
              <p className="text-sm xl:text-md text-[#595959] pb-2 sm:pb-3">
                Mnex China <br />
                No. 1 Zhi Hui Road, Banfu Town, Zhongshan <br />
                Guangdong, China 528 459
              </p>
              <p className="text-sm xl:text-md text-[#595959] pb-3 sm:pb-5">
                Mnex Malaysia <br />
                Unit 2 Jalan Seroja 2 
                Bandar Indahpura, 810 00, <br />
                Kulai, Johor, Malaysia
              </p>
            </div>

            {/* Tagline */}
            <h3 className="text-md sm:text-lg lg:text-xl xl:text-2xl font-medium max-md:font-semibold  text-[#595959]">
              Shaping Precision,
              <br />
              Engineering What Matters.
            </h3>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs sm:text-sm text-[#595959] hover:text-[#1789FF] transition self-start"
            >
              Back to Top <span className="inline-block rotate-45 hover:rotate-0 transition-transform duration-300 align-middle"><svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></span>
            </button>
          </div>

          {/* Right Column: Sitemap, Contact, Legal */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">

            {/* Sitemap Section */}
            <div className="min-h-36 sm:min-h-56 md:min-h-64">
              <p className="text-xs tracking-wider font-bold uppercase text-[#7A7A7A] pb-3 sm:pb-5">
                Sitemap
              </p>
              <div className="grid grid-cols-2 text-base sm:text-lg gap-x-8 sm:gap-x-12 lg:gap-x-20 gap-y-4 sm:gap-y-6 lg:gap-y-8">
                {/* Left column */}
                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <li>
                    <Link
                      href="/about"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/solutions"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      SOLUTIONS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/industries"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      INDUSTRIES
                    </Link>
                  </li>
                </ul>

                {/* Right column */}
                <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <li>
                    <Link
                      href="/sustainability"
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      SUSTAINABILITY
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        open();
                      }}
                      className="text-[#595959] hover:text-[#1789FF] transition"
                    >
                      CONTACT US
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <p className="uppercase font-bold text-xs tracking-wider pb-3 sm:pb-5 text-[#7A7A7A]">
                Contact Us
              </p>
              <a
                href="mailto:connect@mnexprecision.com"
                className="text-sm lg:text-base xl:text-lg text-[#595959] hover:text-[#1789FF] transition"
              >
                connect@mnexprecision.com
              </a>
            </div>

            {/* Legal Section */}
            <div className="pt-3 sm:pt-4 lg:pt-6">
              <div className="flex md:items-center gap-5 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-[#595959]">
                <p>Copyright © {new Date().getFullYear()} Mnex Precision</p>
                <div className="flex gap-3 sm:gap-4 lg:gap-6">
                  <Link href="/privacy" className="hover:text-[#1789FF] transition">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-[#1789FF] transition">
                    Terms of Use
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
