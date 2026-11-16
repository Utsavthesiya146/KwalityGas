import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");

  const where: any = {};
  if (category && category !== "ALL") where.category = category;
  if (search) {
    const q = search.trim();
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
      { companyName: { contains: q } },
      { deliveryAddress: { contains: q } },
      { city: { contains: q } },
    ];
  }

  try {
    const customers = await prisma.customer.findMany({
      where,
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

    const customersWithStats = customers.map((c) => {
      const totalSpent = c.orders
        .filter((o) => o.paymentStatus === "CONFIRMED")
        .reduce((sum, o) => sum + (Number(o.subtotal) || 0), 0);

      return {
        ...c,
        totalOrders: c._count.orders,
        totalSpent,
      };
    });

    return NextResponse.json({
      success: true,
      customers: customersWithStats,
      count: customersWithStats.length,
    });
  } catch (err: any) {
    console.error("Customers GET error:", err);
    return NextResponse.json({ error: "Failed to fetch customers: " + err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, isActive, category } = body;

    if (!id) {
      return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (category) updateData.category = category;

    const updated = await prisma.customer.update({
      where: { id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        adminEmail: admin.email,
        action: "UPDATE_CUSTOMER",
        entity: "Customer",
        entityId: updated.id,
        details: JSON.stringify({ name: updated.name, isActive: updated.isActive, category: updated.category }),
      },
    });

    return NextResponse.json({
      success: true,
      customer: updated,
    });
  } catch (err: any) {
    console.error("Customers PATCH error:", err);
    return NextResponse.json({ error: "Failed to update customer: " + err.message }, { status: 500 });
  }
}

