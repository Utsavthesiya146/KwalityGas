import React from "react";
import { prisma } from "@/lib/prisma";
import OrdersAdminClient from "./OrdersAdminClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp Orders Management | Kwality Gas Admin",
  description: "Manage incoming customer WhatsApp LPG cylinder and appliance orders.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOrdersPage() {
  let orders: any[] = [];
  let dealers: any[] = [];

  try {
    const [rawOrders, rawDealers] = await Promise.all([
      prisma.order.findMany({
        include: {
          items: true,
          dealer: {
            select: { id: true, businessName: true, territory: true, phone: true },
          },
          customer: {
            select: { id: true, name: true, email: true, category: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.dealer.findMany({
        where: { isActive: true },
        select: { id: true, businessName: true, territory: true, phone: true },
        orderBy: { businessName: "asc" },
      }),
    ]);

    dealers = rawDealers;

    // Serialize Decimals and Dates for client component
    orders = rawOrders.map((ord) => ({
      ...ord,
      subtotal: ord.subtotal ? Number(ord.subtotal) : null,
      createdAt: ord.createdAt.toISOString(),
      updatedAt: ord.updatedAt.toISOString(),
      whatsappSentAt: ord.whatsappSentAt ? ord.whatsappSentAt.toISOString() : null,
      paymentConfirmedAt: ord.paymentConfirmedAt ? ord.paymentConfirmedAt.toISOString() : null,
      dispatchedAt: ord.dispatchedAt ? ord.dispatchedAt.toISOString() : null,
      deliveredAt: ord.deliveredAt ? ord.deliveredAt.toISOString() : null,
      cancelledAt: ord.cancelledAt ? ord.cancelledAt.toISOString() : null,
      items: ord.items.map((it) => ({
        ...it,
        unitPrice: it.unitPrice ? Number(it.unitPrice) : null,
        lineTotal: it.lineTotal ? Number(it.lineTotal) : null,
      })),
    }));
  } catch (err) {
    console.error("AdminOrdersPage fetch error:", err);
  }

  return <OrdersAdminClient initialOrders={orders} dealers={dealers} />;
}
