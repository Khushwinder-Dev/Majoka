"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface Translations {
  nav: {
    services: string;
    projects: string;
    products: string;
    industries: string;
    resources: string;
    company: string;
    careers: string;
    contact: string;
    getQuote: string;
    searchPlaceholder: string;
    langToggle: string;
  };
  hero: {
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
    exploreServices: string;
    exploreProject: string;
    stat1: string;
    stat2: string;
    stat3: string;
    stat4: string;
    videoMode: string;
    videoPaused: string;
    photo: string;
    playVideoHint: string;
    pauseVideoHint: string;
    resumeVideoHint: string;
    muteAudio: string;
    unmuteAudio: string;
    returnToPhoto: string;
  };
  whyChooseUs: {
    title: string;
    exploreMore: string;
    watchVideo: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  featured: {
    title: string;
    subtitle: string;
    previous: string;
    next: string;
    projects: {
      name: string;
      category: string;
      location: string;
      type: string;
      status: string;
      completed: string;
      inProgress: string;
      planning: string;
    }[];
  };
  services: {
    title: string;
    subtitle: string;
    getStarted: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      title: string;
    }[];
  };
  blog: {
    badge: string;
    titlePrefix: string;
    titleAccent: string;
    readFull: string;
    featured: {
      date: string;
      category: string;
      title: string;
      excerpt: string;
      image: string;
    };
    side: {
      date: string;
      category: string;
      title: string;
      excerpt: string;
      image: string;
    }[];
  };
  footer: {
    tagline1: string;
    tagline2: string;
    companyDescription: string;
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      subscribe: string;
      successMsg: string;
      errorMsg: string;
      invalidMsg: string;
    };
    servicesTitle: string;
    servicesLinks: string[];
    resourcesTitle: string;
    resourcesLinks: string[];
    companyTitle: string;
    companyLinks: string[];
    contactTitle: string;
    phone1: string;
    phone2: string;
    email1: string;
    email2: string;
    location: string;
    workingHours: string;
    closedDay: string;
    copyright: string;
    scrollToTop: string;
    exploreMore: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      products: "Products",
      industries: "Industries",
      resources: "Resources",
      company: "Company",
      careers: "Careers",
      contact: "Contact",
      getQuote: "GET A QUOTE",
      searchPlaceholder: "Search...",
      langToggle: "العربية",
    },
    hero: {
      eyebrow: "TRUSTED WATERPROOFING EXPERT",
      titlePart1: "Contracting &",
      titlePart2: "Waterproofing Excellence",
      description:
        "Proven Expertise And Superior Craftsmanship, Delivering Durable Solutions That Protect And Last.",
      exploreServices: "EXPLORE SERVICES",
      exploreProject: "EXPLORE PROJECT",
      stat1: "Year Of Experience",
      stat2: "Project Completed",
      stat3: "Satisfied Clients",
      stat4: "Skilled Professionals",
      videoMode: "Video Mode",
      videoPaused: "Video Paused",
      photo: "Photo",
      playVideoHint: "Click to play video",
      pauseVideoHint: "Click to pause",
      resumeVideoHint: "Click to play",
      muteAudio: "Mute audio",
      unmuteAudio: "Unmute audio",
      returnToPhoto: "Return to photo banner",
    },
    whyChooseUs: {
      title: "Why Choose Us?",
      exploreMore: "Explore More",
      watchVideo: "Watch Video",
      feature1Title: "Unmatched Expertise",
      feature1Desc:
        "With years of experience across residential, commercial, and industrial projects, we bring proven knowledge and innovative techniques to every build.",
      feature2Title: "Commitment to Quality",
      feature2Desc:
        "From materials to craftsmanship, we follow international standards to ensure long-lasting durability and top-tier finishing.",
      feature3Title: "On-Time Delivery",
      feature3Desc:
        "We value your time. Our structured planning and efficient project management guarantee deadlines are met without compromise.",
    },
    featured: {
      title: "Our Featured Projects",
      subtitle: "Explore Our Highlighted Projects That Reflect Our Identity",
      previous: "Previous",
      next: "Next",
      projects: [
        {
          name: "Axel Towers",
          category: "Building & Interior",
          location: "Dubai, UAE",
          type: "Commercial",
          status: "Completed",
          completed: "Completed",
          inProgress: "In Progress",
          planning: "Planning",
        },
        {
          name: "Glass Hotel",
          category: "Architecture",
          location: "Abu Dhabi, UAE",
          type: "Hospitality",
          status: "Completed",
          completed: "Completed",
          inProgress: "In Progress",
          planning: "Planning",
        },
        {
          name: "Concord Tower",
          category: "Mega Architecture",
          location: "Sharjah, UAE",
          type: "Residential",
          status: "In Progress",
          completed: "Completed",
          inProgress: "In Progress",
          planning: "Planning",
        },
        {
          name: "Marina Heights",
          category: "Mega Architecture",
          location: "Dubai Marina, UAE",
          type: "Mixed Use",
          status: "Planning",
          completed: "Completed",
          inProgress: "In Progress",
          planning: "Planning",
        },
        {
          name: "Sky Gardens",
          category: "Green Architecture",
          location: "Al Ain, UAE",
          type: "Residential",
          status: "Completed",
          completed: "Completed",
          inProgress: "In Progress",
          planning: "Planning",
        },
        {
          name: "Business Hub",
          category: "Commercial Design",
          location: "Fujairah, UAE",
          type: "Office",
          status: "In Progress",
          completed: "Completed",
          inProgress: "In Progress",
          planning: "Planning",
        },
      ],
    },
    services: {
      title: "Our Services",
      subtitle: "Discover how we can elevate your experience.",
      getStarted: "Get Started",
      items: [
        {
          title: "Manpower Supply",
          description:
            "We provide skilled, semi-skilled, and unskilled manpower for construction, engineering, industrial, and facility projects.",
        },
        {
          title: "Equipment Rental",
          description:
            "Reliable and well-maintained equipment rental solutions for construction, industrial, and project needs — delivered on time, every time.",
        },
        {
          title: "Scaffolding Rental",
          description:
            "Safe, durable, and fully certified scaffolding rental solutions for construction, maintenance, and industrial projects.",
        },
        {
          title: "General Trading",
          description:
            "Reliable general trading solutions providing high-quality materials, equipment, and supplies through a strong and trusted global network.",
        },
        {
          title: "Calibration",
          description:
            "Accurate and reliable calibration services for all industrial measuring instruments.",
        },
        {
          title: "Soil Testing Laboratories",
          description:
            "Comprehensive laboratory testing solutions for materials, structures, and site investigations.",
        },
      ],
    },
    testimonials: {
      title: "Client Testimonials",
      subtitle: "Discover how we can elevate your experience",
      items: [
        {
          name: "Yousuf Noor",
          title:
            "We are impressed by their ability to meet our specific needs and their strong customer service. We appreciated the high level of customer services.",
        },
        {
          name: "Stella Smith, New York",
          title:
            "Majoka Engineering delivered exactly what we expected — professional work, timely completion, and great communication from start to finish.",
        },
        {
          name: "Abdur Gaffar, Dubai",
          title:
            "Their technical expertise and dedication to quality truly set them apart. Every step of our project was handled with professionalism and care.",
        },
        {
          name: "Muhammad Salim, Dubai",
          title:
            "Outstanding engineering solutions with exceptional attention to detail. Their team delivered beyond our expectations with professional service throughout.",
        },
        {
          name: "Ahmed Hassan, Dubai",
          title:
            "Reliable and efficient service delivery. Majoka Engineering consistently provides high-quality work with excellent project management and communication.",
        },
        {
          name: "Milon Islam, Dubai",
          title:
            "Their technical expertise and commitment to excellence made our project a complete success. Highly recommend their engineering services.",
        },
      ],
    },
    blog: {
      badge: "BLOG & INSIGHTS",
      titlePrefix: "Latest",
      titleAccent: "News & Articles",
      readFull: "READ FULL ARTICLE",
      featured: {
        date: "FEB 25, 2026",
        category: "PROJECT MANAGE",
        title: "Epoxy Floor Coating Durable, Seamless & Long-Lasting Flooring",
        excerpt:
          "Epoxy floor coating creates a strong, seamless, easy-to-maintain surface that protects floors from chemicals and heavy traffic professional finish.",
        image:
          "/news/Epoxy Floor Coating Durable Seamless Long-Lasting Flooring.jpg",
      },
      side: [
        {
          date: "FEB 25, 2026",
          category: "PROJECT MANAGE",
          title:
            "Polyurea Coating Waterproofing Fast, Flexible & Durable Protection",
          excerpt:
            "Polyurea coating provides fast-curing, chemicals, abrasion, and harsh conditions.",
          image: "/news/Polyurea Coating Waterproofing Fast Flexible Durable Protection.png",
        },
        {
          date: "FEB 25, 2026",
          category: "PROJECT MANAGE",
          title: "Industrial Coatings Durable Protection For Demanding Environments",
          excerpt:
            "Industrial coatings protect against corrosion, chemicals, and heavy wear,",
          image: "/news/Industrial Coatings Durable Protection For Demanding Environments.png",
        },
        {
          date: "FEB 25, 2026",
          category: "PROJECT MANAGE",
          title:
            "Injection Waterproofing Targeted Leak Sealing For Lasting Protection",
          excerpt:
            "Polyurea coating provides fast-curing, abrasion, and harsh conditions.",
          image: "/news/Injection Waterproofing Targeted Leak Sealing For Lasting Protection.png",
        },
      ],
    },
    footer: {
      tagline1: "Building Better",
      tagline2: "Spaces For Tomorrow",
      companyDescription:
        "Taj Al Rahmah Contracting Company Delivers Reliable Contracting Solutions With A Focus On Quality, Safety, And Customer Satisfaction.",
      newsletter: {
        title: "SUBSCRIBE & GET 15% DISCOUNT",
        description:
          "Enjoy 15% off your first service and stay updated with exclusive offers, project insights, expert tips, and the latest waterproofing and contracting solutions.",
        placeholder: "Enter Your Email",
        subscribe: "Subscribe",
        successMsg: "🎉 Subscribed successfully! Check your email for your 15% discount code.",
        errorMsg: "Something went wrong. Please try again.",
        invalidMsg: "Please enter a valid email address.",
      },
      servicesTitle: "Services",
      servicesLinks: [
        "Waterproofing",
        "Swimming Pool Installation",
        "Electrical Fit-Out",
        "Plumbing & Sanitary",
        "Floor & Wall Tiling",
      ],
      resourcesTitle: "Resources",
      resourcesLinks: [
        "Media",
        "Blog",
        "Downloads",
        "FAQs",
        "Privacy",
        "Terms",
      ],
      companyTitle: "Company",
      companyLinks: [
        "About Us",
        "Clients",
        "Expertise",
        "Certifications",
        "Careers",
        "Contact",
      ],
      contactTitle: "Contact",
      phone1: "+971 55 440 6456",
      phone2: "+971 55 763 6994",
      email1: "info@tajalrahmah.com",
      email2: "tajalrahmah@gmail.com",
      location: "Industrial Area No 5,\nSharjah, UAE",
      workingHours: "Sat - Thu, 9:00 am - 6:00 pm",
      closedDay: "Friday closed",
      copyright: "© 2026 Taj Al Rahmah. All Rights Reserved.",
      scrollToTop: "Scroll to top",
      exploreMore: "Explore More",
    },
  },
  ar: {
    nav: {
      services: "الخدمات",
      projects: "المشاريع",
      products: "المنتجات",
      industries: "القطاعات",
      resources: "الموارد",
      company: "عن الشركة",
      careers: "الوظائف",
      contact: "اتصل بنا",
      getQuote: "طلب عرض سعر",
      searchPlaceholder: "بحث...",
      langToggle: "English",
    },
    hero: {
      eyebrow: "خبير معتمد في العزل المائي",
      titlePart1: "المقاولات و",
      titlePart2: "التميز في العزل المائي",
      description:
        "خبرة مثبتة وحرفية عالية لتقديم حلول متينة توفر الحماية المستدامة وتدوم طويلاً.",
      exploreServices: "استكشف الخدمات",
      exploreProject: "استكشف المشاريع",
      stat1: "سنوات من الخبرة",
      stat2: "مشروع منجز",
      stat3: "عميل راضٍ",
      stat4: "خبير ومحترف",
      videoMode: "وضع الفيديو",
      videoPaused: "الفيديو متوقف",
      photo: "صورة",
      playVideoHint: "انقر لتشغيل الفيديو",
      pauseVideoHint: "انقر للإيقاف المؤقت",
      resumeVideoHint: "انقر للتشغيل",
      muteAudio: "كتم الصوت",
      unmuteAudio: "تشغيل الصوت",
      returnToPhoto: "العودة إلى الصورة",
    },
    whyChooseUs: {
      title: "لماذا تختارنا؟",
      exploreMore: "استكشف المزيد",
      watchVideo: "شاهد الفيديو",
      feature1Title: "خبرة لا تُضاهى",
      feature1Desc:
        "بسنوات من الخبرة في المشاريع السكنية والتجارية والصناعية، نقدم معرفة مثبتة وتقنيات مبتكرة لكل مشروع.",
      feature2Title: "الالتزام بالجودة",
      feature2Desc:
        "من المواد إلى الحرفية، نتبع المعايير الدولية لضمان المتانة الدائمة والتشطيب عالي الجودة.",
      feature3Title: "التسليم في الوقت المحدد",
      feature3Desc:
        "نقدر وقتك. تخطيطنا المنظم وإدارة المشاريع الفعالة تضمن الوفاء بالمواعيد النهائية دون مساومة.",
    },
    featured: {
      title: "مشاريعنا البارزة",
      subtitle: "استكشف مشاريعنا البارزة التي تعكس هويتنا",
      previous: "السابق",
      next: "التالي",
      projects: [
        {
          name: "أبراج أكسيل",
          category: "المباني والديكور الداخلي",
          location: "دبي، الإمارات",
          type: "تجاري",
          status: "مكتمل",
          completed: "مكتمل",
          inProgress: "قيد التنفيذ",
          planning: "في التخطيط",
        },
        {
          name: "فندق الجلاس",
          category: "العمارة",
          location: "أبو ظبي، الإمارات",
          type: "ضيافة",
          status: "مكتمل",
          completed: "مكتمل",
          inProgress: "قيد التنفيذ",
          planning: "في التخطيط",
        },
        {
          name: "برج كونكورد",
          category: "العمارة العملاقة",
          location: "الشارقة، الإمارات",
          type: "سكني",
          status: "قيد التنفيذ",
          completed: "مكتمل",
          inProgress: "قيد التنفيذ",
          planning: "في التخطيط",
        },
        {
          name: "مرتفعات المارينا",
          category: "العمارة العملاقة",
          location: "دبي مارينا، الإمارات",
          type: "متعدد الاستخدامات",
          status: "في التخطيط",
          completed: "مكتمل",
          inProgress: "قيد التنفيذ",
          planning: "في التخطيط",
        },
        {
          name: "حدائق السماء",
          category: "العمارة الخضراء",
          location: "العين، الإمارات",
          type: "سكني",
          status: "مكتمل",
          completed: "مكتمل",
          inProgress: "قيد التنفيذ",
          planning: "في التخطيط",
        },
        {
          name: "مركز الأعمال",
          category: "التصميم التجاري",
          location: "الفجيرة، الإمارات",
          type: "مكاتب",
          status: "قيد التنفيذ",
          completed: "مكتمل",
          inProgress: "قيد التنفيذ",
          planning: "في التخطيط",
        },
      ],
    },
    services: {
      title: "خدماتنا",
      subtitle: "اكتشف كيف يمكننا تحسين تجربتك.",
      getStarted: "ابدأ الآن",
      items: [
        {
          title: "توريد القوى العاملة",
          description:
            "نحن نقدم القوى العاملة الماهرة وشبه الماهرة وغير الماهرة لمشاريع البناء والهندسة والصناعية والمرافق.",
        },
        {
          title: "تأجير المعدات",
          description:
            "حلول تأجير معدات موثوقة ومحافظة عليها جيداً للاحتياجات الإنشائية والصناعية والمشاريع - يتم التسليم في الوقت المحدد دائماً.",
        },
        {
          title: "تأجير السقالات",
          description:
            "حلول تأجير سقالات آمنة ودائمة ومعتمدة بالكامل لمشاريع البناء والصيانة والمشاريع الصناعية.",
        },
        {
          title: "التجارة العامة",
          description:
            "حلول تجارة عامة موثوقة تقدم مواد ومعدات ولوازم عالية الجودة من خلال شبكة عالمية قوية وموثوقة.",
        },
        {
          title: "المعايرة",
          description:
            "خدمات معايرة دقيقة وموثوقة لجميع أدوات القياس الصناعية.",
        },
        {
          title: "مختبرات فحص التربة",
          description:
            "حلول اختبارات معملية شاملة للمواد والهياكل والتحقيقات الموقعية.",
        },
      ],
    },
    testimonials: {
      title: "آراء العملاء",
      subtitle: "اكتشف كيف يمكننا تحسين تجربتك",
      items: [
        {
          name: "يوسف نور",
          title:
            "لقد أعجبنا قدرتنا على تلبية احتياجاتنا المحددة وخدمة العملاء القوية. لقد قدّرنا المستوى العالي من خدمات العملاء.",
        },
        {
          name: "ستيلا سميث، نيويورك",
          title:
            "سلمت شركة Majoka للهندسة بالضبط ما توقعناه - عمل احترافي، إكمال في الوقت المحدد، وتواصل رائع من البداية إلى النهاية.",
        },
        {
          name: "عبد الغفار، دبي",
          title:
            "خبرتهم التقنية وتفانيهم في الجودة يميزانهم حقاً. تم التعامل مع كل خطوة من مشروعنا باحترافية واهتمام.",
        },
        {
          name: "محمد سليم، دبي",
          title:
            "حلول هندسية استثنائية مع اهتمام استثنائي بالتفاصيل. تجاوز فريقهم توقعاتنا مع خدمة احترافية طوال الوقت.",
        },
        {
          name: "أحمد حسن، دبي",
          title:
            "تسليم خدمة موثوق وفعال. تقدم شركة Majoka للهندسة باستمرار عملاً عالي الجودة مع إدارة مشاريع وتواصل ممتازين.",
        },
        {
          name: "ميلون إسلام، دبي",
          title:
            "خبرتهم التقنية والتزامهم بالتميز جعل مشروعنا نجاحاً كاملاً. أوصي بخدماتهم الهندسية بشدة.",
        },
      ],
    },
    blog: {
      badge: "المدونة والرؤى",
      titlePrefix: "أحدث",
      titleAccent: "الأخبار والمقالات",
      readFull: "اقرأ المقال كاملاً",
      featured: {
        date: "٢٥ فبراير ٢٠٢٦",
        category: "إدارة المشاريع",
        title: "طلاء أرضية الإيبوكسي أرضية متينة وبديلة وطويلة الأمد",
        excerpt:
          "يُشكل طلاء أرضية الإيبوكسي سطحًا قويًا وسلسًا وسهل الصيانة يحمي الأرضيات من المواد الكيميائية والمرور الثقيل بلمسة احترافية.",
        image:
          "/news/Epoxy Floor Coating Durable Seamless Long-Lasting Flooring.jpg",
      },
      side: [
        {
          date: "٢٥ فبراير ٢٠٢٦",
          category: "إدارة المشاريع",
          title:
            "طلاء البولييوريا للعزل المائي حماية سريعة ومرنة ومتانة",
          excerpt:
            "يوفر طلاء البولييوريا معالجة سريعة التصلب ومقاومة للمواد الكيميائية والتآكل والظروف القاسية.",
          image: "/news/Polyurea Coating Waterproofing Fast Flexible Durable Protection.png",
        },
        {
          date: "٢٥ فبراير ٢٠٢٦",
          category: "إدارة المشاريع",
          title:
            "الطلاءات الصناعية حماية متينة للبيئات المتطلبة",
          excerpt:
            "تحمي الطلاءات الصناعية من التآكل والمواد الكيميائية والتلف الثقيل.",
          image: "/news/Industrial Coatings Durable Protection For Demanding Environments.png",
        },
        {
          date: "٢٥ فبراير ٢٠٢٦",
          category: "إدارة المشاريع",
          title:
            "العزل المائي بالحقن إغلاق مستهدف للتسريبات لحماية دائمة",
          excerpt:
            "يوفر طلاء البولييوريا معالجة سريعة ومقاومة للتآكل والظروف القاسية.",
          image: "/news/Injection Waterproofing Targeted Leak Sealing For Lasting Protection.png",
        },
      ],
    },
    footer: {
      tagline1: "بناء مساحات",
      tagline2: "أفضل للغد",
      companyDescription:
        "شركة تاج الرحمة للمقاولات تقدم حلول مقاولات موثوقة مع تركيز على الجودة والسلامة ورضا العملاء.",
      newsletter: {
        title: "اشترك واحصل على خصم 15%",
        description:
          "استمتع بخصم 15% على أول خدمة لك وابق على اطلاع بالعروض الحصرية ورؤى المشاريع ونصائح الخبراء وأحدث حلول العزل المائي والمقاولات.",
        placeholder: "أدخل بريدك الإلكتروني",
        subscribe: "اشترك",
        successMsg: "🎉 تم الاشتراك بنجاح! تحقق من بريدك الإلكتروني للحصول على رمز خصم 15%.",
        errorMsg: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
        invalidMsg: "يرجى إدخال عنوان بريد إلكتروني صالح.",
      },
      servicesTitle: "الخدمات",
      servicesLinks: [
        "العزل المائي",
        "تركيب حمامات السباحة",
        "تجهيزات الكهربائية",
        "السباكة والصرف الصحي",
        "تركيب الأرضيات والجدران",
      ],
      resourcesTitle: "الموارد",
      resourcesLinks: [
        "الوسائط",
        "المدونة",
        "التحميلات",
        "الأسئلة الشائعة",
        "الخصوصية",
        "الشروط",
      ],
      companyTitle: "الشركة",
      companyLinks: [
        "عن الشركة",
        "العملاء",
        "الخبرة",
        "الشهادات",
        "الوظائف",
        "اتصل بنا",
      ],
      contactTitle: "تواصل معنا",
      phone1: "+971 55 440 6456",
      phone2: "+971 55 763 6994",
      email1: "info@tajalrahmah.com",
      email2: "tajalrahmah@gmail.com",
      location: "المنطقة الصناعية رقم 5،\nالشارقة، الإمارات",
      workingHours: "السبت - الخميس، 9:00 صباحاً - 6:00 مساءً",
      closedDay: "مغلق يوم الجمعة",
      copyright: "© 2026 تاج الرحمة. جميع الحقوق محفوظة.",
      scrollToTop: "العودة للأعلى",
      exploreMore: "استكشف المزيد",
    },
  },
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  isArabic: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("site_language") as Language | null;
    if (saved === "ar" || saved === "en") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("site_language", lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ar" : "en";
    setLanguage(nextLang);
  };

  const direction: Direction = language === "ar" ? "rtl" : "ltr";
  const isArabic = language === "ar";
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isArabic,
        toggleLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
