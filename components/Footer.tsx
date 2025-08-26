"use client";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#eaeaea]    border-t border-[#E0E0E0]">
      {/* top teal rule */}
      <div className="h-[2px] w-full bg-[#009B80]" />

      <div className="max-w-[82rem] mx-auto px-10  py-20 space-y-12">
        {/* Row 1: logo left, links right */}
        <div className="flex flex-col md:flex-row justify-between items-start  gap-20">
          {/* Logo */}
          <Link href="/" className="block w-[128px]">
            <Image
              src="/static/Logo/Logo_PNG/MNex_v2-11.png"
              alt="MNEX"
              width={128}
              height={128}
              className="h-auto w-auto"
            />
          </Link>

          <div className="w-full md:w-auto">
            <p className="text-xs tracking-[0.18em] uppercase text-[#7A7A7A] mb-6">
              Sitemap
            </p>
            {/* Left: Sustainability | Middle: About/Solutions/Industries | Right: Culture/Contact */}
            <div className="grid grid-cols-2 text-2xl  gap-x-20 gap-y-8">
              {/* Right stack (the “on the right” column) */}
              <ul className="space-y-6 md:order-none order-3">
                <li>
                  <Link
                    href="/about"
                    className="font-semibold text-[#595959] hover:text-[#1789FF] transition"
                  >
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions"
                    className="font-semibold text-[#595959] hover:text-[#1789FF] transition"
                  >
                    SOLUTIONS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industries"
                    className="font-semibold text-[#595959] hover:text-[#1789FF] transition"
                  >
                    INDUSTRIES
                  </Link>
                </li>
              </ul>

              {/* Far right */}
              <ul className="space-y-6">
                <li>
                  <Link
                    href="/sustainability"
                    className=" font-semibold text-[#595959] hover:text-[#1789FF] transition"
                  >
                    SUSTAINABILITY
                  </Link>
                </li>
                <li>
                  <Link
                    href="/culture"
                    className=" font-semibold text-[#595959] hover:text-[#1789FF] transition"
                  >
                    CULTURE
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className=" font-semibold text-[#595959] hover:text-[#1789FF] transition"
                  >
                    CONTACT US
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Row 2: tagline left, contact right */}
        <div className="flex flex-col md:flex-row justify-start max-md:gap-[3rem]  gap-[31.5rem] ">
          {/* Tagline */}
          <h3 className="text-xl  md:text-2xl font-medium text-[#595959]">
            Shaping Precision,
            <br />
            Engineering What Matters.
          </h3>
          <div>
            <p className="uppercase text-xs tracking-widest text-[#7A7A7A] ">
              Contact Us
            </p>
            <a
              href="mailto:info@mnexprecision.com"
              className="text-base md:text-lg font-semibold text-[#595959] hover:text-[#1789FF] transition"
            >
              info@mnexprecision.com
            </a>
          </div>
        </div>

        {/* Row 3: back to top left, copyright & links right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t border-[#E0E0E0] max-md:pt-0  pt-6">
          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-[#595959] hover:text-[#1789FF] transition"
          >
            Back to Top
          </button>

          {/* Legal */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-[#595959]">
            <p>Copyright © {new Date().getFullYear()} Mnex Precision</p>
            <div className="flex gap-6">
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
    </footer>
  );
}
