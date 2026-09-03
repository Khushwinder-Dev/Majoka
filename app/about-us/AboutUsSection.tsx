"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const AboutUsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-between">
          {/* Left Content Section */}
          <div className="w-full flex flex-col gap-7" data-aos="fade-right">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold theme-text-main">
              CEO Message
            </h2>

            {/* CEO Quotation */}
            <p className="text-justify text-stone-600 text-base sm:text-lg lg:text-3xl font-normal leading-7 sm:leading-8 lg:leading-9 italic relative">
              <span className="text-5xl theme-text-main font-serif absolute -top-6 left-0">
                “
              </span>
              <span className="pl-6 block">
                At Majoka, our commitment to excellence extends beyond technical
                expertise to encompass exceptional customer service and
                unwavering integrity. When you choose Majoka, you’re choosing a
                trusted ally dedicated to the success of your project and the
                safety of your community.
              </span>
              <span className="text-5xl theme-text-main font-serif absolute -bottom-4 right-0">
                ”
              </span>
            </p>

            {/* CEO Name */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-stone-900">
                Yousuf Noor Hossain
              </h3>
              <p className="text-stone-600 text-base sm:text-lg lg:text-xl">
                Chief Executive Officer
              </p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full flex justify-center" data-aos="fade-left">
            <div className="w-full max-w-[500px] aspect-square rounded-[20px] overflow-hidden relative">
              <Image
                src="/ceo.jpeg"
                alt="CEO Message"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
