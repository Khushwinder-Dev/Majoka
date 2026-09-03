import React from "react";
import Image from "next/image";

const AboutHeader = () => {
  return (
    <div className="relative w-full h-[420px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/crane.png"
          alt="Construction crane background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-16">
          <div className="max-w-[489px] ml-0 md:ml-[120px] mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#e9f5fb] mb-2 tracking-[-0.4px]">
              About Our Company
            </h1>
            <p className="text-lg md:text-2xl text-[#e9f5fb]">Home / About</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
