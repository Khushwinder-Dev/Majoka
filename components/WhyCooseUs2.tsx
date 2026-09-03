"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Play, X } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
}

const WhyChooseUsSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features: Feature[] = [
    {
      id: 1,
      title: "Unmatched Expertise",
      description:
        "With years of experience across residential, commercial, and industrial projects, we bring proven knowledge and innovative techniques to every build.",
    },
    {
      id: 2,
      title: "Commitment to Quality",
      description:
        "From materials to craftsmanship, we follow international standards to ensure long-lasting durability and top-tier finishing.",
    },
    {
      id: 3,
      title: "On-Time Delivery",
      description:
        "We value your time. Our structured planning and efficient project management guarantee deadlines are met without compromise.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Section - Images */}
        <motion.div
          className="flex-1 lg:max-w-[50%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageVariants}
        >
          <div className="relative">
            {/* Background Decoration - Changed to pink-950/90 */}
            <div className="absolute -z-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 top-0 left-0 bg-[#01a9a0]/90" />

            {/* Main Image */}
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[500px]">
              <Image
                src="/why-choose-us.png"
                alt="Why Choose Us"
                fill
                className="object-cover rounded-tl-[150px] lg:rounded-tl-[300px]"
                priority
              />
            </div>

            {/* Video Thumbnail with Play Button */}
            <motion.div
              className="absolute bottom-0 right-0 lg:bottom-[-50px] lg:right-[-80px] w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="relative w-full h-full rounded-[20px] border-4 sm:border-[5px] border-white shadow-2xl overflow-hidden cursor-pointer group"
                onClick={() => setIsVideoOpen(true)}
              >
                <Image
                  src="/why-choose-us-2.png"
                  alt="Watch Video"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play
                      className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                      fill="white"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section - Why Choose Us Content */}
        <motion.div
          className="flex-1 lg:max-w-[45%] pr-4 pl-12 pt-12 sm:pr-6 md:pr-12 lg:pr-20 space-y-6 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl font-black theme-text-main"
            variants={featureVariants}
          >
            Why Choose Us?
          </motion.h2>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="space-y-3"
                variants={featureVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Feature Title with Checkmark */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-700 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Check
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {feature.title}
                  </h3>
                </div>

                {/* Feature Description */}
                <p className="text-base sm:text-lg lg:text-xl text-stone-900/90 leading-relaxed pl-8 sm:pl-9">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div variants={featureVariants}>
            <Link href="/about-us">
              <motion.button
                className="px-8 sm:px-10 py-3 sm:py-4 theme-bg-main hover:text-[#01a9a0] rounded-[30px] text-indigo-50 text-lg sm:text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer my-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            {/* Video Container */}
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - positioned relative to video */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 -right-2 z-10 w-10 h-10 bg-red-500/90 hover:bg-red-400/90 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-200 cursor-pointer"
              >
                ×
              </button>
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/l55HVcMhVsE?autoplay=1"
                title="Company Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhyChooseUsSection;
