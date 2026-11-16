import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

function sanitizePhoneForWhatsApp(raw: string): string {
  return raw.replace(/\D/g, "");
}

function validatePhoneNumber(phone: string): { valid: boolean; error?: string } {
  if (!phone || typeof phone !== "string") {
    return { valid: false, error: "Phone number is required." };
  }

  const trimmed = phone.trim();

  // Must include international country code starting with '+'
  if (!trimmed.startsWith("+")) {
    return {
      valid: false,
      error: "Phone number must include an international country code starting with '+' (e.g. +91 78997 87101).",
    };
  }

  // Extract digits
  const digitsOnly = trimmed.replace(/\D/g, "");

  // International phone numbers typically range between 10 and 15 digits
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return {
      valid: false,
      error: `Invalid phone length (${digitsOnly.length} digits). International phone numbers must have between 10 and 15 digits including country code.`,
    };
  }

  return { valid: true };
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: "WHATSAPP_HELPLINE_PHONE" },
    });

    const phone = setting?.value || "+91 78997 87101";
    const cleanPhone = sanitizePhoneForWhatsApp(phone);

    return NextResponse.json({
      success: true,
      setting: {
        id: setting?.id,
        key: "WHATSAPP_HELPLINE_PHONE",
        value: phone,
        cleanPhone,
        description: setting?.description || "Official customer support WhatsApp helpline number",
        updatedBy: setting?.updatedBy || "System Default",
        updatedAt: setting?.updatedAt || null,
      },
    });
  } catch (error: any) {
    console.error("Admin failed to fetch WhatsApp setting:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { phone } = body;

    const validation = validatePhoneNumber(phone);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const trimmedPhone = phone.trim();
    const cleanPhone = sanitizePhoneForWhatsApp(trimmedPhone);

    // Fetch existing for audit log
    const existing = await prisma.systemSetting.findUnique({
      where: { key: "WHATSAPP_HELPLINE_PHONE" },
    });

    // Upsert setting
    const updated = await prisma.systemSetting.upsert({
      where: { key: "WHATSAPP_HELPLINE_PHONE" },
      update: {
        value: trimmedPhone,
        updatedBy: admin.email,
      },
      create: {
        key: "WHATSAPP_HELPLINE_PHONE",
        value: trimmedPhone,
        description: "Official customer support WhatsApp helpline number",
        updatedBy: admin.email,
      },
    });

    // Record in AuditLog
    await prisma.auditLog.create({
      data: {
        adminEmail: admin.email,
        action: "UPDATE_WHATSAPP_HELPLINE_SETTING",
        entity: "SystemSetting",
        entityId: updated.id,
        details: JSON.stringify({
          previousValue: existing?.value || "+91 78997 87101",
          newValue: trimmedPhone,
          cleanPhone,
          updatedBy: admin.email,
          timestamp: new Date().toISOString(),
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "WhatsApp Helpline number updated successfully.",
      setting: {
        id: updated.id,
        key: updated.key,
        value: updated.value,
        cleanPhone,
        updatedBy: updated.updatedBy,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (error: any) {
    console.error("Admin failed to update WhatsApp setting:", error);
    return NextResponse.json({ error: "Failed to update WhatsApp Helpline number" }, { status: 500 });
  }
}

