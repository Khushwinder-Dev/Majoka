import React from "react";
import Image from "next/image";

const JoinTeam = () => {
  return (
    <div className="relative bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content Section */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold theme-text-main mb-6 leading-tight">
              {/* Build Your Future with Us: Careers in Construction */}
              Careers at Majoka
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {/* Join our dynamic construction team and help us build a brighter
              future! At BuildRight, we strive to be the leading construction
              company, delivering exceptional projects and fostering talent.
              Become part of our mission today! */}
              At Majoka, we are committed to building not just structures, but
              also careers. We are always on the lookout for talented and
              passionate individuals who share our dedication to excellence,
              innovation, and safety in civil construction. Join our team and
              become part of a dynamic and growing company that values your
              skills and aspirations.
            </p>
            {/* <button className="bg-primary hover:bg-primary/80 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 shadow-lg cursor-pointer">
              Join Our Core Team
            </button> */}
          </div>

          {/* Right Image Section */}
          <div className="order-1 lg:order-2">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/meow.jpg"
                alt="Construction team working on site"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
