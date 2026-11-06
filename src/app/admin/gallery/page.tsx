import React from "react";
import { prisma } from "@/lib/prisma";
import GalleryAdminClient from "./GalleryAdminClient";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const [images, categories] = await Promise.all([
    prisma.galleryImage.findMany({
      include: { category: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.galleryCategory.findMany(),
  ]);

  return <GalleryAdminClient initialImages={images} categories={categories} />;
}

