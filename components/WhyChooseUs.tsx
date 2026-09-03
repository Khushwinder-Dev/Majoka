"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-red-600 text-2xl font-medium mb-2"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Why Choose Us
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Unmatched Service, Superior Cars
            <br />& a Hassle-Free Experience
          </h2>
          <p
            className="text-red-600 text-base md:text-lg max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Choosing us means experiencing unparalleled luxury with reliable
            service, ensuring an exceptional driving experience in every detail
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Side Features */}
          <div className="space-y-8">
            {/* Diverse Range of Luxury Vehicles */}
            <div
              className="flex gap-4"
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-duration="1000"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-red-200">
                  <Image
                    src="/whychooseus/1.svg"
                    height={300}
                    width={300}
                    alt="Luxury Vehicles Icon"
                    className="w-full h-auto object-contain drop-shadow-2xl p-2"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Diverse Range of Luxury Vehicles
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our fleet includes an array of high-performance, comfortable,
                  and elegant cars tailored to different preferences.
                </p>
              </div>
            </div>

            {/* Reliable & Fast Service */}
            <div
              className="flex gap-4"
              data-aos="fade-right"
              data-aos-delay="600"
              data-aos-duration="1000"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-red-200">
                  <Image
                    src="/whychooseus/2.svg"
                    height={300}
                    width={300}
                    alt="Fast Service Icon"
                    className="w-full h-auto object-contain drop-shadow-2xl p-2"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Reliable & Fast Service
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enjoy a seamless rental experience, from an easy booking
                  process to prompt delivery at your preferred location.
                </p>
              </div>
            </div>
          </div>

          {/* Center Car Image */}
          <div
            className="flex justify-center items-center lg:px-4"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="1200"
          >
            <div className="relative w-full max-w-md transform hover:scale-105 transition-transform duration-500">
              <Image
                src="/redCar.png"
                height={300}
                width={300}
                alt="Luxury Red Jaguar"
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right Side Features */}
          <div className="space-y-8">
            {/* Flexible Rental Plans */}
            <div
              className="flex gap-4"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="1000"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-red-200">
                  <Image
                    src="/whychooseus/3.svg"
                    height={300}
                    width={300}
                    alt="Flexible Plans Icon"
                    className="w-full h-auto object-contain drop-shadow-2xl p-2"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Flexible Rental Plans
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We offer daily, weekly, and monthly rental options with
                  convenient payment solutions to fit your needs.
                </p>
              </div>
            </div>

            {/* Commitment to Excellence */}
            <div
              className="flex gap-4"
              data-aos="fade-left"
              data-aos-delay="600"
              data-aos-duration="1000"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-red-200">
                  <Image
                    src="/whychooseus/4.svg"
                    height={300}
                    width={300}
                    alt="Excellence Icon"
                    className="w-full h-auto object-contain drop-shadow-2xl p-3"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Commitment to Excellence
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We prioritize top-tier service and exceptional vehicle
                  quality, ensuring a smooth and luxurious driving experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
