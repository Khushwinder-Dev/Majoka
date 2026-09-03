"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 100,
    });
  }, []);

  const features = [
    {
      number: "1",
      title: "Diverse Range of\nLuxury Vehicles",
      description:
        "Our fleet includes an array of high performance, comfortable, and elegant cars tailored to different preferences.",
    },
    {
      number: "2",
      title: "Reliable & Fast\nService",
      description:
        "Enjoy a seamless rental experience, from an easy booking process to prompt delivery at your preferred location.",
    },
    {
      number: "3",
      title: "Flexible Rental\nPlans",
      description:
        "We offer daily, weekly, and monthly rental options with convenient payment solutions to fit your needs",
    },
    {
      number: "4",
      title: "Commitment to\nExcellence",
      description:
        "We prioritize top-tier service and exceptional vehicle quality, ensuring a smooth and luxurious driving experience",
    },
  ];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        {/* Header Section */}
        <div
          className="max-w-[884px] mx-auto mb-10 md:mb-16"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          <div className="text-center mb-4">
            <h3 className="text-red-700 text-2xl font-normal font-anek leading-loose">
              Why Choose Us
            </h3>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-rose-950 text-3xl md:text-4xl font-bold font-anek leading-tight md:leading-[56px]">
              Unmatched Service, Superior Cars
              <br />& a Hassle-Free Experience
            </h2>
          </div>
          <div className="text-center">
            <p className="text-rose-950/80 text-base md:text-lg font-normal font-anek leading-normal">
              Choosing us means experiencing unparalleled luxury with
              <br className="hidden md:block" />
              reliable service, ensuring an exceptional driving experience in
              <br className="hidden md:block" />
              every detail.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              className="group"
            >
              <div className="relative bg-rose-100 rounded-xl border border-red-300 p-8 md:p-10 min-h-[280px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                {/* Number Badge */}
                <div className="absolute top-8 left-8">
                  <div className="bg-red-200 border border-white/10 rounded-[20px] px-5 py-3">
                    <span className="text-red-700 text-base font-medium font-anek">
                      {feature.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-16 flex flex-col gap-6">
                  {/* Title */}
                  <h3 className="text-red-500 text-2xl md:text-3xl font-medium font-anek leading-tight whitespace-pre-line transition-transform duration-300 group-hover:scale-105">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-rose-950/70 text-base font-normal font-anek leading-tight">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
