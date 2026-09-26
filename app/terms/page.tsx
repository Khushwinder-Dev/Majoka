"use client";

import React from "react";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  FileText,
  Info,
  ShieldAlert,
  Copyright,
  Building2,
  FolderGit2,
  Wrench,
  Receipt,
  ExternalLink,
  Server,
  AlertTriangle,
  Scale,
  Lock,
  Cookie,
  RefreshCw,
  Gavel,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface TermsSection {
  number: string;
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  paragraphsEn: string[];
  paragraphsAr: string[];
  bulletsEn?: string[];
  bulletsAr?: string[];
  footerEn?: string;
  footerAr?: string;
}

export default function TermsPage() {
  const { isArabic } = useLanguage();
  const isAr = isArabic;

  const termsSections: TermsSection[] = [
    {
      number: "01",
      icon: FileText,
      titleEn: "1. About These Terms",
      titleAr: "1. حول هذه الشروط",
      paragraphsEn: [
        "These Terms of Use govern your access to and use of the Taj Al Rahmah website, including its pages, content, information, images, documents, forms, and other materials made available through the website.",
        "These Terms of Use apply to the website only. Any construction, waterproofing, repair, maintenance, supply, subcontracting, or other services provided by Taj Al Rahmah will be governed by the applicable quotation, proposal, purchase order, contract, scope of work, and other agreed commercial or contractual documents.",
      ],
      paragraphsAr: [
        "تحكم شروط الاستخدام هذه وصولك إلى موقع تاج الرحمة الإلكتروني واستخدامه، بما في ذلك صفحاته ومحتواه ومعلوماته وصوره ووثائقه ونماذجه والمواد الأخرى المتاحة من خلاله.",
        "تنطبق شروط الاستخدام هذه على الموقع الإلكتروني فقط. وتخضع أي خدمات بناء أو عزل مائي أو ترميم أو صيانة أو توريد أو مقاولات باطن أو خدمات أخرى تقدمها شركة تاج الرحمة لعرض الأسعار المعمول به، أو العرض الفني، أو أمر الشراء، أو العقد، أو نطاق العمل، والمستندات التجارية أو التعاقدية الأخرى المتفق عليها.",
      ],
    },
    {
      number: "02",
      icon: Info,
      titleEn: "2. Website Information",
      titleAr: "2. معلومات الموقع الإلكتروني",
      paragraphsEn: [
        "We make reasonable efforts to ensure that the information presented on this website is accurate and up to date. However, website content is provided for general informational purposes and may be changed, updated, or removed without prior notice.",
        "Information about our services, capabilities, projects, materials, products, and solutions should not be considered a binding offer or contractual commitment unless expressly confirmed in writing by Taj Al Rahmah.",
      ],
      paragraphsAr: [
        "نبذل جهوداً معقولة لضمان دقة وتحديث المعلومات المعروضة على هذا الموقع. ومع ذلك، يتم توفير محتوى الموقع لأغراض إعلامية عامة وقد يتم تغييره أو تحديثه أو إزالته دون إشعار مسبق.",
        "لا ينبغي اعتبار المعلومات المتعلقة بخدماتنا وإمكانياتنا ومشاريعنا والمواد والمنتجات والحلول بمثابة عرض ملزم أو التزام تعاقدي ما لم يتم تأكيد ذلك صراحةً وكتابياً من قبل شركة تاج الرحمة.",
      ],
    },
    {
      number: "03",
      icon: ShieldAlert,
      titleEn: "3. Use of the Website",
      titleAr: "3. استخدام الموقع الإلكتروني",
      paragraphsEn: [
        "You agree to use this website only for lawful purposes and in a manner that does not:",
      ],
      paragraphsAr: [
        "أنت توافق على استخدام هذا الموقع الإلكتروني للأغراض المشروعة فقط وبطريقة لا تؤدي إلى أي مما يلي:",
      ],
      bulletsEn: [
        "Violate any applicable law or regulation.",
        "Infringe the rights of Taj Al Rahmah or any third party.",
        "Attempt to gain unauthorized access to the website or its systems.",
        "Introduce malicious software, viruses, or harmful code.",
        "Interfere with the operation, security, or availability of the website.",
        "Copy, reproduce, distribute, or misuse website content without authorization.",
      ],
      bulletsAr: [
        "مخالفة أي قانون أو لائحة تنظيمية معمول بها.",
        "انتهاك حقوق شركة تاج الرحمة أو أي طرف ثالث.",
        "محاولة الوصول غير المصرح به إلى الموقع أو خوادمه أو أنظمته.",
        "إدخال برامج ضارة أو فيروسات أو شفرات برمجية تخريبية.",
        "التدخل في تشغيل الموقع أو كفاءة أمانه أو إتاحته للمستخدمين.",
        "نسخ محتوى الموقع أو إعادة إنتاجه أو توزيعه أو إساءة استخدامه دون إذن رسمي مسبق.",
      ],
    },
    {
      number: "04",
      icon: Copyright,
      titleEn: "4. Intellectual Property",
      titleAr: "4. الملكية الفكرية",
      paragraphsEn: [
        "Unless otherwise stated, the content of this website, including text, graphics, photographs, logos, icons, designs, documents, videos, layouts, and other materials, is owned by or licensed to Taj Al Rahmah and is protected by applicable intellectual property laws.",
        "You may view and use website content for legitimate personal or business evaluation purposes. You may not reproduce, modify, distribute, publish, transmit, sell, or commercially exploit any website content without prior written permission from Taj Al Rahmah.",
      ],
      paragraphsAr: [
        "ما لم يُنص على خلاف ذلك، فإن كامل محتوى هذا الموقع، بما في ذلك النصوص والرسومات والصور الفوتوغرافية والشعارات والأيقونات والتصاميم والوثائق ومقاطع الفيديو والمخططات الهيكلية، مملوك لشركة تاج الرحمة أو مرخص لها ومحمي بموجب قوانين الملكية الفكرية المعمول بها.",
        "يجوز لك الاطلاع على محتوى الموقع واستخدامه لأغراض التقييم الشخصي أو التجاري المشروع. ولا يجوز لك إعادة إنتاج أي محتوى أو تعديله أو توزيعه أو نشره أو نقله أو بيعه أو استغلاله تجارياً دون الحصول على موافقة خطية مسبقة من شركة تاج الرحمة.",
      ],
    },
    {
      number: "05",
      icon: Building2,
      titleEn: "5. Company Name, Logo and Trademarks",
      titleAr: "5. اسم الشركة والشعار والعلامات التجارية",
      paragraphsEn: [
        "The Taj Al Rahmah name, logo, branding, and related marks are the property of Taj Al Rahmah or their respective owners. They may not be used, copied, modified, or reproduced without prior written authorization.",
        "Third-party names, trademarks, logos, products, or references appearing on this website remain the property of their respective owners.",
      ],
      paragraphsAr: [
        "إن اسم تاج الرحمة وشعارها وهويتها البصرية والعلامات ذات الصلة هي ملك حصري لشركة تاج الرحمة أو لأصحابها المعنيين. ولا يجوز استخدامها أو نسخها أو تعديلها أو إعادة إنتاجها دون تفويض كتابي مسبق.",
        "تظل أسماء الشركات أو العلامات التجارية أو الشعارات أو المنتجات أو المراجع التابعة لأطراف ثالثة والواردة على هذا الموقع ملكاً لأصحابها المعنيين.",
      ],
    },
    {
      number: "06",
      icon: FolderGit2,
      titleEn: "6. Project Information and Images",
      titleAr: "6. معلومات وصور المشاريع",
      paragraphsEn: [
        "Project descriptions, photographs, case studies, drawings, and other project-related materials displayed on this website are provided for informational and portfolio purposes.",
        "Project images may represent completed, ongoing, or selected stages of work. Actual project conditions, specifications, materials, finishes, timelines, and outcomes may vary depending on the specific project requirements and contractual scope.",
      ],
      paragraphsAr: [
        "يتم عرض توصيفات المشاريع والصور الفوتوغرافية ودراسات الحالة والمخططات والمواد الأخرى المتعلقة بالمشاريع على هذا الموقع لأغراض إعلامية وتوثيقية للأعمال السابقة فقط.",
        "قد تمثل صور المشاريع أعمالاً مكتملة أو قيد التنفيذ أو مراحل مختارة من العمل. وقد تختلف ظروف المشاريع الفعلية ومواصفاتها الفنية والمواد والتشطيبات والجداول الزمنية والنتائج النهائية وفقاً لمتطلبات كل مشروع والنطاق التعاقدي المعتمد.",
      ],
    },
    {
      number: "07",
      icon: Wrench,
      titleEn: "7. Technical and Product Information",
      titleAr: "7. المعلومات الفنية وبيانات المنتجات",
      paragraphsEn: [
        "Technical information, specifications, product descriptions, data sheets, and other technical materials available through the website are provided for general reference.",
        "Users should obtain project-specific technical advice, specifications, approvals, and recommendations before relying on any such information for a particular project.",
        "Where applicable, the latest manufacturer documentation and project-specific technical requirements shall apply.",
      ],
      paragraphsAr: [
        "تُتاح المعلومات الفنية والمواصفات وأوصاف المنتجات وصحائف البيانات التقنية والمواد الهندسية المتوفرة عبر الموقع كمرجع عام لأغراض التوجيه فقط.",
        "يجب على المستخدمين والعملاء الحصول على استشارات فنية ومواصفات واعتمادات وتوصيات خاصة بمشاريعهم المحددة قبل الاعتماد على أي من هذه المعلومات لتطبيقها على مشروع بعينه.",
        "حيثما ينطبق ذلك، تسري أحدث وثائق ومواصفات الجهة المصنعة والمعايير المعتمدة للمشروع المعني.",
      ],
    },
    {
      number: "08",
      icon: Receipt,
      titleEn: "8. Quotations and Requests",
      titleAr: "8. عروض الأسعار والطلبات",
      paragraphsEn: [
        "Submitting a contact form, enquiry, request for quotation, or meeting request through the website does not create a contract or obligation for Taj Al Rahmah to provide services.",
        "Any quotation, proposal, or commercial offer issued by Taj Al Rahmah will be subject to its stated validity period, scope, exclusions, commercial terms, and applicable contractual conditions.",
        "A binding relationship for services will arise only when the relevant commercial and contractual documents have been formally agreed by the applicable parties.",
      ],
      paragraphsAr: [
        "إن إرسال نموذج اتصال أو استفسار أو طلب عرض أسعار أو طلب اجتماع عبر الموقع الإلكتروني لا ينشئ عقداً ملزماً أو التزاماً قانونياً على شركة تاج الرحمة بتقديم الخدمات.",
        "يخضع أي عرض أسعار أو مقترح فني أو عرض تجاري تصدره تاج الرحمة لفترة صلاحيته المحددة ونطاق عمله واستثناءاته وشروطه التجارية والأحكام التعاقدية المعمول بها.",
        "تنشأ العلاقة القانونية الملزمة لتقديم الخدمات فقط عندما يتم الاتفاق الرسمي على المستندات التجارية والتعاقدية ذات الصلة واعتمادها وتوقيعها من قبل الأطراف المعنية.",
      ],
    },
    {
      number: "09",
      icon: ExternalLink,
      titleEn: "9. Third-Party Links",
      titleAr: "9. روابط المواقع والجهات الخارجية",
      paragraphsEn: [
        "This website may contain links to third-party websites, platforms, services, or resources for convenience or informational purposes.",
        "Taj Al Rahmah does not control or necessarily endorse third-party websites and is not responsible for their content, availability, security, privacy practices, or terms of use.",
        "You should review the terms and privacy policies of any third-party website you access.",
      ],
      paragraphsAr: [
        "قد يتضمن هذا الموقع روابط تنقلك إلى مواقع إلكترونية أو منصات أو خدمات أو مصادر تابعة لأطراف ثالثة لراحتكم وتوفير المعلومات الإضافية.",
        "لا تملك شركة تاج الرحمة السيطرة على مواقع الأطراف الثالثة ولا تؤيدها بالضرورة، وليست مسؤولة عن محتواها أو جاهزيتها أو معايير أمانها أو سياسات الخصوصية وشروط الاستخدام الخاصة بها.",
        "ننصحك بمراجعة شروط الاستخدام وسياسات الخصوصية لأي موقع خارجي تتصفحه عبر تلك الروابط.",
      ],
    },
    {
      number: "10",
      icon: Server,
      titleEn: "10. Website Availability",
      titleAr: "10. جاهزية وتوفر الموقع الإلكتروني",
      paragraphsEn: [
        "We aim to keep the website available and functioning properly. However, we do not guarantee that the website will always be available, uninterrupted, secure, or free from errors.",
        "The website may occasionally be unavailable due to maintenance, technical issues, updates, security measures, or circumstances beyond our reasonable control.",
      ],
      paragraphsAr: [
        "نسعى جاهدين للحفاظ على استمرارية توفر الموقع وعمله بشكل ملائم وفعال. ومع ذلك، فإننا لا نضمن أن يكون الموقع متاحاً على الدوام دون انقطاع، أو محصناً بالكامل، أو خالياً من الأخطاء الفنية.",
        "قد يتعذر الوصول إلى الموقع مؤقتاً في بعض الأحيان بسبب أعمال الصيانة الدورية أو التحديثات الفنية أو الإجراءات الأمنية أو الظروف القاهرة الخارجة عن إرادتنا وسيطرتنا المعقولة.",
      ],
    },
    {
      number: "11",
      icon: AlertTriangle,
      titleEn: "11. Disclaimer",
      titleAr: "11. إخلاء المسؤولية",
      paragraphsEn: [
        'To the extent permitted by applicable law, the website and its content are provided on an "as available" basis.',
        "We do not guarantee that all information will always be complete, accurate, current, or suitable for every particular purpose.",
        "Nothing on this website should be interpreted as professional, engineering, legal, financial, or other specialist advice unless expressly stated and provided by an appropriately qualified professional.",
      ],
      paragraphsAr: [
        'إلى الحد الذي يسمح به القانون المعمول به، يتم توفير الموقع وكافة محتوياته على أساس "كما هو" و"بحسب التوفر".',
        "لا نقدم أي ضمانات بأن جميع المعلومات المنشورة ستكون كاملة أو دقيقة أو محدثة أو مطابقة لغرض معين في جميع الأوقات.",
        "لا يجوز تفسير أي مادة على هذا الموقع كنصيحة مهنية أو استشارة هندسية أو قانونية أو مالية ملزمة ما لم يُنص صراحة على ذلك ويتم تقديمها من قبل متخصص معتمد بشكل رسمي.",
      ],
    },
    {
      number: "12",
      icon: Scale,
      titleEn: "12. Limitation of Liability",
      titleAr: "12. حدود المسؤولية القانونية",
      paragraphsEn: [
        "To the extent permitted by applicable law, Taj Al Rahmah shall not be responsible for any loss or damage arising directly or indirectly from:",
      ],
      paragraphsAr: [
        "إلى الحد الذي يجيزه القانون المعمول به، لن تكون شركة تاج الرحمة مسؤولة عن أي خسارة أو ضرر ينشأ بشكل مباشر أو غير مباشر عن:",
      ],
      bulletsEn: [
        "Your use of, or inability to use, the website.",
        "Reliance on general information published on the website.",
        "Errors, omissions, or outdated information.",
        "Temporary website interruption or unavailability.",
        "Viruses or other harmful elements introduced through external sources.",
        "Third-party websites, services, or content.",
      ],
      bulletsAr: [
        "استخدامك للموقع أو عدم تمكنك من استخدامه أو الوصول إليه.",
        "الاعتماد على المعلومات العامة الإرشادية المنشورة على الموقع.",
        "أي أخطاء أو سهو أو معلومات لم يتم تحديثها.",
        "الانقطاع المؤقت لخدمات الموقع أو عدم توفره لسبب تقني.",
        "الفيروسات أو البرمجيات الضارة الناتجة عن مصادر خارجية.",
        "مواقع أو خدمات أو محتويات الأطراف الثالثة.",
      ],
      footerEn:
        "Nothing in these Terms of Use excludes or limits any liability that cannot lawfully be excluded or limited under applicable law.",
      footerAr:
        "لا يوجد في شروط الاستخدام هذه ما يستبعد أو يقيد أي مسؤولية لا يمكن استبعادها أو تقييدها بصورة مشروعة بموجب القوانين السارية.",
    },
    {
      number: "13",
      icon: Lock,
      titleEn: "13. Privacy",
      titleAr: "13. الخصوصية وحماية البيانات",
      paragraphsEn: [
        "Your use of this website may involve the collection and processing of personal information.",
        "Our Privacy Policy explains how we collect, use, store, protect, and handle personal information submitted through the website.",
        "Please review our Privacy Policy together with these Terms of Use.",
      ],
      paragraphsAr: [
        "قد يتضمن استخدامك لهذا الموقع جمع ومعالجة بعض المعلومات والبيانات الشخصية.",
        "توضح سياسة الخصوصية الخاصة بنا الكيفية التي نجمع بها البيانات الشخصية المقدمة عبر الموقع ونستخدمها ونخزنها ونحميها ونتعامل معها وفق أعلى المعايير.",
        "يرجى مراجعة سياسة الخصوصية المعتمدة لدينا جنباً إلى جنب مع شروط الاستخدام هذه.",
      ],
    },
    {
      number: "14",
      icon: Cookie,
      titleEn: "14. Cookies",
      titleAr: "14. ملفات تعريف الارتباط (الكوكيز)",
      paragraphsEn: [
        "Our website may use cookies and similar technologies to support website functionality, security, analytics, and user experience.",
        "Where required, cookie use will be managed in accordance with applicable requirements and our Privacy Policy.",
      ],
      paragraphsAr: [
        "قد يستخدم موقعنا ملفات تعريف الارتباط وتقنيات التتبع المماثلة لدعم وظائف الموقع، وتعزيز الأمان، وإجراء التحليلات الإحصائية، وتحسين تجربة المستخدم العامة.",
        "حيثما يقتضي الأمر، تتم إدارة استخدام ملفات تعريف الارتباط وفقاً للمتطلبات واللوائح المعمول بها وسياسة الخصوصية المعتمدة لدينا.",
      ],
    },
    {
      number: "15",
      icon: RefreshCw,
      titleEn: "15. Changes to These Terms",
      titleAr: "15. التعديلات على هذه الشروط",
      paragraphsEn: [
        "We may update or modify these Terms of Use from time to time to reflect changes to our website, services, legal requirements, or business practices.",
        'The updated version will be published on this page with the revised "Last Updated" date.',
        "Your continued use of the website after changes are published constitutes your acceptance of the updated Terms of Use, to the extent permitted by applicable law.",
      ],
      paragraphsAr: [
        "يجوز لنا مراجعة وتحديث وتعديل شروط الاستخدام هذه من وقت لآخر لتعكس التطورات في موقعنا الإلكتروني أو نطاق خدماتنا أو المتطلبات التنظيمية والقانونية أو ممارسات أعمالنا.",
        'سيتم نشر النسخة المحدثة مباشرة على هذه الصفحة مع إيضاح تاريخ "آخر تحديث" المنقح.',
        "يُعد استمرارك في استخدام الموقع بعد نشر أي تعديلات بمثابة موافقة وقبول منك بشروط الاستخدام المحدثة، بالقدر الذي يجيزه القانون المعمول به.",
      ],
    },
    {
      number: "16",
      icon: Gavel,
      titleEn: "16. Governing Law",
      titleAr: "16. القانون الحاكم والاختصاص القضائي",
      paragraphsEn: [
        "These Terms of Use shall be governed by and interpreted in accordance with the applicable laws of the United Arab Emirates and, where applicable, the relevant laws and regulations of the Emirate of Dubai.",
        "Any disputes relating specifically to the use of this website shall be subject to the jurisdiction of the competent courts of Dubai, United Arab Emirates, unless otherwise required by applicable law.",
        "For project-specific disputes, the governing law and dispute-resolution provisions contained in the applicable contract or agreement shall apply.",
      ],
      paragraphsAr: [
        "تخضع شروط الاستخدام هذه وتفسر وتطبق وفقاً للقوانين واللوائح الاتحادية المعمول بها في دولة الإمارات العربية المتحدة، وتحديداً القوانين المحلية المعمول بها في إمارة دبي.",
        "تخضع أي نزاعات أو خلافات ناشئة تحديداً عن استخدام هذا الموقع الإلكتروني للاختصاص القضائي الحصري للمحاكم المختصة في دبي، دولة الإمارات العربية المتحدة، ما لم تنص القوانين الإلزامية على خلاف ذلك.",
        "بالنسبة للنزاعات المتعلقة بالمشاريع والعقود التجارية والإنشائية، تسري أحكام القانون الحاكم وآليات فض المنازعات المحددة في العقد أو الاتفاقية المبرمة لكل مشروع.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50/60" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Page Header Banner ── */}
      <CommonHeader
        title={isAr ? "شروط الاستخدام" : "Terms of Use"}
        breadcrumb={isAr ? "شروط الاستخدام" : "Terms of Use"}
        imagePath="/banners/Home__.png"
      />

      {/* ── Main Policy Content ── */}
      <main className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto">
        {/* Policy Introduction Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200 shadow-xs mb-10 sm:mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#01a9a0]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#01a9a0]/10 text-[#01a9a0] flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#01a9a0] tracking-tight">
                  {isAr ? "شروط الاستخدام" : "Terms of Use"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  Taj Al Rahmah Technical Services L.L.C • Dubai, UAE
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-[#01a9a0]" />
              <span>{isAr ? "آخر تحديث: 25 سبتمبر 2026" : "Last Updated: 25 September 2026"}</span>
            </div>
          </div>

          <div className="text-sm sm:text-[15.5px] text-stone-700 leading-relaxed mt-6 font-medium space-y-3">
            <p>
              {isAr
                ? "تحكم شروط الاستخدام هذه وصولك إلى موقع شركة تاج الرحمة الإلكتروني واستخدامه، بما في ذلك صفحاته ومحتواه ومعلوماته وصوره ووثائقه ونماذجه والمواد الأخرى المتاحة عبر الموقع."
                : "These Terms of Use govern your access to and use of the Taj Al Rahmah website, including its pages, content, information, images, documents, forms, and other materials made available through the website."}
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              {isAr
                ? "تنطبق شروط الاستخدام هذه على الموقع فقط. وتخضع أي خدمات بناء أو عزل مائي أو ترميم أو صيانة أو توريد أو أعمال باطن تقدمها تاج الرحمة لعرض الأسعار المعمول به، أو المقترح التجاري، أو أمر الشراء، أو العقد، ونطاق العمل المعتمد."
                : "These Terms of Use apply to the website only. Any construction, waterproofing, repair, maintenance, supply, subcontracting, or other services provided by Taj Al Rahmah will be governed by the applicable quotation, proposal, purchase order, contract, scope of work, and other agreed commercial or contractual documents."}
            </p>
          </div>
        </div>

        {/* ── Policy Sections (1 to 16) ── */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          {termsSections.map((section, idx) => {
            const Icon = section.icon;
            const paragraphs = isAr ? section.paragraphsAr : section.paragraphsEn;
            const bullets = isAr ? section.bulletsAr : section.bulletsEn;
            const footer = isAr ? section.footerAr : section.footerEn;

            return (
              <section
                key={idx}
                className="group bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 hover:border-[#01a9a0]/40 hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#01a9a0]/10 border border-[#01a9a0]/25 text-[#01a9a0] group-hover:bg-[#01a9a0] group-hover:text-white group-hover:border-[#01a9a0] flex items-center justify-center shrink-0 transition-colors duration-200 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-[#01a9a0] transition-colors duration-200 mb-3">
                      {isAr ? section.titleAr : section.titleEn}
                    </h2>

                    <div className="space-y-2.5 text-sm sm:text-[15px] text-stone-600 leading-relaxed font-normal">
                      {paragraphs.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}

                      {bullets && bullets.length > 0 && (
                        <ul className="mt-3 space-y-2 pt-1">
                          {bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#01a9a0] mt-2 shrink-0" />
                              <span className="text-stone-700">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {footer && (
                        <p className="mt-3 pt-2 text-stone-600 text-xs sm:text-sm font-medium border-t border-stone-100">
                          {footer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Section 17: Contact Us ── */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-7 bg-[#01a9a0] rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#01a9a0]">
              {isAr ? "17. اتصل بنا" : "17. Contact Us"}
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed mb-6">
            {isAr
              ? "إذا كانت لديكم أي أسئلة أو استفسارات بشأن شروط الاستخدام هذه أو المعلومات الواردة في هذا الموقع، يرجى التواصل معنا:"
              : "If you have any questions regarding these Terms of Use or the information provided on this website, please contact us:"}
          </p>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {/* Email */}
            <a
              href="mailto:info@tajalrahmah.com"
              className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#01a9a0] hover:bg-[#f0faf9] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate group-hover:text-[#01a9a0] transition-colors">
                  info@tajalrahmah.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+971556173300"
              className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#01a9a0] hover:bg-[#f0faf9] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isAr ? "الهاتف" : "Phone"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate group-hover:text-[#01a9a0] transition-colors">
                  +971 55 617 3300
                </p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#01a9a0] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {isAr ? "العنوان" : "Address"}
                </p>
                <p className="text-sm font-bold text-stone-800 truncate">
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>

          {/* Contact Page Action Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#e6f7f6] border border-[#01a9a0]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-stone-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#01a9a0] shrink-0" />
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {isAr
                  ? "يمكنكم أيضاً التواصل معنا مباشرة من خلال صفحة اتصل بنا المخصصة لأي استفسارات أو أسئلة قانونية أو فنية."
                  : "You may also contact us through our Contact Us page for any commercial, technical, or legal enquiries."}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#01a9a0] hover:bg-[#008f88] text-white text-xs sm:text-sm font-bold transition-all shrink-0 shadow-sm active:scale-95"
            >
              <span>{isAr ? "صفحة اتصل بنا" : "Contact Us Page"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
