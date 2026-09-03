import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <section className="relative w-full h-[728px] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/common.jpg"
          alt="About Us Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/25 to-red-700/90"></div>
      </div>

      {/* Logo watermark (optional - if you have a logo) */}
      <div className="absolute w-[692px] h-[315px] left-[374px] top-[142px] opacity-10 pointer-events-none">
        {/* Uncomment if you have a logo */}
        {/* <Image
          src="/logo.png"
          alt="Logo Watermark"
          fill
          className="object-contain"
        /> */}
      </div>

      {/* Content container */}
      <div className="relative px-4 sm:px-8 md:px-[120px] py-[179px] h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold font-[Anek_Malayalam] text-white text-center tracking-[-0.4px]">
              Conatct Us
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
