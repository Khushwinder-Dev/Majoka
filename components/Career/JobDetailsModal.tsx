"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Upload,
  FileText,
  Send,
  Sparkles,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Building2,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  InputValidationTick,
  isValidEmail,
  isValidPhone,
  isValidText,
  FormFieldError,
} from "@/components/ui/InputValidationTick";
import { useVoiceInput, VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";

export interface JobDetail {
  id: number;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  locationEn: string;
  locationAr: string;
  jobTypeEn: string;
  jobTypeAr: string;
  experienceEn: string;
  experienceAr: string;
  deadlineEn: string;
  deadlineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  responsibilitiesEn: string[];
  responsibilitiesAr: string[];
  requirementsEn: string[];
  requirementsAr: string[];
}

export const CAREER_JOBS: JobDetail[] = [
  {
    id: 1,
    titleEn: "Senior Civil Engineer, Waterproofing",
    titleAr: "مهندس مدني أول - عزل مائي وإنشائي",
    categoryEn: "Engineering",
    categoryAr: "الهندسة المدنية",
    locationEn: "Dubai & Abu Dhabi, UAE",
    locationAr: "دبي وأبوظبي، الإمارات",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "5+ Years",
    experienceAr: "أكثر من 5 سنوات",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are seeking a Senior Civil Engineer specializing in waterproofing and structural protection to guide our site engineering team. The ideal candidate will possess deep technical knowledge of ASTM/BS waterproofing standards, combo roofing systems, and subterranean basement tanking. You will supervise project execution, coordinate with consultants, and ensure flawless quality delivery.",
    descriptionAr:
      "نبحث عن مهندس مدني أول متخصص في العزل المائي وحماية المنشآت لقيادة الفريق الهندسي الميداني. يجب أن يمتلك المرشح خبرة عميقة بالمعايير الهندسية ASTM/BS، وأنظمة العزل المتكامل كومبو، وعزل الأساسات السفلية، مع إدارة تنفيذ المشاريع والتنسيق مع الاستشاريين لضمان أعلى معايير الجودة.",
    responsibilitiesEn: [
      "Lead and supervise site engineering teams on major infrastructure and commercial projects",
      "Review and approve shop drawings, method statements, and inspection test plans (ITPs)",
      "Coordinate directly with main contractors, engineering consultants, and project managers",
      "Oversee combo roof waterproofing, polyurea application, and basement tanking operations",
      "Manage material approvals, submittals, and site testing protocols",
      "Ensure full compliance with UAE municipal regulations and civil safety standards",
    ],
    responsibilitiesAr: [
      "قيادة والإشراف على الفرق الهندسية الميدانية في المشاريع الإنشائية والتجارية الكبرى",
      "مراجعة واعتماد المخططات التنفيذية، وخطط الفحص والاختبار (ITP)، وخطط العمل",
      "التنسيق المباشر مع المقاولين الرئيسيين والمكاتب الاستشارية وإدارات المشاريع",
      "الإشراف على أعمال عزل الأسطح بكومبو، وتطبيقات البولي يوريا، وعزل السراديب",
      "إدارة اعتمادات المواد والموافقات الفنية وبروتوكولات الفحص الموقعي",
      "الالتزام الصارم باشتراطات البلديات في الدولة ومعايير السلامة المهنية",
    ],
    requirementsEn: [
      "Bachelor's degree in Civil Engineering or related field",
      "5+ years of hands-on experience in civil waterproofing and structural engineering in the UAE",
      "Proven leadership and team management capabilities on active construction sites",
      "Strong familiarity with Dubai/Abu Dhabi Municipality building codes and DM approvals",
      "Valid UAE Driving License preferred",
    ],
    requirementsAr: [
      "بكالوريوس في الهندسة المدنية أو تخصص ذي صلة",
      "خبرة عملية لا تقل عن 5 سنوات في العزل المائي والهندسة الإنشائية داخل دولة الإمارات",
      "قدرة قيادية مثبتة على إدارة فرق العمل في المواقع الإنشائية النشطة",
      "معرفة تامة باشتراطات بلديتي دبي وأبوظبي وإجراءات الاعتمادات الرسمية",
      "يُفضل وجود رخصة قيادة إماراتية سارية المفعول",
    ],
  },
  {
    id: 2,
    titleEn: "Senior Architecture Engineer",
    titleAr: "مهندس معماري أول - تخطيط وتصميم",
    categoryEn: "Engineering",
    categoryAr: "الهندسة المعمارية",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "5+ Years",
    experienceAr: "أكثر من 5 سنوات",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are looking for a Senior Architectural Engineer to lead our technical design and detailing division. The ideal candidate will have strong design leadership skills, expertise in building envelope detailing, facade waterproofing integration, and construction documentation.",
    descriptionAr:
      "نبحث عن مهندس معماري أول لقيادة قسم التصميم الفني والتفاصيل المعمارية. يتطلب الدور مهارات قيادية عالية وخبرة متقدمة في تفاصيل أغلفة المباني، وعزل الواجهات المعمارية، وإعداد المخططات التنفيذية الشاملة.",
    responsibilitiesEn: [
      "Lead architectural design detailing for complex civil and commercial structures",
      "Develop innovative building envelope and structural protection detailing solutions",
      "Coordinate with engineering teams, structural consultants, and clients",
      "Review architectural drawings, Revit BIM models, and specifications",
      "Conduct site walkthroughs to verify architectural compliance during construction",
    ],
    responsibilitiesAr: [
      "إعداد وتدقيق التفاصيل المعمارية الدقيقة للمشاريع السكنية والتجارية الكبرى",
      "تطوير حلول مبتكرة لحماية الهياكل والتكامل مع أنظمة العزل المتقدمة للواجهات",
      "التنسيق المستمر مع فرق الهندسة الإنشائية والاستشاريين والعملاء",
      "مراجعة المخططات المعمارية ونماذج Revit BIM ومواصفات المشروع الفنية",
      "إجراء زيارات ميدانية لمطابقة التنفيذ مع المواصفات المعمارية المعتمدة",
    ],
    requirementsEn: [
      "Bachelor's or Master's degree in Architectural Engineering",
      "5+ years of architectural experience in the UAE construction sector",
      "Proficiency in Revit BIM, AutoCAD, and 3D architectural rendering tools",
      "Strong portfolio demonstrating building detailing and technical expertise",
      "Excellent communication and presentation abilities",
    ],
    requirementsAr: [
      "بكالوريوس أو ماجستير في الهندسة المعمارية",
      "خبرة لا تقل عن 5 سنوات في قطاع الإنشاءات داخل دولة الإمارات",
      "إتقان احترافي لبرامج Revit BIM وAutoCAD وأدوات العرض المعماري ثلاثية الأبعاد",
      "ملف أعمال يعكس الخبرة في التفاصيل المعمارية والتنفيذية المتقدمة",
      "مهارات تواصل وعرض ممتازة باللغتين الإنجليزية والعربية",
    ],
  },
  {
    id: 3,
    titleEn: "Combo Roofing Site Supervisor",
    titleAr: "مشرف موقع - نظام العزل المتكامل كومبو",
    categoryEn: "Operations",
    categoryAr: "إدارة العمليات والمواقع",
    locationEn: "Sharjah & Northern Emirates",
    locationAr: "الشارقة والإمارات الشمالية",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "3+ Years",
    experienceAr: "أكثر من 3 سنوات",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are seeking an experienced Combo Roofing Site Supervisor to manage day-to-day on-site waterproofing, polyurethane spray foam, and screed casting operations. You will manage labor crews, ensure safety protocols, and meet critical project handover deadlines.",
    descriptionAr:
      "نبحث عن مشرف موقع متمرس في نظام العزل المتكامل كومبو للإشراف اليومي على رش فوم البولي يوريثان، وصب الخرسانة الرغوية (السكريد)، وأعمال الحماية العلوية. يتضمن الدور إدارة العمالة، وضمان السلامة، والالتزام بمواعيد التسليم.",
    responsibilitiesEn: [
      "Supervise on-site polyurethane foam spraying, UV coatings, and protective screed works",
      "Monitor crew productivity, equipment readiness, and material consumption",
      "Enforce strict site safety (HSE) standards and personal protective equipment (PPE)",
      "Conduct flood testing, thickness checks, and coordinate consultant site inspections",
    ],
    responsibilitiesAr: [
      "الإشراف الميداني المباشر على رش البولي يوريثان فوم، والطبقات الواقية، وصب السكريد",
      "متابعة إنتاجية العمال، وجاهزية المعدات، والتحكم في استهلاك المواد",
      "تطبيق أعلى معايير الصحة والسلامة المهنية (HSE) ومعدات الحماية الشخصية",
      "إجراء اختبارات الغمر المائي وقياس السماكات والتنسيق لجولات التفتيش الاستشارية",
    ],
    requirementsEn: [
      "Diploma or Technical Degree in Civil / Construction Engineering",
      "3+ years supervisory experience in combo roofing and PU spray systems in the UAE",
      "Strong leadership skills and ability to manage multi-national site crews",
      "Hands-on knowledge of spray foam proportioners and plural-component rigs",
    ],
    requirementsAr: [
      "دبلوم أو شهادة فنية في الهندسة المدنية أو الإنشائية",
      "خبرة إشرافية لا تقل عن 3 سنوات في نظام الكومبو ورش الفوم في الإمارات",
      "مهارات قيادية متميزة لإدارة فرق العمل المتعددة الجنسيات في المواقع",
      "معرفة عملية بمعدات رش الفوم متعددة المكونات ومضخات الخلط",
    ],
  },
  {
    id: 4,
    titleEn: "Estimation & Tendering Specialist",
    titleAr: "أخصائي حساب الكميات والمناقصات",
    categoryEn: "Engineering",
    categoryAr: "الهندسة والمناقصات",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "3-5 Years",
    experienceAr: "من 3 إلى 5 سنوات",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are actively seeking a skilled Estimation & Tendering Specialist to prepare competitive bids, bill of quantities (BOQ) take-offs, and cost analysis for waterproofing, insulation, and concrete restoration tenders.",
    descriptionAr:
      "نبحث عن أخصائي تسعير ومناقصات متمكن لإعداد العطاءات التنافسية، وحساب جداول الكميات (BOQ)، ودراسة التكاليف لمشاريع العزل المائي، والحراري، وإصلاح وترميم الخرسانة.",
    responsibilitiesEn: [
      "Review tender documents, scope drawings, specifications, and client inquiries",
      "Prepare comprehensive BOQ take-offs and detailed rate analysis for waterproofing systems",
      "Liaise with material manufacturers and suppliers for competitive material quotes",
      "Prepare and submit techno-commercial tender packages within strict bid deadlines",
    ],
    responsibilitiesAr: [
      "دراسة وثائق المناقصات والمخططات والمواصفات الفنية واستفسارات العملاء بدقة",
      "إعداد حصر كميات تفصيلي وتحليل أسعار البنود لأنظمة العزل المتنوعة",
      "التواصل مع موردي ومصنعي المواد للحصول على أفضل عروض الأسعار التنافسية",
      "إعداد وتقديم العروض الفنية والمالية المتكاملة قبل المواعيد النهائية للإغلاق",
    ],
    requirementsEn: [
      "Bachelor's degree in Civil Engineering or Quantity Surveying",
      "3-5 years experience in waterproofing / specialty civil subcontracting estimation in UAE",
      "High proficiency in AutoCAD, MS Excel, and estimation software",
      "Strong negotiation and communication skills with suppliers and contractors",
    ],
    requirementsAr: [
      "بكالوريوس في الهندسة المدنية أو مساحة الكميات (Quantity Surveying)",
      "خبرة 3-5 سنوات في تسعير العزل المائي ومقاولات الباطن المتخصصة في الإمارات",
      "إتقان متقدم لبرامج AutoCAD وMicrosoft Excel وبرامج حصر الكميات",
      "مهارات تفاوض وتواصل قوية مع الموردين والمقاولين الرئيسيين",
    ],
  },
  {
    id: 5,
    titleEn: "Quality Assurance & HSE Officer",
    titleAr: "مسؤول السلامة والصحة المهنية وضمان الجودة (HSE)",
    categoryEn: "Safety & Quality",
    categoryAr: "السلامة والجودة",
    locationEn: "Abu Dhabi & Dubai, UAE",
    locationAr: "أبوظبي ودبي، الإمارات",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "3+ Years",
    experienceAr: "أكثر من 3 سنوات",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are hiring a dedicated Quality Assurance & HSE Officer to enforce zero-harm safety standards and quality compliance across all Taj Al Rahmah project sites.",
    descriptionAr:
      "نبحث عن مسؤول متخصص في الصحة والسلامة والبيئة وضمان الجودة لتطبيق أعلى معايير السلامة المهنية ومنع الحوادث في كافة مواقع مشاريع شركة تاج الرحمة.",
    responsibilitiesEn: [
      "Conduct daily site safety audits, risk assessments, and toolbox talks",
      "Inspect waterproofing membrane welds, thickness measurements, and surface prep",
      "Maintain quality documentation, Non-Conformance Reports (NCRs), and safety logs",
      "Ensure full compliance with OSHAD / Dubai Municipality safety regulations",
    ],
    responsibilitiesAr: [
      "تنفيذ جولات تفتيش السلامة اليومية، وتقييم المخاطر، واجتماعات السلامة التوعوية (Toolbox Talks)",
      "فحص لحامات الأغشية العازلة وسماكات الطلاءات وتجهيز أسطح الخرسانة وفق المعايير",
      "توثيق سجلات الجودة، وتقارير عدم المطابقة (NCR)، ومتابعة الإجراءات التصحيحية",
      "ضمان الامتثال التام لاشتراطات نظام أوشاد (OSHAD) ومعايير بلديات الدولة",
    ],
    requirementsEn: [
      "NEBOSH IGC certified with relevant degree/diploma in safety or engineering",
      "3+ years experience as HSE / QAQC officer on construction sites in the UAE",
      "Strong understanding of chemical handling, working at heights, and confined space safety",
    ],
    requirementsAr: [
      "حاصل على شهادة NEBOSH IGC مع مؤهل جامعي أو دبلوم في السلامة أو الهندسة",
      "خبرة لا تقل عن 3 سنوات كمسؤول سلامة أو ضبط جودة في المواقع الإنشائية بالإمارات",
      "إلمام تام باشتراطات العمل على ارتفاعات، والتعامل مع المواد الكيميائية، والأماكن المغلقة",
    ],
  },
  {
    id: 6,
    titleEn: "Polyurea & Membrane Application Specialist",
    titleAr: "فني متخصص - تطبيق البولي يوريا والعوازل المتقدمة",
    categoryEn: "Technical",
    categoryAr: "الفريق الفني المتخصص",
    locationEn: "UAE Site Locations",
    locationAr: "مواقع المشاريع، الإمارات",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "2+ Years",
    experienceAr: "أكثر من سنتين",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are looking for skilled technicians and applicators with experience in hot-spray polyurea, torch-applied bitumen membranes, and liquid waterproofing coatings.",
    descriptionAr:
      "نبحث عن فنيين ومنفذين مهرة يمتلكون خبرة عملية في تطبيق رش البولي يوريا الساخن، وعوازل اللفائف البيتومينية باللهب، والطلاءات الإيبوكسية والإسمنتية المتقدمة.",
    responsibilitiesEn: [
      "Operate high-pressure plural-component polyurea spray machines and reactors",
      "Prepare concrete surfaces including shot-blasting, grinding, and primer application",
      "Apply torch-on bitumen membranes and self-adhesive waterproofing sheets with precision",
      "Maintain equipment, spray guns, hoses, and ensure clean workspace hygiene",
    ],
    responsibilitiesAr: [
      "تشغيل ماكينات رش البولي يوريا ذات الضغط العالي والتحكم في درجات حرارة الخلط",
      "تجهيز الأسطح الخرسانية بما يشمل السنفرة، ومعالجة التشققات، وتطبيق البرايمر",
      "تركيب لفائف البيتومين بالحرارة، والشرائح ذاتية الالتصاق بأعلى درجات الإحكام",
      "إجراء الصيانة الدورية لمسدسات الرش وخراطيم الضغط وضمان نظافة موقع العمل",
    ],
    requirementsEn: [
      "Vocational trade certificate or 3+ years hands-on experience in specialized coating application",
      "Experience with Graco spray rigs and torch-on membrane application is highly valued",
      "Strong work ethic, reliability, and commitment to job site safety",
    ],
    requirementsAr: [
      "شهادة تدريب مهني أو خبرة عملية 3+ سنوات في تنفيذ الطلاءات والعوازل المتخصصة",
      "معرفة عملية بتشغيل أجهزة Graco المتطورة وأعمال لحام اللفائف العازلة",
      "التزام عالٍ بأخلاقيات العمل والدقة والانضباط بإجراءات السلامة الموقعية",
    ],
  },
  {
    id: 7,
    titleEn: "Structural Restoration Project Manager",
    titleAr: "مدير مشاريع - إعادة تأهيل وحماية المنشآت",
    categoryEn: "Operations",
    categoryAr: "إدارة المشاريع",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "7+ Years",
    experienceAr: "أكثر من 7 سنوات",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are seeking an accomplished Structural Restoration Project Manager to oversee heavy rehabilitation, crack injection, cathodic protection, and structural repair projects for infrastructure and commercial assets.",
    descriptionAr:
      "نبحث عن مدير مشاريع متمرس في إعادة تأهيل الخرسانة وحماية الهياكل الإنشائية لإدارة مشاريع الترميم المعقدة، وحقن التشققات، والحماية الكاثودية للمنشآت والمباني الحيوية.",
    responsibilitiesEn: [
      "Manage project lifecycle from mobilization to successful testing and handover",
      "Oversee budgets, resource allocation, billing milestones, and cash flow",
      "Lead client meetings, consultant reviews, and authority correspondence",
      "Ensure projects finish on schedule, within budget, and to the highest quality standards",
    ],
    responsibilitiesAr: [
      "إدارة دورة حياة المشروع بالكامل من التجهيز الموقعي وحتى الاختبارات والتسليم النهائي",
      "التحكم في الميزانيات، وتخصيص الموارد البشرية والمعدات، ومتابعة الدفعات المالية",
      "تمثيل الشركة في الاجتماعات الفنية مع العملاء والجهات الاستشارية والدوائر الحكومية",
      "ضمان تسليم المشاريع في المواعيد المحددة مع تحقيق أعلى معايير الجودة والأرباح",
    ],
    requirementsEn: [
      "Bachelor's degree in Civil or Structural Engineering; PMP certification is an advantage",
      "7+ years experience managing concrete repair and specialized civil projects in UAE",
      "Proven track record of managing multi-million AED contracts and client relations",
    ],
    requirementsAr: [
      "بكالوريوس في الهندسة المدنية أو الإنشائية؛ وتُعد شهادة PMP ميزة إضافية قوية",
      "خبرة لا تقل عن 7 سنوات في إدارة مشاريع ترميم الخرسانة والأعمال الإنشائية المتخصصة في الإمارات",
      "سجل حافل بالنجاح في إدارة عقود المشاريع الكبرى وبناء علاقات متينة مع العملاء",
    ],
  },
  {
    id: 8,
    titleEn: "Injection & Leak Detection Field Engineer",
    titleAr: "مهندس ميداني - كشف التسربات وحقن الخرسانة",
    categoryEn: "Technical",
    categoryAr: "الفريق الفني الميداني",
    locationEn: "Dubai & Northern Emirates",
    locationAr: "دبي والإمارات الشمالية",
    jobTypeEn: "Full Time",
    jobTypeAr: "دوام كامل",
    experienceEn: "2+ Years",
    experienceAr: "أكثر من سنتين",
    deadlineEn: "30 December 2026",
    deadlineAr: "30 ديسمبر 2026",
    descriptionEn:
      "We are hiring a Field Engineer specialized in non-destructive leak detection, thermal imaging, and polyurethane/epoxy high-pressure injection waterproofing.",
    descriptionAr:
      "نبحث عن مهندس ميداني متخصص في الفحص غير الإتلافي لكشف تسربات المياه، واستخدام التصوير الحراري، وتنفيذ حقن راتنجات البولي يوريثان والإيبوكسي بالضغط العالي لمعالجة التسربات النشطة.",
    responsibilitiesEn: [
      "Perform diagnostic water leak assessments using infrared thermography and moisture meters",
      "Plan and execute polyurethane chemical injection to arrest live water ingress",
      "Prepare diagnostic technical reports with restorative recommendation plans",
    ],
    responsibilitiesAr: [
      "إجراء التشخيص الموقعي لتسربات المياه باستخدام كاميرات الأشعة تحت الحمراء وأجهزة قياس الرطوبة",
      "تخطيط وتنفيذ عمليات الحقن الكيميائي لإيقاف تسربات المياه الحية فورياً تحت الضغط",
      "إعداد التقارير الفنية الدقيقة مع تقديم خطط وحلول الترميم الهندسية الموصى بها",
    ],
    requirementsEn: [
      "Bachelor's degree in Civil Engineering or related technical field",
      "2+ years experience in structural crack injection, leak detection, and concrete rehabilitation",
      "Valid UAE driving license is required for site visits across Emirates",
    ],
    requirementsAr: [
      "بكالوريوس في الهندسة المدنية أو مجال تقني ذي صلة",
      "خبرة سنتين أو أكثر في كشف التسربات وحقن التشققات الإنشائية ومعالجة الخرسانة",
      "رخصة قيادة إماراتية سارية المفعول ضرورية لإجراء الزيارات الميدانية بمختلف الإمارات",
    ],
  },
];

interface JobDetailsModalProps {
  jobId: number | null;
  onClose: () => void;
  isArabic: boolean;
}

export default function JobDetailsModal({
  jobId,
  onClose,
  isArabic,
}: JobDetailsModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    cv: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedCvUrl, setUploadedCvUrl] = useState<string>("");
  const [uploadedCvName, setUploadedCvName] = useState<string>("");

  const { listeningField, toggleListening, setFocusedField, isFieldActive } = useVoiceInput({
    isArabic,
    onResult: (fieldName, text) => {
      setFormData((prev) => {
        let finalText = text;
        if (fieldName === "coverLetter" && prev.coverLetter.trim()) {
          finalText = `${prev.coverLetter.trim()} ${text}`;
        }
        return { ...prev, [fieldName]: finalText };
      });
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
  });

  const job = CAREER_JOBS.find((j) => j.id === jobId);

  // Reset form when job changes or closes
  useEffect(() => {
    if (jobId) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        coverLetter: "",
        cv: null,
      });
      setErrors({});
      setIsSubmitted(false);
      setIsSubmitting(false);
      setUploadedCvUrl("");
      setUploadedCvName("");
    }
  }, [jobId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (jobId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [jobId]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && jobId) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jobId, onClose]);

  if (!jobId || !job) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        toast.error(
          isArabic
            ? "يرجى تحميل ملف بصيغة PDF أو Word"
            : "Please upload a PDF or Word document (.pdf, .doc, .docx)"
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          isArabic
            ? "حجم الملف يجب ألا يتجاوز 5 ميغابايت"
            : "File size should not exceed 5MB"
        );
        return;
      }
      setFormData((prev) => ({ ...prev, cv: file }));
      if (errors.cv) {
        setErrors((prev) => ({ ...prev, cv: "" }));
      }
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, cv: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      fullName: !formData.fullName.trim()
        ? isArabic
          ? "يرجى إدخال الاسم الكامل"
          : "Please enter your full name"
        : "",
      email: !isValidEmail(formData.email)
        ? isArabic
          ? "يرجى إدخال بريد إلكتروني صالح"
          : "Please enter a valid email address"
        : "",
      phone: !isValidPhone(formData.phone)
        ? isArabic
          ? "يرجى إدخال رقم هاتف صالح"
          : "Please enter a valid phone number"
        : "",
      experience: !formData.experience.trim()
        ? isArabic
          ? "يرجى تحديد سنوات الخبرة"
          : "Please enter your years of experience"
        : "",
      cv: !formData.cv
        ? isArabic
          ? "يرجى تحميل السيرة الذاتية (CV)"
          : "Please upload your CV/Resume"
        : "",
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("experience", formData.experience);
      submitData.append("coverLetter", formData.coverLetter || "");
      submitData.append("jobTitle", job.titleEn);
      submitData.append("jobId", job.id.toString());
      if (formData.cv) {
        submitData.append("cv", formData.cv);
      }

      const response = await fetch("/api/job-application", {
        method: "POST",
        body: submitData,
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok) {
        if (resData.resumeUrl) {
          setUploadedCvUrl(resData.resumeUrl);
        }
        if (resData.fileName || formData.cv?.name) {
          setUploadedCvName(resData.fileName || formData.cv?.name || "");
        }
        setIsSubmitted(true);
        toast.success(
          isArabic
            ? "شكراً لتقديمك! تم استلام طلبك وسيرتك الذاتية بنجاح."
            : "Thank you! Your application and CV have been received successfully."
        );
      } else {
        toast.error(
          resData.error ||
          (isArabic
            ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً."
            : "Failed to submit application. Please try again later.")
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(
        isArabic
          ? "تعذر إرسال الطلب. يرجى التحقق من اتصال الإنترنت."
          : "Unable to submit application. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── STICKY MODAL HEADER ── */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 bg-[#E6F7F6]/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5 min-w-0 pr-4 rtl:pr-0 rtl:pl-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-[#01a9a0]/20 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Image
                src="/logo.png"
                alt="Taj Al Rahmah"
                width={36}
                height={36}
                className="w-auto h-auto max-h-7 object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#01a9a0] bg-[#01a9a0]/10 px-2 py-0.5 rounded-full">
                  {isArabic ? job.categoryAr : job.categoryEn}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">
                  {isArabic ? job.locationAr : job.locationEn}
                </span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-stone-900 truncate">
                {isArabic ? job.titleAr : job.titleEn}
              </h2>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isArabic ? "إغلاق" : "Close"}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-stone-600 hover:text-stone-950 border border-slate-200 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* ── SCROLLABLE MODAL CONTENT: 2-COLUMN GRID ── */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ═══════════════════════════════════════════════════ */}
            {/* LEFT / MAIN COLUMN: JOB SPECIFICATION & DETAILS   */}
            {/* ═══════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 space-y-6">
              {/* Meta Stats Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10.5px] text-slate-400 font-medium">
                      {isArabic ? "نوع الوظيفة" : "Job Type"}
                    </p>
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {isArabic ? job.jobTypeAr : job.jobTypeEn}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10.5px] text-slate-400 font-medium">
                      {isArabic ? "الموقع" : "Location"}
                    </p>
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {isArabic ? job.locationAr : job.locationEn}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10.5px] text-slate-400 font-medium">
                      {isArabic ? "الخبرة" : "Experience"}
                    </p>
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {isArabic ? job.experienceAr : job.experienceEn}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10.5px] text-slate-400 font-medium">
                      {isArabic ? "آخر موعد" : "Deadline"}
                    </p>
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {isArabic ? job.deadlineAr : job.deadlineEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-100">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#01a9a0] rounded-full" />
                  <span>{isArabic ? "الوصف الوظيفي" : "Job Description"}</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {isArabic ? job.descriptionAr : job.descriptionEn}
                </p>
              </div>

              {/* Key Responsibilities */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-xs">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#01a9a0] rounded-full" />
                  <span>{isArabic ? "المسؤوليات والمهام الرئيسية" : "Key Responsibilities"}</span>
                </h3>
                <ul className="space-y-2.5">
                  {(isArabic ? job.responsibilitiesAr : job.responsibilitiesEn).map(
                    (resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-[#01a9a0] shrink-0 mt-0.5" />
                        <span className="leading-snug">{resp}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Requirements & Qualifications */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-xs">
                <h3 className="text-sm sm:text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#01a9a0] rounded-full" />
                  <span>{isArabic ? "المتطلبات والمؤهلات" : "Requirements & Qualifications"}</span>
                </h3>
                <ul className="space-y-2.5">
                  {(isArabic ? job.requirementsAr : job.requirementsEn).map(
                    (req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#01a9a0] shrink-0 mt-2" />
                        <span className="leading-snug">{req}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════ */}
            {/* RIGHT COLUMN: APPLICATION FORM                     */}
            {/* ═══════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 bg-[#F8FAFB] p-5 sm:p-7 rounded-3xl border border-slate-200/80 sticky top-0 shadow-xs">
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#01a9a0]/10 text-[#01a9a0] text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isArabic ? "طلب التوظيف" : "Job Application"}</span>
                </div>
                <h3 className="text-lg font-black text-stone-900">
                  {isArabic ? "التقديم على هذه الوظيفة" : "Apply for this Position"}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isArabic
                    ? "أدخل بياناتك وأرفق سيرتك الذاتية للتقييم الفوري من فريق الموارد البشرية."
                    : "Submit your details and CV/Resume for direct evaluation by our talent team."}
                </p>
              </div>

              {isSubmitted ? (
                /* Success State */
                <div className="p-6 rounded-2xl bg-white border border-emerald-200/80 text-center space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">
                    {isArabic ? "تم استلام طلبك بنجاح!" : "Application Submitted!"}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isArabic
                      ? "شكراً لاهتمامك بالانضمام إلى فريق تاج الرحمة. سيقوم فريق الموارد البشرية بمراجعة ملفك والتواصل معك قريباً."
                      : "Thank you for your interest in Taj Al Rahmah. Our HR team has received your application and will contact you if your profile matches."}
                  </p>

                  {uploadedCvUrl && (
                    <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-start gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-stone-500">
                            {isArabic ? "رابط السيرة الذاتية المحفوظة" : "Saved Resume Link"}
                          </p>
                          <p className="text-xs font-bold text-stone-800 truncate">
                            {uploadedCvName || "Resume Document"}
                          </p>
                        </div>
                      </div>
                      <a
                        href={uploadedCvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[#01a9a0]/10 hover:bg-[#01a9a0]/20 text-[#01a9a0] text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <span>{isArabic ? "معاينة" : "View"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full py-2.5 rounded-full bg-[#01a9a0] hover:bg-[#008f84] text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    {isArabic ? "إغلاق النافذة" : "Done"}
                  </button>
                </div>
              ) : (
                /* Application Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("fullName")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        disabled={isSubmitting}
                        className={`w-full px-4 ${isArabic ? "pl-18 pr-4" : "pr-18 pl-4"} pt-3.5 pb-1 bg-white rounded-full border text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all peer placeholder-transparent ${
                          listeningField === "fullName"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.fullName
                            ? "border-red-500 ring-2 ring-red-500/15"
                            : "border-slate-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-4" : "left-4"
                        } ${
                          errors.fullName
                            ? "-top-2 text-[10.5px] font-semibold text-red-500"
                            : formData.fullName || isFieldActive("fullName")
                            ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]"
                            : "top-2.5 text-xs text-stone-400 peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "الاسم الكامل" : "Full Name"} <span className="text-red-500">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidText(formData.fullName) && !errors.fullName}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {isFieldActive("fullName") && (
                          <VoiceMicButton
                            isListening={listeningField === "fullName"}
                            onClick={() => toggleListening("fullName", "text")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "fullName" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    <FormFieldError error={errors.fullName} />
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        disabled={isSubmitting}
                        className={`w-full px-4 ${isArabic ? "pl-18 pr-4" : "pr-18 pl-4"} pt-3.5 pb-1 bg-white rounded-full border text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all peer placeholder-transparent ${
                          listeningField === "email"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.email
                            ? "border-red-500 ring-2 ring-red-500/15"
                            : "border-slate-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-4" : "left-4"
                        } ${
                          errors.email
                            ? "-top-2 text-[10.5px] font-semibold text-red-500"
                            : formData.email || isFieldActive("email")
                            ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]"
                            : "top-2.5 text-xs text-stone-400 peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "البريد الإلكتروني" : "Email Address"} <span className="text-red-500">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidEmail(formData.email) && !errors.email}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {isFieldActive("email") && (
                          <VoiceMicButton
                            isListening={listeningField === "email"}
                            onClick={() => toggleListening("email", "email")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "email" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    <FormFieldError error={errors.email} />
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        disabled={isSubmitting}
                        className={`w-full px-4 ${isArabic ? "pl-18 pr-4" : "pr-18 pl-4"} pt-3.5 pb-1 bg-white rounded-full border text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all peer placeholder-transparent ${
                          listeningField === "phone"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.phone
                            ? "border-red-500 ring-2 ring-red-500/15"
                            : "border-slate-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-4" : "left-4"
                        } ${
                          errors.phone
                            ? "-top-2 text-[10.5px] font-semibold text-red-500"
                            : formData.phone || isFieldActive("phone")
                            ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]"
                            : "top-2.5 text-xs text-stone-400 peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "رقم الهاتف" : "Phone Number"} <span className="text-red-500">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidPhone(formData.phone) && !errors.phone}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {isFieldActive("phone") && (
                          <VoiceMicButton
                            isListening={listeningField === "phone"}
                            onClick={() => toggleListening("phone", "phone")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "phone" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    <FormFieldError error={errors.phone} />
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("experience")}
                        onBlur={() => setFocusedField(null)}
                        placeholder=" "
                        disabled={isSubmitting}
                        className={`w-full px-4 ${isArabic ? "pl-18 pr-4" : "pr-18 pl-4"} pt-3.5 pb-1 bg-white rounded-full border text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all peer placeholder-transparent ${
                          listeningField === "experience"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : errors.experience
                            ? "border-red-500 ring-2 ring-red-500/15"
                            : "border-slate-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      <label
                        className={`absolute bg-white px-1 transition-all duration-200 pointer-events-none ${
                          isArabic ? "right-4" : "left-4"
                        } ${
                          errors.experience
                            ? "-top-2 text-[10.5px] font-semibold text-red-500"
                            : formData.experience || isFieldActive("experience")
                            ? "-top-2 text-[10.5px] font-semibold text-[#01a9a0]"
                            : "top-2.5 text-xs text-stone-400 peer-focus:-top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:text-[#01a9a0]"
                        }`}
                      >
                        {isArabic ? "سنوات الخبرة (مثال: 5 سنوات)" : "Years of Experience (e.g. 5 Years)"} <span className="text-red-500">*</span>
                      </label>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "left-2.5" : "right-2.5"} flex items-center gap-1 z-10`}>
                        <InputValidationTick
                          isValid={isValidText(formData.experience, 1) && !errors.experience}
                          isArabic={isArabic}
                          className="!static !translate-y-0 !left-auto !right-auto"
                        />
                        {isFieldActive("experience") && (
                          <VoiceMicButton
                            isListening={listeningField === "experience"}
                            onClick={() => toggleListening("experience", "number")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    {listeningField === "experience" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                    <FormFieldError error={errors.experience} />
                  </div>

                  {/* Cover Letter (Optional) */}
                  <div>
                    <div className="relative">
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("coverLetter")}
                        onBlur={() => setFocusedField(null)}
                        rows={2}
                        disabled={isSubmitting}
                        placeholder={
                          isArabic
                            ? "نبذة موجزة أو خطاب تقديمي (اختياري)..."
                            : "Brief note or cover letter (optional)..."
                        }
                        className={`w-full px-4 ${isArabic ? "pl-12 text-right" : "pr-12 text-left"} py-2.5 bg-white rounded-2xl border text-stone-800 text-xs sm:text-[13px] focus:outline-none transition-all resize-none placeholder:text-stone-400 ${
                          listeningField === "coverLetter"
                            ? "border-[#01a9a0] ring-2 ring-[#01a9a0]/25"
                            : "border-slate-300 focus:border-[#01a9a0] focus:ring-2 focus:ring-[#01a9a0]/20"
                        }`}
                      />
                      {isFieldActive("coverLetter") && (
                        <div className={`absolute top-2.5 ${isArabic ? "left-2" : "right-2"} z-10`}>
                          <VoiceMicButton
                            isListening={listeningField === "coverLetter"}
                            onClick={() => toggleListening("coverLetter", "textarea")}
                            isArabic={isArabic}
                            size="sm"
                          />
                        </div>
                      )}
                    </div>
                    {listeningField === "coverLetter" && (
                      <VoiceListeningBadge isArabic={isArabic} />
                    )}
                  </div>

                  {/* CV / Resume Upload */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">
                      {isArabic ? "تحميل السيرة الذاتية (CV)" : "Upload CV / Resume"}{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    {!formData.cv ? (
                      <label
                        className={`flex flex-col items-center justify-center w-full py-4 px-3 border-2 border-dashed rounded-2xl cursor-pointer transition-all bg-white hover:bg-slate-50 ${
                          errors.cv
                            ? "border-red-400 bg-red-50/20"
                            : "border-slate-300 hover:border-[#01a9a0]"
                        }`}
                      >
                        <Upload
                          className={`w-6 h-6 mb-1 ${
                            errors.cv ? "text-red-400" : "text-[#01a9a0]"
                          }`}
                        />
                        <p className="text-xs font-semibold text-stone-700">
                          {isArabic ? "انقر لاختيار ملف" : "Click to browse file"}
                        </p>
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          disabled={isSubmitting}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#01a9a0]/30 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-stone-800 truncate">
                              {formData.cv.name}
                            </p>
                            <p className="text-[10px] text-stone-400">
                              {(formData.cv.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="w-7 h-7 rounded-full text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                          aria-label="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <FormFieldError error={errors.cv} />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#01a9a0] hover:bg-[#008f84] text-white font-bold h-11 px-5 rounded-full text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:shadow-[#01a9a0]/25 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isArabic ? "جاري الإرسال..." : "Submitting Application..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{isArabic ? "إرسال طلب التوظيف" : "Submit Application"}</span>
                        {isArabic ? (
                          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
