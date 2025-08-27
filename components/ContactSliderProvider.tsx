"use client";
import ContactSlider from "./ContactSlider";
import { useContactSlider } from "@/lib/useContactSlider";

export default function ContactSliderProvider() {
  const { isOpen, close } = useContactSlider();

  return <ContactSlider isOpen={isOpen} onClose={close} />;
}
