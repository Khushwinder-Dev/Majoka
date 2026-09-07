"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleReadMore = (serviceId: number) => {
    router.push(`/services-details?service=${serviceId}`);
  };

  const services = t.services.items.map((item, idx) => {
    const originals = [
      { id:1, icon:"/landing/services/6.svg", featured:true },
      { id:2, icon:"/landing/services/1.svg", featured:true },
      { id:3, icon:"/landing/services/2.svg", featured:true },
      { id:4, icon:"/landing/services/3.svg", featured:true },
      { id:5, icon:"/landing/services/4.svg", featured:true },
      { id:6, icon:"/landing/services/5.svg", featured:true },
    ];
    return { ...originals[idx], title:item.title, description:item.description };
  });

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold theme-text-main mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-stone-900 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-2xl hover:scale-105 border border-stone-400 bg-white hover:bg-[#01a9a0] cursor-pointer flex flex-col h-full"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#01a9a0]/80 group-hover:bg-white/20 transition-all duration-500">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={28}
                    height={28}
                    className="filter brightness-0 invert transition-all duration-500"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-white transition-colors duration-500">
                {service.title}
              </h3>

              {/* Description */}
              <div className="flex-grow">
                <div className="flex-grow">
                  <p className="text-sm leading-relaxed mb-6 text-gray-800 group-hover:text-white/90 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="mt-auto">
                <button
                  onClick={() => handleReadMore(service.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-[#01a9a0] group-hover:text-white cursor-pointer text-sm"
                >
                  {t.services.getStarted}
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
