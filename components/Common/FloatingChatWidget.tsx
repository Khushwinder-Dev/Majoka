"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Phone,
  ArrowRightToLine,
  SquarePen,
  FileText,
  Send,
  ArrowUpRight,
  X,
  Sparkles,
  ChevronRight,
  Clock,
  Trash2,
  User,
  Mail,
  AlertCircle,
  CheckCircle2,
  Edit3,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  createdAt: number;
  messages: Message[];
}

export interface ChatUserInfo {
  name: string;
  email: string;
  phone: string;
}

const STORAGE_KEY = "taj_chat_history_v1";
const USER_INFO_KEY = "taj_chat_user_info_v1";

// AI Knowledge Engine for Taj Al Rahmah
function getAiResponse(userText: string, isArabic: boolean, userName?: string): { reply: string; quickActions: string[] } {
  const lower = userText.toLowerCase();
  const nameGreeting = userName ? (isArabic ? `عزيزي ${userName}، ` : `Dear ${userName}, `) : "";

  if (
    lower.includes("quote") ||
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("inspection") ||
    lower.includes("سعر") ||
    lower.includes("عرض") ||
    lower.includes("معاينة")
  ) {
    return {
      reply: isArabic
        ? `${nameGreeting}يسعدنا تقديم عرض سعر ومعاينة مجانية لمشروعك! فريقنا الهندسي متاح لزيارة موقعك في دبي والإمارات وإعداد تقرير فني شامل وضمان رسمي. يمكنك طلب عرض السعر مباشرة أو الاتصال بنا الآن.`
        : `${nameGreeting}we would be glad to provide a free inspection and quotation for your project! Our engineering team conducts on-site surveys across Dubai and the UAE with detailed technical reports and official warranties. You can submit a request on our Quote page or call us directly.`,
      quickActions: isArabic
        ? ["احصل على عرض سعر فوري", "اتصل بمهندس الموقع", "ما هي أنظمة العزل المتوفرة؟"]
        : ["Request Free Inspection", "Call an Engineer Directly", "What waterproofing systems do you offer?"],
    };
  }

  if (
    lower.includes("waterproof") ||
    lower.includes("grp") ||
    lower.includes("fiberglass") ||
    lower.includes("roof") ||
    lower.includes("leak") ||
    lower.includes("عزل") ||
    lower.includes("سطح") ||
    lower.includes("تسريب")
  ) {
    return {
      reply: isArabic
        ? `${nameGreeting}تاج الرحمة متخصصة في حلول العزل المتطورة المعتمدة في الإمارات:\n• نظام الكومبو المتكامل للأسطح (Combo Roof System)\n• عزل GRP والألياف الزجاجية المقاومة للحرارة والكيماويات\n• عزل البولي يوريا فائق السرعة والمتانة\n• عزل الأغشية البيتومينية وحقن الشروخ المائية للسراديب\nجميع أعمالنا تأتي مع ضمان رسمي يصل حتى 25 عاماً.`
        : `${nameGreeting}Taj Al Rahmah specializes in advanced waterproofing certified by UAE authorities:\n• Combo Roof System (Thermal insulation & complete waterproofing)\n• GRP & Fiberglass for water tanks, roofs, and wet areas\n• Fast-curing Polyurea coatings\n• Bitumen Membrane & High-pressure Injection for basements & cracks\nAll our waterproofing systems come with up to 25 years official warranty.`,
      quickActions: isArabic
        ? ["كم تبلغ مدة الضمان؟", "طلب معاينة للأسطح", "تواصل عبر واتساب"]
        : ["What is your warranty period?", "Book a Roof Inspection", "Chat on WhatsApp"],
    };
  }

  if (
    lower.includes("warranty") ||
    lower.includes("guarantee") ||
    lower.includes("ضمان") ||
    lower.includes("كفالة")
  ) {
    return {
      reply: isArabic
        ? `${nameGreeting}نوفر ضمانات رسمية معتمدة من بلدية دبي تتراوح بين 10 إلى 25 عاماً حسب نوع نظام العزل المستخدم (مثل نظام الكومبو وعزل GRP). الضمان يشمل صيانة دورية ومتابعة هندسية لضمان راحة بالك التامة.`
        : `${nameGreeting}we provide official warranties certified by Dubai Municipality ranging from 10 to 25 years depending on the chosen system (such as Combo Roofing and GRP Fiberglass). Our warranty includes periodic inspections and complete engineering support.`,
      quickActions: isArabic
        ? ["كيف أحصل على شهادة الضمان؟", "احصل على عرض سعر", "اتصل بنا الآن"]
        : ["How do I receive warranty certificate?", "Get a Quotation", "Call Us Now"],
    };
  }

  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("call") ||
    lower.includes("location") ||
    lower.includes("address") ||
    lower.includes("اتصال") ||
    lower.includes("هاتف") ||
    lower.includes("موقع") ||
    lower.includes("عنوان")
  ) {
    return {
      reply: isArabic
        ? `${nameGreeting}يمكنك التواصل معنا مباشرة:\n📞 هاتف: +971 52 749 2002 / +971 4 234 5678\n📧 بريد: info@tajalrahmah.com\n📍 الموقع: مكتب G-01-691، الخبيصي، دبي، الإمارات\n⏰ مواعيد العمل: من الإثنين إلى السبت (9:00 ص - 6:00 م).`
        : `${nameGreeting}you can reach us directly:\n📞 Phone: +971 52 749 2002 / +971 4 234 5678\n📧 Email: info@tajalrahmah.com\n📍 Office: G-01-691, Al Khabaisi, Dubai, UAE\n⏰ Working Hours: Monday - Saturday (9:00 AM - 6:00 PM).`,
      quickActions: isArabic
        ? ["اتصل الآن", "تحدث عبر واتساب", "عرض خريطة الموقع"]
        : ["Call Now", "Chat on WhatsApp", "View Location on Map"],
    };
  }

  if (
    lower.includes("epoxy") ||
    lower.includes("floor") ||
    lower.includes("إيبوكسي") ||
    lower.includes("ارضيات")
  ) {
    return {
      reply: isArabic
        ? `${nameGreeting}نقدم حلول طلاء أرضيات الإيبوكسي عالية التحمل للمستودعات، مواقف السيارات، المستشفيات، والمصانع، بمقاومة فائقة للمواد الكيميائية وحركة الآليات الثقيلة، مع خيارات مقاومة للانزلاق وتشطيبات جمالية متعددة.`
        : `${nameGreeting}we offer heavy-duty epoxy floor coating solutions for industrial warehouses, commercial car parks, healthcare facilities, and factories. Designed for superior chemical resistance, mechanical durability, and seamless aesthetic finishes.`,
      quickActions: isArabic
        ? ["احصل على استشارة للأرضيات", "اتصل بالدعم الفني", "طلب عرض سعر"]
        : ["Consult Flooring Specialist", "Call Technical Support", "Get a Quote"],
    };
  }

  // Default welcome response
  return {
    reply: isArabic
      ? `أهلاً بك${userName ? ` يا ${userName}` : ""}! أنا المساعد الذكي لشركة تاج الرحمة للعزل وصيانة المباني. كيف يمكنني مساعدتك اليوم؟ يمكنني تزويدك بمعلومات عن خدمات العزل، الضمانات، أو تنسيق زيارة ومعاينة مجانية لمشروعك.`
      : `Hello${userName ? ` ${userName}` : ""}! I am Taj Al Rahmah's AI assistant for waterproofing and building maintenance. How can I assist you today? I can help with waterproofing solutions, 10–25 year warranties, pricing, or scheduling a free site inspection.`,
    quickActions: isArabic
      ? ["احصل على عرض سعر ومعاينة", "ما هي خدمات العزل لديكم؟", "اتصل بنا مباشرة"]
      : ["Get a Free Inspection & Quote", "What waterproofing services do you offer?", "Call Us Directly"],
  };
}

