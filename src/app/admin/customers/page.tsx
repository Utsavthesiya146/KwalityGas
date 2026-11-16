import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CustomersAdminClient from "./CustomersAdminClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customers Management | Kwality Gas Admin",
  description: "Manage registered domestic, commercial, and industrial LPG customers.",
};

export default async function AdminCustomersPage() {
  let initialCustomers: any[] = [];

  try {
    const rawCustomers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        category: true,
        companyName: true,
        gstNumber: true,
        deliveryAddress: true,
        city: true,
        state: true,
        pincode: true,
        isActive: true,
        createdAt: true,
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
          take: 5,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    initialCustomers = rawCustomers.map((c) => {
      const totalSpent = c.orders
        .filter((o) => o.paymentStatus === "CONFIRMED")
        .reduce((sum, o) => sum + (Number(o.subtotal) || 0), 0);

      return {
        ...c,
        totalOrders: c._count.orders,
        totalSpent,
      };
    });
  } catch (err) {
    console.error("Failed to fetch customers:", err);
  }

  return <CustomersAdminClient initialCustomers={initialCustomers} />;
}

