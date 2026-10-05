import { NextRequest, NextResponse } from "next/server";
import { SITE_SEARCH_INDEX, SearchResultItem } from "@/data/searchIndex";

interface ImageSearchResponse {
  success: boolean;
  detectedEn: string;
  detectedAr: string;
  category: "Service" | "Product" | "Project" | "Solution";
  confidence: "high" | "medium" | "low";
  descriptionEn: string;
  descriptionAr: string;
  matchedItems: SearchResultItem[];
  suggestedKeywords: string[];
  aiSource: "gemini" | "catalog-matcher";
}

const FALLBACK_CATEGORIES = [
  {
    keywords: ["crack", "concrete", "structural", "spall", "injection", "resin", "damage", "beam", "column", "slab", "foundation"],
    detectedEn: "Concrete Structural Damage & Crack Repair",
    detectedAr: "تشققات وتلف خرساني إنشائي — معالجة وحقن",
    category: "Service" as const,
    descriptionEn: "Identified concrete structural cracking or deterioration. Taj Al Rahmah provides certified polyurethane and epoxy resin injection, structural restoration, and carbonation protection.",
    descriptionAr: "تم رصد تشققات أو تآكل في البنية الخرسانية. تقدم تاج الرحمة خدمات الحقن الإنشائي براتنجات الإيبوكسي والبولي يوريثان وترميم وحماية الخرسانة.",
    searchTerms: ["concrete repair", "injection", "structural repair", "crack repair"],
  },
  {
    keywords: ["leak", "water", "damp", "moisture", "stain", "ceiling", "seepage", "roof", "terrace", "balcony", "combo", "membrane"],
    detectedEn: "Water Ingress & Roof Waterproofing",
    detectedAr: "تسرب مياه وعزل مائي للأسطح",
    category: "Service" as const,
    descriptionEn: "Detected signs of water leakage or surface needing moisture protection. We specialize in Combo Roofing systems, torch-on bituminous membranes, and liquid waterproofing coatings.",
    descriptionAr: "تم رصد آثار تسرب مياه أو سطح بحاجة إلى عزل رطوبة. نتخصص في نظام كومبو المتكامل وعوازل البيتومين والطلاءات المائية المقاومة للحرارة.",
    searchTerms: ["waterproofing", "combo roof", "roof waterproofing", "membrane"],
  },
  {
    keywords: ["epoxy", "floor", "flooring", "warehouse", "parking", "garage", "coating", "screed", "industrial", "polyurethane"],
    detectedEn: "Industrial Epoxy & Polyurethane Flooring",
    detectedAr: "أرضيات إيبوكسي صناعية وطلاءات واقية",
    category: "Service" as const,
    descriptionEn: "Detected floor surface suitable for high-durability coating. Taj Al Rahmah applies heavy-duty self-leveling epoxy, anti-static flooring, and car park coatings.",
    descriptionAr: "تم رصد أرضية ملائمة للطلاءات التخصصية المقاومة للاحتكاك والمواد الكيميائية ومواقف السيارات والمستودعات الصناعية.",
    searchTerms: ["epoxy", "flooring", "industrial floor", "car park coating"],
  },
  {
    keywords: ["tank", "lining", "potable", "grp", "fiberglass", "water tank", "reservoir"],
    detectedEn: "GRP / Fiberglass Tank Lining & Waterproofing",
    detectedAr: "تبطين وعزل خزانات المياه بألياف الفيبرجلاس (GRP)",
    category: "Service" as const,
    descriptionEn: "Identified water storage tank or containment area. We provide food-grade certified GRP lining for potable water tanks and industrial chemical storage.",
    descriptionAr: "تم رصد خزان مياه أو مساحة تخزين سوائل. نقدم خدمات التبطين والعزل المعتمد لمياه الشرب والخزانات الكيميائية باستخدام ألياف GRP.",
    searchTerms: ["tank lining", "grp", "water tank", "fiberglass"],
  },
  {
    keywords: ["pool", "swimming", "tile", "mosaic", "leakage", "jacuzzi", "water feature"],
    detectedEn: "Swimming Pool Waterproofing & Sealing",
    detectedAr: "عزل وصيانة أحواض السباحة",
    category: "Service" as const,
    descriptionEn: "Identified swimming pool or water feature requiring hydrostatic pressure resistance and flexible sealing.",
    descriptionAr: "تم رصد مسبح أو مسطح مائي بحاجة إلى حماية ضد الضغط الهيدروستاتيكي وتثبيت بلاط الموازييك وعزل شامل.",
    searchTerms: ["swimming pool", "pool waterproofing", "water feature"],
  },
  {
    keywords: ["ladder", "manhole", "cover", "grating", "bucket", "tray", "planter", "product", "box", "frp"],
    detectedEn: "Custom GRP / Fiberglass Product",
    detectedAr: "منتجات فيبرجلاس مخصصة (GRP)",
    category: "Product" as const,
    descriptionEn: "Matched with Taj Al Rahmah's molded GRP technical products, including safety ladders, manhole covers, drainage catch basins, and planter boxes.",
    descriptionAr: "تطابق مع منتجات تاج الرحمة المصنوعة من الألياف الزجاجية المقاومة للتآكل مثل السلالم الآمنة، وأغطية المناهل، وأحواض الصرف والزراعة.",
    searchTerms: ["grp product", "ladder", "manhole", "fiberglass", "grating"],
  },
];

