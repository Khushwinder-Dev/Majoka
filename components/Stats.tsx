import Image from "next/image";
import React from "react";

export default function Stats() {
  return (
    <div className="">
      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 bg-gradient-to-r from-red-800 theme-bg-main px-3 sm:px-4 py-4 sm:py-6 shadow ">
        <div className="flex flex-col items-center text-white">
          <Image
            src="/landing/stats/1.svg"
            alt="svg"
            height={40}
            width={40}
            className="mb-2 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          />
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            20
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
            Locations
          </div>
        </div>

        <div className="flex flex-col items-center text-white">
          <Image
            src="/landing/stats/2.svg"
            alt="svg"
            height={40}
            width={40}
            className="mb-2 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          />
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            30
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
            Projects
          </div>
        </div>

        <div className="flex flex-col items-center text-white">
          <Image
            src="/landing/stats/3.svg"
            alt="svg"
            height={40}
            width={40}
            className="mb-2 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          />
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            5
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
            Years of Experience
          </div>
        </div>

        <div className="flex flex-col items-center text-white">
          <Image
            src="/landing/stats/4.svg"
            alt="svg"
            height={40}
            width={40}
            className="mb-2 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          />
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            100+
          </div>
          <div className="text-xs sm:text-sm md:text-base lg:text-lg text-center">
            Architects
          </div>
        </div>
      </div>
    </div>
  );
}
