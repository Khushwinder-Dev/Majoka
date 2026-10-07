import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
}

interface ChatRequestPayload {
  messages: ChatMessage[];
  userInfo?: UserInfo;
  isArabic?: boolean;
}

interface ChatApiResponse {
  success: boolean;
  reply: string;
  quickActions: string[];
  source: "gemini" | "fallback-knowledge-base";
  error?: string;
}

// Comprehensive Company Knowledge for Fallback
const FALLBACK_KNOWLEDGE: {
  triggers: string[];
  replyEn: (name?: string) => string;
  replyAr: (name?: string) => string;
  quickActionsEn: string[];
  quickActionsAr: string[];
}[] = [
  {
    triggers: ["quote", "price", "cost", "inspection", "survey", "estimation", "estimate", "visit"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We provide **100% Free Site Inspections & Technical Quotations** across Dubai, Sharjah, Ajman, and all UAE emirates!\n\nOur certified engineers will visit your site, inspect the roof, basement, or flooring, and deliver a detailed engineering report with an official price proposal.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}يسعدنا تقديم **معاينة موقع مجانية 100% وعرض سعر تفصيلي** في دبي، الشارقة، عجمان، وكافة إمارات الدولة!\n\nفريقنا الهندسي المعتمد جاهز لزيارة موقعك، تقييم الأسطح أو الأرضيات أو التسريبات، وتقديم تقرير فني شامل مع عرض سعر معتمد وضمان رسمي.`,
    quickActionsEn: ["Book Free Site Survey", "Chat on WhatsApp", "Call +971 52 749 2002"],
    quickActionsAr: ["حجز معاينة موقع مجانية", "تواصل عبر واتساب", "اتصل الآن +971 52 749 2002"],
  },
  {
    triggers: ["waterproof", "roof", "leak", "combo", "seepage", "damp", "rain"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Taj Al Rahmah is a premier waterproofing specialist in the UAE:\n\n• **Combo Roof System**: Complete polyurethane foam insulation and waterproofing with Dubai Municipality approval (10–25 year warranty).\n• **Polyurea Rapid Coating**: Ultra-tough seamless protective barrier for roofs, decks, and bridges.\n• **Basement & Foundation Waterproofing**: High-pressure polyurethane injection to stop active water leaks permanently.\n• **Wet Area Insulation**: Bathrooms, balconies, and kitchen waterproofing membranes.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}شركة تاج الرحمة متخصصة في أحدث حلول العزل المائي المعتمدة في الإمارات:\n\n• **نظام الكومبو المتكامل للأسطح**: عزل حراري ومائي متكامل بالبولي يوريثان فوم معتمد من بلدية دبي بضمان 10 إلى 25 عاماً.\n• **عزل البولي يوريا فائق السرعة**: طلاء فوري مرن ومتين للأسطح والجسور والمناطق المعرضة للحركة.\n• **عزل السراديب والأساسات**: حقن الشروخ المائية بالبولي يوريثان تحت ضغط عالٍ لوقف التسريبات نهائياً.\n• **عزل المناطق الرطبة**: عزل الحمامات، المطابخ، والمسابح بأحدث الأغشية العازلة.`,
    quickActionsEn: ["What is your warranty period?", "Book Roof Inspection", "Chat on WhatsApp"],
    quickActionsAr: ["ما هي مدة الضمان الرسمي؟", "طلب معاينة الأسطح", "تواصل عبر واتساب"],
  },
  {
    triggers: ["warranty", "guarantee", "certificate", "period", "years"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}All our waterproofing and structural systems come with **Official Dubai Municipality Approved Warranties** ranging from **10 to 25 Years** depending on the selected system (such as the Combo Roofing System and GRP Lining).\n\nOur warranty includes free scheduled inspections and full engineering support throughout the warranty duration.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}كافة أنظمة العزل والحماية لدينا مدعومة بـ **شهادة ضمان رسمي معتمد من بلدية دبي تتراوح بين 10 إلى 25 عاماً** حسب النظام المختار (مثل نظام الكومبو المتكامل وعزل الألياف الزجاجية GRP).\n\nيشمل الضمان زيارات تفقدية دورية ودعماً هندسياً كاملاً طوال فترة الضمان.`,
    quickActionsEn: ["Request Warranty Details", "Book Site Inspection", "Call Technical Support"],
    quickActionsAr: ["طلب تفاصيل شهادة الضمان", "حجز معاينة هندسية", "اتصال بالدعم الفني"],
  },
  {
    triggers: ["epoxy", "floor", "coating", "garage", "warehouse", "parking", "industrial"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We specialize in heavy-duty **Epoxy & Polyurethane Floor Coatings** tailored for:\n\n• Industrial Warehouses & Factories (high mechanical and chemical resistance)\n• Commercial Car Parks & Garages (anti-slip and demarcation line marking)\n• Hospitals, Clinics & Cleanrooms (hygienic, antibacterial, and seamless)\n• Commercial Showrooms & Offices (decorative metallic and high-gloss finishes).`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نقدم خدمات احترافية لطلاء **أرضيات الإيبوكسي والبولي يوريثان عالية التحمل**:\n\n• المستودعات والمصانع (مقاومة فائقة للمواد الكيميائية وحركة الرافعات الثقيلة)\n• مواقف السيارات والكراجات (تشطيبات مقاومة للانزلاق وتخطيط المسارات)\n• المستشفيات والمنشآت الصحية (أرضيات مضادة للبكتيريا وسهلة التعقيم)\n• المعارض والمحلات التجارية (إيبوكسي ديكوري ومعدني لامع).`,
    quickActionsEn: ["Epoxy Flooring Cost Estimate", "Request Material Data Sheet", "Book Site Inspection"],
    quickActionsAr: ["طلب تقدير تكلفة الإيبوكسي", "طلب المواصفات الفنية", "حجز معاينة للموقع"],
  },
  {
    triggers: ["grp", "fiberglass", "tank", "water tank", "lining"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Our **GRP (Glass Reinforced Plastic) & Fiberglass Lining** solutions are designed for:\n\n• Underground and overhead potable drinking water tanks\n• Chemical containment pits and fuel sumps\n• Swimming pools, fountains, and planter boxes\n\nAll GRP linings comply with UAE health and safety standards for potable water storage.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نقدم حلول **تبطين الألياف الزجاجية GRP (فايبر جلاس)** المتطورة المعتمدة:\n\n• خزانات مياه الشرب الأرضية والعلوية (مطابقة للمعايير الصحية لمياه الشرب)\n• أحواض المواد الكيميائية وخزانات التجميع\n• المسابح، النوافير، وأحواض الزراعة التجميلية\nتتميز بعمر افتراضي طويل ومقاومة تامة للتآكل والصدأ.`,
    quickActionsEn: ["Book Water Tank Inspection", "Chat on WhatsApp", "Get a Quote"],
    quickActionsAr: ["حجز فحص خزان المياه", "تواصل عبر واتساب", "طلب عرض سعر"],
  },
  {
    triggers: ["contact", "phone", "call", "address", "location", "office", "timing", "hours"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}You can connect directly with our technical support team:\n\n📞 **Phone / Hotline**: +971 52 749 2002 / +971 4 234 5678\n📧 **Email**: info@tajalrahmah.com\n📍 **Office**: Office G-01-691, Al Khabaisi, Deira, Dubai, UAE\n⏰ **Working Hours**: Monday – Saturday: 9:00 AM – 6:00 PM (Closed on Sunday)\n🌐 **Service Area**: Dubai, Sharjah, Ajman, Abu Dhabi & entire UAE.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}يمكنك التواصل معنا مباشرة عبر القنوات التالية:\n\n📞 **الهاتف المباشر**: 2002 749 52 971+ / 5678 234 4 971+\n📧 **البريد الإلكتروني**: info@tajalrahmah.com\n📍 **المكتب الرئيسي**: مكتب G-01-691، الخبيصي، ديرة، دبي، الإمارات\n⏰ **أوقات العمل**: من الإثنين إلى السبت: 9:00 صباحاً – 6:00 مساءً\n🌐 **مناطق الخدمة**: دبي، الشارقة، عجمان، أبوظبي وجميع إمارات الدولة.`,
    quickActionsEn: ["Call Support Now", "Chat on WhatsApp", "Request Site Inspection"],
    quickActionsAr: ["اتصل الآن بالدعم", "تواصل عبر واتساب", "طلب معاينة هندسية"],
  },
  {
    triggers: ["crack", "repair", "injection", "concrete", "structural", "spalling", "damage"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We provide specialized **Concrete Rehabilitation & Crack Injection Services**:\n\n• High-Pressure Polyurethane & Epoxy Injection to seal structural cracks\n• Carbon Fiber Reinforcement (CFRP) for beam and slab strengthening\n• Concrete spalling and rebar rust treatment\n• Waterproof barrier restoration for retaining walls and basements.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نقدم خدمات متخصصة في **إصلاح وترميم الخرسانة وحقن الشروخ الإنشائية**:\n\n• حقن الشروخ الخرسانية بالإيبوكسي والبولي يوريثان تحت ضغط عالي\n• تدعيم العناصر الإنشائية بألياف الكربون المركبة (CFRP)\n• معالجة تساقط الخرسانة وصدأ حديد التسليح\n• إصلاح الجدران الاستنادية وحواجز المياه في السراديب.`,
    quickActionsEn: ["Request Structural Inspection", "Chat on WhatsApp", "Call Engineer Directly"],
    quickActionsAr: ["طلب فحص إنشائي للموقع", "تواصل عبر واتساب", "اتصال بمهندس الموقع"],
  },
];

