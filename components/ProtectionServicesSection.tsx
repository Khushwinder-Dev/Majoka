"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProtectionServicesSection() {
  const { isArabic } = useLanguage();

  const services = [
    {
      id: 1,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (1).png",
      icon: "/media/protection/fi_18882906.svg",
      title: isArabic ? "طلاء أرضيات الإيبوكسي" : "Epoxy Floor Coating",
      description: isArabic
        ? "حلول أرضيات متينة وسلسة وعالية الأداء للمنشآت والمستودعات."
        : "Durable, Seamless & High-Performance Flooring Solutions",
      link: "/services",
    },
    {
      id: 2,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (2).png",
      icon: "/media/protection/fi_12071074.svg",
      title: isArabic ? "عزل البولي يوريا" : "Polyurea Waterproofing",
      description: isArabic
        ? "حماية متقدمة للأسطح الممتدة وسريعة الجفاف للمتانة طويلة الأمد."
        : "Advanced Protection for Durable Seamless & Long Surfaces",
      link: "/services",
    },
    {
      id: 3,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (3).png",
      icon: "/media/protection/fi_16076200.svg",
      title: isArabic ? "عزل الحقن المائي" : "Injection Waterproofing",
      description: isArabic
        ? "حقن وسد دقيق للشقوق الخرسانية لحماية دائمة من تسرب المياه."
        : "Precision Sealing for Lasting Water Protection",
      link: "/services",
    },
    {
      id: 4,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (4).png",
      icon: "/media/protection/fi_7368818.svg",
      title: isArabic ? "تركيب لوحات التوزيع" : "DB Box Installation",
      description: isArabic
        ? "حلول توزيع كهربائي آمنة وموثوقة للمباني والمنشآت الحديثة."
        : "Safe & Reliable Electrical Distribution Solutions",
      link: "/services",
    },
    {
      id: 5,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (5).png",
      icon: "/media/protection/fi_11495742.svg",
      title: isArabic ? "الطلاءات الصناعية" : "Industrial Coatings",
      description: isArabic
        ? "حماية متينة فائقة للمنشآت المتطلبة والبيئات الصناعية القاسية."
        : "Durable Protection for Demand Industrial Environments",
      link: "/services",
    },
    {
      id: 6,
      image: "/media/Images/section3/medium-shot-delivery-woman-wearing-mask (6).png",
      icon: "/media/protection/fi_14850017.svg",
      title: isArabic ? "العزل المائي الشامل" : "WATERPROOFING",
      description: isArabic
        ? "حماية متقدمة ومضمونة ضد تسرب المياه والرطوبة للمسابح والأسطح."
        : "Advanced Protection Against Water & Moisture",
      link: "/services",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#E6F7F6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left Title & Eyebrow */}
          <div>
            {/* Eyebrow / Category Tag */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.16em] uppercase text-[#01a9a0]">
                {isArabic ? "خدماتنا" : "OUR SERVICES"}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.14]">
              <span>{isArabic ? "حماية شاملة لكل" : "Complete Protection For"}</span>
              <br />
              <span className="text-[#01a9a0]">
                {isArabic ? "الأسطح والمباني" : "Every Surface"}
              </span>
            </h2>
          </div>

          {/* Right CTA Button */}
          <div className="flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-3.5 bg-[#009e90] hover:bg-[#01887e] text-white pl-6 pr-2.5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(0,158,144,0.25)] hover:shadow-[0_6px_22px_rgba(0,158,144,0.35)] transition-all duration-300 group"
            >
              <span>{isArabic ? "عرض جميع الخدمات" : "VIEW ALL SERVICES"}</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#009e90] group-hover:scale-105 transition-transform duration-300">
                {isArabic ? (
                  <ArrowLeft className="w-4 h-4 text-[#009e90] group-hover:-translate-x-0.5 transition-transform duration-300" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#009e90] group-hover:translate-x-0.5 transition-transform duration-300" />
                )}
              </span>
            </Link>
          </div>
        </div>

        {/* ============================================================
            SERVICES 6-CARD GRID
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-14 gap-x-6 lg:gap-x-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
              className="group flex flex-col"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-[220px] sm:h-[240px] md:h-[250px] lg:h-[260px] rounded-3xl overflow-hidden shadow-[0_8px_25px_-10px_rgba(0,0,0,0.12)] bg-stone-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Overlapping Floating Info Card */}
              <div className="relative -mt-14 sm:-mt-16 mx-4 sm:mx-5 bg-white rounded-2xl p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] border border-stone-100/90 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_38px_-8px_rgba(1,169,160,0.18)]">
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={36}
                      height={36}
                      className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                    />
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-stone-900 leading-snug tracking-tight group-hover:text-[#01a9a0] transition-colors duration-300 line-clamp-1">
                    {service.title}
                  </h3>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-[13px] text-stone-500 font-normal leading-relaxed min-h-[38px] line-clamp-2">
                  {service.description}
                </p>

                {/* CTA Link: Get Started */}
                <div className="mt-4 pt-1">
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#01a9a0] hover:text-[#01887e] transition-colors duration-200 group/link"
                  >
                    <span>{isArabic ? "ابدأ الآن" : "Get Started"}</span>
                    {isArabic ? (
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
