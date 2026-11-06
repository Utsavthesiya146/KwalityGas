import React from "react";
import { prisma } from "@/lib/prisma";
import GalleryClient from "./GalleryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery & Accessories | Kwality Gas",
  description:
    "Photo gallery of Kwality Gas bottling plants, domestic LPG regulators, gas water heaters, cylinder capacities, and delivery infrastructure.",
};

export const revalidate = 0;

export default async function GalleryPage() {
  const categories = await prisma.galleryCategory.findMany({
    include: {
      images: {
        orderBy: { displayOrder: "asc" },
      },
    },
  });

  const allImages = await prisma.galleryImage.findMany({
    include: { category: true },
    orderBy: { displayOrder: "asc" },
  });

  return <GalleryClient categories={categories} initialImages={allImages} />;
}

