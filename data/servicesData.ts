import servicesJsonEn from "./services_en.json";
import servicesJsonAr from "./services_ar.json";

export interface ServiceWhyChoosePoint {
  title: string;
  description: string;
}

export interface SubServiceItem {
  subServiceContent: any;
  service: any;
  id: string;
  serviceTitle: string;
  serviceSlug: string;
  serviceBanner: string;
  serviceImage: string;
  servicesgalaryImages: string[];
  serviceContent: string;
  shortDescription?: string;
  primaryApplications?: string;
  competitiveAdvantage?: string;
  keyBenefits?: string[];
  process?: string[];
}

export interface ServiceItem {
  service: any;
  serviceNumber: number;
  serviceId: string;
  serviceSlug: string;
  serviceTitle: string;
  tagline: string;
  category: string;
  icon: string;
  seoKeywords?: string[];
  serviceBanner: string;
  serviceImage: string;
  servicesgalaryImages: string[];
  serviceContent: string;
  shortDescription: string;
  whyChooseTitle: string;
  whyChooseContent: string;
  whyChoosePoints: ServiceWhyChoosePoint[];
  subservices: SubServiceItem[];
}

// Typed datasets
export const servicesDataEn: ServiceItem[] = servicesJsonEn as ServiceItem[];
export const servicesDataAr: ServiceItem[] = servicesJsonAr as unknown as ServiceItem[];
export const servicesData: ServiceItem[] = servicesDataEn;

/**
 * Get all services by language
 */
export function getAllServices(lang: "en" | "ar" = "en"): ServiceItem[] {
  return lang === "ar" ? servicesDataAr : servicesDataEn;
}

/**
 * Get a specific service by slug or id
 */
export function getServiceBySlug(slug: string, lang: "en" | "ar" = "en"): ServiceItem | undefined {
  const dataset = getAllServices(lang);
  return dataset.find(
    (s) => s.serviceSlug === slug || s.serviceId === slug || s.serviceNumber.toString() === slug
  );
}

/**
 * Get service by numeric number (1 to 11) or id string
 */
export function getServiceById(id: string | number, lang: "en" | "ar" = "en"): ServiceItem | undefined {
  const dataset = getAllServices(lang);
  const idStr = id.toString();
  return dataset.find(
    (s) => s.serviceNumber.toString() === idStr || s.serviceId === idStr || s.serviceSlug === idStr
  );
}

/**
 * Get a subservice by parent service slug and subservice slug/id
 */
export function getSubservice(
  serviceSlug: string,
  subserviceSlug: string,
  lang: "en" | "ar" = "en"
): { service: ServiceItem; subservice: SubServiceItem } | undefined {
  const service = getServiceBySlug(serviceSlug, lang);
  if (!service) return undefined;

  const subservice = service.subservices.find(
    (sub) => sub.serviceSlug === subserviceSlug || sub.id === subserviceSlug
  );
  if (!subservice) return undefined;

  return { service, subservice };
}
