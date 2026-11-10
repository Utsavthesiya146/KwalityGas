import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const OFFICIAL_WHATSAPP_NUMBER = "917899787101";

// Helper to generate a clean, unique human-readable order number
function generateOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `KWG-ORD-${year}${month}-${randomSuffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      orderType = "DOMESTIC",
      notes,
      items,
    } = body;

    // Server-side validation
    if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
      return NextResponse.json(
        { error: "Customer name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    const cleanPhone = (customerPhone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "A valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    if (!deliveryAddress || typeof deliveryAddress !== "string" || deliveryAddress.trim().length < 5) {
      return NextResponse.json(
        { error: "Delivery address is required and must be at least 5 characters." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    // Process items & calculate subtotal
    let calculatedSubtotal = 0;
    const validatedItems = items.map((item: any) => {
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      const unitP = typeof item.unitPrice === "number" && item.unitPrice > 0 ? item.unitPrice : null;
      const lineT = unitP ? unitP * qty : null;
      if (lineT) calculatedSubtotal += lineT;

      return {
        productId: item.productId || null,
        productName: item.productName || "LPG Cylinder",
        capacity: item.capacity || null,
        unitPrice: unitP,
        quantity: qty,
        lineTotal: lineT,
      };
    });

    const orderNumber = generateOrderNumber();

    // Map orderType
    const validOrderType =
      orderType === "COMMERCIAL"
        ? "COMMERCIAL"
        : orderType === "INDUSTRIAL"
        ? "INDUSTRIAL"
        : "DOMESTIC";

    // Insert order and order items in a transaction
    const savedOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        customerEmail: customerEmail?.trim() || null,
        deliveryAddress: deliveryAddress.trim(),
        orderType: validOrderType,
        subtotal: calculatedSubtotal > 0 ? calculatedSubtotal : null,
        notes: notes?.trim() || null,
        status: "NEW",
        items: {
          create: validatedItems,
        },
      },
      include: {
        items: true,
      },
    });

    // Build pre-filled WhatsApp message
    const orderTypeLabel =
      validOrderType === "COMMERCIAL"
        ? "Commercial LPG"
        : validOrderType === "INDUSTRIAL"
        ? "Industrial LPG"
        : "Domestic LPG";

    let message = `*KWALITY GAS — OFFICIAL LPG ORDER REQUEST*\n`;
    message += `--------------------------------------\n`;
    message += `*Order ID:* ${savedOrder.orderNumber}\n`;
    message += `*Customer Name:* ${savedOrder.customerName}\n`;
    message += `*Mobile Number:* +91 ${savedOrder.customerPhone}\n`;
    message += `*Order Type:* ${orderTypeLabel}\n`;
    message += `*Delivery Address:* ${savedOrder.deliveryAddress}\n\n`;
    message += `*ORDERED ITEMS:*\n`;

    savedOrder.items.forEach((it, idx) => {
      const cap = it.capacity ? ` (${it.capacity})` : "";
      message += `${idx + 1}. ${it.productName}${cap} × ${it.quantity} Qty\n`;
    });

    if (calculatedSubtotal > 0) {
      message += `\n*Estimated Subtotal:* ₹${calculatedSubtotal.toFixed(2)}\n`;
    }

    if (savedOrder.notes) {
      message += `\n*Customer Instructions:* ${savedOrder.notes}\n`;
    }

    message += `--------------------------------------\n`;
    message += `_This order has been recorded in the Kwality Gas portal. Please confirm delivery schedule and payment coordination._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    return NextResponse.json({
      success: true,
      orderId: savedOrder.id,
      orderNumber: savedOrder.orderNumber,
      whatsappUrl,
    });
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Server error creating order: " + error.message },
      { status: 500 }
    );
  }
}

// GET: Authenticated Admin Orders List
export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const orderType = url.searchParams.get("orderType");
  const search = url.searchParams.get("search");

  const where: any = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (orderType && orderType !== "ALL") {
    where.orderType = orderType;
  }
  if (search) {
    const q = search.trim();
    where.OR = [
      { orderNumber: { contains: q } },
      { customerName: { contains: q } },
      { customerPhone: { contains: q } },
      { deliveryAddress: { contains: q } },
    ];
  }

  try {
    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      orders,
      count: orders.length,
    });
  } catch (err: any) {
    console.error("Failed to query orders:", err);
    return NextResponse.json(
      { error: "Database error: " + err.message },
      { status: 500 }
    );
  }
}

// PATCH: Authenticated Admin Status / Notes Update
export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const updated = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      order: updated,
    });
  } catch (err: any) {
    console.error("Failed to update order:", err);
    return NextResponse.json(
      { error: "Update failed: " + err.message },
      { status: 500 }
    );
  }
}

// DELETE: Authenticated Admin Order Deletion
export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  try {
    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to delete order:", err);
    return NextResponse.json(
      { error: "Delete failed: " + err.message },
      { status: 500 }
    );
  }
}
