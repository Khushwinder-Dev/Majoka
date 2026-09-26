"use client";

import React from "react";
import CommonHeader from "@/components/Common/CommonHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  Database,
  CheckCircle2,
  Inbox,
  Share2,
  Cookie,
  ExternalLink,
  Lock,
  Clock,
  Scale,
  ShieldAlert,
  Globe,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface PrivacySection {
  number: string;
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  paragraphsEn?: string[];
  paragraphsAr?: string[];
  subGroupsEn?: {
    subTitle?: string;
    bullets: string[];
  }[];
  subGroupsAr?: {
    subTitle?: string;
    bullets: string[];
  }[];
  bulletsEn?: string[];
  bulletsAr?: string[];
  footerEn?: string;
  footerAr?: string;
}

export default function PrivacyPage() {
  const { isArabic } = useLanguage();
  const isAr = isArabic;

  const privacySections: PrivacySection[] = [
    {
      number: "01",
      icon: ShieldCheck,
      titleEn: "1. Introduction",
      titleAr: "1. مقدمة عامة",
      paragraphsEn: [
        "Taj Al Rahmah is committed to respecting your privacy and protecting the personal information you provide when you visit or use our website.",
        "This Privacy Policy explains how we collect, use, store, and protect information submitted through our website, including information provided through contact forms, quotation requests, consultation requests, career applications, and other website interactions.",
        "By using this website, you acknowledge the practices described in this Privacy Policy.",
      ],
      paragraphsAr: [
        "تلتزم شركة تاج الرحمة باحترام خصوصيتك وحماية معلوماتك وبياناتك الشخصية التي تزودنا بها عند زيارة موقعنا الإلكتروني أو استخدامه.",
        "توضح سياسة الخصوصية هذه الكيفية التي نقوم من خلالها بجمع واستخدام وتخزين وحماية المعلومات المقدمة عبر موقعنا الإلكتروني، بما في ذلك البيانات المقدمة من خلال نماذج الاتصال، وطلبات عروض الأسعار، واستشارات المشاريع، وطلبات التوظيف، وسائر تفاعلات الموقع.",
        "يُعد استخدامك لهذا الموقع بمثابة إقرار وموافقة منك على الممارسات والإجراءات الموضحة في سياسة الخصوصية هذه.",
      ],
    },
    {
      number: "02",
      icon: Database,
      titleEn: "2. Information We Collect",
      titleAr: "2. المعلومات التي نجمعها",
      paragraphsEn: [
        "We may collect information that you voluntarily provide to us, as well as limited technical information collected automatically during your visit:",
      ],
      paragraphsAr: [
        "قد نقوم بجمع المعلومات التي تقدمها لنا طواعية، بالإضافة إلى معلومات تقنية محدودة يتم جمعها تلقائياً أثناء زيارتك للموقع:",
      ],
      subGroupsEn: [
        {
          subTitle: "Information You Voluntarily Provide:",
          bullets: [
            "Name and contact person",
            "Company or business name",
            "Email address and telephone / mobile number",
            "Project or service requirements and technical specifications",
            "Location or project site information (Emirates, community, plot)",
            "Information submitted through enquiry, quotation, or consultation forms",
            "Information included in uploaded documents, architectural plans, or attachments",
            "Employment-related information submitted through career and job applications",
          ],
        },
        {
          subTitle: "Technical Information Collected Automatically:",
          bullets: [
            "IP address and internet service provider details",
            "Browser type, language, and version",
            "Device type, screen resolution, and hardware model",
            "Operating system",
            "Pages visited, navigation paths, and time spent on pages",
            "Date, timestamp, and duration of visits",
            "General website usage, interaction metrics, and referral source",
          ],
        },
      ],
      subGroupsAr: [
        {
          subTitle: "المعلومات التي تقدمها لنا طواعية:",
          bullets: [
            "الاسم واسم جهة الاتصال المعنية",
            "اسم الشركة أو المؤسسة أو الجهة التجارية",
            "عنوان البريد الإلكتروني ورقم الهاتف / المتحرك",
            "متطلبات المشروع أو الخدمة والمواصفات الفنية المطلوبة",
            "موقع المشروع أو الإمارة أو المنطقة",
            "البيانات المقدمة عبر نماذج الاستفسار، أو طلب عرض السعر، أو حجز موعد معاينة",
            "المعلومات المتضمنة في الوثائق المرفقة، أو المخططات الهندسية، أو الملفات المرفوعة",
            "البيانات المهنية والسيرة الذاتية المقدمة من خلال نماذج التوظيف والوظائف",
          ],
        },
        {
          subTitle: "المعلومات التقنية التي يتم جمعها تلقائياً:",
          bullets: [
            "عنوان بروتوكول الإنترنت (IP Address)",
            "نوع متصفح الويب وإصداره ولغته المعتمدة",
            "نوع الجهاز ونظام التشغيل ومواصفات الشاشة",
            "نظام التشغيل المستخدم",
            "الصفحات التي تمت زيارتها والمسار المتبع ومدة التصفح",
            "تاريخ الزيارة ووقتها الدقيق",
            "بيانات الاستخدام العامة ومصادر الإحالة للموقع",
          ],
        },
      ],
    },
    {
      number: "03",
      icon: CheckCircle2,
      titleEn: "3. How We Use Your Information",
      titleAr: "3. كيفية استخدام معلوماتك",
      paragraphsEn: [
        "We may use the information we collect for the following legitimate business purposes:",
      ],
      paragraphsAr: [
        "نستخدم المعلومات التي نجمعها للأغراض التجارية والتشغيلية المشروعة التالية:",
      ],
      bulletsEn: [
        "Respond to your enquiries, technical questions, and requests efficiently.",
        "Prepare detailed commercial quotations, technical submittals, and proposals.",
        "Provide requested contracting, waterproofing, insulation, and repair services or consultations.",
        "Understand your project specifications and engineering requirements accurately.",
        "Communicate with you regarding our services, milestones, and project updates.",
        "Schedule on-site technical inspections, client meetings, or specialist consultations.",
        "Process, evaluate, and respond to career and job applications.",
        "Improve our website performance, service delivery, and digital user experience.",
        "Maintain website security, prevent fraud, and mitigate misuse or cyber risks.",
        "Comply with applicable legal, statutory, and regulatory obligations in the UAE.",
      ],
      bulletsAr: [
        "الرد على استفساراتكم وأسئلتكم الفنية وطلباتكم المتنوعة بكفاءة ومهنية.",
        "إعداد عروض الأسعار التجارية والمقترحات الفنية والمواصفات المعتمدة لمشاريعكم.",
        "تقديم خدمات المقاولات والعزل المائي والحراري والترميم والصيانة أو الاستشارات المطلوبة.",
        "فهم متطلبات مشاريعكم ومواصفاتها الهندسية والإنشائية بدقة.",
        "التواصل معكم بشأن خدماتنا ومراحل تنفيذ الأعمال وجداول التسليم.",
        "تنسيق وجدولة الزيارات الميدانية والمعاينات الهندسية واجتماعات العمل.",
        "مراجعة وتقييم طلبات التوظيف والتواصل مع المتقدمين المؤهلين.",
        "تحسين أداء الموقع الإلكتروني وجودة المحتوى وتعزيز تجربة المستخدم الرقمية.",
        "حماية أمان الموقع الإلكتروني ومنع الاحتيال أو إساءة الاستخدام.",
        "الامتثال للمتطلبات واللوائح القانونية والتنظيمية المعمول بها في دولة الإمارات.",
      ],
      footerEn:
        "We will use personal information only for legitimate business purposes related to our contracting services and website operations.",
      footerAr:
        "نحن نستخدم البيانات الشخصية حصرياً للأغراض التجارية المشروعة المرتبطة بخدماتنا وعمليات موقعنا الإلكتروني.",
    },
    {
      number: "04",
      icon: Inbox,
      titleEn: "4. Contact and Enquiry Forms",
      titleAr: "4. نماذج الاتصال والاستفسار",
      paragraphsEn: [
        "When you submit information through a contact, quotation, consultation, or other enquiry form, the information may be used by our authorized team members to respond to your request.",
        "Please do not submit confidential, sensitive, or unnecessary personal information through website forms. Use direct official communications if your materials require specialized non-disclosure agreements.",
      ],
      paragraphsAr: [
        "عند قيامك بإرسال بيانات من خلال نموذج اتصال، أو طلب تسعير، أو حجز استشارة، أو أي نموذج استفسار آخر، فإن هذه البيانات ستُستخدم حصرياً من قبل أعضاء فريقنا المصرح لهم للرد على طلبك ومتابعته.",
        "يرجى عدم إرسال معلومات سرية أو حساسة للغاية أو بيانات شخصية غير ضرورية عبر نماذج الموقع الإلكتروني العامة.",
      ],
    },
    {
      number: "05",
      icon: Share2,
      titleEn: "5. Sharing of Information",
      titleAr: "5. مشاركة المعلومات مع الغير",
      paragraphsEn: [
        "We do not sell or rent your personal information to any third parties under any circumstances.",
        "Your information may be shared with authorized employees, representatives, professional advisers, service providers, or technology providers where reasonably necessary to operate our website, respond to your request, provide our services, or meet legal and regulatory obligations.",
        "Where third-party service providers are used, we expect them to handle information appropriately, securely, and only for the agreed purposes for which it is provided.",
      ],
      paragraphsAr: [
        "نحن لا نقوم ببيع أو تأجير أو المتاجرة بمعلوماتك الشخصية لأي طرف ثالث تحت أي ظرف من الظروف.",
        "قد تتم مشاركة بياناتك مع الموظفين المعتمدين، أو الممثلين الرسميين، أو المستشارين المهنيين، أو مزودي الخدمات التقنية في الحدود اللازمة لتشغيل الموقع، أو الرد على طلبك، أو تنفيذ خدماتنا، أو الامتثال للالتزامات القانونية.",
        "عند الاستعانة بمزودي خدمات خارجيين، فإننا نلزمهم بالتعامل مع البيانات بأعلى درجات الأمان والسرية واقتصار استخدامها على الأغراض المحددة فقط.",
      ],
    },
    {
      number: "06",
      icon: Cookie,
      titleEn: "6. Cookies and Similar Technologies",
      titleAr: "6. ملفات تعريف الارتباط والتقنيات المشابهة",
      paragraphsEn: [
        "Our website may use cookies and similar technologies to support website functionality, security, performance, analytics, and user experience.",
        "Cookies may help us understand how visitors use our website and improve its content and functionality.",
        "You may be able to manage or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.",
        "For more information, please refer to our Cookie Policy.",
      ],
      paragraphsAr: [
        "قد يستخدم موقعنا ملفات تعريف الارتباط (الكوكيز) والتقنيات المشابهة لدعم وظائف الموقع، وتعزيز الأمان، وتحسين سرعة الأداء، وإجراء التحليلات الإحصائية وتجربة المستخدم.",
        "تساعدنا هذه الملفات على فهم كيفية تفاعل الزوار مع صفحات الموقع لتطوير المحتوى وتحسين كفاءته.",
        "يمكنك إدارة تفضيلات ملفات تعريف الارتباط أو تعطيلها عبر إعدادات متصفحك الخاص، مع الأخذ بالاعتبار أن تعطيل بعضها قد يؤثر على عمل بعض خصائص الموقع.",
        "لمزيد من التفاصيل، يرجى مراجعة صفحة سياسة ملفات تعريف الارتباط المعتمدة لدينا.",
      ],
    },
    {
      number: "07",
      icon: ExternalLink,
      titleEn: "7. Third-Party Services and Links",
      titleAr: "7. الخدمات والروابط التابعة لأطراف ثالثة",
      paragraphsEn: [
        "Our website may contain links to third-party websites, platforms, social media services, video platforms, maps, or other external services.",
        "These third parties may have their own privacy policies and terms of use. We are not responsible for the privacy practices, content, or security of third-party websites or services.",
        "We recommend reviewing the privacy policies of third-party services before providing them with personal information.",
      ],
      paragraphsAr: [
        "قد يتضمن موقعنا روابط خارجية تنقلك إلى مواقع إلكترونية، أو منصات وسائط اجتماعية، أو خدمات استضافة الفيديو، أو خرائط تفاعلية، أو خدمات رقمية تابعة لأطراف ثالثة.",
        "تخضع تلك المواقع والخدمات لسياسات الخصوصية وشروط الاستخدام الخاصة بأصحابها، ولا نتحمل أي مسؤولية عن ممارسات الخصوصية أو المحتوى أو معايير الأمان لتلك المنصات الخارجية.",
        "نوصي بالاطلاع على سياسات الخصوصية الخاصة بتلك الجهات قبل تزويدهم بأي معلومات شخصية.",
      ],
    },
    {
      number: "08",
      icon: Lock,
      titleEn: "8. Data Security",
      titleAr: "8. أمن وسلامة البيانات",
      paragraphsEn: [
        "We take reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.",
        "However, no website, online transmission, or electronic storage system can be guaranteed to be completely secure.",
      ],
      paragraphsAr: [
        "نتخذ كافة التدابير الفنية والإدارية والتنظيمية المعقولة والمناسبة لحماية البيانات الشخصية من الوصول غير المصرح به، أو الضياع، أو سوء الاستخدام، أو التعديل، أو الإفصاح غير القانوني.",
        "ومع ذلك، يرجى العلم بأنه لا يمكن لأي وسيلة نقل عبر الإنترنت أو نظام تخزين إلكتروني أن يضمن الأمان بنسبة مئة بالمئة.",
      ],
    },
    {
      number: "09",
      icon: Clock,
      titleEn: "9. Data Retention",
      titleAr: "9. فترة الاحتفاظ بالبيانات",
      paragraphsEn: [
        "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including responding to enquiries, providing services, maintaining business records, resolving disputes, and meeting applicable legal or regulatory requirements.",
        "When information is no longer required, we may securely delete or anonymize it where appropriate.",
      ],
      paragraphsAr: [
        "نحتفظ بالمعلومات الشخصية فقط للفترة الزمنية الضرورية لتحقيق الأغراض التي جُمعت من أجلها، بما في ذلك الرد على الاستفسارات، وتنفيذ العقود والمشاريع، وحفظ السجلات التجارية المعتمدة، وفض المنازعات، والامتثال للمتطلبات التنظيمية والقانونية.",
        "وعند انتفاء الحاجة لتلك البيانات، نقوم بحذفها أو إتلافها أو إخفاء هويتها بطرق آمنة وموثوقة.",
      ],
    },
    {
      number: "10",
      icon: Scale,
      titleEn: "10. Your Privacy Rights",
      titleAr: "10. حقوق الخصوصية الخاصة بك",
      paragraphsEn: [
        "Subject to applicable laws and regulations, you may have rights regarding your personal information, including the right to:",
      ],
      paragraphsAr: [
        "وفقاً للقوانين والأنظمة المعمول بها في دولة الإمارات، قد تتمتع بحقوق معينة فيما يتعلق بمعلوماتك الشخصية، ومنها:",
      ],
      bulletsEn: [
        "Request information about how your personal data is handled and processed.",
        "Request access to personal information we hold about you.",
        "Request correction of inaccurate, incomplete, or outdated information.",
        "Request deletion of personal information where legally applicable.",
        "Withdraw consent where processing is based on consent.",
        "Raise concerns regarding the handling of your personal information.",
      ],
      bulletsAr: [
        "طلب معلومات حول كيفية معالجة بياناتك الشخصية والتعامل معها.",
        "طلب الاطلاع والوصول إلى المعلومات الشخصية المحفوظة لدينا عنك.",
        "طلب تصحيح أو استكمال أي بيانات غير دقيقة أو منقوصة.",
        "طلب حذف البيانات الشخصية في الحالات التي يجيزها القانون.",
        "سحب الموافقة على معالجة البيانات متى ما كانت المعالجة مستندة إلى الموافقة المسبقة.",
        "إبداء الملاحظات وتقديم الشكاوى المتعلقة بالتعامل مع بياناتك الشخصية.",
      ],
      footerEn:
        "Requests may be subject to applicable legal requirements and reasonable identity verification procedures.",
      footerAr:
        "قد تخضع معالجة هذه الطلبات للمتطلبات القانونية السارية وإجراءات التحقق المعقولة من الهوية.",
    },
    {
      number: "11",
      icon: ShieldAlert,
      titleEn: "11. Children's Privacy",
      titleAr: "11. خصوصية القاصرين والأطفال",
      paragraphsEn: [
        "Our website and services are intended primarily for businesses, professionals, and general adult users of our contracting and construction services.",
        "We do not knowingly collect personal information from children through our website.",
      ],
      paragraphsAr: [
        "موقعنا وخدماتنا موجهة ومخصصة في المقام الأول للشركات والمؤسسات والمهنيين والمستخدمين البالغين الباحثين عن خدمات المقاولات والإنشاءات.",
        "نحن لا نقوم بجمع أو طلب معلومات شخصية من الأطفال أو القاصرين عن قصد أو دراية.",
      ],
    },
    {
      number: "12",
      icon: Globe,
      titleEn: "12. International Data Transfers",
      titleAr: "12. النقل الدولي للبيانات",
      paragraphsEn: [
        "Depending on the technology providers and cloud services used to operate our website and business, personal information may be processed or stored in locations outside the United Arab Emirates.",
        "Where applicable, we take reasonable steps to ensure that such processing is carried out in accordance with applicable data protection requirements.",
      ],
      paragraphsAr: [
        "وفقاً لمزودي الحلول التقنية والخدمات السحابية المعتمدة لتشغيل موقعنا الإلكتروني وأعمالنا، قد تتم معالجة بعض البيانات أو تخزينها في خوادم تقع خارج دولة الإمارات العربية المتحدة.",
        "وحيثما ينطبق ذلك، نتخذ خطوات وإجراءات كافية لضمان توافق تلك المعالجة مع معايير ومتطلبات حماية البيانات السارية.",
      ],
    },
    {
      number: "13",
      icon: RefreshCw,
      titleEn: "13. Changes to This Privacy Policy",
      titleAr: "13. التعديلات على سياسة الخصوصية",
      paragraphsEn: [
        "We may update this Privacy Policy from time to time to reflect changes in our website, services, technology, legal requirements, or business practices.",
        'The updated version will be published on this page with the revised "Last Updated" date.',
      ],
      paragraphsAr: [
        "يجوز لنا تحديث ومراجعة سياسة الخصوصية هذه دورياً لمواكبة أي تغييرات تطرأ على موقعنا، أو نطاق خدماتنا، أو الأنظمة التقنية، أو المتطلبات القانونية، أو الممارسات التشغيلية.",
        'سيتم نشر أي تعديل جديد مباشرة على هذه الصفحة مصحوباً بتاريخ "آخر تحديث" المحدث.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50/60" dir={isAr ? "rtl" : "ltr"}>
      {/* ── Page Header Banner ── */}
      <CommonHeader
        title={isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        breadcrumb={isAr ? "سياسة الخصوصية" : "Privacy Policy"}
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
                  {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                  Taj Al Rahmah Technical Services L.L.C • Dubai, UAE
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-[#01a9a0]" />
              <span>{isAr ? "آخر تحديث: 26 سبتمبر 2026" : "Last Updated: 26 September 2026"}</span>
            </div>
          </div>

          <div className="text-sm sm:text-[15.5px] text-stone-700 leading-relaxed mt-6 font-medium space-y-3">
            <p>
              {isAr
                ? "تلتزم شركة تاج الرحمة باحترام خصوصيتك وحماية المعلومات الشخصية التي تقدمها عند زيارة أو استخدام موقعنا الإلكتروني."
                : "Taj Al Rahmah is committed to respecting your privacy and protecting the personal information you provide when you visit or use our website."}
            </p>
            <p className="text-stone-600 text-xs sm:text-sm">
              {isAr
                ? "توضح هذه السياسة كيفية جمع واستخدام وتخزين وحماية المعلومات المقدمة عبر الموقع، بما في ذلك طلبات الأسعار والاستشارات ونماذج التوظيف. باستخدام هذا الموقع، فإنك تقر بالممارسات الموضحة هنا."
                : "This Privacy Policy explains how we collect, use, store, and protect information submitted through our website, including information provided through contact forms, quotation requests, consultation requests, career applications, and other website interactions. By using this website, you acknowledge the practices described in this Privacy Policy."}
            </p>
          </div>
        </div>

        {/* ── Policy Sections (1 to 13) ── */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          {privacySections.map((section, idx) => {
            const Icon = section.icon;
            const paragraphs = isAr ? section.paragraphsAr : section.paragraphsEn;
            const subGroups = isAr ? section.subGroupsAr : section.subGroupsEn;
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
                      {paragraphs &&
                        paragraphs.map((para, pIdx) => <p key={pIdx}>{para}</p>)}

                      {/* Sub-groups (used for Information We Collect) */}
                      {subGroups &&
                        subGroups.map((group, gIdx) => (
                          <div key={gIdx} className="pt-2">
                            {group.subTitle && (
                              <p className="font-semibold text-stone-800 text-xs sm:text-sm mb-2">
                                {group.subTitle}
                              </p>
                            )}
                            <ul className="space-y-2">
                              {group.bullets.map((item, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#01a9a0] mt-2 shrink-0" />
                                  <span className="text-stone-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                      {/* Regular bullet list */}
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

        {/* ── Section 14: Contact Us ── */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-stone-200 shadow-xs mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-7 bg-[#01a9a0] rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#01a9a0]">
              {isAr ? "14. اتصل بنا" : "14. Contact Us"}
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-stone-600 leading-relaxed mb-3">
            {isAr
              ? "إذا كانت لديكم أي أسئلة أو استفسارات أو طلبات بخصوص سياسة الخصوصية هذه أو التعامل مع معلوماتكم الشخصية، يرجى التواصل معنا عبر القنوات المتاحة أدناه:"
              : "If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us through our Contact Us page or the contact details provided below:"}
          </p>

          <p className="text-xs sm:text-sm text-stone-500 font-medium mb-6 italic">
            {isAr
              ? "بالنسبة للاستفسارات المتعلقة بالخصوصية، يرجى تضمين معلومات كافية حتى نتمكن من فهم طلبك والرد عليه بدقة."
              : "For privacy-related enquiries, please include sufficient information for us to understand and respond to your request."}
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
                  {isAr ? "الموقع" : "Location"}
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
                  ? "يمكنكم أيضاً التواصل معنا مباشرة من خلال صفحة اتصل بنا المخصصة لأي استفسارات أو أسئلة حول حماية بياناتكم."
                  : "You may also reach our team through our Contact Us page for any privacy-related enquiries."}
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
