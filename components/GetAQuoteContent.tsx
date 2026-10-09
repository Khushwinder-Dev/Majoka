"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Trash2,
  Paperclip,
  Plus,
} from "lucide-react";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";
import { InputValidationTick, isValidEmail, isValidPhone, isValidText } from "@/components/ui/InputValidationTick";
import { useVoiceInput, VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";
import CommonHeader from "@/components/Common/CommonHeader";

interface QuoteFaqItem {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const PROJECT_TYPE_OPTIONS: SearchableSelectOption[] = [
  { value: "Combo Waterproofing", label: "Combo Waterproofing", labelAr: "عزل الأسطح والمباني (Combo Waterproofing)" },
  { value: "Sub-Structure Waterproofing", label: "Sub-Structure Waterproofing", labelAr: "عزل الأساسات والهياكل تحت الأرض" },
  { value: "Wet Area Waterproofing", label: "Wet Area Waterproofing", labelAr: "عزل المناطق الرطبة (حمامات ومطابخ)" },
  { value: "Thermal & Sound Insulation", label: "Thermal & Sound Insulation", labelAr: "العزل الحراري والصوتي" },
  { value: "Industrial Flooring & Coating", label: "Industrial Flooring & Coating", labelAr: "أرضيات الإيبوكسي والطلاء الصناعي" },
  { value: "Concrete Repair & Injection", label: "Concrete Repair & Injection", labelAr: "إصلاح الخرسانة وحقن الشروخ" },
  { value: "Expansion Joint Treatment", label: "Expansion Joint Treatment", labelAr: "معالجة فواصل التمدد" },
  { value: "Other Specialist Services", label: "Other Specialist Services", labelAr: "خدمات فنية متخصصة أخرى" },
];

const QUOTE_FAQS: QuoteFaqItem[] = [
  {
    id: 1,
    questionEn: "Why is the 'UAE PASS' the best way to update my Emirates ID?",
    questionAr: "لماذا يعتبر 'UAE PASS' أفضل طريقة لتحديث بطاقة الهوية الإماراتية؟",
    answerEn:
      "UAE PASS provides secure, instant digital identity verification across all UAE government entities and certified technical contracting services, eliminating manual paperwork and physical verification visits.",
    answerAr:
      "يوفر تطبيق الهوية الرقمية (UAE PASS) تحققاً فورياً وآمناً من الهوية عبر جميع الجهات الحكومية والخدمات الفنية المعتمدة في الدولة، مما يغني تماماً عن المعاملات الورقية والزيارات الميدانية.",
  },
  {
    id: 2,
    questionEn: "Will I be charged for accessing UAE PASS app?",
    questionAr: "هل يتم فرض أي رسوم على الوصول أو استخدام تطبيق UAE PASS؟",
    answerEn:
      "No, accessing and utilizing the official UAE PASS application and verification services is completely free of charge for all UAE citizens and residents.",
    answerAr:
      "لا، تحميل واستخدام تطبيق الهوية الرقمية الرسمي UAE PASS مجاني تماماً دون أي رسوم لجميع المواطنين والمقيمين في دولة الإمارات.",
  },
  {
    id: 3,
    questionEn: "What are the other ways of updating my Emirates ID?",
    questionAr: "ما هي الطرق الأخرى لتحديث بيانات الهوية الإماراتية؟",
    answerEn:
      "You can also update your Emirates ID information through the Federal Authority for Identity and Citizenship (ICP) online portal, Customer Happiness Centers, or authorized typing and Amer offices across the UAE.",
    answerAr:
      "يمكنك أيضاً تحديث بيانات الهوية الإماراتية من خلال البوابة الإلكترونية للهيئة الاتحادية للهوية والجنسية (ICP) أو مراكز سعادة المتعاملين ومكاتب الطباعة ومراكز آمر المعتمدة.",
  },
  {
    id: 4,
    questionEn: "Why can't I select all my numbers for the update?",
    questionAr: "لماذا لا يمكنني اختيار جميع أرقامي للتحديث في آن واحد؟",
    answerEn:
      "Regulatory telecom standards mandate distinct authentication for each registered subscriber line to maintain strict account security and prevent unauthorized account modifications.",
    answerAr:
      "تتطلب المعايير التنظيمية لقطاع الاتصالات مصادقة مستقلة لكل خط اتصال مسجل لضمان الحماية التامة للحساب ومنع التعديلات غير المصرح بها.",
  },
  {
    id: 5,
    questionEn: "If my number registered with a passport or GCC national ID, can I update my ID online?",
    questionAr: "إذا كان رقمي مسجلاً بجواز سفر أو بطاقة هوية خليجية، هل يمكنني التحديث عبر الإنترنت؟",
    answerEn:
      "Yes, you can conveniently initiate the verification online by uploading your valid passport or GCC national ID alongside your updated Emirates ID credentials via secure portal submission.",
    answerAr:
      "نعم، يمكنك البدء بالتحديث الإلكتروني بكل سهولة من خلال إرفاق صورة جواز السفر أو الهوية الوطنية الخليجية السارية مع بيانات الهوية الإماراتية المحدثة.",
  },
];

export default function GetAQuoteContent() {
  const { isArabic } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    companyName: "",
    projectType: "",
    projectLocation: "",
    projectDetails: "",
    agreed: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { listeningField, toggleListening, setFocusedField, isFieldActive } = useVoiceInput({
    isArabic,
    onResult: (fieldName, text) => {
      setFormData((prev) => {
        let finalText = text;
        if (fieldName === "projectDetails" && prev.projectDetails.trim()) {
          finalText = `${prev.projectDetails.trim()} ${text}`;
        }
        return { ...prev, [fieldName]: finalText };
      });
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
  });

  const ALLOWED_EXTS = [
    ".pdf", ".jpg", ".jpeg", ".png", ".webp",
    ".doc", ".docx", ".xls", ".xlsx",
    ".dwg", ".dxf", ".zip"
  ];
  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB per file

  // FAQ Accordion State (first item uncollapsed by default)
  const [openFaqIds, setOpenFaqIds] = useState<number[]>([QUOTE_FAQS[0]?.id ?? 1]);

  const toggleFaq = (id: number) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "fullName":
        return !value.trim()
          ? isArabic
            ? "الاسم الكامل غير مكتمل."
            : "Your name is incomplete."
          : "";
      case "phoneNumber": {
        const trimmed = value.trim();
        if (!trimmed)
          return isArabic
            ? "رقم الهاتف غير مكتمل."
            : "Your phone number is incomplete.";
        if (!isValidPhone(trimmed))
          return isArabic
            ? "رقم الهاتف غير صالح."
            : "Your phone number is invalid.";
        return "";
      }
      case "emailAddress": {
        const trimmed = value.trim();
        if (!trimmed)
          return isArabic
            ? "البريد الإلكتروني غير مكتمل."
            : "Your email address is incomplete.";
        if (!isValidEmail(trimmed))
          return isArabic
            ? "البريد الإلكتروني غير صالح."
            : "Your email address is invalid.";
        return "";
      }
      case "projectType":
        return !value.trim()
          ? isArabic
            ? "يرجى اختيار نوع الخدمة."
            : "Your project type is incomplete."
          : "";
      case "projectLocation":
        return !value.trim()
          ? isArabic
            ? "موقع المشروع غير مكتمل."
            : "Your project location is incomplete."
          : "";
      case "projectDetails":
        return !value.trim()
          ? isArabic
            ? "تفاصيل المشروع غير مكتملة."
            : "Your project details are incomplete."
          : "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    }
  };

  const addFiles = (incomingFiles: File[]) => {
    const valid: File[] = [];
    for (const file of incomingFiles) {
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!ALLOWED_EXTS.includes(ext)) {
        toast.error(
          isArabic
            ? `الملف ${file.name} غير مدعوم. يرجى إرفاق ملفات PDF، Word، Excel، CAD أو صور.`
            : `File "${file.name}" is not supported. Please upload PDF, Word, Excel, CAD drawings, or images.`
        );
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          isArabic
            ? `حجم الملف ${file.name} كبير جداً (الحد الأقصى 15 ميجابايت).`
            : `File "${file.name}" exceeds the 15MB size limit.`
        );
        continue;
      }
      // Prevent duplicates
      if (!files.some((f) => f.name === file.name && f.size === file.size)) {
        valid.push(file);
      }
    }

    if (valid.length > 0) {
      setFiles((prev) => [...prev, ...valid]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
    if (e.target) e.target.value = "";
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      fullName: validateField("fullName", formData.fullName),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
      emailAddress: validateField("emailAddress", formData.emailAddress),
      projectType: validateField("projectType", formData.projectType),
      projectLocation: validateField("projectLocation", formData.projectLocation),
      projectDetails: validateField("projectDetails", formData.projectDetails),
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    if (!formData.agreed) {
      toast.error(
        isArabic
          ? "يرجى الموافقة على شروط التواصل لمتابعة الطلب."
          : "Please agree to be contacted regarding your inquiry."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("formType", "7_Get_A_Quote");
      submitData.append("fullName", formData.fullName);
      submitData.append("emailAddress", formData.emailAddress);
      submitData.append("email", formData.emailAddress);
      submitData.append("phoneNumber", formData.phoneNumber);
      submitData.append("phone", formData.phoneNumber);
      submitData.append("companyName", formData.companyName || "");
      submitData.append("company", formData.companyName || "");
      submitData.append("projectType", formData.projectType);
      submitData.append("projectLocation", formData.projectLocation);
      submitData.append("service", `Quote Request: ${formData.projectType || "General"} (${formData.projectLocation || "UAE"})`);
      submitData.append("message", formData.projectDetails);
      submitData.append("projectDetails", formData.projectDetails);

      // Attach all uploaded drawings and files
      for (const file of files) {
        submitData.append("files", file);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body: submitData,
      });

      if (res.ok) {
        toast.success(
          isArabic
            ? "شكراً لك! تم استلام طلب عرض السعر بنجاح. سيتواصل معك خبراؤنا قريباً."
            : "Thank you! Your quote request has been submitted successfully. Our engineers will get back to you shortly.",
          {
            duration: 6000,
            style: { background: "#01a9a0", color: "#fff", padding: "16px", borderRadius: "10px" },
          }
        );
        setFormData({
          fullName: "",
          phoneNumber: "",
          emailAddress: "",
          companyName: "",
          projectType: "",
          projectLocation: "",
          projectDetails: "",
          agreed: false,
        });
        setFiles([]);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(
          data.error ||
          (isArabic ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى." : "Submission failed. Please try again.")
        );
      }
    } catch {
      toast.error(
        isArabic ? "خطأ في الاتصال. يرجى المحاولة لاحقاً." : "Connection error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (GET A QUOTE)
      ══════════════════════════════════════════════════════════════ */}
      <CommonHeader
        imagePath="/banners/new/getAqoute.png"
        showHeading={false}
        showBreadcrumb={false}
        unoptimized
      />

      {/* ══════════════════════════════════════════════════════════════
          2. MAIN SECTION: TERRACE BACKGROUND + FLOATING FORM CARD
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[920px] lg:min-h-[1020px] py-12 sm:py-16 lg:py-20 overflow-hidden flex items-center">

        {/* Full Terrace Building Background Image spanning the entire section with clean full visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/get-a-quote/terrace-building.png"
            alt="Modern Terrace Architecture"
            fill
            priority
            unoptimized
            className="object-cover object-bottom"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* ── LEFT COLUMN: Text + 3 Badges sitting over top-left ── */}
            <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-4">

              {/* Tagline */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-[#01a9a0]" />
                <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#01a9a0] uppercase">
                  {isArabic ? "طلب عرض سعر" : "GET A QUOTE"}
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B1C24] leading-[1.18] tracking-tight mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                {isArabic ? (
                  <>
                    مشروعك يبدأ <br />
                    <span className="text-[#01a9a0]">بمحادثة معنا</span>
                  </>
                ) : (
                  <>
                    Your Project <br />
                    Starts with <br />
                    <span className="text-[#01a9a0]">a Conversation</span>
                  </>
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-stone-700 text-xs sm:text-sm font-medium leading-relaxed mb-8 max-w-md drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                {isArabic
                  ? "سواء كان مشروعاً جديداً أو صيانة أو معالجة، فريقنا الهندسي جاهز لتقديم حلول العزل المتكاملة الأنسب لاحتياجاتك. شاركنا التفاصيل واحصل على عرض سعر مخصص."
                  : "Whether it's a new project, repair, or maintenance, our team is here to provide the right waterproofing solution for your needs. Share your details and get a tailored quote."}
              </p>

              {/* 3 Feature Badges in a Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-white/70 backdrop-blur-xs p-3 sm:p-4 rounded-2xl w-fit border border-white/80 shadow-xs">
                {/* 1. Reliable Solutions */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border border-[#01a9a0]/40 bg-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Image
                      src="/get-a-quote/new/sdfdsf.svg"
                      alt="Reliable Solutions"
                      width={22}
                      height={22}
                      className="w-[22px] h-[22px]"
                    />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-stone-900 leading-tight">
                      {isArabic ? "حلول موثوقة" : "Reliable"}
                    </h4>
                    <span className="text-[11px] text-stone-600 font-medium">
                      {isArabic ? "وضمانات معتمدة" : "Solutions"}
                    </span>
                  </div>
                </div>

                {/* 2. Expert Support */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border border-[#01a9a0]/40 bg-white flex items-center justify-center text-[#01a9a0] flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="10" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-stone-900 leading-tight">
                      {isArabic ? "دعم هندسي" : "Expert"}
                    </h4>
                    <span className="text-[11px] text-stone-600 font-medium">
                      {isArabic ? "واستشارات متخصصة" : "Support"}
                    </span>
                  </div>
                </div>

                {/* 3. Fast Response */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full border border-[#01a9a0]/40 bg-white flex items-center justify-center text-[#01a9a0] flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 15" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-stone-900 leading-tight">
                      {isArabic ? "استجابة سريعة" : "Fast"}
                    </h4>
                    <span className="text-[11px] text-stone-600 font-medium">
                      {isArabic ? "خلال 24 ساعة" : "Response"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: Floating White Card "Tell Us About Your Project" ── */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.14)] border border-stone-200/90">

                {/* Card Tagline */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-[2px] bg-[#01a9a0]" />
                  <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#01a9a0] uppercase">
                    {isArabic ? "طلب عرض سعر" : "REQUEST A QUOTE"}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C24] tracking-tight mb-2">
                  {isArabic ? "أخبرنا عن مشروعك" : "Tell Us About Your Project"}
                </h3>

                {/* Card Subtitle */}
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-7">
                  {isArabic
                    ? "املأ البيانات أدناه وسيتواصل معك خبراؤنا لتقديم أفضل الحلول وعرض سعر منافس."
                    : "Fill in the details below and our experts will get back to you with the best solution and a competitive quote."}
                </p>

                {/* Form matching website input field standard */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">

                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <div className="relative">
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField("fullName")}
                            onBlur={() => setFocusedField(null)}
                            placeholder=" "
                            dir={isArabic ? "rtl" : "ltr"}
                            className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all placeholder-transparent ${
                              isArabic ? "pl-20 text-right" : "pr-20 text-left"
                            } ${
                              listeningField === "fullName"
                                ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                                : errors.fullName
                                ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                                : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                            }`}
                          />
                          <label
                            className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                              isArabic ? "right-5" : "left-5"
                            } ${
                              errors.fullName
                                ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                                : formData.fullName || isFieldActive("fullName")
                                ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                                : "top-1/2 -translate-y-1/2 text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                            }`}
                          >
                            {isArabic ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                          </label>
                          <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                            <InputValidationTick isValid={isValidText(formData.fullName) && !errors.fullName} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                            {isFieldActive("fullName") && (
                              <VoiceMicButton
                                isListening={listeningField === "fullName"}
                                onClick={() => toggleListening("fullName", "text")}
                                isArabic={isArabic}
                              />
                            )}
                          </div>
                        </div>
                        {listeningField === "fullName" && (
                          <VoiceListeningBadge isArabic={isArabic} />
                        )}
                        {errors.fullName && !listeningField && (
                          <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField("phoneNumber")}
                            onBlur={() => setFocusedField(null)}
                            placeholder=" "
                            dir={isArabic ? "rtl" : "ltr"}
                            className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all placeholder-transparent ${
                              isArabic ? "pl-20 text-right" : "pr-20 text-left"
                            } ${
                              listeningField === "phoneNumber"
                                ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                                : errors.phoneNumber
                                ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                                : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                            }`}
                          />
                          <label
                            className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                              isArabic ? "right-5" : "left-5"
                            } ${
                              errors.phoneNumber
                                ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                                : formData.phoneNumber || isFieldActive("phoneNumber")
                                ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                                : "top-1/2 -translate-y-1/2 text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                            }`}
                          >
                            {isArabic ? "رقم الهاتف" : "Phone Number"} <span className="text-red-500">*</span>
                          </label>
                          <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                            <InputValidationTick isValid={isValidPhone(formData.phoneNumber) && !errors.phoneNumber} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                            {isFieldActive("phoneNumber") && (
                              <VoiceMicButton
                                isListening={listeningField === "phoneNumber"}
                                onClick={() => toggleListening("phoneNumber", "phone")}
                                isArabic={isArabic}
                              />
                            )}
                          </div>
                        </div>
                        {listeningField === "phoneNumber" && (
                          <VoiceListeningBadge isArabic={isArabic} />
                        )}
                        {errors.phoneNumber && !listeningField && (
                          <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>
                  </div>

                  {/* Row 2: Email Address & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address */}
                      <div>
                        <div className="relative">
                          <input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField("emailAddress")}
                            onBlur={() => setFocusedField(null)}
                            placeholder=" "
                            dir={isArabic ? "rtl" : "ltr"}
                            className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all placeholder-transparent ${
                              isArabic ? "pl-20 text-right" : "pr-20 text-left"
                            } ${
                              listeningField === "emailAddress"
                                ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                                : errors.emailAddress
                                ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                                : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                            }`}
                          />
                          <label
                            className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                              isArabic ? "right-5" : "left-5"
                            } ${
                              errors.emailAddress
                                ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                                : formData.emailAddress || isFieldActive("emailAddress")
                                ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                                : "top-1/2 -translate-y-1/2 text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                            }`}
                          >
                            {isArabic ? "البريد الإلكتروني" : "Email Address"} <span className="text-red-500">*</span>
                          </label>
                          <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                            <InputValidationTick isValid={isValidEmail(formData.emailAddress) && !errors.emailAddress} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                            {isFieldActive("emailAddress") && (
                              <VoiceMicButton
                                isListening={listeningField === "emailAddress"}
                                onClick={() => toggleListening("emailAddress", "email")}
                                isArabic={isArabic}
                              />
                            )}
                          </div>
                        </div>
                        {listeningField === "emailAddress" && (
                          <VoiceListeningBadge isArabic={isArabic} />
                        )}
                        {errors.emailAddress && !listeningField && (
                          <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                            {errors.emailAddress}
                          </p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="relative">
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("companyName")}
                          onBlur={() => setFocusedField(null)}
                          placeholder=" "
                          dir={isArabic ? "rtl" : "ltr"}
                          className={`peer w-full bg-white border border-stone-300 rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20 transition-all placeholder-transparent ${
                            isArabic ? "pl-20 text-right" : "pr-20 text-left"
                          } ${
                            listeningField === "companyName" ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25" : ""
                          }`}
                        />
                        <label
                          className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none text-stone-400 ${
                            isArabic ? "right-5" : "left-5"
                          } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0] ${
                            formData.companyName || isFieldActive("companyName") ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]" : ""
                          }`}
                        >
                          {isArabic ? "اسم الشركة (اختياري)" : "Company Name (Optional)"}
                        </label>
                        <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                          <InputValidationTick isValid={isValidText(formData.companyName)} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                          {isFieldActive("companyName") && (
                            <VoiceMicButton
                              isListening={listeningField === "companyName"}
                              onClick={() => toggleListening("companyName", "text")}
                              isArabic={isArabic}
                            />
                          )}
                        </div>
                      </div>
                  </div>

                  {/* Row 3: Project Type & Project Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Type Dropdown */}
                    <SearchableSelect
                      name="projectType"
                      value={formData.projectType}
                      options={PROJECT_TYPE_OPTIONS}
                      label={isArabic ? "نوع المشروع / الخدمة" : "Project Type"}
                      placeholder=""
                      required
                      isArabic={isArabic}
                      error={errors.projectType}
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, projectType: val }));
                        if (errors.projectType) {
                          setErrors((prev) => ({ ...prev, projectType: val ? "" : (isArabic ? "يرجى اختيار نوع الخدمة." : "Your project type is incomplete.") }));
                        }
                      }}
                    />

                    {/* Project Location */}
                    <div>
                      <div className="relative">
                        <input
                          type="text"
                          name="projectLocation"
                          value={formData.projectLocation}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("projectLocation")}
                          onBlur={() => setFocusedField(null)}
                          placeholder=" "
                          dir={isArabic ? "rtl" : "ltr"}
                          className={`peer w-full bg-white border rounded-full px-5 pt-5 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all placeholder-transparent ${
                            isArabic ? "pl-20 text-right" : "pr-20 text-left"
                          } ${
                            listeningField === "projectLocation"
                              ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                              : errors.projectLocation
                              ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                              : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                          }`}
                        />
                        <label
                          className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                            isArabic ? "right-5" : "left-5"
                          } ${
                            errors.projectLocation
                              ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-red-500"
                              : formData.projectLocation || isFieldActive("projectLocation")
                              ? "-top-2.5 translate-y-0 text-[11px] font-semibold text-[#01a9a0]"
                              : "top-1/2 -translate-y-1/2 text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                          }`}
                        >
                          {isArabic ? "موقع المشروع" : "Project Location"} <span className="text-red-500">*</span>
                        </label>
                        <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-3" : "right-3"} flex items-center gap-1.5 z-10`}>
                          <InputValidationTick isValid={isValidText(formData.projectLocation) && !errors.projectLocation} isArabic={isArabic} className="!static !translate-y-0 !left-auto !right-auto" />
                          {isFieldActive("projectLocation") && (
                            <VoiceMicButton
                              isListening={listeningField === "projectLocation"}
                              onClick={() => toggleListening("projectLocation", "text")}
                              isArabic={isArabic}
                            />
                          )}
                        </div>
                      </div>
                      {listeningField === "projectLocation" && (
                        <VoiceListeningBadge isArabic={isArabic} />
                      )}
                      {errors.projectLocation && !listeningField && (
                        <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                          {errors.projectLocation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Details (Textarea matching website standard) */}
                  <div>
                    <div className="relative">
                      <textarea
                        rows={4}
                        name="projectDetails"
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("projectDetails")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        dir={isArabic ? "rtl" : "ltr"}
                        className={`peer w-full bg-white border rounded-2xl px-5 pt-6 pb-2 text-stone-800 text-sm sm:text-[15px] focus:outline-none transition-all resize-none placeholder-transparent ${
                          isArabic ? "pl-14 text-right" : "pr-14 text-left"
                        } ${
                          listeningField === "projectDetails"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.projectDetails
                            ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
                            : "border-stone-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-5" : "left-5"
                        } ${
                          errors.projectDetails
                            ? "-top-2.5 text-[11px] font-semibold text-red-500"
                            : formData.projectDetails || isFieldActive("projectDetails")
                            ? "-top-2.5 text-[11px] font-semibold text-[#01a9a0]"
                            : "top-4 text-sm text-stone-400 peer-focus:-top-2.5 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "تفاصيل المشروع ونطاق العمل" : "Project Details"} <span className="text-red-500">*</span>
                      </label>
                      <div className={`absolute top-4 ${isArabic ? "left-3" : "right-3"} z-10`}>
                        {isFieldActive("projectDetails") && (
                          <VoiceMicButton
                            isListening={listeningField === "projectDetails"}
                            onClick={() => toggleListening("projectDetails", "textarea")}
                            isArabic={isArabic}
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "projectDetails" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    {errors.projectDetails && !listeningField && (
                      <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
                        {errors.projectDetails}
                      </p>
                    )}
                  </div>

                  {/* File Upload Zone */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5 text-[#01a9a0]" />
                        <span>{isArabic ? "إرفاق المخططات وجداول الكميات (BOQ)" : "Upload Drawings & BOQ"}</span>
                        <span className="text-stone-400 text-[11px] font-normal">
                          ({isArabic ? "اختياري" : "Optional"})
                        </span>
                      </label>
                      {files.length > 0 && (
                        <span className="text-[11px] font-semibold text-[#01a9a0]">
                          {files.length} {isArabic ? "ملفات مرفقة" : "files attached"}
                        </span>
                      )}
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`w-full border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center transition-all cursor-pointer group ${
                        isDragging
                          ? "border-[#01a9a0] bg-[#e6f7f5] ring-2 ring-[#01a9a0]/25"
                          : "border-stone-200 hover:border-[#01a9a0] bg-[#fafcfc] hover:bg-[#f2faf8]"
                      }`}
                    >
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-stone-100 group-hover:bg-[#e0fbf6] flex items-center justify-center text-stone-500 group-hover:text-[#01a9a0] transition-colors shadow-2xs">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-stone-700">
                        {isArabic ? "اسحب وأفلت الملفات هنا أو " : "Drag & drop files here or "}
                        <span className="text-[#01a9a0] underline font-bold">{isArabic ? "تصفح من جهازك" : "browse files"}</span>
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        {isArabic
                          ? "يدعم PDF, CAD (DWG), Excel (BOQ), Word, صور حتى 15MB لكل ملف"
                          : "Supports PDF, CAD (DWG), Excel (BOQ), Word, Images up to 15MB each"}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.zip"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    {/* Uploaded Files List */}
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, idx) => (
                          <div
                            key={`${file.name}-${idx}`}
                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-stone-200 shadow-2xs hover:border-[#01a9a0]/40 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-stone-800 truncate max-w-[220px] sm:max-w-sm">
                                  {file.name}
                                </p>
                                <p className="text-[10px] text-stone-400">
                                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(idx);
                              }}
                              className="w-7 h-7 rounded-full text-stone-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                              title={isArabic ? "حذف الملف" : "Remove file"}
                              aria-label="Remove file"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <div className="pt-1 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-semibold text-[#01a9a0] hover:text-[#008f84] flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{isArabic ? "إضافة المزيد من الملفات" : "Add more files"}</span>
                          </button>
                          <span className="text-[11px] text-stone-400">
                            {isArabic ? "إجمالي الحجم:" : "Total size:"}{" "}
                            {(files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agreed"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 mt-0.5 accent-[#01a9a0] rounded cursor-pointer"
                    />
                    <label htmlFor="agreed" className="text-xs text-stone-600 leading-snug cursor-pointer">
                      {isArabic ? (
                        <>أوافق على التواصل معي بخصوص هذا الطلب. <span className="text-red-500">*</span></>
                      ) : (
                        <>I agree to be contacted regarding my inquiry. <span className="text-red-500">*</span></>
                      )}
                    </label>
                  </div>

                  {/* Submit Button matching brand teal */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#01a9a0] hover:bg-[#00968e] active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3.5 sm:py-4 rounded-full shadow-lg shadow-[#01a9a0]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isArabic ? "جاري الإرسال..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{isArabic ? "طلب عرض السعر" : "Request a Quote"}</span>
                          {isArabic ? (
                            <ArrowLeft className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. SECTION: FREQUENTLY ASKED QUESTIONS (Matching Mockup)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-10 sm:py-20 lg:py-24 bg-[#f3fcf9] overflow-hidden">

        {/* Decorative Fluid Ribbons from user resources at bottom corners */}
        <div className="absolute left-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/get-a-quote/ribbon-bottom-left.png"
            alt=""
            width={500}
            height={330}
            className="w-[260px] sm:w-[380px] md:w-[480px] h-auto opacity-75"
          />
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0">
          <Image
            src="/get-a-quote/ribbon-bottom-right.png"
            alt=""
            width={550}
            height={330}
            className="w-[260px] sm:w-[380px] md:w-[500px] h-auto opacity-75"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-7 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-5 h-[1.5px] bg-[#01a9a0]" />
              <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#01a9a0] uppercase">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <span className="w-5 h-[1.5px] bg-[#01a9a0]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1C24] tracking-tight mb-2.5 sm:mb-3">
              {isArabic ? (
                <>
                  الأسئلة <span className="text-[#01a9a0]">الشائعة</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="text-[#01a9a0]">Questions</span>
                </>
              )}
            </h2>

            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              {isArabic
                ? "إجابات على الأسئلة الشائعة حول حلول العزل والمواد والتنفيذ. هل لا تزال بحاجة لمساعدة؟"
                : "Find answers to common questions about our industry solutions, materials, and services. Still need help?"}
            </p>
          </div>

          {/* 5 Accordion FAQ Cards */}
          <div className="space-y-2.5 sm:space-y-3.5">
            {QUOTE_FAQS.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                number={faq.id}
                question={isArabic ? faq.questionAr : faq.questionEn}
                answer={isArabic ? faq.answerAr : faq.answerEn}
                isOpen={openFaqIds.includes(faq.id)}
                onToggle={() => toggleFaq(faq.id)}
                isArabic={isArabic}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SECTION: TALK TO OUR EXPERTS BANNER (Matching Mockup)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 sm:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

          <div className="relative w-full rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl border border-stone-100 bg-[#082b35]">

            {/* Background Graphic: User's pristine Footer - BottomExpertsCalloutSection.png */}
            <div className="relative w-full min-h-[280px] sm:min-h-[280px] lg:min-h-[280px]">
              <Image
                src="/get-a-quote/experts-callout-bg.png"
                alt="Talk to Our Experts"
                fill
                priority
                unoptimized
                className="object-cover object-right md:object-center"
              />

              {/* Overlay with interactive content */}
              <div className="relative md:absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-8 md:py-0 z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                  {/* Left Column: Heading + Subtitle + Contact Button */}
                  <div className="md:col-span-5 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-[2px] bg-[#01a9a0]" />
                      <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#01a9a0] uppercase">
                        {isArabic ? "هل تحتاج مساعدة؟" : "NEED HELP?"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2 sm:mb-3">
                      {isArabic ? "تحدث إلى خبرائنا" : "Talk to Our Experts"}
                    </h3>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                      {isArabic
                        ? "هل لديك متطلبات أو مشروع خاص؟ فريقنا الهندسي جاهز لمساعدتك في اختيار الحل الأمثل."
                        : "Have a specific requirement? Our team is ready to assist you with the right solution."}
                    </p>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 active:scale-95 text-[#01a9a0] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-all duration-200 group cursor-pointer"
                    >
                      <span>{isArabic ? "تواصل معنا" : "Contact Us"}</span>
                      {isArabic ? (
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  </div>

                  {/* Middle Column: Interactive Contact Channels with User's Exact SVGs */}
                  <div className="md:col-span-4 space-y-4 text-white">
                    {/* Phone */}
                    <a
                      href="tel:+971556173300"
                      className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-[#01a9a0]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Image
                          src="/get-a-quote/icon-phone.svg"
                          alt="Phone"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-[#01a9a0] transition-colors">
                          +971 55 617 3300
                        </div>
                        <span className="text-[11px] text-stone-300">
                          {isArabic ? "اتصل بنا مباشرة" : "Call us directly"}
                        </span>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:info@tajalrahmah.com"
                      className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-[#01a9a0]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Image
                          src="/get-a-quote/icon-mail.svg"
                          alt="Email"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-[#01a9a0] transition-colors">
                          info@tajalrahmah.com
                        </div>
                        <span className="text-[11px] text-stone-300">
                          {isArabic ? "أرسل لنا بريداً إلكترونياً" : "Send us an email"}
                        </span>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-3.5 p-2">
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-[#01a9a0]/20 flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/get-a-quote/icon-location.svg"
                          alt="Location"
                          width={22}
                          height={26}
                          className="w-[22px] h-[26px]"
                        />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                          {isArabic ? "دبي، الإمارات العربية المتحدة" : "Dubai, UAE"}
                        </div>
                        <span className="text-[11px] text-stone-300">
                          {isArabic ? "المقر الرئيسي" : "Our office location"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual balance for desktop */}
                  <div className="hidden md:block md:col-span-3" />

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
