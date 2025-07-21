'use client'
import Image from "next/image";
import { useState } from "react";

const tabData = [
  {
    title: "Tooling",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    desc: "High-precision tooling for every need.",
  },
  {
    title: "CNC",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "Advanced CNC machining for complex parts.",
  },
  {
    title: "EDM",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
    desc: "Precision EDM for intricate geometries.",
  },
  {
    title: "Automation",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    desc: "Smart automation for manufacturing efficiency.",
  },
];

const approachContent = [
  {
    title: "We Build What Matters",
    desc: "Tooling, molding, automation, secondary processes, and assembly—all under one roof. Faster cycles. Tighter control. Seamless delivery.",
  },
  {
    title: "Business-Aligned Manufacturing",
    desc: "We align our manufacturing processes with your business goals for maximum impact.",
  },
  {
    title: "Scalable and Specialized",
    desc: "Our solutions scale with your needs and are tailored for specialized requirements.",
  },
  {
    title: "Vertically integrated for Speed",
    desc: "Integrated processes mean faster cycles and seamless delivery.",
  },
  {
    title: "Precision by Design",
    desc: "Every product is engineered for accuracy and reliability from the start.",
  },
  {
    title: "Innovation with Purpose",
    desc: "We innovate with a clear focus on solving real-world challenges.",
  },
  {
    title: "Execution Obsessed",
    desc: "Our team is dedicated to flawless execution at every stage.",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeApproach, setActiveApproach] = useState(0);
  const approachButtons = [
    "Business-Aligned Manufacturing",
    "Scalable and Specialized",
    "Vertically integrated for Speed",
    "Precision by Design",
    "Innovation with Purpose",
    "Execution Obsessed",
  ];
  return (
    <main className="bg-[#F5F5F5] min-h-screen flex flex-col">
      {/* 1. Hero Image Section (full width) */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Factory machinery"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* 2. Centered Headline Section */}
      <section className="w-full min-h-[20vh] flex items-center">
        <div className="px-30 mx-auto w-full flex items-center justify-start">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#1789FF] text-left">
            Shaping Precision,<br />Engineering what matters
          </h1>
        </div>
      </section>

      {/* 3. Two-column Approach Section */}
      <section className="w-full min-h-[75vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-around gap-40  items-center px-4">
          <div className="w-1/2 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-[#595959] mb-2 uppercase tracking-widest">Our Approach</h2>
            <div className="text-4xl font-semibold text-[#595959] mb-2">{approachContent[activeApproach]?.title}</div>
            <div className="text-[#009B80] text-xl mb-4">{approachContent[activeApproach]?.desc}</div>
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            {approachButtons.map((item, i) => (
              <button
                key={item}
                onClick={() => setActiveApproach(i)}
                className={`text-left px-0 py-2 text-3xl font-medium transition-colors duration-200 ${activeApproach === i ? "text-[#009B80] font-bold" : "text-[#595959]"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Case Study Section with Background (full width) */}
      <section className="relative w-full  h-[80vh] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
          alt="Machinery in action"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute flex flex-col gap-4 text-xl justify-center  h-[80vh] pl-30 bottom-0  max-w-xl z-10 bg-gradient-to-r from-black/80 to-transparent rounded-tr-2xl rounded-br-2xl">
          <div className="text-lg text-[#A8D3FF] uppercase mb-2">Case Study</div>
          <div className="text-4xl font-semibold mb-2 text-white">Speed Without Compromise</div>
          <div className="text-[#A8D3FF] mb-2">Delivering results at the intersection of speed and precision.</div>
          <div className="text-white mb-4">Our advanced manufacturing process enables rapid prototyping and delivery without sacrificing quality or accuracy.</div>
          <button className="mt-4 px-6 py-2 border border-white rounded-full text-white bg-transparent hover:bg-white/10 transition">Know more</button>
        </div>
      </section>

      {/* 5. Solutions Section */}
      <section className="w-full  justify-center  flex items-center">
        <div className="max-w-7xl  w-full flex justify-center  gap-0 ">
          <div className=" text-[#1789FF] w-full   flex flex-col justify-center p-8 md:rounded-l-2xl min-h-[300px]">
            <h2 className="text-xs font-semibold text-[#595959]  uppercase tracking-widest mb-2">Solutions</h2>
            <div className="text-2xl md:text-3xl font-semibold mb-2">We don’t sell capabilities.<br />We build the right one for you.</div>
          </div>
          <div className="bg-[#F5F5F5] text-[#595959]  flex flex-col justify-center p-8 md:rounded-r-2xl min-h-[300px]">
            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</p>
          </div>
        </div>
      </section>

      {/* 6. Manufacturing Capabilities Section */}
      <section className="w-full min-h-screen flex items-center bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#595959]">Our Manufacturing Capabilities</h2>
          <div className="flex border rounded-lg overflow-hidden mb-6">
            {tabData.map((tab, idx) => (
              <button
                key={tab.title}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === idx ? "bg-[#1789FF] text-white" : "bg-[#F5F5F5] text-[#595959]"} border-r last:border-r-0 border-[#D1D1D1]`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="relative w-full h-[70vh] my-20 rounded-xl overflow-hidden">
            <Image
              src={tabData[activeTab].img}
              alt={tabData[activeTab].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="absolute left-0 top-0 h-full flex flex-col justify-center p-10 z-10">
              <div className="text-white text-2xl md:text-3xl font-semibold mb-2">{tabData[activeTab].title}</div>
              <div className="text-[#A8D3FF] mb-4 max-w-md">{tabData[activeTab].desc}</div>
              <div className="flex gap-4 mt-2">
                <div className="rounded-full bg-white/10 border border-white px-6 py-3 text-white text-center text-lg font-semibold whitespace-pre">30+  patents</div>
                <div className="rounded-full bg-white/10 border border-white px-6 py-3 text-white text-center text-lg font-semibold">CNC</div>
                <div className="rounded-full bg-white/10 border border-white px-6 py-3 text-white text-center text-lg font-semibold">EDM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Sustainability Section */}
      <section className="w-full min-h-[75vh] flex items-center bg-[#009B80] text-white">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex-1 max-w-xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-2">Sustainability</h2>
            <div className="text-2xl md:text-3xl font-semibold mb-2">Built to Perform,<br />Designed to Waste Less.</div>
            <p className="mb-2">We believe good manufacturing is also responsible manufacturing.</p>
            <p className="mb-4">At MNex, we reduce waste, save energy, and build smarter—because it’s better for business and the planet.</p>
            <button className="mt-2 px-6 py-2 border border-white rounded-full text-white bg-transparent hover:bg-white/10 transition">Learn More</button>
          </div>
          <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4">
            {["XX%\nPATENTS", "ISO\n9001", "EDM", "30+ PATENTS", "CNC", "EDM"].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/10 border border-white flex items-center justify-center text-center text-lg font-semibold min-h-[80px] whitespace-pre-line">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#F5F5F5] border-t border-[#D1D1D1] mt-auto">
        <div className="max-w-7xl mx-auto w-full px-4 py-10 flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Image src="/static/Logo/Logo_PNG/MNex_v2-11.png" width={48} height={48} alt="MNex Logo" />
              <span className="font-bold text-lg">MNEX</span>
            </div>
            <span className="text-[#595959] text-sm">Precision Engineering for the Future</span>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[#595959] mb-1">Quick Links</span>
            <a href="/about" className="hover:text-[#1789FF] transition">About Us</a>
            <a href="/solution" className="hover:text-[#1789FF] transition">Solutions</a>
            <a href="/industries" className="hover:text-[#1789FF] transition">Industries</a>
            <a href="/contact" className="hover:text-[#1789FF] transition">Contact</a>
          </div>
          {/* Contact / Social */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-[#595959] mb-1">Contact</span>
            <a href="mailto:info@mnex.com" className="hover:text-[#1789FF] transition">info@mnex.com</a>
            <span className="text-[#595959] text-sm">+1 (555) 123-4567</span>
            <div className="flex gap-3 mt-2">
              <a href="#" aria-label="LinkedIn" className="hover:text-[#1789FF] transition">LinkedIn</a>
              <a href="#" aria-label="Twitter" className="hover:text-[#1789FF] transition">Twitter</a>
            </div>
          </div>
        </div>
        <div className="w-full text-center text-xs text-[#A0A0A0] py-4 border-t border-[#E0E0E0]">
          &copy; {new Date().getFullYear()} MNEX. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
