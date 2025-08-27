"use client";
import { useContactSlider } from "@/lib/useContactSlider";

export default function ContactButton() {
  const { open } = useContactSlider();

  return (
    <button
      onClick={open}
      className="bg-white text-[#009B80] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
    >
      Get Started
    </button>
  );
}
