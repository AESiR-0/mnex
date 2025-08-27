"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ContactSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSlider({ isOpen, onClose }: ContactSliderProps) {
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
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  const regions = [
    "North America",
    "Europe",
    "Asia Pacific",
    "Latin America",
    "Middle East & Africa"
  ];

  const categories = [
    "General Inquiry",
    "Product Information",
    "Technical Support",
    "Sales Inquiry",
    "Partnership",
    "Other"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-end"
          onClick={handleBackdropClick}
        >
          {/* Blurred background overlay */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20"
          />

          {/* Contact form slider */}
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
            className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-[#1789FF] mb-1">
                  GENERAL INQUIRY
                </p>
                <h2 className="text-2xl font-bold text-[#595959]">
                  Let's talk.
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#1789FF] text-white hover:bg-[#1789FF]/90 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-120px)]">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Company and Position */}
              <div>
                <label className="block text-sm font-medium text-[#595959] mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#595959] mb-2">
                  Position Title
                </label>
                <input
                  type="text"
                  name="positionTitle"
                  value={formData.positionTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent"
                  placeholder="Enter position title"
                />
              </div>

              {/* Contact fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    Region
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent appearance-none cursor-pointer"
                  >
                    <option value="">Select region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#595959] mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent appearance-none cursor-pointer"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#595959] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#009B80] outline-none transition-colors bg-transparent resize-none"
                  placeholder="Help us help you - please add details about your inquiry."
                />
              </div>

              {/* Consent */}
              <div className="space-y-3">
                <p className="text-sm text-[#595959]">
                  To submit this form, you must consent to the terms below:
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
                    I consent to receive communications from Mnex and understand that I may revoke this consent at any time. I agree to the{" "}
                    <a href="/privacy" className="text-[#1789FF] hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms" className="text-[#1789FF] hover:underline">
                      Terms of Service
                    </a>.
                  </span>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-[#009B80] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#009B80]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.consent}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
