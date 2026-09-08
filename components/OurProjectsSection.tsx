"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Target Reticle Icon rendered in white matching /media/Frame.svg
function TargetReticleWhiteIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.2794 15.9509C11.2195 15.7156 10.9803 15.5739 10.7451 15.6334C10.6892 15.6477 10.6366 15.6728 10.5904 15.7073C10.5442 15.7419 10.5052 15.7852 10.4757 15.8348C10.4462 15.8845 10.4268 15.9394 10.4186 15.9965C10.4103 16.0536 10.4134 16.1118 10.4277 16.1678C10.9601 18.2588 12.8406 19.7192 15.0007 19.7192C17.6028 19.7192 19.7197 17.6022 19.7197 15.0002C19.7197 12.3982 17.6028 10.2812 15.0007 10.2812C12.8506 10.2812 10.9722 11.7332 10.4329 13.8123C10.4184 13.8681 10.415 13.9263 10.423 13.9835C10.431 14.0406 10.4502 14.0957 10.4794 14.1454C10.5087 14.1951 10.5475 14.2386 10.5935 14.2734C10.6396 14.3082 10.6921 14.3335 10.7479 14.348C10.8038 14.3625 10.862 14.3658 10.9191 14.3579C10.9763 14.3499 11.0313 14.3307 11.081 14.3014C11.1308 14.2722 11.1743 14.2334 11.209 14.1873C11.2438 14.1413 11.2692 14.0888 11.2836 14.0329C11.7224 12.3415 13.2509 11.1602 15.0007 11.1602C17.1182 11.1602 18.8408 12.8828 18.8408 15.0003C18.8408 17.1177 17.1182 18.8403 15.0007 18.8403C13.2428 18.8403 11.7126 17.6521 11.2794 15.9509Z"
        fill="white"
      />
      <path
        d="M23.4476 14.4449H25.087C25.1483 14.4449 25.2089 14.4321 25.265 14.4073C25.3211 14.3824 25.3713 14.3462 25.4125 14.3007C25.4537 14.2553 25.485 14.2018 25.5042 14.1436C25.5235 14.0853 25.5304 14.0237 25.5244 13.9627C25.0346 8.95364 21.0435 4.96253 16.0344 4.47275C15.9734 4.46685 15.9118 4.47375 15.8536 4.49301C15.7954 4.51227 15.7419 4.54347 15.6964 4.5846C15.651 4.6258 15.6147 4.67605 15.5898 4.73212C15.565 4.78818 15.5522 4.84883 15.5522 4.91015V6.54954C15.5522 6.85534 15.3034 7.10413 14.9976 7.10413C14.6918 7.10413 14.443 6.85534 14.443 6.54954V4.91021C14.443 4.84889 14.4302 4.78824 14.4054 4.73218C14.3805 4.67611 14.3442 4.62586 14.2988 4.58466C14.2534 4.54346 14.1999 4.51223 14.1416 4.49297C14.0834 4.4737 14.0218 4.46683 13.9608 4.47281C8.95172 4.96259 4.96061 8.9537 4.47082 13.9628C4.46487 14.0238 4.47176 14.0854 4.49103 14.1436C4.5103 14.2018 4.54154 14.2553 4.58273 14.3007C4.62393 14.3462 4.67417 14.3825 4.73022 14.4073C4.78628 14.4321 4.84691 14.445 4.90823 14.445H6.54762C6.85342 14.445 7.10221 14.6938 7.10221 14.9996C7.10221 15.3054 6.85342 15.5542 6.54762 15.5542H4.90834C4.84702 15.5542 4.78638 15.567 4.73031 15.5918C4.67425 15.6167 4.624 15.653 4.5828 15.6984C4.5416 15.7438 4.51037 15.7973 4.4911 15.8555C4.47184 15.9138 4.46497 15.9754 4.47094 16.0364C4.64936 17.8608 5.30678 19.6171 6.37219 21.1155C7.41633 22.584 8.82452 23.7701 10.4445 24.5457C10.5493 24.5941 10.669 24.5992 10.7775 24.56C10.8861 24.5209 10.975 24.4405 11.0248 24.3364C11.0747 24.2323 11.0816 24.1127 11.044 24.0036C11.0065 23.8944 10.9275 23.8044 10.8241 23.753C7.91977 22.3625 5.87807 19.5872 5.40539 16.4331H6.5478C7.33823 16.4331 7.98129 15.7901 7.98129 14.9996C7.98129 14.2092 7.33823 13.5661 6.5478 13.5661H5.40504C6.0303 9.36152 9.35954 6.03228 13.5642 5.40702V6.54972C13.5642 7.34015 14.2072 7.98322 14.9977 7.98322C15.7881 7.98322 16.4312 7.34015 16.4312 6.54972V5.40691C20.6358 6.03216 23.965 9.3614 24.5903 13.566H23.4476C22.6572 13.566 22.0141 14.2091 22.0141 14.9995C22.0141 15.79 22.6572 16.433 23.4476 16.433H24.5903C23.965 20.6376 20.6358 23.9669 16.4312 24.5921V23.4494C16.4312 22.659 15.7881 22.016 14.9977 22.016C14.2072 22.016 13.5642 22.659 13.5642 23.4494V24.5919C13.2882 24.5507 13.0141 24.4976 12.7427 24.4328C12.6293 24.4057 12.5098 24.4247 12.4105 24.4857C12.3112 24.5468 12.2402 24.6447 12.2131 24.7581C12.186 24.8714 12.2051 24.9909 12.2661 25.0902C12.3271 25.1896 12.4251 25.2606 12.5384 25.2877C13.0066 25.3993 13.4818 25.479 13.9608 25.5262C14.0218 25.5323 14.0835 25.5255 14.1417 25.5063C14.1999 25.487 14.2535 25.4557 14.2988 25.4144C14.3442 25.3732 14.3805 25.3229 14.4054 25.2669C14.4302 25.2108 14.4431 25.1502 14.4431 25.0888V23.4494C14.4431 23.1436 14.6919 22.8949 14.9977 22.8949C15.3035 22.8949 15.5523 23.1436 15.5523 23.4494V25.0888C15.5523 25.2128 15.6046 25.3311 15.6965 25.4144C15.7419 25.4556 15.7954 25.4868 15.8536 25.5061C15.9118 25.5253 15.9734 25.5322 16.0344 25.5262C21.0435 25.0365 25.0346 21.0453 25.5244 16.0363C25.5303 15.9753 25.5234 15.9137 25.5042 15.8555C25.4849 15.7972 25.4537 15.7437 25.4125 15.6983C25.3713 15.6529 25.321 15.6166 25.265 15.5918C25.2089 15.5669 25.1483 15.5541 25.087 15.5541H23.4476C23.1418 15.5541 22.893 15.3053 22.893 14.9995C22.893 14.6937 23.1418 14.4449 23.4476 14.4449Z"
        fill="white"
      />
      <path
        d="M28.5665 13.5665H27.4837C27.202 11.0886 26.1984 8.77881 24.5674 6.86361C24.5299 6.81967 24.4842 6.78353 24.4329 6.75725C24.3815 6.73097 24.3254 6.71507 24.2679 6.71046C24.2104 6.70584 24.1525 6.71261 24.0976 6.73036C24.0427 6.74811 23.9918 6.77651 23.9479 6.81393C23.9039 6.85134 23.8678 6.89705 23.8415 6.94843C23.8152 6.99982 23.7993 7.05588 23.7947 7.1134C23.7901 7.17093 23.7969 7.2288 23.8146 7.28371C23.8324 7.33863 23.8608 7.3895 23.8982 7.43344C25.4973 9.31102 26.4479 11.5961 26.6472 14.0416C26.6561 14.1516 26.7061 14.2542 26.7873 14.329C26.8685 14.4038 26.9748 14.4454 27.0852 14.4454H28.5665C28.8723 14.4454 29.1211 14.6941 29.1211 14.9999C29.1211 15.3057 28.8723 15.5545 28.5665 15.5545H27.0852C26.9748 15.5545 26.8685 15.596 26.7873 15.6709C26.7061 15.7457 26.6561 15.8483 26.6472 15.9583C26.4232 18.7058 25.22 21.2987 23.2594 23.2593C21.2987 25.22 18.7058 26.4232 15.9584 26.6472C15.8483 26.6561 15.7457 26.7061 15.6709 26.7873C15.5961 26.8685 15.5546 26.9748 15.5546 27.0852V28.5664C15.5546 28.8722 15.3058 29.121 15 29.121C14.6942 29.121 14.4454 28.8722 14.4454 28.5664V27.0852C14.4454 26.9748 14.4039 26.8685 14.3291 26.7873C14.2543 26.7061 14.1517 26.6561 14.0416 26.6472C11.2942 26.4232 8.70129 25.22 6.74062 23.2593C4.77996 21.2986 3.57674 18.7057 3.35279 15.9583C3.34383 15.8483 3.29379 15.7457 3.21263 15.6709C3.13147 15.596 3.02513 15.5545 2.91475 15.5545H1.4335C1.1277 15.5545 0.878906 15.3057 0.878906 14.9999C0.878906 14.6941 1.1277 14.4454 1.4335 14.4454H2.91475C3.02513 14.4454 3.13147 14.4038 3.21263 14.329C3.29379 14.2542 3.34383 14.1516 3.35279 14.0416C3.57674 11.2941 4.7799 8.70123 6.74062 6.74057C8.70135 4.7799 11.2942 3.57668 14.0416 3.35273C14.1517 3.34377 14.2543 3.29374 14.3291 3.21257C14.4039 3.13141 14.4454 3.02507 14.4454 2.91469V1.43344C14.4454 1.12764 14.6942 0.878848 15 0.878848C15.3058 0.878848 15.5546 1.12764 15.5546 1.43344V2.91469C15.5546 3.02507 15.5961 3.13141 15.6709 3.21257C15.7457 3.29374 15.8483 3.34377 15.9584 3.35273C18.3406 3.54691 20.5787 4.45816 22.4306 5.98793C22.4751 6.02468 22.5264 6.05231 22.5816 6.06924C22.6368 6.08617 22.6947 6.09207 22.7522 6.08659C22.8096 6.08112 22.8654 6.06438 22.9164 6.03734C22.9674 6.0103 23.0126 5.97348 23.0493 5.92898C23.0861 5.88449 23.1137 5.83319 23.1306 5.77802C23.1476 5.72285 23.1535 5.66488 23.148 5.60743C23.1425 5.54998 23.1258 5.49417 23.0987 5.44319C23.0717 5.3922 23.0349 5.34705 22.9904 5.31029C21.104 3.75205 18.8447 2.7907 16.4336 2.51613V1.4335C16.4335 0.643066 15.7904 0 15 0C14.2096 0 13.5665 0.643066 13.5665 1.4335V2.51631C10.762 2.83746 8.13076 4.10742 6.11912 6.11912C4.10748 8.13082 2.83746 10.762 2.51631 13.5665H1.4335C0.643066 13.5665 0 14.2096 0 15C0 15.7904 0.643066 16.4335 1.4335 16.4335H2.51631C2.83746 19.238 4.10742 21.8692 6.11912 23.8809C8.13082 25.8925 10.762 27.1625 13.5665 27.4837V28.5665C13.5665 29.3569 14.2096 30 15 30C15.7904 30 16.4335 29.3569 16.4335 28.5665V27.4837C19.238 27.1625 21.8692 25.8926 23.8809 23.8809C25.8925 21.8692 27.1625 19.238 27.4836 16.4335H28.5665C29.3569 16.4335 30 15.7904 30 15C30 14.2096 29.3569 13.5665 28.5665 13.5665Z"
        fill="white"
      />
      <path
        d="M16.9494 15.0001C16.9494 13.9252 16.0749 13.0508 15.0001 13.0508C13.9252 13.0508 13.0508 13.9252 13.0508 15.0001C13.0508 16.0749 13.9252 16.9494 15.0001 16.9494C16.0749 16.9494 16.9494 16.0749 16.9494 15.0001ZM13.9297 15.0001C13.9297 14.4099 14.4098 13.9297 15.0001 13.9297C15.5904 13.9297 16.0705 14.4098 16.0705 15.0001C16.0705 15.5904 15.5904 16.0705 15.0001 16.0705C14.4098 16.0705 13.9297 15.5903 13.9297 15.0001Z"
        fill="white"
      />
    </svg>
  );
}

