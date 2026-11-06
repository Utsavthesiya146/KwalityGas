import React from "react";
import { prisma } from "@/lib/prisma";
import GalleryAdminClient from "./GalleryAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminGalleryPage() {
  let images: any[] = [];
  let categories: any[] = [];
  try {
    const results = await Promise.all([
      prisma.galleryImage.findMany({
        include: { category: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.galleryCategory.findMany(),
    ]);
    images = results[0];
    categories = results[1];
  } catch (err) {
    console.error("AdminGalleryPage fetch error:", err);
  }

  return <GalleryAdminClient initialImages={images} categories={categories} />;
}

