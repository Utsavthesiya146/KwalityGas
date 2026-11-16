import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function sanitizePhoneForWhatsApp(raw: string): string {
  // Strip everything except digits
  const digits = raw.replace(/\D/g, "");
  return digits || "917899787101";
}

export async function GET() {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: "WHATSAPP_HELPLINE_PHONE" },
    });

    const phone = setting?.value || "+91 78997 87101";
    const cleanPhone = sanitizePhoneForWhatsApp(phone);

    return NextResponse.json({
      success: true,
      phone,
      cleanPhone,
      updatedAt: setting?.updatedAt || null,
    });
  } catch (error: any) {
    console.error("Failed to fetch WhatsApp helpline setting:", error);
    // Safe fallback to official number
    return NextResponse.json({
      success: true,
      phone: "+91 78997 87101",
      cleanPhone: "917899787101",
      fallback: true,
    });
  }
}

