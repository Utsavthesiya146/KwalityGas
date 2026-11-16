import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { getCurrentCustomer } from "@/lib/customer-auth";

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
      customerId: explicitCustomerId,
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

    // Determine customer link if logged in or existing by phone/email
    let linkedCustomerId = explicitCustomerId || null;
    if (!linkedCustomerId) {
      const customerSession = await getCurrentCustomer();
      if (customerSession?.customerId) {
        linkedCustomerId = customerSession.customerId;
      } else {
        // Try looking up customer by phone
        const existingCustomer = await prisma.customer.findFirst({
          where: { phone: { contains: cleanPhone.slice(-10) } },
          select: { id: true },
        });
        if (existingCustomer) {
          linkedCustomerId = existingCustomer.id;
        }
      }
    }

    // Insert order and order items in a transaction
    const savedOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerId: linkedCustomerId,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        customerEmail: customerEmail?.trim() || null,
        deliveryAddress: deliveryAddress.trim(),
        orderType: validOrderType,
        subtotal: calculatedSubtotal > 0 ? calculatedSubtotal : null,
        notes: notes?.trim() || null,
        status: "NEW",
        paymentStatus: "PENDING",
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
  const paymentStatus = url.searchParams.get("paymentStatus");
  const orderType = url.searchParams.get("orderType");
  const dealerId = url.searchParams.get("dealerId");
  const search = url.searchParams.get("search");

  const where: any = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (paymentStatus && paymentStatus !== "ALL") {
    where.paymentStatus = paymentStatus;
  }
  if (orderType && orderType !== "ALL") {
    where.orderType = orderType;
  }
  if (dealerId && dealerId !== "ALL") {
    where.dealerId = dealerId;
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
        dealer: {
          select: { id: true, businessName: true, territory: true, phone: true },
        },
        customer: {
          select: { id: true, name: true, email: true, category: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
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

// PATCH: Authenticated Admin Status / Notes / Payment / Dealer Update
export async function PATCH(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, paymentStatus, dealerId, adminNotes, paymentNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const existing = await prisma.order.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updateData: any = {};
    const now = new Date();

    if (status && status !== existing.status) {
      updateData.status = status;
      if (status === "DISPATCHED" && !existing.dispatchedAt) {
        updateData.dispatchedAt = now;
      } else if (status === "DELIVERED" && !existing.deliveredAt) {
        updateData.deliveredAt = now;
      } else if (status === "CANCELLED" && !existing.cancelledAt) {
        updateData.cancelledAt = now;
      }
    }

    if (paymentStatus && paymentStatus !== existing.paymentStatus) {
      updateData.paymentStatus = paymentStatus;
      if (paymentStatus === "CONFIRMED" && !existing.paymentConfirmedAt) {
        updateData.paymentConfirmedAt = now;
      }
    }

    if (dealerId !== undefined) {
      updateData.dealerId = dealerId === "" || dealerId === "NONE" ? null : dealerId;
    }

    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (paymentNotes !== undefined) updateData.paymentNotes = paymentNotes;

    const updated = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
        dealer: {
          select: { id: true, businessName: true, territory: true, phone: true },
        },
        customer: {
          select: { id: true, name: true, email: true, category: true },
        },
      },
    });

    // Write audit log
    try {
      await prisma.auditLog.create({
        data: {
          adminEmail: admin.email,
          action: "UPDATE_ORDER",
          entity: "Order",
          entityId: updated.id,
          details: JSON.stringify({
            orderNumber: updated.orderNumber,
            oldStatus: existing.status,
            newStatus: updated.status,
            oldPayment: existing.paymentStatus,
            newPayment: updated.paymentStatus,
            dealerId: updated.dealerId,
          }),
        },
      });
    } catch (auditErr) {
      console.warn("Audit log creation warning:", auditErr);
    }

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
    const existing = await prisma.order.findUnique({ where: { id } });
    await prisma.order.delete({ where: { id } });

    // Write audit log
    try {
      await prisma.auditLog.create({
        data: {
          adminEmail: admin.email,
          action: "DELETE_ORDER",
          entity: "Order",
          entityId: id,
          details: JSON.stringify({ orderNumber: existing?.orderNumber }),
        },
      });
    } catch (auditErr) {
      console.warn("Audit log warning:", auditErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Failed to delete order:", err);
    return NextResponse.json(
      { error: "Delete failed: " + err.message },
      { status: 500 }
    );
  }
}