export default function OurProjectsSection() {
  const { isArabic } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    {
      id: 1,
      image: "/media/Images/section5/Rectangle 34624981 (1).png",
      title: isArabic ? "محطة مترو دبي" : "Dubai Metro Station",
      category: isArabic
        ? "مشاريع البنية التحتية والنقل الكبرى والتطوير الحضري"
        : "Major Transportation Infrastructure & Development Projects",
      link: "/projects",
    },
    {
      id: 2,
      image: "/media/Images/section5/Rectangle 34624981 (2).png",
      title: isArabic ? "برج مستشفى المدينة" : "City Hospital Tower",
      category: isArabic
        ? "المستشفيات والعيادات والمرافق الطبية المتخصصة"
        : "Hospitals, Clinics & Specialized Healthcare Facilities",
      link: "/projects",
    },
    {
      id: 3,
      image: "/media/Images/section5/Rectangle 34624981 (3).png",
      title: isArabic ? "فلل نخلة جميرا الفاخرة" : "Palm Jumeirah Villa",
      category: isArabic
        ? "الفلل الفاخرة والمنازل الخاصة والمجمعات السكنية الراقية"
        : "Luxury Villas, Private Homes & Residential Developments",
      link: "/projects",
    },
    {
      id: 4,
      image: "/media/Images/section5/Rectangle 34624981 (4).png",
      title: isArabic ? "فلل نخلة جميرا ريزيدنس" : "Palm Jumeirah Villa",
      category: isArabic
        ? "الفلل الفاخرة والمنازل الخاصة والمجمعات السكنية الراقية"
        : "Luxury Villas, Private Homes & Residential Developments",
      link: "/projects",
    },
    {
      id: 5,
      image: "/media/Images/section5/Rectangle 34624981 (2).png",
      title: isArabic ? "أبراج الخليج التجارية" : "Gulf Business Center",
      category: isArabic
        ? "الأبراج التجارية والمكاتب الذكية ومجمعات الأعمال الكبرى"
        : "Smart Commercial Towers & Corporate Headquarters",
      link: "/projects",
    },
    {
      id: 6,
      image: "/media/Images/section5/Rectangle 34624981 (3).png",
      title: isArabic ? "منتجع الواجهة البحرية" : "Waterfront Luxury Resort",
      category: isArabic
        ? "الفنادق العالمية والمنتجعات الفاخرة ومشاريع الضيافة"
        : "International Hospitality & High-End Coastal Resorts",
      link: "/projects",
    },
  ];

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(Math.abs(scrollLeft) > 10);
      setCanScrollRight(Math.abs(scrollLeft) < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      updateScrollButtons();
      return () => {
        el.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector<HTMLElement>(".project-carousel-card");
      const cardWidth = card ? card.offsetWidth : 330;
      const scrollStep = cardWidth + 24; // width + gap
      const factor = direction === "left" ? -1 : 1;
      const delta = isArabic ? -factor * scrollStep : factor * scrollStep;

      container.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#E6F7F6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Left Title & Eyebrow */}
          <div>
            {/* Eyebrow / Tag */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.16em] uppercase text-[#01a9a0]">
                {isArabic ? "مشاريعنا" : "OUR PROJECT"}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.14]">
              <span>
                {isArabic ? "تنفيذ متقن، احترافي، و" : "Clean, Professional, And"}
              </span>
              <br />
              <span>{isArabic ? "تصميم يعكس " : "Perfectly "}</span>
              <span className="text-[#01a9a0]">
                {isArabic ? "رؤيتكم المشتركة" : "Design You Shared"}
              </span>
            </h2>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3.5 bg-[#009e90] hover:bg-[#01887e] text-white pl-6 pr-2.5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(0,158,144,0.25)] hover:shadow-[0_6px_22px_rgba(0,158,144,0.35)] transition-all duration-300 group"
            >
              <span>{isArabic ? "عرض جميع المشاريع" : "VIEW ALL PROJECT"}</span>
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
            PROJECTS CAROUSEL WITH WORKING ARROWS & SCOOPED CORNER CARDS
            ============================================================ */}
        <div className="relative group/carousel">
          {/* Navigation Arrow: Previous (Left) */}
          <button
            onClick={() => scroll("left")}
            aria-label={isArabic ? "السابق" : "Previous Project"}
            className="absolute -left-3 sm:-left-5 lg:-left-6 top-[48%] -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.14)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
          >
            {isArabic ? (
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>

          {/* Navigation Arrow: Next (Right) */}
          <button
            onClick={() => scroll("right")}
            aria-label={isArabic ? "التالي" : "Next Project"}
            className="absolute -right-3 sm:-right-5 lg:-right-6 top-[48%] -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_6px_22px_rgba(0,0,0,0.14)] flex items-center justify-center text-[#009e90] hover:bg-[#009e90] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-110 active:scale-95"
          >
            {isArabic ? (
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            ) : (
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            )}
          </button>

          {/* Carousel Scroll Container (Always scrolls smoothly on all viewports) */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 sm:gap-6 pb-6 pt-2 px-1 no-scrollbar select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-carousel-card flex-shrink-0 w-[285px] sm:w-[310px] md:w-[325px] lg:w-[320px] xl:w-[335px] snap-start flex flex-col"
              >
                <Link
                  href={project.link}
                  className="group relative block bg-white rounded-[26px] shadow-[0_10px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_40px_rgba(1,169,160,0.16)] hover:-translate-y-1 transition-all duration-400 overflow-hidden flex flex-col h-full"
                >
                  {/* Top Photo Container */}
                  <div className="relative w-full h-[200px] sm:h-[215px] overflow-hidden bg-stone-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
                      className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    />

                    {/* Teal bottom accent bar along photo */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#009e90] z-10" />

                    {/* Square Teal Badge with Target Reticle Icon at bottom-left */}
                    <div
                      className={`absolute bottom-0 ${
                        isArabic ? "right-4 sm:right-5" : "left-4 sm:left-5"
                      } z-20 w-11 h-11 bg-[#009e90] rounded-t-xl flex items-center justify-center shadow-md group-hover:bg-[#01887e] transition-colors duration-300`}
                    >
                      <TargetReticleWhiteIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Bottom White Info Box */}
                  <div className="relative pt-6 pb-9 px-5 sm:px-6 flex flex-col flex-grow bg-white">
                    {/* Project Title */}
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-stone-900 tracking-tight leading-snug group-hover:text-[#01a9a0] transition-colors duration-300 line-clamp-1 mb-2">
                      {project.title}
                    </h3>

                    {/* Project Subtitle / Category */}
                    <p
                      className={`text-xs sm:text-[13px] text-stone-500 font-normal leading-[1.6] line-clamp-2 ${
                        isArabic ? "pl-9" : "pr-9"
                      }`}
                    >
                      {project.category}
                    </p>

                    {/* Clean SVG Scooped Corner (Matches Reference Design Inverted Fillet Curve) */}
                    <svg
                      className={`absolute -bottom-[0.5px] ${
                        isArabic ? "-left-[0.5px] scale-x-[-1]" : "-right-[0.5px]"
                      } w-[56px] h-[56px] pointer-events-none z-10`}
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <path
                        d="M 0 56 C 16 56 22 50 26 40 C 30 30 30 30 40 26 C 50 22 56 16 56 0 L 56 56 Z"
                        fill="#E6F7F6"
                      />
                    </svg>

                    {/* Circular Teal Arrow Button nestled inside the scooped corner */}
                    <div
                      className={`absolute bottom-2.5 ${
                        isArabic ? "left-2.5" : "right-2.5"
                      } z-20 w-10 h-10 rounded-full bg-[#009e90] group-hover:bg-[#01887e] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,158,144,0.35)] group-hover:scale-110 transition-all duration-300`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 text-white stroke-[2.5] transition-transform duration-300 ${
                          isArabic
                            ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rotate-[-90deg]"
                            : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
