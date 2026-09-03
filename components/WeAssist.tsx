import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getAssetPath } from "@/lib/basePath";

const ConstructionMaterialsSection = () => {
  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center theme-text-main mb-16 px-4">
          We Assist in Choosing the Perfect Materials for Your Project
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 - Engineering Techniques */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <Image
                src={"/landing/assist/1.svg"}
                alt="Engineering Techniques"
                width={100}
                height={100}
                className="w-16 h-16"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Engineering Techniques
            </h2>

            <p className="text-gray-600 text-justify mb-8 flex-grow leading-relaxed">
              Explore innovative engineering techniques that enhance
              construction efficiency and safety. From advanced materials to
              cutting-edge project management tools, these methods streamline
              processes and ensure high-quality results.
            </p>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 rounded-full text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300 self-start cursor-pointer"
            >
              View More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Card 2 - Project Management (with background image) */}
          <div className="relative bg-gray-800 rounded-3xl overflow-hidden p-8 flex flex-col hover:shadow-lg transition-shadow duration-300 min-h-[400px]">
            {/* Background Image Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{
                backgroundImage: `url('${getAssetPath("/landing/assist/lol.jpg")}')`,
              }}
            ></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6">
                <Image
                  src={"/landing/assist/2.svg"}
                  alt="Engineering Techniques"
                  width={100}
                  height={100}
                  className="w-16 h-16"
                />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                Project Management
              </h2>

              <p className="text-gray-200 text-justify mb-8 flex-grow leading-relaxed">
                Delve into sustainable design practices that prioritize
                environmental responsibility and resource conservation. Learn
                about green building materials, energy-efficient systems, and
                strategies for reducing ecological footprints in construction
                projects.
              </p>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 theme-bg-main rounded-full text-white font-semibold hover:bg-red-800 transition-colors duration-300 self-start cursor-pointer"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Card 3 - Financial Results */}
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <Image
                src={"/landing/assist/1.svg"}
                alt="Engineering Techniques"
                width={100}
                height={100}
                className="w-16 h-16"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Financial Results
            </h2>

            <p className="text-gray-600 text-justify mb-8 flex-grow leading-relaxed">
              Investigate the role of smart technology in modern construction,
              including IoT applications, automation, and data analytics. These
              innovations improve project monitoring, enhance communication, and
              can lead to smarter, safer buildings.
            </p>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 rounded-full text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300 self-start cursor-pointer"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionMaterialsSection;
