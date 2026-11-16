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
  const territory = url.searchParams.get("territory");
  const status = url.searchParams.get("status");
  const search = url.searchParams.get("search");

  const where: any = {};
  if (territory && territory !== "ALL") where.territory = territory;
  if (status === "ACTIVE") where.isActive = true;
  if (status === "INACTIVE") where.isActive = false;
  if (search) {
    const q = search.trim();
    where.OR = [
      { businessName: { contains: q } },
      { contactPerson: { contains: q } },
      { phone: { contains: q } },
      { territory: { contains: q } },
      { serviceAreas: { contains: q } },
    ];
  }

  try {
    const dealers = await prisma.dealer.findMany({
      where,
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

    // Compute metrics
    const dealersWithMetrics = dealers.map((d) => {
      const totalRevenue = d.orders
        .filter((o) => o.paymentStatus === "CONFIRMED")
        .reduce((acc, curr) => acc + (Number(curr.subtotal) || 0), 0);

      return {
        ...d,
        totalOrders: d._count.orders,
        confirmedRevenue: totalRevenue,
      };
    });

    return NextResponse.json({
      success: true,
      dealers: dealersWithMetrics,
    });
  } catch (err: any) {
    console.error("Dealers GET error:", err);
    return NextResponse.json({ error: "Failed to fetch dealers: " + err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      businessName,
      contactPerson,
      phone,
      email,
      address,
      territory,
      serviceAreas,
      commissionRate,
      notes,
    } = body;

    if (!businessName || !contactPerson || !phone || !territory) {
      return NextResponse.json(
        { error: "Business name, contact person, phone number, and territory are required." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, "");

    const newDealer = await prisma.dealer.create({
      data: {
        businessName: businessName.trim(),
        contactPerson: contactPerson.trim(),
        phone: cleanPhone,
        email: email?.trim() || null,
        address: address?.trim() || null,
        territory: territory.trim(),
        serviceAreas: serviceAreas?.trim() || null,
        commissionRate: commissionRate ? Number(commissionRate) : null,
        notes: notes?.trim() || null,
        isActive: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminEmail: admin.email,
        action: "CREATE_DEALER",
        entity: "Dealer",
        entityId: newDealer.id,
        details: JSON.stringify({ businessName: newDealer.businessName, territory: newDealer.territory }),
      },
    });

    return NextResponse.json({
      success: true,
      dealer: newDealer,
    });
  } catch (err: any) {
    console.error("Dealers POST error:", err);
    return NextResponse.json({ error: "Failed to create dealer: " + err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      businessName,
      contactPerson,
      phone,
      email,
      address,
      territory,
      serviceAreas,
      commissionRate,
      notes,
      isActive,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Dealer ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (businessName) updateData.businessName = businessName.trim();
    if (contactPerson) updateData.contactPerson = contactPerson.trim();
    if (phone) updateData.phone = phone.replace(/\D/g, "");
    if (email !== undefined) updateData.email = email?.trim() || null;
    if (address !== undefined) updateData.address = address?.trim() || null;
    if (territory) updateData.territory = territory.trim();
    if (serviceAreas !== undefined) updateData.serviceAreas = serviceAreas?.trim() || null;
    if (commissionRate !== undefined) updateData.commissionRate = commissionRate ? Number(commissionRate) : null;
    if (notes !== undefined) updateData.notes = notes?.trim() || null;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await prisma.dealer.update({
      where: { id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        adminEmail: admin.email,
        action: "UPDATE_DEALER",
        entity: "Dealer",
        entityId: updated.id,
        details: JSON.stringify({ businessName: updated.businessName, territory: updated.territory }),
      },
    });

    return NextResponse.json({
      success: true,
      dealer: updated,
    });
  } catch (err: any) {
    console.error("Dealers PUT error:", err);
    return NextResponse.json({ error: "Failed to update dealer: " + err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Dealer ID is required" }, { status: 400 });
  }

  try {
    const existing = await prisma.dealer.findUnique({ where: { id } });
    await prisma.dealer.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        adminEmail: admin.email,
        action: "DELETE_DEALER",
        entity: "Dealer",
        entityId: id,
        details: JSON.stringify({ businessName: existing?.businessName }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Dealers DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete dealer: " + err.message }, { status: 500 });
  }
}

