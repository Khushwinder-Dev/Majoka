import React from "react";
import Image from "next/image";

const DownloadApp = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-300/40 via-red-400/90 to-red-800/90 p-8 lg:p-12 shadow">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Phone Images */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative">
                {/* Phone 1 - Background */}
                <div className="relative z-10 transform rotate-12">
                  <div className="w-[200px] h-[400px] bg-white rounded-[30px] shadow-2xl p-2">
                    <div className="w-full h-full bg-gray-100 rounded-[25px] overflow-hidden">
                      {/* Phone Screen Content */}
                      <Image
                        src="/download/1.png"
                        alt="Phone 1"
                        width={200}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone 2 - Foreground */}
                <div className="absolute top-8 left-16 z-20 transform -rotate-6">
                  <div className="w-[200px] h-[400px] bg-white rounded-[30px] shadow-2xl p-2">
                    <div className="w-full h-full bg-gray-100 rounded-[25px] overflow-hidden">
                      {/* Phone Screen Content */}
                      <Image
                        src="/download/2.png"
                        alt="Phone 1"
                        width={200}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-rose-950 leading-tight">
                  Download our app
                </h2>
                <p className="text-lg lg:text-xl text-black/80 max-w-md mx-auto lg:mx-0">
                  Explore our wide range of car rental service even in your
                  smartphone easily
                </p>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* App Store Button */}
                <button className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 hover:bg-black/30 transition-all duration-300 group cursor-pointer">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/80">Download On The</div>
                    <div className="text-sm font-semibold text-white">
                      App Store
                    </div>
                  </div>
                </button>

                {/* Google Play Button */}
                <button className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 hover:bg-black/30 transition-all duration-300 group cursor-pointer">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/80">Download On The</div>
                    <div className="text-sm font-semibold text-white">
                      Google Play
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
