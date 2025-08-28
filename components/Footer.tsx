"use client";
import { useContactSlider } from "@/lib/useContactSlider";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  const { open } = useContactSlider();

  return (
    <footer className="w-full bg-[#eaeaea]">
      {/* top teal rule */}

      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        {/* Main footer content - two columns */}
        <div className="flex flex-col md:flex-row gap-12 lg:justify-between  ">

          {/* Left Column: Logo, Tagline, Back to Top */}
          <div className="flex flex-col justify-between gap-8 ">
            {/* Logo */}
            <Link href="/" className="block w-24 min-h-48 lg:w-32">
              <Image
                src="/static/Logo/Logo_PNG/MNex_v2-11.png"
                alt="MNEX"
                width={128}
                height={128}
                className="h-auto w-auto pb-10"
              />
            </Link>

            {/* Tagline */}
            <h3 className="text-lg lg:text-xl xl:text-2xl font-medium text-[#595959]">
              Shaping Precision,
              <br />
              Engineering What Matters.
            </h3>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-[#595959] hover:text-[#1789FF] transition self-start"
            >
              Back to Top <span className="inline-block rotate-45 hover:rotate-0 transition-transform duration-300 align-middle"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></span>
            </button>
          </div>

          {/* Right Column: Sitemap, Contact, Legal */}
          <div className=" flex flex-col gap-8 lg:gap-12">

            {/* Sitemap Section */}
            <div className="min-h-48">
              <p className="text-xs tracking-wider font-bold uppercase text-[#7A7A7A] pb-10 ">
                Sitemap
              </p>
              <div className="grid grid-cols-2 text-lg  gap-x-12 lg:gap-x-20 gap-y-6 lg:gap-y-8">
                {/* Left column */}
                <ul className="space-y-4 lg:space-y-6">
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
                <ul className="space-y-4 lg:space-y-6">
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
              <p className="uppercase font-bold text-xs tracking-wider pb-5 text-[#7A7A7A]">
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
            <div className=" pt-4 lg:pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-3 lg:gap-4 text-sm text-[#595959]">
                <p>Copyright © {new Date().getFullYear()} Mnex Precision</p>
                <div className="flex gap-4 lg:gap-6">
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
