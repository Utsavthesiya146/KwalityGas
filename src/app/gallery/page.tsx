import React from "react";
import { prisma } from "@/lib/prisma";
import GalleryClient from "./GalleryClient";
import { sanitizeGalleryImage } from "@/lib/sanitize-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery & Accessories | Kwality Gas",
  description:
    "Photo gallery of Kwality Gas bottling plants, domestic LPG regulators, gas water heaters, cylinder capacities, and delivery infrastructure.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  let categories: any[] = [];
  let allImages: any[] = [];
  try {
    const rawCategories = await prisma.galleryCategory.findMany({
      include: {
        images: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });
    categories = rawCategories.map((cat) => ({
      ...cat,
      images: (cat.images || []).map(sanitizeGalleryImage),
    }));

    const rawImages = await prisma.galleryImage.findMany({
      include: { category: true },
      orderBy: { displayOrder: "asc" },
    });
    allImages = rawImages.map(sanitizeGalleryImage);
  } catch (err) {
    console.error("GalleryPage data fetch error:", err);
  }

  return <GalleryClient categories={categories} initialImages={allImages} />;
}

