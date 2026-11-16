import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DealersAdminClient from "./DealersAdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dealers & Distributors | Kwality Gas Admin",
  description: "Manage Kwality Gas authorized dealers, distributors, territories, and order fulfillment.",
};

export default async function AdminDealersPage() {
  let initialDealers: any[] = [];

  try {
    const rawDealers = await prisma.dealer.findMany({
      include: {
        _count: {
          select: { orders: true },
        },
        orders: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            paymentStatus: true,
            subtotal: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    initialDealers = rawDealers.map((d) => {
      const totalRevenue = d.orders
        .filter((o) => o.paymentStatus === "CONFIRMED")
        .reduce((acc, curr) => acc + (Number(curr.subtotal) || 0), 0);

      return {
        ...d,
        commissionRate: d.commissionRate ? Number(d.commissionRate) : null,
        totalOrders: d._count.orders,
        confirmedRevenue: totalRevenue,
      };
    });
  } catch (err) {
    console.error("Failed to load dealers:", err);
  }

  return <DealersAdminClient initialDealers={initialDealers} />;
}

