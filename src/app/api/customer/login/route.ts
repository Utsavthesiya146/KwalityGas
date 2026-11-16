import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCustomerPassword, signCustomerToken, CUSTOMER_COOKIE_NAME } from "@/lib/customer-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const customer = await prisma.customer.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!customer || !customer.isActive) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await verifyCustomerPassword(password, customer.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

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
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Customer login error:", err);
    return NextResponse.json({ error: "Login failed: " + err.message }, { status: 500 });
  }
}

