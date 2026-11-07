import React from "react";
import { prisma } from "@/lib/prisma";
import HeroSliderAdminClient from "./HeroSliderAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminHeroSliderPage() {
  let slides: any[] = [];
  try {
    slides = await prisma.heroSlide.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("AdminHeroSliderPage fetch error:", err);
  }

  return <HeroSliderAdminClient initialSlides={slides} />;
}
