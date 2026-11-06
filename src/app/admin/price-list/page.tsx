import React from "react";
import { prisma } from "@/lib/prisma";
import PriceListAdminClient from "./PriceListAdminClient";

export const revalidate = 0;

export default async function AdminPriceListPage() {
  const states = await prisma.priceListState.findMany({
    include: {
      items: {
        orderBy: { displayOrder: "asc" },
      },
    },
    orderBy: { displayOrder: "asc" },
  });

  const serializedStates = states.map((st) => ({
    ...st,
    items: st.items.map((it) => ({
      ...it,
      amount: it.amount ? it.amount.toString() : "",
    })),
  }));

  return <PriceListAdminClient initialStates={serializedStates} />;
}

