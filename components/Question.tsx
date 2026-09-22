"use client";
import React, { useState } from "react";
import Image from "next/image";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";

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
      question: "What sets Taj Al Rahmah apart in design?",
      answer:
        "Taj Al Rahmah stands out through our innovative approach, experienced team, and commitment to quality. We combine traditional construction expertise with modern design principles to deliver exceptional results.",
    },
    {
      id: 3,
      question: "What is the typical budget for a construction project?",
      answer:
        "Project budgets vary significantly based on scope, materials, location, and complexity. We provide detailed estimates after initial consultation and site assessment to ensure transparency and accuracy.",
    },
    {
      id: 4,
      question: "Does Taj Al Rahmah prioritize sustainability?",
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
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3 mb-3">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#00c4b4]">
              FAQ
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#00c4b4] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#0B1C24] tracking-tight leading-[1.15]">
            Frequently Asked <span className="text-[#00c4b4]">Questions</span>
          </h2>

          <p className="mt-3.5 text-stone-500 text-xs sm:text-sm md:text-[14.5px] max-w-xl mx-auto leading-relaxed">
            Find clear answers to common questions about our engineered waterproofing systems, application methods, and warranties.
          </p>
        </div>

        {/* Single Column Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq) => (
            <FaqAccordionItem
              key={faq.id}
              number={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Question;
