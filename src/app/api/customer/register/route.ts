import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashCustomerPassword, signCustomerToken, CUSTOMER_COOKIE_NAME } from "@/lib/customer-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      password,
      category = "DOMESTIC",
      companyName,
      gstNumber,
      deliveryAddress,
      city = "Bangalore",
      state = "Karnataka",
      pincode,
    } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Full name is required (min 2 characters)" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "A valid 10-digit mobile number is required" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already registered
    const existing = await prisma.customer.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists. Please log in." }, { status: 409 });
    }

    const passwordHash = await hashCustomerPassword(password);

    const validCategory =
      category === "COMMERCIAL"
        ? "COMMERCIAL"
        : category === "INDUSTRIAL"
        ? "INDUSTRIAL"
        : "DOMESTIC";

    const customer = await prisma.customer.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: cleanPhone,
        passwordHash,
        category: validCategory,
        companyName: companyName?.trim() || null,
        gstNumber: gstNumber?.trim() || null,
        deliveryAddress: deliveryAddress?.trim() || null,
        city: city?.trim() || null,
        state: state?.trim() || null,
        pincode: pincode?.trim() || null,
      },
    });

    // Create session token
    const token = await signCustomerToken({
      customerId: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      category: customer.category as any,
    });

    const response = NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        category: customer.category,
        deliveryAddress: customer.deliveryAddress,
      },
    });

    response.cookies.set(CUSTOMER_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Customer registration error:", err);
    return NextResponse.json({ error: "Failed to register account: " + err.message }, { status: 500 });
  }
}

