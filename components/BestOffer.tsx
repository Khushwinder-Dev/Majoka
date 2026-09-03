import Image from "next/image";
import React from "react";

const BestOfferSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-rose-950 mb-8">
          Best Offer for Car Rental
        </h2>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Offer Card */}
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 min-h-[280px] flex flex-col justify-between bg-gradient-to-b from-rose-100 to-red-800 shadow border border-red-300">
            <div className="relative z-10">
              <p className="text-gray-800 text-sm md:text-base font-medium mb-2">
                For Whole Week
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Save upto 35% for
                <br />a whole week of car rental
              </h3>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg cursor-pointer">
                Order Now
              </button>
            </div>

            {/* Car Image */}
            <div className="absolute -right-20 md:-right-34 bottom-0 w-1/2 md:w-[500px]">
              <Image
                src="/bestOffer/bestOfferr.png"
                height={600}
                width={600}
                alt="Black BMW Car"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Monthly Offer Card */}
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 min-h-[280px] flex flex-col justify-between bg-gradient-to-b from-rose-100 to-red-800 shadow border border-red-300">
            <div className="relative z-10">
              <p className="text-gray-800 text-sm md:text-base font-medium mb-2">
                For Whole Month
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Save upto 30% for
                <br />a whole month of car rental
              </h3>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg cursor-pointer">
                Order Now
              </button>
            </div>

            {/* Car Image */}
            <div className="absolute -right-20 md:-right-34 bottom-0 w-1/2 md:w-[400px]">
              <Image
                src="/bestOffer/bestOffer.png"
                height={600}
                width={600}
                alt="Black BMW Car"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestOfferSection;
