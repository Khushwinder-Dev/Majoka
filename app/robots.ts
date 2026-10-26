import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/visitors", "/api/"],
    },
    sitemap: "https://tajalrahmah.com/sitemap.xml",
  };
}