function scoreAndRankItems(keywords: string[], preferredCategory?: string): SearchResultItem[] {
  const queryWords = keywords.map((k) => k.toLowerCase().trim()).filter(Boolean);
  const scored: { item: SearchResultItem; score: number }[] = [];

  SITE_SEARCH_INDEX.forEach((item) => {
    let score = 0;
    const nameLower = item.name.toLowerCase();
    const nameAr = (item.nameAr || "").toLowerCase();
    const descLower = item.desc.toLowerCase();
    const itemKeywords = item.keywords.map((k) => k.toLowerCase());

    queryWords.forEach((word) => {
      if (nameLower.includes(word) || nameAr.includes(word)) {
        score += 80;
      }
      if (itemKeywords.some((k) => k.includes(word) || word.includes(k))) {
        score += 50;
      }
      if (descLower.includes(word)) {
        score += 25;
      }
    });

    if (preferredCategory && item.category.toLowerCase() === preferredCategory.toLowerCase()) {
      score += 40;
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 6).map((s) => s.item);
}

export async function POST(request: NextRequest) {
  try {
    let imageBase64 = "";
    let mimeType = "image/jpeg";
    let fileName = "";
    let userPromptHint = "";

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("image") as File | null;
      userPromptHint = (formData.get("hint") as string) || "";

      if (!file) {
        return NextResponse.json(
          { error: "No image file provided in request" },
          { status: 400 }
        );
      }

      fileName = file.name;
      mimeType = file.type || "image/jpeg";
      const arrayBuffer = await file.arrayBuffer();
      imageBase64 = Buffer.from(arrayBuffer).toString("base64");
    } else {
      const body = await request.json();
      imageBase64 = body.imageBase64 || "";
      mimeType = body.mimeType || "image/jpeg";
      fileName = body.fileName || "";
      userPromptHint = body.hint || "";

      // Strip data:image/...;base64, prefix if present
      if (imageBase64.includes(",")) {
        const parts = imageBase64.split(",");
        const header = parts[0];
        const match = header.match(/data:(image\/[a-zA-Z0-9+.-]+);base64/);
        if (match) mimeType = match[1];
        imageBase64 = parts[1];
      }
    }

    if (!imageBase64 && !userPromptHint) {
      return NextResponse.json(
        { success: false, error: "Image data is empty" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    let aiResult: {
      detectedEn: string;
      detectedAr: string;
      category: "Service" | "Product" | "Project" | "Solution";
      confidence: "high" | "medium" | "low";
      descriptionEn: string;
      descriptionAr: string;
      suggestedKeywords: string[];
    } | null = null;

    // 1. Attempt Gemini Multimodal Vision API
    if (apiKey && imageBase64) {
      try {
        const geminiSystemPrompt = `You are an expert construction inspector, waterproofing engineer, and building specialist for Taj Al Rahmah Contracting (UAE).
Analyze this image and identify what building element, material, issue (e.g., water leakage, roof dampness, concrete crack, spalling, epoxy floor, swimming pool, water tank, GRP fiberglass) or product it represents.
Categorize it into one of: 'Service', 'Product', 'Project', or 'Solution'.

Output ONLY valid JSON matching this schema with no markdown or formatting:
{
  "detectedEn": "Clear descriptive name of detected element/defect/product",
  "detectedAr": "الاسم بالعربية",
  "category": "Service",
  "confidence": "high",
  "descriptionEn": "2 sentences explaining what is seen and what Taj Al Rahmah technical solution addresses it.",
  "descriptionAr": "شرح موجز بالعربية للمشكلة أو العنصر المعروض والحل الهندسي المناسب من شركة تاج الرحمة.",
  "suggestedKeywords": ["keyword1", "keyword2", "keyword3"]
}`;

        // Try primary model
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: geminiSystemPrompt },
                    {
                      inline_data: {
                        mime_type: mimeType,
                        data: imageBase64,
                      },
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          const rawText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleanJson = rawText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();
          const parsed = JSON.parse(cleanJson);
          if (parsed && parsed.detectedEn) {
            aiResult = {
              detectedEn: parsed.detectedEn,
              detectedAr: parsed.detectedAr || parsed.detectedEn,
              category: ["Service", "Product", "Project", "Solution"].includes(parsed.category)
                ? parsed.category
                : "Service",
              confidence: parsed.confidence || "high",
              descriptionEn: parsed.descriptionEn || "",
              descriptionAr: parsed.descriptionAr || "",
              suggestedKeywords: Array.isArray(parsed.suggestedKeywords)
                ? parsed.suggestedKeywords
                : [parsed.detectedEn],
            };
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini vision analysis call skipped/failed:", geminiErr);
      }
    }

    // 2. Intelligent Catalog Matcher (Fallback if Gemini API is restricted or network unavailable)
    let aiSource: "gemini" | "catalog-matcher" = "gemini";

    if (!aiResult) {
      aiSource = "catalog-matcher";
      const combinedInput = `${fileName} ${userPromptHint}`.toLowerCase();

      // Find best category heuristic match
      let bestMatch = FALLBACK_CATEGORIES[1]; // default waterproofing
      let maxHits = 0;

      for (const cat of FALLBACK_CATEGORIES) {
        let hits = 0;
        for (const kw of cat.keywords) {
          if (combinedInput.includes(kw)) {
            hits++;
          }
        }
        if (hits > maxHits) {
          maxHits = hits;
          bestMatch = cat;
        }
      }

      aiResult = {
        detectedEn: bestMatch.detectedEn,
        detectedAr: bestMatch.detectedAr,
        category: bestMatch.category,
        confidence: maxHits > 0 ? "high" : "medium",
        descriptionEn: bestMatch.descriptionEn,
        descriptionAr: bestMatch.descriptionAr,
        suggestedKeywords: bestMatch.searchTerms,
      };
    }

    // 3. Match against site items
    const matchedItems = scoreAndRankItems(
      [aiResult.detectedEn, ...aiResult.suggestedKeywords],
      aiResult.category
    );

    const responsePayload: ImageSearchResponse = {
      success: true,
      detectedEn: aiResult.detectedEn,
      detectedAr: aiResult.detectedAr,
      category: aiResult.category,
      confidence: aiResult.confidence,
      descriptionEn: aiResult.descriptionEn,
      descriptionAr: aiResult.descriptionAr,
      matchedItems,
      suggestedKeywords: aiResult.suggestedKeywords,
      aiSource,
    };

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    console.error("Error in /api/image-search:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process image search",
      },
      { status: 500 }
    );
  }
}
