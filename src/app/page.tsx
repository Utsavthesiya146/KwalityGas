import React from "react";
import { prisma } from "@/lib/prisma";
import HomePageClient from "./HomePageClient";

// Force dynamic so admin changes reflect immediately without code redeploy
export const revalidate = 0;

export default async function HomePage() {
  // Fetch real dynamic data directly from MySQL
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

  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { displayOrder: "asc" },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  const awards = await prisma.award.findMany({
    orderBy: { displayOrder: "asc" },
  });

  // Serialize Decimals for Client Components
  const serializedStates = priceStates.map((st) => ({
    ...st,
    items: st.items.map((it) => ({
      ...it,
      amount: it.amount ? it.amount.toString() : null,
    })),
  }));

  return (
    <HomePageClient
      priceStates={serializedStates}
      products={products}
      testimonials={testimonials}
      services={services}
      awards={awards}
    />
  );
}

