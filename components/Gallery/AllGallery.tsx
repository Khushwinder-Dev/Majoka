"use client";
import React, { useState } from "react";
import Image from "next/image";

const AllGallery = () => {
  const [visibleImages, setVisibleImages] = useState(6);

  // Gallery images data
  const galleryImages = [
    { id: 1, src: "/Catagory/Calibration.png", alt: "Construction Project 1" },
    { id: 2, src: "/Catagory/Force.png", alt: "Construction Project 2" },
    { id: 3, src: "/Catagory/Inspection.png", alt: "Construction Project 3" },
    {
      id: 4,
      src: "/Catagory/Gauge-Dial-Digital.png",
      alt: "Construction Project 4",
    },
    {
      id: 5,
      src: "/Catagory/Pressure Systems.png",
      alt: "Construction Project 5",
    },
    { id: 6, src: "/Catagory/Weights.png", alt: "Construction Project 6" },
  ];

  const loadMoreImages = () => {
    setVisibleImages((prev) => Math.min(prev + 6, galleryImages.length));
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Explore Our Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Successfully delivered six significant construction and
            infrastructure projects for Saudi Aramco and SCECO, amounting to SR
            18 million, all completed on schedule in Dhahran, Jubail, and
            Rastanura.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* First Row - Large image spans 2 columns on larger screens */}
          <div className="lg:col-span-2 md:col-span-1">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={galleryImages[0]?.src || "/gallery/1.jpg"}
                alt={galleryImages[0]?.alt || "Construction Project"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="lg:col-span-1 md:col-span-1">
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={galleryImages[1]?.src || "/gallery/2.jpg"}
                alt={galleryImages[1]?.alt || "Construction Project"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="lg:col-span-1 md:col-span-1">
            <div className="relative h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={galleryImages[2]?.src || "/gallery/3.jpg"}
                alt={galleryImages[2]?.alt || "Construction Project"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-1">
            <div className="relative h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={galleryImages[3]?.src || "/gallery/4.jpg"}
                alt={galleryImages[3]?.alt || "Construction Project"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Third Row */}
          {visibleImages > 4 && (
            <>
              <div className="lg:col-span-2 md:col-span-1">
                <div className="relative h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={galleryImages[4]?.src || "/gallery/5.jpg"}
                    alt={galleryImages[4]?.alt || "Construction Project"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="lg:col-span-1 md:col-span-1">
                <div className="relative h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={galleryImages[5]?.src || "/gallery/6.jpg"}
                    alt={galleryImages[5]?.alt || "Construction Project"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Load More Button */}
        {/* {visibleImages <= galleryImages.length && (
          <div className="text-center">
            <button
              onClick={loadMoreImages}
              className="bg-pink-950 hover:bg-pink-800 text-white font-semibold py-3 px-14 rounded-full transition-colors duration-300 shadow-lg cursor-pointer"
            >
              Load More
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AllGallery;
