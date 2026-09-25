"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "@/context/LanguageContext";

const Certifications = () => {
    const { isArabic } = useLanguage();

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-8xl mx-auto" dir={isArabic ? "rtl" : "ltr"}>

                {/* Company Profile Banner */}
                <div className="relative rounded-2xl overflow-hidden min-h-[160px] sm:min-h-[180px]">

                    {/* Full background image */}
                    <Image
                        src="/certifications/logos/e500da08-f078-4dec-a716-760cf969e80b (1) 1.png"
                        alt="Company building"
                        fill
                        unoptimized
                        className="object-cover object-right-center"
                    />

                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 pointer-events-none ${isArabic
                            ? "bg-gradient-to-l from-white/90 via-white/60 to-transparent"
                            : "bg-gradient-to-r from-white/90 via-white/60 to-transparent"
                            }`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center px-7 sm:px-10 py-8 sm:py-10 max-w-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block h-[2px] w-6 bg-[#01a9a0] rounded-full" />
                            <span className="text-[16px] font-extrabold tracking-[0.2em] uppercase text-[#01a9a0]">
                                {isArabic ? "ملف الشركة" : "COMPANY PROFILE"}
                            </span>
                        </div>

                        <p className="text-sm sm:text-[15px] text-stone-800 leading-relaxed mb-6 max-w-xs font-medium">
                            {isArabic
                                ? "اكتشف خبرتنا وخدماتنا والتزامنا ببناء غدٍ أكثر أماناً وقوة."
                                : "Discover our expertise, services and commitment to building a safer, stronger tomorrow."}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 shadow-sm">
                                <Image
                                    src="/certifications/logos/Custom Teal PDF File Badge.svg"
                                    alt="PDF"
                                    width={36}
                                    height={36}
                                    className="w-9 h-9 object-contain flex-shrink-0"
                                />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[12px] font-bold text-stone-800 whitespace-nowrap">
                                        {isArabic ? "ملف الشركة" : "Company Profile"}
                                    </span>
                                    <span className="text-[10px] text-stone-400 font-medium">12.4 MB</span>
                                </div>
                            </div>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-[#01a9a0] hover:bg-[#009e90] active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-full transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer"
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {isArabic ? "تحميل الملف" : "Download Profile"}
                                <svg className={`w-4 h-4 flex-shrink-0 ${isArabic ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Certifications;
