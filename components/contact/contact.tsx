"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Mic,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import { InputValidationTick, isValidEmail, isValidPhone, isValidText } from "@/components/ui/InputValidationTick";

interface FormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  message: string;
}

interface ContactCard {
  id: number;
  icon: React.ElementType;
  title: string;
  items?: { text: string; link?: string; isAlert?: boolean; isTeal?: boolean }[];
  content?: string;
  link?: string;
}

export default function ContactPage() {
  const { isArabic } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [listeningField, setListeningField] = useState<keyof FormData | null>(null);
  const recognitionRef = useRef<any>(null);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const toggleListening = (fieldName: keyof FormData) => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        isArabic
          ? "خاصية الإدخال الصوتي غير مدعومة في متصفحك. يرجى استخدام متصفح Chrome أو Edge أو Safari."
          : "Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.",
        { duration: 4000 }
      );
      return;
    }

    // If currently listening to this exact field, stop it
    if (listeningField === fieldName) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setListeningField(null);
      return;
    }

    // Stop any existing recognition instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // ignore
      }
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isArabic ? "ar-AE" : "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setListeningField(fieldName);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || "";
        if (!transcript) return;

        let formattedText = transcript.trim();

        if (fieldName === "email") {
          formattedText = formattedText
            .toLowerCase()
            // Handle spoken "at the rate of", "at the rate", "at rate", "@therate"
            .replace(/\s*(?:at\s+the\s+rate\s+(?:of\s+)?|at\s+the\s+rate|at\s+rate|@\s*the\s*rate\s*(?:of\s*)?|@\s*the\s*rate|@\s*rate|@therate)\s*/gi, "@")
            .replace(/\s+at\s+/gi, "@")
            // Handle spoken Arabic "@"
            .replace(/\s*(?:آت|ات|علامة\s+آت)\s*/g, "@")
            // Handle spoken "dot" / "point" / "period"
            .replace(/\s*(?:dot|point|نقطة|دوت)\s*/gi, ".")
            // Handle spoken "underscore"
            .replace(/\s*(?:underscore|اندرسكور|شرطة\s*سفلية)\s*/gi, "_")
            // Handle spoken "dash" / "hyphen"
            .replace(/\s*(?:dash|hyphen)\s*/gi, "-")
            // Cleanup any accidental remaining "@therate" or "@the rate"
            .replace(/@(?:the\s*rate\s*(?:of\s*)?|rate\s*)/gi, "@")
            // Remove all spaces
            .replace(/\s+/g, "")
            // Ensure single @
            .replace(/@+/g, "@")
            // Ensure single dots
            .replace(/\.+/g, ".")
            // Trim trailing dot
            .replace(/\.+$/, "");
        } else if (fieldName === "phone") {
          formattedText = formattedText.replace(/[^\d+\s-]/g, "").trim();
        }

        setFormData((prev) => {
          let finalText = formattedText;
          if (fieldName === "message" && prev.message.trim()) {
            finalText = `${prev.message.trim()} ${formattedText}`;
          }
          return {
            ...prev,
            [fieldName]: finalText,
          };
        });

        setErrors((prev) => ({
          ...prev,
          [fieldName]: validateField(fieldName, formattedText),
        }));

        toast.success(
          isArabic ? "تم إدخال الصوت بنجاح!" : "Voice input captured!",
          {
            duration: 2500,
            iconTheme: { primary: "#01a9a0", secondary: "#fff" },
          }
        );
      };

      recognition.onerror = (event: any) => {
        setListeningField(null);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          toast.error(
            isArabic
              ? "يرجى السماح بالوصول إلى الميكروفون في إعدادات المتصفح."
              : "Please allow microphone access in your browser settings.",
            { duration: 4000 }
          );
        } else if (event.error !== "aborted" && event.error !== "no-speech") {
          toast.error(
            isArabic
              ? "تعذر التعرف على الصوت. يرجى المحاولة مجدداً."
              : "Speech recognition failed. Please try again.",
            { duration: 3000 }
          );
        }
      };

      recognition.onend = () => {
        setListeningField(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setListeningField(null);
    }
  };

  const contactInfo: ContactCard[] = [
    {
      id: 1,
      icon: Phone,
      title: "Phone",
      items: [
        { text: "+971 55 617 3300" },
        { text: "+971 52 749 2002" },
      ],
    },
    {
      id: 2,
      icon: Mail,
      title: "Email",
      items: [
        { text: "info@tajalrahmah.com", isTeal: true },
        { text: "tajalrahmah@gmail.com" },
      ],
    },
    {
      id: 3,
      icon: MapPin,
      title: "Location",
      items: [
        {
          text: "Office G-01-691, Al Khabaisi, Dubai, 00000 Dubai",
        },
      ],
    },
    {
      id: 4,
      icon: Clock,
      title: "Office Hours",
      items: [
        { text: "Mon - Sat: 9:00 AM - 6:00 PM" },
        { text: "Sunday - Closed", isAlert: true },
      ],
    },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "fullName":
        return !value.trim() ? "Your name is incomplete." : "";
      case "phone": {
        const trimmed = value.trim();
        if (!trimmed) return "Your phone number is incomplete.";
        if (!isValidPhone(trimmed)) return "Your phone number is invalid.";
        return "";
      }
      case "email": {
        const trimmed = value.trim();
        if (!trimmed) return "Your email address is incomplete.";
        if (!isValidEmail(trimmed)) return "Your email address is invalid.";
        return "";
      }
      case "message":
        return !value.trim() ? "Your message is incomplete." : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      fullName: validateField("fullName", formData.fullName),
      phone: validateField("phone", formData.phone),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          company: formData.companyName,
          phone: formData.phone,
          email: formData.email,
          message: formData.companyName
            ? `Company: ${formData.companyName}\n${formData.message}`
            : formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          {
            duration: 5000,
            style: {
              background: "#01a9a0",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#01a9a0",
            },
          }
        );
        // Reset form
        setFormData({
          fullName: "",
          companyName: "",
          phone: "",
          email: "",
          message: "",
        });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        toast.error(data.error || "Failed to send message. Please try again.", {
          duration: 5000,
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
      toast.error("An error occurred. Please try again later.", {
        duration: 5000,
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

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Page Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold theme-text-main mb-4">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Side - Contact Info Cards */}
          <motion.div
            className="flex flex-col justify-between gap-6 order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;

              return (
                <motion.div
                  key={info.id}
                  className="group flex-1"
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="bg-white rounded-xl shadow p-6 md:p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:bg-[#01a9a0] transition-colors duration-300"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-7 h-7 text-[#01a9a0] group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-bold theme-text-main">
                        {info.title}
                      </h3>
                    </div>

                    {/* Content (Static, non-clickable) */}
                    <div className="flex-1 flex flex-col justify-center gap-1 select-text">
                      {info.items ? (
                        info.items.map((item, idx) => (
                          <p
                            key={idx}
                            className={`text-lg sm:text-xl font-bold leading-relaxed cursor-default select-text ${
                              item.isTeal ? "text-[#01a9a0]" : "text-gray-700"
                            }`}
                          >
                            {item.text}
                          </p>
                        ))
                      ) : (
                        <p className="text-lg sm:text-xl font-bold text-gray-700 leading-relaxed cursor-default select-text">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="bg-white rounded-xl shadow p-6 sm:p-8 lg:p-10 order-1 lg:order-2 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={formVariants}
          >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col h-full">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-bold theme-text-main mb-6">
                Send us a Message
              </h2>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className={`mb-5 p-4 rounded-lg flex items-start gap-3 ${submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-medium leading-relaxed">
                      {submitStatus.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Fields Container */}
              <div className="space-y-5 flex-1">
                {/* Name Field */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("fullName")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      disabled={isSubmitting}
                      className={`w-full px-5 ${isArabic ? "pl-20 pr-5" : "pr-20 pl-5"} py-3.5 bg-white rounded-full border text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                        listeningField === "fullName"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.fullName
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      className={`absolute ${isArabic ? "right-5" : "left-5"} bg-white px-1 transition-all duration-200 pointer-events-none ${
                        errors.fullName
                          ? "-top-2.5 text-[11px] font-semibold text-red-500"
                          : formData.fullName || focusedField === "fullName" || listeningField === "fullName"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      {isArabic ? "الاسم" : "Name"}
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                      <InputValidationTick isValid={isValidText(formData.fullName) && !errors.fullName} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                      {(focusedField === "fullName" || listeningField === "fullName") && (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => toggleListening("fullName")}
                          disabled={isSubmitting}
                          title={listeningField === "fullName" ? (isArabic ? "جارٍ الاستماع... انقر للإيقاف" : "Listening... Click to stop") : (isArabic ? "انقر للتحدث بالاسم" : "Click to speak your name")}
                          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer animate-in fade-in zoom-in-75 duration-150 ${
                            listeningField === "fullName"
                              ? "bg-red-500 text-white shadow-md shadow-red-500/30 scale-105"
                              : "text-stone-400 hover:text-[#01a9a0] hover:bg-[#01a9a0]/10 active:scale-95"
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {listeningField === "fullName" && (
                            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75 pointer-events-none" />
                          )}
                          <Mic className={`w-4 h-4 relative z-10 ${listeningField === "fullName" ? "animate-pulse" : ""}`} />
                        </button>
                      )}
                    </div>
                  </div>
                  {listeningField === "fullName" && (
                    <p className="text-xs text-[#01a9a0] mt-1.5 px-4 font-medium animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-ping" />
                      <span>{isArabic ? "جارٍ الاستماع... اذكر اسمك الآن" : "Listening... speak your name now"}</span>
                    </p>
                  )}
                  {errors.fullName && !listeningField && (
                    <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Company Name Field (Optional) */}
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("companyName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder=" "
                    disabled={isSubmitting}
                    className={`w-full px-5 ${isArabic ? "pl-20 pr-5" : "pr-20 pl-5"} py-3.5 bg-white rounded-full border text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      listeningField === "companyName"
                        ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                        : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                    }`}
                  />
                  <label
                    className={`absolute ${isArabic ? "right-5" : "left-5"} bg-white px-1 transition-all duration-200 pointer-events-none ${
                      formData.companyName || focusedField === "companyName" || listeningField === "companyName"
                        ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                        : "top-3.5 text-sm text-stone-400"
                    }`}
                  >
                    {isArabic ? "اسم الشركة (اختياري)" : "Company Name (Optional)"}
                  </label>
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                    <InputValidationTick isValid={isValidText(formData.companyName)} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                    {(focusedField === "companyName" || listeningField === "companyName") && (
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => toggleListening("companyName")}
                        disabled={isSubmitting}
                        title={listeningField === "companyName" ? (isArabic ? "جارٍ الاستماع... انقر للإيقاف" : "Listening... Click to stop") : (isArabic ? "انقر للتحدث باسم الشركة" : "Click to speak company name")}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer animate-in fade-in zoom-in-75 duration-150 ${
                          listeningField === "companyName"
                            ? "bg-red-500 text-white shadow-md shadow-red-500/30 scale-105"
                            : "text-stone-400 hover:text-[#01a9a0] hover:bg-[#01a9a0]/10 active:scale-95"
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {listeningField === "companyName" && (
                          <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75 pointer-events-none" />
                        )}
                        <Mic className={`w-4 h-4 relative z-10 ${listeningField === "companyName" ? "animate-pulse" : ""}`} />
                      </button>
                    )}
                  </div>
                  {listeningField === "companyName" && (
                    <p className="text-xs text-[#01a9a0] mt-1.5 px-4 font-medium animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-ping" />
                      <span>{isArabic ? "جارٍ الاستماع... اذكر اسم الشركة" : "Listening... speak company name"}</span>
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      disabled={isSubmitting}
                      className={`w-full px-5 ${isArabic ? "pl-20 pr-5" : "pr-20 pl-5"} py-3.5 bg-white rounded-full border text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                        listeningField === "phone"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.phone
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      className={`absolute ${isArabic ? "right-5" : "left-5"} bg-white px-1 transition-all duration-200 pointer-events-none ${
                        errors.phone
                          ? "-top-2.5 text-[11px] font-semibold text-red-500"
                          : formData.phone || focusedField === "phone" || listeningField === "phone"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      {isArabic ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                      <InputValidationTick isValid={isValidPhone(formData.phone) && !errors.phone} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                      {(focusedField === "phone" || listeningField === "phone") && (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => toggleListening("phone")}
                          disabled={isSubmitting}
                          title={listeningField === "phone" ? (isArabic ? "جارٍ الاستماع... انقر للإيقاف" : "Listening... Click to stop") : (isArabic ? "انقر للتحدث برقم الهاتف" : "Click to speak phone number")}
                          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer animate-in fade-in zoom-in-75 duration-150 ${
                            listeningField === "phone"
                              ? "bg-red-500 text-white shadow-md shadow-red-500/30 scale-105"
                              : "text-stone-400 hover:text-[#01a9a0] hover:bg-[#01a9a0]/10 active:scale-95"
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {listeningField === "phone" && (
                            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75 pointer-events-none" />
                          )}
                          <Mic className={`w-4 h-4 relative z-10 ${listeningField === "phone" ? "animate-pulse" : ""}`} />
                        </button>
                      )}
                    </div>
                  </div>
                  {listeningField === "phone" && (
                    <p className="text-xs text-[#01a9a0] mt-1.5 px-4 font-medium animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-ping" />
                      <span>{isArabic ? "جارٍ الاستماع... اذكر رقم الهاتف الآن" : "Listening... speak phone number now"}</span>
                    </p>
                  )}
                  {errors.phone && !listeningField && (
                    <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      disabled={isSubmitting}
                      className={`w-full px-5 ${isArabic ? "pl-20 pr-5" : "pr-20 pl-5"} py-3.5 bg-white rounded-full border text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                        listeningField === "email"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.email
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      className={`absolute ${isArabic ? "right-5" : "left-5"} bg-white px-1 transition-all duration-200 pointer-events-none ${
                        errors.email
                          ? "-top-2.5 text-[11px] font-semibold text-red-500"
                          : formData.email || focusedField === "email" || listeningField === "email"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                      <InputValidationTick isValid={isValidEmail(formData.email) && !errors.email} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                      {(focusedField === "email" || listeningField === "email") && (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => toggleListening("email")}
                          disabled={isSubmitting}
                          title={listeningField === "email" ? (isArabic ? "جارٍ الاستماع... انقر للإيقاف" : "Listening... Click to stop") : (isArabic ? "انقر للتحدث بالبريد الإلكتروني" : "Click to speak your email")}
                          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer animate-in fade-in zoom-in-75 duration-150 ${
                            listeningField === "email"
                              ? "bg-red-500 text-white shadow-md shadow-red-500/30 scale-105"
                              : "text-stone-400 hover:text-[#01a9a0] hover:bg-[#01a9a0]/10 active:scale-95"
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {listeningField === "email" && (
                            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75 pointer-events-none" />
                          )}
                          <Mic className={`w-4 h-4 relative z-10 ${listeningField === "email" ? "animate-pulse" : ""}`} />
                        </button>
                      )}
                    </div>
                  </div>
                  {listeningField === "email" && (
                    <p className="text-xs text-[#01a9a0] mt-1.5 px-4 font-medium animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-ping" />
                      <span>{isArabic ? "جارٍ الاستماع... اذكر بريدك الإلكتروني" : "Listening... speak your email"}</span>
                    </p>
                  )}
                  {errors.email && !listeningField && (
                    <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="flex-1">
                  <div className="relative h-full">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder=" "
                      disabled={isSubmitting}
                      className={`w-full h-full min-h-[120px] px-5 ${isArabic ? "pl-20 pr-5" : "pr-20 pl-5"} py-3.5 bg-white rounded-2xl border text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all resize-none peer placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                        listeningField === "message"
                          ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                          : errors.message
                          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                          : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                      }`}
                    />
                    <label
                      className={`absolute ${isArabic ? "right-5" : "left-5"} bg-white px-1 transition-all duration-200 pointer-events-none ${
                        errors.message
                          ? "-top-2.5 text-[11px] font-semibold text-red-500"
                          : formData.message || focusedField === "message" || listeningField === "message"
                          ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                          : "top-3.5 text-sm text-stone-400"
                      }`}
                    >
                      {isArabic ? "الرسالة" : "Message"}
                    </label>
                    <div className={`absolute top-3 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                      <InputValidationTick isValid={isValidText(formData.message) && !errors.message} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                      {(focusedField === "message" || listeningField === "message") && (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => toggleListening("message")}
                          disabled={isSubmitting}
                          title={listeningField === "message" ? (isArabic ? "جارٍ الاستماع... انقر للإيقاف" : "Listening... Click to stop") : (isArabic ? "انقر للتحدث بالرسالة" : "Click to speak your message")}
                          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer animate-in fade-in zoom-in-75 duration-150 ${
                            listeningField === "message"
                              ? "bg-red-500 text-white shadow-md shadow-red-500/30 scale-105"
                              : "text-stone-400 hover:text-[#01a9a0] hover:bg-[#01a9a0]/10 active:scale-95"
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {listeningField === "message" && (
                            <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75 pointer-events-none" />
                          )}
                          <Mic className={`w-4 h-4 relative z-10 ${listeningField === "message" ? "animate-pulse" : ""}`} />
                        </button>
                      )}
                    </div>
                  </div>
                  {listeningField === "message" && (
                    <p className="text-xs text-[#01a9a0] mt-1.5 px-4 font-medium animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-ping" />
                      <span>{isArabic ? "جارٍ الاستماع... تحدث لكتابة رسالتك" : "Listening... speak your message"}</span>
                    </p>
                  )}
                  {errors.message && !listeningField && (
                    <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 theme-bg-main rounded-full text-white text-xl font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-xl"
                    }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
