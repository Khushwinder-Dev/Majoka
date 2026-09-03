import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function WorkSteps() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const steps = [
    {
      id: 1,
      title: "Evaluation & Sign In of the Contract",
      stepNumber: "Step 1",
    },
    {
      id: 2,
      title: "Preparation of the work plan",
      stepNumber: "Step 2",
    },
    {
      id: 3,
      title: "Implementations of quality works",
      stepNumber: "Step 3",
    },
    {
      id: 4,
      title: "Delivering the project to the customer",
      stepNumber: "Step 4",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold theme-text-main mb-4">
            Our Work Steps
          </h2>
        </div>

        {/* Main Image with Play Button */}
        {/* <div className="relative mb-16">
          <div className="relative w-full h-[500px] rounded-[40px] overflow-hidden shadow">
            <Image
              src="/landing/work/1.jpg"
              alt="Construction site with workers"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayVideo}
                className="w-20 h-20 bg-pink-950/30 hover:bg-pink-950/80 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow cursor-pointer"
              >
                <Image
                  src="/landing/work/2.svg"
                  alt="Play video"
                  height={30}
                  width={30}
                  className="object-cover h-20 w-auto"
                />
              </button>
            </div>
          </div>
        </div> */}

        {/* Steps Timeline */}
        <div className="relative">
          {/* Steps Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step Content */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-stone-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg font-bold text-stone-900">
                    {step.stepNumber}
                  </p>
                </div>

                {/* Step Circle */}
                <div className="w-7 h-7 theme-bg-main rounded-full border-4 border-stone-300 relative z-10"></div>

                {/* Connecting Line - Hidden on mobile, visible on larger screens */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-[85%] left-0 w-full h-[2px] bg-stone-400 transform translate-x-1/2"
                    style={{
                      background:
                        "repeating-linear-gradient(to right, #9ca3af 0, #9ca3af 8px, transparent 8px, transparent 16px)",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500/90 hover:bg-red-400/90 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/mbwuj58UEPg?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
