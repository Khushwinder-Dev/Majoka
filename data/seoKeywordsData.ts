import seoDataJson from "./seoKeywordsData.json";

export interface ServiceSeoItem {
  title: string;
  keywords: string[];
}

export interface ProductSeoItem {
  category: string;
  name: string;
  longName: string;
  description: string;
}

export interface ProjectSeoItem {
  name: string;
  location: string;
  details: string;
}

export interface SeoKeywordsData {
  states: string[];
  brandKeywords: string[];
  comboKeywords: {
    all: string[];
    sections: {
      primary: string[];
      secondary: string[];
      local: string[];
      longTail: string[];
    };
  };
  servicesSeo: Record<string, ServiceSeoItem>;
  productsSeo: ProductSeoItem[];
  projectsSeo: ProjectSeoItem[];
}

export const seoKeywordsData: SeoKeywordsData = seoDataJson as unknown as SeoKeywordsData;

export const UAE_STATES = seoKeywordsData.states;
export const COMBO_ROOF_KEYWORDS = seoKeywordsData.comboKeywords.all;
export const BRAND_KEYWORDS = seoKeywordsData.brandKeywords;

