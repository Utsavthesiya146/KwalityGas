import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "kwality-gas-jwt-super-secret-token-key-2026-production"
);

export const CUSTOMER_COOKIE_NAME = "kwality_customer_session";

export interface CustomerSession {
  customerId: string;
  email: string;
  name: string;
  phone: string;
  category: "DOMESTIC" | "COMMERCIAL" | "INDUSTRIAL";
}

export async function hashCustomerPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyCustomerPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signCustomerToken(payload: CustomerSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d") // Customer login session 30 days
    .sign(JWT_SECRET);
}

export async function verifyCustomerToken(token: string): Promise<CustomerSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      customerId: payload.customerId as string,
      email: payload.email as string,
      name: payload.name as string,
      phone: payload.phone as string,
      category: (payload.category as any) || "DOMESTIC",
    };
  } catch {
    return null;
  }
}

export async function getCurrentCustomer(): Promise<CustomerSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(CUSTOMER_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyCustomerToken(token);
  } catch {
    return null;
  }
}

export async function getFullCurrentCustomer() {
  const session = await getCurrentCustomer();
  if (!session) return null;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: session.customerId },
      select: {
        id: true,
        email: true,
        name: true,
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
      },
    });
    return customer;
  } catch {
    return null;
  }
}

