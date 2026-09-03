"use client";
import React, { useState } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialData {
  id: number;
  name: string;
  title: string;
  image: string;
  testimonial: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 ease-in-out hover:shadow hover:scale-105 hover:-translate-y-2 cursor-pointer group">
      <div className="relative h-[550px] bg-[#98D1EC]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[#333] z-0">
          <Image
            height={800}
            width={800}
            src={testimonial.image}
            alt="Testimonial background"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#01a9a0] to-[#01a9a0]/10" />

        {/* Content - Now at Bottom */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
          <div className="flex justify-end items-start mb-4">
            <Image
              height={800}
              width={800}
              src="/colon.svg"
              alt="Quote icon"
              className="w-7 h-7 object-cover"
            />
          </div>

          <h3 className="text-xl font-medium text-[#E9F5FB] mb-6">
            {testimonial.title}
          </h3>

          <p className="text-[#E9F5FB] text-sm md:text-base mb-8">
            {testimonial.testimonial}
          </p>

          <div className="flex items-center">
            <div className="w-5 h-[1px] bg-white"></div>
            <span className="ml-2 text-white opacity-90 text-sm">
              {testimonial.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Update cards per view based on screen size
  React.useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(3); // Desktop: 3 cards
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const testimonialsData: TestimonialData[] = [
    {
      id: 1,
      name: "Yousuf Noor",
      title:
        "We are impressed by their ability to meet our specific needs and their strong customer service. We appreciated the high level of customer services.",
      image: "/clientt/1.jpeg",
      testimonial: "",
    },
    {
      id: 2,
      name: "Stella Smith, New York",
      title:
        "Majoka Engineering delivered exactly what we expected — professional work, timely completion, and great communication from start to finish.",
      image: "/clientt/2.jpeg",
      testimonial: "",
    },
    {
      id: 3,
      name: "Abdur Gaffar, Dubai",
      title:
        "Their technical expertise and dedication to quality truly set them apart. Every step of our project was handled with professionalism and care.",
      image: "/clientt/3.jpeg",
      testimonial: "",
    },
    {
      id: 4,
      name: "Muhammad Salim, Dubai",
      title:
        "Outstanding engineering solutions with exceptional attention to detail. Their team delivered beyond our expectations with professional service throughout.",
      image: "/clientt/5.jpeg",
      testimonial: "",
    },
    {
      id: 5,
      name: "Ahmed Hassan, Dubai",
      title:
        "Reliable and efficient service delivery. Majoka Engineering consistently provides high-quality work with excellent project management and communication.",
      image: "/clientt/4.jpeg",
      testimonial: "",
    },
    {
      id: 6,
      name: "Milon Islam, Dubai",
      title:
        "Their technical expertise and commitment to excellence made our project a complete success. Highly recommend their engineering services.",
      image: "/clientt/3.jpeg",
      testimonial: "",
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, testimonialsData.length - cardsPerView);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, testimonialsData.length - cardsPerView);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  return (
    <div className="bg-white flex flex-col items-center w-full py-20 gap-16 px-4 md:px-8 lg:px-8">
      <div className="flex flex-col items-center gap-4 max-w-xl mx-auto text-center">
        <span className="text-4xl theme-text-main font-semibold">
          Client Testimonials
        </span>

        <p className="text-stone-900 text-xl!">
          Discover how we can elevate your experience
        </p>
      </div>

      <div className="relative w-full max-w-[1800px] mx-auto rounded-xl -mt-6">
        <div className="overflow-hidden px-4 py-6 ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              gap: cardsPerView === 1 ? "0px" : "24px",
            }}
          >
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0"
                style={{
                  width:
                    cardsPerView === 1
                      ? "100%"
                      : cardsPerView === 2
                      ? "calc((100% - 24px) / 2)"
                      : "calc((100% - 48px) / 3)",
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="w-[50px] h-[50px] rounded-full bg-[#01a9a0] hover:bg-[#01a9a0]/80 flex items-center justify-center transform cursor-pointer"
          >
            <Image
              src="/arrowL.svg"
              alt="Previous"
              width={24}
              height={24}
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="w-[50px] h-[50px] rounded-full bg-[#01a9a0] hover:bg-[#01a9a0]/80 flex items-center justify-center transform cursor-pointer"
          >
            <Image
              src="/arrowR.svg"
              alt="Previous"
              width={24}
              height={24}
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out hover:scale-125 active:scale-90 ${
                currentIndex === index
                  ? "bg-[#10b981] shadow-lg scale-110"
                  : isAnimating
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#01a9a0]/30 hover:bg-[#10b981]/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
