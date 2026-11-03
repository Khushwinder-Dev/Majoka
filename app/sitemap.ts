import { MetadataRoute } from "next";
import servicesJsonEn from "@/data/services_en.json";
import { allProductsData } from "@/data/productsData";

const BASE_URL = "https://tajalrahmah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // 1. Core Pages
  const coreRoutes = [
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${BASE_URL}/services`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/products`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/projects`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/about-us`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/get-a-quote`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/solutions`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/industries`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/subcontract`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/warranty`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/faqs`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/career`, priority: 0.65, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/download`, priority: 0.6, changeFrequency: "monthly" as const },
  ].map((r) => ({
    url: r.url,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // 2. Services & Subservices
  const serviceRoutes: MetadataRoute.Sitemap = [];
  if (Array.isArray(servicesJsonEn)) {
    servicesJsonEn.forEach((s: any) => {
      serviceRoutes.push({
        url: `${BASE_URL}/services?service=${s.serviceNumber}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      if (Array.isArray(s.subservices)) {
        s.subservices.forEach((sub: any) => {
          serviceRoutes.push({
            url: `${BASE_URL}/services?service=${s.serviceNumber}&sub=${sub.serviceSlug}`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.85,
          });
        });
      }
    });
  }

  // 3. Products
  const productRoutes: MetadataRoute.Sitemap = allProductsData.map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...serviceRoutes, ...productRoutes];
}

