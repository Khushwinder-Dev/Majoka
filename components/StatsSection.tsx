"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Briefcase, Calendar, Users } from "lucide-react";
import { useRef, useEffect } from "react";
import WhyChooseUs2 from "@/components/WhyCooseUs2";

interface StatItem {
  id: number;
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const StatsSection = () => {
  const stats: StatItem[] = [
    {
      id: 1,
      icon: MapPin,
      value: 20,
      suffix: "",
      label: "Locations",
    },
    {
      id: 2,
      icon: Briefcase,
      value: 30,
      suffix: "",
      label: "Projects",
    },
    {
      id: 3,
      icon: Calendar,
      value: 5,
      suffix: "",
      label: "Years of Experience",
    },
    {
      id: 4,
      icon: Users,
      value: 100,
      suffix: "+",
      label: "Architects",
    },
  ];

  console.log("");

  return (
    <>
      <div className="relative w-full h-[400px] lg:h-72 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-stats.webp" // Replace with your image path
            alt="Stats Background"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#01a9a0]/50 via-[#01a9a0]/50 to-[#01a9a0]/50" />
        </div>
    
        {/* Stats Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto h-full px-4 sm:px-6 md:px-12 lg:px-[90px]">
          <div className="h-full flex items-center justify-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 w-full !">
              {stats.map((stat, index) => (
                <StatCard key={stat.id} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <WhyChooseUs2 />
    </>
  );
};

// Animated Counter Component
const AnimatedCounter = ({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest: number) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

// Individual Stat Card Component
const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const Icon = stat.icon;

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 sm:gap-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      {/* Icon */}
      <motion.div
        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
      </motion.div>

      {/* Value */}
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>

      {/* Label */}
      <p className="text-sm sm:text-base lg:text-xl font-bold text-white text-center leading-tight">
        {stat.label}
      </p>
    </motion.div>
  );
};

export default StatsSection;
