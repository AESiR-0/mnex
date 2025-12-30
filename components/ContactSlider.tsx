"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Header from "./Header";
import LocalizedLink from "./LocalizedLink";
import { useTranslations } from 'next-intl';
import TranslatableText from "./TranslatableText";

interface ContactSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSlider({ isOpen, onClose }: ContactSliderProps) {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    positionTitle: "",
    phone: "",
    email: "",
    region: "",
    category: "",
    message: "",
    consent: false
  });

  const sliderRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const regions = [
    t("ContactSlider.regions.northAmerica"),
    t("ContactSlider.regions.europe"),
    t("ContactSlider.regions.asiaPacific"),
    t("ContactSlider.regions.latinAmerica"),
    t("ContactSlider.regions.middleEastAfrica")
  ];

  const categories = [
    t("ContactSlider.categories.generalInquiry"),
    t("ContactSlider.categories.productInformation"),
    t("ContactSlider.categories.technicalSupport"),
    t("ContactSlider.categories.salesInquiry"),
    t("ContactSlider.categories.partnership"),
    t("ContactSlider.categories.other")
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-end"
        >
          {/* Background overlay */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 cursor-pointer"
            onClick={handleBackdropClick}
          />

          {/* Contact form container */}
          <motion.div
            ref={sliderRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.5
            }}
            className="relative w-full max-w-2xl h-full bg-white shadow-2xl overflow-hidden md:px-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 py-5 border-b border-gray-100">
              <div>
                <Header className="text-sm pb-5 font-medium mb-1">
                  {t("ContactSlider.title")}
                </Header>
                <h2 className="text-2xl font-bold text-[#1789FF]">
                  {t("ContactSlider.heading")}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#1789FF] text-white hover:bg-[#1789FF]/90 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Container */}
            <div className="flex-1 overflow-y-auto">
              {/* Form */}
              <form 
                id="contact-form" 
                onSubmit={handleSubmit} 
                className="p-6 space-y-6"
              >
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#595959] mb-2">
                      <TranslatableText translationKey="ContactSlider.firstName" />
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-all duration-300 bg-transparent hover:border-gray-300 focus:bg-gray-50/50 rounded-t-sm"
                      placeholder={t("ContactSlider.firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#595959] mb-2">
                      <TranslatableText translationKey="ContactSlider.lastName" />
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-all duration-300 bg-transparent hover:border-gray-300 focus:bg-gray-50/50 rounded-t-sm"
                      placeholder={t("ContactSlider.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    {t("ContactSlider.companyName")}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-all duration-300 bg-transparent hover:border-gray-300 focus:bg-gray-50/50 rounded-t-sm"
                    placeholder={t("ContactSlider.companyNamePlaceholder")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    <TranslatableText translationKey="ContactSlider.email" />
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-all duration-300 bg-transparent hover:border-gray-300 focus:bg-gray-50/50 rounded-t-sm"
                    placeholder={t("ContactSlider.emailPlaceholder")}
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    <TranslatableText translationKey="ContactSlider.region" />
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-all duration-300 bg-transparent hover:border-gray-300 focus:bg-gray-50/50 rounded-t-sm appearance-none cursor-pointer"
                  >
                    <option value=""><TranslatableText translationKey="ContactSlider.selectRegion" /></option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    <TranslatableText translationKey="ContactSlider.message" />
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-all duration-300 bg-transparent hover:border-gray-300 focus:bg-gray-50/50 rounded-t-sm resize-none"
                    placeholder={t("ContactSlider.messagePlaceholder")}
                  />
                </div>

                {/* Consent */}
                <div className="space-y-3">
                  <p className="text-sm text-[#595959]">
                    {t("ContactSlider.consentText")}
                  </p>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 text-[#009B80] border-gray-300 rounded focus:ring-[#009B80] focus:ring-2"
                    />
                    <span className="text-sm text-[#595959] leading-relaxed">
                      {t("ContactSlider.consentAgreement")}{" "}
                      <LocalizedLink href="/privacy" className="text-[#1789FF] hover:underline">
                        {t("Common.privacyPolicy")}
                      </LocalizedLink>{" "}
                      {t("ContactSlider.and")}{" "}
                      <LocalizedLink href="/terms" className="text-[#1789FF] hover:underline">
                        {t("ContactSlider.termsOfService")}
                      </LocalizedLink>.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#009B80] rounded-full text-white py-3 px-6 font-medium hover:bg-[#009B80]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formData.consent}
                  >
                    <TranslatableText translationKey="ContactSlider.sendMessage" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}