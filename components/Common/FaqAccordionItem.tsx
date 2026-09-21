"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

export interface FaqAccordionItemProps {
  id?: number | string;
  number?: string | number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isArabic?: boolean;
  className?: string;
}

export default function FaqAccordionItem({
  number,
  question,
  answer,
  isOpen,
  onToggle,
  isArabic = false,
  className = "",
}: FaqAccordionItemProps) {
  const formattedNum =
    number !== undefined
      ? typeof number === "number"
        ? String(number).padStart(2, "0")
        : number
      : undefined;

  return (
    <div
      className={`rounded-2xl bg-white border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.05)] overflow-hidden transition-all duration-300 ${className}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-4 sm:py-[18px] text-left rtl:text-right cursor-pointer group"
      >
        {formattedNum && (
          <span className="text-sm sm:text-base font-semibold text-stone-300 tabular-nums pt-0.5 shrink-0 transition-colors group-hover:text-[#01a9a0]">
            {formattedNum}
          </span>
        )}
        <span className="flex-1 text-[15px] sm:text-base font-extrabold text-[#0B1C24] leading-snug">
          {question}
        </span>
        <span
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
            isOpen
              ? "bg-[#01a9a0] text-white shadow-xs"
              : "border border-[#01a9a0]/40 text-[#01a9a0] group-hover:border-[#01a9a0] group-hover:bg-[#01a9a0]/5"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`px-4 sm:px-5 pb-4 sm:pb-5 ${
              formattedNum ? "ps-10 sm:ps-[3.25rem]" : "ps-4 sm:ps-5"
            } pe-12 text-sm text-stone-500 leading-relaxed`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
