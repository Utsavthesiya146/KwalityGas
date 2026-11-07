import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signAdminToken, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    let admin = null;
    try {
      admin = await prisma.adminUser.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
    } catch (dbErr: any) {
      console.warn("Database lookup failed during login attempt:", dbErr.message);
    }

    if (admin) {
      const isValid = await verifyPassword(password, admin.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }

      const token = await signAdminToken({
        userId: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      });

      const response = NextResponse.json({
        success: true,
        user: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
      });

      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    // Support ADMIN_PASSWORD_HASH from environment variables (for initial deployment, staging bootstrap or fallback)
    const envEmail = (process.env.ADMIN_EMAIL || "admin@kwalitygas.com").toLowerCase().trim();
    const envHash = process.env.ADMIN_PASSWORD_HASH;

    if (envHash && email.toLowerCase().trim() === envEmail) {
      const isValid = await verifyPassword(password, envHash);
      if (isValid) {
        const token = await signAdminToken({
          userId: "env-superadmin",
          email: envEmail,
          name: process.env.ADMIN_NAME || "Kwality Superadmin",
          role: "SUPERADMIN",
        });

        const response = NextResponse.json({
          success: true,
          user: { id: "env-superadmin", email: envEmail, name: process.env.ADMIN_NAME || "Kwality Superadmin", role: "SUPERADMIN" },
        });

        response.cookies.set(COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
      }
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

