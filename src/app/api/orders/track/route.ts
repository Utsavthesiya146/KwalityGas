import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, phone } = body;

    if (!orderNumber || typeof orderNumber !== "string" || orderNumber.trim().length < 5) {
      return NextResponse.json({ error: "Please enter a valid Order ID (e.g., KWG-ORD-...)" }, { status: 400 });
    }

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Please enter the 10-digit phone number used during booking." }, { status: 400 });
    }

    const cleanOrderNumber = orderNumber.trim();

    // Query order matching both orderNumber and phone
    const order = await prisma.order.findFirst({
      where: {
        orderNumber: {
          equals: cleanOrderNumber,
        },
        customerPhone: {
          contains: cleanPhone.slice(-10),
        },
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "No matching order found. Please check your Order ID and registered mobile number." },
        { status: 404 }
      );
    }

    // Mask phone for privacy in public response
    const maskedPhone = `+91 ******${order.customerPhone.slice(-4)}`;

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: maskedPhone,
        rawPhone: order.customerPhone,
        deliveryAddress: order.deliveryAddress,
        orderType: order.orderType,
        subtotal: order.subtotal ? Number(order.subtotal) : null,
        status: order.status,
        paymentStatus: order.paymentStatus,
        notes: order.notes,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        paymentConfirmedAt: order.paymentConfirmedAt,
        dispatchedAt: order.dispatchedAt,
        deliveredAt: order.deliveredAt,
        cancelledAt: order.cancelledAt,
        items: order.items.map((it) => ({
          id: it.id,
          productName: it.productName,
          capacity: it.capacity,
          quantity: it.quantity,
          unitPrice: it.unitPrice ? Number(it.unitPrice) : null,
          lineTotal: it.lineTotal ? Number(it.lineTotal) : null,
        })),
      },
    });
  } catch (err: any) {
    console.error("Order tracking error:", err);
    return NextResponse.json({ error: "Server error querying order status" }, { status: 500 });
  }
}

