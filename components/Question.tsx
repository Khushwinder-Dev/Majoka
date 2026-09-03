"use client";
import React, { useState } from "react";
import Image from "next/image";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Question = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How Long Does a Design Project Take?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 2,
      question: "What sets Majoka Construction apart in design?",
      answer:
        "Majoka Construction stands out through our innovative approach, experienced team, and commitment to quality. We combine traditional construction expertise with modern design principles to deliver exceptional results.",
    },
    {
      id: 3,
      question: "What is the typical budget for a construction project?",
      answer:
        "Project budgets vary significantly based on scope, materials, location, and complexity. We provide detailed estimates after initial consultation and site assessment to ensure transparency and accuracy.",
    },
    {
      id: 4,
      question: "Does Majoka prioritize sustainability?",
      answer:
        "Yes, sustainability is at the core of our operations. We use eco-friendly materials, implement energy-efficient solutions, and follow green building practices to minimize environmental impact.",
    },
    {
      id: 5,
      question: "What construction software do you prefer?",
      answer:
        "We utilize industry-leading software including AutoCAD, Revit, Project management tools, and specialized construction management platforms to ensure precision and efficiency throughout the project lifecycle.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">FAQs</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Side - Images Grid with Stats Badge */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Top Row - Construction Site + Stats Badge */}
            <div className="flex gap-4 items-end">
              {/* Construction Site with Cranes */}
              <div className="w-auto h-auto overflow-hidden relative flex-shrink-0">
                <Image
                  src="/faq/1.png"
                  alt="Construction site with cranes"
                  height={400}
                  width={500}
                  className="object-cover h-40 w-auto"
                />
              </div>

              {/* Stats Badge with curved edge */}
              <div className="w-1/2 h-60 bg-pink-950 text-white flex flex-col items-center justify-center shadow-lg relative overflow-hidden rounded-tr-[100px]">
                <p className="text-xl font-semibold mb-2">Project Done</p>
                <p className="text-6xl font-bold">200+</p>
              </div>
            </div>

            {/* Bottom - Worker with Plans Full Width */}
            <div className="w-full h-full overflow-hidden relative rounded-tl-3xl">
              <Image
                src="/faq/2.png"
                alt="Construction worker reviewing plans"
                width={500}
                height={400}
                className="object-cover rounded-tl-3xl"
              />
            </div>
          </div>

          {/* Right Side - FAQ Questions */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-indigo-50/40 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-pink-950 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full border border-pink-950 flex items-center justify-center transition-transform duration-200 ${
                        openFAQ === faq.id ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-stone-900/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Question;
