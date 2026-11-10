/**
 * Image sanitization helper to guarantee ZERO legacy images are rendered on any page,
 * even if a remote production/staging database still holds older path strings.
 */

const LEGACY_IMAGE_MAP: Record<string, string> = {
  // Cylinders & Products
  "/images/original/1433.png": "/images/corporate/product-cylinder-33kg.jpg",
  "/images/original/p1.jpg": "/images/corporate/product-cylinder-33kg.jpg",
  "/images/original/p2.jpg": "/images/corporate/hero-commercial-lpg.jpg",
  "/images/original/dars2.png": "/images/corporate/hero-commercial-lpg.jpg",
  "/images/original/p3.jpg": "/images/corporate/product-cylinder-17kg.jpg",
  "/images/original/dar17.png": "/images/corporate/product-cylinder-17kg.jpg",
  "/images/original/p4.jpg": "/images/corporate/hero-commercial-lpg.jpg",
  "/images/original/dom1.png": "/images/corporate/hero-domestic-lpg.jpg",
  "/images/original/p5.jpg": "/images/corporate/product-cylinder-12kg.jpg",
  "/images/original/dom2.png": "/images/corporate/product-cylinder-12kg.jpg",
  "/images/original/dom3.png": "/images/corporate/hero-domestic-lpg.jpg",
  "/images/original/k5.jpg": "/images/corporate/product-cylinder-12kg.jpg",
  "/images/original/k4.jpg": "/images/corporate/product-cylinder-12kg.jpg",
  "/images/original/k3.jpg": "/images/corporate/product-cylinder-12kg.jpg",
  "/images/original/p6-ne.png": "/images/corporate/product-gas-geyser.jpg",
  "/images/original/p6.jpg": "/images/corporate/product-gas-geyser.jpg",
  "/images/original/gas.jpg": "/images/corporate/product-gas-geyser.jpg",
  "/images/original/p7.jpg": "/images/corporate/product-cylinder-12kg.jpg",
  "/images/original/p8.jpg": "/images/corporate/service-manifold-bank.jpg",

  // Regulators, Safety & Accessories
  "/images/original/g2.jpg": "/images/corporate/hero-safety-standards.jpg",
  "/images/original/g3.jpg": "/images/corporate/hero-safety-standards.jpg",
  "/images/original/r1.jpg": "/images/corporate/hero-safety-standards.jpg",
  "/images/original/r2.jpg": "/images/corporate/hero-safety-standards.jpg",
  "/images/original/r3.jpg": "/images/corporate/hero-safety-standards.jpg",
  "/images/original/s1.jpg": "/images/corporate/service-manifold-bank.jpg",
  "/images/original/s2.jpg": "/images/corporate/service-manifold-bank.jpg",
  "/images/original/s3.jpg": "/images/corporate/service-safety-audit.jpg",
  "/images/original/locked.png": "/images/corporate/hero-safety-standards.jpg",

  // Plants, Fleet & Facilities
  "/images/original/kwalit.jpg": "/images/corporate/hero-bottling-plant.jpg",
  "/images/original/slide1.jpg": "/images/corporate/hero-industrial-lpg.jpg",
  "/images/original/slide2.jpg": "/images/corporate/hero-industrial-lpg.jpg",
  "/images/original/service_style_11.jpg": "/images/corporate/service-delivery-truck.jpg",
  "/images/original/service_style_12.jpg": "/images/corporate/service-manifold-bank.jpg",
  "/images/original/service_style_16.jpg": "/images/corporate/hero-bottling-plant.jpg",
  "/images/original/service_details.jpg": "/images/corporate/hero-safety-standards.jpg",
  "/images/original/BBOQ8.png": "/images/corporate/hero-industrial-lpg.jpg",
  "/images/original/new-slide.png": "/images/corporate/hero-bottling-plant.jpg",
  "/images/original/ban1-1.png": "/images/corporate/hero-industrial-lpg.jpg",
  "/images/original/why-img-1.jpg": "/images/corporate/hero-bottling-plant.jpg",
  "/images/original/why-img-2.jpg": "/images/corporate/service-delivery-truck.jpg",
  "/images/original/why-img-3.jpg": "/images/corporate/service-safety-audit.jpg",
  "/images/original/IMG_20190903_182027.jpg": "/images/corporate/hero-bottling-plant.jpg",

  // Brand & Awards
  "/images/original/logo.jpg": "/images/brand/logo.jpg",
  "/images/original/logo.png": "/images/brand/logo.png",
  "/images/original/ft-logo.png": "/images/brand/logo.png",
  "/images/original/favicon.png": "/images/brand/favicon.png",
  "/images/original/apple-touch-icon.png": "/images/brand/apple-touch-icon.png",
  "/images/original/kwality-gas-award.jpg": "/images/brand/kwality-gas-award.jpg",
  "/images/original/kwality-gas-certificate.jpg": "/images/brand/kwality-gas-award.jpg",
};

