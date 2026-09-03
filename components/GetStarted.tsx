"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const GetStarted = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const services = [
    "Contracting",
    "Testing",
    "Calibration",
    "Inspection",
    "Trading",
    "Hotel",
  ];

  const handleServiceSelect = (service: string) => {
    setFormData({ ...formData, service });
    setIsDropdownOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.service) {
      toast.error("Please select a service", {
        duration: 3000,
        style: {
          background: "#ef4444",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ef4444",
        },
      });
      setIsSubmitting(false);
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Sending your message...");

    try {
      // Map formData to match API expectations
      const apiData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        description: formData.service, // Service goes to description field
        message: formData.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        // Show success toast
        toast.success(
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          {
            duration: 5000,
            style: {
              background: "#10b981",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#10b981",
            },
          }
        );

        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });
      } else {
        // Show error toast
        toast.error(data.error || "Failed to send message. Please try again.", {
          duration: 4000,
          style: {
            background: "#ef4444",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ef4444",
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error toast
      toast.error("An error occurred. Please try again later.", {
        duration: 4000,
        style: {
          background: "#ef4444",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ef4444",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
            maxWidth: "500px",
          },
        }}
      />

      <div className="relative w-full min-h-[676px] overflow-hidden px-4 md:px-8 lg:px-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/getStart.png')",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-stone-900/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 py-16 flex flex-col lg:flex-row justify-between items-start ">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 px-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-[-0.4px]">
              Ready To Get Started? Contact Us Today!
            </h2>
            <p className="text-xl md:text-2xl font-medium text-white mb-12 text-justify">
              Eager to kick off your next construction project? Reach out to us
              today! Our team is ready to assist you with all your needs and
              ensure a smooth process from start to finish.
            </p>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-full bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center">
                  <Mail className="w-5 h-5 text-stone-900" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-medium text-white">Email</h4>
                  <a
                    href="mailto:info@majokaengineering.com"
                    className="text-base font-medium text-white hover:underline"
                  >
                    info@majokaengineering.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-full bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center">
                  <Phone className="w-5 h-5 text-stone-900" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-medium text-white">Phone</h4>
                  <a
                    href="tel:+9660503010184"
                    className="text-base font-medium text-white hover:underline"
                  >
                    +966-0503010184
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-full bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-stone-900" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-medium text-white">Office</h4>
                  <p className="text-base font-medium text-white">
                    Mecca, Saudi Arabia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="w-full lg:w-5/12 bg-white/10 rounded-[20px] p-12 lg:p-15 border border-gray-400">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
              <div className="flex flex-col space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full h-[50px] px-4 py-3 bg-transparent border border-[#e9f5fb] rounded-xl text-[#e9f5fb] text-lg font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-gray-200 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                      formData.fullName || focusedField === "fullName"
                        ? "-translate-y-1/2 text-xs text-white bg-white/10 rounded backdrop-blur-sm"
                        : "translate-y-3 text-lg text-[#e9f5fb] bg-transparent"
                    }`}
                  >
                    Name
                  </label>
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full h-[50px] px-4 py-3 bg-transparent border border-[#e9f5fb] rounded-xl text-[#e9f5fb] text-lg font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-gray-200 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                      formData.phone || focusedField === "phone"
                        ? "-translate-y-1/2 text-xs text-white bg-white/10 backdrop-blur-sm rounded"
                        : "translate-y-3 text-lg text-[#e9f5fb] bg-transparent"
                    }`}
                  >
                    Phone Number
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full h-[50px] px-4 py-3 bg-transparent border border-[#e9f5fb] rounded-xl text-[#e9f5fb] text-lg font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-gray-200 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                      formData.email || focusedField === "email"
                        ? "-translate-y-1/2 text-xs text-white bg-white/10 backdrop-blur-sm rounded"
                        : "translate-y-3 text-lg text-[#e9f5fb] bg-transparent"
                    }`}
                  >
                    Email Address
                  </label>
                </div>

                {/* Services Dropdown */}
                <div className="relative">
                  <div
                    className={`w-full h-[50px] border border-[#e9f5fb] rounded-xl px-4 py-4 flex items-center justify-between ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() =>
                      !isSubmitting && setIsDropdownOpen(!isDropdownOpen)
                    }
                  >
                    <span className="text-[#e9f5fb] text-lg">
                      {formData.service || "Select Service"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#e9f5fb] transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && !isSubmitting && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/90 backdrop-blur-md border border-gray-300 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 text-gray-800 hover:bg-gray-100/50 cursor-pointer transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                          onClick={() => handleServiceSelect(service)}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="relative">
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className="w-full h-[50px] px-4 py-3 bg-transparent border border-[#e9f5fb] rounded-xl text-[#e9f5fb] text-lg font-normal font-['Anek_Malayalam'] focus:outline-none focus:border-gray-200 transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label
                    className={`absolute left-3 top-0 px-1 transition-all duration-200 pointer-events-none font-['Anek_Malayalam'] ${
                      formData.message || focusedField === "message"
                        ? "-translate-y-1/2 text-xs text-white bg-white/10 backdrop-blur-sm rounded"
                        : "translate-y-3 text-lg text-[#e9f5fb] bg-transparent"
                    }`}
                  >
                    Message
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-[50px] bg-primary hover:bg-primary/70 text-white font-bold text-xl rounded-full flex items-center justify-center shadow transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Contact Us"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
