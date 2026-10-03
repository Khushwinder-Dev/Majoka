"use client";

import React from "react";
import { Check } from "lucide-react";

interface InputValidationTickProps {
  isValid: boolean;
  isArabic?: boolean;
  className?: string;
}

export function InputValidationTick({
  isValid,
  isArabic = false,
  className = "",
}: InputValidationTickProps) {
  if (!isValid) return null;
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center animate-in fade-in zoom-in-75 duration-150 ${
        isArabic ? "left-4 sm:left-4.5" : "right-4 sm:right-4.5"
      } ${className}`}
      aria-hidden="true"
    >
      <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
    </div>
  );
}

export const isValidEmail = (v?: string | null): boolean =>
  Boolean(v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()));

export const isValidPhone = (v?: string | null): boolean =>
  Boolean(v && v.trim().replace(/\D/g, "").length >= 7);

export const isValidText = (v?: string | null, minLength = 2): boolean =>
  Boolean(v && v.trim().length >= minLength);

export const getFieldError = (
  fieldName: string,
  value?: string | null,
  isArabic = false
): string => {
  const val = (value || "").trim();
  switch (fieldName) {
    case "name":
    case "fullName":
    case "contactPerson":
    case "firstName":
      if (!val) return isArabic ? "يرجى إدخال الاسم." : "Your name is incomplete.";
      if (val.length < 2) return isArabic ? "الاسم قصير جداً." : "Name is too short.";
      return "";
    case "phone":
    case "phoneNumber":
      if (!val) return isArabic ? "يرجى إدخال رقم الهاتف." : "Your phone number is incomplete.";
      if (!isValidPhone(val)) return isArabic ? "رقم الهاتف غير صالح." : "Your phone number is invalid.";
      return "";
    case "email":
    case "emailAddress":
      if (!val) return isArabic ? "يرجى إدخال البريد الإلكتروني." : "Your email address is incomplete.";
      if (!isValidEmail(val)) return isArabic ? "عنوان البريد الإلكتروني غير صالح." : "Your email address is invalid.";
      return "";
    case "message":
    case "coverLetter":
    case "notes":
    case "comment":
    case "review":
      if (!val) return isArabic ? "يرجى كتابة الرسالة أو التعليق." : "This field is required.";
      return "";
    case "subject":
      if (!val) return isArabic ? "يرجى إدخال الموضوع أو الخدمة المطلوبة." : "Subject is required.";
      return "";
    case "service":
      if (!val) return isArabic ? "يرجى اختيار الخدمة." : "Please select a service.";
      return "";
    case "projectType":
      if (!val) return isArabic ? "يرجى اختيار نوع المشروع." : "Please select a project type.";
      return "";
    case "company":
    case "companyName":
      if (!val) return isArabic ? "يرجى إدخال اسم الشركة." : "Company name is required.";
      return "";
    case "rating":
      if (!val || Number(val) <= 0) return isArabic ? "يرجى اختيار التقييم." : "Please select a rating.";
      return "";
    default:
      if (!val) return isArabic ? "هذا الحقل مطلوب." : "This field is required.";
      return "";
  }
};

export function FormFieldError({
  error,
  className = "px-4",
}: {
  error?: string;
  className?: string;
}) {
  if (!error) return null;
  return (
    <p
      className={`text-xs text-red-500 mt-1.5 font-normal text-start animate-in fade-in duration-150 ${className}`}
      role="alert"
    >
      {error}
    </p>
  );
}
