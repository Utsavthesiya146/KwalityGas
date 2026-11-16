import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // 1. Fetch all orders with items and dealer
    const allOrders = await prisma.order.findMany({
      include: {
        items: true,
        dealer: { select: { id: true, businessName: true, territory: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // 2. Fetch all dealers
    const allDealers = await prisma.dealer.findMany({
      select: {
        id: true,
        businessName: true,
        territory: true,
        phone: true,
        isActive: true,
      },
    });

    // 3. Overall Totals
    const totalOrders = allOrders.length;
    const confirmedOrders = allOrders.filter((o) => o.paymentStatus === "CONFIRMED");
    const totalRevenue = confirmedOrders.reduce((sum, o) => sum + (Number(o.subtotal) || 0), 0);
    const pendingPaymentOrders = allOrders.filter((o) => o.paymentStatus === "PENDING");
    const pendingRevenue = pendingPaymentOrders.reduce((sum, o) => sum + (Number(o.subtotal) || 0), 0);

    // 4. Status Breakdown
    const statusCounts: Record<string, number> = {
      NEW: 0,
      WHATSAPP_CONTACT_PENDING: 0,
      WHATSAPP_CONTACTED: 0,
      PAYMENT_PENDING: 0,
      PAYMENT_CONFIRMED: 0,
      PROCESSING: 0,
      DISPATCHED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };
    allOrders.forEach((o) => {
      if (statusCounts[o.status] !== undefined) {
        statusCounts[o.status]++;
      }
    });

    // 5. Payment Status Breakdown
    const paymentStatusCounts: Record<string, number> = {
      PENDING: 0,
      CONFIRMED: 0,
      FAILED: 0,
      REFUNDED: 0,
    };
    allOrders.forEach((o) => {
      if (paymentStatusCounts[o.paymentStatus] !== undefined) {
        paymentStatusCounts[o.paymentStatus]++;
      }
    });

    // 6. Segment Breakdown (Domestic, Commercial, Industrial)
    const segmentBreakdown = {
      DOMESTIC: { count: 0, revenue: 0 },
      COMMERCIAL: { count: 0, revenue: 0 },
      INDUSTRIAL: { count: 0, revenue: 0 },
    };

    allOrders.forEach((o) => {
      const type = o.orderType as "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
      if (segmentBreakdown[type]) {
        segmentBreakdown[type].count++;
        if (o.paymentStatus === "CONFIRMED" && o.subtotal) {
          segmentBreakdown[type].revenue += Number(o.subtotal);
        }
      }
    });

    // 7. Product-wise aggregate
    const productAgg: Record<string, { name: string; capacity: string; quantity: number; revenue: number }> = {};
    allOrders.forEach((o) => {
      o.items.forEach((it) => {
        const key = `${it.productName}-${it.capacity || "std"}`;
        if (!productAgg[key]) {
          productAgg[key] = {
            name: it.productName,
            capacity: it.capacity || "Standard",
            quantity: 0,
            revenue: 0,
          };
        }
        productAgg[key].quantity += it.quantity;
        if (it.lineTotal && o.paymentStatus === "CONFIRMED") {
          productAgg[key].revenue += Number(it.lineTotal);
        }
      });
    });

    const topProducts = Object.values(productAgg).sort((a, b) => b.quantity - a.quantity);

    // 8. Dealer Performance
    const dealerMap: Record<string, { id: string; name: string; territory: string; orderCount: number; revenue: number }> = {};
    allDealers.forEach((d) => {
      dealerMap[d.id] = {
        id: d.id,
        name: d.businessName,
        territory: d.territory,
        orderCount: 0,
        revenue: 0,
      };
    });

    allOrders.forEach((o) => {
      if (o.dealerId && dealerMap[o.dealerId]) {
        dealerMap[o.dealerId].orderCount++;
        if (o.paymentStatus === "CONFIRMED" && o.subtotal) {
          dealerMap[o.dealerId].revenue += Number(o.subtotal);
        }
      }
    });

    const dealerPerformance = Object.values(dealerMap).sort((a, b) => b.orderCount - a.orderCount);

    // 9. Daily Trends (Last 14 days)
    const dailyTrendsMap: Record<string, { date: string; orders: number; revenue: number }> = {};
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      dailyTrendsMap[dateKey] = { date: dateKey, orders: 0, revenue: 0 };
    }

    allOrders.forEach((o) => {
      const dateKey = new Date(o.createdAt).toISOString().split("T")[0];
      if (dailyTrendsMap[dateKey]) {
        dailyTrendsMap[dateKey].orders++;
        if (o.paymentStatus === "CONFIRMED" && o.subtotal) {
          dailyTrendsMap[dateKey].revenue += Number(o.subtotal);
        }
      }
    });

    const dailyTrends = Object.values(dailyTrendsMap);

    return NextResponse.json({
      success: true,
      summary: {
        totalOrders,
        confirmedOrdersCount: confirmedOrders.length,
        totalRevenue,
        pendingOrdersCount: pendingPaymentOrders.length,
        pendingRevenue,
      },
      statusCounts,
      paymentStatusCounts,
      segmentBreakdown,
      topProducts,
      dealerPerformance,
      dailyTrends,
    });
  } catch (err: any) {
    console.error("Reports API error:", err);
    return NextResponse.json({ error: "Failed to generate business reports: " + err.message }, { status: 500 });
  }
}

