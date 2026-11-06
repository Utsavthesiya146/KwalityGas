import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const states = await prisma.priceListState.findMany({
      include: {
        items: {
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ states });
  } catch (err: any) {
    return NextResponse.json({ states: [], error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { stateId, effectiveDate, wefNotice, notes, items } = body;

    if (!stateId) {
      return NextResponse.json({ error: "State ID is required" }, { status: 400 });
    }

    // Update state header
    await prisma.priceListState.update({
      where: { id: stateId },
      data: {
        effectiveDate,
        wefNotice,
        notes,
      },
    });

    // Update or create items
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item.id) {
          await prisma.priceListItem.update({
            where: { id: item.id },
            data: {
              capacity: item.capacity,
              amount: item.amount !== null && item.amount !== "" ? parseFloat(item.amount) : null,
              unit: item.unit || "Refill",
              isRefill: item.isRefill ?? true,
              isDomestic: item.isDomestic ?? false,
              notes: item.notes || null,
              displayOrder: item.displayOrder ?? 0,
            },
          });
        } else if (item.capacity) {
          await prisma.priceListItem.create({
            data: {
              stateId,
              capacity: item.capacity,
              amount: item.amount !== null && item.amount !== "" ? parseFloat(item.amount) : null,
              unit: item.unit || "Refill",
              isRefill: item.isRefill ?? true,
              isDomestic: item.isDomestic ?? false,
              notes: item.notes || null,
              displayOrder: item.displayOrder ?? 99,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, message: "Price list updated successfully" });
  } catch (error: any) {
    console.error("Price list update error:", error);
    return NextResponse.json({ error: "Failed to update price list" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const itemId = url.searchParams.get("itemId");
  if (!itemId) return NextResponse.json({ error: "Item ID required" }, { status: 400 });

  await prisma.priceListItem.delete({ where: { id: itemId } });
  return NextResponse.json({ success: true });
}

