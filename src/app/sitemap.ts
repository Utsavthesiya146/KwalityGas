import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kwalitygas.com";
  const now = new Date();

  const routes = [
    "",
    "/about",
    "/products",
    "/cylinders",
    "/gas-water-heater",
    "/safety-devices",
    "/accessories",
    "/domestic",
    "/commercial",
    "/industrial",
    "/services",
    "/price-list",
    "/safety-features",
    "/testimonials",
    "/group-company",
    "/gallery",
    "/contact",
    "/contact/domestic",
    "/contact/commercial",
    "/contact/industrial",
    "/privacy-policy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/price-list" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : route === "/price-list" ? 0.9 : 0.8,
  }));
}