function getFallbackReply(
  userQuery: string,
  isArabic: boolean,
  userName?: string
): { reply: string; quickActions: string[] } {
  const queryLower = userQuery.toLowerCase();

  for (const item of FALLBACK_KNOWLEDGE) {
    if (item.triggers.some((trigger) => queryLower.includes(trigger))) {
      return {
        reply: isArabic ? item.replyAr(userName) : item.replyEn(userName),
        quickActions: isArabic ? item.quickActionsAr : item.quickActionsEn,
      };
    }
  }

  // Generic fallback if no specific trigger matches
  return {
    reply: isArabic
      ? `${userName ? `أهلاً بك يا ${userName}، ` : "أهلاً بك! "}أنا المساعد الذكي لشركة **تاج الرحمة للمقاولات والعزل** في الإمارات. كيف يمكنني خدمتك اليوم؟\n\nنحن متخصصون في:\n• عزل الأسطح بنظام الكومبو (ضمان 10-25 عاماً)\n• طلاء أرضيات الإيبوكسي للمستودعات ومواقف السيارات\n• عزل خزانات المياه بالألياف الزجاجية GRP\n• حقن الشروخ الخرسانية ووقف تسريبات المياه\n\nنوفر **معاينة موقع مجانية** لجميع المشاريع في دبي وكافة الإمارات.`
      : `${userName ? `Hello ${userName}, ` : "Hello! "}I am the AI Customer Support Assistant for **Taj Al Rahmah Contracting** in the UAE. How can I assist you today?\n\nWe specialize in:\n• Combo Roof Waterproofing System (10–25 year warranty)\n• Heavy-Duty Epoxy & PU Floor Coatings\n• GRP Water Tank Lining & Waterproofing\n• Structural Crack Injection & Concrete Repair\n\nWe offer **100% Free Site Inspections & Quotations** across Dubai and all UAE emirates.`,
    quickActions: isArabic
      ? ["طلب معاينة وعرض سعر مجاني", "ما هي خدمات العزل لديكم؟", "تواصل عبر واتساب", "اتصل بنا مباشرة"]
      : ["Book Free Site Inspection", "What waterproofing systems do you offer?", "Chat on WhatsApp", "Call Us Directly"],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestPayload = await request.json().catch(() => ({ messages: [] }));
    const { messages = [], userInfo = {}, isArabic = false } = body;

    const latestUserMessage = messages.filter((m) => m.sender === "user").slice(-1)[0]?.text || "";
    const userName = userInfo.name?.trim() || "";

    if (!latestUserMessage.trim()) {
      return NextResponse.json(
        {
          success: false,
          reply: isArabic ? "يرجى كتابة رسالتك أو استفسارك." : "Please provide your question or message.",
          quickActions: [],
          source: "fallback-knowledge-base",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim() || "";

    // If an API key is configured, attempt Gemini API with model cascade
    if (apiKey) {
      try {
        const systemPrompt = `You are the official Customer Support & Technical Solutions Assistant for "Taj Al Rahmah Contracting" (شركة تاج الرحمة للعزل وصيانة المباني), a leading construction and waterproofing company in Dubai and the UAE.

Company Details:
- Office: Office G-01-691, Al Khabaisi, Deira, Dubai, UAE.
- Hotline Phone: +971 52 749 2002 / +971 4 234 5678.
- Email: info@tajalrahmah.com.
- Hours: Mon-Sat 9:00 AM - 6:00 PM.
- Coverage: Dubai, Sharjah, Ajman, Abu Dhabi, and all UAE emirates.
- Core Services:
  1. Combo Roof Waterproofing System (certified by Dubai Municipality, 10–25 years warranty).
  2. GRP Fiberglass Lining for potable water tanks, chemical pits, swimming pools.
  3. Epoxy & Polyurethane Flooring for warehouses, car parks, hospitals, commercial buildings.
  4. Polyurea rapid-cure waterproof coatings for roofs and bridges.
  5. Structural Crack Injection (high-pressure polyurethane) & Concrete Rehabilitation.
  6. Wet areas (bathrooms, balconies, kitchens) waterproofing.
- Policy: Free site inspection and quote across UAE. Official certified warranty certificates provided.

Customer Context:
- Customer Name: ${userName || "Valued Client"}
- Preferred Language: ${isArabic ? "Arabic" : "English"}

Instructions:
1. Greet politely and answer customer support, inquiries, and technical questions directly, accurately, and professionally.
2. If the user writes in Arabic, reply in professional, warm Arabic. If English, reply in clear, professional English.
3. Keep the answer structured, well-formatted with markdown bullet points if listing items.
4. Output MUST be ONLY valid JSON matching this schema (no markdown code blocks, raw JSON only):
{
  "reply": "Your helpful response string here",
  "quickActions": ["Suggested Next Step 1", "Suggested Next Step 2", "Suggested Next Step 3"]
}`;

        // Build recent conversation turns for context
        const conversationHistory = messages.slice(-6).map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

        const candidateModels = ["gemini-3.8-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

        for (const model of candidateModels) {
          try {
            const geminiResponse = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [{ text: systemPrompt }],
                    },
                    ...conversationHistory,
                  ],
                  generationConfig: {
                    temperature: 0.4,
                    topP: 0.95,
                    maxOutputTokens: 800,
                  },
                }),
              }
            );

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json();
              const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
              const cleanJson = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

              try {
                const parsed = JSON.parse(cleanJson);
                if (parsed && parsed.reply) {
                  return NextResponse.json<ChatApiResponse>({
                    success: true,
                    reply: parsed.reply,
                    quickActions: Array.isArray(parsed.quickActions) ? parsed.quickActions : [],
                    source: "gemini",
                  });
                }
              } catch {
                // If response wasn't strictly JSON, return raw text directly
                if (cleanJson) {
                  return NextResponse.json<ChatApiResponse>({
                    success: true,
                    reply: cleanJson,
                    quickActions: isArabic
                      ? ["طلب معاينة وعرض سعر مجاني", "تواصل عبر واتساب", "اتصل بنا مباشرة"]
                      : ["Book Free Site Inspection", "Chat on WhatsApp", "Call Us Directly"],
                    source: "gemini",
                  });
                }
              }
            }
          } catch (modelErr) {
            console.warn(`Model ${model} request error:`, modelErr);
          }
        }
      } catch (geminiError) {
        console.warn("Gemini chat API error, switching to fallback:", geminiError);
      }
    }

    // Seamless Fallback Knowledge Engine (guarantees 100% uptime and answers for users)
    const fallback = getFallbackReply(latestUserMessage, isArabic, userName);
    return NextResponse.json<ChatApiResponse>({
      success: true,
      reply: fallback.reply,
      quickActions: fallback.quickActions,
      source: "fallback-knowledge-base",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json<ChatApiResponse>(
      {
        success: false,
        reply: "We are currently experiencing a brief technical delay. Please call us directly at +971 52 749 2002 or contact us on WhatsApp.",
        quickActions: ["Call Now", "Chat on WhatsApp"],
        source: "fallback-knowledge-base",
        error: error?.message || "Internal error",
      },
      { status: 500 }
    );
  }
}
