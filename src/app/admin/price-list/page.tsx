import React from "react";
import { prisma } from "@/lib/prisma";
import PriceListAdminClient from "./PriceListAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPriceListPage() {
  let serializedStates: any[] = [];
  try {
    const states = await prisma.priceListState.findMany({
      include: {
        items: {
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });

    serializedStates = states.map((st) => ({
      ...st,
      items: st.items.map((it) => ({
        ...it,
        amount: it.amount ? it.amount.toString() : "",
      })),
    }));
  } catch (err) {
    console.error("AdminPriceListPage fetch error:", err);
  }

  return <PriceListAdminClient initialStates={serializedStates} />;
}

