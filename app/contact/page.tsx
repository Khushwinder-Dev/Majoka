"use client";

import React from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import Contact from "../../components/contact/contact";
import Map from "../../components/contact/Map";
import FaqSection, { FaqItem } from "@/components/Common/FaqSection";
import { useLanguage } from "@/context/LanguageContext";

const CONTACT_FAQS: FaqItem[] = [
  {
    id: 1,
    question: "How quickly can a technical engineer conduct an on-site survey?",
    questionAr: "ما هي السرعة التي يمكن لمهندس فني من خلالها إجراء معاينة موقعية؟",
    answer:
      "Our engineering team typically schedules and conducts comprehensive on-site technical surveys across Dubai, Abu Dhabi, and the Northern Emirates within 24 to 48 hours of your initial inquiry.",
    answerAr:
      "يقوم فريقنا الهندسي بجدولة وإجراء معاينات فنية شاملة للموقع في دبي وأبوظبي والإمارات الشمالية خلال 24 إلى 48 ساعة من تلقي الطلب.",
  },
  {
    id: 2,
    question: "What information is needed to receive an accurate project quotation?",
    questionAr: "ما هي المعلومات المطلوبة للحصول على عرض سعر دقيق للمشروع؟",
    answer:
      "To provide an itemized BOQ estimate, we request structural drawings (CAD/PDF), area square meterage, substrate condition details, site location, and any consultant waterproofing specifications.",
    answerAr:
      "لتقديم تقدير تفصيلي لجدول الكميات، نحتاج إلى المخططات الإنشائية، ومساحة المسطحات بالمتر المربع، وتفاصيل حالة الأسطح، وموقع المشروع، ومواصفات الاستشاري إن وجدت.",
  },
  {
    id: 3,
    question: "Do you offer emergency leak repair and water ingress inspections?",
    questionAr: "هل تقدمون خدمات فحص وإصلاح تسربات المياه الطارئة؟",
    answer:
      "Yes, we provide rapid-response diagnostic inspections utilizing infrared thermography and electronic moisture meters to locate concealed leaks in basements, roofs, and expansion joints.",
    answerAr:
      "نعم، نقدم خدمات فحص تشخيصي سريعة الاستجابة باستخدام التصوير الحراري بأشعة تحت الحمراء وأجهزة قياس الرطوبة لتحديد مواقع التسربات في الأقبية والأسطح وفواصل التمدد.",
  },
  {
    id: 4,
    question: "Where are Taj Al Rahmah offices and operations centers located?",
    questionAr: "أين تقع مكاتب ومراكز عمليات تاج الرحمة في الإمارات؟",
    answer:
      "Our main office and equipment staging facility is located in Dubai, UAE, serving construction projects, industrial facilities, and residential complexes throughout the United Arab Emirates.",
    answerAr:
      "يقع مكتبنا الرئيسي ومستودعات المعدات في دبي، ونخدم مشاريع البناء والمنشآت الصناعية والمجمعات السكنية في جميع أنحاء دولة الإمارات العربية المتحدة.",
  },
  {
    id: 5,
    question: "Are your site personnel and methods approved by UAE municipal authorities?",
    questionAr: "هل كوادركم الميدانية وأساليب عملكم معتمدة لدى بلديات الإمارات؟",
    answer:
      "Yes, our engineers, supervisors, and application crews are fully licensed, safety-inducted, and strictly compliant with Dubai Municipality, Trakhees, and UAE Civil Defense codes.",
    answerAr:
      "نعم، مهندسونا ومشرفونا وفرق التطبيق لدينا مرخصون بالكامل ومدربون على أعلى معايير السلامة وملتزمون بضوابط بلدية دبي وتراخيص والدفاع المدني.",
  },
  {
    id: 6,
    question: "What warranty duration is provided upon project completion?",
    questionAr: "ما هي مدة الضمان المقدمة بعد اكتمال المشروع؟",
    answer:
      "Depending on the selected system and specifications, we issue 10, 15, or 25-year official warranties backed jointly by Taj Al Rahmah and premier multinational chemical manufacturers.",
    answerAr:
      "بحسب النظام والمواصفات المختارة، نقدم ضمانات رسمية لمدة 10 أو 15 أو 25 عاماً مدعومة بشكل مشترك من شركة تاج الرحمة وكبرى الشركات المصنعة عالمياً.",
  },
];

export default function ContactPage() {
  const { isArabic } = useLanguage();

  return (
    <div>
      <CommonHeader
        title="Contact Us to Start Your Project"
        breadcrumb="Contact"
        imagePath="/banners/Contact_.png"
      />
      <Contact />
      <Map />
      <FaqSection
        faqs={CONTACT_FAQS}
        isArabic={isArabic}
        subtitle="Find answers to common questions about consultations, quotations, site visits, and project support."
        subtitleAr="إجابات واضحة على الأسئلة الشائعة حول الاستشارات، عروض الأسعار، المعاينات الميدانية ودعم المشاريع."
      />
    </div>
  );
}
