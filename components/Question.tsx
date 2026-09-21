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
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
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
      </div>
    </section>
  );
};

export default Question;
