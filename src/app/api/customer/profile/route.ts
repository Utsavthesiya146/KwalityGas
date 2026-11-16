import { NextRequest, NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  const session = await getCurrentCustomer();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, phone, deliveryAddress, city, state, pincode, companyName, gstNumber } = body;

    const updateData: any = {};
    if (name && typeof name === "string") updateData.name = name.trim();
    if (phone) updateData.phone = phone.replace(/\D/g, "");
    if (deliveryAddress !== undefined) updateData.deliveryAddress = deliveryAddress?.trim() || null;
    if (city !== undefined) updateData.city = city?.trim() || null;
    if (state !== undefined) updateData.state = state?.trim() || null;
    if (pincode !== undefined) updateData.pincode = pincode?.trim() || null;
    if (companyName !== undefined) updateData.companyName = companyName?.trim() || null;
    if (gstNumber !== undefined) updateData.gstNumber = gstNumber?.trim() || null;

    const updated = await prisma.customer.update({
      where: { id: session.customerId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      customer: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        category: updated.category,
        deliveryAddress: updated.deliveryAddress,
      },
    });
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Failed to update profile: " + err.message }, { status: 500 });
  }
}

