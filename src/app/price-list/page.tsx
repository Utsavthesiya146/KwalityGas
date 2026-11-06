import React from "react";
import { prisma } from "@/lib/prisma";
import PriceListPageClient from "./PriceListPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price List | Kwality Gas Refill Rates for Karnataka & Tamil Nadu",
  description:
    "Official Kwality Gas price list for Karnataka and Tamil Nadu. Check current refill prices for 33kg, 21kg, 17kg, 15kg, 12kg domestic, and 4kg Cook & Light cylinders.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PriceListPage() {
  let serializedStates: any[] = [];
  try {
    const states = await prisma.priceListState.findMany({
      where: { isActive: true },
      include: {
        items: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });

    serializedStates = states.map((st) => ({
      ...st,
      items: st.items.map((it) => ({
        ...it,
        amount: it.amount ? it.amount.toString() : null,
      })),
    }));
  } catch (err) {
    console.error("PriceListPage data fetch error:", err);
  }

  return <PriceListPageClient initialStates={serializedStates} />;
}

