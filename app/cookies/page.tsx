"use client";

import React from "react";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  Cookie,
  Info,
  Sliders,
  ExternalLink,
  Settings,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface CookieSection {
  number: string;
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  paragraphsEn?: string[];
  paragraphsAr?: string[];
  bulletsEn?: { label: string; desc: string }[];
  bulletsAr?: { label: string; desc: string }[];
  footerEn?: string;
  footerAr?: string;
}

export default function CookiesPage() {
  const { isArabic } = useLanguage();
  const isAr = isArabic;

  const cookieSections: CookieSection[] = [
    {
      number: "01",
      icon: Info,
      titleEn: "1. Introduction",
      titleAr: "1. مقدمة عامة",
      paragraphsEn: [
        "Taj Al Rahmah uses cookies and similar technologies on its website to support website functionality, security, performance, and user experience.",
        "This Cookie Policy explains what cookies are, how they may be used on our website, and how you can manage them.",
      ],
      paragraphsAr: [
        "تستخدم شركة تاج الرحمة ملفات تعريف الارتباط (الكوكيز) والتقنيات المشابهة على موقعها الإلكتروني لدعم وظائف الموقع، وتعزيز الأمان، ورفع كفاءة الأداء، وتحسين تجربة المستخدم.",
        "توضح سياسة ملفات تعريف الارتباط هذه ماهية هذه الملفات، وكيفية استخدامها عبر موقعنا الإلكتروني، والخيارات المتاحة لك لإدارتها والتحكم فيها.",
      ],
    },
    {
      number: "02",
      icon: Cookie,
      titleEn: "2. What Are Cookies?",
      titleAr: "2. ما هي ملفات تعريف الارتباط؟",
      paragraphsEn: [
        "Cookies are small text files that may be stored on your device (computer, tablet, or mobile phone) when you visit a website. They help websites remember certain information about your visit and understand how visitors interact with the website.",
      ],
      paragraphsAr: [
        "ملفات تعريف الارتباط هي ملفات نصية صغيرة قد يتم تخزينها على جهازك (حاسوب أو هاتف ذكي أو جهاز لوحي) عند زيارتك لموقع إلكتروني. تساعد هذه الملفات المواقع على تذكر معلومات معينة حول زيارتك وفهم كيفية تفاعل المستخدمين مع محتوى الموقع وخدماته.",
      ],
    },
    {
      number: "03",
      icon: Sliders,
      titleEn: "3. How We Use Cookies",
      titleAr: "3. كيف نستخدم ملفات تعريف الارتباط",
      paragraphsEn: [
        "Depending on the technologies used on our website, cookies may be used for:",
      ],
      paragraphsAr: [
        "وفقاً للتقنيات والبرمجيات المعتمدة على موقعنا الإلكتروني، قد تُستخدم ملفات تعريف الارتباط للأغراض التالية:",
      ],
      bulletsEn: [
        {
          label: "Essential functionality",
          desc: "To help the website operate properly, maintain sessions, and ensure robust security.",
        },
        {
          label: "Performance and analytics",
          desc: "To understand website traffic, monitor load times, and analyze user engagement to continuously improve our website.",
        },
        {
          label: "User experience",
          desc: "To remember certain language or navigation preferences and improve interactive website functionality.",
        },
      ],
      bulletsAr: [
        {
          label: "الوظائف الأساسية والتشغيلية",
          desc: "للمساعدة في تشغيل الموقع بشكل سليم، والحفاظ على جلسات التصفح، وضمان معايير الأمان الموثوقة.",
        },
        {
          label: "الأداء والتحليلات الإحصائية",
          desc: "لفهم حركة الزوار على الموقع، ومراقبة سرعة استجابة الصفحات، وتحليل سلوك التصفح لتطوير الموقع باستمرار.",
        },
        {
          label: "تحسين تجربة المستخدم",
          desc: "لتذكر تفضيلات اللغة أو التصفح المفضلة وتقديم تجربة تفاعلية سلسة ومخصصة.",
        },
      ],
      footerEn:
        "We do not use cookies to sell or rent your personal information to third parties.",
      footerAr:
        "نحن لا نستخدم ملفات تعريف الارتباط لبيع أو تأجير معلوماتك الشخصية لأي جهات خارجية بأي شكل من الأشكال.",
    },
    {
      number: "04",
      icon: ExternalLink,
      titleEn: "4. Third-Party Cookies",
      titleAr: "4. ملفات تعريف الارتباط التابعة لأطراف ثالثة",
      paragraphsEn: [
        "Some features or services on our website may be provided by third-party platforms, such as analytics, maps, videos, social media, hosting, or communication services.",
        "These third parties may use their own cookies or similar technologies in accordance with their respective privacy and cookie policies.",
      ],
      paragraphsAr: [
        "قد يتم توفير بعض الخصائص أو الخدمات المتاحة على موقعنا بواسطة منصات تابعة لأطراف ثالثة، مثل تحليلات الويب، والخرائط التفاعلية، ومقاطع الفيديو، وقنوات التواصل الاجتماعي، أو أدوات الاستضافة والمحادثة.",
        "قد تستخدم هذه الأطراف الثالثة ملفات تعريف الارتباط الخاصة بها أو تقنيات تتبع مماثلة وفقاً لسياسات الخصوصية وملفات تعريف الارتباط الخاصة بكل منها.",
      ],
    },
    {
      number: "05",
      icon: Settings,
      titleEn: "5. Managing Cookies",
      titleAr: "5. إدارة ملفات تعريف الارتباط والتحكم فيها",
      paragraphsEn: [
        "You can control or disable cookies through your browser settings. Most web browsers allow you to manage your cookie preferences, refuse certain cookies, or delete previously stored cookies.",
        "You may also be able to manage optional cookies through a cookie preference or consent mechanism where available on our website.",
        "Please note that disabling essential cookies may affect certain website functions and features.",
      ],
      paragraphsAr: [
        "يمكنك التحكم في ملفات تعريف الارتباط أو تعطيلها من خلال إعدادات متصفح الإنترنت لديك. تتيح معظم المتصفحات إمكانية إدارة التفضيلات، أو حظر ملفات معينة، أو حذف الملفات المخزنة مسبقاً.",
        "قد تتمكن أيضاً من إدارة ملفات تعريف الارتباط الاختيارية من خلال أدوات إدارة التفضيلات أو آليات الموافقة حيثما تتوفر على موقعنا.",
        "يرجى ملاحظة أن تعطيل ملفات تعريف الارتباط الأساسية قد يؤثر سلباً على عمل بعض وظائف ومزايا الموقع الإلكتروني.",
      ],
    },
    {
      number: "06",
      icon: RefreshCw,
      titleEn: "6. Changes to This Cookie Policy",
      titleAr: "6. التعديلات على سياسة ملفات تعريف الارتباط",
      paragraphsEn: [
        "We may update this Cookie Policy from time to time to reflect changes in our website, technology, services, or applicable regulatory requirements.",
        'Any updates will be published on this page with a revised "Last Updated" date.',
      ],
      paragraphsAr: [
        "يجوز لنا تحديث ومراجعة سياسة ملفات تعريف الارتباط هذه من وقت لآخر لتعكس أي تغييرات في موقعنا، أو الأنظمة التقنية المستخدمة، أو نطاق خدماتنا، أو المتطلبات التنظيمية المعمول بها.",
        'سيتم نشر أي تحديثات مباشرة على هذه الصفحة مصحوبة بتاريخ "آخر تحديث" المنقح.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50/60" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Page Header Banner ── */}
      <CommonHeader
        title={isAr ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
        breadcrumb={isAr ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
        imagePath="/banners/Home__.png"
      />

      {/* ── Main Policy Content ── */}
      <main className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto">
        {/* Policy Introduction Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200 shadow-xs mb-10 sm:mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#01a9a0]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0 shadow-inner">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#01a9a0] tracking-tight">
                  {isAr ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  Taj Al Rahmah Technical Services L.L.C • Dubai, UAE
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-[#01a9a0]" />
              <span>{isAr ? "آخر تحديث: 26 سبتمبر 2026" : "Last Updated: 26 September 2026"}</span>
            </div>
          </div>

          <div className="text-sm sm:text-[15.5px] text-stone-700 leading-relaxed mt-6 font-medium space-y-3">
            <p>
              {isAr
                ? "تستخدم شركة تاج الرحمة ملفات تعريف الارتباط والتقنيات المماثلة لدعم وظائف موقعها الإلكتروني وأمانه وكفاءة أدائه وتحسين تجربة المستخدم العامة."
                : "Taj Al Rahmah uses cookies and similar technologies on its website to support website functionality, security, performance, and user experience."}
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              {isAr
                ? "توضح هذه السياسة ماهية ملفات تعريف الارتباط، وكيفية استخدامها في موقعنا، والخيارات المتاحة للتحكم بها عبر متصفحك."
                : "This Cookie Policy explains what cookies are, how they may be used on our website, and how you can manage them."}
            </p>
          </div>
        </div>

        {/* ── Policy Sections (1 to 6) ── */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          {cookieSections.map((section, idx) => {
            const Icon = section.icon;
            const paragraphs = isAr ? section.paragraphsAr : section.paragraphsEn;
            const bullets = isAr ? section.bulletsAr : section.bulletsEn;
            const footer = isAr ? section.footerAr : section.footerEn;

            return (
              <section
                key={idx}
                className="group bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 hover:border-[#01a9a0]/40 hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#01a9a0]/10 border border-[#01a9a0]/25 text-[#01a9a0] group-hover:bg-[#01a9a0] group-hover:text-white group-hover:border-[#01a9a0] flex items-center justify-center shrink-0 transition-colors duration-200 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-[#01a9a0] transition-colors duration-200 mb-3">
                      {isAr ? section.titleAr : section.titleEn}
                    </h2>

                    <div className="space-y-2.5 text-sm sm:text-[15px] text-stone-600 leading-relaxed font-normal">
                      {paragraphs &&
                        paragraphs.map((para, pIdx) => <p key={pIdx}>{para}</p>)}

                      {/* Styled Bullets with Title & Description */}
                      {bullets && bullets.length > 0 && (
                        <div className="mt-3.5 space-y-2.5 pt-1">
                          {bullets.map((item, bIdx) => (
                            <div
                              key={bIdx}
                              className="flex items-start gap-3 p-3 rounded-xl bg-stone-50/80 border border-stone-100"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#01a9a0] mt-1.5 shrink-0" />
                              <div>
                                <span className="font-bold text-stone-800 text-xs sm:text-sm">
                                  {item.label}:{" "}
                                </span>
                                <span className="text-stone-600 text-xs sm:text-sm">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {footer && (
                        <p className="mt-3.5 pt-2.5 text-stone-600 text-xs sm:text-sm font-medium border-t border-stone-100">
                          {footer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Section 7: Contact Us ── */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-7 bg-[#01a9a0] rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#01a9a0]">
              {isAr ? "7. اتصل بنا" : "7. Contact Us"}
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed mb-6">
            {isAr
              ? "إذا كانت لديكم أي أسئلة أو استفسارات حول سياسة ملفات تعريف الارتباط هذه أو كيفية استخدامنا لها، يرجى التواصل مع شركة تاج الرحمة عبر القنوات التالية:"
              : "If you have any questions about this Cookie Policy or our use of cookies, please contact Taj Al Rahmah, United Arab Emirates, through our Contact Us page or the contact details provided below:"}
          </p>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {/* Email */}
            <a
              href="mailto:info@tajalrahmah.com"
              className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#01a9a0] hover:bg-[#f0faf9] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate group-hover:text-[#01a9a0] transition-colors">
                  info@tajalrahmah.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+971556173300"
              className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#01a9a0] hover:bg-[#f0faf9] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isAr ? "الهاتف" : "Phone"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate group-hover:text-[#01a9a0] transition-colors">
                  +971 55 617 3300
                </p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isAr ? "الموقع" : "Location"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate">
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy Link & Action Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#e6f7f6] border border-[#01a9a0]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-stone-800">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#01a9a0] shrink-0" />
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isAr ? (
                  <>
                    لمزيد من المعلومات حول كيفية تعاملنا مع البيانات الشخصية وحمايتها، يرجى الاطلاع على{" "}
                    <Link href="/privacy" className="text-[#01a9a0] font-bold underline hover:text-[#008f88]">
                      سياسة الخصوصية
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    For additional information about how we handle personal information, please see our{" "}
                    <Link href="/privacy" className="text-[#01a9a0] font-bold underline hover:text-[#008f88]">
                      Privacy Policy
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#01a9a0] hover:bg-[#008f88] text-white text-xs sm:text-sm font-bold transition-all shrink-0 shadow-sm active:scale-95"
            >
              <span>{isAr ? "صفحة اتصل بنا" : "Contact Us Page"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
