import { NextRequest, NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCurrentCustomer();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: session.customerId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        category: true,
        companyName: true,
        gstNumber: true,
        deliveryAddress: true,
        city: true,
        state: true,
        pincode: true,
        createdAt: true,
        orders: {
          orderBy: { createdAt: "desc" },
          include: { items: true },
        },
      },
    });

    if (!customer) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      customer,
    });
  } catch (err: any) {
    console.error("Failed to query customer:", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