export function sanitizeImageUrl(url: string | null | undefined, defaultFallback = "/images/corporate/product-cylinder-33kg.jpg"): string {
  if (!url || typeof url !== "string") {
    return defaultFallback;
  }

  const trimmed = url.trim();

  // If in legacy map, immediately return modern corporate visual
  if (LEGACY_IMAGE_MAP[trimmed]) {
    return LEGACY_IMAGE_MAP[trimmed];
  }

  // Catch any lingering /images/original/ references
  if (trimmed.includes("/images/original/")) {
    if (trimmed.includes("gas") || trimmed.includes("p6")) {
      return "/images/corporate/product-gas-geyser.jpg";
    }
    if (trimmed.includes("kwalit") || trimmed.includes("plant") || trimmed.includes("slide")) {
      return "/images/corporate/hero-bottling-plant.jpg";
    }
    if (trimmed.includes("service") || trimmed.includes("truck")) {
      return "/images/corporate/service-delivery-truck.jpg";
    }
    if (trimmed.includes("manifold") || trimmed.includes("header")) {
      return "/images/corporate/service-manifold-bank.jpg";
    }
    if (trimmed.includes("regulator") || trimmed.includes("safety") || trimmed.includes("g2") || trimmed.includes("g3") || trimmed.includes("r1") || trimmed.includes("r2") || trimmed.includes("r3")) {
      return "/images/corporate/hero-safety-standards.jpg";
    }
    if (trimmed.includes("award") || trimmed.includes("certificate")) {
      return "/images/brand/kwality-gas-award.jpg";
    }
    if (trimmed.includes("logo")) {
      return "/images/brand/logo.jpg";
    }
    return defaultFallback;
  }

  // Guarantee that any unmapped non-corporate/non-brand asset maps to a valid modern visual
  if (!trimmed.startsWith("/images/corporate/") && !trimmed.startsWith("/images/brand/") && !trimmed.includes("hostingbaba")) {
    return defaultFallback;
  }

  return trimmed;
}

export function sanitizeProduct(p: any): any {
  if (!p) return p;
  return {
    ...p,
    imageUrl: sanitizeImageUrl(p.imageUrl, "/images/corporate/product-cylinder-33kg.jpg"),
  };
}

export function sanitizeGalleryImage(img: any): any {
  if (!img) return img;
  return {
    ...img,
    imageUrl: sanitizeImageUrl(img.imageUrl, "/images/corporate/hero-bottling-plant.jpg"),
  };
}

export function sanitizeHeroSlide(slide: any): any {
  if (!slide) return slide;
  return {
    ...slide,
    imageUrl: sanitizeImageUrl(slide.imageUrl, "/images/corporate/hero-industrial-lpg.jpg"),
  };
}

export function sanitizeService(s: any): any {
  if (!s) return s;
  return {
    ...s,
    imageUrl: sanitizeImageUrl(s.imageUrl || s.image, "/images/corporate/service-delivery-truck.jpg"),
  };
}