export default function FloatingChatWidget() {
  const { isArabic } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "history">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [quickActions, setQuickActions] = useState<string[]>([]);

  // User Lead Capture State
  const [userInfo, setUserInfo] = useState<ChatUserInfo | null>(null);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [infoForm, setInfoForm] = useState({ name: "", email: "", phone: "" });
  const [infoErrors, setInfoErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load user info and history from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_INFO_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.name && parsed.email && parsed.phone) {
          setUserInfo(parsed);
          setInfoForm(parsed);
        }
      }
    } catch {
      // Ignore
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setChatHistory(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save conversation to history when message length increases
  useEffect(() => {
    if (messages.length >= 2) {
      const userFirst = messages.find((m) => m.sender === "user")?.text || "Inquiry";
      const lastAi = messages.filter((m) => m.sender === "ai").slice(-1)[0]?.text || "";
      const sessionId = messages[0]?.id || String(Date.now());

      setChatHistory((prev) => {
        const existingIdx = prev.findIndex((s) => s.id === sessionId);
        const updatedSession: ChatSession = {
          id: sessionId,
          title: userFirst.length > 32 ? userFirst.slice(0, 32) + "..." : userFirst,
          lastMessage: lastAi.length > 50 ? lastAi.slice(0, 50) + "..." : lastAi,
          timestamp: "Just now",
          createdAt: Date.now(),
          messages,
        };

        let newHistory: ChatSession[];
        if (existingIdx >= 0) {
          newHistory = [...prev];
          newHistory[existingIdx] = updatedSession;
        } else {
          newHistory = [updatedSession, ...prev].slice(0, 15);
        }

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        } catch {
          // ignore
        }
        return newHistory;
      });
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, activeTab]);

  // Format current time HH:MM
  const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  // Submit User Info Lead Form
  const handleUserInfoSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const errors: { name?: string; email?: string; phone?: string } = {};

    if (!infoForm.name.trim()) {
      errors.name = isArabic ? "يرجى إدخال اسمك الكريم" : "Please enter your name";
    }

    if (!infoForm.email.trim()) {
      errors.email = isArabic ? "يرجى إدخال البريد الإلكتروني" : "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(infoForm.email)) {
      errors.email = isArabic ? "صيغة البريد الإلكتروني غير صحيحة" : "Please enter a valid email address";
    }

    if (!infoForm.phone.trim()) {
      errors.phone = isArabic ? "يرجى إدخال رقم الهاتف للتواصل" : "Please enter your phone number";
    }

    if (Object.keys(errors).length > 0) {
      setInfoErrors(errors);
      return;
    }

    setInfoErrors({});
    const newUserData = {
      name: infoForm.name.trim(),
      email: infoForm.email.trim(),
      phone: infoForm.phone.trim(),
    };

    setUserInfo(newUserData);
    setShowInfoForm(false);

    try {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(newUserData));
    } catch {
      // ignore
    }

    // Send lead to backend API in background
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newUserData.name,
          email: newUserData.email,
          phone: newUserData.phone,
          message: `New Chatbot inquiry session started by ${newUserData.name}`,
          service: "AI Chatbot Lead",
        }),
      }).catch(() => { });
    } catch {
      // ignore
    }

    // Start conversation with a friendly personalized AI greeting
    if (messages.length === 0) {
      const welcomeMsg: Message = {
        id: `${Date.now()}-ai-welcome`,
        sender: "ai",
        text: isArabic
          ? `أهلاً بك يا ${newUserData.name}! 👋 يسعدنا تواصلك مع شركة تاج الرحمة للعزل وصيانة المباني. كيف يمكننا مساعدتك اليوم في مشروعك؟`
          : `Hello ${newUserData.name}! 👋 Welcome to Taj Al Rahmah Waterproofing & Building Maintenance. How can I assist you with your project today?`,
        timestamp: getCurrentTime(),
      };
      setMessages([welcomeMsg]);
      setQuickActions(
        isArabic
          ? ["طلب معاينة وعرض سعر فوري", "ما هي أنظمة العزل المتوفرة؟", "اتصل بمهندس الموقع"]
          : ["Request Free Inspection & Quote", "What waterproofing systems do you offer?", "Call an Engineer Directly"]
      );
    }
  };

  // Send message
  const handleSend = (textToSend?: string) => {
    // If user info is not provided, trigger info form first
    if (!userInfo) {
      setShowInfoForm(true);
      return;
    }

    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: query,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // If query is an action to call
    if (
      query.toLowerCase().includes("call now") ||
      query.includes("اتصل الآن") ||
      query.includes("اتصل بنا")
    ) {
      setTimeout(() => {
        window.location.href = "tel:+971527492002";
      }, 700);
    }

    // Simulate smart AI response delay
    setTimeout(() => {
      const response = getAiResponse(query, isArabic, userInfo?.name);
      const aiMsg: Message = {
        id: `${Date.now()}-ai`,
        sender: "ai",
        text: response.reply,
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setQuickActions(response.quickActions);
      setIsTyping(false);
    }, 600);
  };

  // Start a new chat session
  const handleNewChat = () => {
    setMessages([]);
    setQuickActions([]);
    setActiveTab("chat");
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Load a chat session from history
  const handleLoadSession = (session: ChatSession) => {
    setMessages(session.messages);
    setActiveTab("chat");
    setShowInfoForm(false);
  };

  // Clear all history
  const handleClearHistory = () => {
    setChatHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Categories
  const categories = isArabic
    ? [
      { label: "الكل", value: "All" },
      { label: "العزل المائي", value: "Waterproofing" },
      { label: "الأسطح", value: "Roofing" },
      { label: "الأرضيات", value: "Flooring" },
      { label: "اتصل بنا", value: "Contact" },
    ]
    : [
      { label: "All", value: "All" },
      { label: "Waterproofing", value: "Waterproofing" },
      { label: "Roofing", value: "Roofing" },
      { label: "Flooring", value: "Flooring" },
      { label: "Contact", value: "Contact" },
    ];

  // Default Prompts (Image 3 reference style)
  const defaultPrompts = isArabic
    ? [
      "طلب معاينة وعرض سعر مجاني",
      "استكشف أنظمة العزل المائي والأسطح",
      "الاستفسار عن طلاء أرضيات الإيبوكسي",
      "طلب صيانة وإصلاح تسريبات المياه الطارئة",
    ]
    : [
      "Get a Free Inspection & Quote",
      "Explore Waterproofing & Roof Systems",
      "Epoxy Floor Coating Services",
      "Emergency Water Leakage Support",
    ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          CHATBOT WINDOW (Images 3, 4, 5)
          ══════════════════════════════════════════════════════════════════════ */}
      {isOpen && (
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[610px] max-h-[86vh] bg-white rounded-3xl shadow-2xl shadow-stone-900/25 border border-stone-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* ── TOP HEADER BAR ────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-stone-100 bg-white">
            {/* Pill Tab Switcher: Chat | History */}
            <div className="flex items-center bg-stone-100 rounded-full p-1 gap-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("chat");
                  setShowInfoForm(false);
                }}
                className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${activeTab === "chat"
                  ? "bg-[#01a9a0] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
                  }`}
              >
                {isArabic ? "المحادثة" : "Chat"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${activeTab === "history"
                  ? "bg-[#01a9a0] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
                  }`}
              >
                {isArabic ? "السجل" : "History"}
              </button>
            </div>

            {/* Right Action Icons (User Profile, Document, New Chat, Close) */}
            <div className="flex items-center gap-1.5 text-stone-600">
              {/* User Profile / Edit Info Button */}
              {userInfo && (
                <button
                  type="button"
                  onClick={() => setShowInfoForm((prev) => !prev)}
                  title={isArabic ? "تعديل البيانات" : "Edit details"}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${showInfoForm
                    ? "bg-[#01a9a0]/15 text-[#01a9a0]"
                    : "hover:bg-stone-100 hover:text-stone-900 text-stone-500"
                    }`}
                >
                  <User className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "chat" ? "history" : "chat")}
                title={isArabic ? "عرض السجل" : "View History"}
                className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNewChat}
                title={isArabic ? "محادثة جديدة" : "New Chat"}
                className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <SquarePen className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title={isArabic ? "إغلاق" : "Close"}
                className="p-1.5 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <ArrowRightToLine className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* ── TAB: CHAT ─────────────────────────────────────────────── */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col min-h-0 bg-white">
              {/* ── FIRST-TIME USER INTAKE FORM (When no user info or user clicked edit) ── */}
              {(!userInfo || showInfoForm) ? (
                <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-center">
                  <div className="max-w-md mx-auto w-full">
                    {/* Centered Logo */}
                    <div className="flex justify-center mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center p-2 shadow-xs">
                        <Image
                          src="/logo.png"
                          alt="Taj Al Rahmah"
                          width={48}
                          height={48}
                          className="w-auto h-auto max-h-10 object-contain"
                        />
                      </div>
                    </div>

                    <div className="text-center mb-5">
                      <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                        {isArabic ? "أهلاً بك في تاج الرحمة 👋" : "Welcome to Taj Al Rahmah 👋"}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        {isArabic
                          ? "يرجى إدخال بياناتك لبدء المحادثة الفورية مع المساعد الذكي"
                          : "Please introduce yourself to start chatting with our AI assistant"}
                      </p>
                    </div>

                    <form onSubmit={handleUserInfoSubmit} className="space-y-3.5" noValidate>
                      {/* Name Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {isArabic ? "الاسم الكامل *" : "Full Name *"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={infoForm.name}
                            onChange={(e) => {
                              setInfoForm((p) => ({ ...p, name: e.target.value }));
                              if (infoErrors.name) setInfoErrors((p) => ({ ...p, name: undefined }));
                            }}
                            placeholder={isArabic ? "مثال: محمد أحمد" : "e.g. John Smith"}
                            className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:outline-hidden focus:bg-white transition-all ${infoErrors.name
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                              : "border-stone-200 focus:border-[#01a9a0] focus:ring-1 focus:ring-[#01a9a0]/30"
                              }`}
                          />
                        </div>
                        {infoErrors.name && (
                          <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span>{infoErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {isArabic ? "البريد الإلكتروني *" : "Email Address *"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            value={infoForm.email}
                            onChange={(e) => {
                              setInfoForm((p) => ({ ...p, email: e.target.value }));
                              if (infoErrors.email) setInfoErrors((p) => ({ ...p, email: undefined }));
                            }}
                            placeholder={isArabic ? "name@example.com" : "name@example.com"}
                            className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:outline-hidden focus:bg-white transition-all ${infoErrors.email
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                              : "border-stone-200 focus:border-[#01a9a0] focus:ring-1 focus:ring-[#01a9a0]/30"
                              }`}
                          />
                        </div>
                        {infoErrors.email && (
                          <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span>{infoErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          {isArabic ? "رقم الهاتف *" : "Phone Number *"}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-stone-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            value={infoForm.phone}
                            onChange={(e) => {
                              setInfoForm((p) => ({ ...p, phone: e.target.value }));
                              if (infoErrors.phone) setInfoErrors((p) => ({ ...p, phone: undefined }));
                            }}
                            placeholder={isArabic ? "+971 5X XXX XXXX" : "+971 5X XXX XXXX"}
                            className={`w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border bg-stone-50/60 text-stone-900 placeholder-stone-400 focus:outline-hidden focus:bg-white transition-all ${infoErrors.phone
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                              : "border-stone-200 focus:border-[#01a9a0] focus:ring-1 focus:ring-[#01a9a0]/30"
                              }`}
                          />
                        </div>
                        {infoErrors.phone && (
                          <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span>{infoErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Start Conversation Button */}
                      <button
                        type="submit"
                        className="w-full mt-2 py-3 px-4 rounded-xl bg-[#01a9a0] hover:bg-[#00c2b2] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{isArabic ? "ابدأ المحادثة الآن" : "Start Conversation"}</span>
                      </button>

                      {userInfo && showInfoForm && (
                        <button
                          type="button"
                          onClick={() => setShowInfoForm(false)}
                          className="w-full text-center text-xs text-stone-500 hover:text-stone-800 transition-colors py-1 cursor-pointer"
                        >
                          {isArabic ? "إلغاء والعودة للمحادثة" : "Cancel & Return to Chat"}
                        </button>
                      )}
                    </form>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[10px] text-stone-400 text-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>
                        {isArabic
                          ? "بياناتك في أمان تام وتُستخدم فقط لخدمتكم والتواصل المهني."
                          : "Your information is safe and used solely for service communication."}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── STANDARD CHAT & WELCOME STREAM (When user info is saved) ── */
                <>
                  {/* Messages & Welcome Container */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {messages.length === 0 ? (
                      /* ── Welcome Screen (Image 3) ── */
                      <div className="flex flex-col items-center pt-3 pb-2 text-center">
                        {/* Company Logo */}
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center p-2 mb-3">
                          <Image
                            src="/logo.png"
                            alt="Taj Al Rahmah"
                            width={60}
                            height={60}
                            className="w-auto h-auto max-h-12 object-contain"
                          />
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                          {isArabic ? `مرحباً بك يا ${userInfo.name} 👋` : `Hello ${userInfo.name} 👋`}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-500 mt-1 mb-5">
                          {isArabic ? "كيف يمكنني مساعدتك اليوم؟" : "How can I help you today?"}
                        </p>

                        {/* Quick suggestion prompt rows with ↗ icon */}
                        <div className="w-full space-y-2 mb-4">
                          {defaultPrompts.map((prompt, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSend(prompt)}
                              className="w-full flex items-center justify-between text-left rtl:text-right px-3.5 py-2.5 rounded-xl border border-stone-200/80 hover:border-[#01a9a0] hover:bg-stone-50/70 text-xs sm:text-sm text-stone-700 hover:text-stone-900 transition-all duration-200 group cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#01a9a0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                <span>{prompt}</span>
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Category Filter Chips */}
                        <div className="w-full flex items-center justify-start gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                          {categories.map((cat) => (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => {
                                setActiveCategory(cat.value);
                                if (cat.value === "Contact") {
                                  handleSend(
                                    isArabic ? "ما هي طرق التواصل وأرقام الهواتف؟" : "What are your contact details?"
                                  );
                                } else if (cat.value === "Waterproofing") {
                                  handleSend(
                                    isArabic ? "ما هي حلول وأنظمة العزل المتوفرة؟" : "Tell me about your waterproofing systems."
                                  );
                                } else if (cat.value === "Roofing") {
                                  handleSend(
                                    isArabic ? "أريد معلومات عن نظام الكومبو لعزل الأسطح" : "Tell me about Combo Roofing systems."
                                  );
                                } else if (cat.value === "Flooring") {
                                  handleSend(
                                    isArabic ? "ما هي حلول طلاء أرضيات الإيبوكسي؟" : "Tell me about epoxy flooring."
                                  );
                                }
                              }}
                              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat.value
                                ? "border border-[#01a9a0] text-[#01a9a0] bg-[#01a9a0]/5 font-medium"
                                : "border border-stone-200 text-stone-600 hover:border-stone-300"
                                }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* ── Active Conversation Stream (Image 4) ── */
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"
                              }`}
                          >
                            {msg.sender === "user" ? (
                              <div className="max-w-[85%] bg-[#e0f7f5] text-stone-900 rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed">
                                {msg.text}
                              </div>
                            ) : (
                              <div className="flex items-start gap-2 max-w-[92%]">
                                <div className="w-7 h-7 rounded-full bg-[#01a9a0]/10 flex items-center justify-center flex-shrink-0 mt-0.5 p-1 border border-[#01a9a0]/20">
                                  <Image
                                    src="/logo.png"
                                    alt="AI"
                                    width={20}
                                    height={20}
                                    className="w-auto h-auto max-h-5 object-contain"
                                  />
                                </div>
                                <div className="bg-stone-50 border border-stone-200/70 text-stone-800 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                                  {msg.text}
                                </div>
                              </div>
                            )}
                            <span className="text-[10px] text-stone-400 mt-1 px-1">
                              {msg.timestamp}
                            </span>
                          </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                          <div className="flex items-center gap-2 max-w-[80%]">
                            <div className="w-7 h-7 rounded-full bg-[#01a9a0]/10 flex items-center justify-center flex-shrink-0 p-1">
                              <Image
                                src="/logo.png"
                                alt="AI"
                                width={20}
                                height={20}
                                className="w-auto h-auto max-h-5 object-contain"
                              />
                            </div>
                            <div className="bg-stone-100 rounded-2xl px-3.5 py-2 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-bounce" />
                              <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-bounce [animation-delay:0.2s]" />
                              <span className="w-2 h-2 rounded-full bg-[#01a9a0] animate-bounce [animation-delay:0.4s]" />
                            </div>
                          </div>
                        )}

                        {/* Quick actions chips (Image 4) */}
                        {quickActions.length > 0 && !isTyping && (
                          <div className="pt-2">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                                {isArabic ? "إجراءات سريعة" : "Quick actions"}
                              </span>
                              <div className="h-px bg-stone-200 flex-1" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {quickActions.map((action, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleSend(action)}
                                  className="text-left rtl:text-right px-3.5 py-2 rounded-xl bg-[#e6fbf9] hover:bg-[#d0f5f2] text-stone-800 text-xs sm:text-sm font-normal transition-colors cursor-pointer border border-[#01a9a0]/20"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* ── BOTTOM INPUT CARD (Image 3 & 4) ────────────────────────── */}
                  <div className="p-3 border-t border-stone-100 bg-white">
                    <div className="relative rounded-2xl border border-stone-200 bg-stone-50/70 p-2.5 focus-within:border-[#01a9a0] focus-within:bg-white focus-within:shadow-md transition-all">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder={isArabic ? "اسأل الذكاء الاصطناعي أي شيء..." : "Ask AI anything..."}
                        className="w-full bg-transparent text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden pr-11 rtl:pr-0 rtl:pl-11"
                      />

                      {/* Right Input Action: Send Button */}
                      <div className="absolute right-2 rtl:right-auto rtl:left-2 bottom-1.5 flex items-center">
                        <button
                          type="button"
                          onClick={() => handleSend()}
                          disabled={!inputValue.trim()}
                          aria-label={isArabic ? "إرسال" : "Send message"}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${inputValue.trim()
                            ? "bg-[#01a9a0] text-white hover:bg-[#00c2b2] cursor-pointer active:scale-95"
                            : "bg-stone-200 text-stone-400 cursor-not-allowed opacity-60"
                            }`}
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Footer disclaimer */}
                    <p className="text-[10px] text-stone-400 text-center mt-2 select-none">
                      {isArabic
                        ? "قد يخطئ الذكاء الاصطناعي. يرجى التحقق من المعلومات المهمة."
                        : "AI can make mistakes. Double-check replies."}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── TAB: HISTORY (Image 5) ─────────────────────────────────── */}
          {activeTab === "history" && (
            <div className="flex-1 flex flex-col min-h-0 bg-white p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                  {isArabic ? "المحادثات السابقة" : "Recent Conversations"}
                </span>
                {chatHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="text-[11px] text-stone-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{isArabic ? "مسح السجل" : "Clear"}</span>
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                    <Clock className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-xs sm:text-sm">
                      {isArabic ? "لا توجد محادثات سابقة حتى الآن." : "No past conversations yet."}
                    </p>
                    <button
                      type="button"
                      onClick={handleNewChat}
                      className="mt-3 px-3.5 py-1.5 rounded-full bg-[#01a9a0] text-white text-xs font-medium hover:bg-[#00c2b2] transition-colors cursor-pointer"
                    >
                      {isArabic ? "بدء محادثة جديدة" : "Start New Chat"}
                    </button>
                  </div>
                ) : (
                  chatHistory.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleLoadSession(item)}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-stone-50 transition-colors text-left rtl:text-right border border-stone-100 hover:border-stone-200 cursor-pointer group"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#01a9a0]/10 flex items-center justify-center flex-shrink-0 p-1.5 border border-[#01a9a0]/20">
                        <Image
                          src="/logo.png"
                          alt="AI"
                          width={24}
                          height={24}
                          className="w-auto h-auto max-h-6 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                          AI: {item.lastMessage || item.title}
                        </p>
                        <p className="text-[11px] text-stone-400 truncate">{item.title}</p>
                      </div>
                      <span className="text-[11px] text-stone-400 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER RIGHT CORNER FLOATING TRIGGER (Image 2)
          "it is footer section right corner"
          "if user click on chat now then show Chatbot window"
          "and if user click on CALL now then connect to call"
          ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Menu Popover (Chat Now & Call Now) */}
        {isMenuOpen && !isOpen && (
          <div className="flex flex-col gap-2 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/80 animate-in fade-in slide-in-from-bottom-2 duration-200 min-w-[170px]">
            {/* 1. Chat Now */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#01a9a0]/10 text-stone-800 hover:text-[#01a9a0] font-medium text-xs sm:text-sm transition-all duration-200 text-left rtl:text-right cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#01a9a0] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-stone-900 leading-tight">
                  {isArabic ? "المحادثة الآن" : "Chat Now"}
                </span>
                <span className="text-[10px] text-stone-500">
                  {isArabic ? "المساعد الذكي" : "Ask AI assistant"}
                </span>
              </div>
            </button>

            {/* 2. Call Now */}
            <a
              href="tel:+971527492002"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-emerald-50 text-stone-800 hover:text-emerald-600 font-medium text-xs sm:text-sm transition-all duration-200 text-left rtl:text-right cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-stone-900 leading-tight">
                  {isArabic ? "اتصل الآن" : "Call Now"}
                </span>
                <span className="text-[10px] text-stone-500">+971 52 749 2002</span>
              </div>
            </a>
          </div>
        )}

        {/* Floating Trigger Button (Round shape with chat bubble icon) */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isArabic ? "تواصل معنا" : "Contact options"}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#01a9a0] border border-stone-200/90 shadow-xl hover:shadow-2xl hover:border-[#01a9a0] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* Chat bubble icon with animated ping badge */}
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-200" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#01a9a0] rounded-full ring-2 ring-white" />
            </div>

            {/* Hover Tooltip / Hint */}
            <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none hidden sm:block whitespace-nowrap">
              <div className="bg-stone-900/90 backdrop-blur-xs text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2">
                <span>{isArabic ? "محادثة أو اتصال" : "Chat or Call Now"}</span>
              </div>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
