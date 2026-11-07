import React from "react";
import { prisma } from "@/lib/prisma";
import HomePageClient from "./HomePageClient";

// Force dynamic so admin changes reflect immediately without code redeploy
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  let serializedStates: any[] = [];
  let products: any[] = [];
  let testimonials: any[] = [];
  let services: any[] = [];
  let awards: any[] = [];
  let heroSlides: any[] = [];

  try {
    try {
      heroSlides = await prisma.heroSlide.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      });
    } catch (slideErr) {
      console.warn("Could not query hero_slides, fallback safely:", slideErr);
    }

    const priceStates = await prisma.priceListState.findMany({
      where: { isActive: true },
      include: {
        items: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });

    products = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { displayOrder: "asc" },
    });

    testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    awards = await prisma.award.findMany({
      orderBy: { displayOrder: "asc" },
    });

    // Serialize Decimals for Client Components
    serializedStates = priceStates.map((st) => ({
      ...st,
      items: st.items.map((it) => ({
        ...it,
        amount: it.amount ? it.amount.toString() : null,
      })),
    }));
  } catch (err) {
    console.error("HomePage data fetch error:", err);
  }

  return (
    <HomePageClient
      priceStates={serializedStates}
      products={products}
      testimonials={testimonials}
      services={services}
      awards={awards}
      heroSlides={heroSlides}
    />
  );
}

