"use client";

import React from "react";
import AboutUsSection from "./AboutUsSection";
import OurMission from "./OurMission";
import CommonHeader from "../../components/Common/CommonHeader";
import MeetOurTeam from "../../components/Common/MeetOurTeam";
import ClientTestimonials from "@/components/ClientTestimonials";
import FaqSection, { FaqItem } from "@/components/Common/FaqSection";
import { useLanguage } from "@/context/LanguageContext";

const COMPANY_FAQS: FaqItem[] = [
  {
    id: 1,
    question: "What is Taj Al Rahmah's background and engineering experience in the UAE?",
    questionAr: "ما هي خلفية وخبرة تاج الرحمة الهندسية في دولة الإمارات؟",
    answer:
      "Taj Al Rahmah Technical Services LLC is a leading UAE-based specialized engineering contractor delivering advanced waterproofing, structural protection, thermal insulation, and concrete restoration across commercial, residential, industrial, and infrastructure developments.",
    answerAr:
      "شركة تاج الرحمة للخدمات الفنية ذ.م.م هي مقاول هندسي متخصص رائد في الإمارات يقدم حلول العزل المائي المتقدم، وحماية الهياكل الإنشائية، والعزل الحراري، وترميم الخرسانة للمشاريع التجارية والسكنية والصناعية والبنية التحتية.",
  },
  {
    id: 2,
    question: "What quality standards and safety certifications does the company adhere to?",
    questionAr: "ما هي معايير الجودة وشهادات السلامة التي تلتزم بها الشركة؟",
    answer:
      "We operate under stringent ISO quality, environmental, and occupational health & safety management standards. All projects follow documented method statements approved by Dubai Municipality, Trakhees, and Civil Defense authorities.",
    answerAr:
      "نعمل وفقاً لأعلى معايير إدارة الجودة والبيئة والصحة والسلامة المهنية (ISO). تتبع جميع المشاريع بيانات طريقة عمل معتمدة من بلدية دبي وتراخيص والدفاع المدني.",
  },
  {
    id: 3,
    question: "Which international chemical manufacturers and waterproofing brands do you partner with?",
    questionAr: "ما هي الشركات العالمية المصنعة لمواد العزل الكيميائية التي تتعاملون معها؟",
    answer:
      "We are certified applicators for tier-one global manufacturers including BASF Master Builders, Sika, Fosroc, Henkel Polybit, GCP Applied Technologies, and Dow, ensuring manufacturer-backed warranties.",
    answerAr:
      "نحن معتمدون ومصرحون لتطبيق منتجات كبرى الشركات العالمية مثل باسف (BASF)، وسيكا (Sika)، وفوسروك (Fosroc)، وهنكل بوليبت، وGCP، وداو، مما يضمن ضمانات معتمدة مباشرة من المصنعين.",
  },
  {
    id: 4,
    question: "Does Taj Al Rahmah handle both new construction and refurbishment projects?",
    questionAr: "هل تتولى شركة تاج الرحمة مشاريع الإنشاءات الجديدة والترميم على حد سواء؟",
    answer:
      "Yes. We specialize in both large-scale new build substructure/superstructure tanking and complex remedial waterproofing for existing buildings, active basements, and aging rooftop membranes.",
    answerAr:
      "نعم، نتخصص في مشاريع البناء الجديد الضخمة لعزل الأساسات والهياكل الفوقية، إلى جانب أعمال المعالجة والترميم المعقدة للمباني القائمة والأقبية النشطة والأسطح القديمة.",
  },
  {
    id: 5,
    question: "How do your technical teams coordinate with main contractors and consultants?",
    questionAr: "كيف ينسق فريقكم الفني مع المقاولين الرئيسيين والاستشاريين الهندسيين؟",
    answer:
      "We provide full submittals including material compliance data sheets, shop drawings, QA/QC inspection testing plans (ITP), and dedicated on-site project engineers to ensure seamless handover schedules.",
    answerAr:
      "نقدم اعتمادات فنية كاملة تشمل بيانات المواد، والمخططات التنفيذية، وخطط فحص واختبار الجودة (ITP)، مع مهندسي موقع مخصصين لضمان الالتزام بمواعيد التسليم المعتمدة.",
  },
  {
    id: 6,
    question: "What warranties and guarantees are provided by Taj Al Rahmah?",
    questionAr: "ما هي الضمانات التي تقدمها شركة تاج الرحمة؟",
    answer:
      "We provide comprehensive 10 to 25-year system warranties covering materials and workmanship, complete with municipality certificates and thermal imaging leak inspection test reports.",
    answerAr:
      "نقدم ضمانات متكاملة تمتد من 10 إلى 25 عاماً تشمل المواد ومصنعية التنفيذ، مدعومة بشهادات البلديات وتقارير اختبارات الفحص الحراري لكشف التسربات.",
  },
];

const AboutUs = () => {
  const { isArabic } = useLanguage();

  return (
    <div>
      <CommonHeader
        title="About Our Company"
        breadcrumb="About Us"
        imagePath="/banners/abu.jpeg"
      />
      <AboutUsSection />
      <OurMission />
      {/* <MeetOurTeam /> */}
      <FaqSection
        faqs={COMPANY_FAQS}
        isArabic={isArabic}
        subtitle="Learn more about Taj Al Rahmah's engineering standards, certifications, and technical capabilities."
        subtitleAr="تعرف أكثر على معايير تاج الرحمة الهندسية، واعتماداتها وخبراتها الفنية في دولة الإمارات."
      />
      <ClientTestimonials />
    </div>
  );
};

export default AboutUs;

